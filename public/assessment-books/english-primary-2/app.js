(() => {
  'use strict';

  const book = window.BOOK_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const STORAGE_KEY = 'grade2EnglishInteractiveFullV1';
  const SAMPLE_PAGE = 4;
  const sampleMode = new URLSearchParams(location.search).get('sample') === '1';
  const defaultState = {
    lastPage: 4,
    points: 0,
    stars: 0,
    completed: {},
    answers: {},
    rewarded: {},
    soundEnabled: true
  };

  let state;
  try {
    state = { ...defaultState, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')) };
  } catch {
    state = { ...defaultState };
  }
  state.completed ||= {};
  state.answers ||= {};
  state.rewarded ||= {};
  state.soundEnabled = state.soundEnabled !== false;
  state.lastPage = book.pages.some(p => p.number === Number(state.lastPage)) ? Number(state.lastPage) : SAMPLE_PAGE;
  if (sampleMode) state.lastPage = SAMPLE_PAGE;

  let currentPage = state.lastPage;
  let currentView = 'interactive';

  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* App still works when storage is unavailable. */ }
    window.MrFaridCourseProgress?.queueSave();
  };
  const isLockedInSample = pageNumber => sampleMode && Number(pageNumber) !== SAMPLE_PAGE;
  const visibleIndex = printedPage => book.pages.findIndex(p => p.number === Number(printedPage));
  const activityKey = (pageNumber, activityIndex) => `p${pageNumber}-a${activityIndex}`;

  const chapterColors = ['#6d3be8','#1687e8','#22a85a','#f59e0b','#ef5d8a','#4f6fe8','#0aa89a','#f07835','#d64561'];
  const activityMeta = {
    lookWrite:{icon:'👀',label:'Look & Write',color:'#6d3be8'},
    listenChoose:{icon:'🎧',label:'Listen & Choose',color:'#1687e8'},
    listenMissing:{icon:'🔊',label:'Listen & Write',color:'#0aa89a'},
    listenFill:{icon:'🎧',label:'Listen & Complete',color:'#1687e8'},
    fillBank:{icon:'🧩',label:'Complete',color:'#7a54d8'},
    choose:{icon:'✅',label:'Choose',color:'#ef5d8a'},
    pictureChoice:{icon:'🖼️',label:'Choose the Picture',color:'#1687e8'},
    reorder:{icon:'🔀',label:'Reorder',color:'#f07835'},
    unscramble:{icon:'🔤',label:'Unscramble',color:'#6d3be8'},
    match:{icon:'🔗',label:'Match',color:'#0aa89a'},
    count:{icon:'🔢',label:'Count',color:'#f59e0b'},
    writeSentence:{icon:'✍️',label:'Write',color:'#ef5d8a'},
    draw:{icon:'🎨',label:'Draw',color:'#7a54d8'},
    trueFalse:{icon:'⚖️',label:'True or False',color:'#1687e8'},
    shortAnswer:{icon:'💬',label:'Answer',color:'#0aa89a'},
    punctuate:{icon:'❗',label:'Punctuation',color:'#f07835'},
    freeWrite:{icon:'📝',label:'Writing',color:'#ef5d8a'},
    classify:{icon:'🗂️',label:'Classify',color:'#6d3be8'}
  };

  function normalize(value) {
    return String(value ?? '')
      .toLowerCase()
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, ' ')
      .replace(/\s+([.?!,])/g, '$1')
      .trim();
  }

  function normalizedLoose(value) {
    return normalize(value).replace(/[.?!,]/g, '').trim();
  }

  function acceptedValues(answer, accepted) {
    const values = [];
    if (Array.isArray(answer)) values.push(...answer);
    else if (answer !== undefined && answer !== null) values.push(answer);
    if (Array.isArray(accepted)) values.push(...accepted);
    return values.map(normalize);
  }

  function isAccepted(value, answer, accepted, loose = false) {
    const candidates = acceptedValues(answer, accepted);
    if (!candidates.length) return String(value || '').trim().length > 0;
    const input = loose ? normalizedLoose(value) : normalize(value);
    return candidates.some(v => (loose ? normalizedLoose(v) : v) === input);
  }

  function showScreen(id) {
    $$('.screen').forEach(screen => screen.classList.remove('active'));
    $(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function feedback(message, good = true) {
    const box = $('#feedback');
    box.textContent = `${good ? '✓' : '!' } ${message}`;
    box.className = `feedback show ${good ? 'good' : 'bad'}`;
    clearTimeout(feedback.timer);
    feedback.timer = setTimeout(() => { box.className = 'feedback'; }, 3400);
  }

  function tone(kind = 'success') {
    if (!state.soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      tone.context ||= new AudioContextClass();
      const ctx = tone.context;
      const now = ctx.currentTime;
      const notes = kind === 'success' ? [523.25,659.25,783.99] : kind === 'complete' ? [523.25,659.25,783.99,1046.5] : [220,174.61];
      notes.forEach((frequency,index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = kind === 'error' ? 'triangle' : 'sine';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, now + index * .09);
        gain.gain.exponentialRampToValueAtTime(.08, now + index * .09 + .015);
        gain.gain.exponentialRampToValueAtTime(.0001, now + index * .09 + .18);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + index * .09);
        osc.stop(now + index * .09 + .2);
      });
    } catch { /* Sound effects are optional. */ }
  }

  function celebrate(intensity = 28) {
    const layer = $('#celebrationLayer');
    if (!layer) return;
    const colors = ['#0758d4','#6d3be8','#25a957','#ffbd24','#ef5d8a','#28b8e8'];
    for (let i = 0; i < intensity; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty('--fall-duration', `${1.25 + Math.random() * 1.35}s`);
      piece.style.setProperty('--drift', `${-140 + Math.random() * 280}px`);
      piece.style.setProperty('--spin', `${360 + Math.random() * 920}deg`);
      piece.style.animationDelay = `${Math.random() * .22}s`;
      layer.append(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  }

  function updateSoundButtons() {
    $$('[data-sound-toggle]').forEach(button => {
      button.textContent = state.soundEnabled ? '🔊' : '🔇';
      button.setAttribute('aria-label', state.soundEnabled ? 'Turn sound effects off' : 'Turn sound effects on');
    });
  }

  function updateStats() {
    ['dashPoints', 'readerPoints'].forEach(id => { const el = $('#' + id); if (el) el.textContent = state.points; });
    ['dashStars', 'readerStars'].forEach(id => { const el = $('#' + id); if (el) el.textContent = state.stars; });
    const done = book.pages.filter(p => state.completed[p.number]).length;
    $('#progressLabel').textContent = `${done} / ${book.pages.length} pages`;
    $('#progressFill').style.width = `${(done / book.pages.length) * 100}%`;
    $('#resumePage').textContent = visibleIndex(state.lastPage) + 1;
  }

  function chapterProgress(chapter) {
    const pages = book.pages.filter(p => p.number >= chapter.start && p.number <= chapter.end);
    const done = pages.filter(p => state.completed[p.number]).length;
    return { done, total: pages.length, pct: pages.length ? (done / pages.length) * 100 : 0 };
  }

  function buildDashboard() {
    const grid = $('#chapterGrid');
    grid.innerHTML = '';
    book.chapters.forEach(chapter => {
      const progress = chapterProgress(chapter);
      const button = document.createElement('button');
      button.type = 'button';
      const locked = sampleMode && chapter.id !== 'u1';
      button.className = `chapter-card${locked ? ' sample-locked' : ''}`;
      button.style.setProperty('--chapter-accent', chapterColors[book.chapters.indexOf(chapter) % chapterColors.length]);
      button.innerHTML = `
        <span class="chapter-icon" aria-hidden="true">${chapter.icon || '📖'}</span>
        <h3>${chapter.title}</h3>
        <p>${chapter.subtitle}</p>
        <small>${progress.done} of ${progress.total} pages finished</small>
        <div class="mini-progress"><span style="width:${progress.pct}%"></span></div>
      `;
      button.addEventListener('click', () => openPage(locked ? SAMPLE_PAGE : chapter.start));
      grid.append(button);
    });
    updateStats();
  }

  function buildPageList() {
    const list = $('#pageList');
    list.innerHTML = '';
    book.chapters.forEach(chapter => {
      const heading = document.createElement('div');
      heading.className = 'page-group-title';
      heading.textContent = `${chapter.title} — ${chapter.subtitle}`;
      list.append(heading);

      book.pages
        .filter(page => page.number >= chapter.start && page.number <= chapter.end)
        .forEach(page => {
          const button = document.createElement('button');
          button.type = 'button';
          const locked = isLockedInSample(page.number);
          button.className = `page-link${page.number === currentPage ? ' active' : ''}${state.completed[page.number] ? ' done' : ''}${locked ? ' sample-locked' : ''}`;
          button.innerHTML = `<span>${visibleIndex(page.number) + 1}</span><span>${page.title}</span>`;
          button.addEventListener('click', () => {
            if (locked) { feedback('Free sample: Unit 1, Lesson 1 only.', false); return; }
            openPage(page.number);
            $('#sidebar').classList.remove('open');
          });
          list.append(button);
        });
    });
  }

  function switchView(view) {
    currentView = view;
    $$('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === view));
    $('#interactiveView').classList.toggle('active', view === 'interactive');
    $('#sourceView').classList.toggle('active', view === 'source');
  }

  function updateCompleteBadge() {
    const completed = Boolean(state.completed[currentPage]);
    $('#completeBadge').textContent = completed ? 'Finished' : 'Not finished';
    $('#completeBadge').classList.toggle('done', completed);
  }

  function openPage(pageNumber) {
    const page = book.pages.find(p => p.number === Number(pageNumber));
    if (!page) return;
    if (isLockedInSample(page.number)) { feedback('Free sample: Unit 1, Lesson 1 only.', false); return; }

    currentPage = page.number;
    state.lastPage = page.number;
    state.portalLastActivity = {
      detail: `English Primary 2 Assessment Book · Page ${page.number}: ${page.title}`,
      path: `?page=${page.number}${sampleMode ? '&sample=1' : ''}`,
      courseTitle: 'English Primary 2 Assessment Book - First Term',
      unit: page.chapterTitle || 'Unit One',
      lesson: page.title,
    };
    save();

    const index = visibleIndex(page.number);
    showScreen('#reader');
    $('#readerChapter').textContent = page.chapterTitle;
    $('#readerPageTitle').textContent = page.title;
    $('#unitBadge').textContent = page.chapterTitle;
    $('#pageHeading').textContent = page.title;
    $('#pageNumber').textContent = index + 1;
    $('#pageTotal').textContent = book.pages.length;
    $('#printedPage').textContent = page.number;
    $('#sourceImage').src = page.image;
    $('#sourceImage').alt = `Original printed page ${page.number}: ${page.title}`;
    $('#pageProgressFill').style.width = `${((index + 1) / book.pages.length) * 100}%`;
    $('#pageProgressText').textContent = `Page ${index + 1} of ${book.pages.length}`;
    $('#prevBtn').disabled = index === 0;
    $('#nextBtn').disabled = index === book.pages.length - 1;

    renderActivities(page);
    updateCompleteBadge();
    buildPageList();
    updateStats();
    switchView('interactive');
  }

  function renderActivities(page) {
    const host = $('#activityHost');
    host.innerHTML = '';
    page.activities.forEach((activity, index) => {
      host.append(renderActivity(activity, index, page));
    });
  }

  function makeVisual(value, small = false, alt = '') {
    const visual = document.createElement('div');
    visual.className = `visual${small ? ' small' : ''}`;
    const asset = window.VISUAL_ASSETS?.[value];
    if (asset) {
      const img = document.createElement('img');
      img.className = 'visual-image';
      img.src = asset;
      img.alt = alt || '';
      if (!alt) img.setAttribute('aria-hidden', 'true');
      visual.append(img);
    } else {
      const fallback = document.createElement('span');
      fallback.className = 'visual-fallback';
      fallback.textContent = value || '❓';
      fallback.setAttribute('aria-hidden', 'true');
      visual.append(fallback);
    }
    return visual;
  }

  function appendActivityVisuals(card, activity) {
    if (!activity.visuals?.length) return;
    const gallery = document.createElement('div');
    gallery.className = 'support-visuals';
    activity.visuals.forEach((value, i) => gallery.append(makeVisual(value, false, `Supporting picture ${i + 1}`)));
    card.append(gallery);
  }

  function makeAnswerHint(text) {
    const hint = document.createElement('div');
    hint.className = 'correct-answer';
    hint.textContent = text;
    return hint;
  }

  function markInput(input, correct, correctText = '') {
    input.classList.remove('correct', 'wrong');
    input.classList.add(correct ? 'correct' : 'wrong');
    const hint = input.parentElement?.querySelector('.correct-answer') || input.nextElementSibling;
    if (hint && hint.classList.contains('correct-answer')) {
      hint.textContent = correct ? '' : `Correct answer: ${correctText}`;
      hint.classList.toggle('show-answer', !correct);
    }
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      feedback('Audio is not supported in this browser.', false);
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = 'en-US';
    utterance.rate = 0.72;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }

  function addCheckButton(card, key, checker) {
    const actions = document.createElement('div');
    actions.className = 'activity-actions';
    const score = document.createElement('span');
    score.className = 'activity-score';
    score.textContent = state.rewarded[key] ? 'Completed ✓' : '10 points available';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.textContent = '✓ Check Answers';
    button.addEventListener('click', () => {
      const result = checker();
      save();
      if (result.ok) {
        if (!state.rewarded[key]) {
          state.rewarded[key] = true;
          state.points += 10;
          score.textContent = 'Completed ✓';
          celebrate(18);
        }
        tone('success');
        feedback(`${result.message} Great work!`);
      } else {
        tone('error');
        feedback(`${result.message} Check the marked answers and try again.`, false);
      }
      save();
      updateStats();
    });
    actions.append(score, button);
    card.append(actions);
  }

  function renderActivity(activity, index, page) {
    const card = document.createElement('article');
    const meta = activityMeta[activity.type] || {icon:'🎯',label:'Activity',color:'#6d3be8'};
    card.className = `activity-card activity-${activity.type}`;
    card.style.setProperty('--activity-accent', meta.color);
    card.style.animationDelay = `${Math.min(index * .06, .3)}s`;
    card.innerHTML = `<span class="activity-type-tag"><span aria-hidden="true">${meta.icon}</span>${meta.label}</span><h2>${index + 1}. ${activity.title}</h2>`;
    if (activity.instruction) {
      const instruction = document.createElement('p');
      instruction.className = 'activity-instruction';
      instruction.textContent = activity.instruction;
      card.append(instruction);
    }
    if (activity.note) {
      const note = document.createElement('div');
      note.className = 'fill-note';
      note.textContent = activity.note;
      card.append(note);
    }
    appendActivityVisuals(card, activity);

    const key = activityKey(page.number, index);
    const saved = state.answers[key];

    switch (activity.type) {
      case 'lookWrite': renderLookWrite(card, activity, key, saved); break;
      case 'listenChoose': renderListenChoose(card, activity, key, saved); break;
      case 'listenMissing': renderListenMissing(card, activity, key, saved); break;
      case 'listenFill': renderListenFill(card, activity, key, saved); break;
      case 'fillBank': renderFillBank(card, activity, key, saved); break;
      case 'choose': renderChoose(card, activity, key, saved); break;
      case 'pictureChoice': renderPictureChoice(card, activity, key, saved); break;
      case 'reorder': renderReorder(card, activity, key, saved); break;
      case 'unscramble': renderUnscramble(card, activity, key, saved); break;
      case 'match': renderMatch(card, activity, key, saved); break;
      case 'count': renderCount(card, activity, key, saved); break;
      case 'writeSentence': renderWriteSentence(card, activity, key, saved); break;
      case 'draw': renderDraw(card, activity, key); break;
      case 'trueFalse': renderTrueFalse(card, activity, key, saved); break;
      case 'shortAnswer': renderShortAnswer(card, activity, key, saved); break;
      case 'punctuate': renderPunctuate(card, activity, key, saved); break;
      case 'freeWrite': renderFreeWrite(card, activity, key, saved); break;
      case 'classify': renderClassify(card, activity, key, saved); break;
      default:
        card.append(document.createTextNode('This activity type is not available.'));
    }
    return card;
  }

  function renderWordBank(card, words, className = '') {
    if (!words?.length) return null;
    const bank = document.createElement('div');
    bank.className = `word-bank ${className}`;
    words.forEach(word => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word-chip';
      chip.textContent = word;
      chip.addEventListener('click', () => speak(word));
      bank.append(chip);
    });
    card.append(bank);
    return bank;
  }

  function renderLookWrite(card, activity, key, saved) {
    renderWordBank(card, activity.wordBank);
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      box.append(makeVisual(item.visual));
      if (item.prompt) {
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = `${item.prompt} …`;
        box.append(prompt);
      }
      const label = document.createElement('label');
      label.textContent = 'Write your answer';
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.dataset.index = itemIndex;
      input.value = saved?.[itemIndex] || '';
      input.autocomplete = 'off';
      label.append(input, makeAnswerHint(''));
      box.append(label);
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const inputs = $$('.answer-input', card);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const item = activity.items[i];
        const ok = isAccepted(input.value, item.answer, item.accepted, true);
        values[i] = input.value;
        markInput(input, ok, Array.isArray(item.answer) ? item.answer[0] : item.answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderListenChoose(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      if (item.visual) box.append(makeVisual(item.visual));
      const row = document.createElement('div');
      row.className = 'listen-row';
      const question = document.createElement('strong');
      question.textContent = `Question ${itemIndex + 1}`;
      const listen = document.createElement('button');
      listen.type = 'button';
      listen.className = 'listen-btn';
      listen.textContent = '🔊 Listen';
      listen.addEventListener('click', () => { listen.classList.add('listening'); speak(item.audio || item.answer); setTimeout(() => listen.classList.remove('listening'), 1100); });
      row.append(question, listen);
      box.append(row);

      const zone = document.createElement('div');
      zone.className = 'choice-zone';
      item.options.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'choice-btn';
        button.textContent = option;
        if (saved?.[itemIndex] === option) button.classList.add('selected');
        button.addEventListener('click', () => {
          $$('.choice-btn', zone).forEach(b => b.classList.remove('selected'));
          button.classList.add('selected');
        });
        zone.append(button);
      });
      box.append(zone);
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const boxes = $$('.item-card', grid);
      let correct = 0;
      const values = [];
      boxes.forEach((box, i) => {
        const selected = $('.choice-btn.selected', box);
        const value = selected?.textContent || '';
        values[i] = value;
        $$('.choice-btn', box).forEach(button => {
          button.classList.remove('correct', 'wrong');
          if (normalize(button.textContent) === normalize(activity.items[i].answer)) button.classList.add('correct');
          else if (button === selected) button.classList.add('wrong');
        });
        if (normalize(value) === normalize(activity.items[i].answer)) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === boxes.length, message: `${correct} of ${boxes.length} correct.` };
    });
  }

  function renderListenMissing(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      if (item.visual) box.append(makeVisual(item.visual));
      const row = document.createElement('div');
      row.className = 'listen-row';
      const pattern = document.createElement('strong');
      pattern.textContent = item.pattern;
      const listen = document.createElement('button');
      listen.type = 'button';
      listen.className = 'listen-btn';
      listen.textContent = '🔊 Listen';
      listen.addEventListener('click', () => { listen.classList.add('listening'); speak(item.audio || item.answer); setTimeout(() => listen.classList.remove('listening'), 1100); });
      row.append(pattern, listen);
      box.append(row);
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.value = saved?.[itemIndex] || '';
      input.placeholder = 'Write the complete word';
      box.append(input, makeAnswerHint(''));
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const inputs = $$('.answer-input', grid);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const ok = isAccepted(input.value, activity.items[i].answer, activity.items[i].accepted, true);
        values[i] = input.value;
        markInput(input, ok, activity.items[i].answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderListenFill(card, activity, key, saved) {
    const helper = document.createElement('div');
    helper.className = 'fill-note';
    helper.textContent = 'Listen carefully, then type the missing word. No answer bank is shown because the printed exercise is a listening task.';
    card.append(helper);
    const list = document.createElement('div');
    list.className = 'listen-fill-list';
    activity.items.forEach((item, itemIndex) => {
      const row = document.createElement('div');
      row.className = 'listen-fill-row';
      const listen = document.createElement('button');
      listen.type = 'button';
      listen.className = 'listen-btn';
      listen.textContent = '🔊 Listen';
      listen.addEventListener('click', () => speak(item.audio || item.answer));
      const sentence = document.createElement('div');
      sentence.className = 'listen-fill-sentence';
      const parts = item.text.split('{0}');
      sentence.append(document.createTextNode(parts[0] || ''));
      const wrap = document.createElement('span');
      const input = document.createElement('input');
      input.className = 'answer-input listen-fill-input';
      input.value = saved?.[itemIndex] || '';
      input.placeholder = 'Type the word';
      wrap.append(input, makeAnswerHint(''));
      sentence.append(wrap, document.createTextNode(parts[1] || ''));
      row.append(listen, sentence);
      list.append(row);
    });
    card.append(list);
    addCheckButton(card, key, () => {
      const inputs = $$('.listen-fill-input', list);
      const values = [];
      let correct = 0;
      inputs.forEach((input, i) => {
        const item = activity.items[i];
        const ok = isAccepted(input.value, item.answer, item.accepted, true);
        values[i] = input.value;
        markInput(input, ok, item.answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderFillBank(card, activity, key, saved) {
    const openIndices = new Set(activity.openIndices || []);
    let selectedWord = '';
    const bank = document.createElement('div');
    bank.className = 'word-bank';
    (activity.wordBank || []).forEach(word => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word-chip';
      chip.textContent = word;
      chip.addEventListener('click', () => {
        $$('.word-chip', bank).forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedWord = word;
        const active = $('.fill-blank.active-target', card);
        if (active && !openIndices.has(Number(active.dataset.index))) active.value = word;
      });
      bank.append(chip);
    });
    if (bank.children.length) card.append(bank);

    const paragraph = document.createElement('p');
    paragraph.className = 'fill-text';
    const parts = activity.text.split(/\{(\d+)\}/g);
    parts.forEach((part, partIndex) => {
      if (partIndex % 2 === 0) {
        paragraph.append(document.createTextNode(part));
      } else {
        const blankIndex = Number(part);
        const wrapper = document.createElement('span');
        const input = document.createElement('input');
        input.className = 'answer-input fill-blank';
        input.dataset.index = blankIndex;
        input.value = saved?.[blankIndex] || '';
        input.placeholder = openIndices.has(blankIndex) ? 'Type here' : 'Tap here';
        input.addEventListener('focus', () => {
          $$('.fill-blank', card).forEach(b => b.classList.remove('active-target'));
          input.classList.add('active-target');
        });
        input.addEventListener('click', () => {
          if (selectedWord && !openIndices.has(blankIndex)) input.value = selectedWord;
        });
        wrapper.append(input, makeAnswerHint(''));
        paragraph.append(wrapper);
      }
    });
    card.append(paragraph);

    addCheckButton(card, key, () => {
      const inputs = $$('.fill-blank', paragraph).sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
      let correct = 0;
      const values = [];
      inputs.forEach(input => {
        const i = Number(input.dataset.index);
        const expected = activity.answers[i];
        const ok = openIndices.has(i)
          ? input.value.trim().length > 0
          : isAccepted(input.value, expected, null, true);
        values[i] = input.value;
        const correctText = Array.isArray(expected) ? expected[0] : expected;
        markInput(input, ok, correctText || 'Any sensible answer');
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderChoose(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      if (item.visual) box.append(makeVisual(item.visual, true));
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = item.prompt;
      box.append(prompt);
      const zone = document.createElement('div');
      zone.className = 'choice-zone';
      item.options.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'choice-btn';
        button.textContent = option;
        if (saved?.[itemIndex] === option) button.classList.add('selected');
        button.addEventListener('click', () => {
          $$('.choice-btn', zone).forEach(b => b.classList.remove('selected'));
          button.classList.add('selected');
        });
        zone.append(button);
      });
      box.append(zone);
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const boxes = $$('.item-card', grid);
      let correct = 0;
      const values = [];
      boxes.forEach((box, i) => {
        const selected = $('.choice-btn.selected', box);
        const value = selected?.textContent || '';
        values[i] = value;
        $$('.choice-btn', box).forEach(button => {
          button.classList.remove('correct', 'wrong');
          if (normalize(button.textContent) === normalize(activity.items[i].answer)) button.classList.add('correct');
          else if (button === selected) button.classList.add('wrong');
        });
        if (normalize(value) === normalize(activity.items[i].answer)) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === boxes.length, message: `${correct} of ${boxes.length} correct.` };
    });
  }

  function renderPictureChoice(card, activity, key, saved) {
    const helper = document.createElement('div');
    helper.className = 'fill-note';
    helper.textContent = 'Read each sentence, then tap the matching picture. The answer words are intentionally hidden.';
    card.append(helper);

    const grid = document.createElement('div');
    grid.className = 'activity-grid picture-choice-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card picture-choice-card';
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = item.prompt;
      box.append(prompt);

      const zone = document.createElement('div');
      zone.className = 'picture-choice-zone';
      item.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'picture-option';
        button.dataset.index = optionIndex;
        button.setAttribute('aria-label', `Picture option ${String.fromCharCode(65 + optionIndex)}`);
        const badge = document.createElement('span');
        badge.className = 'option-badge';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = String.fromCharCode(65 + optionIndex);
        const check = document.createElement('span');
        check.className = 'option-check';
        check.setAttribute('aria-hidden', 'true');
        check.textContent = '✓';
        button.append(badge, check, makeVisual(option.visual, false, `Picture option ${String.fromCharCode(65 + optionIndex)}`));
        if (Number(saved?.[itemIndex]) === optionIndex) button.classList.add('selected');
        button.addEventListener('click', () => {
          $$('.picture-option', zone).forEach(b => b.classList.remove('selected'));
          button.classList.add('selected');
        });
        zone.append(button);
      });
      box.append(zone);
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const boxes = $$('.picture-choice-card', grid);
      let correct = 0;
      const values = [];
      boxes.forEach((box, i) => {
        const selected = $('.picture-option.selected', box);
        const selectedIndex = selected ? Number(selected.dataset.index) : -1;
        values[i] = selectedIndex;
        $$('.picture-option', box).forEach(button => {
          button.classList.remove('correct', 'wrong');
          if (Number(button.dataset.index) === activity.items[i].answer) button.classList.add('correct');
          else if (button === selected) button.classList.add('wrong');
        });
        if (selectedIndex === activity.items[i].answer) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === boxes.length, message: `${correct} of ${boxes.length} correct.` };
    });
  }

  function renderReorder(card, activity, key, saved) {
    const rows = [];
    activity.items.forEach((item, itemIndex) => {
      const row = document.createElement('div');
      row.className = 'reorder-row';
      const source = document.createElement('div');
      source.className = 'tile-zone';
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.textContent = '→';
      const target = document.createElement('div');
      target.className = 'answer-zone';
      const tokens = item.words.map((word, tokenIndex) => ({ word, tokenIndex }));
      const savedWords = Array.isArray(saved?.[itemIndex]) ? [...saved[itemIndex]] : [];

      function addTile(token, zone) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tile';
        button.textContent = token.word;
        button.dataset.token = token.tokenIndex;
        button.addEventListener('click', () => {
          (button.parentElement === source ? target : source).append(button);
        });
        zone.append(button);
      }

      const remaining = [...tokens];
      savedWords.forEach(savedToken => {
        const index = remaining.findIndex(t => t.tokenIndex === savedToken);
        if (index >= 0) addTile(remaining.splice(index, 1)[0], target);
      });
      remaining.forEach(token => addTile(token, source));
      row.append(source, arrow, target);
      rows.push(row);
      card.append(row);
    });

    addCheckButton(card, key, () => {
      let correct = 0;
      const values = [];
      rows.forEach((row, i) => {
        const target = $('.answer-zone', row);
        const buttons = $$('.tile', target);
        const sentenceText = buttons.map(b => b.textContent).join(' ');
        const ok = isAccepted(sentenceText, activity.items[i].answer, activity.items[i].accepted, false);
        target.classList.remove('correct', 'wrong');
        target.classList.add(ok ? 'correct' : 'wrong');
        values[i] = buttons.map(b => Number(b.dataset.token));
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === rows.length, message: `${correct} of ${rows.length} sentences correct.` };
    });
  }

  function renderUnscramble(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      if (item.visual) box.append(makeVisual(item.visual));
      const letters = document.createElement('div');
      letters.className = 'letter-bank';
      [...item.letters].forEach(letter => {
        const tile = document.createElement('span');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        letters.append(tile);
      });
      box.append(letters);
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.value = saved?.[itemIndex] || '';
      input.placeholder = 'Write the word';
      box.append(input, makeAnswerHint(''));
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const inputs = $$('.answer-input', grid);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const ok = isAccepted(input.value, activity.items[i].answer, null, true);
        values[i] = input.value;
        markInput(input, ok, activity.items[i].answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderMatch(card, activity, key, saved) {
    const gallery = document.createElement('div');
    gallery.className = 'match-gallery';
    activity.right.forEach((right, rightIndex) => {
      const item = document.createElement('div');
      item.className = 'match-picture';
      const badge = document.createElement('span');
      badge.className = 'match-letter';
      badge.textContent = String.fromCharCode(65 + rightIndex);
      item.append(badge, makeVisual(right.visual || '❓', true, `Picture ${String.fromCharCode(65 + rightIndex)}`));
      gallery.append(item);
    });
    card.append(gallery);

    activity.left.forEach((leftText, itemIndex) => {
      const row = document.createElement('label');
      row.className = 'match-row';
      const text = document.createElement('span');
      text.textContent = leftText;
      const select = document.createElement('select');
      select.dataset.index = itemIndex;
      select.innerHTML = '<option value="">Choose picture…</option>';
      activity.right.forEach((right, rightIndex) => {
        const option = document.createElement('option');
        option.value = String(rightIndex);
        option.textContent = String.fromCharCode(65 + rightIndex);
        if (String(saved?.[itemIndex]) === String(rightIndex)) option.selected = true;
        select.append(option);
      });
      row.append(text, select, makeAnswerHint(''));
      card.append(row);
    });

    addCheckButton(card, key, () => {
      const selects = $$('select', card);
      let correct = 0;
      const values = [];
      selects.forEach((select, i) => {
        const value = select.value;
        values[i] = value;
        const ok = Number(value) === activity.answers[i];
        const letter = String.fromCharCode(65 + activity.answers[i]);
        markInput(select, ok, `Picture ${letter}`);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === selects.length, message: `${correct} of ${selects.length} matches correct.` };
    });
  }

  function renderCount(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      const visual = makeVisual(item.visual, false, `Objects to count for question ${itemIndex + 1}`);
      visual.classList.add('count-visual');
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = item.prompt;
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.inputMode = 'numeric';
      input.value = saved?.[itemIndex] || '';
      box.append(visual, prompt, input, makeAnswerHint(''));
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const inputs = $$('.answer-input', grid);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const ok = normalize(input.value) === normalize(activity.items[i].answer);
        values[i] = input.value;
        markInput(input, ok, activity.items[i].answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderWriteSentence(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      box.append(makeVisual(item.visual));
      if (item.prompt) {
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = item.prompt;
        box.append(prompt);
      }
      const input = document.createElement('textarea');
      input.className = 'answer-input';
      input.value = saved?.[itemIndex] || '';
      input.placeholder = 'Write a complete sentence';
      input.rows = 2;
      box.append(input, makeAnswerHint(''));
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const inputs = $$('textarea', grid);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const answers = activity.items[i].answers || activity.items[i].answer || [];
        const ok = isAccepted(input.value, answers, activity.items[i].accepted, false);
        values[i] = input.value;
        markInput(input, ok, Array.isArray(answers) ? answers[0] : answers);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} sentences correct.` };
    });
  }

  function renderDraw(card, activity, key) {
    const wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    const prompts = document.createElement('div');
    prompts.innerHTML = activity.prompts.map(prompt => `<p>• ${prompt}</p>`).join('');
    const toolbar = document.createElement('div');
    toolbar.className = 'canvas-toolbar';
    toolbar.innerHTML = `
      <label>Color <input type="color" value="#0759cf"></label>
      <label>Brush <input class="brush-size" type="range" min="2" max="18" value="6"></label>
      <button type="button" class="btn btn-secondary clear-canvas">Clear</button>
      <button type="button" class="btn btn-success save-drawing">Save Work</button>
    `;
    const canvas = document.createElement('canvas');
    canvas.className = 'drawing-canvas';
    canvas.width = 1200;
    canvas.height = 520;
    wrap.append(prompts, toolbar, canvas);
    card.append(wrap);
    setupCanvas(canvas, $('input[type=color]', toolbar), $('.brush-size', toolbar), $('.clear-canvas', toolbar));
    $('.save-drawing', toolbar).addEventListener('click', () => {
      if (!state.rewarded[key]) {
        state.rewarded[key] = true;
        state.points += 10;
      }
      state.answers[key] = 'drawing completed';
      save();
      updateStats();
      feedback('Drawing activity saved. Great work!');
    });
  }

  function setupCanvas(canvas, colorInput, brushInput, clearButton) {
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    let drawing = false;

    function point(event) {
      const rect = canvas.getBoundingClientRect();
      const source = event.touches?.[0] || event;
      return {
        x: (source.clientX - rect.left) * canvas.width / rect.width,
        y: (source.clientY - rect.top) * canvas.height / rect.height
      };
    }
    function start(event) {
      drawing = true;
      const p = point(event);
      context.beginPath();
      context.moveTo(p.x, p.y);
      event.preventDefault();
    }
    function move(event) {
      if (!drawing) return;
      const p = point(event);
      context.strokeStyle = colorInput.value;
      context.lineWidth = Number(brushInput.value);
      context.lineTo(p.x, p.y);
      context.stroke();
      event.preventDefault();
    }
    function stop() { drawing = false; }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseleave', stop);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', stop);
    clearButton.addEventListener('click', () => context.clearRect(0, 0, canvas.width, canvas.height));
  }

  function renderTrueFalse(card, activity, key, saved) {
    activity.items.forEach((item, itemIndex) => {
      const row = document.createElement('div');
      row.className = 'tf-row';
      const prompt = document.createElement('span');
      prompt.textContent = item.prompt;
      const zone = document.createElement('div');
      zone.className = 'choice-zone';
      [['True', true], ['False', false]].forEach(([label, value]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'choice-btn';
        button.textContent = label;
        button.dataset.value = String(value);
        if (String(saved?.[itemIndex]) === String(value)) button.classList.add('selected');
        button.addEventListener('click', () => {
          $$('.choice-btn', zone).forEach(b => b.classList.remove('selected'));
          button.classList.add('selected');
        });
        zone.append(button);
      });
      row.append(prompt, zone);
      card.append(row);
    });

    addCheckButton(card, key, () => {
      const rows = $$('.tf-row', card);
      let correct = 0;
      const values = [];
      rows.forEach((row, i) => {
        const selected = $('.choice-btn.selected', row);
        const value = selected ? selected.dataset.value === 'true' : null;
        values[i] = value;
        $$('.choice-btn', row).forEach(button => {
          button.classList.remove('correct', 'wrong');
          const buttonValue = button.dataset.value === 'true';
          if (buttonValue === activity.items[i].answer) button.classList.add('correct');
          else if (button === selected) button.classList.add('wrong');
        });
        if (value === activity.items[i].answer) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === rows.length, message: `${correct} of ${rows.length} correct.` };
    });
  }

  function renderShortAnswer(card, activity, key, saved) {
    const grid = document.createElement('div');
    grid.className = 'activity-grid';
    activity.items.forEach((item, itemIndex) => {
      const box = document.createElement('div');
      box.className = 'item-card';
      if (item.visual) box.append(makeVisual(item.visual));
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = item.prompt;
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.value = saved?.[itemIndex] || '';
      box.append(prompt, input, makeAnswerHint(''));
      grid.append(box);
    });
    card.append(grid);

    addCheckButton(card, key, () => {
      const inputs = $$('.answer-input', grid);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const item = activity.items[i];
        const ok = isAccepted(input.value, item.answer, item.accepted, true);
        values[i] = input.value;
        markInput(input, ok, item.accepted?.[0] || item.answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderPunctuate(card, activity, key, saved) {
    activity.items.forEach((item, itemIndex) => {
      const row = document.createElement('div');
      row.className = 'punct-row';
      const source = document.createElement('div');
      source.className = 'source-sentence';
      source.textContent = item.prompt;
      const wrapper = document.createElement('div');
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.value = saved?.[itemIndex] || '';
      wrapper.append(input, makeAnswerHint(''));
      row.append(source, wrapper);
      card.append(row);
    });

    addCheckButton(card, key, () => {
      const inputs = $$('.answer-input', card);
      let correct = 0;
      const values = [];
      inputs.forEach((input, i) => {
        const item = activity.items[i];
        const ok = isAccepted(input.value, item.answer, item.accepted, false);
        values[i] = input.value;
        markInput(input, ok, item.answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === inputs.length, message: `${correct} of ${inputs.length} correct.` };
    });
  }

  function renderFreeWrite(card, activity, key, saved) {
    renderWordBank(card, activity.wordBank);
    const wrap = document.createElement('div');
    wrap.className = 'free-prompts';
    activity.prompts.forEach((promptText, itemIndex) => {
      const item = document.createElement('label');
      item.className = 'free-item';
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = promptText;
      const textarea = document.createElement('textarea');
      textarea.value = saved?.[itemIndex] || '';
      textarea.placeholder = 'Write your answer here';
      item.append(prompt, textarea);
      wrap.append(item);
    });
    card.append(wrap);

    addCheckButton(card, key, () => {
      const inputs = $$('textarea', wrap);
      const values = inputs.map(input => input.value);
      const completed = inputs.filter(input => input.value.trim().length >= 2).length;
      inputs.forEach(input => {
        input.classList.remove('correct', 'wrong');
        input.classList.add(input.value.trim().length >= 2 ? 'correct' : 'wrong');
      });
      state.answers[key] = values;
      return { ok: completed === inputs.length, message: `${completed} of ${inputs.length} writing boxes completed.` };
    });
  }

  function renderClassify(card, activity, key, saved) {
    if (activity.groupVisuals?.length) {
      const groups = document.createElement('div');
      groups.className = 'classify-groups';
      activity.groups.forEach((group, i) => {
        const panel = document.createElement('div');
        panel.className = 'classify-group-card';
        const badge = document.createElement('span');
        badge.className = 'match-letter';
        badge.textContent = group.charAt(0).toUpperCase();
        const title = document.createElement('strong');
        title.textContent = group.replace(/^.[ —-]*/, '');
        panel.append(badge, makeVisual(activity.groupVisuals[i], false, group), title);
        groups.append(panel);
      });
      card.append(groups);
    }
    activity.items.forEach((item, itemIndex) => {
      const row = document.createElement('label');
      row.className = 'classify-row';
      const text = document.createElement('span');
      text.className = 'prompt';
      text.textContent = item.label;
      const select = document.createElement('select');
      select.innerHTML = '<option value="">Choose A or B…</option>';
      activity.groups.forEach(group => {
        const value = group.charAt(0).toUpperCase();
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (saved?.[itemIndex] === value) option.selected = true;
        select.append(option);
      });
      row.append(text, select, makeAnswerHint(''));
      card.append(row);
    });

    addCheckButton(card, key, () => {
      const selects = $$('select', card);
      let correct = 0;
      const values = [];
      selects.forEach((select, i) => {
        const ok = normalize(select.value) === normalize(activity.items[i].answer);
        values[i] = select.value;
        markInput(select, ok, activity.items[i].answer);
        if (ok) correct++;
      });
      state.answers[key] = values;
      return { ok: correct === selects.length, message: `${correct} of ${selects.length} correct.` };
    });
  }

  // Global controls
  $('#resumeBtn').addEventListener('click', () => openPage(state.lastPage));
  $('#startFirstBtn').addEventListener('click', () => openPage(book.pages[0].number));
  $('#backDashboard').addEventListener('click', () => { buildDashboard(); showScreen('#dashboard'); });
  $('#openSidebar').addEventListener('click', () => $('#sidebar').classList.add('open'));
  $('#closeSidebar').addEventListener('click', () => $('#sidebar').classList.remove('open'));
  $$('.tab').forEach(tab => tab.addEventListener('click', () => switchView(tab.dataset.view)));
  $('#prevBtn').addEventListener('click', () => {
    const index = visibleIndex(currentPage);
    if (index > 0) openPage(book.pages[index - 1].number);
  });
  $('#nextBtn').addEventListener('click', () => {
    const index = visibleIndex(currentPage);
    if (index < book.pages.length - 1) openPage(book.pages[index + 1].number);
  });
  $('#finishBtn').addEventListener('click', () => {
    if (!state.completed[currentPage]) {
      state.completed[currentPage] = true;
      state.points += 20;
      state.stars += 1;
      save();
      tone('complete');
      celebrate(52);
      feedback('Page finished! You earned 20 points and one star.');
    } else {
      tone('success');
      feedback('This page is already finished.');
    }
    updateCompleteBadge();
    buildPageList();
    updateStats();
  });

  $$('[data-sound-toggle]').forEach(button => button.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    save();
    updateSoundButtons();
    if (state.soundEnabled) tone('success');
  }));

  document.addEventListener('click', event => {
    const button = event.target.closest('.btn');
    if (!button || button.disabled) return;
    const rect = button.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    const size = Math.max(rect.width, rect.height);
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${event.clientX - rect.left - size / 2}px`;
    dot.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.append(dot);
    setTimeout(() => dot.remove(), 650);
  });

  window.Grade2AssessmentStore = {
    getState: () => state,
    replaceState: next => {
      if (!next) return;
      Object.assign(state, next, {
        completed: { ...(state.completed || {}), ...(next.completed || {}) },
        answers: { ...(state.answers || {}), ...(next.answers || {}) },
        rewarded: { ...(state.rewarded || {}), ...(next.rewarded || {}) },
      });
      state.lastPage = sampleMode ? SAMPLE_PAGE : (book.pages.some(p => p.number === Number(state.lastPage)) ? Number(state.lastPage) : SAMPLE_PAGE);
      currentPage = state.lastPage;
      save();
      buildDashboard();
    },
    mergeState: (local, remote) => ({
      ...local, ...remote,
      completed: { ...(local?.completed || {}), ...(remote?.completed || {}) },
      answers: { ...(local?.answers || {}), ...(remote?.answers || {}) },
      rewarded: { ...(local?.rewarded || {}), ...(remote?.rewarded || {}) },
    }),
  };

  void window.MrFaridCourseProgress?.connect({
    courseId: 'english-primary-2-assessment',
    getState: () => state,
    setState: next => window.Grade2AssessmentStore.replaceState(next),
    mergeState: (local, remote) => window.Grade2AssessmentStore.mergeState(local, remote),
    onReady: () => { buildDashboard(); updateStats(); },
    onStatus: ({ online, message }) => {
      document.body.dataset.progressSync = online ? 'connected' : 'connecting';
      const label = document.querySelector('[data-progress-status]');
      if (label) label.textContent = message;
    },
  });

  updateSoundButtons();
  const requestedPage = Number(new URLSearchParams(location.search).get('page'));
  if (requestedPage && book.pages.some(p => p.number === requestedPage) && !isLockedInSample(requestedPage)) {
    openPage(requestedPage);
  } else {
    buildDashboard();
    updateStats();
  }
})();
