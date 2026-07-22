(() => {
  'use strict';

  const C = window.CURRICULUM;
  const QE = window.QuestionEngine;
  const Store = window.Primary1Store;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const state = () => Store.getState();
  const unlockAll = new URLSearchParams(location.search).get('unlockAll') === '1';

  const STATIONS = [
    { id: 'vocab', title: 'Vocabulary Flashcards', icon: '🃏', tone: 'blue' },
    { id: 'notes', title: 'Language Notes', icon: '📝', tone: 'pink' },
    { id: 'verbs', title: 'Important Verbs', icon: '🏃', tone: 'orange' },
    { id: 'grammar', title: 'Grammar Zone', icon: '📘', tone: 'purple' },
    { id: 'phonics', title: 'Phonics Lab', icon: '🎧', tone: 'teal' },
    { id: 'reading', title: 'Reading & Dialogue', icon: '💬', tone: 'green' },
    { id: 'challenge', title: 'Lesson Challenge', icon: '🏆', tone: 'red' }
  ];

  const BADGES = [
    { id: 'first-steps', icon: '🌱', title: 'First Steps', description: 'Complete your first lesson challenge.', test: (s) => Object.keys(s.challengeResults).some((k) => k.startsWith('lesson:')) },
    { id: 'vocab-hero', icon: '🃏', title: 'Vocabulary Hero', description: 'Mark 25 words as known.', test: (s) => Object.values(s.knownWords).reduce((n, x) => n + Object.keys(x).length, 0) >= 25 },
    { id: 'star-student', icon: '⭐', title: 'Star Student', description: 'Earn 100 stars.', test: (s) => s.stars >= 100 },
    { id: 'quick-learner', icon: '⚡', title: 'Quick Learner', description: 'Earn 500 points.', test: (s) => s.points >= 500 },
    { id: 'unit-master', icon: '🏅', title: 'Unit Master', description: 'Complete a unit challenge.', test: (s) => Object.keys(s.challengeResults).some((k) => k.startsWith('unit:')) },
    { id: 'champion', icon: '👑', title: 'English Champion', description: 'Complete all six units.', test: (s) => C.units.every((u) => (s.challengeResults[`unit:${u.id}`]?.percent || 0) >= 70) }
  ];

  let route = { name: 'home' };
  let flashIndex = 0;
  let flashFlipped = false;
  let activePhonicsLetterIndex = 0;
  let activeChallenge = null;
  let challengeRuntime = null;
  let drawerOpen = false;

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[ch]));
  }

  function wordIcon(item = {}) {
    const word = String(item.word || '').toLowerCase();
    if (word === 'table' || word === 'desk') return '<img class="word-art" src="assets/images/table.svg" alt="Table" />';
    if (word === 'goodbye') return '<img class="word-art" src="assets/images/goodbye.svg" alt="Goodbye" />';
    if (word === 'play') return '<img class="word-art" src="assets/images/play.svg" alt="Children playing" />';
    return escapeHTML(item.icon || '');
  }

  function formatQuestionPrompt(value = '') {
    return escapeHTML(value).replace(/\[\[word:([^\]]+)\]\]/g, (_, word) => wordIcon({ word }));
  }

  function normalizeSentence(value = '') {
    return value.toLocaleLowerCase().replace(/[“”"'?!.,:;()]/g, '').replace(/\s+/g, ' ').trim();
  }

  function findUnit(id) {
    return C.units.find((u) => Number(u.id) === Number(id));
  }

  function findLesson(lessonId) {
    for (const unit of C.units) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) return { unit, lesson, index: unit.lessons.indexOf(lesson) };
    }
    return null;
  }

  function lessonStations(lesson) {
    return STATIONS.filter((s) => {
      if (s.id === 'vocab') return Array.isArray(lesson.vocab) && lesson.vocab.length;
      if (s.id === 'notes') return Array.isArray(lesson.notes) && lesson.notes.length;
      if (s.id === 'verbs') return Array.isArray(lesson.verbs) && lesson.verbs.length;
      if (s.id === 'grammar') return Boolean(lesson.grammar);
      if (s.id === 'phonics') return Boolean(lesson.phonics);
      if (s.id === 'reading') return Boolean(lesson.reading);
      return true;
    });
  }

  function requiredStationIds(lesson) {
    return lessonStations(lesson).filter((s) => s.id !== 'challenge').map((s) => s.id);
  }

  function lessonChallengeResult(lessonId) {
    return state().challengeResults[`lesson:${lessonId}`] || null;
  }

  function isLessonComplete(lessonId) {
    return (lessonChallengeResult(lessonId)?.percent || 0) >= 70;
  }

  function isUnitChallengeComplete(unitId) {
    return (state().challengeResults[`unit:${unitId}`]?.percent || 0) >= 70;
  }

  function isUnitUnlocked(unit) {
    if (unlockAll || unit.id === 1) return true;
    return isUnitChallengeComplete(unit.id - 1);
  }

  function isLessonUnlocked(unit, index) {
    if (unlockAll || index === 0) return isUnitUnlocked(unit);
    return isUnitUnlocked(unit) && isLessonComplete(unit.lessons[index - 1].id);
  }

  function isLessonChallengeUnlocked(lesson) {
    if (unlockAll) return true;
    const completed = state().completedStations[lesson.id] || {};
    return requiredStationIds(lesson).every((id) => completed[id]);
  }

  function isUnitChallengeUnlocked(unit) {
    return unlockAll || unit.lessons.every((l) => isLessonComplete(l.id));
  }

  function stationProgress(lesson) {
    const required = requiredStationIds(lesson);
    const completed = state().completedStations[lesson.id] || {};
    const done = required.filter((id) => completed[id]).length;
    const challenge = lessonChallengeResult(lesson.id);
    return Math.round(((done + (challenge?.percent >= 70 ? 1 : 0)) / (required.length + 1)) * 100);
  }

  function unitProgress(unit) {
    const lessonScores = unit.lessons.map((l) => stationProgress(l));
    const lessonAverage = lessonScores.reduce((a, b) => a + b, 0) / lessonScores.length;
    const bankBonus = isUnitChallengeComplete(unit.id) ? 100 : 0;
    return Math.round((lessonAverage * unit.lessons.length + bankBonus) / (unit.lessons.length + 1));
  }

  function overallProgress() {
    return Math.round(C.units.reduce((sum, u) => sum + unitProgress(u), 0) / C.units.length);
  }

  function completedLessonCount() {
    return C.units.flatMap((u) => u.lessons).filter((l) => isLessonComplete(l.id)).length;
  }

  function syncBadges() {
    const s = state();
    const earned = BADGES.filter((b) => b.test(s)).map((b) => b.id);
    const newOnes = earned.filter((id) => !s.badges.includes(id));
    if (!newOnes.length) return;
    Store.update((draft) => { draft.badges = [...new Set([...draft.badges, ...newOnes])]; });
  }

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '') || 'home';
    const parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'unit' && parts[1]) return { name: 'unit', unitId: Number(parts[1]) };
    if (parts[0] === 'lesson' && parts[1]) return { name: 'lesson', lessonId: parts[1], station: parts[2] || 'vocab' };
    if (parts[0] === 'challenge' && parts[1] && parts[2]) return { name: 'challenge', kind: parts[1], id: parts[2] };
    if (parts[0] === 'review' && parts[1]) return { name: 'review', reviewId: parts[1] };
    if (['progress', 'rewards', 'about'].includes(parts[0])) return { name: parts[0] };
    return { name: 'home' };
  }

  function navigate(target, replace = false) {
    const hash = typeof target === 'string' ? target : routeToHash(target);
    if (replace) history.replaceState(null, '', hash);
    else location.hash = hash;
  }

  function routeToHash(r) {
    if (r.name === 'unit') return `#unit/${r.unitId}`;
    if (r.name === 'lesson') return `#lesson/${r.lessonId}/${r.station || 'vocab'}`;
    if (r.name === 'challenge') return `#challenge/${r.kind}/${r.id}`;
    if (r.name === 'review') return `#review/${r.reviewId}`;
    return `#${r.name || 'home'}`;
  }

  function setRouteFromHash() {
    route = parseHash();
    Store.setRoute(route);
    activeChallenge = null;
    challengeRuntime = null;
    flashIndex = 0;
    flashFlipped = false;
    activePhonicsLetterIndex = 0;
    render();
  }

  function toast(message, tone = 'info') {
    const holder = $('#toastHolder');
    if (!holder) return;
    const node = document.createElement('div');
    node.className = `toast ${tone}`;
    node.textContent = message;
    holder.appendChild(node);
    requestAnimationFrame(() => node.classList.add('show'));
    setTimeout(() => {
      node.classList.remove('show');
      setTimeout(() => node.remove(), 250);
    }, 2400);
  }

  function playTone(kind = 'success') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = kind === 'success' ? 680 : 250;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start(); osc.stop(ctx.currentTime + 0.28);
    } catch { /* Sound is optional. */ }
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return toast('Speech is not available in this browser.', 'warn');
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.72;
    utterance.pitch = 1.05;
    speechSynthesis.speak(utterance);
  }

  function playAudio(src, fallbackText = '') {
    if (!src) return speak(fallbackText);
    const audio = new Audio(src);
    audio.play().catch(() => speak(fallbackText));
  }

  function renderShell() {
    const s = state();
    const app = $('#app');
    app.innerHTML = `
      <div class="app-shell ${drawerOpen ? 'drawer-open' : ''}">
        <aside class="sidebar">
          <button class="close-drawer" data-action="toggle-drawer" aria-label="Close menu">×</button>
          <a class="brand" href="#home" aria-label="English Primary 1 Home">
            <div class="brand-icon">📖</div>
            <div><strong>English Primary 1</strong><span>Term 1</span></div>
          </a>
          <nav class="side-nav" aria-label="Main navigation">
            ${navItem('home','🏠','Home')}
            ${navItem('units','📚','Units','#home')}
            ${navItem('progress','📈','My Progress')}
            ${navItem('rewards','🏆','Rewards & Badges')}
            ${navItem('reviews','🎯','Review Challenges','#home')}
            ${navItem('about','👨‍🏫','Meet Your Teacher')}
          </nav>
          <section class="side-student">
            <img src="assets/images/icon-192.png" alt="Learning friends" />
            <div><small>Welcome back</small><strong>${escapeHTML(s.student.name || 'Student')}</strong><span>Level ${s.level}</span></div>
          </section>
          <div class="side-stats">
            <div><b>⭐ ${s.stars}</b><small>Stars</small></div>
            <div><b>🔥 ${s.streak}</b><small>Streak</small></div>
          </div>
          <footer>${escapeHTML(C.course.signature)}</footer>
        </aside>
        <button class="drawer-scrim" data-action="toggle-drawer" aria-label="Close menu"></button>
        <main class="main-area">
          <header class="topbar">
            <button class="menu-button" data-action="toggle-drawer" aria-label="Open menu">☰</button>
            <div class="breadcrumb">${renderBreadcrumb()}</div>
            <div class="top-stats">
              <span><b>${s.points.toLocaleString()}</b><small>Points</small></span>
              <span><b>⭐ ${s.stars}</b><small>Stars</small></span>
              <span><b>🏅 ${s.badges.length}</b><small>Badges</small></span>
              <span class="student-chip"><img src="assets/images/icon-192.png" alt="" /><b>${escapeHTML(s.student.name || 'Student')}</b></span>
            </div>
          </header>
          <div class="page" id="page"></div>
        </main>
      </div>
      <div id="toastHolder" class="toast-holder" aria-live="polite"></div>
      <div id="modalRoot"></div>
    `;
  }

  function navItem(name, icon, label, directHash = '') {
    const active = route.name === name || (name === 'units' && ['unit','lesson','challenge'].includes(route.name));
    const href = directHash || `#${name}`;
    return `<a class="nav-link ${active ? 'active' : ''}" href="${href}"><span>${icon}</span>${label}</a>`;
  }

  function renderBreadcrumb() {
    if (route.name === 'home') return 'Home';
    if (route.name === 'unit') return `Home › Unit ${route.unitId}`;
    if (route.name === 'lesson') {
      const found = findLesson(route.lessonId);
      return found ? `Unit ${found.unit.id} › ${found.lesson.title}` : 'Lesson';
    }
    if (route.name === 'challenge') return `${route.kind === 'unit' ? 'Unit' : 'Lesson'} Challenge`;
    if (route.name === 'review') return 'Review Challenge';
    return route.name.charAt(0).toUpperCase() + route.name.slice(1);
  }

  function render() {
    syncBadges();
    renderShell();
    const page = $('#page');
    if (route.name === 'home') renderHome(page);
    else if (route.name === 'unit') renderUnit(page, route.unitId);
    else if (route.name === 'lesson') renderLesson(page, route.lessonId, route.station);
    else if (route.name === 'challenge') renderChallenge(page, route.kind, route.id);
    else if (route.name === 'review') renderReview(page, route.reviewId);
    else if (route.name === 'progress') renderProgress(page);
    else if (route.name === 'rewards') renderRewards(page);
    else if (route.name === 'about') renderAbout(page);
    else renderHome(page);
    document.querySelectorAll('.question-card h2').forEach((heading) => {
      heading.innerHTML = formatQuestionPrompt(heading.textContent || '');
    });
    bindEvents();
  }

  function renderHome(page) {
    const s = state();
    const lastRoute = s.lastRoute?.name && s.lastRoute.name !== 'home' ? routeToHash(s.lastRoute) : '#unit/1';
    const lastQ = s.lastQuestion;
    const lastQuestionHref = lastQ ? (lastQ.kind === 'review' ? `#review/${lastQ.id}` : `#challenge/${lastQ.kind}/${lastQ.id}`) : '';
    page.innerHTML = `
      <section class="hero-section">
        <div class="hero-image" style="background-image:url('${C.course.hero}')"></div>
        <div class="hero-copy">
          <span class="eyebrow">✨ Interactive English Journey</span>
          <h1>Let’s Explore<br><em>English Together!</em></h1>
          <p>Learn vocabulary, grammar, phonics, reading and speaking through colourful lessons and exciting challenges.</p>
          <div class="hero-actions">
            <a class="button primary" href="${lastRoute}">▶ Continue Learning</a>
            ${lastQ ? `<a class="button glass" href="${lastQuestionHref}">🎯 Last Question</a>` : ''}
          </div>
          <div class="hero-mini-stats">
            <span>📘 24 Lessons</span><span>🏆 6 Unit Challenges</span><span>⭐ ${overallProgress()}% Complete</span>
          </div>
        </div>
      </section>

      <section class="section" id="units">
        <header class="section-header"><div><span class="eyebrow">Choose your adventure</span><h2>Explore the Units</h2></div><a href="#progress" class="text-link">View progress →</a></header>
        <div class="unit-grid">
          ${C.units.map(renderUnitCard).join('')}
        </div>
      </section>

      <section class="section review-section" id="reviews">
        <header class="section-header"><div><span class="eyebrow">Assessment</span><h2>Review Challenges</h2></div></header>
        <div class="review-grid">
          ${C.reviews.map((review, index) => {
            const locked = !unlockAll && (index === 0 ? !isUnitChallengeComplete(3) : !isUnitChallengeComplete(6));
            const result = state().challengeResults[`review:${review.id}`];
            return `<article class="review-card ${locked ? 'locked' : ''}">
              <div class="review-icon">${index === 0 ? '🛡️' : '👑'}</div>
              <div><span>${review.subtitle}</span><h3>${review.title}</h3><p>40 mixed questions covering vocabulary, grammar, reading, phonics and sentence order.</p></div>
              <div class="review-score">${result ? `${result.percent}%` : locked ? '🔒' : 'Ready'}</div>
              <button class="button ${locked ? 'disabled' : 'secondary'}" data-open-review="${review.id}" ${locked ? 'disabled' : ''}>${locked ? 'Complete earlier units' : 'Start Review'}</button>
            </article>`;
          }).join('')}
        </div>
      </section>

      <section class="value-strip">
        <div>🛡️ <b>Safe & Kid-Friendly</b><span>Clear, simple navigation</span></div>
        <div>🎮 <b>Gamified Learning</b><span>Points, stars and badges</span></div>
        <div>💾 <b>Auto Save</b><span>Last lesson and question</span></div>
        <div>📱 <b>Fully Responsive</b><span>Mobile, tablet and laptop</span></div>
      </section>
    `;
  }

  function renderUnitCard(unit) {
    const locked = !isUnitUnlocked(unit);
    const progress = unitProgress(unit);
    return `<article class="unit-card ${locked ? 'locked' : ''}" style="--unit:${unit.color}">
      <div class="unit-cover"><img src="${unit.cover}" alt="Unit ${unit.id}: ${escapeHTML(unit.title)}" /><div class="cover-gradient"></div><span class="unit-number">Unit ${unit.id}</span>${locked ? '<span class="lock-badge">🔒</span>' : ''}</div>
      <div class="unit-card-body"><h3>${escapeHTML(unit.title)}</h3><p>${escapeHTML(unit.tagline)}</p>
        <div class="progress-row"><div class="progress-track"><span style="width:${progress}%"></span></div><b>${progress}%</b></div>
        <button class="unit-open" data-open-unit="${unit.id}" ${locked ? 'disabled' : ''}>${locked ? 'Locked' : 'Explore'} <span>→</span></button>
      </div>
    </article>`;
  }

  function renderUnit(page, unitId) {
    const unit = findUnit(unitId);
    if (!unit) return navigate('#home', true);
    if (!isUnitUnlocked(unit)) {
      page.innerHTML = lockedPage('This unit is locked.', 'Complete the previous unit challenge to unlock it.', '#home');
      return;
    }
    const bank = state().challengeResults[`unit:${unit.id}`];
    page.innerHTML = `
      <section class="unit-banner" style="--unit:${unit.color}">
        <img src="${unit.cover}" alt="${escapeHTML(unit.title)}" />
        <div class="unit-banner-overlay"></div>
        <div class="unit-banner-copy"><span class="eyebrow">Unit ${unit.id}</span><h1>${escapeHTML(unit.title)}</h1><p>${escapeHTML(unit.tagline)}</p>
          <div class="progress-row light"><div class="progress-track"><span style="width:${unitProgress(unit)}%"></span></div><b>${unitProgress(unit)}%</b></div>
        </div>
        <div class="unit-trophy">${bank ? `<b>${bank.percent}%</b><small>Unit score</small>` : '<b>🏆</b><small>Unit Challenge</small>'}</div>
      </section>
      <section class="section compact">
        <header class="section-header"><div><span class="eyebrow">Step by step</span><h2>Lessons in this Unit</h2></div><a href="#home" class="text-link">← All units</a></header>
        <div class="lesson-list">
          ${unit.lessons.map((lesson, index) => renderLessonRow(unit, lesson, index)).join('')}
        </div>
        <article class="unit-challenge-card ${isUnitChallengeUnlocked(unit) ? '' : 'locked'}">
          <div class="challenge-medal">🏆</div><div><span>Final assessment</span><h3>Unit ${unit.id} Challenge</h3><p>30 varied questions to measure vocabulary, grammar, reading and phonics.</p></div>
          <div class="challenge-result">${bank ? `<b>${bank.percent}%</b><small>${bank.correct}/50 correct</small>` : isUnitChallengeUnlocked(unit) ? '<b>50</b><small>Questions</small>' : '<b>🔒</b><small>Complete lessons</small>'}</div>
          <button class="button primary" data-start-challenge="unit" data-challenge-id="${unit.id}" ${!isUnitChallengeUnlocked(unit) ? 'disabled' : ''}>${bank ? 'Try Again' : 'Start Challenge'} →</button>
        </article>
      </section>
    `;
  }

  function renderLessonRow(unit, lesson, index) {
    const unlocked = isLessonUnlocked(unit, index);
    const result = lessonChallengeResult(lesson.id);
    const progress = stationProgress(lesson);
    const status = result?.percent >= 70 ? 'Completed' : progress ? 'In Progress' : 'Not Started';
    return `<article class="lesson-row ${unlocked ? '' : 'locked'}">
      <div class="lesson-thumb"><img src="${unit.cover}" alt="" /><span>${index + 1}</span></div>
      <div class="lesson-row-copy"><small>Lesson ${index + 1}</small><h3>${escapeHTML(lesson.title)}</h3><p>${escapeHTML(lesson.focus)}</p><div class="progress-row"><div class="progress-track"><span style="width:${progress}%"></span></div><b>${progress}%</b></div></div>
      <span class="lesson-status ${status.toLocaleLowerCase().replace(' ','-')}">${unlocked ? status : '🔒 Locked'}</span>
      <button class="circle-button" data-open-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''} aria-label="Open ${escapeHTML(lesson.title)}">→</button>
    </article>`;
  }

  function renderLesson(page, lessonId, stationId) {
    const found = findLesson(lessonId);
    if (!found) return navigate('#home', true);
    const { unit, lesson, index } = found;
    if (!isLessonUnlocked(unit, index)) {
      page.innerHTML = lockedPage('This lesson is locked.', 'Complete the previous lesson challenge first.', `#unit/${unit.id}`);
      return;
    }
    const stations = lessonStations(lesson);
    let active = stations.find((s) => s.id === stationId) || stations[0];
    if (active.id === 'challenge') {
      navigate(`#challenge/lesson/${lesson.id}`, true);
      return;
    }
    page.innerHTML = `
      <section class="lesson-banner" style="--unit:${unit.color}">
        <div class="lesson-banner-bg" style="background-image:url('${unit.cover}')"></div>
        <div class="lesson-banner-copy"><span class="eyebrow">Unit ${unit.id} • Lesson ${index + 1}</span><h1>${escapeHTML(lesson.title)}</h1><p>${escapeHTML(lesson.focus)}</p><div class="lesson-meta"><span>📚 ${stations.length} Stations</span><span>🎯 25 Questions</span><span>⭐ ${stationProgress(lesson)}% Progress</span></div></div>
        <img class="lesson-characters" src="assets/images/omar-laila.png" alt="Omar and Laila" />
      </section>
      <section class="station-strip">
        ${stations.map((s, i) => {
          const completed = s.id === 'challenge' ? isLessonComplete(lesson.id) : Boolean(state().completedStations[lesson.id]?.[s.id]);
          const locked = s.id === 'challenge' && !isLessonChallengeUnlocked(lesson);
          return `<button class="station-tab ${s.id === active.id ? 'active' : ''} tone-${s.tone} ${locked ? 'locked' : ''}" data-station="${s.id}" data-lesson="${lesson.id}" ${locked ? 'disabled' : ''}><span class="station-number">${i + 1}</span><b>${s.icon}</b><strong>${s.title}</strong><small>${completed ? '✓ Completed' : locked ? 'Locked' : 'Open Station'}</small></button>`;
        }).join('')}
      </section>
      <section class="workspace">
        <header class="workspace-header"><div><span class="eyebrow">Learning Station</span><h2>${active.icon} ${active.title}</h2></div><a class="text-link" href="#unit/${unit.id}">← Back to Unit</a></header>
        <div id="stationContent">${renderStationContent(lesson, active.id)}</div>
      </section>
    `;
  }

  function stationCompleteButton(lesson, stationId) {
    const done = state().completedStations[lesson.id]?.[stationId];
    return `<button class="button ${done ? 'success' : 'primary'}" data-complete-station="${stationId}" data-lesson-id="${lesson.id}">${done ? '✓ Station Completed' : 'Complete This Station +20 XP'}</button>`;
  }

  function renderStationContent(lesson, stationId) {
    if (stationId === 'vocab') return renderVocab(lesson);
    if (stationId === 'notes') return `<div class="content-grid notes-grid">${(lesson.notes || []).map((n, i) => `<article class="note-card"><span>${i + 1}</span><h3>${escapeHTML(n.title)}</h3><p>${escapeHTML(n.body)}</p></article>`).join('')}</div><div class="station-footer">${stationCompleteButton(lesson, stationId)}</div>`;
    if (stationId === 'verbs') return `<div class="table-card"><table><thead><tr><th>Verb</th><th>Past Form</th><th>Simple Meaning</th><th>Example</th></tr></thead><tbody>${(lesson.verbs || []).map((v) => `<tr><td><b>${escapeHTML(v.base)}</b></td><td>${escapeHTML(v.past || '—')}</td><td>${escapeHTML(v.meaning)}</td><td>${escapeHTML(v.example)}</td></tr>`).join('')}</tbody></table></div><div class="station-footer">${stationCompleteButton(lesson, stationId)}</div>`;
    if (stationId === 'grammar') return renderGrammar(lesson);
    if (stationId === 'phonics') return renderPhonics(lesson);
    if (stationId === 'reading') return renderReading(lesson);
    return '';
  }

  function renderVocab(lesson) {
    const item = lesson.vocab[flashIndex % lesson.vocab.length];
    const known = Boolean(state().knownWords[lesson.id]?.[item.word]);
    const knownCount = Object.keys(state().knownWords[lesson.id] || {}).length;
    return `
      <div class="flash-layout">
        <button class="flash-arrow" data-flash-nav="prev" aria-label="Previous word">←</button>
        <div class="flash-card ${flashFlipped ? 'flipped' : ''}" data-action="flip-card" role="button" tabindex="0" aria-label="Flip vocabulary card">
          <div class="flash-inner">
            <article class="flash-face front"><span class="flash-icon">${wordIcon(item)}</span><h3>${escapeHTML(item.word)}</h3><button class="speak-button" data-speak="${escapeHTML(item.word)}" aria-label="Listen to ${escapeHTML(item.word)}">🔊</button><small>Tap to see the meaning</small></article>
            <article class="flash-face back"><span class="meaning-label">Meaning</span><p>${escapeHTML(item.meaning)}</p><hr><span class="meaning-label">Example</span><p>${escapeHTML(item.example)}</p><button class="speak-button" data-speak="${escapeHTML(item.example)}">🔊</button></article>
          </div>
        </div>
        <button class="flash-arrow" data-flash-nav="next" aria-label="Next word">→</button>
      </div>
      <div class="flash-progress"><div class="progress-track"><span style="width:${((flashIndex + 1) / lesson.vocab.length) * 100}%"></span></div><b>${flashIndex + 1} / ${lesson.vocab.length}</b><small>${knownCount} known</small></div>
      <div class="flash-actions"><button class="button outline" data-action="flip-card">↻ Flip Card</button><button class="button ${known ? 'success' : 'primary'}" data-know-word="${escapeHTML(item.word)}" data-lesson-id="${lesson.id}">${known ? '✓ I Know This Word' : 'I Know This Word +2 XP'}</button></div>
      <div class="station-footer">${stationCompleteButton(lesson, 'vocab')}</div>
    `;
  }

  function renderGrammar(lesson) {
    const g = lesson.grammar;
    return `<div class="grammar-layout"><article class="grammar-main"><span class="eyebrow">Rule</span><h3>${escapeHTML(g.title)}</h3><p class="lead">${escapeHTML(g.explanation)}</p><div class="rule-list">${g.rules.map((r) => `<div>✓ ${escapeHTML(r)}</div>`).join('')}</div></article><aside class="example-panel"><h3>Examples</h3>${g.examples.map((x) => `<p>💬 ${escapeHTML(x)}</p>`).join('')}${g.mistakes.length ? `<h3>Common Mistakes</h3>${g.mistakes.map((x) => `<p class="mistake">${escapeHTML(x)}</p>`).join('')}` : ''}</aside></div><div class="station-footer">${stationCompleteButton(lesson, 'grammar')}</div>`;
  }

  function renderPhonics(lesson) {
    const p = lesson.phonics;
    const letter = p.letters[activePhonicsLetterIndex % p.letters.length];
    return `<div class="phonics-tabs">${p.letters.map((l,i)=>`<button class="phonics-letter-tab ${i===activePhonicsLetterIndex?'active':''}" data-phonics-letter="${i}">${escapeHTML(l.upper)}${escapeHTML(l.lower)} <small>${escapeHTML(l.sound)}</small></button>`).join('')}</div>
      <div class="phonics-card enhanced">
        <div class="phonics-sound">
          <span>Sound Focus</span><h3>${escapeHTML(letter.upper)}${escapeHTML(letter.lower)}</h3><b>${escapeHTML(letter.sound)}</b>
          <p>Tap the speaker. Listen carefully, repeat the sound, then say the words.</p>
          <button class="sound-main-button" data-audio="${escapeHTML(letter.soundAudio)}" data-fallback="${escapeHTML(letter.upper)}"><span>🔊</span> Hear the sound</button>
        </div>
        <div class="sound-words">${letter.words.map((item)=>`<button data-audio="${escapeHTML(item.audio)}" data-fallback="${escapeHTML(item.word)}"><span class="word-icon">${wordIcon(item)}</span><strong>${escapeHTML(item.word)}</strong><small>🔊 Listen</small></button>`).join('')}</div>
      </div>
      <div class="tracing-lab">
        <div class="tracing-copy"><span class="eyebrow">Letter Tracing</span><h3>Trace ${escapeHTML(letter.upper)} and ${escapeHTML(letter.lower)}</h3><p>Use your finger, mouse or pen. Follow the light letter shape.</p><div class="trace-actions"><button class="button outline" data-clear-trace>Clear</button><button class="button primary" data-audio="${escapeHTML(letter.soundAudio)}" data-fallback="${escapeHTML(letter.upper)}">Hear Again 🔊</button></div></div>
        <canvas id="traceCanvas" class="trace-canvas" data-guide-letter="${escapeHTML(letter.upper+' '+letter.lower)}" aria-label="Trace the letter ${escapeHTML(letter.upper)}"></canvas>
      </div>
      <div class="station-footer">${stationCompleteButton(lesson, 'phonics')}</div>`;
  }

  function renderReading(lesson) {
    const r = lesson.reading;
    return `<div class="reading-layout"><article class="story-card"><span class="eyebrow">Reading for Understanding</span><h3>${escapeHTML(r.title)}</h3>${r.characters.length ? `<p class="characters"><b>Characters:</b> ${r.characters.map(escapeHTML).join(', ')}</p>` : ''}<p class="lead">${escapeHTML(r.summary)}</p><div class="main-idea"><b>Main idea</b><p>${escapeHTML(r.mainIdea)}</p></div></article><aside class="events-card"><h3>Events in Order</h3><ol>${r.events.map((event) => `<li>${escapeHTML(event)}</li>`).join('')}</ol></aside></div><div class="reading-questions"><h3>Think and Answer</h3>${r.questions.map((q) => `<details><summary>${escapeHTML(q.prompt)}</summary><p><b>Answer:</b> ${escapeHTML(q.answer)}</p></details>`).join('')}</div><div class="station-footer">${stationCompleteButton(lesson, 'reading')}</div>`;
  }

  function lockedPage(title, text, back) {
    return `<section class="empty-state"><div>🔒</div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(text)}</p><a class="button primary" href="${back}">Go Back</a></section>`;
  }

  function prepareChallenge(kind, id) {
    let questions;
    let title;
    let subtitle;
    let image = 'assets/images/question-scene.jpg';
    if (kind === 'lesson') {
      const found = findLesson(id);
      if (!found) return null;
      if (!isLessonChallengeUnlocked(found.lesson)) return { locked: true, back: `#lesson/${id}/vocab`, message: 'Complete all learning stations before starting the lesson challenge.' };
      questions = QE.buildLessonQuestions(found.lesson);
      title = found.lesson.title;
      subtitle = 'Lesson Challenge • 25 Questions';
      image = found.unit.cover;
    } else if (kind === 'unit') {
      const unit = findUnit(id);
      if (!unit) return null;
      if (!isUnitChallengeUnlocked(unit)) return { locked: true, back: `#unit/${unit.id}`, message: 'Complete all lessons before starting the unit challenge.' };
      questions = QE.buildUnitQuestions(unit);
      title = `Unit ${unit.id}: ${unit.title}`;
      subtitle = 'Unit Challenge • 30 Questions';
      image = unit.cover;
    }
    return { kind, id, questions, title, subtitle, image };
  }

  function renderChallenge(page, kind, id) {
    if (!activeChallenge || activeChallenge.kind !== kind || String(activeChallenge.id) !== String(id)) {
      activeChallenge = prepareChallenge(kind, id);
      challengeRuntime = null;
    }
    if (!activeChallenge) return navigate('#home', true);
    if (activeChallenge.locked) {
      page.innerHTML = lockedPage('Challenge Locked', activeChallenge.message, activeChallenge.back);
      return;
    }
    if (!challengeRuntime) {
      challengeRuntime = {
        index: 0, correct: 0, answered: [], checked: false, feedback: null, selected: null, reorder: [], match: {}, finished: false
      };
      const saved = state().lastQuestion;
      if (saved && saved.kind === kind && String(saved.id) === String(id) && Number.isInteger(saved.index) && saved.index < activeChallenge.questions.length) {
        challengeRuntime.index = saved.index;
        for (let i = 0; i < saved.index; i += 1) {
          const previousQuestion = activeChallenge.questions[i];
          const storedAnswer = state().answeredQuestions[previousQuestion.id];
          if (storedAnswer) {
            challengeRuntime.answered[i] = { questionId: previousQuestion.id, answer: storedAnswer.answer, correct: Boolean(storedAnswer.correct) };
            if (storedAnswer.correct) challengeRuntime.correct += 1;
          }
        }
      }
    }
    renderChallengeBody(page);
  }

  function renderChallengeBody(page) {
    const ch = activeChallenge;
    const run = challengeRuntime;
    if (run.finished) return renderChallengeResult(page);
    const q = ch.questions[run.index];
    Store.setLastQuestion({ kind: ch.kind, id: ch.id, index: run.index });
    page.innerHTML = `
      <section class="challenge-page">
        <header class="challenge-header"><a class="back-link" href="${ch.kind === 'lesson' ? `#lesson/${ch.id}/vocab` : ch.kind === 'unit' ? `#unit/${ch.id}` : '#home'}">← Exit Challenge</a><div><span>${escapeHTML(ch.subtitle)}</span><h1>${escapeHTML(ch.title)}</h1></div><div class="challenge-count">${run.index + 1} / ${ch.questions.length}</div></header>
        <div class="challenge-progress"><span style="width:${((run.index + 1) / ch.questions.length) * 100}%"></span></div>
        <div class="challenge-layout">
          <article class="question-card"><span class="question-category">${escapeHTML(q.category)}</span>${q.audioText ? `<button class="listen-question" data-audio="${escapeHTML(q.audioPath || '')}" data-fallback="${escapeHTML(q.audioText)}">🔊 Listen</button>` : ''}<h2>${escapeHTML(q.prompt)}</h2>${renderQuestionInput(q, run)}${renderFeedback(q, run)}<div class="question-controls"><button class="button outline" data-question-action="previous" ${run.index === 0 ? 'disabled' : ''}>← Previous</button>${run.checked ? `<button class="button primary" data-question-action="next">${run.index === ch.questions.length - 1 ? 'See Results' : (run.feedback?.correct ? 'Next' : 'Got It')} →</button>` : `<button class="button primary" data-question-action="check">Check Answer</button>`}</div></article>
          <aside class="question-side"><img src="${ch.image}" alt="Learning scene" /><div class="live-score"><span>⭐</span><b>${run.correct}</b><small>Correct</small></div><div class="live-score"><span>🔥</span><b>${state().streak}</b><small>Day Streak</small></div><p>Take your time. Read every word and do your best!</p></aside>
        </div>
      </section>
    `;
    bindEvents();
  }

  function renderQuestionInput(q, run) {
    if (q.type === 'mcq') return `<div class="option-list">${q.options.map((option, i) => `<button class="answer-option ${run.selected === option ? 'selected' : ''}" data-select-answer="${escapeHTML(option)}" ${run.checked ? 'disabled' : ''}><span>${String.fromCharCode(65 + i)}</span>${escapeHTML(option)}</button>`).join('')}</div>`;
    if (q.type === 'trueFalse') return `<div class="tf-grid"><button class="answer-option ${run.selected === true ? 'selected' : ''}" data-select-bool="true" ${run.checked ? 'disabled' : ''}><span>✓</span>True</button><button class="answer-option ${run.selected === false ? 'selected' : ''}" data-select-bool="false" ${run.checked ? 'disabled' : ''}><span>✕</span>False</button></div>`;
    if (q.type === 'fill') return `<label class="fill-label">Type the missing word or phrase<input id="fillAnswer" value="${escapeHTML(run.selected || '')}" ${run.checked ? 'disabled' : ''} autocomplete="off" spellcheck="false" /></label>`;
    if (q.type === 'reorder') {
      return `<div class="reorder-answer">${run.reorder.length ? run.reorder.map((w, i) => `<button data-remove-reorder="${i}" ${run.checked ? 'disabled' : ''}>${escapeHTML(w)} ×</button>`).join('') : '<span>Tap the words below to build the sentence.</span>'}</div><div class="word-bank">${q.words.map((w, i) => `<button data-add-reorder="${i}" ${run.checked || run.reorder.includes(w) ? 'disabled' : ''}>${escapeHTML(w)}</button>`).join('')}</div><button class="small-link" data-question-action="reset-order" ${run.checked ? 'disabled' : ''}>Reset words</button>`;
    }
    if (q.type === 'matching') {
      const meanings = QE.shuffle(q.pairs.map((p) => p.meaning), `${q.id}:ui`);
      return `<div class="matching-list">${q.pairs.map((p) => `<label><b>${escapeHTML(p.word)}</b><select data-match-word="${escapeHTML(p.word)}" ${run.checked ? 'disabled' : ''}><option value="">Choose a meaning</option>${meanings.map((m) => `<option value="${escapeHTML(m)}" ${run.match[p.word] === m ? 'selected' : ''}>${escapeHTML(m)}</option>`).join('')}</select></label>`).join('')}</div>`;
    }
    return '';
  }

  function renderFeedback(q, run) {
    if (!run.checked) return '';
    const correct = run.feedback?.correct;
    return `<div class="feedback ${correct ? 'correct' : 'wrong'}"><div>${correct ? '🎉' : '💡'}</div><section><h3>${correct ? 'Great job!' : 'Let’s learn from this one.'}</h3><p>${correct ? 'Your answer is correct.' : `Correct answer: ${escapeHTML(run.feedback.correctAnswer)}`}</p><small>${escapeHTML(q.explanation || '')}</small></section></div>`;
  }

  function getCurrentAnswer(q) {
    const run = challengeRuntime;
    if (q.type === 'fill') return ($('#fillAnswer')?.value || '').trim();
    if (q.type === 'reorder') return run.reorder.join(' ');
    if (q.type === 'matching') return run.match;
    return run.selected;
  }

  function evaluateAnswer(q, answer) {
    if (q.type === 'mcq') return answer === q.answer;
    if (q.type === 'trueFalse') return answer === q.answer;
    if (q.type === 'fill') return (q.accepted || [String(q.answer).toLocaleLowerCase()]).includes(String(answer).toLocaleLowerCase().trim());
    if (q.type === 'reorder') return normalizeSentence(answer) === normalizeSentence(q.answer);
    if (q.type === 'matching') return q.pairs.every((p) => answer[p.word] === p.meaning);
    return false;
  }

  function correctAnswerText(q) {
    if (q.type === 'trueFalse') return q.answer ? 'True' : 'False';
    if (q.type === 'matching') return q.pairs.map((p) => `${p.word} → ${p.meaning}`).join('; ');
    return q.answer;
  }

  function checkCurrentQuestion() {
    const q = activeChallenge.questions[challengeRuntime.index];
    const answer = getCurrentAnswer(q);
    const empty = answer === null || answer === undefined || answer === '' || (q.type === 'matching' && Object.keys(answer).length < q.pairs.length) || (q.type === 'reorder' && !challengeRuntime.reorder.length);
    if (empty) return toast('Please choose or enter an answer first.', 'warn');
    const correct = evaluateAnswer(q, answer);
    challengeRuntime.checked = true;
    challengeRuntime.feedback = { correct, correctAnswer: correctAnswerText(q) };
    const earlierAttempt = challengeRuntime.answered[challengeRuntime.index];
    if (earlierAttempt?.correct) challengeRuntime.correct = Math.max(0, challengeRuntime.correct - 1);
    challengeRuntime.answered[challengeRuntime.index] = { questionId: q.id, answer, correct };
    if (correct) challengeRuntime.correct += 1;
    Store.recordAnswer(q.id, correct, answer);
    if (correct) {
      const awarded = Store.award({ id: q.id, points: activeChallenge.kind === 'unit' ? 15 : 10, stars: 1, coins: 2 });
      if (awarded) toast(activeChallenge.kind === 'unit' ? '+15 points and +1 star!' : '+10 points and +1 star!', 'success');
      playTone('success');
    } else {
      playTone('wrong');
    }
    renderChallengeBody($('#page'));
    if (correct) {
      const currentIndex = challengeRuntime.index;
      setTimeout(() => {
        if (challengeRuntime && challengeRuntime.checked && challengeRuntime.index === currentIndex && !challengeRuntime.finished) nextQuestion();
      }, 2500);
    }
  }

  function nextQuestion() {
    const run = challengeRuntime;
    if (run.index >= activeChallenge.questions.length - 1) {
      run.finished = true;
      const total = activeChallenge.questions.length;
      const percent = Math.round((run.correct / total) * 100);
      const challengeId = `${activeChallenge.kind}:${activeChallenge.id}`;
      Store.setChallengeResult(challengeId, { correct: run.correct, total, percent });
      if (percent >= 70) {
        Store.award({ id: `${challengeId}:completion`, points: activeChallenge.kind === 'unit' ? 200 : 80, stars: activeChallenge.kind === 'unit' ? 20 : 8, coins: activeChallenge.kind === 'unit' ? 50 : 20 });
      }
      Store.update((draft) => { draft.lastQuestion = null; });
      renderChallengeResult($('#page'));
      return;
    }
    run.index += 1;
    run.checked = false; run.feedback = null; run.selected = null; run.reorder = []; run.match = {};
    renderChallengeBody($('#page'));
  }

  function renderChallengeResult(page) {
    const run = challengeRuntime;
    const total = activeChallenge.questions.length;
    const percent = Math.round((run.correct / total) * 100);
    const passed = percent >= 70;
    page.innerHTML = `<section class="result-page"><div class="result-confetti">${passed ? '🎉' : '📚'}</div><span class="eyebrow">Challenge Complete</span><h1>${passed ? 'Excellent Work!' : 'Good Effort — Keep Practising!'}</h1><p>${escapeHTML(activeChallenge.title)}</p><div class="score-ring" style="--score:${percent * 3.6}deg"><div><b>${percent}%</b><span>${run.correct}/${total} correct</span></div></div><div class="result-stats"><div><b>⭐ ${passed ? (activeChallenge.kind === 'unit' ? 20 : 8) : 0}</b><span>Bonus Stars</span></div><div><b>🏅 ${state().level}</b><span>Current Level</span></div><div><b>🔥 ${state().streak}</b><span>Day Streak</span></div></div><div class="result-actions"><button class="button outline" data-retry-challenge>Try Again</button><a class="button primary" href="${activeChallenge.kind === 'lesson' ? `#unit/${findLesson(activeChallenge.id).unit.id}` : '#home'}">Continue Learning →</a></div></section>`;
    bindEvents();
  }

  function renderReview(page, reviewId) {
    const review = C.reviews.find((r) => r.id === reviewId);
    if (!review) return navigate('#home', true);
    const unlocked = unlockAll || (reviewId === 'review1' ? isUnitChallengeComplete(3) : isUnitChallengeComplete(6));
    if (!unlocked) {
      page.innerHTML = lockedPage('Review Locked', 'Complete the required units first.', '#home#reviews');
      return;
    }
    if (!activeChallenge || activeChallenge.kind !== 'review' || activeChallenge.id !== reviewId) {
      activeChallenge = { kind: 'review', id: reviewId, title: review.title, subtitle: `${review.subtitle} • 40 Questions`, image: reviewId === 'review1' ? C.units[2].cover : C.units[5].cover, questions: QE.buildReviewQuestions(review, C) };
      challengeRuntime = { index: 0, correct: 0, answered: [], checked: false, feedback: null, selected: null, reorder: [], match: {}, finished: false };
    }
    // Reuse challenge renderer while keeping the review hash.
    const originalKind = activeChallenge.kind;
    renderChallengeBody(page);
    activeChallenge.kind = originalKind;
  }

  function renderProgress(page) {
    const totalLessons = C.units.flatMap((u) => u.lessons).length;
    const done = completedLessonCount();
    page.innerHTML = `<section class="page-title"><span class="eyebrow">Your learning journey</span><h1>My Progress</h1><p>Continue from where you stopped and see your strongest units.</p></section><section class="dashboard-stats"><article><span>🎯</span><b>${overallProgress()}%</b><small>Overall Progress</small></article><article><span>📘</span><b>${done}/${totalLessons}</b><small>Lessons Completed</small></article><article><span>⭐</span><b>${state().stars}</b><small>Stars Earned</small></article><article><span>🏅</span><b>Level ${state().level}</b><small>${state().points} XP</small></article></section><div class="progress-unit-list">${C.units.map((unit) => `<article><img src="${unit.cover}" alt="" /><div><span>Unit ${unit.id}</span><h3>${escapeHTML(unit.title)}</h3><div class="progress-row"><div class="progress-track"><span style="width:${unitProgress(unit)}%"></span></div><b>${unitProgress(unit)}%</b></div></div><a class="circle-button" href="#unit/${unit.id}">→</a></article>`).join('')}</div><div class="danger-zone"><div><h3>Reset local progress</h3><p>This clears progress for the current student on this browser only.</p></div><button class="button danger" data-reset-progress>Reset Progress</button></div>`;
  }

  function renderRewards(page) {
    const earned = new Set(state().badges);
    page.innerHTML = `<section class="page-title"><span class="eyebrow">Celebrate every step</span><h1>Rewards & Badges</h1><p>Badges are earned through real learning progress, not repeated answers.</p></section><section class="reward-hero"><div><span>⭐</span><b>${state().stars}</b><small>Total Stars</small></div><div><span>🪙</span><b>${state().coins}</b><small>Coins</small></div><div><span>🏅</span><b>Level ${state().level}</b><small>${Math.max(0, 300 - (state().points % 300))} XP to next level</small></div></section><div class="badge-grid">${BADGES.map((badge) => `<article class="badge-card ${earned.has(badge.id) ? 'earned' : 'locked'}"><div>${earned.has(badge.id) ? badge.icon : '🔒'}</div><h3>${escapeHTML(badge.title)}</h3><p>${escapeHTML(badge.description)}</p><span>${earned.has(badge.id) ? 'Earned' : 'Keep learning'}</span></article>`).join('')}</div>`;
  }

  function renderAbout(page) {
    page.innerHTML = `<section class="about-page"><div class="teacher-photo"><img src="assets/images/omar-laila.png" alt="English learning characters" /></div><article><span class="eyebrow">Meet Your Teacher</span><h1>Mr.Mohamed Farid</h1><h3>Senior English Instructor</h3><p>This interactive website was prepared to help Primary 1 learners understand English through simple explanations, colourful flashcards, meaningful reading and varied practice.</p><div class="teacher-details"><div><b>🎓 Education</b><span>BA & Education — Faculty of Education, Mansoura University — 2007</span></div><div><b>🏫 Current Role</b><span>English Teacher at AlAndalus Private Schools — Egyptian Section</span></div><div><b>✨ Teaching Approach</b><span>Clear explanations, child-friendly examples, practice and positive encouragement.</span></div></div><p class="signature">${escapeHTML(C.course.signature)}</p></article></section>`;
  }

  function openModal(content) {
    $('#modalRoot').innerHTML = `<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><button class="modal-close" data-action="close-modal">×</button>${content}</div></div>`;
  }

  function setupTraceCanvas(forceClear = false) {
    const canvas = document.getElementById('traceCanvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    if (forceClear || canvas.width !== Math.round(rect.width * ratio) || canvas.height !== Math.round(rect.height * ratio)) {
      canvas.width = Math.max(320, Math.round(rect.width * ratio));
      canvas.height = Math.max(220, Math.round(rect.height * ratio));
      const ctx = canvas.getContext('2d');
      ctx.setTransform(ratio,0,0,ratio,0,0);
      ctx.clearRect(0,0,rect.width,rect.height);
      ctx.font = `900 ${Math.min(rect.height*0.62, 210)}px Arial Rounded MT Bold, Arial, sans-serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.lineWidth=3; ctx.setLineDash([10,10]); ctx.strokeStyle='rgba(42,112,255,.24)';
      ctx.strokeText(canvas.dataset.guideLetter || 'Aa', rect.width/2, rect.height/2+4);
      ctx.setLineDash([]);
    }
    if (canvas.dataset.bound === '1') return;
    canvas.dataset.bound='1';
    const ctx=canvas.getContext('2d'); let drawing=false, last=null;
    const pos=(e)=>{const r=canvas.getBoundingClientRect();const p=e.touches?e.touches[0]:e;return {x:p.clientX-r.left,y:p.clientY-r.top};};
    const start=(e)=>{e.preventDefault();drawing=true;last=pos(e);};
    const move=(e)=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.strokeStyle='#ff6d3a';ctx.lineWidth=10;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;};
    const end=()=>{drawing=false;last=null;};
    canvas.addEventListener('pointerdown',start);canvas.addEventListener('pointermove',move);window.addEventListener('pointerup',end);
    canvas.addEventListener('touchstart',start,{passive:false});canvas.addEventListener('touchmove',move,{passive:false});window.addEventListener('touchend',end);
  }

  function bindEvents() {
    requestAnimationFrame(() => setupTraceCanvas(false));
    $$('[data-action="toggle-drawer"]').forEach((el) => el.onclick = () => { drawerOpen = !drawerOpen; render(); });
    $$('[data-open-unit]').forEach((el) => el.onclick = () => {
      const unit = findUnit(el.dataset.openUnit);
      if (!isUnitUnlocked(unit)) return toast('Complete the previous unit challenge first.', 'warn');
      navigate(`#unit/${unit.id}`);
    });
    $$('[data-open-lesson]').forEach((el) => el.onclick = () => {
      const found = findLesson(el.dataset.openLesson);
      if (!found || !isLessonUnlocked(found.unit, found.index)) return toast('Complete the previous lesson first.', 'warn');
      navigate(`#lesson/${found.lesson.id}/vocab`);
    });
    $$('[data-station]').forEach((el) => el.onclick = () => {
      if (el.dataset.station === 'challenge') return navigate(`#challenge/lesson/${el.dataset.lesson}`);
      navigate(`#lesson/${el.dataset.lesson}/${el.dataset.station}`);
    });
    $$('[data-complete-station]').forEach((el) => el.onclick = () => {
      const lessonId = el.dataset.lessonId;
      const stationId = el.dataset.completeStation;
      const already = Boolean(state().completedStations[lessonId]?.[stationId]);
      Store.markStation(lessonId, stationId);
      if (!already) Store.award({ id: `${lessonId}:station:${stationId}`, points: 20, stars: 2, coins: 5 });
      toast(already ? 'This station is already complete.' : 'Station complete! +20 XP and +2 stars', 'success');
      render();
    });
    $$('[data-start-challenge]').forEach((el) => el.onclick = () => navigate(`#challenge/${el.dataset.startChallenge}/${el.dataset.challengeId}`));
    $$('[data-open-review]').forEach((el) => el.onclick = () => navigate(`#review/${el.dataset.openReview}`));
    $$('[data-action="flip-card"]').forEach((el) => el.onclick = (e) => { if (e.target.closest('[data-speak]')) return; flashFlipped = !flashFlipped; renderLesson($('#page'), route.lessonId, route.station); bindEvents(); });
    $$('[data-flash-nav]').forEach((el) => el.onclick = () => {
      const found = findLesson(route.lessonId); if (!found) return;
      flashIndex = (flashIndex + (el.dataset.flashNav === 'next' ? 1 : -1) + found.lesson.vocab.length) % found.lesson.vocab.length;
      flashFlipped = false; renderLesson($('#page'), route.lessonId, route.station); bindEvents();
    });
    $$('[data-know-word]').forEach((el) => el.onclick = () => {
      const known = Boolean(state().knownWords[el.dataset.lessonId]?.[el.dataset.knowWord]);
      Store.markKnownWord(el.dataset.lessonId, el.dataset.knowWord);
      if (!known) Store.award({ id: `${el.dataset.lessonId}:word:${el.dataset.knowWord}`, points: 2, stars: 0, coins: 1 });
      toast(known ? 'You already know this word.' : 'Great! Word added to your known list.', 'success');
      renderLesson($('#page'), route.lessonId, route.station); bindEvents();
    });
    $$('[data-speak]').forEach((el) => el.onclick = (e) => { e.stopPropagation(); speak(el.dataset.speak); });
    $$('[data-audio]').forEach((el) => el.onclick = (e) => { e.stopPropagation(); playAudio(el.dataset.audio, el.dataset.fallback || ''); });
    $$('[data-phonics-letter]').forEach((el) => el.onclick = () => { activePhonicsLetterIndex = Number(el.dataset.phonicsLetter || 0); renderLesson($('#page'), route.lessonId, 'phonics'); bindEvents(); });
    $$('[data-clear-trace]').forEach((el) => el.onclick = () => setupTraceCanvas(true));
    $$('[data-select-answer]').forEach((el) => el.onclick = () => { challengeRuntime.selected = el.dataset.selectAnswer; renderChallengeBody($('#page')); });
    $$('[data-select-bool]').forEach((el) => el.onclick = () => { challengeRuntime.selected = el.dataset.selectBool === 'true'; renderChallengeBody($('#page')); });
    $$('[data-add-reorder]').forEach((el) => el.onclick = () => { const q = activeChallenge.questions[challengeRuntime.index]; challengeRuntime.reorder.push(q.words[Number(el.dataset.addReorder)]); renderChallengeBody($('#page')); });
    $$('[data-remove-reorder]').forEach((el) => el.onclick = () => { challengeRuntime.reorder.splice(Number(el.dataset.removeReorder), 1); renderChallengeBody($('#page')); });
    $$('[data-match-word]').forEach((el) => el.onchange = () => { challengeRuntime.match[el.dataset.matchWord] = el.value; });
    $$('[data-question-action]').forEach((el) => el.onclick = () => {
      const action = el.dataset.questionAction;
      if (action === 'check') checkCurrentQuestion();
      else if (action === 'next') nextQuestion();
      else if (action === 'previous' && challengeRuntime.index > 0) { challengeRuntime.index -= 1; challengeRuntime.checked = false; challengeRuntime.feedback = null; challengeRuntime.selected = null; challengeRuntime.reorder = []; challengeRuntime.match = {}; renderChallengeBody($('#page')); }
      else if (action === 'reset-order') { challengeRuntime.reorder = []; renderChallengeBody($('#page')); }
    });
    $$('[data-retry-challenge]').forEach((el) => el.onclick = () => { challengeRuntime = { index: 0, correct: 0, answered: [], checked: false, feedback: null, selected: null, reorder: [], match: {}, finished: false }; renderChallengeBody($('#page')); });
    $$('[data-reset-progress]').forEach((el) => el.onclick = () => openModal(`<h2>Reset progress?</h2><p>This removes local progress for <b>${escapeHTML(state().student.name)}</b> on this browser. It cannot be undone.</p><div class="modal-actions"><button class="button outline" data-action="close-modal">Cancel</button><button class="button danger" data-confirm-reset>Reset</button></div>`));
    $$('[data-action="close-modal"]').forEach((el) => el.onclick = () => { $('#modalRoot').innerHTML = ''; });
    $$('[data-confirm-reset]').forEach((el) => el.onclick = () => { Store.reset(); $('#modalRoot').innerHTML = ''; navigate('#home'); toast('Progress reset.', 'info'); });
  }

  window.addEventListener('hashchange', setRouteFromHash);
  window.addEventListener('p1:student', () => render());
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawerOpen) { drawerOpen = false; render(); }
    if (event.key === 'Enter' && event.target?.classList?.contains('flash-card')) { flashFlipped = !flashFlipped; render(); }
  });

  document.addEventListener('DOMContentLoaded', () => {
    if (!location.hash) location.hash = '#home';
    else setRouteFromHash();
  });
})();
