(() => {
  'use strict';

  const DEFAULT = {
    studentId: 'guest',
    studentName: 'Champion',
    points: 0,
    coins: 250,
    gems: 5,
    level: 1,
    xp: 0,
    badges: [],
    completedGames: {},
    bestScores: {},
    lastRoute: '#home',
    streak: 1,
    sound: true,
    unlockedUnits: [1],
    dailyChallengeDate: '',
    dailyChallengeClaimed: false
  };

  const getIdentity = () => {
    const params = new URLSearchParams(location.search);
    const platform = window.PLATFORM_STUDENT || {};
    return {
      studentId: params.get('studentId') || params.get('sid') || platform.studentId || localStorage.getItem('primary3GameStudentId') || 'guest',
      studentName: params.get('studentName') || params.get('name') || platform.studentName || localStorage.getItem('primary3GameStudentName') || 'Champion'
    };
  };

  const key = () => `english-primary3-game-world:${getIdentity().studentId}`;

  let currentState;
  const load = () => {
    let data = {};
    try { data = JSON.parse(localStorage.getItem(key()) || '{}'); } catch (_) { data = {}; }
    const identity = getIdentity();
    currentState = { ...DEFAULT, ...data, ...identity };
    return currentState;
  };

  const save = (state) => {
    currentState = state;
    localStorage.setItem(key(), JSON.stringify(state));
    localStorage.setItem('primary3GameStudentId', state.studentId || 'guest');
    localStorage.setItem('primary3GameStudentName', state.studentName || 'Champion');
    window.MrFaridCourseProgress?.queueSave();
    return state;
  };

  const xpForLevel = (level) => 500 + Math.max(0, level - 1) * 180;

  const addRewards = (state, { points = 0, coins = 0, gems = 0, xp = 0, badge = null } = {}) => {
    state.points += points;
    state.coins += coins;
    state.gems += gems;
    state.xp += xp;
    if (badge && !state.badges.includes(badge)) state.badges.push(badge);
    while (state.xp >= xpForLevel(state.level)) {
      state.xp -= xpForLevel(state.level);
      state.level += 1;
      state.gems += 2;
    }
    return save(state);
  };

  const markGameComplete = (state, gameId, score, reward) => {
    const firstTime = !state.completedGames[gameId];
    state.completedGames[gameId] = true;
    state.bestScores[gameId] = Math.max(score || 0, state.bestScores[gameId] || 0);
    if (firstTime) {
      addRewards(state, { points: reward, coins: Math.round(reward * 0.55), xp: reward, badge: score >= 90 ? 'Perfect Game' : null });
    } else {
      save(state);
    }
    return firstTime;
  };

  const setLastRoute = (state, route) => { state.lastRoute = route; state.portalLastActivity = { detail: `English Primary 3 Game World · ${String(route || '#home').replace('#', '')}` }; save(state); };
  const reset = () => { localStorage.removeItem(key()); return load(); };

  window.GameStorage = { load, save, addRewards, markGameComplete, setLastRoute, reset, xpForLevel };
  window.MrFaridCourseProgress?.connect({
    courseId: 'english-primary-3-game-world',
    getState: () => currentState || load(),
    setState: (next) => { currentState = { ...DEFAULT, ...next, ...getIdentity() }; save(currentState); },
    mergeState: (local, remote) => ({ ...DEFAULT, ...(local || {}), ...(remote || {}), ...getIdentity() }),
    onStatus: (info) => window.dispatchEvent(new CustomEvent('p3-game-cloud-status', { detail: info }))
  }).then((result) => {
    if (!result?.connected) window.top.location.href = new URL('../../login/', window.location.href).href;
  }).catch(() => {});
})();
