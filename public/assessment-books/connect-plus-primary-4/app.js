
(() => {
  'use strict';

  const ROOT_ID = 'cp4-app';
  const COLORS = {
    violet:'#7047e8', blue:'#2877f5', green:'#18a765', orange:'#ff7a3c',
    pink:'#e64eb6', teal:'#13aaa6', gold:'#e5a500', red:'#e75555'
  };

  let B = null;
  let U = 0, L = 0, P = 0;
  let selectedToken = null;
  let toastTimer = null;

  const defaultState = {
    answers:{}, completed:{}, xp:0, stars:0,
    last:{u:0,l:0,p:0}, sound:true
  };

  function safeLoadState() {
    try {
      const raw = localStorage.getItem('cp4_fixed_state');
      if (!raw) return structuredClone(defaultState);
      return {...structuredClone(defaultState), ...JSON.parse(raw)};
    } catch {
      return structuredClone(defaultState);
    }
  }

  const state = safeLoadState();

  function q(selector, root=document) { return root.querySelector(selector); }
  function qa(selector, root=document) { return [...root.querySelectorAll(selector)]; }
  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[char]);
  }
  function safeId(value) { return String(value).replace(/[^a-z0-9]/gi,'_'); }

  function save() {
    try { localStorage.setItem('cp4_fixed_state', JSON.stringify(state)); } catch {}
    updateStats();
  }

  function validateBookData(data) {
    return data && Array.isArray(data.units) && data.units.length > 0 &&
      data.units.every(unit => Array.isArray(unit.lessons));
  }

  function init() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;

    B = window.BOOK_DATA;
    if (!validateBookData(B)) {
      showFatal('The book data could not be loaded. Keep index.html, app.js, book-data.js and the assets folder together.');
      return;
    }

    root.addEventListener('click', handleRootClick);
    root.addEventListener('input', handleAnswerInput);
    root.addEventListener('change', handleAnswerInput);
    root.addEventListener('dragstart', handleDragStart);
    root.addEventListener('dragover', handleDragOver);
    root.addEventListener('drop', handleDrop);

    window.addEventListener('error', event => {
      console.error(event.error || event.message);
    });

    renderHome();
    updateStats();

    window.CP4_APP = {
      startBook, continueBook, showHome,
      openUnit: index => openUnit(Number(index)),
      goLesson: (unit, lesson) => goLesson(Number(unit), Number(lesson))
    };
  }

  function handleRootClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    event.preventDefault();
    const action = target.dataset.action;

    const actions = {
      home: showHome,
      'start-book': startBook,
      'continue-book': continueBook,
      'toggle-sound': toggleSound,
      'open-unit': () => openUnit(Number(target.dataset.unit)),
      'open-lesson': () => goLesson(Number(target.dataset.unit), Number(target.dataset.lesson)),
      'toggle-original': toggleOriginal,
      'select-page': () => selectPage(Number(target.dataset.pageIndex)),
      'previous-lesson': previousLesson,
      'next-lesson': nextLesson,
      'complete-lesson': completeLesson,
      'close-celebration': closeCelebration,
      'save-activity': () => saveActivity(target.dataset.key),
      'read-aloud': () => speak(decodeURIComponent(target.dataset.speak || '')),
      'select-choice': () => selectChoice(target),
      'select-token': () => selectToken(target),
      'place-blank': () => placeInBlank(target),
      'place-drop': () => placeInDrop(target),
      'place-sort': () => placeInSort(target)
    };

    try {
      if (actions[action]) actions[action]();
    } catch (error) {
      console.error(error);
      showToast('This activity could not open. Please try again.');
    }
  }

  function handleAnswerInput(event) {
    const field = event.target.closest('[data-answer-key]');
    if (!field) return;
    setAnswer(field.dataset.answerKey, field.dataset.answerIndex, field.value);
  }

  function handleDragStart(event) {
    const token = event.target.closest('[data-token]');
    if (!token) return;
    selectedToken = token.dataset.token;
    event.dataTransfer?.setData('text/plain', selectedToken);
  }

  function handleDragOver(event) {
    if (event.target.closest('[data-action="place-blank"],[data-action="place-drop"],[data-action="place-sort"]')) {
      event.preventDefault();
    }
  }

  function handleDrop(event) {
    const zone = event.target.closest('[data-action="place-blank"],[data-action="place-drop"],[data-action="place-sort"]');
    if (!zone) return;
    event.preventDefault();
    selectedToken = event.dataTransfer?.getData('text/plain') || selectedToken;
    zone.click();
  }

  function allLessons() {
    return B.units.flatMap((unit, unitIndex) =>
      unit.lessons.map((lesson, lessonIndex) => ({unitIndex, lessonIndex, lesson}))
    );
  }

  function updateStats() {
    const stars = q('#cp4-stars');
    const xp = q('#cp4-xp');
    const text = q('#cp4-progress-text');
    const bar = q('#cp4-progress-bar');
    const sound = q('#cp4-sound-btn');
    if (!stars || !xp || !text || !bar || !sound || !B) return;

    stars.textContent = state.stars;
    xp.textContent = state.xp;
    const lessons = allLessons();
    const done = lessons.filter(item => state.completed[item.lesson.id]).length;
    const percent = lessons.length ? Math.round(done / lessons.length * 100) : 0;
    text.textContent = percent + '%';
    bar.style.width = percent + '%';
    sound.textContent = state.sound ? '🔊' : '🔇';
  }

  function showHome() {
    q('#cp4-home-view')?.classList.remove('cp4-hidden');
    q('#cp4-book-view')?.classList.add('cp4-hidden');
    renderHome();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function startBook() {
    U = 0; L = 0; P = 0;
    openBook();
  }

  function continueBook() {
    U = clamp(Number(state.last?.u) || 0, 0, B.units.length - 1);
    L = clamp(Number(state.last?.l) || 0, 0, B.units[U].lessons.length - 1);
    P = Math.max(0, Number(state.last?.p) || 0);
    openBook();
  }

  function openUnit(index) {
    U = clamp(index, 0, B.units.length - 1);
    L = 0; P = 0;
    openBook();
  }

  function openBook() {
    q('#cp4-home-view')?.classList.add('cp4-hidden');
    q('#cp4-book-view')?.classList.remove('cp4-hidden');
    renderSidebar();
    renderLesson();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function renderHome() {
    const grid = q('#cp4-unit-grid');
    if (!grid) return;
    grid.innerHTML = B.units.map((unit, index) => {
      const base = COLORS[unit.color] || '#7047e8';
      return `
        <button type="button" class="cp4-unit-card" data-action="open-unit" data-unit="${index}"
          style="background:linear-gradient(135deg,${base},${shade(base,35)})">
          <span class="cp4-unit-card__icon">${esc(unit.icon || '📘')}</span>
          <h3>${esc(unit.title)}</h3>
          <p>${esc(unit.description || '')}</p>
          <small>${unit.lessons.length} learning stations →</small>
        </button>`;
    }).join('');
  }

  function renderSidebar() {
    const sidebar = q('#cp4-sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
      <button type="button" class="cp4-side-home" data-action="home">⌂ Book Home</button>
      ${B.units.map((unit, unitIndex) => `
        <div class="cp4-side-unit">
          <div class="cp4-side-unit-title">${esc(unit.icon || '📘')} ${esc(unit.title)}</div>
          ${unit.lessons.map((lesson, lessonIndex) => `
            <button type="button"
              class="cp4-lesson-btn ${unitIndex === U && lessonIndex === L ? 'cp4-active' : ''} ${state.completed[lesson.id] ? 'cp4-done' : ''}"
              data-action="open-lesson" data-unit="${unitIndex}" data-lesson="${lessonIndex}">
              ${lessonIndex + 1}. ${esc(lesson.title)}
            </button>`).join('')}
        </div>`).join('')}`;
  }

  function goLesson(unitIndex, lessonIndex) {
    U = clamp(unitIndex, 0, B.units.length - 1);
    L = clamp(lessonIndex, 0, B.units[U].lessons.length - 1);
    P = 0;
    renderSidebar();
    renderLesson();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function renderLesson() {
    const unit = B.units[U];
    const lesson = unit.lessons[L];
    if (!lesson || !Array.isArray(lesson.pageData) || lesson.pageData.length === 0) {
      showFatal('This lesson has no activity data.');
      return;
    }

    P = clamp(P, 0, lesson.pageData.length - 1);
    state.last = {u:U,l:L,p:P};
    save();

    const header = q('#cp4-lesson-header');
    const original = q('#cp4-original-pages');
    const tabs = q('#cp4-page-tabs');

    header.innerHTML = `
      <div>
        <h1>${esc(unit.icon || '📘')} ${esc(lesson.title)}</h1>
        <p>${esc(unit.title)} • ${lesson.pageData.length > 1 ? lesson.pageData.length + ' workbook pages' : 'Workbook page ' + lesson.pageData[0].page}</p>
      </div>
      <button type="button" class="cp4-reference-btn" data-action="toggle-original" id="cp4-reference-btn">
        👁 Show Original Page${lesson.pageData.length > 1 ? 's' : ''}
      </button>`;

    original.classList.add('cp4-hidden');
    original.innerHTML = `
      <h3>Original workbook reference</h3>
      <p class="cp4-note">These pages are for reference only. Complete all exercises in the interactive activities below.</p>
      <div class="cp4-original-grid">
        ${lesson.pageData.map(page => `<img src="${esc(page.original)}" alt="Original workbook page ${esc(page.page)}">`).join('')}
      </div>`;

    tabs.innerHTML = lesson.pageData.map((page, pageIndex) => `
      <button type="button" class="cp4-page-tab ${pageIndex === P ? 'cp4-active' : ''}"
        data-action="select-page" data-page-index="${pageIndex}">Page ${esc(page.page)}</button>
    `).join('');

    renderActivities();
  }

  function toggleOriginal() {
    const box = q('#cp4-original-pages');
    const button = q('#cp4-reference-btn');
    if (!box || !button) return;
    const willOpen = box.classList.contains('cp4-hidden');
    box.classList.toggle('cp4-hidden');
    const plural = B.units[U].lessons[L].pageData.length > 1 ? 's' : '';
    button.textContent = willOpen ? `🙈 Hide Original Page${plural}` : `👁 Show Original Page${plural}`;
  }

  function selectPage(index) {
    P = clamp(index, 0, B.units[U].lessons[L].pageData.length - 1);
    state.last.p = P;
    save();
    renderLesson();
    window.scrollTo({top:90,behavior:'smooth'});
  }

  function renderActivities() {
    const container = q('#cp4-activities');
    if (!container) return;

    const unit = B.units[U];
    const lesson = unit.lessons[L];
    const page = lesson.pageData[P];
    const accent = COLORS[unit.color] || '#7047e8';

    container.innerHTML = page.activities.map((activity, index) => {
      try {
        return activityHTML(activity, index, accent);
      } catch (error) {
        console.error('Activity render error:', error, activity);
        return `
          <section class="cp4-activity">
            <div class="cp4-note">This activity could not be displayed correctly. Use “Show Original Page” as a temporary reference.</div>
          </section>`;
      }
    }).join('');
  }

  function activityKey(activity) {
    const lesson = B.units[U].lessons[L];
    const page = lesson.pageData[P];
    return `${lesson.id}|${page.page}|${activity.id}`;
  }

  function activityHTML(activity, index, accent) {
    const key = activityKey(activity);
    const saved = state.answers[key] || {};
    const optional = Boolean(activity.optional);
    const listening = Boolean(activity.listening);
    const badge = optional
      ? `<span class="cp4-optional ${listening ? 'cp4-optional--listening' : ''}">${listening ? '🎧 Optional Listening Activity' : 'Optional Activity'}</span>`
      : '';

    let body = '';
    switch (activity.type) {
      case 'choice': body = renderChoice(activity,key,saved); break;
      case 'fill': body = renderFill(activity,key,saved); break;
      case 'match': body = renderMatch(activity,key,saved); break;
      case 'tf': body = renderTF(activity,key,saved); break;
      case 'order': body = renderOrder(activity,key,saved); break;
      case 'reading': body = renderReading(activity,key,saved); break;
      default: body = renderOpen(activity,key,saved,optional);
    }

    const speech = encodeURIComponent((activity.instruction + ' ' + (activity.lines || []).join(' ')).slice(0,1800));

    return `
      <section class="cp4-activity" style="--cp4-accent:${accent}">
        <div class="cp4-activity-header">
          <div class="cp4-activity-number">${index + 1}</div>
          <h2>${esc(activity.instruction)}</h2>
          ${badge}
          <button type="button" class="cp4-read-btn" data-action="read-aloud" data-speak="${speech}">🔊 Read Aloud</button>
        </div>
        ${body}
        <div class="cp4-save-row">
          <span class="cp4-saved" id="cp4-saved-${safeId(key)}">Saved ✓</span>
          <button type="button" class="cp4-btn cp4-btn--primary" data-action="save-activity" data-key="${esc(key)}">Save Activity</button>
        </div>
      </section>`;
  }

  function renderChoice(activity,key,saved) {
    return (activity.lines || []).map((line,index) => {
      const parsed = parseChoice(line);
      if (parsed.options.length < 2) return textAnswer(line,key,index,saved[index]);
      return `
        <div class="cp4-question">
          <div class="cp4-question__text">${esc(parsed.stem)}</div>
          <div class="cp4-choice-grid">
            ${parsed.options.map(option => `
              <button type="button" class="cp4-choice ${saved[index] === option ? 'cp4-selected' : ''}"
                data-action="select-choice" data-key="${esc(key)}" data-index="${index}" data-value="${esc(option)}">
                ${esc(option)}
              </button>`).join('')}
          </div>
        </div>`;
    }).join('');
  }

  function parseChoice(line) {
    const source = String(line || '').replace(/^\s*\d+[\.\-\)]?\s*/,'').trim();
    const slashParts = source.split(/\s*\/\s*/).map(item => item.trim()).filter(Boolean);
    if (slashParts.length >= 2) {
      return {stem:'Choose the correct answer.', options:slashParts};
    }

    const letterParts = [...source.matchAll(/(?:^|\s)(?:[a-d][\.\)])\s*([^a-d]+?)(?=(?:\s+[a-d][\.\)])|$)/gi)]
      .map(match => match[1].trim()).filter(Boolean);

    if (letterParts.length >= 2) {
      const stem = source.split(/\s+a[\.\)]/i)[0].trim() || 'Choose the correct answer.';
      return {stem,options:letterParts};
    }

    return {stem:source,options:[]};
  }

  function renderFill(activity,key,saved) {
    const bank = Array.isArray(activity.bank) ? activity.bank : [];
    const lines = activity.lines || [];
    let output = wordBankHTML(bank,key);

    if (lines.length === 1 && countBlanks(lines[0]) > 1) {
      output += `<div class="cp4-inline-text">${textWithBlanks(lines[0],key,saved,bank)}</div>`;
      return output;
    }

    output += lines.map((line,index) => {
      const blanks = countBlanks(line);
      if (blanks > 1) {
        return `<div class="cp4-question"><div class="cp4-inline-text">${textWithBlanks(line,key,saved,bank,index * 100)}</div></div>`;
      }
      if (blanks === 1 && bank.length) {
        return `
          <div class="cp4-question">
            <div class="cp4-question__text">${esc(line)}</div>
            <select class="cp4-select" data-answer-key="${esc(key)}" data-answer-index="${index}">
              <option value="">Choose a word...</option>
              ${bank.map(word => `<option value="${esc(word)}" ${saved[index] === word ? 'selected' : ''}>${esc(word)}</option>`).join('')}
            </select>
          </div>`;
      }
      return textAnswer(line,key,index,saved[index]);
    }).join('');

    return output;
  }

  function wordBankHTML(bank,key) {
    if (!bank.length) return '';
    return `
      <div class="cp4-wordbank">
        <div class="cp4-wordbank__title">🧩 Word Box — choose from these words</div>
        <div class="cp4-wordbank__items">
          ${bank.map(word => `
            <button type="button" draggable="true" class="cp4-token"
              data-action="select-token" data-token="${esc(word)}" data-token-key="${esc(key)}">${esc(word)}</button>
          `).join('')}
        </div>
      </div>`;
  }

  function countBlanks(text) {
    return (String(text).match(/_{2,}|\.{4,}|…{2,}/g) || []).length;
  }

  function textWithBlanks(text,key,saved,bank,startIndex=0) {
    let output = '', last = 0, blank = 0;
    const regex = /_{2,}|\.{4,}|…{2,}/g;
    let match;
    while ((match = regex.exec(text))) {
      output += esc(text.slice(last,match.index));
      const index = startIndex + blank;
      const value = saved[index] || '';
      output += `
        <button type="button" class="cp4-blank ${value ? 'cp4-filled' : ''}"
          data-action="place-blank" data-key="${esc(key)}" data-index="${index}"
          data-bank="${encodeURIComponent(JSON.stringify(bank))}">
          ${esc(value || 'Choose')}
        </button>`;
      blank++;
      last = match.index + match[0].length;
    }
    output += esc(text.slice(last));
    return output;
  }

  function matchInfo(activity) {
    const lines = [...(activity.lines || [])];
    const bank = Array.isArray(activity.bank) ? activity.bank : [];
    const categories = lines.filter(line => /:$/.test(line));

    if (categories.length >= 2) {
      return {mode:'sort',items:bank.length ? bank : lines.filter(line => !/:$/.test(line)),categories:categories.map(line => line.replace(/:$/,''))};
    }
    if (/advantages and disadvantages/i.test(activity.instruction)) return {mode:'sort',items:lines,categories:['Advantages','Disadvantages']};
    if (/vertebrate or invertebrate/i.test(activity.instruction)) return {mode:'sort',items:lines,categories:['Vertebrate','Invertebrate']};
    if (/warm or cold/i.test(activity.instruction)) return {mode:'sort',items:lines,categories:['Warm','Cold']};
    return {mode:'pair',prompts:lines,options:bank.length ? bank : lines};
  }

  function renderMatch(activity,key,saved) {
    const info = matchInfo(activity);

    if (info.mode === 'sort') {
      return `
        <div class="cp4-note">Drag each card into the correct category. On a phone, tap a card and then tap a category.</div>
        <div class="cp4-match-source">
          ${info.items.map(item => `<button type="button" draggable="true" class="cp4-token" data-action="select-token" data-token="${esc(item)}">${esc(item)}</button>`).join('')}
        </div>
        <div class="cp4-sort-board">
          ${info.categories.map(category => `
            <div class="cp4-sort-column">
              <h3>${esc(category)}</h3>
              <button type="button" class="cp4-sort-drop" data-action="place-sort" data-key="${esc(key)}" data-category="${esc(category)}">
                ${Object.entries(saved).filter(([,value]) => value === category).map(([item]) => `<span class="cp4-token">${esc(item)}</span>`).join('')}
              </button>
            </div>`).join('')}
        </div>`;
    }

    return `
      <div class="cp4-note">Drag an answer to the matching sentence. On a phone, tap the answer and then tap its destination.</div>
      <div class="cp4-match-board">
        <div class="cp4-match-source">
          ${info.options.map(option => `<button type="button" draggable="true" class="cp4-token" data-action="select-token" data-token="${esc(option)}">${esc(option)}</button>`).join('')}
        </div>
        <div class="cp4-match-targets">
          ${info.prompts.map((prompt,index) => `
            <div class="cp4-drop-row">
              <div class="cp4-question__text">${esc(prompt)}</div>
              <button type="button" class="cp4-dropzone ${saved[index] ? 'cp4-filled' : ''}"
                data-action="place-drop" data-key="${esc(key)}" data-index="${index}">
                ${esc(saved[index] || 'Drop an answer here')}
              </button>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function renderTF(activity,key,saved) {
    return (activity.lines || []).map((line,index) => `
      <div class="cp4-question">
        <div class="cp4-question__text">${esc(line)}</div>
        <div class="cp4-choice-grid">
          <button type="button" class="cp4-choice ${saved[index] === 'True' ? 'cp4-selected' : ''}"
            data-action="select-choice" data-key="${esc(key)}" data-index="${index}" data-value="True">✓ True</button>
          <button type="button" class="cp4-choice ${saved[index] === 'False' ? 'cp4-selected' : ''}"
            data-action="select-choice" data-key="${esc(key)}" data-index="${index}" data-value="False">✕ False</button>
        </div>
      </div>`).join('');
  }

  function renderOrder(activity,key,saved) {
    return (activity.lines || []).map((line,index) => {
      const words = String(line).replace(/^\d+[\.\-\)]?\s*/,'').split(/\s*[–—-]\s*/).filter(Boolean);
      return `
        <div class="cp4-question">
          <div class="cp4-question__text">Arrange the words to make a correct sentence.</div>
          <div class="cp4-order-area">${words.map(word => `<span class="cp4-order-chip" draggable="true">${esc(word)}</span>`).join('')}</div>
          <input class="cp4-input" data-answer-key="${esc(key)}" data-answer-index="${index}"
            value="${esc(saved[index] || '')}" placeholder="Write the complete sentence">
        </div>`;
    }).join('');
  }

  function renderReading(activity,key,saved) {
    const lines = activity.lines || [];
    const passage = lines.find(line => line.length > 120 && !/^\d+/.test(line)) || lines[0] || '';
    const questions = lines.filter(line => line !== passage);
    return `
      <div class="cp4-passage">${esc(passage)}</div>
      ${questions.map((question,index) => `
        <div class="cp4-question">
          <div class="cp4-question__text">${esc(question)}</div>
          <textarea class="cp4-textarea" data-answer-key="${esc(key)}" data-answer-index="${index}"
            placeholder="Write your answer">${esc(saved[index] || '')}</textarea>
        </div>`).join('')}`;
  }

  function renderOpen(activity,key,saved,optional) {
    const lines = activity.lines || [];
    return `
      ${optional ? '<div class="cp4-note">This activity is optional and does not block lesson completion.</div>' : ''}
      ${lines.map((question,index) => `
        <div class="cp4-question">
          <div class="cp4-question__text">${esc(question)}</div>
          <textarea class="cp4-textarea" data-answer-key="${esc(key)}" data-answer-index="${index}"
            placeholder="Write your response">${esc(saved[index] || '')}</textarea>
        </div>`).join('')}`;
  }

  function textAnswer(question,key,index,value) {
    return `
      <div class="cp4-question">
        <div class="cp4-question__text">${esc(question)}</div>
        <input class="cp4-input" data-answer-key="${esc(key)}" data-answer-index="${index}"
          value="${esc(value || '')}" placeholder="Type your answer">
      </div>`;
  }

  function selectChoice(button) {
    const key = button.dataset.key;
    const index = button.dataset.index;
    setAnswer(key,index,button.dataset.value);
    qa(`[data-action="select-choice"][data-key="${cssEscape(key)}"][data-index="${cssEscape(index)}"]`)
      .forEach(item => item.classList.remove('cp4-selected'));
    button.classList.add('cp4-selected');
  }

  function selectToken(button) {
    selectedToken = button.dataset.token;
    qa('.cp4-token').forEach(token => token.classList.remove('cp4-selected'));
    button.classList.add('cp4-selected');
    showToast('Now choose a blank or drop zone.');
  }

  function placeInBlank(button) {
    const bank = JSON.parse(decodeURIComponent(button.dataset.bank || '%5B%5D'));
    let value = selectedToken;
    if (!value) value = prompt(bank.length ? 'Choose or type a word:' : 'Type the answer:', '') || '';
    if (!value) return;
    setAnswer(button.dataset.key,button.dataset.index,value);
    button.textContent = value;
    button.classList.add('cp4-filled');
    clearSelectedToken();
  }

  function placeInDrop(button) {
    if (!selectedToken) { showToast('Choose an answer card first.'); return; }
    setAnswer(button.dataset.key,button.dataset.index,selectedToken);
    button.textContent = selectedToken;
    button.classList.add('cp4-filled');
    clearSelectedToken();
  }

  function placeInSort(button) {
    if (!selectedToken) { showToast('Choose a card first.'); return; }
    const key = button.dataset.key;
    state.answers[key] ||= {};
    state.answers[key][selectedToken] = button.dataset.category;
    save();
    renderActivities();
    clearSelectedToken();
  }

  function clearSelectedToken() {
    selectedToken = null;
    qa('.cp4-token').forEach(token => token.classList.remove('cp4-selected'));
  }

  function setAnswer(key,index,value) {
    state.answers[key] ||= {};
    state.answers[key][index] = value;
    save();
  }

  function saveActivity(key) {
    save();
    const message = q(`#cp4-saved-${safeId(key)}`);
    if (message) {
      message.classList.add('cp4-show');
      setTimeout(() => message.classList.remove('cp4-show'),1800);
    }
    showToast('Activity saved ✓');
  }

  function requiredActivitiesAnswered() {
    const lesson = B.units[U].lessons[L];
    return lesson.pageData.every(page =>
      page.activities.filter(activity => !activity.optional).every(activity => {
        const key = `${lesson.id}|${page.page}|${activity.id}`;
        return Object.values(state.answers[key] || {}).some(value => String(value).trim() !== '');
      })
    );
  }

  function completeLesson() {
    const lesson = B.units[U].lessons[L];
    if (!requiredActivitiesAnswered()) {
      showToast('Complete at least one answer in every required activity first.');
      return;
    }
    if (!state.completed[lesson.id]) {
      state.completed[lesson.id] = true;
      state.xp += 50;
      state.stars += 5;
      save();
    }
    renderSidebar();
    q('#cp4-celebration')?.classList.remove('cp4-hidden');
  }

  function closeCelebration() {
    q('#cp4-celebration')?.classList.add('cp4-hidden');
    nextLesson();
  }

  function previousLesson() {
    const lessons = allLessons();
    const index = lessons.findIndex(item => item.unitIndex === U && item.lessonIndex === L);
    const target = lessons[Math.max(0,index - 1)];
    U = target.unitIndex; L = target.lessonIndex; P = 0;
    renderSidebar(); renderLesson(); window.scrollTo({top:0,behavior:'smooth'});
  }

  function nextLesson() {
    const lessons = allLessons();
    const index = lessons.findIndex(item => item.unitIndex === U && item.lessonIndex === L);
    const target = lessons[Math.min(lessons.length - 1,index + 1)];
    U = target.unitIndex; L = target.lessonIndex; P = 0;
    renderSidebar(); renderLesson(); window.scrollTo({top:0,behavior:'smooth'});
  }

  function toggleSound() {
    state.sound = !state.sound;
    save();
  }

  function speak(text) {
    if (!state.sound) return;
    if (!('speechSynthesis' in window)) {
      showToast('Read Aloud is not supported in this browser.');
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = .88;
    speechSynthesis.speak(utterance);
  }

  function showToast(message) {
    const toast = q('#cp4-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('cp4-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('cp4-show'),2200);
  }

  function showFatal(message) {
    const box = q('#cp4-error');
    if (!box) return;
    box.textContent = message;
    box.classList.remove('cp4-hidden');
  }

  function shade(hex,amount) {
    const value = parseInt(hex.replace('#',''),16);
    const r = Math.min(255,(value >> 16) + amount);
    const g = Math.min(255,((value >> 8) & 255) + amount);
    const b = Math.min(255,(value & 255) + amount);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function clamp(value,min,max) { return Math.min(max,Math.max(min,value)); }
  function cssEscape(value) {
    return window.CSS?.escape ? CSS.escape(String(value)) : String(value).replace(/["\\]/g,'\\$&');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',init,{once:true});
  } else {
    init();
  }
})();
