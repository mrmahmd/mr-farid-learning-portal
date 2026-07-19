(() => {
  'use strict';

  const hash = (text) => {
    let h = 2166136261;
    for (let i = 0; i < String(text).length; i += 1) {
      h ^= String(text).charCodeAt(i);
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

  const unique = (arr) => [...new Set(arr.filter((x) => x !== undefined && x !== null && String(x).trim() !== ''))];
  const normalize = (value = '') => String(value).toLocaleLowerCase().replace(/[“”"'?!.,:;()]/g, '').replace(/\s+/g, ' ').trim();
  const cleanWords = (sentence) => String(sentence).replace(/[“”"'?!.,:;()]/g, '').split(/\s+/).filter(Boolean);
  const qid = (lessonId, type, i) => `${lessonId}:${type}:${i + 1}`;

  const COMMON_GRAMMAR_WORDS = [
    'am', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'have', 'has', 'had',
    'go', 'goes', 'went', 'play', 'plays', 'played', 'help', 'helps', 'helped',
    'in', 'on', 'under', 'behind', 'between', 'from', 'to', 'at', 'and', 'but', 'then',
    'my', 'his', 'her', 'a', 'an', 'the'
  ];

  const makeOptions = (correct, pool, seedText, count = 3) => {
    const safeCorrect = String(correct);
    const distractors = shuffle(unique(pool).map(String).filter((x) => normalize(x) !== normalize(safeCorrect)), seedText).slice(0, Math.max(0, count - 1));
    return shuffle(unique([safeCorrect, ...distractors]).slice(0, count), `${seedText}:options`);
  };

  const phraseRegex = (phrase) => {
    const escaped = String(phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^A-Za-z])(${escaped})(?=$|[^A-Za-z])`, 'i');
  };

  const containsPhrase = (text, phrase) => phraseRegex(phrase).test(String(text));

  const replaceFirstInsensitive = (text, phrase) => {
    const source = String(text);
    const pattern = phraseRegex(phrase);
    if (!pattern.test(source)) return `${source} ________`;
    return source.replace(pattern, (match, prefix) => `${prefix}________`);
  };

  const grammarPool = (lesson) => {
    const checkAnswers = (lesson.grammar?.checks || []).map((x) => x.answer);
    const checkOptions = (lesson.grammar?.checks || []).flatMap((x) => x.options || []);
    const verbForms = (lesson.verbs || []).flatMap((v) => [v.base, v.past]).filter(Boolean);
    return unique([...checkAnswers, ...checkOptions, ...verbForms, ...COMMON_GRAMMAR_WORDS]);
  };

  const findClozeCandidate = (sentence, preferredPool) => {
    const words = cleanWords(sentence);
    const preferred = preferredPool.map(normalize);
    for (const word of words) {
      if (preferred.includes(normalize(word))) return word;
    }
    return words.find((word) => word.length > 2) || words[0] || '';
  };

  const buildCloze = (sentence, preferredPool, seedText, optionCount = 3) => {
    const answer = findClozeCandidate(sentence, preferredPool);
    return {
      prompt: replaceFirstInsensitive(sentence, answer),
      answer,
      options: makeOptions(answer, preferredPool, seedText, optionCount)
    };
  };

  const grammarChecks = (lesson) => {
    const checks = (lesson.grammar?.checks || []).filter((c) => c.prompt && c.answer && Array.isArray(c.options));
    const pool = grammarPool(lesson);
    const examples = unique([...(lesson.grammar?.examples || []), ...(lesson.verbs || []).map((v) => v.example), ...(lesson.vocab || []).map((v) => v.example)]);
    const generated = examples.map((sentence, i) => {
      const cloze = buildCloze(sentence, pool, `${lesson.id}:grammar-cloze:${i}`);
      return {
        prompt: cloze.prompt,
        options: cloze.options,
        answer: cloze.answer
      };
    }).filter((x) => x.answer && x.options.length >= 2);
    return [...checks, ...generated];
  };

  const contextItems = (lesson) => (lesson.vocab || [])
    .filter((item) => item.word && item.example && containsPhrase(item.example, item.word))
    .map((item) => ({
      word: item.word,
      sentence: item.example,
      prompt: replaceFirstInsensitive(item.example, item.word)
    }));

  const readingQuestions = (lesson) => (lesson.reading?.questions || []).filter((q) => q.prompt && q.answer && Array.isArray(q.options));

  function buildLessonQuestions(lesson) {
    const questions = [];
    const gChecks = grammarChecks(lesson);
    const gPool = grammarPool(lesson);
    const contexts = contextItems(lesson);
    const vocabWords = unique((lesson.vocab || []).map((v) => v.word));
    const examples = unique(contexts.map((x) => x.sentence));

    // 1–8: short grammar / verb-choice MCQs.
    for (let i = 0; i < 8; i += 1) {
      const check = gChecks[i % Math.max(1, gChecks.length)] || {
        prompt: 'Choose the correct word: I ___ ready.',
        options: ['am', 'is', 'are'],
        answer: 'am'
      };
      questions.push({
        id: qid(lesson.id, 'grammar', i),
        type: 'mcq',
        category: 'Grammar',
        prompt: check.prompt,
        options: shuffle(check.options, `${lesson.id}:grammar:${i}`),
        answer: check.answer,
        explanation: lesson.grammar?.explanation || 'Choose the word that makes the sentence correct.'
      });
    }

    // 9–12: vocabulary used inside short sentences.
    for (let i = 0; i < 4; i += 1) {
      const item = contexts[i % Math.max(1, contexts.length)] || { word: 'English', prompt: 'I learn ________.' };
      questions.push({
        id: qid(lesson.id, 'vocab-context', i),
        type: 'mcq',
        category: 'Vocabulary in a Sentence',
        prompt: item.prompt,
        options: makeOptions(item.word, vocabWords, `${lesson.id}:vocab-context:${i}`),
        answer: item.word,
        explanation: item.sentence || ''
      });
    }

    // 13–14: very short typed completion.
    for (let i = 0; i < 2; i += 1) {
      const item = contexts[(i + 4) % Math.max(1, contexts.length)] || { word: 'am', prompt: 'I ________ happy.', sentence: 'I am happy.' };
      questions.push({
        id: qid(lesson.id, 'fill', i),
        type: 'fill',
        category: 'Complete the Sentence',
        prompt: item.prompt,
        answer: item.word,
        accepted: [normalize(item.word)],
        explanation: item.sentence || ''
      });
    }

    // 15–18: drag the correct word into a sentence.
    for (let i = 0; i < 4; i += 1) {
      const source = i < 2
        ? (gChecks[(i + 2) % Math.max(1, gChecks.length)] || null)
        : (contexts[(i + 6) % Math.max(1, contexts.length)] || null);
      const prompt = source?.prompt || 'She ________ to school.';
      const answer = source?.answer || source?.word || 'goes';
      const optionPool = source?.options || (i < 2 ? gPool : vocabWords);
      questions.push({
        id: qid(lesson.id, 'drag-fill', i),
        type: 'dragFill',
        category: 'Drag & Drop',
        prompt,
        options: makeOptions(answer, optionPool, `${lesson.id}:drag-fill:${i}`, 4),
        answer,
        explanation: 'Drag the word that completes the sentence.'
      });
    }

    // 19–20: drag words to short sentence slots (not definitions).
    for (let i = 0; i < 2; i += 1) {
      const pairs = [];
      const sources = shuffle([...gChecks, ...contexts.map((x) => ({ prompt: x.prompt, answer: x.word }))], `${lesson.id}:drag-match:${i}`);
      for (const source of sources) {
        if (!source?.prompt || !source?.answer) continue;
        if (pairs.some((p) => normalize(p.answer) === normalize(source.answer))) continue;
        pairs.push({ sentence: source.prompt, answer: source.answer });
        if (pairs.length === 3) break;
      }
      while (pairs.length < 3) {
        const fallbacks = [
          { sentence: 'I ________ a pupil.', answer: 'am' },
          { sentence: 'She ________ kind.', answer: 'is' },
          { sentence: 'They ________ friends.', answer: 'are' }
        ];
        const fallback = fallbacks[pairs.length];
        if (!pairs.some((p) => normalize(p.answer) === normalize(fallback.answer))) pairs.push(fallback);
        else pairs.push({ sentence: `Choose word ${pairs.length + 1}: ________`, answer: `word${pairs.length + 1}` });
      }
      questions.push({
        id: qid(lesson.id, 'drag-match', i),
        type: 'dragMatch',
        category: 'Drag & Match',
        prompt: 'Drag each word to the correct sentence.',
        pairs,
        options: shuffle(pairs.map((p) => p.answer), `${lesson.id}:drag-match-options:${i}`),
        answer: Object.fromEntries(pairs.map((p, idx) => [String(idx), p.answer])),
        explanation: 'Read the whole sentence before you choose.'
      });
    }

    // 21–24: reorder short sentences with draggable words.
    const orderSentences = shuffle(examples.filter((s) => cleanWords(s).length >= 3 && cleanWords(s).length <= 9), `${lesson.id}:order-sentences`);
    for (let i = 0; i < 4; i += 1) {
      const answer = orderSentences[i % Math.max(1, orderSentences.length)] || ['I am ready.', 'She is kind.', 'We help together.', 'They play football.'][i];
      const words = cleanWords(answer);
      questions.push({
        id: qid(lesson.id, 'reorder', i),
        type: 'reorder',
        category: 'Build the Sentence',
        prompt: 'Drag the words into the correct order.',
        words: shuffle(words, `${lesson.id}:reorder:${i}`),
        answer,
        comparison: words.map(normalize).join(' '),
        explanation: answer
      });
    }

    // 25–27: short true/false grammar statements.
    const tfSource = gChecks.length ? gChecks : [{ prompt: 'I am a pupil.', answer: 'am', options: ['am', 'is', 'are'] }];
    for (let i = 0; i < 3; i += 1) {
      const source = tfSource[i % tfSource.length];
      const isTrue = i !== 1;
      let sentence = source.prompt;
      if (!isTrue && source.options?.length) {
        const wrong = source.options.find((x) => normalize(x) !== normalize(source.answer)) || source.options[0];
        sentence = String(source.prompt).replace('___', wrong).replace('________', wrong);
      } else {
        sentence = String(source.prompt).replace('___', source.answer).replace('________', source.answer);
      }
      questions.push({
        id: qid(lesson.id, 'true-false', i),
        type: 'trueFalse',
        category: 'Grammar Check',
        prompt: `Is this sentence correct? “${sentence}”`,
        answer: isTrue,
        explanation: isTrue ? 'The sentence is correct.' : `Use “${source.answer}”.`
      });
    }

    // 28: one direct dialogue or comprehension question.
    const rqs = readingQuestions(lesson);
    const dialogue = rqs[0] || null;
    questions.push({
      id: qid(lesson.id, 'dialogue', 0),
      type: 'mcq',
      category: 'Dialogue',
      prompt: dialogue?.prompt || 'Choose the best reply: “How are you?”',
      options: dialogue?.options || ['I am fine, thank you.', 'I am eight.', 'Goodbye.'],
      answer: dialogue?.answer || 'I am fine, thank you.',
      explanation: lesson.reading?.summary || 'Choose the reply that fits the dialogue.'
    });

    // 29–30: two short, non-repeated reading questions.
    const readingFallbacks = [];
    const events = unique(lesson.reading?.events || []);
    if (events[0]) readingFallbacks.push({ prompt: 'What happens in the story?', options: [events[0], 'The children fly to the moon.', 'Nobody does anything.'], answer: events[0] });
    if (events[1]) readingFallbacks.push({ prompt: 'Choose the correct event.', options: [events[1], 'The lesson ends before it starts.', 'Everyone stays asleep all day.'], answer: events[1] });
    if (lesson.reading?.mainIdea) readingFallbacks.push({ prompt: 'What is the story about?', options: [lesson.reading.mainIdea, 'A shopping list', 'A maths test only'], answer: lesson.reading.mainIdea });
    const availableReading = [...rqs.slice(1), ...readingFallbacks];
    for (let i = 0; i < 2; i += 1) {
      const rq = availableReading[i] || {
        prompt: i === 0 ? 'Who is in the story?' : 'Where does the story happen?',
        options: i === 0 ? ['The lesson characters', 'No one', 'A robot'] : ['At school', 'On the moon', 'Under the sea'],
        answer: i === 0 ? 'The lesson characters' : 'At school'
      };
      questions.push({
        id: qid(lesson.id, 'reading', i),
        type: 'mcq',
        category: 'Reading',
        prompt: rq.prompt,
        options: shuffle(rq.options, `${lesson.id}:reading:${i}`),
        answer: rq.answer,
        explanation: lesson.reading?.summary || ''
      });
    }

    return questions.slice(0, 30);
  }

  const takeBy = (pool, predicate, count, seed) => shuffle(pool.filter(predicate), seed).slice(0, count);

  function buildUnitQuestions(unit) {
    const pool = unit.lessons.flatMap(buildLessonQuestions);
    const picked = [];
    const used = new Set();
    const add = (items) => {
      items.forEach((q) => {
        if (used.has(q.id)) return;
        used.add(q.id);
        picked.push(q);
      });
    };

    add(takeBy(pool, (q) => q.category === 'Grammar' || q.category === 'Grammar Check', 20, `unit-${unit.id}:grammar`));
    add(takeBy(pool, (q) => ['Vocabulary in a Sentence', 'Complete the Sentence'].includes(q.category), 10, `unit-${unit.id}:vocab`));
    add(takeBy(pool, (q) => ['dragFill', 'dragMatch'].includes(q.type), 10, `unit-${unit.id}:drag`));
    add(takeBy(pool, (q) => q.type === 'reorder', 4, `unit-${unit.id}:reorder`));
    add(takeBy(pool, (q) => q.type === 'trueFalse', 3, `unit-${unit.id}:tf`));
    add(takeBy(pool, (q) => q.category === 'Dialogue', 2, `unit-${unit.id}:dialogue`));
    add(takeBy(pool, (q) => q.category === 'Reading', 1, `unit-${unit.id}:reading`));

    const fallback = shuffle(pool, `unit-${unit.id}:fallback`);
    for (const q of fallback) {
      if (picked.length >= 50) break;
      if (!used.has(q.id)) { used.add(q.id); picked.push(q); }
    }

    while (picked.length < 50 && pool.length) picked.push(pool[picked.length % pool.length]);
    return picked.slice(0, 50).map((q, i) => ({ ...q, id: `unit-${unit.id}:bank:${i + 1}:${q.id}` }));
  }

  function buildReviewQuestions(review, curriculum) {
    const units = curriculum.units.filter((u) => review.unitIds.includes(u.id));
    const pool = units.flatMap((u) => buildUnitQuestions(u));
    const grammar = takeBy(pool, (q) => q.category === 'Grammar' || q.category === 'Grammar Check', 24, `${review.id}:grammar`);
    const drag = takeBy(pool, (q) => ['dragFill', 'dragMatch', 'reorder'].includes(q.type), 18, `${review.id}:drag`);
    const context = takeBy(pool, (q) => ['Vocabulary in a Sentence', 'Complete the Sentence', 'Dialogue', 'Reading'].includes(q.category), 18, `${review.id}:context`);
    return [...grammar, ...drag, ...context].slice(0, 60).map((q, i) => ({ ...q, id: `${review.id}:${i + 1}:${q.id}` }));
  }

  window.QuestionEngine = {
    shuffle,
    buildLessonQuestions,
    buildUnitQuestions,
    buildReviewQuestions
  };
})();
