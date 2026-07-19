(() => {
  'use strict';

  const hash = (text) => {
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const rng = (seedText) => {
    let s = hash(seedText) || 1;
    return () => {
      s += 0x6D2B79F5;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const shuffle = (arr, seedText = 'seed') => {
    const random = rng(seedText);
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const unique = (arr) => [...new Set(arr.filter(Boolean))];

  const makeOptions = (correct, pool, seedText, count = 4) => {
    const distractors = shuffle(unique(pool).filter((item) => item !== correct), seedText).slice(0, count - 1);
    return shuffle([correct, ...distractors], `${seedText}:options`);
  };

  const replaceFirstInsensitive = (text, phrase) => {
    const index = text.toLocaleLowerCase().indexOf(phrase.toLocaleLowerCase());
    if (index < 0) return `Complete with “${phrase}”: ${text} ____`;
    return `${text.slice(0, index)}________${text.slice(index + phrase.length)}`;
  };

  const cleanWords = (sentence) => sentence
    .replace(/[“”"'?!.,:;()]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const qid = (lessonId, type, i) => `${lessonId}:${type}:${i + 1}`;

  function buildLessonQuestions(lesson) {
    const vocab = lesson.vocab || [];
    const words = vocab.map((v) => v.word);
    const meanings = vocab.map((v) => v.meaning);
    const questions = [];

    // 1–5: choose the word from a meaning.
    for (let i = 0; i < 5; i += 1) {
      const item = vocab[i % vocab.length];
      questions.push({
        id: qid(lesson.id, 'meaning-word', i),
        type: 'mcq',
        category: 'Vocabulary',
        prompt: `Which word or phrase means “${item.meaning}”?`,
        options: makeOptions(item.word, words, `${lesson.id}:mw:${i}`),
        answer: item.word,
        explanation: `“${item.word}” means ${item.meaning}.`
      });
    }

    // 6–10: choose the meaning of a word.
    for (let i = 0; i < 5; i += 1) {
      const item = vocab[(i + 5) % vocab.length];
      questions.push({
        id: qid(lesson.id, 'word-meaning', i),
        type: 'mcq',
        category: 'Vocabulary',
        prompt: `What is the best meaning of “${item.word}”?`,
        options: makeOptions(item.meaning, meanings, `${lesson.id}:wm:${i}`),
        answer: item.meaning,
        explanation: item.example
      });
    }

    // 11–15: true/false vocabulary statements.
    for (let i = 0; i < 5; i += 1) {
      const item = vocab[(i + 2) % vocab.length];
      const isTrue = i % 2 === 0;
      const shownMeaning = isTrue ? item.meaning : vocab[(i + 3) % vocab.length].meaning;
      questions.push({
        id: qid(lesson.id, 'true-false', i),
        type: 'trueFalse',
        category: 'Vocabulary',
        prompt: `“${item.word}” means ${shownMeaning}.`,
        answer: isTrue,
        explanation: `The correct meaning is: ${item.meaning}.`
      });
    }

    // 16–20: fill in the blank from lesson examples.
    for (let i = 0; i < 5; i += 1) {
      const item = vocab[(i + 1) % vocab.length];
      questions.push({
        id: qid(lesson.id, 'fill', i),
        type: 'fill',
        category: 'Vocabulary in Context',
        prompt: replaceFirstInsensitive(item.example, item.word),
        answer: item.word,
        accepted: [item.word.toLocaleLowerCase()],
        explanation: item.example
      });
    }

    // 21–25: reorder complete example sentences.
    for (let i = 0; i < 5; i += 1) {
      const item = vocab[(i + 4) % vocab.length];
      const answer = item.example.replace(/\s+/g, ' ').trim();
      const tokens = cleanWords(answer);
      questions.push({
        id: qid(lesson.id, 'reorder', i),
        type: 'reorder',
        category: 'Sentence Order',
        prompt: 'Put the words in the correct order.',
        words: shuffle(tokens, `${lesson.id}:reorder:${i}`),
        answer,
        comparison: tokens.map((x) => x.toLocaleLowerCase()).join(' '),
        explanation: answer
      });
    }

    // 26–28: lesson grammar checks.
    const checks = lesson.grammar?.checks?.length
      ? lesson.grammar.checks
      : [{ prompt: 'Choose the correct sentence.', options: lesson.grammar?.examples?.slice(0, 3) || ['I am ready.'], answer: lesson.grammar?.examples?.[0] || 'I am ready.' }];
    for (let i = 0; i < 3; i += 1) {
      const check = checks[i % checks.length];
      questions.push({
        id: qid(lesson.id, 'grammar', i),
        type: 'mcq',
        category: 'Grammar',
        prompt: check.prompt,
        options: shuffle(check.options, `${lesson.id}:grammar:${i}`),
        answer: check.answer,
        explanation: lesson.grammar?.explanation || 'Use the lesson rule.'
      });
    }

    // 29–30: reading/dialogue comprehension.
    const readingQs = lesson.reading?.questions?.length
      ? lesson.reading.questions
      : [{ prompt: 'What is the main idea?', options: [lesson.reading?.mainIdea || lesson.focus, 'A different topic', 'No main idea'], answer: lesson.reading?.mainIdea || lesson.focus }];
    for (let i = 0; i < 2; i += 1) {
      const rq = readingQs[i % readingQs.length];
      questions.push({
        id: qid(lesson.id, 'reading', i),
        type: 'mcq',
        category: 'Reading',
        prompt: rq.prompt,
        options: shuffle(rq.options, `${lesson.id}:reading:${i}`),
        answer: rq.answer,
        explanation: lesson.reading?.summary || lesson.reading?.mainIdea || ''
      });
    }

    return questions.slice(0, 30);
  }

  function buildMatchingQuestion(unit, index) {
    const all = unit.lessons.flatMap((l) => l.vocab.map((v) => ({ word: v.word, meaning: v.meaning })));
    const selected = shuffle(all, `unit-${unit.id}:match:${index}`).slice(index % 3, (index % 3) + 4);
    const fallback = selected.length >= 4 ? selected : shuffle(all, `unit-${unit.id}:match:fallback`).slice(0, 4);
    return {
      id: `unit-${unit.id}:match:${index + 1}`,
      type: 'matching',
      category: 'Matching',
      prompt: 'Match each word with its correct meaning.',
      pairs: fallback,
      answer: Object.fromEntries(fallback.map((p) => [p.word, p.meaning])),
      explanation: 'Review the vocabulary flashcards if you need help.'
    };
  }

  function buildUnitQuestions(unit) {
    const pool = unit.lessons.flatMap(buildLessonQuestions);
    const selected = shuffle(pool, `unit-${unit.id}:bank`).slice(0, 44).map((q, i) => ({
      ...q,
      id: `unit-${unit.id}:bank:${i + 1}:${q.id}`
    }));
    while (selected.length < 44) {
      const q = pool[selected.length % pool.length];
      selected.push({ ...q, id: `unit-${unit.id}:bank:${selected.length + 1}:${q.id}` });
    }
    for (let i = 0; i < 6; i += 1) selected.push(buildMatchingQuestion(unit, i));
    return selected.slice(0, 50);
  }

  function buildReviewQuestions(review, curriculum) {
    const units = curriculum.units.filter((u) => review.unitIds.includes(u.id));
    const pools = units.flatMap((u) => buildUnitQuestions(u));
    return shuffle(pools, `${review.id}:review`).slice(0, 60).map((q, i) => ({
      ...q,
      id: `${review.id}:${i + 1}:${q.id}`
    }));
  }

  window.QuestionEngine = {
    shuffle,
    buildLessonQuestions,
    buildUnitQuestions,
    buildReviewQuestions
  };
})();
