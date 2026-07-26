(() => {
  'use strict';

  const COURSE = window.COURSE_DATA;
  const params = new URLSearchParams(location.search);
  const student = {
    id: params.get('studentId') || 'guest',
    name: params.get('studentName') || 'Student',
    className: 'Primary 6'
  };
  const STORAGE_KEY = `mrfarid-primary6-term1:${student.id}`;
  const TYPE_ORDER = ['fill', 'mcq', 'correction', 'reorder', 'order-sentences', 'match', 'truefalse', 'listening-mcq'];
  const TYPE_LABELS = {
    fill: 'Complete',
    mcq: 'Choose',
    correction: 'Correct',
    reorder: 'Order Words',
    'order-sentences': 'Order Sentences',
    match: 'Match',
    truefalse: 'True or False',
    'listening-mcq': 'Listening'
  };

  const el = (id) => document.getElementById(id);
  const app = el('app');
  const splash = el('splash');
  const main = el('mainContent');
  const sidebar = el('sidebar');
  const sidebarBackdrop = el('sidebarBackdrop');
  const teacherDialog = el('teacherDialog');
  const feedbackModal = el('feedbackModal');
  const feedbackCard = feedbackModal.querySelector('.feedback-card');

  let route = { name: 'dashboard' };
  let currentPractice = null;
  let pendingFeedbackAction = null;
  let state = loadState();

  function defaultState() {
    return {
      points: 0,
      completed: {},
      writings: {},
      mistakes: {},
      performance: {},
      lastRoute: null,
      started: false,
      visits: 0
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Object.assign(defaultState(), saved || {});
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    const activity = state.lastRoute && state.lastRoute.name !== 'dashboard' ? state.lastRoute : null;
    if (activity) {
      const unit = activity.unitId ? findUnit(activity.unitId) : null;
      const lesson = activity.lessonId ? findLesson(activity.lessonId)?.lesson : null;
      state.portalLastActivity = {
        courseId: 'english-primary-6-first-term',
        courseTitle: 'English Primary 6 - First Term',
        detail: `${unit ? `Unit ${unit.number}: ${unit.title}` : 'English Primary 6'}${lesson ? ` - ${lesson.title}` : ''}${Number.isInteger(activity.questionIndex) ? ` - Question ${activity.questionIndex + 1}` : ''}`,
        route: activity.name,
        ...activity,
        updatedAt: new Date().toISOString()
      };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateChrome();
    window.MrFaridCourseProgress?.queueSave();
  }

  function totalQuestions() {
    return COURSE.units.reduce((sum, unit) => {
      const lessonQuestions = unit.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.questions.length, 0);
      return sum + lessonQuestions + unit.review.length + (unit.bank?.length || 0);
    }, 0);
  }

  function completedCount() {
    return Object.keys(state.completed).length;
  }

  function coursePercent() {
    return Math.round((completedCount() / totalQuestions()) * 100) || 0;
  }

  function lessonQuestionId(lesson, originalIndex) {
    return `${lesson.id}-q${originalIndex}`;
  }

  function reviewQuestionId(unit, originalIndex) {
    return `${unit.id}-review-q${originalIndex}`;
  }

  function bankQuestionId(unit, originalIndex) {
    return `${unit.id}-bank-q${originalIndex}`;
  }

  function findUnit(unitId) {
    return COURSE.units.find((unit) => unit.id === unitId);
  }

  function findLesson(lessonId) {
    for (const unit of COURSE.units) {
      const lesson = unit.lessons.find((item) => item.id === lessonId);
      if (lesson) return { unit, lesson };
    }
    return null;
  }

  function questionKey(item) {
    return item.id;
  }

  function lessonPercent(lesson) {
    const done = lesson.questions.filter((_, index) => state.completed[lessonQuestionId(lesson, index)]).length;
    return Math.round((done / lesson.questions.length) * 100) || 0;
  }

  function unitPercent(unit) {
    let total = unit.review.length + (unit.bank?.length || 0);
    let done = unit.review.filter((_, index) => state.completed[reviewQuestionId(unit, index)]).length;
    done += (unit.bank || []).filter((_, index) => state.completed[bankQuestionId(unit, index)]).length;
    unit.lessons.forEach((lesson) => {
      total += lesson.questions.length;
      done += lesson.questions.filter((_, index) => state.completed[lessonQuestionId(lesson, index)]).length;
    });
    return Math.round((done / total) * 100) || 0;
  }

  function unitCompletedLessons(unit) {
    return unit.lessons.filter((lesson) => lessonPercent(lesson) === 100).length;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function themeClass(unit) {
    return `theme-${unit.theme}`;
  }

  function updateChrome() {
    el('topPoints').textContent = state.points;
    if (el('studentNameDisplay')) el('studentNameDisplay').textContent = `${student.name} · Term 1`;
    const percent = coursePercent();
    el('sidebarProgress').style.width = `${percent}%`;
    el('sidebarProgressText').textContent = `${percent}% complete`;
    renderUnitNav();
  }

  function renderUnitNav() {
    el('unitNav').innerHTML = COURSE.units.map((unit) => `
      <button class="nav-item ${route.unitId === unit.id ? 'active' : ''}" data-unit-nav="${unit.id}" type="button">
        <span>${unit.icon}</span>
        <strong>Unit ${unit.number}</strong>
        <small class="unit-nav-progress">${unitPercent(unit)}%</small>
      </button>
    `).join('');
    document.querySelectorAll('[data-unit-nav]').forEach((button) => {
      button.addEventListener('click', () => navigate({ name: 'unit', unitId: button.dataset.unitNav }));
    });
  }

  function setActiveStaticNav(name) {
    document.querySelectorAll('.nav-item[data-route]').forEach((item) => {
      item.classList.toggle('active', item.dataset.route === name);
    });
  }

  function navigate(nextRoute, options = {}) {
    route = nextRoute;
    state.lastRoute = nextRoute;
    saveState();
    setActiveStaticNav(route.name);
    render();
    closeSidebar();
    if (!options.preserveScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    main.focus({ preventScroll: true });
  }

  function render() {
    currentPractice = null;
    switch (route.name) {
      case 'course': return renderCourseMap();
      case 'unit': return renderUnit(route.unitId);
      case 'lesson': return renderLesson(route.lessonId, route.tab || 'learn');
      case 'practice': return startLessonPractice(route.lessonId);
      case 'review': return startUnitReview(route.unitId);
      case 'bankHub': return renderBankHub(route.unitId);
      case 'bank': return startUnitBank(route.unitId, route.category || 'All');
      case 'dashboard':
      default: return renderDashboard();
    }
  }

  function renderDashboard() {
    const percent = coursePercent();
    const last = state.lastRoute && state.lastRoute.name !== 'dashboard' ? state.lastRoute : null;
    const completedLessons = COURSE.units.reduce((sum, unit) => sum + unitCompletedLessons(unit), 0);
    const totalLessons = COURSE.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
    const badges = getBadgeCount();

    main.innerHTML = `
      <div class="page">
        <section class="dashboard-hero">
          <div class="dashboard-copy">
            <span class="eyebrow">English Primary 6 • Term 1</span>
            <h1>Learn. Practise.<br>Make progress.</h1>
            <p>Explore real lesson content, build English skills, complete interactive activities, and save every step automatically.</p>
            <div class="hero-actions">
              <button id="dashboardCourseBtn" class="primary-btn" type="button">Explore the Course</button>
              ${last ? '<button id="resumeBtn" class="secondary-btn" type="button">Continue Last Activity</button>' : ''}
            </div>
          </div>
          <div class="hero-progress-card">
            <div class="progress-ring" style="--progress:${percent * 3.6}deg"><strong>${percent}%</strong></div>
            <p>${completedCount()} of ${totalQuestions()} activities completed</p>
          </div>
        </section>

        <section class="stats-grid">
          ${statCard('⭐', state.points, 'Total Points')}
          ${statCard('✓', `${completedLessons}/${totalLessons}`, 'Lessons Finished')}
          ${statCard('🏅', badges, 'Badges Earned')}
          ${statCard('▦', `${completedCount()}`, 'Solved Activities')}
        </section>

        <div class="section-title"><div><h2>Your Learning Map</h2><p>Open a unit and continue at your own pace.</p></div></div>
        <section class="unit-strip">
          ${COURSE.units.map((unit) => dashboardUnitCard(unit)).join('')}
        </section>
      </div>
    `;

    el('dashboardCourseBtn').addEventListener('click', () => navigate({ name: 'course' }));
    if (last) el('resumeBtn').addEventListener('click', () => navigate(last));
    document.querySelectorAll('[data-dashboard-unit]').forEach((button) => {
      button.addEventListener('click', () => navigate({ name: 'unit', unitId: button.dataset.dashboardUnit }));
    });
  }

  function statCard(icon, value, label) {
    return `<article class="stat-card"><div class="stat-icon">${icon}</div><strong>${value}</strong><span>${label}</span></article>`;
  }

  function dashboardUnitCard(unit) {
    return `
      <button class="dashboard-unit ${themeClass(unit)} has-unit-cover" data-dashboard-unit="${unit.id}" type="button"><img class="unit-cover-img" src="assets/covers/unit-${unit.number}.png" alt="">
        <span class="unit-icon">${unit.icon}</span>
        <span class="unit-number">Unit ${unit.number}</span>
        <h3>${escapeHtml(unit.title)}</h3>
        <p>${unit.lessons.length} lessons • ${escapeHtml(unit.grammar)}</p>
        <div class="unit-progress"><span style="width:${unitPercent(unit)}%"></span></div>
      </button>
    `;
  }

  function renderCourseMap() {
    main.innerHTML = `
      <div class="page">
        <header class="page-header">
          <div><span class="eyebrow dark">Complete Course</span><h1>Course Map</h1><p>Six connected units combine vocabulary, grammar, reading, listening, pronunciation, writing, projects, and meaningful practice.</p></div>
        </header>
        <section class="course-grid">
          ${COURSE.units.map((unit) => `
            <article class="unit-card ${themeClass(unit)} has-unit-cover"><img class="unit-cover-img" src="assets/covers/unit-${unit.number}.png" alt="">
              <span class="unit-icon-large">${unit.icon}</span>
              <span class="unit-kicker">Unit ${unit.number} • ${unitPercent(unit)}% complete</span>
              <h2>${escapeHtml(unit.title)}</h2>
              <p>${escapeHtml(unit.subtitle)}</p>
              <div class="unit-card-meta"><span>${unit.lessons.length} Lessons</span><span>${escapeHtml(unit.grammar)}</span></div>
              <div class="unit-card-actions"><button class="primary-btn" data-open-unit="${unit.id}" type="button">Open Unit</button></div>
            </article>
          `).join('')}
        </section>
      </div>
    `;
    document.querySelectorAll('[data-open-unit]').forEach((button) => {
      button.addEventListener('click', () => navigate({ name: 'unit', unitId: button.dataset.openUnit }));
    });
  }

  function renderUnit(unitId) {
    const unit = findUnit(unitId);
    if (!unit) return navigate({ name: 'course' });
    main.innerHTML = `
      <div class="page">
        <section class="unit-hero ${themeClass(unit)} has-unit-hero-cover"><img class="unit-hero-cover-img" src="assets/covers/unit-${unit.number}.png" alt="Unit ${unit.number}: ${escapeHtml(unit.title)}">
          <div class="unit-hero-content">
            <span class="lesson-label">Unit ${unit.number} • ${unitPercent(unit)}% Complete</span>
            <h1>${escapeHtml(unit.title)}</h1>
            <p>${escapeHtml(unit.subtitle)}</p>
          </div>
          <span class="unit-hero-icon">${unit.icon}</span>
        </section>

        <section class="unit-summary-row">
          <article class="info-panel"><h3>Language Focus</h3><p>${escapeHtml(unit.grammar)}</p></article>
          <article class="info-panel"><h3>Core Skills</h3><div class="skill-chips">${unit.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}</div></article>
        </section>

        <div class="section-title"><div><h2>Lesson Stations</h2><p>Learn the content first, then complete the grouped practice.</p></div></div>
        <section class="lesson-list">
          ${unit.lessons.map((lesson, index) => lessonRow(unit, lesson, index)).join('')}
        </section>
        <section class="assessment-grid">
          <article class="review-banner">
            <div><h3>Unit ${unit.number} Challenge</h3><p>${unit.review.length} mixed review questions covering the full unit.</p></div>
            <button class="primary-btn" id="openReviewBtn" type="button">Start Challenge</button>
          </article>
          <article class="bank-banner">
            <div><span class="bank-icon">🏦</span><h3>Unit Question Bank</h3><p>${unit.bank?.length || 0} carefully written questions organised by skill.</p></div>
            <button class="primary-btn" id="openBankBtn" type="button">Open Question Bank</button>
          </article>
        </section>
      </div>
    `;
    document.querySelectorAll('[data-open-lesson]').forEach((button) => {
      button.addEventListener('click', () => navigate({ name: 'lesson', lessonId: button.dataset.openLesson, tab: 'learn' }));
    });
    el('openReviewBtn').addEventListener('click', () => navigate({ name: 'review', unitId: unit.id }));
    el('openBankBtn').addEventListener('click', () => navigate({ name: 'bankHub', unitId: unit.id }));
  }

  function lessonRow(unit, lesson, index) {
    const percent = lessonPercent(lesson);
    return `
      <article class="lesson-row">
        <div class="lesson-badge">${index + 1}</div>
        <div><h3>${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.station)} • ${lesson.questions.length} activities</p></div>
        <div class="lesson-status">
          <span class="status-pill ${percent === 100 ? 'done' : ''}">${percent === 100 ? 'Finished' : `${percent}%`}</span>
          <button class="lesson-open-btn" data-open-lesson="${lesson.id}" type="button">Open</button>
        </div>
      </article>
    `;
  }

  function renderLesson(lessonId, tab) {
    const found = findLesson(lessonId);
    if (!found) return navigate({ name: 'course' });
    const { unit, lesson } = found;
    const percent = lessonPercent(lesson);

    main.innerHTML = `
      <div class="page">
        <nav class="breadcrumbs"><button id="backToUnitBtn" type="button">Unit ${unit.number}</button><span>›</span><span>${escapeHtml(lesson.title)}</span></nav>
        <section class="lesson-hero ${themeClass(unit)}">
          <span class="lesson-label">${escapeHtml(lesson.station)}</span>
          <h1>${escapeHtml(lesson.title)}</h1>
          <p>${escapeHtml(lesson.summary)}</p>
        </section>
        <div class="lesson-tabs">
          <button class="lesson-tab ${tab === 'learn' ? 'active' : ''}" data-lesson-tab="learn" type="button">Learn</button>
          <button class="lesson-tab ${tab === 'practice' ? 'active' : ''}" data-lesson-tab="practice" type="button">Practice</button>
          <button class="lesson-tab ${tab === 'write' ? 'active' : ''}" data-lesson-tab="write" type="button">Writing</button>
        </div>
        <div id="lessonTabContent"></div>
      </div>
    `;

    el('backToUnitBtn').addEventListener('click', () => navigate({ name: 'unit', unitId: unit.id }));
    document.querySelectorAll('[data-lesson-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextTab = button.dataset.lessonTab;
        if (nextTab === 'practice') navigate({ name: 'practice', lessonId: lesson.id });
        else renderLesson(lesson.id, nextTab);
      });
    });

    if (tab === 'write') renderWritingTab(unit, lesson, percent);
    else renderLearnTab(unit, lesson, percent);
  }

  function lessonSideHtml(lesson, percent) {
    return `
      <aside class="lesson-side">
        <article class="side-card"><h3>Your Progress</h3><div class="side-progress"><span style="width:${percent}%"></span></div><div class="side-stats"><span>${percent}% complete</span><span>${lesson.questions.length} activities</span></div></article>
        <article class="side-card"><h3>Smart Study Steps</h3><div class="tip-list">
          <div class="tip-item"><span>1</span><div><strong>Read</strong><br><small>Understand the lesson content.</small></div></div>
          <div class="tip-item"><span>2</span><div><strong>Use</strong><br><small>Say and write the new language.</small></div></div>
          <div class="tip-item"><span>3</span><div><strong>Practise</strong><br><small>Complete each question group.</small></div></div>
        </div></article>
      </aside>
    `;
  }

  function renderLearnTab(unit, lesson, percent) {
    el('lessonTabContent').innerHTML = `
      <div class="lesson-layout">
        <section class="content-stack">
          <article class="content-card">
            <div class="card-heading"><span class="heading-icon">✦</span><div><h2>Key Vocabulary</h2><p>Tap the sound button to hear each word or phrase.</p></div></div>
            <div class="vocab-grid">${lesson.vocab.map((word) => `<div class="vocab-card"><strong>${escapeHtml(word)}</strong><button data-speak="${escapeHtml(word)}" type="button" aria-label="Listen to ${escapeHtml(word)}">🔊</button></div>`).join('')}</div>
          </article>
          <article class="content-card"><div class="card-heading"><span class="heading-icon">A+</span><div><h2>Language Focus</h2></div></div><div class="grammar-box"><strong>${escapeHtml(unit.grammar)}</strong><span>${escapeHtml(lesson.grammarNote)}</span></div></article>
          <article class="content-card"><div class="card-heading"><span class="heading-icon">▤</span><div><h2>Study Summary</h2></div></div><p>${escapeHtml(lesson.reading)}</p></article>
          <article class="content-card"><div class="card-heading"><span class="heading-icon">✓</span><div><h2>Ready to Practise?</h2><p>Questions are grouped by type, not shown randomly.</p></div></div><button id="startPracticeBtn" class="primary-btn" type="button">Start Lesson Practice</button></article>
        </section>
        ${lessonSideHtml(lesson, percent)}
      </div>
    `;
    document.querySelectorAll('[data-speak]').forEach((button) => button.addEventListener('click', () => speak(button.dataset.speak)));
    el('startPracticeBtn').addEventListener('click', () => navigate({ name: 'practice', lessonId: lesson.id }));
  }

  function renderWritingTab(unit, lesson, percent) {
    const saved = state.writings[lesson.id] || '';
    el('lessonTabContent').innerHTML = `
      <div class="lesson-layout">
        <section class="content-stack">
          <article class="content-card">
            <div class="card-heading"><span class="heading-icon">✎</span><div><h2>Writing Task</h2><p>${escapeHtml(lesson.writing)}</p></div></div>
            <textarea id="writingArea" class="writing-area" placeholder="Write your answer here...">${escapeHtml(saved)}</textarea>
            <div class="writing-footer"><span id="wordCount" class="word-count">0 words</span><button id="saveWritingBtn" class="primary-btn" type="button">Save Writing</button></div>
          </article>
          <article class="content-card"><h3>Writing Checklist</h3><div class="tip-list">
            <div class="tip-item"><span>✓</span><div>Use clear, complete sentences.</div></div>
            <div class="tip-item"><span>✓</span><div>Use the lesson vocabulary naturally.</div></div>
            <div class="tip-item"><span>✓</span><div>Check capitals, punctuation, and spelling.</div></div>
            <div class="tip-item"><span>✓</span><div>Read your answer once before saving.</div></div>
          </div></article>
        </section>
        ${lessonSideHtml(lesson, percent)}
      </div>
    `;
    const writingArea = el('writingArea');
    const updateWordCount = () => {
      const words = writingArea.value.trim() ? writingArea.value.trim().split(/\s+/).length : 0;
      el('wordCount').textContent = `${words} word${words === 1 ? '' : 's'}`;
    };
    writingArea.addEventListener('input', updateWordCount);
    updateWordCount();
    el('saveWritingBtn').addEventListener('click', () => {
      state.writings[lesson.id] = writingArea.value;
      saveState();
      showToast('Writing saved successfully.');
    });
  }

  function sortedQuestionItems(questions, idFactory) {
    return questions.map((question, originalIndex) => ({
      question,
      originalIndex,
      id: idFactory(originalIndex)
    })).sort((a, b) => TYPE_ORDER.indexOf(a.question.type) - TYPE_ORDER.indexOf(b.question.type));
  }

  function startLessonPractice(lessonId) {
    const found = findLesson(lessonId);
    if (!found) return navigate({ name: 'course' });
    const { unit, lesson } = found;
    const items = sortedQuestionItems(lesson.questions, (index) => lessonQuestionId(lesson, index));
    const resumeIndex = state.lastRoute?.name === 'practice' && state.lastRoute.lessonId === lesson.id ? state.lastRoute.questionIndex : null;
    currentPractice = { mode: 'lesson', unit, lesson, items, index: Number.isInteger(resumeIndex) ? Math.min(resumeIndex, Math.max(0, items.length - 1)) : firstIncompleteIndex(items), selections: [] };
    renderPracticePage();
  }

  function startUnitReview(unitId) {
    const unit = findUnit(unitId);
    if (!unit) return navigate({ name: 'course' });
    const items = sortedQuestionItems(unit.review, (index) => reviewQuestionId(unit, index));
    const resumeIndex = state.lastRoute?.name === 'review' && state.lastRoute.unitId === unit.id ? state.lastRoute.questionIndex : null;
    currentPractice = { mode: 'review', unit, lesson: null, items, index: Number.isInteger(resumeIndex) ? Math.min(resumeIndex, Math.max(0, items.length - 1)) : firstIncompleteIndex(items), selections: [] };
    renderPracticePage();
  }

  function categoryPerformance(unitId, category) {
    const record = state.performance?.[unitId]?.[category];
    if (!record || !record.attempts) return null;
    return Math.round((record.correct / record.attempts) * 100);
  }

  function renderBankHub(unitId) {
    const unit = findUnit(unitId);
    if (!unit) return navigate({ name: 'course' });
    const bank = unit.bank || [];
    const categories = [...new Set(bank.map((q) => q.category || 'Mixed'))];
    const completed = bank.filter((_, index) => state.completed[bankQuestionId(unit, index)]).length;
    main.innerHTML = `
      <div class="page bank-hub-page">
        <nav class="breadcrumbs"><button id="bankBackBtn" type="button">Unit ${unit.number}</button><span>›</span><span>Question Bank</span></nav>
        <section class="bank-hero ${themeClass(unit)}"><img class="bank-hero-cover-img" src="assets/covers/unit-${unit.number}.png" alt="">
          <div><span class="eyebrow">Unit ${unit.number} Assessment Center</span><h1>Question Bank</h1><p>${escapeHtml(unit.title)} • ${bank.length} questions that test vocabulary, grammar, reading, writing, listening, pronunciation, and mixed use.</p></div>
          <div class="bank-hero-stat"><strong>${completed}/${bank.length}</strong><span>Completed</span></div>
        </section>
        <section class="bank-category-grid">
          <button class="bank-category-card mixed" data-bank-category="All" type="button"><span>★</span><h3>Mixed Full Bank</h3><p>All ${bank.length} questions grouped by question type.</p><strong>Start Full Bank →</strong></button>
          ${categories.map((category) => {
            const count = bank.filter((q) => (q.category || 'Mixed') === category).length;
            const score = categoryPerformance(unit.id, category);
            return `<button class="bank-category-card" data-bank-category="${escapeHtml(category)}" type="button"><span>${categoryIcon(category)}</span><h3>${escapeHtml(category)}</h3><p>${count} focused questions</p><strong>${score == null ? 'Not attempted' : `${score}% accuracy`} →</strong></button>`;
          }).join('')}
        </section>
        <section class="assessment-note"><strong>How the bank works</strong><p>Questions are grouped by type. A wrong answer shows the correct form and a short explanation. Finished questions are saved and cannot award points twice.</p></section>
      </div>`;
    el('bankBackBtn').addEventListener('click', () => navigate({ name: 'unit', unitId: unit.id }));
    document.querySelectorAll('[data-bank-category]').forEach((button) => {
      button.addEventListener('click', () => navigate({ name: 'bank', unitId: unit.id, category: button.dataset.bankCategory }));
    });
  }

  function categoryIcon(category) {
    return ({ Vocabulary: 'ABC', Grammar: 'A+', Reading: '▤', Writing: '✎', Listening: '♫', Pronunciation: '🔊', Mixed: '✦' })[category] || '✓';
  }

  function startUnitBank(unitId, category = 'All') {
    const unit = findUnit(unitId);
    if (!unit) return navigate({ name: 'course' });
    const allItems = (unit.bank || []).map((question, originalIndex) => ({ question, originalIndex, id: bankQuestionId(unit, originalIndex) }));
    const filtered = category === 'All' ? allItems : allItems.filter((item) => (item.question.category || 'Mixed') === category);
    const items = filtered.sort((a, b) => TYPE_ORDER.indexOf(a.question.type) - TYPE_ORDER.indexOf(b.question.type));
    const resumeIndex = state.lastRoute?.name === 'bank' && state.lastRoute.unitId === unit.id && state.lastRoute.category === category ? state.lastRoute.questionIndex : null;
    currentPractice = { mode: 'bank', category, unit, lesson: null, items, index: Number.isInteger(resumeIndex) ? Math.min(resumeIndex, Math.max(0, items.length - 1)) : firstIncompleteIndex(items), selections: [], matchSelections: {} };
    renderPracticePage();
  }

  function firstIncompleteIndex(items) {
    const index = items.findIndex((item) => !state.completed[item.id]);
    return index === -1 ? 0 : index;
  }

  function renderPracticePage() {
    if (!currentPractice) return;
    const { unit, lesson, mode, items, index } = currentPractice;
    const title = mode === 'review' ? `Unit ${unit.number} Challenge` : mode === 'bank' ? `${currentPractice.category === 'All' ? 'Full' : currentPractice.category} Question Bank` : lesson.title;
    main.innerHTML = `
      <div class="page practice-shell">
        <nav class="breadcrumbs"><button id="practiceBackBtn" type="button">${mode === 'lesson' ? lesson.title : `Unit ${unit.number}`}</button><span>›</span><span>${mode === 'review' ? 'Challenge' : mode === 'bank' ? 'Question Bank' : 'Practice'}</span></nav>
        <div class="practice-top"><div><span class="eyebrow dark">${mode === 'review' ? 'Unit Review' : mode === 'bank' ? 'Precision Assessment' : 'Grouped Practice'}</span><h1 style="margin:8px 0 0">${escapeHtml(title)}</h1></div><span class="question-counter" id="questionCounter"></span></div>
        <div id="groupRail" class="group-rail"></div>
        <div class="question-progress"><span id="questionProgressBar"></span></div>
        <div id="questionHost"></div>
      </div>
    `;
    el('practiceBackBtn').addEventListener('click', () => {
      if (mode === 'review') navigate({ name: 'unit', unitId: unit.id });
      else if (mode === 'bank') navigate({ name: 'bankHub', unitId: unit.id });
      else navigate({ name: 'lesson', lessonId: lesson.id, tab: 'learn' });
    });
    renderQuestion();
  }

  function renderGroupRail() {
    const { items, index } = currentPractice;
    const currentType = items[index]?.question.type;
    const types = [...new Set(items.map((item) => item.question.type))];
    el('groupRail').innerHTML = types.map((type) => {
      const typeItems = items.filter((item) => item.question.type === type);
      const done = typeItems.every((item) => state.completed[item.id]);
      return `<span class="group-chip ${currentType === type ? 'active' : ''} ${done ? 'done' : ''}">${TYPE_LABELS[type] || type}</span>`;
    }).join('');
  }

  function renderQuestion() {
    const practice = currentPractice;
    if (!practice) return;
    const { items, index } = practice;
    if (!items.length) return;
    const item = items[index];
    const question = item.question;
    state.lastRoute = practice.mode === 'lesson'
      ? { name: 'practice', lessonId: practice.lesson.id, questionIndex: index }
      : practice.mode === 'review'
        ? { name: 'review', unitId: practice.unit.id, questionIndex: index }
        : { name: 'bank', unitId: practice.unit.id, category: practice.category, questionIndex: index };
    saveState();
    const isDone = Boolean(state.completed[item.id]);
    const completedInSet = items.filter((entry) => state.completed[entry.id]).length;
    const percent = Math.round((completedInSet / items.length) * 100);
    el('questionCounter').textContent = `${index + 1} / ${items.length}`;
    el('questionProgressBar').style.width = `${percent}%`;
    renderGroupRail();

    if (isDone) {
      el('questionHost').innerHTML = `
        <article class="question-card finished-card">
          <div><div class="finished-mark">✓</div><h2>Finished</h2><p>You already completed this activity. It will not award points again.</p>
          <div class="question-actions"><button id="reviewPrevBtn" class="secondary-btn" type="button">Previous</button><button id="reviewNextBtn" class="primary-btn" type="button">Next Activity</button></div></div>
        </article>
      `;
      el('reviewPrevBtn').addEventListener('click', previousQuestion);
      el('reviewNextBtn').addEventListener('click', nextQuestion);
      return;
    }

    currentPractice.selections = [];
    currentPractice.selectedOption = null;
    el('questionHost').innerHTML = `
      <article class="question-card">
        <span class="question-type">${escapeHtml(question.category || TYPE_LABELS[question.type] || question.type)} • ${TYPE_LABELS[question.type] || question.type}</span>
        <h2>${formatPrompt(question.prompt)}</h2>
        <div id="answerHost">${answerControl(question)}</div>
        <div class="question-actions"><button id="prevQuestionBtn" class="secondary-btn" type="button">Previous</button><button id="checkAnswerBtn" class="primary-btn" type="button">Check Answer</button></div>
      </article>
    `;
    wireAnswerControl(question);
    el('prevQuestionBtn').addEventListener('click', previousQuestion);
    el('checkAnswerBtn').addEventListener('click', () => checkAnswer(item));
  }

  function formatPrompt(prompt) {
    return escapeHtml(prompt).replace(/\*\*(.*?)\*\*/g, '<span style="color:#e95167">$1</span>');
  }

  function answerControl(question) {
    if (question.type === 'mcq' || question.type === 'listening-mcq') {
      return `${question.type === 'listening-mcq' ? `<div class="listen-box"><button id="listenQuestionBtn" class="listen-btn" type="button">▶</button><div><strong>Listen carefully</strong><br><small>You may play the audio again.</small></div></div>` : ''}
        <div class="options-grid">${question.options.map((option) => `<button class="option-btn" data-option="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`).join('')}</div>`;
    }
    if (question.type === 'truefalse') {
      return `<div class="options-grid"><button class="option-btn" data-option="true" type="button">True</button><button class="option-btn" data-option="false" type="button">False</button></div>`;
    }
    if (question.type === 'fill' || question.type === 'correction') {
      return `<input id="textAnswer" class="answer-input" type="text" autocomplete="off" spellcheck="false" placeholder="Type your answer" />${question.hint ? `<p style="color:var(--muted);font-size:.86rem">Hint: ${escapeHtml(question.hint)}</p>` : ''}`;
    }
    if (question.type === 'reorder' || question.type === 'order-sentences') {
      const tokens = question.type === 'reorder' ? question.words : question.sentences;
      const shuffled = deterministicShuffle(tokens);
      const sentenceClass = question.type === 'order-sentences' ? ' sentence-chip' : '';
      return `<div class="reorder-bank${question.type === 'order-sentences' ? ' sentence-bank' : ''}" id="reorderBank">${shuffled.map((word, index) => `<button class="word-chip${sentenceClass}" data-reorder-index="${index}" data-word="${escapeHtml(word)}" type="button">${escapeHtml(word).replaceAll('\n','<br>')}</button>`).join('')}</div><div class="reorder-answer${question.type === 'order-sentences' ? ' sentence-answer' : ''}" id="reorderAnswer"><span style="color:var(--muted)">Build your answer here.</span></div><button id="resetOrderBtn" class="secondary-btn" type="button">Reset</button>`;
    }
    if (question.type === 'match') {
      const left = question.pairs.map((pair, index) => `<button class="match-item" data-match-left="${index}" type="button">${escapeHtml(pair[0])}</button>`).join('');
      const rightPairs = deterministicShuffle(question.pairs.map((pair, index) => ({ text: pair[1], original: index })));
      const right = rightPairs.map((item) => `<button class="match-item match-right" data-match-right="${item.original}" type="button">${escapeHtml(item.text)}</button>`).join('');
      return `<div class="match-instructions">Choose one item from each side to make a pair.</div><div class="match-board"><div class="match-column">${left}</div><div class="match-column">${right}</div></div><div id="matchStatus" class="match-status">0 of ${question.pairs.length} pairs connected</div><button id="resetMatchBtn" class="secondary-btn" type="button">Reset Matches</button>`;
    }
    return '<p>Answer control is not available.</p>';
  }

  function deterministicShuffle(words) {
    const result = [...words];
    if (result.length > 2) {
      const first = result.shift();
      result.push(first);
    } else result.reverse();
    return result;
  }

  function wireAnswerControl(question) {
    if (question.type === 'mcq' || question.type === 'listening-mcq' || question.type === 'truefalse') {
      document.querySelectorAll('[data-option]').forEach((button) => {
        button.addEventListener('click', () => {
          document.querySelectorAll('[data-option]').forEach((item) => item.classList.remove('selected'));
          button.classList.add('selected');
          currentPractice.selectedOption = button.dataset.option;
        });
      });
      if (question.type === 'listening-mcq') el('listenQuestionBtn').addEventListener('click', () => speak(question.audio));
    }
    if (question.type === 'reorder' || question.type === 'order-sentences') {
      const updateOrder = () => {
        const host = el('reorderAnswer');
        host.innerHTML = currentPractice.selections.length
          ? currentPractice.selections.map((word, index) => `<button class="word-chip answer" data-answer-index="${index}" type="button">${escapeHtml(word).replaceAll('\n','<br>')}</button>`).join('')
          : '<span style="color:var(--muted)">Build your answer here.</span>';
        document.querySelectorAll('[data-answer-index]').forEach((button) => {
          button.addEventListener('click', () => {
            currentPractice.selections.splice(Number(button.dataset.answerIndex), 1);
            updateOrder();
            syncReorderBank();
          });
        });
      };
      const syncReorderBank = () => {
        document.querySelectorAll('[data-reorder-index]').forEach((button) => {
          const selectedCount = currentPractice.selections.filter((word) => word === button.dataset.word).length;
          const bankBefore = [...document.querySelectorAll(`[data-word="${CSS.escape(button.dataset.word)}"]`)].filter((b) => Number(b.dataset.reorderIndex) < Number(button.dataset.reorderIndex)).length;
          button.disabled = bankBefore < selectedCount;
          button.style.opacity = button.disabled ? '.35' : '1';
        });
      };
      document.querySelectorAll('[data-reorder-index]').forEach((button) => {
        button.addEventListener('click', () => {
          if (button.disabled) return;
          currentPractice.selections.push(button.dataset.word);
          updateOrder();
          syncReorderBank();
        });
      });
      el('resetOrderBtn').addEventListener('click', () => {
        currentPractice.selections = [];
        updateOrder();
        syncReorderBank();
      });
      updateOrder();
    }
    if (question.type === 'match') {
      currentPractice.matchSelections = {};
      let selectedLeft = null;
      const refresh = () => {
        document.querySelectorAll('[data-match-left]').forEach((button) => {
          const idx = Number(button.dataset.matchLeft);
          button.classList.toggle('selected', idx === selectedLeft);
          button.classList.toggle('matched', currentPractice.matchSelections[idx] != null);
        });
        document.querySelectorAll('[data-match-right]').forEach((button) => {
          const right = Number(button.dataset.matchRight);
          button.classList.toggle('matched', Object.values(currentPractice.matchSelections).includes(right));
        });
        el('matchStatus').textContent = `${Object.keys(currentPractice.matchSelections).length} of ${question.pairs.length} pairs connected`;
      };
      document.querySelectorAll('[data-match-left]').forEach((button) => button.addEventListener('click', () => {
        const idx = Number(button.dataset.matchLeft);
        if (currentPractice.matchSelections[idx] != null) delete currentPractice.matchSelections[idx];
        selectedLeft = idx;
        refresh();
      }));
      document.querySelectorAll('[data-match-right]').forEach((button) => button.addEventListener('click', () => {
        if (selectedLeft == null) { showToast('Choose an item from the left first.'); return; }
        const right = Number(button.dataset.matchRight);
        Object.keys(currentPractice.matchSelections).forEach((key) => {
          if (currentPractice.matchSelections[key] === right) delete currentPractice.matchSelections[key];
        });
        currentPractice.matchSelections[selectedLeft] = right;
        selectedLeft = null;
        refresh();
      }));
      el('resetMatchBtn').addEventListener('click', () => { currentPractice.matchSelections = {}; selectedLeft = null; refresh(); });
      refresh();
    }
  }

  function normalize(value) {
    return String(value).trim().toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ');
  }

  function checkAnswer(item) {
    const q = item.question;
    let answer;
    if (q.type === 'mcq' || q.type === 'listening-mcq') answer = currentPractice.selectedOption || '';
    else if (q.type === 'truefalse') answer = currentPractice.selectedOption === 'true';
    else if (q.type === 'fill' || q.type === 'correction') answer = el('textAnswer').value;
    else if (q.type === 'reorder' || q.type === 'order-sentences') answer = currentPractice.selections;
    else if (q.type === 'match') answer = currentPractice.matchSelections;

    const emptyMatch = q.type === 'match' && Object.keys(answer || {}).length !== q.pairs.length;
    if ((q.type !== 'truefalse' && q.type !== 'match' && !answer?.length) || (q.type === 'truefalse' && currentPractice.selectedOption == null) || emptyMatch) {
      showToast('Choose or write an answer first.');
      return;
    }

    const correct = (q.type === 'reorder' || q.type === 'order-sentences')
      ? JSON.stringify(answer.map(normalize)) === JSON.stringify(q.answer.map(normalize))
      : q.type === 'match'
        ? q.pairs.every((_, index) => Number(answer[index]) === index)
      : q.type === 'truefalse'
        ? answer === q.answer
        : normalize(answer) === normalize(q.answer);

    if (correct) handleCorrect(item);
    else handleWrong(item);
  }

  function displayAnswer(question) {
    if (question.type === 'match') return question.pairs.map((pair) => `${pair[0]} → ${pair[1]}`).join(' | ');
    if (Array.isArray(question.answer)) return question.answer.join(question.type === 'order-sentences' ? ' → ' : ' ');
    if (typeof question.answer === 'boolean') return question.answer ? 'True' : 'False';
    return question.answer;
  }

  function recordPerformance(item, correct) {
    const category = item.question.category || TYPE_LABELS[item.question.type] || 'Mixed';
    const unitId = currentPractice.unit.id;
    state.performance[unitId] ||= {};
    state.performance[unitId][category] ||= { attempts: 0, correct: 0 };
    state.performance[unitId][category].attempts += 1;
    if (correct) state.performance[unitId][category].correct += 1;
  }

  function handleCorrect(item) {
    recordPerformance(item, true);
    if (!state.completed[item.id]) {
      state.completed[item.id] = true;
      state.points += currentPractice.mode === 'bank' ? 20 : currentPractice.mode === 'review' ? 15 : 10;
      saveState();
    }
    feedbackCard.classList.remove('wrong');
    el('feedbackIcon').textContent = '✓';
    el('feedbackTitle').textContent = 'Excellent!';
    el('feedbackText').textContent = `Correct answer. You earned ${currentPractice.mode === 'bank' ? 20 : currentPractice.mode === 'review' ? 15 : 10} points.`;
    el('feedbackActionBtn').textContent = 'Next Activity';
    pendingFeedbackAction = () => nextQuestion();
    feedbackModal.classList.remove('is-hidden');
    celebrate();
  }

  function handleWrong(item) {
    recordPerformance(item, false);
    state.mistakes[item.id] = (state.mistakes[item.id] || 0) + 1;
    saveState();
    feedbackCard.classList.add('wrong');
    el('feedbackIcon').textContent = '!';
    el('feedbackTitle').textContent = 'Let’s Fix It';
    el('feedbackText').innerHTML = `The correct answer is <strong>${escapeHtml(displayAnswer(item.question))}</strong>.${item.question.explanation ? `<br><span class="feedback-explanation">${escapeHtml(item.question.explanation)}</span>` : ''}<br>Read it once, then press Got It.`;
    el('feedbackActionBtn').textContent = 'Got It';
    pendingFeedbackAction = () => {
      feedbackModal.classList.add('is-hidden');
      renderQuestion();
    };
    feedbackModal.classList.remove('is-hidden');
  }

  function nextQuestion() {
    feedbackModal.classList.add('is-hidden');
    if (!currentPractice) return;
    if (currentPractice.index < currentPractice.items.length - 1) {
      currentPractice.index += 1;
      renderQuestion();
    } else {
      renderPracticeComplete();
    }
  }

  function previousQuestion() {
    if (!currentPractice) return;
    if (currentPractice.index > 0) {
      currentPractice.index -= 1;
      renderQuestion();
    } else showToast('This is the first activity.');
  }

  function renderPracticeComplete() {
    const { mode, unit, lesson, items } = currentPractice;
    const allDone = items.every((item) => state.completed[item.id]);
    el('questionHost').innerHTML = `
      <article class="question-card finished-card">
        <div><div class="finished-mark">★</div><h2>${allDone ? 'Set Completed!' : 'You Reached the End'}</h2><p>${allDone ? 'Every activity in this set is finished.' : 'Some activities are still unfinished. You can return and complete them.'}</p>
        <div class="question-actions"><button id="repeatSetBtn" class="secondary-btn" type="button">Review Activities</button><button id="finishSetBtn" class="primary-btn" type="button">${mode === 'lesson' ? 'Back to Lesson' : mode === 'bank' ? 'Back to Question Bank' : 'Back to Unit'}</button></div></div>
      </article>
    `;
    el('questionCounter').textContent = `${items.filter((item) => state.completed[item.id]).length} / ${items.length} finished`;
    el('questionProgressBar').style.width = `${Math.round((items.filter((item) => state.completed[item.id]).length / items.length) * 100)}%`;
    el('repeatSetBtn').addEventListener('click', () => {
      currentPractice.index = 0;
      renderQuestion();
    });
    el('finishSetBtn').addEventListener('click', () => {
      if (mode === 'review') navigate({ name: 'unit', unitId: unit.id });
      else if (mode === 'bank') navigate({ name: 'bankHub', unitId: unit.id });
      else navigate({ name: 'lesson', lessonId: lesson.id, tab: 'learn' });
    });
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Speech playback is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function showToast(message) {
    const toast = el('toast');
    toast.textContent = message;
    toast.classList.remove('is-hidden');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.add('is-hidden'), 2200);
  }

  function celebrate() {
    for (let i = 0; i < 16; i += 1) {
      const confetti = document.createElement('span');
      confetti.textContent = ['★', '✦', '●'][i % 3];
      Object.assign(confetti.style, {
        position: 'fixed',
        zIndex: 400,
        left: `${48 + (Math.random() - .5) * 25}%`,
        top: '42%',
        color: ['#ff9b4a', '#5e7bff', '#11c5a3', '#ff6f9f'][i % 4],
        fontSize: `${14 + Math.random() * 14}px`,
        pointerEvents: 'none',
        transition: 'transform 900ms ease, opacity 900ms ease'
      });
      document.body.appendChild(confetti);
      requestAnimationFrame(() => {
        confetti.style.transform = `translate(${(Math.random() - .5) * 420}px, ${-80 + Math.random() * 300}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = '0';
      });
      setTimeout(() => confetti.remove(), 950);
    }
  }

  function getBadgeCount() {
    const milestones = [50, 150, 300, 500, 800, 1100, 1500];
    return milestones.filter((value) => state.points >= value).length;
  }

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarBackdrop.classList.remove('is-hidden');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.add('is-hidden');
  }

  function enterCourse() {
    splash.classList.add('is-hidden');
    app.classList.remove('is-hidden');
    state.started = true;
    state.visits += 1;
    saveState();
    // A fresh entry always opens the course dashboard; the dashboard's
    // Continue button is the explicit way to resume the saved activity.
    navigate({ name: 'dashboard' }, { preserveScroll: true });
  }

  el('enterCourseBtn').addEventListener('click', enterCourse);
  el('brandBtn').addEventListener('click', () => navigate({ name: 'dashboard' }));
  el('menuBtn').addEventListener('click', openSidebar);
  sidebarBackdrop.addEventListener('click', closeSidebar);
  document.querySelectorAll('.nav-item[data-route]').forEach((item) => item.addEventListener('click', () => navigate({ name: item.dataset.route })));
  el('teacherBtn').addEventListener('click', () => teacherDialog.showModal());
  document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => teacherDialog.close()));
  el('feedbackActionBtn').addEventListener('click', () => pendingFeedbackAction?.());

  const restoreRouteOnReload = performance.getEntriesByType('navigation')[0]?.type === 'reload' || window.performance?.navigation?.type === 1;
  window.addEventListener('pagehide', () => {
    saveState();
    void window.MrFaridCourseProgress?.saveNow();
  });

  window.Primary6App = {
    setStudent(next = {}) {
      if (next.studentId) student.id = String(next.studentId);
      if (next.studentName) student.name = String(next.studentName);
      updateChrome();
    },
    getProgress() { return JSON.parse(JSON.stringify({ student, state })); }
  };
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'PLATFORM_STUDENT' && event.data.student) window.Primary6App.setStudent(event.data.student);
  });

  updateChrome();
  if (state.started) {
    splash.classList.add('is-hidden');
    app.classList.remove('is-hidden');
    route = restoreRouteOnReload ? (state.lastRoute || { name: 'dashboard' }) : { name: 'dashboard' };
    render();
  }

  window.MrFaridCourseProgress?.connect({
    courseId: 'english-primary-6-first-term',
    getState: () => state,
    setState: (next) => {
      state = Object.assign(defaultState(), next || {});
      route = restoreRouteOnReload ? (state.lastRoute || { name: 'dashboard' }) : { name: 'dashboard' };
      updateChrome();
      if (state.started) render();
    },
    mergeState: (_local, remote) => Object.assign(defaultState(), remote || {}),
    onStatus: ({ online }) => { document.title = online ? 'English Primary 6 · Saved' : 'English Primary 6 · Term 1'; }
  });
})();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
