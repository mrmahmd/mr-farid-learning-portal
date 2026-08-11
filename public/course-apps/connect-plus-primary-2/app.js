(() => {
  'use strict';

  const app = document.getElementById('app');
  const toastRoot = document.getElementById('toast-root');
  const STORAGE_BASE_KEY = 'connect-plus-2-progress-v1';
  let platformStudent = resolvePlatformStudent();
  let STORAGE_KEY = getStudentStorageKey(platformStudent.id);
  let platformAccess = { mode: 'full', sample: null };
  const CATEGORY_LABELS = {
    mcq: 'Choose',
    complete: 'Complete',
    truefalse: 'True / False',
    order: 'Order the Words',
    correct: 'Correct the Word',
    match: 'Match',
    listening: 'Listening',
    lookwrite: 'Look and Write',
    reading: 'Reading'
  };

  let route = { view: 'dashboard' };
  let lessonTab = 'learn';
  let autoTimer = null;
  let sidebarOpen = false;
  let selectedMatchMeaning = null;
  let progress = loadProgress();
  const questionCache = new Map();

  function cleanText(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function normalizeStudent(value) {
    if (!value) return { id: '', name: '' };
    if (typeof value === 'string') return { id: '', name: cleanText(value) };
    if (typeof value !== 'object') return { id: '', name: '' };

    const name = cleanText(
      value.name || value.studentName || value.fullName || value.full_name ||
      value.displayName || value.display_name || value.username
    );
    const id = cleanText(String(
      value.id || value.studentId || value.student_id || value.userId || value.user_id || ''
    ));
    return { id, name };
  }

  function resolvePlatformStudent() {
    const candidates = [];

    candidates.push(
      window.CONNECT_PLUS_STUDENT,
      window.PLATFORM_STUDENT,
      window.STUDENT_DATA,
      window.currentStudent
    );

    try {
      if (window.parent && window.parent !== window) {
        candidates.push(
          window.parent.CONNECT_PLUS_STUDENT,
          window.parent.PLATFORM_STUDENT,
          window.parent.STUDENT_DATA,
          window.parent.currentStudent
        );
      }
    } catch {
      // A cross-origin parent can still provide the data through postMessage.
    }

    const params = new URLSearchParams(window.location.search);
    const queryStudent = {
      id: params.get('studentId') || params.get('student_id') || params.get('userId') || params.get('user_id') || '',
      name: params.get('studentName') || params.get('student_name') || params.get('name') || ''
    };
    candidates.push(queryStudent);

    ['platform_student', 'currentStudent', 'studentData'].forEach(key => {
      try {
        const raw = localStorage.getItem(key);
        if (raw) candidates.push(JSON.parse(raw));
      } catch {
        // Ignore unrelated or malformed platform storage entries.
      }
    });

    for (const candidate of candidates) {
      const student = normalizeStudent(candidate);
      if (student.id || student.name) return student;
    }
    return { id: '', name: '' };
  }

  function getStudentStorageKey(studentId) {
    return studentId ? `${STORAGE_BASE_KEY}:${studentId}` : STORAGE_BASE_KEY;
  }

  function getStudentDisplayName() {
    return cleanText(platformStudent.name || progress.studentName);
  }

  function applyPlatformStudent(value) {
    const incoming = normalizeStudent(value);
    if (!incoming.id && !incoming.name) return;

    platformStudent = {
      id: incoming.id || platformStudent.id,
      name: incoming.name || platformStudent.name
    };

    const nextStorageKey = getStudentStorageKey(platformStudent.id);
    if (nextStorageKey !== STORAGE_KEY) {
      STORAGE_KEY = nextStorageKey;
      progress = loadProgress();
    }

    if (platformStudent.name) progress.studentName = platformStudent.name;
    saveProgress();
    render();
  }

  function defaultProgress() {
    return {
      studentName: platformStudent.name || '',
      points: 0,
      answers: {},
      completionBonus: {},
      soundOn: true,
      lastRoute: null,
      createdAt: new Date().toISOString()
    };
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const loaded = { ...defaultProgress(), ...(saved || {}), answers: saved?.answers || {}, completionBonus: saved?.completionBonus || {} };
      if (platformStudent.name) loaded.studentName = platformStudent.name;
      return loaded;
    } catch {
      return defaultProgress();
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.MrFaridCourseProgress?.queueSave();
  }

  function isSampleMode() {
    return platformAccess.mode === 'sample' || new URLSearchParams(window.location.search).get('sample') === '1';
  }

  function sampleAllows(next) {
    if (!isSampleMode()) return true;
    if (next.view === 'dashboard') return true;
    const firstUnit = COURSE_DATA.units[0];
    const firstLesson = firstUnit?.lessons?.[0];
    return next.unitId === firstUnit?.id && (!next.lessonId || next.lessonId === firstLesson?.id);
  }

  function mergeProgress(localState, remoteState) {
    if (!remoteState || typeof remoteState !== 'object') return localState;
    return {
      ...localState,
      ...remoteState,
      answers: { ...(localState.answers || {}), ...(remoteState.answers || {}) },
      completionBonus: { ...(localState.completionBonus || {}), ...(remoteState.completionBonus || {}) },
      points: Math.max(Number(localState.points || 0), Number(remoteState.points || 0)),
    };
  }

  function currentActivity() {
    const unit = COURSE_DATA.units.find(item => item.id === route.unitId);
    const lesson = unit?.lessons.find(item => item.id === route.lessonId);
    const detail = route.view === 'dashboard' ? 'Dashboard' : route.view === 'lesson' ? `${unit?.title || 'Unit'} / ${lesson?.title || 'Lesson'}` : route.view === 'unit' ? `Unit ${unit?.number || ''}` : route.view === 'bank' ? `Unit ${unit?.number || ''} Question Bank` : route.view;
    return { detail, path: { ...route }, title: 'Connect Plus Primary 2', unit: unit?.number || null, lesson: lesson?.title || null };
  }

  function emitPlatformEvent(type, payload = {}) {
    const detail = {
      type,
      course: 'connect-plus-2-first-term',
      student: { id: platformStudent.id || '', name: getStudentDisplayName() || '' },
      points: progress.points,
      timestamp: new Date().toISOString(),
      ...payload
    };
    try {
      window.dispatchEvent(new CustomEvent(type, { detail }));
    } catch { /* CustomEvent may be unavailable in a very old browser */ }
    try {
      if (window.parent && window.parent !== window) {
        const targetOrigin = window.CONNECT_PLUS_PARENT_ORIGIN || '*';
        window.parent.postMessage(detail, targetOrigin);
      }
    } catch { /* parent messaging is optional */ }
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function normalize(value = '') {
    return String(value)
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[.,!?;:]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seededShuffle(array, seedText) {
    const a = [...array];
    let seed = hashString(seedText || 'seed');
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function uniqueOptions(answer, pool, seed) {
    const cleanAnswer = String(answer);
    const alternatives = [...new Set(pool.map(String).filter(item => normalize(item) !== normalize(cleanAnswer)))];
    const options = [cleanAnswer, ...seededShuffle(alternatives, seed).slice(0, 3)];
    while (options.length < 4) options.push(['Not stated', 'Never', 'At school', 'None'][options.length - 1]);
    return seededShuffle(options, seed + '-options');
  }

  function blankWord(sentence, word) {
    const regex = new RegExp(escapeRegExp(word), 'i');
    if (regex.test(sentence)) return sentence.replace(regex, '_____');
    return `${sentence}  (${word}: _____)`;
  }

  function buildLessonQuestions(lesson) {
    if (questionCache.has(lesson.id)) return questionCache.get(lesson.id);
    const questions = [];
    const vocabWords = lesson.vocab.map(v => v.word);

    for (let i = 0; i < 6; i++) {
      const item = lesson.vocab[i % lesson.vocab.length];
      questions.push({
        id: `${lesson.id}-mcq-${i + 1}`,
        type: 'mcq', category: 'mcq',
        prompt: `Choose the best word: ${blankWord(item.example, item.word)}`,
        options: uniqueOptions(item.word, vocabWords, `${lesson.id}-mcq-${i}`),
        answer: item.word,
        image: item.image || '',
        explanation: item.meaning
      });
    }

    for (let i = 0; i < 4; i++) {
      const item = lesson.vocab[(i + 6) % lesson.vocab.length];
      questions.push({
        id: `${lesson.id}-complete-${i + 1}`,
        type: 'complete', category: 'complete',
        prompt: `Complete the sentence: ${blankWord(item.example, item.word)}`,
        answer: item.word,
        image: item.image || '',
        explanation: item.meaning
      });
    }

    for (let i = 0; i < 4; i++) {
      const fact = lesson.facts[i % lesson.facts.length];
      questions.push({
        id: `${lesson.id}-tf-${i + 1}`,
        type: 'truefalse', category: 'truefalse',
        prompt: fact.statement,
        options: ['True', 'False'],
        answer: fact.isTrue ? 'True' : 'False',
        explanation: fact.isTrue ? 'This statement is correct.' : fact.correction
      });
    }

    for (let i = 0; i < 4; i++) {
      const sentence = lesson.orders[i % lesson.orders.length];
      questions.push({
        id: `${lesson.id}-order-${i + 1}`,
        type: 'order', category: 'order',
        prompt: 'Put the words in the correct order.',
        words: seededShuffle(sentence.replace(/[?.!]/g, '').split(/\s+/), `${lesson.id}-order-${i}`),
        answer: sentence,
        explanation: sentence
      });
    }

    for (let i = 0; i < 4; i++) {
      const correction = lesson.corrections[i % lesson.corrections.length];
      questions.push({
        id: `${lesson.id}-correct-${i + 1}`,
        type: 'correct', category: 'correct',
        prompt: 'The red word is wrong. Write only the correct word.',
        sentence: correction.wrongSentence,
        wrongWord: correction.wrong,
        answer: correction.correct,
        explanation: `Correct sentence: ${replaceFirstInsensitive(correction.wrongSentence, correction.wrong, correction.correct)}`
      });
    }

    for (let group = 0; group < 2; group++) {
      const start = group * 4;
      const pairs = Array.from({ length: 4 }, (_, offset) => lesson.vocab[(start + offset) % lesson.vocab.length])
        .map(v => ({ word: v.word, meaning: v.meaning }));
      questions.push({
        id: `${lesson.id}-match-${group + 1}`,
        type: 'match', category: 'match',
        prompt: 'Match each word with its meaning.',
        pairs,
        answer: Object.fromEntries(pairs.map(p => [p.word, p.meaning])),
        explanation: 'Each word is matched with its simple meaning.'
      });
    }

    for (let i = 0; i < 2; i++) {
      const item = lesson.listening[i % lesson.listening.length];
      questions.push({
        id: `${lesson.id}-listening-${i + 1}`,
        type: 'listening', category: 'listening',
        prompt: item.prompt,
        text: item.text,
        audio: item.audio || '',
        options: item.options,
        answer: item.answer,
        explanation: item.text
      });
    }

    for (let i = 0; i < 2; i++) {
      const item = lesson.lookWrite[i % lesson.lookWrite.length];
      const visualMatch = lesson.vocab.find(v => normalize(v.word) === normalize(item.answer));
      questions.push({
        id: `${lesson.id}-look-${i + 1}`,
        type: 'lookwrite', category: 'lookwrite',
        prompt: item.prompt,
        emoji: item.emoji,
        image: visualMatch?.image || '',
        answer: item.answer,
        explanation: item.answer
      });
    }

    for (let i = 0; i < 2; i++) {
      const item = lesson.reading.questions[i % lesson.reading.questions.length];
      questions.push({
        id: `${lesson.id}-reading-${i + 1}`,
        type: 'reading', category: 'reading',
        prompt: item.prompt,
        passage: lesson.reading.text,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation || `The passage supports: ${item.answer}`
      });
    }

    questionCache.set(lesson.id, questions);
    return questions;
  }

  function replaceFirstInsensitive(sentence, search, replacement) {
    try {
      return sentence.replace(new RegExp(escapeRegExp(search), 'i'), replacement);
    } catch {
      return sentence;
    }
  }

  function makeSingleWordBlank(sentence, seedText) {
    const tokens = String(sentence).match(/[A-Za-zÀ-ÿ’'-]+|\d+(?::\d+)?|[^\s]/g) || [];
    const stop = new Set(['this','that','these','those','with','from','into','about','there','their','they','them','your','have','has','does','what','where','when','which','than','then','very','some','were','was','are','the','and','but','for','you','she','he','it','we','i','a','an','to','of','in','on','at','is','do','did','can']);
    const candidates = tokens.map((t, i) => ({ t, i })).filter(({ t }) => /^[A-Za-zÀ-ÿ’'-]{3,}$/.test(t) && !stop.has(normalize(t)));
    const choice = candidates.length ? candidates[hashString(seedText) % candidates.length] : tokens.map((t,i)=>({t,i})).find(({t})=>/^[A-Za-z]+$/.test(t));
    if (!choice) return { prompt: sentence + ' _____', answer: '' };
    let used = false;
    const prompt = tokens.map((t, i) => {
      if (!used && i === choice.i) { used = true; return '_____'; }
      return t;
    }).join(' ').replace(/\s+([?.!,;:])/g, '$1').replace(/([“‘])\s+/g, '$1').replace(/\s+([”’])/g, '$1');
    return { prompt, answer: choice.t };
  }

  function buildUnitBank(unit) {
    const key = `${unit.id}-bank`;
    if (questionCache.has(key)) return questionCache.get(key);
    const bank = [];
    const lessons = unit.lessons;
    const unitVocab = lessons.flatMap(l => l.vocab.map(v => v.word));

    // 10 new Choose questions: unused reading/look-and-write items plus true-statement challenges.
    lessons.forEach((lesson, li) => {
      const rq = lesson.reading.questions[2] || lesson.reading.questions[0];
      bank.push({
        id: `${key}-mcq-reading-${li + 1}`, type: 'mcq', category: 'mcq',
        prompt: `Review the lesson reading and choose the best answer: ${rq.prompt}`,
        options: rq.options, answer: rq.answer,
        explanation: rq.explanation || `The lesson reading supports: ${rq.answer}`
      });
      const lw = lesson.lookWrite[2] || lesson.lookWrite[0];
      bank.push({
        id: `${key}-mcq-look-${li + 1}`, type: 'mcq', category: 'mcq',
        prompt: `${lw.emoji || '👀'} ${lw.prompt} Choose the answer.`,
        options: uniqueOptions(lw.answer, unitVocab, `${key}-look-${li}`),
        answer: lw.answer, explanation: lw.answer
      });
    });
    const allFacts = lessons.flatMap(l => l.facts);
    const trueFacts = allFacts.filter(f => f.isTrue).map(f => f.statement);
    const falseFacts = allFacts.filter(f => !f.isTrue).map(f => f.statement);
    for (let i = 0; i < 4; i++) {
      const answer = trueFacts[i % trueFacts.length];
      bank.push({
        id: `${key}-mcq-true-${i + 1}`, type: 'mcq', category: 'mcq',
        prompt: 'Which statement is correct?',
        options: seededShuffle([answer, ...seededShuffle(falseFacts, `${key}-false-${i}`).slice(0, 3)], `${key}-truth-options-${i}`),
        answer, explanation: 'This statement matches the unit content.'
      });
    }

    // 8 Complete questions built from grammar models, not copied from lesson question prompts.
    const grammarModels = lessons.flatMap(l => l.grammar.rules.map(rule => ({ rule, title: l.grammar.title })));
    for (let i = 0; i < 8; i++) {
      const model = grammarModels[i % grammarModels.length];
      const blank = makeSingleWordBlank(model.rule, `${key}-complete-${i}`);
      bank.push({
        id: `${key}-complete-${i + 1}`, type: 'complete', category: 'complete',
        prompt: `Complete this ${model.title} model: ${blank.prompt}`,
        answer: blank.answer, explanation: model.rule
      });
    }

    // 6 unused True/False items: the final two fact checks from each lesson.
    lessons.forEach((lesson, li) => lesson.facts.slice(-2).forEach((fact, fi) => bank.push({
      id: `${key}-tf-${li + 1}-${fi + 1}`, type: 'truefalse', category: 'truefalse',
      prompt: fact.statement, options: ['True', 'False'], answer: fact.isTrue ? 'True' : 'False',
      explanation: fact.isTrue ? 'This statement is correct.' : fact.correction
    })));

    // 6 fresh ordering items: the final two sentence models from each lesson.
    lessons.forEach((lesson, li) => lesson.orders.slice(-2).forEach((sentence, oi) => bank.push({
      id: `${key}-order-${li + 1}-${oi + 1}`, type: 'order', category: 'order',
      prompt: 'Put the words in the correct order.',
      words: seededShuffle(sentence.replace(/[?.!]/g, '').split(/\s+/), `${key}-order-${li}-${oi}`),
      answer: sentence, explanation: sentence
    })));

    // 6 fresh correction items: the final two corrections from each lesson.
    lessons.forEach((lesson, li) => lesson.corrections.slice(-2).forEach((correction, ci) => bank.push({
      id: `${key}-correct-${li + 1}-${ci + 1}`, type: 'correct', category: 'correct',
      prompt: 'The red word is wrong. Write only the correct word.',
      sentence: correction.wrongSentence, wrongWord: correction.wrong,
      answer: correction.correct,
      explanation: `Correct sentence: ${replaceFirstInsensitive(correction.wrongSentence, correction.wrong, correction.correct)}`
    })));

    // 4 matching boards using non-repeating word groups across the whole unit.
    const vocabPairs = lessons.flatMap(l => l.vocab.map(v => ({ word: v.word, meaning: v.meaning })));
    for (let group = 0; group < 4; group++) {
      const pairs = Array.from({ length: 4 }, (_, offset) => vocabPairs[(group * 4 + offset + 8) % vocabPairs.length]);
      bank.push({
        id: `${key}-match-${group + 1}`, type: 'match', category: 'match',
        prompt: 'Match each word with its description.', pairs,
        answer: Object.fromEntries(pairs.map(p => [p.word, p.meaning])),
        explanation: 'Use the vocabulary in context to match each item.'
      });
    }

    // 4 listening questions. The third listening item in each lesson is reserved for the bank.
    lessons.forEach((lesson, li) => {
      const item = lesson.listening[2] || lesson.listening[lesson.listening.length - 1];
      bank.push({
        id: `${key}-listening-${li + 1}`, type: 'listening', category: 'listening',
        prompt: item.prompt, text: item.text, audio: item.audio || '', options: item.options,
        answer: item.answer, explanation: item.text
      });
    });
    const extraListen = unit.bankListening || lessons[0].listening[0];
    bank.push({
      id: `${key}-listening-4`, type: 'listening', category: 'listening',
      prompt: `Unit challenge: ${extraListen.prompt}`, text: extraListen.text, audio: extraListen.audio || '',
      options: seededShuffle(extraListen.options, `${key}-listen-extra`), answer: extraListen.answer, explanation: extraListen.text
    });

    // 3 new Look and Write prompts from vocabulary icons, one per lesson.
    lessons.forEach((lesson, li) => {
      const v = lesson.vocab[lesson.vocab.length - 1];
      bank.push({
        id: `${key}-lookwrite-${li + 1}`, type: 'lookwrite', category: 'lookwrite',
        prompt: 'Look at the clue and write the vocabulary word.', emoji: v.emoji,
        answer: v.word, explanation: v.example
      });
    });

    // 3 reading questions: the fourth reading question from each lesson is reserved for the bank.
    lessons.forEach((lesson, li) => {
      const rq = lesson.reading.questions[3] || lesson.reading.questions[lesson.reading.questions.length - 1];
      bank.push({
        id: `${key}-reading-${li + 1}`, type: 'reading', category: 'reading',
        prompt: rq.prompt, passage: lesson.reading.text, options: rq.options,
        answer: rq.answer, explanation: rq.explanation || `The passage supports: ${rq.answer}`
      });
    });

    if (bank.length !== 50) console.warn(`${key} should contain 50 questions but has ${bank.length}.`);
    questionCache.set(key, bank);
    return bank;
  }

  function buildMixedReview(id, units) {
    if (questionCache.has(id)) return questionCache.get(id);
    const all = units.flatMap(unit => unit.lessons.flatMap(buildLessonQuestions));
    const quotas = { mcq: 10, complete: 8, truefalse: 6, order: 6, correct: 6, match: 4, listening: 4, lookwrite: 3, reading: 3 };
    const review = [];
    Object.entries(quotas).forEach(([category, count]) => {
      seededShuffle(all.filter(q => q.category === category), `${id}-${category}`).slice(0, count).forEach((q, index) => {
        review.push({ ...q, id: `${id}-${category}-${index + 1}`, sourceId: q.id });
      });
    });
    questionCache.set(id, review);
    return review;
  }

  function getAllCoreQuestions() {
    return COURSE_DATA.units.flatMap(unit => [
      ...unit.lessons.flatMap(buildLessonQuestions),
      ...buildUnitBank(unit)
    ]);
  }

  function answeredCount(questions) {
    return questions.filter(q => progress.answers[q.id]).length;
  }

  function correctCount(questions) {
    return questions.filter(q => progress.answers[q.id]?.correct).length;
  }

  function isContentComplete(contentId, questions) {
    return questions.length > 0 && answeredCount(questions) === questions.length;
  }

  function contentScore(questions) {
    if (!questions.length) return 0;
    return Math.round((correctCount(questions) / questions.length) * 100);
  }

  function unitIndexById(id) {
    return COURSE_DATA.units.findIndex(unit => unit.id === id);
  }

  function isUnitUnlocked(index) {
    if (index <= 0) return true;
    const previous = COURSE_DATA.units[index - 1];
    return isContentComplete(`${previous.id}-bank`, buildUnitBank(previous));
  }

  function isLessonUnlocked(unit, lessonIndex) {
    const unitIndex = unitIndexById(unit.id);
    if (!isUnitUnlocked(unitIndex)) return false;
    if (lessonIndex === 0) return true;
    const previousLesson = unit.lessons[lessonIndex - 1];
    return isContentComplete(previousLesson.id, buildLessonQuestions(previousLesson));
  }

  function isBankUnlocked(unit) {
    return unit.lessons.every(lesson => isContentComplete(lesson.id, buildLessonQuestions(lesson)));
  }

  function getCoreStats() {
    const all = getAllCoreQuestions();
    const answered = answeredCount(all);
    return {
      total: all.length,
      answered,
      correct: correctCount(all),
      percent: all.length ? Math.round((answered / all.length) * 100) : 0
    };
  }

  function firstIncompleteRoute() {
    const warmup = COURSE_DATA.bonus.warmup;
    if (warmup) {
      const warmupQuestions = buildLessonQuestions(warmup);
      if (!isContentComplete(warmup.id, warmupQuestions)) {
        return { view: 'bonusLesson', lessonId: warmup.id, parent: 'warmup', tab: 'practice', qIndex: Math.max(0, warmupQuestions.findIndex(q => !progress.answers[q.id])) };
      }
    }
    for (let ui = 0; ui < COURSE_DATA.units.length; ui++) {
      const unit = COURSE_DATA.units[ui];
      if (!isUnitUnlocked(ui)) break;
      for (let li = 0; li < unit.lessons.length; li++) {
        if (!isLessonUnlocked(unit, li)) break;
        const questions = buildLessonQuestions(unit.lessons[li]);
        if (!isContentComplete(unit.lessons[li].id, questions)) {
          return { view: 'lesson', unitId: unit.id, lessonId: unit.lessons[li].id, tab: 'practice', qIndex: Math.max(0, questions.findIndex(q => !progress.answers[q.id])) };
        }
      }
      if (isBankUnlocked(unit) && !isContentComplete(`${unit.id}-bank`, buildUnitBank(unit))) {
        const questions = buildUnitBank(unit);
        return { view: 'bank', unitId: unit.id, qIndex: Math.max(0, questions.findIndex(q => !progress.answers[q.id])) };
      }
    }
    return { view: 'dashboard' };
  }

  function setRoute(next, remember = true) {
    if (autoTimer) clearTimeout(autoTimer);
    if (!sampleAllows(next)) {
      toast('This lesson is available in the free sample. Subscribe to unlock the full course.', 'error');
      return;
    }
    route = { ...next };
    lessonTab = next.tab || lessonTab;
    selectedMatchMeaning = null;
    sidebarOpen = false;
    if (remember && next.view !== 'dashboard') {
      progress.lastRoute = { ...next };
      progress.portalLastActivity = currentActivity();
      saveProgress();
    }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function render() {
    if (autoTimer) clearTimeout(autoTimer);
    app.innerHTML = shellHTML(renderView());
    bindShellEvents();
    bindViewEvents();
  }


  function shellHTML(content) {
    const stats = getCoreStats();
    return `
      <div class="app-shell">
        <aside class="sidebar ${sidebarOpen ? 'open' : ''}" id="sidebar">
          <div class="side-brand">
            <div class="logo-mark">CP2</div>
            <div><h2>Connect Plus 2</h2><p>Primary 2 · First Term</p></div>
          </div>
          <nav class="side-nav">
            <button class="nav-btn ${route.view === 'dashboard' ? 'active' : ''}" data-route="dashboard"><span class="icon">🏠</span>Dashboard</button>
            ${COURSE_DATA.units.map((unit, index) => {
              const unlocked = !isSampleMode() && isUnitUnlocked(index) || (isSampleMode() && index === 0);
              return `<button class="nav-btn ${route.unitId === unit.id ? 'active' : ''}" data-unit="${unit.id}" ${unlocked ? '' : 'disabled'}>
                <span class="icon">${['🚀','🏃','💼','🪐','🚢','🏛️'][index]}</span>
                Unit ${unit.number}
                ${unlocked ? '' : '<span class="lock">🔒</span>'}
              </button>`;
            }).join('')}
            <button class="nav-btn ${route.view === 'reader' ? 'active' : ''}" data-reader="animals"><span class="icon">🦎</span>Animals Reader ${isReaderUnlocked() ? '' : '<span class="lock">🔒</span>'}</button>
            <button class="nav-btn ${route.view === 'story' ? 'active' : ''}" data-story="gingerbread"><span class="icon">🍪</span>Gingerbread Story ${isStoryUnlocked() ? '' : '<span class="lock">🔒</span>'}</button>
          </nav>
          <div class="side-progress">
            <div class="side-progress-row"><span>Course progress</span><strong>${stats.percent}%</strong></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${stats.percent}%"></div></div>
          </div>
        </aside>
        <div class="main-wrap">
          <header class="topbar">
            <div class="topbar-left">
              <button class="menu-toggle" id="menu-toggle" aria-label="Open menu">☰</button>
              <div class="crumb">${breadcrumbHTML()}</div>
            </div>
             <div class="top-actions">
               <button class="return-platform-btn" id="return-platform" type="button">↩ Return to platform</button>
              <span class="stat-chip">⭐ ${progress.points} points</span>
              <span class="stat-chip">✅ ${stats.answered} solved</span>
              <button class="icon-btn" id="sound-toggle" title="Sound">${progress.soundOn ? '🔊' : '🔇'}</button>
              <button class="icon-btn" id="teacher-btn" title="Meet your teacher">👨‍🏫</button>
            </div>
          </header>
          <main class="content">${content}</main>
        </div>
      </div>`;
  }

  function breadcrumbHTML() {
    if (route.view === 'dashboard') return `<strong>Dashboard</strong>`;
    const unit = COURSE_DATA.units.find(u => u.id === route.unitId);
    if (route.view === 'unit') return `Dashboard / <strong>Unit ${unit?.number || ''}</strong>`;
    if (route.view === 'lesson') {
      const lesson = unit?.lessons.find(l => l.id === route.lessonId);
      return `Unit ${unit?.number || ''} / <strong>${escapeHTML(lesson?.title || '')}</strong>`;
    }
    if (route.view === 'bank') return `Unit ${unit?.number || ''} / <strong>Question Bank</strong>`;
    if (route.view === 'review') return `<strong>${route.reviewId === 'review1' ? 'Review 1' : 'Review 2'}</strong>`;
    if (route.view === 'reader') return `<strong>Animals in the Wild</strong>`;
    if (route.view === 'story') return `<strong>The Gingerbread Man</strong>`;
    if (route.view === 'bonusLesson') return `<strong>${escapeHTML(findBonusLesson(route.lessonId)?.title || 'Bonus lesson')}</strong>`;
    return '<strong>Connect Plus 2</strong>';
  }

  function renderView() {
    switch (route.view) {
      case 'unit': return renderUnit(route.unitId);
      case 'lesson': return renderLesson(route.unitId, route.lessonId);
      case 'bank': return renderBank(route.unitId);
      case 'review': return renderReview(route.reviewId);
      case 'reader': return renderReaderLanding();
      case 'story': return renderStoryLanding();
      case 'bonusLesson': return renderBonusLesson(route.lessonId, route.parent);
      default: return renderDashboard();
    }
  }

  function renderDashboard() {
    const stats = getCoreStats();
    const continueRoute = progress.lastRoute || firstIncompleteRoute();
    const completedUnits = COURSE_DATA.units.filter(unit => isContentComplete(`${unit.id}-bank`, buildUnitBank(unit))).length;
    const studentName = getStudentDisplayName();
    return `
      <section class="hero">
        <div class="hero-copy">
          <div class="eyebrow">${studentName ? 'Welcome back' : 'Welcome to your course'}</div>
          <h1>${studentName ? `Hello, ${escapeHTML(studentName)}!` : 'Welcome back!'} 👋</h1>
          <p>Learn step by step, practise every skill and finish each unit question bank to unlock the next adventure.</p>
          <div class="hero-actions">
            <button class="primary-btn" data-continue='${encodeURIComponent(JSON.stringify(continueRoute))}'>▶ Continue Learning</button>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">${stats.percent}%</div><div class="label">Course progress</div></div>
          <div class="hero-stat"><div class="num">${progress.points}</div><div class="label">Total points</div></div>
          <div class="hero-stat"><div class="num">${completedUnits}/6</div><div class="label">Units finished</div></div>
          <div class="hero-stat"><div class="num">${stats.correct}</div><div class="label">Correct answers</div></div>
        </div>
      </section>

      <div class="section-head"><div><h2>Your Units</h2><p>Complete lessons in order. Each lesson has 30 grouped questions.</p></div></div>
      <section class="unit-grid">
        ${COURSE_DATA.units.map((unit, index) => renderUnitCard(unit, index)).join('')}
      </section>

      <div class="section-head"><div><h2>Reviews and Readers</h2><p>Special practice from the uploaded curriculum.</p></div></div>
      <section class="bonus-grid">
        ${renderSpecialCard("Let's Remember", 'Warm-up review from the opening pages · 30 questions', 'assets/lesson-media-new/warmup.jpg', true, "data-bonus-lesson='warmup' data-parent='warmup'", true)}
        ${renderSpecialCard('Review 1', 'Units 1–3 · 50 mixed questions', 'assets/lesson-media-new/review1.jpg', isReviewUnlocked('review1'), "data-review='review1'", true)}
        ${renderSpecialCard('Animals in the Wild', 'Non-fiction reader · camouflage and animal adaptations', 'assets/lesson-media-new/animals-reader.jpg', isReaderUnlocked(), "data-reader='animals'", true)}
        ${renderSpecialCard('Review 2', 'Units 4–6 · 50 mixed questions', 'assets/lesson-media-new/review2.jpg', isReviewUnlocked('review2'), "data-review='review2'", true)}
        ${renderSpecialCard('The Gingerbread Man', 'Three interactive story lessons with reading and sequence', 'assets/lesson-media-new/story-cover.jpg', isStoryUnlocked(), "data-story='gingerbread'", true)}
      </section>`;
  }

  function renderUnitCard(unit, index) {
    const unlocked = !isSampleMode() && isUnitUnlocked(index) || (isSampleMode() && index === 0);
    const bank = buildUnitBank(unit);
    const complete = isContentComplete(`${unit.id}-bank`, bank);
    const lessonQuestions = unit.lessons.flatMap(buildLessonQuestions);
    const unitQuestions = [...lessonQuestions, ...bank];
    const percent = Math.round((answeredCount(unitQuestions) / unitQuestions.length) * 100);
    const status = complete ? ['Finished', 'done'] : unlocked ? ['Open', 'open'] : ['Locked', 'locked'];
    return `
      <article class="unit-card ${unlocked ? '' : 'locked'}">
        <div class="unit-art"><img src="${unit.art}" alt="Unit ${unit.number} illustration"></div>
        <div class="unit-body">
          <div class="unit-meta"><span class="unit-number">Unit ${unit.number} · ${escapeHTML(unit.theme)}</span><span class="status-pill ${status[1]}">${status[0]}</span></div>
          <h3>${escapeHTML(unit.title)}</h3>
          <p>${unit.lessons.length} detailed lessons + 50-question bank</p>
          <div class="unit-progress-row"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><span>${percent}%</span></div>
          <button class="primary-btn unit-open-btn" data-unit="${unit.id}" ${unlocked ? '' : 'disabled'}>${complete ? 'Review Unit' : unlocked ? 'Open Unit' : '🔒 Finish the previous bank'}</button>
        </div>
      </article>`;
  }

  function renderSpecialCard(title, description, visual, unlocked, dataAttr, isImage = false) {
    return `
      <article class="bonus-card ${unlocked ? '' : 'locked'}">
        ${isImage ? `<img src="${escapeHTML(visual)}" alt="${escapeHTML(title)}">` : `<div style="height:110px;border-radius:18px;background:linear-gradient(135deg,#eeeaff,#e7f9f4);display:grid;place-items:center;font-size:4.2rem">${visual}</div>`}
        <div><h3>${title}</h3><p>${description}</p><button class="${unlocked ? 'secondary-btn' : 'ghost-btn'}" ${dataAttr} ${unlocked ? '' : 'disabled'}>${unlocked ? 'Open' : '🔒 Locked'}</button></div>
      </article>`;
  }

  function renderUnit(unitId) {
    const unit = COURSE_DATA.units.find(u => u.id === unitId);
    if (!unit) return renderDashboard();
    const bankQuestions = buildUnitBank(unit);
    return `
      <section class="unit-header">
        <img src="${unit.art}" alt="${escapeHTML(unit.title)}">
        <div>
          <div class="tag">Theme: ${escapeHTML(unit.theme)} · ${escapeHTML(unit.sourcePages)}</div>
          <h1>Unit ${unit.number}: ${escapeHTML(unit.title)}</h1>
          <p>Study every lesson, complete all 30 questions, then finish the 50-question unit bank to unlock the next unit.</p>
          <div class="unit-header-actions"><button class="ghost-btn" data-route="dashboard">← Dashboard</button></div>
        </div>
      </section>
      <section class="lesson-list">
        ${unit.lessons.map((lesson, index) => renderLessonRow(unit, lesson, index)).join('')}
        ${renderBankRow(unit, bankQuestions)}
      </section>`;
  }

  function renderLessonRow(unit, lesson, index) {
    const questions = buildLessonQuestions(lesson);
    const unlocked = isSampleMode() ? unit.id === COURSE_DATA.units[0]?.id && index === 0 : isLessonUnlocked(unit, index);
    const complete = isContentComplete(lesson.id, questions);
    const percent = Math.round((answeredCount(questions) / questions.length) * 100);
    return `
      <article class="lesson-row ${unlocked ? '' : 'locked'}">
        <div class="lesson-icon">${lesson.icon}</div>
        <div><h3>Lesson ${index + 1}: ${escapeHTML(lesson.title)}</h3><p>${escapeHTML(lesson.kicker)} · 30 questions</p></div>
        <div class="lesson-right">
          <div><div class="lesson-score">${complete ? `Finished · ${contentScore(questions)}%` : `${answeredCount(questions)}/30 solved`}</div><div class="tiny-progress"><span style="width:${percent}%"></span></div></div>
          <button class="${complete ? 'secondary-btn' : 'primary-btn'}" data-lesson="${lesson.id}" data-unit-id="${unit.id}" ${unlocked ? '' : 'disabled'}>${unlocked ? (complete ? 'Review' : 'Open') : '🔒'}</button>
        </div>
      </article>`;
  }

  function renderBankRow(unit, questions) {
    const unlocked = !isSampleMode() && isBankUnlocked(unit);
    const complete = isContentComplete(`${unit.id}-bank`, questions);
    const percent = Math.round((answeredCount(questions) / questions.length) * 100);
    return `
      <article class="lesson-row ${unlocked ? '' : 'locked'}">
        <div class="lesson-icon">🏆</div>
        <div><h3>Unit ${unit.number} Question Bank</h3><p>50 grouped questions covering all unit skills</p></div>
        <div class="lesson-right">
          <div><div class="lesson-score">${complete ? `Finished · ${contentScore(questions)}%` : `${answeredCount(questions)}/50 solved`}</div><div class="tiny-progress"><span style="width:${percent}%"></span></div></div>
          <button class="${complete ? 'secondary-btn' : 'primary-btn'}" data-bank="${unit.id}" ${unlocked ? '' : 'disabled'}>${unlocked ? (complete ? 'Review Bank' : 'Start Bank') : '🔒'}</button>
        </div>
      </article>`;
  }

  function renderLesson(unitId, lessonId) {
    const unit = COURSE_DATA.units.find(u => u.id === unitId);
    const lesson = unit?.lessons.find(l => l.id === lessonId);
    if (!lesson) return renderDashboard();
    const questions = buildLessonQuestions(lesson);
    const tab = route.tab || lessonTab || 'learn';
    lessonTab = tab;
    return `
      ${lessonHeroHTML(lesson, tab, unitId)}
      ${tab === 'learn' ? renderLearnContent(lesson, unitId) : renderPractice(questions, lesson.id, { view: 'lesson', unitId, lessonId, tab: 'practice' })}`;
  }

  function lessonHeroHTML(lesson, tab, unitId = '') {
    return `
      <section class="lesson-hero ${lesson.art ? 'has-art' : ''}">
        ${lesson.art ? `<img class="lesson-hero-art" src="${escapeHTML(lesson.art)}" alt="${escapeHTML(lesson.title)}"><div class="lesson-hero-overlay"></div>` : ''}
        <div class="lesson-hero-main">
          <div class="lesson-hero-icon">${lesson.icon}</div>
          <div><div class="kicker">${escapeHTML(lesson.kicker)} · ${escapeHTML(lesson.pages)}</div><h1>${escapeHTML(lesson.title)}</h1><p>Detailed explanation + 30 curriculum-based questions</p></div>
        </div>
        <div class="lesson-tabs">
          ${lesson.objectives ? `<button class="lesson-tab ${tab === 'learn' ? 'active' : ''}" data-tab="learn" data-unit-id="${unitId}" data-lesson-id="${lesson.id}">📖 Learn</button><button class="lesson-tab ${tab === 'practice' ? 'active' : ''}" data-tab="practice" data-unit-id="${unitId}" data-lesson-id="${lesson.id}">🎯 Practice</button>` : `<span class="lesson-tab active">🎯 Practice</span>`}
        </div>
      </section>`;
  }

  function renderLearnContent(lesson, unitId) {
    return `
      <div class="learn-grid">
        <div class="learn-main">
          <section class="study-card">
            <h2>Learning Goals</h2>
            <ul class="objective-list">${lesson.objectives.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
          </section>
          <section class="study-card">
            <h2>Vocabulary</h2>
            <div class="vocab-grid">${lesson.vocab.map(v => `
              <article class="vocab-card ${v.image ? 'with-image' : ''}">
                ${v.image ? `<img class="vocab-image" src="${escapeHTML(v.image)}" alt="${escapeHTML(v.word)}" loading="lazy">` : `<div class="vocab-emoji">${v.emoji}</div>`}
                <div class="vocab-copy"><div class="vocab-word">${escapeHTML(v.word)}</div><div class="vocab-meaning">${escapeHTML(v.meaning)}</div></div>
                <button class="speak-mini" data-speak="${escapeHTML(v.word)}" aria-label="Listen to ${escapeHTML(v.word)}">🔊</button>
                <div class="vocab-example">${escapeHTML(v.example)}</div>
              </article>`).join('')}</div>
          </section>
          <section class="study-card">
            <h2>${escapeHTML(lesson.grammar.title)}</h2>
            <p>${escapeHTML(lesson.grammar.overview)}</p>
            <div class="rule-box"><strong>Study these models:</strong><ul class="rule-list">${lesson.grammar.rules.map(rule => `<li>${escapeHTML(rule)}</li>`).join('')}</ul></div>
            <ul class="notes">${lesson.grammar.notes.map(note => `<li>${escapeHTML(note)}</li>`).join('')}</ul>
          </section>
          ${lesson.phonics ? `<section class="study-card"><h2>Phonics: ${escapeHTML(lesson.phonics.title)}</h2><p>${escapeHTML(lesson.phonics.explanation)}</p><div class="rule-box"><ul class="rule-list">${lesson.phonics.examples.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div></section>` : ''}
          <section class="study-card reading-study">
            <div class="study-head-row"><h2>${escapeHTML(lesson.reading.title)}</h2>${lesson.readingAudio ? `<button class="audio-pill" data-audio="${escapeHTML(lesson.readingAudio)}">▶ Listen to the reading</button>` : ''}</div>
            <div class="reading-passage">${escapeHTML(lesson.reading.text)}</div>
          </section>
          ${lesson.clil ? `<section class="study-card"><h2>CLIL: ${escapeHTML(lesson.clil.title)}</h2><div class="info-banner">${escapeHTML(lesson.clil.text)}</div></section>` : ''}
          ${lesson.lifeSkills ? `<section class="study-card"><h2>Life Skills: ${escapeHTML(lesson.lifeSkills.title)}</h2><div class="info-banner">${escapeHTML(lesson.lifeSkills.text)}</div></section>` : ''}
        </div>
        <aside class="side-study">
          <section class="start-practice-card"><h3>Ready to practise?</h3><p>Questions are grouped: Choose, Complete, True/False, Ordering, Correction, Matching, Listening, Look and Write, and Reading.</p><button class="primary-btn" data-start-practice="${lesson.id}" data-unit-id="${unitId}">Start 30 Questions →</button></section>
          <section class="study-card"><h3>Smart Study Tip</h3><p>Read the example aloud, cover it, then say it again from memory. This builds vocabulary and grammar together.</p></section>
        </aside>
      </div>`;
  }

  function renderPractice(questions, contentId, baseRoute) {
    let qIndex = Number.isInteger(route.qIndex) ? route.qIndex : Math.max(0, questions.findIndex(q => !progress.answers[q.id]));
    if (qIndex < 0 || qIndex >= questions.length) qIndex = 0;
    route.qIndex = qIndex;
    const question = questions[qIndex];
    const categories = [...new Set(questions.map(q => q.category))];
    const complete = isContentComplete(contentId, questions);
    if (complete && route.showCompletion) return renderCompletion(contentId, questions, baseRoute);
    return `
      <div class="practice-layout">
        <aside class="practice-nav"><h3>Question Types</h3>${categories.map(cat => {
          const catQuestions = questions.filter(q => q.category === cat);
          const catAnswered = answeredCount(catQuestions);
          return `<button class="category-btn ${question.category === cat ? 'active' : ''}" data-category="${cat}" data-content-id="${contentId}">${CATEGORY_LABELS[cat]} <span class="category-count">${catAnswered}/${catQuestions.length}</span></button>`;
        }).join('')}</aside>
        <section class="question-stage">
          <div class="question-top">
            <div class="question-top-left"><span class="q-category">${CATEGORY_LABELS[question.category]}</span><span class="q-number">Question ${qIndex + 1} of ${questions.length}</span></div>
            <div style="min-width:160px"><div class="progress-bar" style="margin:0"><div class="progress-fill" style="width:${Math.round((answeredCount(questions)/questions.length)*100)}%"></div></div></div>
          </div>
          <article class="question-card" data-question-id="${question.id}">
            ${renderQuestionBody(question)}
          </article>
          <div class="question-footer">
            <button class="ghost-btn" data-prev-question ${qIndex === 0 ? 'disabled' : ''}>← Previous</button>
            <div class="question-dots">${questions.map((q, i) => `<span class="q-dot ${i === qIndex ? 'current' : ''} ${progress.answers[q.id] ? 'done' : ''}"></span>`).join('')}</div>
            <button class="ghost-btn" data-next-question ${qIndex === questions.length - 1 ? 'disabled' : ''}>Next →</button>
          </div>
          ${complete ? `<div style="margin-top:14px;text-align:center"><button class="secondary-btn" data-show-completion="${contentId}">🏆 View Completion</button></div>` : ''}
        </section>
      </div>`;
  }

  function renderQuestionBody(question) {
    const record = progress.answers[question.id];
    if (record) return renderAnsweredQuestion(question, record);

    switch (question.type) {
      case 'mcq':
      case 'reading':
      case 'listening': {
        const preface = question.type === 'reading' ? `<div class="reading-box">${escapeHTML(question.passage)}</div>` : question.type === 'listening' ? `<div class="listen-box"><button class="play-audio" ${question.audio ? `data-audio="${escapeHTML(question.audio)}"` : `data-listen="${escapeHTML(question.text)}"`}>▶</button><p>Press play, listen carefully, then choose the answer.</p></div>` : '';
        const visual = question.image ? `<img class="question-visual" src="${escapeHTML(question.image)}" alt="Picture clue">` : '';
        return `${preface}${visual}<h2>${escapeHTML(question.prompt)}</h2><div class="options">${question.options.map((option, index) => `<button class="option-btn" data-answer="${escapeHTML(option)}"><span class="letter">${String.fromCharCode(65 + index)}</span>${escapeHTML(option)}</button>`).join('')}</div>`;
      }
      case 'complete':
        return `${question.image ? `<img class="question-visual" src="${escapeHTML(question.image)}" alt="Picture clue">` : ''}<h2>${escapeHTML(question.prompt)}</h2><p class="question-instruction">Write the missing word or phrase.</p><form class="answer-row" data-text-form><input class="answer-input" name="answer" autocomplete="off" placeholder="Type your answer"><button class="primary-btn" type="submit">Check</button></form>`;
      case 'lookwrite':
        return `${question.image ? `<img class="question-visual large" src="${escapeHTML(question.image)}" alt="Picture clue">` : `<div class="big-emoji">${question.emoji}</div>`}<h2>${escapeHTML(question.prompt)}</h2><form class="answer-row" data-text-form><input class="answer-input" name="answer" autocomplete="off" placeholder="Write the word"><button class="primary-btn" type="submit">Check</button></form>`;
      case 'truefalse':
        return `<h2>${escapeHTML(question.prompt)}</h2><p class="question-instruction">Is the statement true or false?</p><div class="tf-options"><button class="tf-btn" data-answer="True">✓ True</button><button class="tf-btn" data-answer="False">✕ False</button></div>`;
      case 'correct': {
        const highlighted = highlightWrongWord(question.sentence, question.wrongWord);
        return `<h2>${escapeHTML(question.prompt)}</h2><div class="wrong-word-sentence">${highlighted}</div><form class="answer-row" data-text-form><input class="answer-input" name="answer" autocomplete="off" placeholder="Write only the correct word"><button class="primary-btn" type="submit">Check</button></form>`;
      }
      case 'order':
        return `<h2>${escapeHTML(question.prompt)}</h2><div class="order-zone" id="order-zone"><span style="color:#9295a7;font-weight:800">Tap words to build the sentence.</span></div><div class="word-bank">${question.words.map((word, index) => `<button class="word-chip" data-order-word="${escapeHTML(word)}" data-word-index="${index}">${escapeHTML(word)}</button>`).join('')}</div><div class="order-actions"><button class="ghost-btn" data-clear-order>Clear</button><button class="primary-btn" data-check-order>Check</button></div>`;
      case 'match': {
        const meanings = seededShuffle(question.pairs.map(p => p.meaning), question.id);
        return `<h2>${escapeHTML(question.prompt)}</h2><p class="question-instruction">Drag a meaning to a word, or tap a meaning then tap its word.</p><div class="match-board"><div class="match-column"><h4>Words</h4>${question.pairs.map(pair => `<div class="match-target" data-match-word="${escapeHTML(pair.word)}"><div class="word">${escapeHTML(pair.word)}</div><div class="match-drop">Drop a meaning here</div></div>`).join('')}</div><div class="match-column"><h4>Meanings</h4>${meanings.map((meaning, i) => `<div class="meaning-chip" draggable="true" data-meaning="${escapeHTML(meaning)}" data-meaning-index="${i}">${escapeHTML(meaning)}</div>`).join('')}<button class="primary-btn" data-check-match style="width:100%;margin-top:7px">Check Matches</button></div></div>`;
      }
      default:
        return '<p>Question unavailable.</p>';
    }
  }

  function highlightWrongWord(sentence, wrongWord) {
    const regex = new RegExp(`(${escapeRegExp(wrongWord)})`, 'i');
    const parts = sentence.split(regex);
    return parts.map(part => normalize(part) === normalize(wrongWord) ? `<span class="wrong-highlight">${escapeHTML(part)}</span>` : escapeHTML(part)).join('');
  }

  function renderAnsweredQuestion(question, record) {
    const resultClass = record.correct ? 'correct' : 'wrong';
    const icon = record.correct ? '✅' : '❌';
    let answerView = '';
    if (question.type === 'reading') answerView += `<div class="reading-box">${escapeHTML(question.passage)}</div>`;
    if (question.type === 'listening') answerView += `<div class="listen-box"><button class="play-audio" ${question.audio ? `data-audio="${escapeHTML(question.audio)}"` : `data-listen="${escapeHTML(question.text)}"`}>▶</button><p>Play the sentence again.</p></div>`;
    if (question.image) answerView += `<img class="question-visual ${question.type === 'lookwrite' ? 'large' : ''}" src="${escapeHTML(question.image)}" alt="Picture clue">`; else if (question.type === 'lookwrite') answerView += `<div class="big-emoji">${question.emoji}</div>`;
    if (question.type === 'correct') answerView += `<div class="wrong-word-sentence">${highlightWrongWord(question.sentence, question.wrongWord)}</div>`;
    answerView += `<h2>${escapeHTML(question.prompt)}</h2>`;
    if (question.options) {
      answerView += `<div class="options">${question.options.map((option, index) => {
        const isCorrect = normalize(option) === normalize(question.answer);
        const wasChosen = normalize(option) === normalize(record.answer);
        const cls = isCorrect ? 'correct' : wasChosen && !record.correct ? 'wrong' : '';
        return `<button class="option-btn ${cls}" disabled><span class="letter">${String.fromCharCode(65 + index)}</span>${escapeHTML(option)}</button>`;
      }).join('')}</div>`;
    } else if (question.type === 'match') {
      answerView += `<div class="rule-box"><ul class="rule-list">${question.pairs.map(p => `<li>${escapeHTML(p.word)} → ${escapeHTML(p.meaning)}</li>`).join('')}</ul></div>`;
    } else {
      answerView += `<div class="rule-box"><strong>Your answer:</strong> ${escapeHTML(formatRecordAnswer(record.answer))}</div>`;
    }
    answerView += `<div class="feedback ${resultClass}"><div><h4>${icon} ${record.correct ? 'Correct!' : 'Let’s fix it.'}</h4><p>${escapeHTML(question.explanation || `Correct answer: ${formatQuestionAnswer(question.answer)}`)}</p>${record.correct ? '' : `<p><strong>Correct answer:</strong> ${escapeHTML(formatQuestionAnswer(question.answer))}</p>`}</div><div class="feedback-actions"><button class="primary-btn" data-next-after-answer>${record.correct ? 'Next Question' : 'Got it'}</button></div></div>`;
    return answerView;
  }

  function formatRecordAnswer(answer) {
    if (answer && typeof answer === 'object') return Object.entries(answer).map(([a, b]) => `${a} → ${b}`).join('; ');
    return String(answer ?? '');
  }

  function formatQuestionAnswer(answer) {
    if (answer && typeof answer === 'object') return Object.entries(answer).map(([a, b]) => `${a} → ${b}`).join('; ');
    return String(answer);
  }

  function renderCompletion(contentId, questions, baseRoute) {
    const score = contentScore(questions);
    return `<section class="completed-panel"><div class="medal">${score >= 80 ? '🏆' : score >= 60 ? '🥈' : '🌟'}</div><h2>Activity Complete!</h2><p>You solved all ${questions.length} questions and scored ${score}%.</p><div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:18px"><button class="secondary-btn" data-review-content="${contentId}">Review Answers</button><button class="primary-btn" data-route="dashboard">Back to Dashboard</button></div></section>`;
  }

  function renderBank(unitId) {
    const unit = COURSE_DATA.units.find(u => u.id === unitId);
    if (!unit) return renderDashboard();
    const questions = buildUnitBank(unit);
    return `${lessonHeroHTML({ id: `${unit.id}-bank`, icon: '🏆', kicker: `Unit ${unit.number} · Final Review`, pages: unit.sourcePages, title: `${unit.title} Question Bank`, art: unit.art }, 'practice', unitId)}${renderPractice(questions, `${unit.id}-bank`, { view: 'bank', unitId })}`;
  }

  function renderReview(reviewId) {
    const units = reviewId === 'review1' ? COURSE_DATA.units.slice(0, 3) : COURSE_DATA.units.slice(3, 6);
    const questions = buildMixedReview(reviewId, units);
    const title = reviewId === 'review1' ? 'Review 1: Units 1–3' : 'Review 2: Units 4–6';
    return `${lessonHeroHTML({ id: reviewId, icon: '📝', kicker: 'Comprehensive Review', pages: reviewId === 'review1' ? 'pp. 44–47' : 'pp. 94–97', title, art: reviewId === 'review1' ? 'assets/lesson-media-new/review1.jpg' : 'assets/lesson-media-new/review2.jpg' }, 'practice')}${renderPractice(questions, reviewId, { view: 'review', reviewId })}`;
  }

  function renderReaderLanding() {
    const unlocked = isReaderUnlocked();
    const lesson = COURSE_DATA.bonus.animalsReader;
    const questions = buildLessonQuestions(lesson);
    return `
      <section class="unit-header">
        <img src="${lesson.art}" alt="Animals in the Wild">
        <div><div class="tag">Non-fiction Reader · ${escapeHTML(lesson.pages)}</div><h1>Animals in the Wild</h1><p>Learn how owls, geckos, butterflies, caterpillars, octopuses and chameleons use camouflage.</p><div class="unit-header-actions"><button class="primary-btn" data-bonus-lesson="${lesson.id}" data-parent="reader" ${unlocked ? '' : 'disabled'}>${unlocked ? (isContentComplete(lesson.id, questions) ? 'Review Reader' : 'Start Reader') : '🔒 Finish Unit 3 Bank'}</button></div></div>
      </section>`;
  }

  function renderStoryLanding() {
    const story = COURSE_DATA.bonus.story;
    return `
      <section class="unit-header"><img src="${story.art}" alt="The Gingerbread Man"><div><div class="tag">Reading Adventure · pp. 98–120</div><h1>${escapeHTML(story.title)}</h1><p>Study the characters, follow the chase, understand the fox’s trick and complete 90 story questions.</p><div class="unit-header-actions"><button class="ghost-btn" data-route="dashboard">← Dashboard</button></div></div></section>
      <section class="lesson-list">${story.lessons.map((lesson, index) => {
        const unlocked = index === 0 || isContentComplete(story.lessons[index - 1].id, buildLessonQuestions(story.lessons[index - 1]));
        const questions = buildLessonQuestions(lesson);
        const complete = isContentComplete(lesson.id, questions);
        return `<article class="lesson-row ${unlocked ? '' : 'locked'}"><div class="lesson-icon">${lesson.icon}</div><div><h3>Story Lesson ${index + 1}: ${escapeHTML(lesson.title)}</h3><p>Detailed story explanation + 30 questions</p></div><div class="lesson-right"><div class="lesson-score">${complete ? `Finished · ${contentScore(questions)}%` : `${answeredCount(questions)}/30 solved`}</div><button class="${complete ? 'secondary-btn' : 'primary-btn'}" data-bonus-lesson="${lesson.id}" data-parent="story" ${unlocked ? '' : 'disabled'}>${unlocked ? 'Open' : '🔒'}</button></div></article>`;
      }).join('')}</section>`;
  }

  function renderBonusLesson(lessonId, parent) {
    const lesson = findBonusLesson(lessonId);
    if (!lesson) return renderDashboard();
    const questions = buildLessonQuestions(lesson);
    const tab = route.tab || lessonTab || 'learn';
    return `${lessonHeroHTML(lesson, tab)}${tab === 'learn' ? renderLearnContent(lesson, '') : renderPractice(questions, lesson.id, { view: 'bonusLesson', lessonId, parent, tab: 'practice' })}`;
  }

  function findBonusLesson(id) {
    if (COURSE_DATA.bonus.warmup?.id === id) return COURSE_DATA.bonus.warmup;
    if (COURSE_DATA.bonus.animalsReader.id === id) return COURSE_DATA.bonus.animalsReader;
    return COURSE_DATA.bonus.story.lessons.find(l => l.id === id);
  }

  function isReviewUnlocked(id) {
    if (id === 'review1') {
      const unit = COURSE_DATA.units[2];
      return isContentComplete(`${unit.id}-bank`, buildUnitBank(unit));
    }
    const unit = COURSE_DATA.units[5];
    return isContentComplete(`${unit.id}-bank`, buildUnitBank(unit));
  }

  function isReaderUnlocked() {
    const unit = COURSE_DATA.units[2];
    return isContentComplete(`${unit.id}-bank`, buildUnitBank(unit));
  }

  function isStoryUnlocked() {
    const unit = COURSE_DATA.units[5];
    return isContentComplete(`${unit.id}-bank`, buildUnitBank(unit));
  }

  function bindShellEvents() {
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
      sidebarOpen = !sidebarOpen;
      document.getElementById('sidebar')?.classList.toggle('open', sidebarOpen);
    });
    document.getElementById('sound-toggle')?.addEventListener('click', () => {
      progress.soundOn = !progress.soundOn;
      saveProgress();
      render();
    });
    document.getElementById('teacher-btn')?.addEventListener('click', showTeacherModal);
    document.getElementById('return-platform')?.addEventListener('click', () => {
      const target = new URL('/student/curricula', window.location.origin).href;
      try { if (window.top && window.top !== window) window.top.location.href = target; else window.location.href = target; } catch { window.location.href = target; }
    });

    document.querySelectorAll('[data-route="dashboard"]').forEach(btn => btn.addEventListener('click', () => setRoute({ view: 'dashboard' }, false)));
    document.querySelectorAll('[data-unit]').forEach(btn => btn.addEventListener('click', () => {
      if (!btn.disabled) setRoute({ view: 'unit', unitId: btn.dataset.unit });
    }));
    document.querySelectorAll('[data-reader]').forEach(btn => btn.addEventListener('click', () => {
      if (isReaderUnlocked() && !btn.disabled) setRoute({ view: 'reader' }); else toast('Finish the Unit 3 question bank first.', 'error');
    }));
    document.querySelectorAll('[data-story]').forEach(btn => btn.addEventListener('click', () => {
      if (isStoryUnlocked() && !btn.disabled) setRoute({ view: 'story' }); else toast('Finish the Unit 6 question bank first.', 'error');
    }));
  }

  function bindViewEvents() {
    document.querySelector('[data-continue]')?.addEventListener('click', event => {
      try { setRoute(JSON.parse(decodeURIComponent(event.currentTarget.dataset.continue))); } catch { setRoute(firstIncompleteRoute()); }
    });
    document.querySelectorAll('[data-review]').forEach(btn => btn.addEventListener('click', () => {
      if (!btn.disabled) setRoute({ view: 'review', reviewId: btn.dataset.review, qIndex: 0 });
    }));
    document.querySelectorAll('[data-lesson]').forEach(btn => btn.addEventListener('click', () => setRoute({ view: 'lesson', unitId: btn.dataset.unitId, lessonId: btn.dataset.lesson, tab: 'learn' })));
    document.querySelectorAll('[data-bank]').forEach(btn => btn.addEventListener('click', () => setRoute({ view: 'bank', unitId: btn.dataset.bank, qIndex: 0 })));
    document.querySelectorAll('[data-bonus-lesson]').forEach(btn => btn.addEventListener('click', () => {
      if (!btn.disabled) setRoute({ view: 'bonusLesson', lessonId: btn.dataset.bonusLesson, parent: btn.dataset.parent, tab: 'learn' });
    }));
    document.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (route.view === 'lesson') setRoute({ ...route, tab, qIndex: tab === 'practice' ? (route.qIndex || 0) : undefined });
      else if (route.view === 'bonusLesson') setRoute({ ...route, tab, qIndex: tab === 'practice' ? (route.qIndex || 0) : undefined });
    }));
    document.querySelector('[data-start-practice]')?.addEventListener('click', btnEvent => {
      const lessonId = btnEvent.currentTarget.dataset.startPractice;
      const unitId = btnEvent.currentTarget.dataset.unitId;
      if (route.view === 'bonusLesson' || !unitId) setRoute({ ...route, tab: 'practice', qIndex: 0 });
      else setRoute({ view: 'lesson', unitId, lessonId, tab: 'practice', qIndex: 0 });
    });
    document.querySelectorAll('[data-speak]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speak)));
    document.querySelectorAll('[data-audio]:not(.play-audio)').forEach(btn => btn.addEventListener('click', () => playAudioFile(btn.dataset.audio, btn)));
    bindPracticeEvents();
  }

  function getCurrentQuestionsAndId() {
    if (route.view === 'lesson') {
      const unit = COURSE_DATA.units.find(u => u.id === route.unitId);
      const lesson = unit?.lessons.find(l => l.id === route.lessonId);
      return lesson ? { questions: buildLessonQuestions(lesson), contentId: lesson.id } : null;
    }
    if (route.view === 'bank') {
      const unit = COURSE_DATA.units.find(u => u.id === route.unitId);
      return unit ? { questions: buildUnitBank(unit), contentId: `${unit.id}-bank` } : null;
    }
    if (route.view === 'review') {
      const units = route.reviewId === 'review1' ? COURSE_DATA.units.slice(0, 3) : COURSE_DATA.units.slice(3, 6);
      return { questions: buildMixedReview(route.reviewId, units), contentId: route.reviewId };
    }
    if (route.view === 'bonusLesson') {
      const lesson = findBonusLesson(route.lessonId);
      return lesson ? { questions: buildLessonQuestions(lesson), contentId: lesson.id } : null;
    }
    return null;
  }

  function bindPracticeEvents() {
    const current = getCurrentQuestionsAndId();
    if (!current) return;
    const { questions, contentId } = current;
    const qIndex = route.qIndex || 0;
    const question = questions[qIndex];
    if (!question) return;

    document.querySelectorAll('[data-category]').forEach(btn => btn.addEventListener('click', () => {
      const index = questions.findIndex(q => q.category === btn.dataset.category);
      setRoute({ ...route, qIndex: Math.max(0, index) });
    }));
    document.querySelector('[data-prev-question]')?.addEventListener('click', () => setRoute({ ...route, qIndex: Math.max(0, qIndex - 1) }));
    document.querySelector('[data-next-question]')?.addEventListener('click', () => goNextQuestion(questions));
    document.querySelector('[data-next-after-answer]')?.addEventListener('click', () => goNextQuestion(questions));
    document.querySelector('[data-show-completion]')?.addEventListener('click', () => setRoute({ ...route, showCompletion: true }));
    document.querySelector('[data-review-content]')?.addEventListener('click', () => setRoute({ ...route, showCompletion: false, qIndex: 0 }));

    document.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => submitAnswer(question, btn.dataset.answer, questions, contentId)));
    document.querySelector('[data-text-form]')?.addEventListener('submit', event => {
      event.preventDefault();
      const value = new FormData(event.currentTarget).get('answer');
      if (!String(value).trim()) return toast('Write an answer first.', 'error');
      submitAnswer(question, value, questions, contentId);
    });
    document.querySelectorAll('.play-audio').forEach(btn => btn.addEventListener('click', btnEvent => { const el = btnEvent.currentTarget; if (el.dataset.audio) playAudioFile(el.dataset.audio, el); else if (el.dataset.listen) speak(el.dataset.listen); }));

    bindOrderQuestion(question, questions, contentId);
    bindMatchQuestion(question, questions, contentId);
  }

  function bindOrderQuestion(question, questions, contentId) {
    if (question.type !== 'order' || progress.answers[question.id]) return;
    const zone = document.getElementById('order-zone');
    let selected = [];
    const redraw = () => {
      if (!zone) return;
      zone.innerHTML = selected.length ? selected.map((item, index) => `<button class="word-chip" data-zone-index="${index}">${escapeHTML(item.word)}</button>`).join('') : '<span style="color:#9295a7;font-weight:800">Tap words to build the sentence.</span>';
      document.querySelectorAll('[data-order-word]').forEach(chip => chip.classList.toggle('used', selected.some(item => item.index === chip.dataset.wordIndex)));
      zone.querySelectorAll('[data-zone-index]').forEach(chip => chip.addEventListener('click', () => { selected.splice(Number(chip.dataset.zoneIndex), 1); redraw(); }));
    };
    document.querySelectorAll('[data-order-word]').forEach(chip => chip.addEventListener('click', () => {
      if (selected.some(item => item.index === chip.dataset.wordIndex)) return;
      selected.push({ word: chip.dataset.orderWord, index: chip.dataset.wordIndex }); redraw();
    }));
    document.querySelector('[data-clear-order]')?.addEventListener('click', () => { selected = []; redraw(); });
    document.querySelector('[data-check-order]')?.addEventListener('click', () => {
      if (!selected.length) return toast('Build the sentence first.', 'error');
      submitAnswer(question, selected.map(item => item.word).join(' '), questions, contentId);
    });
  }

  function bindMatchQuestion(question, questions, contentId) {
    if (question.type !== 'match' || progress.answers[question.id]) return;
    const assigned = {};
    const meanings = [...document.querySelectorAll('.meaning-chip')];
    const targets = [...document.querySelectorAll('.match-target')];

    const assignMeaning = (meaning, target) => {
      const word = target.dataset.matchWord;
      Object.keys(assigned).forEach(key => { if (assigned[key] === meaning) delete assigned[key]; });
      assigned[word] = meaning;
      targets.forEach(t => {
        const drop = t.querySelector('.match-drop');
        drop.textContent = assigned[t.dataset.matchWord] || 'Drop a meaning here';
      });
      meanings.forEach(m => m.classList.toggle('used', Object.values(assigned).includes(m.dataset.meaning)));
      selectedMatchMeaning = null;
      meanings.forEach(m => m.classList.remove('selected'));
    };

    meanings.forEach(chip => {
      chip.addEventListener('dragstart', event => event.dataTransfer.setData('text/plain', chip.dataset.meaning));
      chip.addEventListener('click', () => {
        if (chip.classList.contains('used')) return;
        selectedMatchMeaning = chip.dataset.meaning;
        meanings.forEach(m => m.classList.toggle('selected', m === chip));
      });
    });
    targets.forEach(target => {
      target.addEventListener('dragover', event => event.preventDefault());
      target.addEventListener('drop', event => { event.preventDefault(); assignMeaning(event.dataTransfer.getData('text/plain'), target); });
      target.addEventListener('click', () => { if (selectedMatchMeaning) assignMeaning(selectedMatchMeaning, target); });
    });
    document.querySelector('[data-check-match]')?.addEventListener('click', () => {
      if (Object.keys(assigned).length < question.pairs.length) return toast('Match all words first.', 'error');
      submitAnswer(question, assigned, questions, contentId);
    });
  }

  function submitAnswer(question, answer, questions, contentId) {
    if (progress.answers[question.id]) return;
    let isCorrect = false;
    if (question.type === 'match') {
      isCorrect = Object.entries(question.answer).every(([word, meaning]) => normalize(answer[word]) === normalize(meaning));
    } else {
      isCorrect = normalize(answer) === normalize(question.answer);
    }

    progress.answers[question.id] = { answer, correct: isCorrect, timestamp: new Date().toISOString() };
    if (isCorrect) {
      progress.points += 10;
      confettiBurst();
      playTone(true);
    } else {
      playTone(false);
    }

    const nowComplete = isContentComplete(contentId, questions);
    if (nowComplete && !progress.completionBonus[contentId]) {
      progress.completionBonus[contentId] = true;
      progress.points += 50;
      toast('Activity complete! +50 bonus points', 'success');
    }
    saveProgress();
    emitPlatformEvent('CONNECT_PLUS_ANSWER', {
      contentId,
      questionId: question.id,
      category: question.category,
      correct: isCorrect,
      answer,
      completed: nowComplete
    });
    if (nowComplete) {
      emitPlatformEvent('CONNECT_PLUS_COMPLETION', {
        contentId,
        score: contentScore(questions),
        answered: answeredCount(questions),
        totalQuestions: questions.length
      });
    }
    const preservedScroll = window.scrollY;
    render();
    requestAnimationFrame(() => window.scrollTo({ top: preservedScroll, behavior: 'auto' }));

    if (isCorrect) {
      autoTimer = setTimeout(() => goNextQuestion(questions), 5000);
    }
  }

  function goNextQuestion(questions) {
    if (autoTimer) clearTimeout(autoTimer);
    const currentIndex = route.qIndex || 0;
    if (currentIndex < questions.length - 1) {
      setRoute({ ...route, qIndex: currentIndex + 1, showCompletion: false });
    } else {
      const current = getCurrentQuestionsAndId();
      if (current && isContentComplete(current.contentId, current.questions)) setRoute({ ...route, showCompletion: true });
      else toast('This is the last question in the activity.', 'success');
    }
  }

  let activeAudio = null;

  function playAudioFile(src, button) {
    if (!progress.soundOn) return toast('Sound is turned off.', 'error');
    if (!src) return;
    try {
      if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; }
      activeAudio = new Audio(src);
      if (button) button.classList.add('playing');
      activeAudio.addEventListener('ended', () => button?.classList.remove('playing'), { once: true });
      activeAudio.addEventListener('error', () => { button?.classList.remove('playing'); toast('Audio file could not be played.', 'error'); }, { once: true });
      activeAudio.play().catch(() => { button?.classList.remove('playing'); toast('Tap play again to start the audio.', 'error'); });
    } catch {
      toast('Audio is not available in this browser.', 'error');
    }
  }

  function speak(text) {
    if (!progress.soundOn) return toast('Sound is turned off.', 'error');
    if (!('speechSynthesis' in window)) return toast('Speech is not supported in this browser.', 'error');
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    speechSynthesis.speak(utterance);
  }

  function playTone(correct) {
    if (!progress.soundOn || !window.AudioContext && !window.webkitAudioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = correct ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(correct ? 620 : 210, ctx.currentTime);
      if (correct) osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + .18);
      gain.gain.setValueAtTime(.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .35);
      osc.start(); osc.stop(ctx.currentTime + .36);
    } catch { /* no audio */ }
  }

  function confettiBurst() {
    const colors = ['#5b45ef','#42c9b3','#ffb938','#ff6680','#7fd1ff'];
    for (let i = 0; i < 24; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = `${50 + (Math.random() * 8 - 4)}vw`;
      piece.style.top = '45vh';
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty('--x', `${Math.random() * 360 - 180}px`);
      piece.style.setProperty('--y', `${Math.random() * 260 - 50}px`);
      piece.style.animationDelay = `${Math.random() * .12}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1500);
    }
  }

  function toast(message, type = '') {
    const item = document.createElement('div');
    item.className = `toast ${type}`;
    item.textContent = message;
    toastRoot.appendChild(item);
    setTimeout(() => item.remove(), 2800);
  }

  function showTeacherModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="Meet your teacher"><button class="modal-close" aria-label="Close">✕</button><div class="teacher-profile"><div class="teacher-avatar">MF</div><div><h2>${escapeHTML(COURSE_DATA.teacher.name)}</h2><div class="role">${escapeHTML(COURSE_DATA.teacher.title)}</div><ul>${COURSE_DATA.teacher.details.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div></div></div>`;
    modal.addEventListener('click', event => { if (event.target === modal || event.target.closest('.modal-close')) modal.remove(); });
    document.body.appendChild(modal);
  }

  window.addEventListener('message', event => {
    const message = event.data;
    if (!message || typeof message !== 'object') return;
    if (message.type === 'mrfarid-course-access') {
      platformAccess = { mode: message.mode || 'full', sample: message.sample || null };
      render();
      return;
    }
    if (!['CONNECT_PLUS_STUDENT', 'PLATFORM_STUDENT', 'STUDENT_DATA'].includes(message.type)) return;
    applyPlatformStudent(message.student || message.payload || message.data || message);
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }

  render();
  window.MrFaridCourseProgress?.connect({
    courseId: 'connect-plus-primary-2',
    getState: () => progress,
    setState: next => { progress = next; saveProgress(); render(); },
    mergeState: mergeProgress,
    onStatus: ({ online, message }) => { if (!online) console.warn(message); },
  }).catch(error => console.warn('Cloud progress connection failed', error));
})();
