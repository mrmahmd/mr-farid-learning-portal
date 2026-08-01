(() => {
  'use strict';

  const COURSE = window.COURSE_DATA;
  const BUILD_VERSION = '2026.07.29.3';
  const TYPE_ALIASES = {
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
  const SUPPORTED = new Set(['mcq', 'fill', 'correction', 'drag-drop', 'reorder', 'order-sentences', 'match', 'truefalse', 'listening-mcq']);

  const canonicalType = (value) => {
    const key = String(value || '').trim().toLowerCase().replace(/\s+/g, '-');
    return TYPE_ALIASES[key] || key;
  };

  const inferCategory = (question) => {
    const prompt = String(question.prompt || '').toLowerCase();
    const type = canonicalType(question.type);
    if (type === 'listening-mcq') return 'Listening';
    if (type === 'correction' || type === 'reorder' || /tense|verb|grammar|can\b|must\b|should\b|did\b|present|past/.test(prompt)) return 'Grammar';
    if (/read|text|story|event|character|main idea|fact/.test(prompt) || type === 'truefalse') return 'Reading';
    if (/write|email|paragraph|poster|biography|sentence/.test(prompt) || type === 'order-sentences') return 'Writing';
    return 'Vocabulary';
  };

  const safeQuestion = (question) => {
    if (!question || typeof question !== 'object') return question;
    question.type = canonicalType(question.type);
    question.category = String(question.category || inferCategory(question)).trim();
    question.prompt = String(question.prompt || '').trim();
    if (typeof question.explanation !== 'string') question.explanation = '';
    if (question.type === 'mcq' || question.type === 'listening-mcq') {
      question.options = Array.isArray(question.options) ? question.options.map(String) : [];
      question.answer = String(question.answer ?? '');
    }
    if (question.type === 'fill' || question.type === 'correction') question.answer = String(question.answer ?? '').trim();
    if (question.type === 'drag-drop') {
      question.groups = Array.isArray(question.groups) ? question.groups.map((group) => ({
        name: String(group?.name || 'Group'),
        items: Array.isArray(group?.items) ? group.items.map(String) : []
      })) : [];
    }
    if (question.type === 'reorder') {
      question.words = Array.isArray(question.words) ? question.words.map(String) : [];
      question.answer = Array.isArray(question.answer) ? question.answer.map(String) : [...question.words];
    }
    if (question.type === 'order-sentences') {
      question.sentences = Array.isArray(question.sentences) ? question.sentences.map(String) : [];
      question.answer = Array.isArray(question.answer) ? question.answer.map(String) : [...question.sentences];
    }
    if (question.type === 'match') {
      question.pairs = Array.isArray(question.pairs) ? question.pairs.map((pair) => [String(pair?.[0] || ''), String(pair?.[1] || '')]) : [];
    }
    if (question.type === 'truefalse') question.answer = Boolean(question.answer);
    return question;
  };

  // The three original unit-review corrections highlighted whole phrases. They are
  // rewritten so the learner corrects one coloured word only, as required.
  const reviewCorrectionFixes = {
    u2: {
      prompt: 'Correct the highlighted word. Write the correct word only: I **are** not wearing my jacket.',
      answer: 'am',
      explanation: 'The subject “I” takes “am”: I am not wearing my jacket.'
    },
    u3: {
      prompt: 'Correct the highlighted word. Write the correct word only: Ali can **runs** fast.',
      answer: 'run',
      explanation: 'After “can”, use the base form of the verb: can run.'
    },
    u5: {
      prompt: 'Correct the highlighted word. Write the correct word only: He didn’t **visited** the exhibition.',
      answer: 'visit',
      explanation: 'After “didn’t”, use the base form: didn’t visit.'
    }
  };

  const allQuestions = [];
  COURSE.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => {
      lesson.questions = (lesson.questions || []).map(safeQuestion);
      allQuestions.push(...lesson.questions.map((question) => ({ location: lesson.id, question })));
    });
    unit.review = (unit.review || []).map(safeQuestion);
    const correction = unit.review.find((question) => question.type === 'correction');
    if (correction && reviewCorrectionFixes[unit.id]) Object.assign(correction, reviewCorrectionFixes[unit.id], { category: 'Grammar' });
    unit.review.forEach(safeQuestion);
    unit.bank = (unit.bank || []).map(safeQuestion);
    allQuestions.push(...unit.review.map((question) => ({ location: `${unit.id}-review`, question })));
    allQuestions.push(...unit.bank.map((question) => ({ location: `${unit.id}-bank`, question })));
  });

  const issues = [];
  allQuestions.forEach(({ location, question }, index) => {
    const loc = `${location}:${index + 1}`;
    if (!SUPPORTED.has(question.type)) issues.push(`${loc} unsupported type “${question.type}”`);
    if (!question.prompt) issues.push(`${loc} missing prompt`);
    if ((question.type === 'mcq' || question.type === 'listening-mcq') && (!question.options.includes(question.answer))) issues.push(`${loc} answer is not in options`);
    if (question.type === 'drag-drop' && (!question.groups.length || question.groups.some((group) => !group.items.length))) issues.push(`${loc} malformed drag-and-drop groups`);
    if (question.type === 'match' && (!question.pairs.length || question.pairs.some((pair) => pair.length !== 2 || !pair[0] || !pair[1]))) issues.push(`${loc} malformed matching pairs`);
    if (question.type === 'correction') {
      const highlighted = [...question.prompt.matchAll(/\*\*(.*?)\*\*/g)];
      if (highlighted.length !== 1 || /\s/.test(highlighted[0]?.[1]?.trim() || '')) issues.push(`${loc} correction must highlight exactly one word`);
    }
  });

  window.APP_BUILD_VERSION = BUILD_VERSION;
  window.APP_DATA_INTEGRITY = {
    ok: issues.length === 0,
    issues,
    lessonCount: COURSE.units.reduce((sum, unit) => sum + unit.lessons.length, 0),
    lessonQuestionCount: COURSE.units.reduce((sum, unit) => sum + unit.lessons.reduce((subtotal, lesson) => subtotal + lesson.questions.length, 0), 0),
    bankQuestionCount: COURSE.units.reduce((sum, unit) => sum + unit.bank.length, 0),
    reviewQuestionCount: COURSE.units.reduce((sum, unit) => sum + unit.review.length, 0)
  };
  if (issues.length) console.error('[English P6 integrity check]', issues);
  else console.info(`[English P6 ${BUILD_VERSION}] data integrity check passed.`);
})();
