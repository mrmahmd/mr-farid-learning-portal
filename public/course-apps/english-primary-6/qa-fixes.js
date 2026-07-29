(() => {
  'use strict';

  const COURSE = window.COURSE_DATA;
  const BUILD_VERSION = '2026.07.29.3';
  const aliases = {
    mcq: 'mcq', choose: 'mcq', choice: 'mcq', 'multiple-choice': 'mcq',
    fill: 'fill', complete: 'fill', completion: 'fill',
    correction: 'correction', correct: 'correction', 'correct-word': 'correction',
    'drag-drop': 'drag-drop', dragdrop: 'drag-drop', 'drag_and_drop': 'drag-drop', 'drag-and-drop': 'drag-drop',
    reorder: 'reorder', 'order-words': 'reorder', 'word-order': 'reorder',
    'order-sentences': 'order-sentences', 'sentence-order': 'order-sentences',
    match: 'match', matching: 'match',
    truefalse: 'truefalse', 'true-false': 'truefalse', tf: 'truefalse',
    'listening-mcq': 'listening-mcq', listening: 'listening-mcq', 'listen-mcq': 'listening-mcq'
  };
  const supported = new Set(['mcq', 'fill', 'correction', 'drag-drop', 'reorder', 'order-sentences', 'match', 'truefalse', 'listening-mcq']);
  const typeOf = (value) => {
    const key = String(value || '').trim().toLowerCase().replace(/\s+/g, '-');
    return aliases[key] || key;
  };
  const categoryOf = (question) => {
    const prompt = String(question.prompt || '').toLowerCase();
    if (question.type === 'listening-mcq') return 'Listening';
    if (question.type === 'correction' || question.type === 'reorder' || /tense|verb|grammar|can\b|must\b|should\b|did\b|present|past/.test(prompt)) return 'Grammar';
    if (/read|text|story|event|character|main idea|fact/.test(prompt) || question.type === 'truefalse') return 'Reading';
    if (/write|email|paragraph|poster|biography|sentence/.test(prompt) || question.type === 'order-sentences') return 'Writing';
    return 'Vocabulary';
  };
  const normalise = (question) => {
    if (!question || typeof question !== 'object') return question;
    question.type = typeOf(question.type);
    question.category = String(question.category || categoryOf(question)).trim();
    question.prompt = String(question.prompt || '').trim();
    question.explanation = typeof question.explanation === 'string' ? question.explanation : '';
    if (question.type === 'mcq' || question.type === 'listening-mcq') {
      question.options = Array.isArray(question.options) ? question.options.map(String) : [];
      question.answer = String(question.answer ?? '');
    }
    if (question.type === 'fill' || question.type === 'correction') question.answer = String(question.answer ?? '').trim();
    if (question.type === 'drag-drop') question.groups = Array.isArray(question.groups) ? question.groups.map((group) => ({ name: String(group?.name || 'Group'), items: Array.isArray(group?.items) ? group.items.map(String) : [] })) : [];
    if (question.type === 'reorder') { question.words = Array.isArray(question.words) ? question.words.map(String) : []; question.answer = Array.isArray(question.answer) ? question.answer.map(String) : [...question.words]; }
    if (question.type === 'order-sentences') { question.sentences = Array.isArray(question.sentences) ? question.sentences.map(String) : []; question.answer = Array.isArray(question.answer) ? question.answer.map(String) : [...question.sentences]; }
    if (question.type === 'match') question.pairs = Array.isArray(question.pairs) ? question.pairs.map((pair) => [String(pair?.[0] || ''), String(pair?.[1] || '')]) : [];
    if (question.type === 'truefalse') question.answer = Boolean(question.answer);
    return question;
  };

  const reviewFixes = {
    u2: { prompt: 'Correct the highlighted word. Write the correct word only: I **are** not wearing my jacket.', answer: 'am', explanation: 'The subject I takes am: I am not wearing my jacket.' },
    u3: { prompt: 'Correct the highlighted word. Write the correct word only: Ali can **runs** fast.', answer: 'run', explanation: 'After can, use the base form of the verb: can run.' },
    u5: { prompt: 'Correct the highlighted word. Write the correct word only: He didn\'t **visited** the exhibition.', answer: 'visit', explanation: 'After didn\'t, use the base form: didn\'t visit.' }
  };
  const issues = [];
  COURSE.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => { lesson.questions = (lesson.questions || []).map(normalise); });
    unit.review = (unit.review || []).map(normalise);
    const correction = unit.review.find((question) => question.type === 'correction');
    if (correction && reviewFixes[unit.id]) Object.assign(correction, reviewFixes[unit.id], { category: 'Grammar' });
    unit.bank = (unit.bank || []).map(normalise);
    [...unit.lessons.flatMap((lesson) => lesson.questions), ...unit.review, ...unit.bank].forEach((question) => {
      if (!supported.has(question.type) || !question.prompt) issues.push(question.id || 'unnamed question');
    });
  });
  window.APP_BUILD_VERSION = BUILD_VERSION;
  window.APP_DATA_INTEGRITY = { ok: issues.length === 0, issues };
  if (issues.length) console.error('[English Primary 6 integrity]', issues);
})();
