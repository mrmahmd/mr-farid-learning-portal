(() => {
  'use strict';

  const DEFAULT_STATE = {
    student: { id: 'guest', name: 'Student', className: '' },
    points: 0,
    stars: 0,
    coins: 0,
    level: 1,
    streak: 1,
    badges: [],
    completedStations: {},
    answeredQuestions: {},
    challengeResults: {},
    knownWords: {},
    lastRoute: { name: 'home' },
    lastQuestion: null,
    updatedAt: null
  };

  const readPlatformStudent = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('studentId') || params.get('student_id') || '';
    const name = params.get('studentName') || params.get('student_name') || '';
    const className = params.get('className') || params.get('class') || '';
    const injected = window.PLATFORM_STUDENT || {};
    return {
      id: id || injected.id || injected.studentId || '',
      name: name || injected.name || injected.studentName || '',
      className: className || injected.className || ''
    };
  };

  let student = readPlatformStudent();
  if (!student.id) student.id = sessionStorage.getItem('p1_student_id') || 'guest';
  if (!student.name) student.name = sessionStorage.getItem('p1_student_name') || 'Student';
  if (!student.className) student.className = sessionStorage.getItem('p1_student_class') || '';

  const key = () => `english-primary1:${student.id}:state:v1`;

  const mergeState = (raw) => ({
    ...structuredClone(DEFAULT_STATE),
    ...(raw || {}),
    student: { ...DEFAULT_STATE.student, ...(raw?.student || {}), ...student },
    completedStations: { ...(raw?.completedStations || {}) },
    answeredQuestions: { ...(raw?.answeredQuestions || {}) },
    challengeResults: { ...(raw?.challengeResults || {}) },
    knownWords: { ...(raw?.knownWords || {}) },
    badges: Array.isArray(raw?.badges) ? raw.badges : []
  });

  let state;
  try {
    state = mergeState(JSON.parse(localStorage.getItem(key()) || 'null'));
  } catch {
    state = mergeState(null);
  }

  const save = () => {
    state.updatedAt = new Date().toISOString();
    state.level = Math.max(1, Math.floor(state.points / 300) + 1);
    state.student = { ...state.student, ...student };
    localStorage.setItem(key(), JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('p1:state', { detail: structuredClone(state) }));
    try {
      window.parent?.postMessage({ type: 'PRIMARY1_PROGRESS', studentId: student.id, state }, '*');
    } catch {
      // The website also works when it is not inside an iframe.
    }
    window.MrFaridCourseProgress?.queueSave();
  };

  const award = ({ id, points = 0, stars = 0, coins = 0 }) => {
    if (state.answeredQuestions[id]?.rewarded) return false;
    state.points += points;
    state.stars += stars;
    state.coins += coins;
    state.answeredQuestions[id] = { ...(state.answeredQuestions[id] || {}), rewarded: true, completedAt: Date.now() };
    save();
    return true;
  };

  const setStudent = (next = {}) => {
    const previousKey = key();
    student = {
      id: String(next.id || next.studentId || student.id || 'guest'),
      name: String(next.name || next.studentName || student.name || 'Student'),
      className: String(next.className || student.className || '')
    };
    sessionStorage.setItem('p1_student_id', student.id);
    sessionStorage.setItem('p1_student_name', student.name);
    sessionStorage.setItem('p1_student_class', student.className);
    try {
      state = mergeState(JSON.parse(localStorage.getItem(key()) || 'null'));
    } catch {
      state = mergeState(null);
    }
    if (previousKey !== key()) save();
    window.dispatchEvent(new CustomEvent('p1:student', { detail: student }));
  };

  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if (['PLATFORM_STUDENT', 'SET_STUDENT', 'STUDENT_CONTEXT'].includes(data.type)) {
      setStudent(data.student || data.payload || data);
    }
  });

  window.Primary1Store = {
    getState: () => state,
    replaceState(next) {
      state = mergeState(next);
      localStorage.setItem(key(), JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('p1:state', { detail: structuredClone(state) }));
      window.dispatchEvent(new CustomEvent('p1:remote-state', { detail: structuredClone(state) }));
    },
    save,
    setStudent,
    update(mutator) {
      mutator(state);
      save();
      return state;
    },
    setRoute(route) {
      state.lastRoute = route;
      state.portalLastActivity = { detail: route.name === 'lesson' ? `Lesson ${route.lessonId}` : route.name === 'unit' ? `Unit ${route.unitId}` : route.name === 'challenge' ? 'Practice challenge' : route.name === 'progress' ? 'My Progress' : 'Home', path: route.name || 'home' };
      save();
    },
    markStation(lessonId, stationId) {
      state.completedStations[lessonId] ||= {};
      state.completedStations[lessonId][stationId] = true;
      save();
    },
    markKnownWord(lessonId, word) {
      state.knownWords[lessonId] ||= {};
      state.knownWords[lessonId][word] = true;
      save();
    },
    recordAnswer(questionId, isCorrect, answer) {
      const old = state.answeredQuestions[questionId] || {};
      state.answeredQuestions[questionId] = {
        ...old,
        attempts: (old.attempts || 0) + 1,
        correct: Boolean(isCorrect),
        answer,
        answeredAt: Date.now()
      };
      save();
    },
    setChallengeResult(challengeId, result) {
      state.challengeResults[challengeId] = { ...result, completedAt: Date.now() };
      save();
    },
    setLastQuestion(payload) {
      state.lastQuestion = payload;
      save();
    },
    award,
    reset() {
      localStorage.removeItem(key());
      state = mergeState(null);
      save();
    }
  };

  // Public integration API for the parent platform.
  window.Primary1App = window.Primary1App || {};
  window.Primary1App.setStudent = setStudent;
  window.Primary1App.getProgress = () => structuredClone(state);
  window.Primary1App.mergeState = mergeState;
})();
