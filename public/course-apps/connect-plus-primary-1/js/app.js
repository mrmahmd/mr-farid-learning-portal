(() => {
  'use strict';

  const DATA = window.CURRICULUM;
  const STORAGE_KEY = 'connectPlusPrimary1Progress_v1';
  const allUnitIds = Object.keys(DATA.units).sort((a, b) => DATA.units[a].number - DATA.units[b].number);

  const defaultState = () => ({
    profile: null,
    points: 0,
    completedQuestions: {},
    bestScores: {},
    lastView: { route: 'home' },
    lastQuestion: null,
    sessions: {},
    previewUnlocked: new URLSearchParams(location.search).get('preview') === '1'
  });

  let state = loadState();
  let activeUnitTab = 'overview';
  let practice = null;
  let autoNextTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const main = $('#mainContent');
  const splash = $('#splashScreen');
  const shell = $('#appShell');
  const profileMenu = $('#profileMenu');
  const dialog = $('#infoDialog');
  const dialogContent = $('#dialogContent');

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...defaultState(), ...(saved || {}) };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateChrome();
    window.MrFaridCourseProgress?.queueSave();
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[ch]);
  }

  function titleCase(value = '') {
    return value.replace(/\b\w/g, ch => ch.toUpperCase());
  }

  function normalizeAnswer(value = '') {
    return String(value)
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/[?.!,]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    $('#toastRegion').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function playTone(kind = 'correct') {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = kind === 'correct' ? 660 : 210;
      osc.type = kind === 'correct' ? 'sine' : 'triangle';
      gain.gain.setValueAtTime(.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .35);
      osc.start();
      osc.stop(ctx.currentTime + .35);
    } catch { /* audio is optional */ }
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Speech is not supported on this device.');
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = .82;
    utterance.pitch = 1.05;
    speechSynthesis.speak(utterance);
  }

  function setActiveNav(route) {
    $$('.topnav button').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
  }

  function updateChrome() {
    const name = state.profile?.name || 'Student';
    const initial = name.trim().charAt(0).toUpperCase() || 'S';
    $('#pointsValue').textContent = state.points || 0;
    $('#studentInitial').textContent = initial;
    $('#profileAvatar').textContent = initial;
    $('#profileName').textContent = name;
    $('#previewState').textContent = state.previewUnlocked ? 'On' : 'Off';
    $('#continueNavBtn').disabled = !state.lastView || state.lastView.route === 'home';
  }

  function showApp() {
    splash.hidden = true;
    shell.hidden = false;
    updateChrome();
    routeFromHash();
  }

  function showSplash() {
    shell.hidden = true;
    splash.hidden = false;
    if (state.profile?.name) $('#studentName').value = state.profile.name;
  }

  function routeToHash(route, id = '') {
    if (route === 'theme') return `#theme/${id}`;
    if (route === 'unit') return `#unit/${id}`;
    if (route === 'special') return `#special/${id}`;
    if (route === 'practice') return `#practice/${id}`;
    return `#${route}`;
  }

  function navigate(route, id = '', options = {}) {
    clearTimeout(autoNextTimer);
    profileMenu.hidden = true;
    if (!options.noSave && ['theme','unit','special','practice'].includes(route)) {
      state.lastView = { route, id };
      state.portalLastActivity = { detail: route === 'practice' ? `Practice in ${id}` : route === 'unit' ? `Unit ${id}` : route === 'theme' ? `Theme ${id}` : route === 'special' ? `Special activity ${id}` : 'Home', path: route };
      saveState();
    }
    const hash = routeToHash(route, id);
    if (location.hash !== hash) history.pushState(null, '', hash);
    renderRoute(route, id, options);
  }

  function routeFromHash() {
    const raw = location.hash.replace(/^#/, '') || 'home';
    const [route, id] = raw.split('/');
    renderRoute(route, id || '', { noSave: true });
  }

  function renderRoute(route, id, options = {}) {
    practice = route === 'practice' ? practice : null;
    setActiveNav(route === 'theme' || route === 'unit' || route === 'special' || route === 'practice' ? '' : route);
    switch (route) {
      case 'home': renderHome(); break;
      case 'remember': renderRemember(); break;
      case 'dashboard': renderDashboard(); break;
      case 'theme': renderTheme(id); break;
      case 'unit': renderUnit(id); break;
      case 'special': renderSpecial(id); break;
      case 'practice': startPractice(id, options.reviewMode); break;
      default: renderHome();
    }
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getQuestionSet(id) {
    if (DATA.units[id]) return { ...DATA.units[id], kind: 'unit' };
    if (DATA.specials[id]) return DATA.specials[id];
    return null;
  }

  function completedSet(id) {
    return Number.isFinite(state.bestScores[id]);
  }

  function scoreFor(id) {
    return Number(state.bestScores[id] || 0);
  }

  function isUnitUnlocked(unitId) {
    if (state.previewUnlocked) return true;
    const index = allUnitIds.indexOf(unitId);
    if (index <= 0) return true;
    return scoreFor(allUnitIds[index - 1]) >= DATA.unlockScore;
  }

  function themeUnlocked(theme) {
    return isUnitUnlocked(theme.units[0]);
  }

  function specialUnlocked(special) {
    if (state.previewUnlocked) return true;
    const theme = DATA.themes.find(t => t.id === special.theme);
    if (!theme) return true;
    if (special.kind === 'reader') return theme.units.some(id => scoreFor(id) >= DATA.unlockScore) || theme.units[0] === 'unit1';
    return theme.units.every(id => scoreFor(id) >= DATA.unlockScore);
  }

  function overallPercent() {
    const completed = Object.keys(state.completedQuestions || {}).length;
    return Math.min(100, Math.round((completed / DATA.questionCount) * 100));
  }

  function completedUnitsCount() {
    return allUnitIds.filter(completedSet).length;
  }

  function homeThemeCard(theme) {
    const locked = !themeUnlocked(theme);
    const units = theme.units.map(id => DATA.units[id]);
    const completed = units.filter(u => completedSet(u.id)).length;
    return `
      <article class="theme-card">
        <div class="theme-art"><img src="${theme.cover}" alt="Theme ${theme.number}: ${escapeHTML(theme.title)} cover" /></div>
        <div class="theme-copy">
          <span class="badge ${locked ? 'locked' : 'gold'}">${locked ? '🔒 Locked' : `Theme ${theme.number}`}</span>
          <h2>${escapeHTML(theme.title)}</h2>
          <p>${escapeHTML(theme.subtitle)}</p>
          <div class="theme-unit-list">${units.map(u => `<span>Unit ${u.number}: ${escapeHTML(u.title)}</span>`).join('')}</div>
          <button class="primary-btn" data-open-theme="${theme.id}" ${locked ? 'disabled' : ''}>${locked ? 'Complete the previous unit' : `Explore Theme ${theme.number}`}</button>
          <div class="card-footer"><small>${completed}/${units.length} units finished</small><span class="badge ${completed === units.length ? 'finished' : ''}">${Math.round((completed / units.length) * 100)}%</span></div>
        </div>
      </article>`;
  }

  function renderHome() {
    const name = escapeHTML(state.profile?.name || 'Student');
    const percent = overallPercent();
    main.innerHTML = `
      <section class="welcome-strip">
        <div class="welcome-panel">
          <p class="eyebrow" style="color:#ffd978">Welcome back</p>
          <h1>Hello, ${name}! 👋</h1>
          <p>Choose a theme, learn the language, practise with direct questions, and collect stars as you progress.</p>
          <div class="quick-actions">
            <button class="secondary-btn" data-action="continue">Continue Learning</button>
            <button class="ghost-btn" data-route="dashboard">View My Dashboard</button>
          </div>
        </div>
        <div class="stats-card">
          <div class="stat-line"><span>Learning progress</span><strong>${percent}%</strong></div>
          <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
          <div class="stat-line"><span>Units finished</span><strong>${completedUnitsCount()}/6</strong></div>
          <div class="stat-line"><span>Total points</span><strong>${state.points} ⭐</strong></div>
        </div>
      </section>

      <section>
        <div class="section-title"><div><h2>Choose Your Theme</h2><p>Each theme contains three units, a review challenge, and a reader.</p></div><span class="badge gold">2 Themes</span></div>
        <div class="card-grid">${DATA.themes.map(homeThemeCard).join('')}</div>
      </section>
    `;
  }

  function renderTheme(themeId) {
    const theme = DATA.themes.find(t => t.id === themeId);
    if (!theme || !themeUnlocked(theme)) {
      showToast('This theme is locked. Complete the previous unit first.');
      navigate('home');
      return;
    }
    const units = theme.units.map(id => DATA.units[id]);
    const review = DATA.specials[theme.review];
    const reader = DATA.specials[theme.reader];
    main.innerHTML = `
      <div class="page-head">
        <div><span class="badge gold">Theme ${theme.number}</span><h1>${escapeHTML(theme.title)}</h1><p>${escapeHTML(theme.subtitle)}</p></div>
        <div class="page-actions"><button class="ghost-btn" data-route="home">← Home</button></div>
      </div>

      <article class="theme-card" style="margin-bottom:30px">
        <div class="theme-art"><img src="${theme.cover}" alt="${escapeHTML(theme.title)} cover" /></div>
        <div class="theme-copy">
          <span class="badge gold">Theme ${theme.number} Journey</span>
          <h2>${escapeHTML(theme.title)}</h2>
          <p>Study each unit in order. Finish the unit challenge with at least ${DATA.unlockScore}% to unlock the next adventure.</p>
          <div class="theme-unit-list">${units.map(u => `<span>Unit ${u.number}</span>`).join('')}</div>
        </div>
      </article>

      <div class="section-title"><div><h2>Units</h2><p>Open a unit to explore vocabulary, language, reading, phonics, values, and a project.</p></div></div>
      <div class="unit-grid">${units.map(unitCard).join('')}</div>

      <div class="section-title"><div><h2>Review & Reader</h2><p>Bring the language together in a challenge and an extended reading experience.</p></div></div>
      <div class="special-grid">
        ${specialCard(review)}
        ${specialCard(reader)}
      </div>
    `;
  }

  function unitCard(unit) {
    const locked = !isUnitUnlocked(unit.id);
    const finished = completedSet(unit.id);
    return `
      <article class="unit-card ${locked ? 'locked' : ''}">
        <div class="unit-card-image">
          <img src="${unit.cover}" alt="Unit ${unit.number}: ${escapeHTML(unit.title)} cover" />
          ${locked ? '<div class="lock-overlay" aria-label="Locked">🔒</div>' : ''}
        </div>
        <div class="unit-card-body">
          <span class="badge ${finished ? 'finished' : locked ? 'locked' : 'gold'}">${finished ? `Finished • ${scoreFor(unit.id)}%` : locked ? 'Locked' : `Unit ${unit.number}`}</span>
          <h3>${escapeHTML(unit.title)}</h3>
          <p>${escapeHTML(unit.overview)}</p>
          <div class="card-footer"><span>${unit.questions.length} challenge questions</span><button class="card-link" data-open-unit="${unit.id}" ${locked ? 'disabled' : ''}>Open →</button></div>
        </div>
      </article>`;
  }

  function specialCard(item) {
    const locked = !specialUnlocked(item);
    const finished = completedSet(item.id);
    return `
      <article class="special-card">
        <div class="special-icon">${item.icon}</div>
        <div>
          <span class="badge ${finished ? 'finished' : locked ? 'locked' : item.kind === 'review' ? 'gold' : 'purple'}">${finished ? `Finished • ${scoreFor(item.id)}%` : locked ? 'Locked' : titleCase(item.kind)}</span>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.subtitle)}</p>
        </div>
        <button class="card-link" data-open-special="${item.id}" ${locked ? 'disabled' : ''}>Open →</button>
      </article>`;
  }

  function renderUnit(unitId) {
    const unit = DATA.units[unitId];
    if (!unit || !isUnitUnlocked(unitId)) {
      showToast('Finish the previous unit challenge to unlock this unit.');
      navigate('home');
      return;
    }
    activeUnitTab = activeUnitTab || 'overview';
    main.innerHTML = `
      <div class="page-head">
        <div><span class="badge gold">Unit ${unit.number}</span><h1>${escapeHTML(unit.title)}</h1><p>${escapeHTML(unit.overview)}</p></div>
        <div class="page-actions"><button class="ghost-btn" data-open-theme="${unit.theme}">← Back to Theme</button><button class="secondary-btn" data-start-practice="${unit.id}">${completedSet(unit.id) ? 'Review Challenge' : 'Start Challenge'}</button></div>
      </div>
      <article class="hero-card unit-hero"><img src="${unit.cover}" alt="Unit ${unit.number}: ${escapeHTML(unit.title)} cover" /></article>
      <nav class="unit-tabs" aria-label="Unit sections">
        ${['overview','vocabulary','language','reading','phonics','values','project','challenge'].map(tab => `<button data-unit-tab="${tab}" class="${tab === activeUnitTab ? 'active' : ''}">${titleCase(tab)}</button>`).join('')}
      </nav>
      <section id="unitTabContent">${renderUnitTab(unit, activeUnitTab)}</section>
    `;
  }

  function renderUnitTab(unit, tab) {
    switch (tab) {
      case 'vocabulary':
        return `<article class="content-card"><h2>Vocabulary</h2><p>Tap the speaker button to hear each word.</p><div class="word-groups">${unit.vocabulary.map(group => `<div class="word-group"><h3>${escapeHTML(group.group)}</h3><div class="word-chips">${group.words.map(word => `<span class="word-chip">${escapeHTML(word)}<button data-speak="${escapeHTML(word)}" aria-label="Hear ${escapeHTML(word)}">🔊</button></span>`).join('')}</div></div>`).join('')}</div></article>`;
      case 'language':
        return `<article class="content-card"><h2>Language Patterns</h2><p>Read, listen, and use the complete sentence.</p><ul class="pattern-list">${unit.language.map(line => `<li>${escapeHTML(line)} <button class="speak-btn" data-speak="${escapeHTML(line)}" aria-label="Hear sentence">🔊</button></li>`).join('')}</ul></article>`;
      case 'reading':
        return `<article class="content-card"><h2>Reading & Speaking</h2><ul class="simple-list">${unit.reading.map(line => `<li>${escapeHTML(line)}</li>`).join('')}</ul><p><strong>Teacher tip:</strong> Ask the child to point, describe, and answer using a full simple sentence.</p></article>`;
      case 'phonics':
        return `<article class="content-card"><h2>Phonics</h2><div class="phonics-box"><h3>${escapeHTML(unit.phonics.focus)}</h3><p>Listen carefully and repeat each example.</p><div class="phonics-examples">${unit.phonics.examples.map(word => `<button data-speak="${escapeHTML(word)}">🔊 ${escapeHTML(word)}</button>`).join('')}</div></div></article>`;
      case 'values':
        return `<article class="content-card"><h2>Values & Life Skills</h2><ul class="simple-list">${unit.values.map(line => `<li>${escapeHTML(line)}</li>`).join('')}</ul></article>`;
      case 'project':
        return `<article class="content-card"><h2>${escapeHTML(unit.project.title)}</h2><p>Use simple materials and speak English while you work.</p><ol class="steps-list">${unit.project.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></article>`;
      case 'challenge':
        return challengePanel(unit);
      default:
        return `<div class="card-grid"><article class="content-card"><h2>What you will learn</h2><p>${escapeHTML(unit.overview)}</p><ul class="simple-list"><li>${unit.vocabulary.reduce((n,g)=>n+g.words.length,0)} key words and phrases</li><li>${unit.language.length} useful language patterns</li><li>${unit.phonics.focus}</li><li>A creative project and ${unit.questions.length}-question challenge</li></ul></article><article class="content-card"><h2>Best way to study</h2><ul class="steps-list"><li>Explore the vocabulary and listen.</li><li>Read the language patterns aloud.</li><li>Study reading, phonics, and values.</li><li>Complete the project.</li><li>Finish the challenge with ${DATA.unlockScore}% or more.</li></ul></article></div>`;
    }
  }

  function challengePanel(set) {
    const finished = completedSet(set.id);
    const score = scoreFor(set.id);
    return `<article class="challenge-panel"><span class="badge gold">Unit Challenge</span><h2>${escapeHTML(set.title)} Challenge</h2><p>Direct, child-friendly questions based on real language use. Wrong answers show the correct answer before moving on.</p><div class="challenge-stats"><span>📝 ${set.questions.length} questions</span><span>⭐ ${DATA.pointsPerCorrect} points per new correct answer</span><span>🔓 ${DATA.unlockScore}% unlock score</span>${finished ? `<span>✅ Best score: ${score}%</span>` : ''}</div><button class="secondary-btn" data-start-practice="${set.id}">${finished ? 'Review Without Extra Points' : 'Start Challenge'}</button></article>`;
  }

  function renderSpecial(id) {
    const item = DATA.specials[id];
    if (!item || !specialUnlocked(item)) {
      showToast('Complete the required units to unlock this activity.');
      navigate('home');
      return;
    }
    const theme = DATA.themes.find(t => t.id === item.theme);
    main.innerHTML = `
      <div class="page-head"><div><span class="badge ${item.kind === 'review' ? 'gold' : 'purple'}">${titleCase(item.kind)}</span><h1>${item.icon} ${escapeHTML(item.title)}</h1><p>${escapeHTML(item.subtitle)}</p></div><div class="page-actions"><button class="ghost-btn" data-open-theme="${theme.id}">← Back to Theme</button></div></div>
      ${item.summary ? `<article class="content-card"><h2>Reader Summary</h2><ul class="simple-list">${item.summary.map(s => `<li>${escapeHTML(s)}</li>`).join('')}</ul></article>` : `<article class="content-card"><h2>Review Mission</h2><p>This challenge revises vocabulary, language, phonics, reading, and values from the three units in ${escapeHTML(theme.title)}.</p></article>`}
      <div style="margin-top:22px">${challengePanel(item)}</div>
    `;
  }

  function renderRemember() {
    const colorMap = { red:'#ef4444',blue:'#3b82f6',yellow:'#facc15',green:'#22c55e',orange:'#fb923c',purple:'#a855f7',white:'#ffffff',black:'#111827' };
    main.innerHTML = `
      <div class="page-head"><div><span class="badge gold">Warm-up</span><h1>Let’s Remember</h1><p>Quickly revise colors, numbers, shapes, and initial letter sounds before beginning the units.</p></div></div>
      <div class="remember-grid">
        <article class="remember-card"><h2>Colors</h2><div class="word-groups">${DATA.remember.colors.map(c => `<button class="color-swatch" data-speak="${c}"><span class="color-dot" style="background:${colorMap[c]}"></span><strong>${titleCase(c)}</strong> 🔊</button>`).join('')}</div></article>
        <article class="remember-card"><h2>Numbers 1–10</h2><div class="number-grid">${DATA.remember.numbers.map(n => `<button class="number-chip" data-speak="${n}">${n} 🔊</button>`).join('')}</div></article>
        <article class="remember-card"><h2>Shapes</h2><div class="shape-grid">${[['circle','●'],['square','■'],['triangle','▲'],['rectangle','▭']].map(([name,symbol]) => `<button class="shape-chip" data-speak="${name}">${symbol}<small>${titleCase(name)}</small></button>`).join('')}</div></article>
        <article class="remember-card"><h2>Initial Letters</h2><p>${escapeHTML(DATA.remember.phonics)}</p><div class="number-grid">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => `<button class="number-chip" data-speak="${l}">${l}</button>`).join('')}</div></article>
      </div>
    `;
  }

  function renderDashboard() {
    const percent = overallPercent();
    const solved = Object.keys(state.completedQuestions).length;
    main.innerHTML = `
      <div class="page-head"><div><span class="badge green">Student Dashboard</span><h1>${escapeHTML(state.profile?.name || 'Student')}’s Progress</h1><p>Your progress is saved automatically on this device.</p></div><div class="page-actions"><button class="primary-btn" data-action="continue">Continue Learning</button></div></div>
      <div class="dashboard-grid">
        <article class="dashboard-stat"><small>Total points</small><strong>${state.points} ⭐</strong></article>
        <article class="dashboard-stat"><small>Questions attempted</small><strong>${solved}</strong></article>
        <article class="dashboard-stat"><small>Units finished</small><strong>${completedUnitsCount()}/6</strong></article>
        <article class="dashboard-stat"><small>Overall progress</small><strong>${percent}%</strong></article>
      </div>
      <div class="section-title"><div><h2>Unit Progress</h2><p>Score ${DATA.unlockScore}% or more to unlock the next unit.</p></div></div>
      <div class="progress-list">${allUnitIds.map(id => {
        const unit = DATA.units[id];
        const locked = !isUnitUnlocked(id);
        const score = scoreFor(id);
        return `<article class="progress-row"><img src="${unit.cover}" alt="${escapeHTML(unit.title)}" /><div><h3>Unit ${unit.number}: ${escapeHTML(unit.title)}</h3><p>${locked ? 'Locked' : completedSet(id) ? `Best score: ${score}%` : 'Ready to study'}</p><div class="progress-track" style="margin-top:8px"><div class="progress-fill" style="width:${score}%"></div></div></div><button class="ghost-btn" data-open-unit="${id}" ${locked ? 'disabled' : ''}>${locked ? 'Locked' : 'Open'}</button></article>`;
      }).join('')}</div>
    `;
  }

  function startPractice(setId, reviewMode = false) {
    const set = getQuestionSet(setId);
    if (!set) { navigate('home'); return; }
    if (set.kind === 'unit' && !isUnitUnlocked(setId)) { navigate('home'); return; }
    if (set.kind !== 'unit' && !specialUnlocked(set)) { navigate('home'); return; }
    clearTimeout(autoNextTimer);
    const effectiveReviewMode = reviewMode || completedSet(setId);
    const savedSession = !effectiveReviewMode ? state.sessions?.[setId] : null;
    practice = {
      set,
      setId,
      index: savedSession?.index || 0,
      correct: savedSession?.correct || 0,
      answered: savedSession?.answered || 0,
      outcomes: savedSession?.outcomes || [],
      selectedReorder: [],
      reviewMode: effectiveReviewMode,
      lockedAnswer: false
    };
    renderPracticeQuestion();
  }

  function renderPracticeQuestion() {
    clearTimeout(autoNextTimer);
    if (!practice) return;
    const { set, index } = practice;
    if (index >= set.questions.length) { finishPractice(); return; }
    const q = set.questions[index];
    practice.lockedAnswer = false;
    practice.selectedReorder = [];
    state.lastQuestion = { setId: practice.setId, index };
    if (!practice.reviewMode) {
      state.sessions[practice.setId] = { index, correct: practice.correct, answered: practice.answered, outcomes: practice.outcomes };
    }
    saveState();
    const progress = Math.round((index / set.questions.length) * 100);
    main.innerHTML = `
      <section class="practice-shell">
        <div class="practice-top"><button class="ghost-btn" data-action="exit-practice">← Exit</button><span class="badge ${practice.reviewMode ? 'purple' : 'gold'}">${practice.reviewMode ? 'Review Mode • No Extra Points' : `${DATA.pointsPerCorrect} points for a new correct answer`}</span></div>
        <div class="progress-track" style="margin-bottom:16px"><div class="progress-fill" style="width:${progress}%"></div></div>
        <article class="practice-card">
          <div class="question-kicker">${escapeHTML(set.title)} • Question ${index + 1} of ${set.questions.length}</div>
          <h1 class="question-prompt">${escapeHTML(q.prompt)}</h1>
          <div id="questionBody">${questionMarkup(q)}</div>
          <div class="question-actions"><button class="ghost-btn" data-action="skip-question">Skip</button><button class="primary-btn" data-action="check-answer">Check Answer</button></div>
          <div id="feedbackBox" class="feedback-box" aria-live="polite"></div>
        </article>
      </section>
    `;
  }

  function questionMarkup(q) {
    if (q.type === 'mcq' || q.type === 'truefalse') {
      return `<div class="option-grid">${q.options.map((option, i) => `<button class="option-btn" data-option-index="${i}"><span class="badge">${String.fromCharCode(65+i)}</span> ${escapeHTML(option)}</button>`).join('')}</div>`;
    }
    if (q.type === 'fill') {
      return `<div class="answer-area"><input id="fillAnswer" class="fill-input" type="text" autocomplete="off" placeholder="Type your answer" aria-label="Your answer" />${q.hint ? `<div class="hint-text">Hint: ${escapeHTML(q.hint)}</div>` : ''}</div>`;
    }
    if (q.type === 'reorder') {
      return `<div class="answer-area"><p class="hint-text">Tap the words in the correct order.</p><div id="reorderAnswer" class="reorder-answer"><span class="hint-text">Your sentence will appear here.</span></div><div id="reorderBank" class="reorder-bank">${q.words.map((word, i) => `<button class="word-token" data-reorder-index="${i}">${escapeHTML(word)}</button>`).join('')}</div></div>`;
    }
    if (q.type === 'match') {
      const choices = q.pairs.map(pair => pair[1]).sort(() => Math.random() - .5);
      return `<div class="match-grid">${q.pairs.map((pair, i) => `<label class="match-row"><strong>${escapeHTML(pair[0])}</strong><select data-match-index="${i}"><option value="">Choose…</option>${choices.map(choice => `<option value="${escapeHTML(choice)}">${escapeHTML(choice)}</option>`).join('')}</select></label>`).join('')}</div>`;
    }
    return '';
  }

  function selectOption(index) {
    if (practice?.lockedAnswer) return;
    $$('.option-btn').forEach(btn => btn.classList.toggle('selected', Number(btn.dataset.optionIndex) === index));
  }

  function toggleReorder(index) {
    if (!practice || practice.lockedAnswer) return;
    const q = practice.set.questions[practice.index];
    const currentIndex = practice.selectedReorder.indexOf(index);
    if (currentIndex >= 0) practice.selectedReorder.splice(currentIndex, 1);
    else practice.selectedReorder.push(index);
    const answer = $('#reorderAnswer');
    const bank = $('#reorderBank');
    answer.innerHTML = practice.selectedReorder.length
      ? practice.selectedReorder.map(i => `<button class="word-token" data-reorder-index="${i}">${escapeHTML(q.words[i])}</button>`).join('')
      : '<span class="hint-text">Your sentence will appear here.</span>';
    $$('[data-reorder-index]', bank).forEach(btn => btn.disabled = practice.selectedReorder.includes(Number(btn.dataset.reorderIndex)));
  }

  function evaluateCurrentAnswer() {
    if (!practice || practice.lockedAnswer) return;
    const q = practice.set.questions[practice.index];
    let correct = false;
    let userAnswer = '';

    if (q.type === 'mcq' || q.type === 'truefalse') {
      const selected = $('.option-btn.selected');
      if (!selected) { showToast('Choose an answer first.'); return; }
      const index = Number(selected.dataset.optionIndex);
      userAnswer = q.options[index];
      correct = index === q.answer;
      $$('.option-btn').forEach(btn => {
        const i = Number(btn.dataset.optionIndex);
        btn.disabled = true;
        if (i === q.answer) btn.classList.add('correct');
        if (i === index && !correct) btn.classList.add('wrong');
      });
    } else if (q.type === 'fill') {
      userAnswer = $('#fillAnswer').value;
      if (!userAnswer.trim()) { showToast('Type an answer first.'); return; }
      correct = q.answers.some(ans => normalizeAnswer(ans) === normalizeAnswer(userAnswer));
      $('#fillAnswer').disabled = true;
    } else if (q.type === 'reorder') {
      if (!practice.selectedReorder.length) { showToast('Build the sentence first.'); return; }
      userAnswer = practice.selectedReorder.map(i => q.words[i]).join(' ');
      correct = normalizeAnswer(userAnswer) === normalizeAnswer(q.answer);
      $$('[data-reorder-index]').forEach(btn => btn.disabled = true);
    } else if (q.type === 'match') {
      const selects = $$('[data-match-index]');
      if (selects.some(select => !select.value)) { showToast('Complete every match first.'); return; }
      correct = selects.every(select => normalizeAnswer(select.value) === normalizeAnswer(q.pairs[Number(select.dataset.matchIndex)][1]));
      selects.forEach(select => select.disabled = true);
      userAnswer = selects.map(select => select.value).join(', ');
    }

    practice.lockedAnswer = true;
    practice.answered += 1;
    if (correct) practice.correct += 1;
    practice.outcomes.push({ qid: q.id, correct, userAnswer });
    if (!practice.reviewMode) {
      state.sessions[practice.setId] = { index: practice.index, correct: practice.correct, answered: practice.answered, outcomes: practice.outcomes };
    }

    const firstAttemptEver = !state.completedQuestions[q.id];
    state.completedQuestions[q.id] = true;
    if (correct && firstAttemptEver && !practice.reviewMode) {
      state.points += DATA.pointsPerCorrect;
      showToast(`+${DATA.pointsPerCorrect} points!`);
    }
    saveState();
    displayFeedback(q, correct);
  }

  function correctAnswerText(q) {
    if (q.type === 'mcq' || q.type === 'truefalse') return q.options[q.answer];
    if (q.type === 'fill') return q.answers[0];
    if (q.type === 'reorder') return q.answer;
    if (q.type === 'match') return q.pairs.map(([a,b]) => `${a} → ${b}`).join(' • ');
    return '';
  }

  function displayFeedback(q, correct) {
    const box = $('#feedbackBox');
    const explanation = q.explanation ? `<p>${escapeHTML(q.explanation)}</p>` : '';
    if (correct) {
      playTone('correct');
      box.className = 'feedback-box show correct';
      box.innerHTML = `<h3>Excellent! ✅</h3><p>Your answer is correct.</p>${explanation}<div class="feedback-actions"><button class="primary-btn" data-action="next-question">Next Question</button></div>`;
      autoNextTimer = setTimeout(nextQuestion, DATA.rightAnswerDelayMs);
    } else {
      playTone('wrong');
      box.className = 'feedback-box show wrong';
      box.innerHTML = `<h3>Let’s fix it. 💡</h3><p>The correct answer is: <strong>${escapeHTML(correctAnswerText(q))}</strong></p>${explanation}<div class="feedback-actions"><button class="primary-btn" data-action="next-question">Got it</button><button class="ghost-btn" data-speak="${escapeHTML(correctAnswerText(q))}">🔊 Hear the answer</button></div>`;
    }
    $('[data-action="check-answer"]').disabled = true;
    $('[data-action="skip-question"]').disabled = true;
  }

  function skipQuestion() {
    if (!practice || practice.lockedAnswer) return;
    const q = practice.set.questions[practice.index];
    practice.answered += 1;
    practice.outcomes.push({ qid: q.id, correct: false, skipped: true });
    if (!practice.reviewMode) {
      state.sessions[practice.setId] = { index: practice.index, correct: practice.correct, answered: practice.answered, outcomes: practice.outcomes };
    }
    state.completedQuestions[q.id] = true;
    saveState();
    displayFeedback(q, false);
  }

  function nextQuestion() {
    clearTimeout(autoNextTimer);
    if (!practice) return;
    practice.index += 1;
    if (!practice.reviewMode) {
      state.sessions[practice.setId] = { index: practice.index, correct: practice.correct, answered: practice.answered, outcomes: practice.outcomes };
      saveState();
    }
    renderPracticeQuestion();
  }

  function finishPractice() {
    clearTimeout(autoNextTimer);
    if (!practice) return;
    const total = practice.set.questions.length;
    const score = Math.round((practice.correct / total) * 100);
    state.bestScores[practice.setId] = Math.max(scoreFor(practice.setId), score);
    state.lastQuestion = null;
    if (state.sessions) delete state.sessions[practice.setId];
    saveState();
    const passed = score >= DATA.unlockScore;
    const set = practice.set;
    main.innerHTML = `
      <section class="practice-shell"><article class="practice-card practice-complete">
        <div class="trophy">${passed ? '🏆' : '🌱'}</div>
        <span class="badge ${passed ? 'finished' : 'gold'}">${passed ? 'Challenge Complete' : 'Keep Practising'}</span>
        <h1>${escapeHTML(set.title)}</h1>
        <div class="score-ring" style="--score:${score}"><strong>${score}%</strong></div>
        <p>You answered <strong>${practice.correct}</strong> out of <strong>${total}</strong> questions correctly.</p>
        <p>${passed ? 'Great work! The next learning step is unlocked.' : `Reach ${DATA.unlockScore}% to unlock the next unit. Review the content and try again.`}</p>
        <div class="page-actions" style="justify-content:center;margin-top:20px">
          <button class="ghost-btn" data-action="return-from-practice">Back to Content</button>
          <button class="primary-btn" data-retry-practice="${practice.setId}">Try Again</button>
        </div>
      </article></section>`;
  }

  function exitPractice() {
    if (!practice) return navigate('home');
    const set = practice.set;
    if (set.kind === 'unit') navigate('unit', set.id);
    else navigate('special', set.id);
  }

  function continueLearning() {
    if (state.lastQuestion?.setId && !completedSet(state.lastQuestion.setId)) {
      navigate('practice', state.lastQuestion.setId);
      return;
    }
    const last = state.lastView;
    if (last && last.route && last.route !== 'home' && last.route !== 'practice') {
      navigate(last.route, last.id || '');
      return;
    }
    const nextUnit = allUnitIds.find(id => isUnitUnlocked(id) && !completedSet(id)) || 'unit1';
    navigate('unit', nextUnit);
  }

  function showTeacherDialog() {
    dialogContent.innerHTML = `
      <div class="teacher-card">
        <span class="badge gold">Meet Your Teacher</span>
        <h2>Mr.Mohamed Farid</h2>
        <p>Senior English Instructor and educational app developer.</p>
        <div class="teacher-facts">
          <p><strong>Qualification:</strong> BA & Education – Faculty of Education, Mansoura University – 2007</p>
          <p><strong>Role:</strong> English Teacher – AlAndalus Private Schools, Egyptian Section</p>
          <p><strong>Learning goal:</strong> Clear, child-friendly English through practice, pictures, sound, and positive feedback.</p>
        </div>
      </div>`;
    dialog.showModal();
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  function changeName() {
    const newName = prompt('Type the student name:', state.profile?.name || '');
    if (!newName || !newName.trim()) return;
    state.profile = { ...(state.profile || {}), name: newName.trim() };
    saveState();
    showToast('Student name updated.');
    renderRoute('home', '', { noSave: true });
  }

  function resetProgress() {
    if (!confirm('Reset all local points and progress on this device?')) return;
    const name = state.profile?.name;
    state = defaultState();
    state.profile = name ? { name } : null;
    saveState();
    showToast('Progress reset.');
    navigate('home');
  }

  function togglePreview() {
    state.previewUnlocked = !state.previewUnlocked;
    saveState();
    showToast(`Teacher preview ${state.previewUnlocked ? 'enabled' : 'disabled'}.`);
    renderRoute('home', '', { noSave: true });
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.dataset.route) navigate(button.dataset.route);
    if (button.dataset.openTheme) navigate('theme', button.dataset.openTheme);
    if (button.dataset.openUnit) navigate('unit', button.dataset.openUnit);
    if (button.dataset.openSpecial) navigate('special', button.dataset.openSpecial);
    if (button.dataset.startPractice) navigate('practice', button.dataset.startPractice, { reviewMode: completedSet(button.dataset.startPractice) });
    if (button.dataset.retryPractice) navigate('practice', button.dataset.retryPractice, { reviewMode: false });
    if (button.dataset.speak) speak(button.dataset.speak);
    if (button.dataset.optionIndex !== undefined) selectOption(Number(button.dataset.optionIndex));
    if (button.dataset.reorderIndex !== undefined) toggleReorder(Number(button.dataset.reorderIndex));
    if (button.dataset.unitTab) {
      activeUnitTab = button.dataset.unitTab;
      const unitId = location.hash.split('/')[1];
      renderUnit(unitId);
    }

    switch (button.dataset.action) {
      case 'continue': continueLearning(); break;
      case 'teacher': showTeacherDialog(); break;
      case 'close-dialog': closeDialog(); break;
      case 'change-name': changeName(); break;
      case 'reset': resetProgress(); break;
      case 'toggle-preview': togglePreview(); break;
      case 'check-answer': evaluateCurrentAnswer(); break;
      case 'skip-question': skipQuestion(); break;
      case 'next-question': nextQuestion(); break;
      case 'exit-practice': exitPractice(); break;
      case 'return-from-practice': exitPractice(); break;
    }
  });

  $('#profileBtn').addEventListener('click', event => {
    event.stopPropagation();
    profileMenu.hidden = !profileMenu.hidden;
  });
  document.addEventListener('click', event => {
    if (!profileMenu.hidden && !profileMenu.contains(event.target) && event.target !== $('#profileBtn')) profileMenu.hidden = true;
  });

  $('#startForm').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#studentName').value.trim();
    if (!name) return;
    state.profile = { name };
    saveState();
    history.replaceState(null, '', '#home');
    showApp();
  });

  window.addEventListener('hashchange', routeFromHash);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  }

  window.ConnectPlusPrimary1App = {
    getState: () => structuredClone(state),
    mergeState: (current, remote) => ({ ...defaultState(), ...(current || {}), ...(remote || {}), completedQuestions: { ...(current?.completedQuestions || {}), ...(remote?.completedQuestions || {}) }, bestScores: { ...(current?.bestScores || {}), ...(remote?.bestScores || {}) }, lastView: remote?.lastView || current?.lastView || { route: 'home' } }),
    replaceState: (next) => { state = { ...defaultState(), ...(next || {}) }; saveState(); updateChrome(); showApp(); },
  };
  const params = new URLSearchParams(location.search);
  const portalName = params.get('studentName') || params.get('student') || '';
  if (!state.profile?.name && portalName) { state.profile = { name: portalName.slice(0, 80) }; saveState(); }
  if (state.profile?.name) showApp();
  else showSplash();
})();
