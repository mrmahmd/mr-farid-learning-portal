(() => {
'use strict';

const COURSE = window.COURSE;
const app = document.getElementById('app');
const studentId = new URLSearchParams(location.search).get('studentId') || 'guest';
const sampleMode = new URLSearchParams(location.search).get('sample') === '1';
const STORE = `primary2-complete-progress-v2:${studentId}`;
const OLD_STORE = `primary2-complete-progress-v1:${studentId}`;

const oldProgress = JSON.parse(localStorage.getItem(OLD_STORE) || '{}');
const storedProgress = JSON.parse(localStorage.getItem(STORE) || '{}');
const progress = {
  lessons: {},
  last: null,
  stars: 0,
  xp: 0,
  reviews: {},
  stations: {},
  rewardedQuestions: {},
  badges: [],
  ...oldProgress,
  ...storedProgress
};
progress.xp = Number(progress.xp || (progress.stars || 0) * 10);
progress.stations ||= {};
progress.rewardedQuestions ||= {};
progress.badges ||= [];

const state = {
  view: 'home',
  unitId: 1,
  lessonId: 1,
  station: 'map',
  qIndex: 0,
  bank: [],
  bankKey: '',
  score: 0,
  correct: 0,
  answered: false,
  isReview: false,
  reviewId: null,
  order: [],
  streak: 0,
  maxStreak: 0,
  hearts: 3,
  sessionXP: 0,
  answerTimer: null
};

const STATIONS = [
  { id: 'vocab', number: 1, icon: '🧠', title: 'Vocabulary Lab', subtitle: 'See, hear, and use every new word', tone: 'violet' },
  { id: 'explain', number: 2, icon: '💡', title: 'Explanation Station', subtitle: 'Learn the lesson points with clear examples', tone: 'blue' },
  { id: 'phonics', number: 3, icon: '🔤', title: 'Phonics Studio', subtitle: 'Listen, repeat, and spot the sound', tone: 'orange' },
  { id: 'reading', number: 4, icon: '📖', title: 'Reading & Listening', subtitle: 'Read the text and listen carefully', tone: 'green' },
  { id: 'writing', number: 5, icon: '✍️', title: 'Writing Workshop', subtitle: 'Use the lesson language in your own writing', tone: 'pink' },
  { id: 'practice', number: 6, icon: '🚀', title: 'Mission Challenge', subtitle: 'Win points, build a streak, and finish the lesson', tone: 'gold' }
];

const esc = value => String(value).replace(/[&<>"']/g, match => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[match]));

const save = () => {
  localStorage.setItem(STORE, JSON.stringify(progress));
  window.MrFaridCourseProgress?.queueSave?.();
};
const unit = id => COURSE.units.find(item => item.id === Number(id));
const lesson = (uid, lid) => unit(uid).lessons.find(item => item.id === Number(lid));
const lessonKey = (uid, lid) => `${uid}-${lid}`;
const stationKey = (uid, lid, station) => `${uid}-${lid}-${station}`;
const completedLessons = () => Object.values(progress.lessons).filter(item => item.completed).length;
const coursePercent = () => Math.round((completedLessons() / 24) * 100);
const level = () => Math.floor(progress.xp / 250) + 1;
const levelStart = () => (level() - 1) * 250;
const levelPercent = () => Math.min(100, Math.round(((progress.xp - levelStart()) / 250) * 100));

function speak(text) {
  if (!('speechSynthesis' in window)) {
    toast('Speech is not available in this browser.');
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.78;
  utterance.pitch = 1.06;
  speechSynthesis.speak(utterance);
}

function playTone(kind = 'success') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = kind === 'success' ? [523.25, 659.25, 783.99] : [220, 185];
    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = kind === 'success' ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + index * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.13, ctx.currentTime + index * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.09 + 0.22);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(ctx.currentTime + index * 0.09);
      oscillator.stop(ctx.currentTime + index * 0.09 + 0.24);
    });
    setTimeout(() => ctx.close(), 700);
  } catch (_) {}
}

function addBadge(id, title, icon) {
  if (progress.badges.some(badge => badge.id === id)) return false;
  progress.badges.push({ id, title, icon, earnedAt: new Date().toISOString() });
  save();
  return true;
}

function topbar() {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <button class="brand plain" onclick="App.home()" aria-label="Go to home">
          <span class="brand-mark">📘</span>
          <span class="brand-text"><strong>English Primary 2</strong><span>Term 1 • Learning Adventure</span></span>
        </button>
        <nav class="nav">
          <button class="nav-btn" onclick="App.home()">🏠 <span>Home</span></button>
          <button class="nav-btn" onclick="App.openReviews()">🏆 <span>Reviews</span></button>
          <button class="nav-btn" onclick="App.openGlossary()">📚 <span>Glossary</span></button>
          <button class="nav-btn teacher-nav" onclick="App.teacher()">👨‍🏫 <span>Meet Your Teacher</span></button>
        </nav>
        <div class="player-hud" title="Your learning level">
          <span class="level-orb">${level()}</span>
          <span class="hud-copy"><b>Level ${level()}</b><small>${progress.xp} XP</small></span>
          <span class="hud-star">⭐ ${progress.stars || 0}</span>
        </div>
      </div>
    </header>`;
}

function shell(content, className = '') {
  app.innerHTML = `
    <div class="app-shell ${className}">
      ${topbar()}
      <main class="main">${content}</main>
      <footer class="site-footer">
        <strong>Prepared and Designed by: Mr.Mohamed Farid</strong>
        <span>Interactive English learning for Primary 2</span>
      </footer>
    </div>`;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function imageStage(src, alt, className = '') {
  return `
    <div class="image-stage ${className}" style="--stage-image:url('${src}')">
      <div class="image-stage-blur" aria-hidden="true"></div>
      <img src="${src}" alt="${esc(alt)}" loading="lazy">
    </div>`;
}

function isUnitUnlocked(uid) {
  if (sampleMode) return Number(uid) === 1;
  if (uid === 1) return true;
  return unit(uid - 1).lessons.every(item => progress.lessons[lessonKey(uid - 1, item.id)]?.completed);
}

function isLessonUnlocked(uid, lid) {
  if (sampleMode) return Number(uid) === 1 && Number(lid) === 1;
  if (!isUnitUnlocked(uid)) return false;
  if (lid === 1) return true;
  return Boolean(progress.lessons[lessonKey(uid, lid - 1)]?.completed);
}

function home() {
  state.view = 'home';
  clearTimeout(state.answerTimer);

  const continueButton = progress.last
    ? `<button class="hero-button hero-button-secondary" onclick="App.openLesson(${progress.last.u},${progress.last.l},'map')">▶ Continue Unit ${progress.last.u}, Lesson ${progress.last.l}</button>`
    : '';

  const unitCards = COURSE.units.map(u => {
    const unlocked = isUnitUnlocked(u.id);
    const done = u.lessons.filter(l => progress.lessons[lessonKey(u.id, l.id)]?.completed).length;
    return `
      <article class="unit-journey-card ${unlocked ? '' : 'locked'}" style="--unit-color:${u.color}">
        ${unlocked ? '' : '<div class="unit-lock">🔒 Complete the previous unit</div>'}
        <div class="unit-card-art" onclick="${unlocked ? `App.openUnit(${u.id})` : `App.toast('Complete Unit ${u.id - 1} first.')`}">
          ${imageStage(`assets/images/${u.image}`, `Unit ${u.id}: ${u.title}`, 'unit-image-stage')}
          <span class="unit-ribbon">UNIT ${u.id}</span>
        </div>
        <div class="unit-card-copy">
          <div class="unit-title-row"><span class="unit-icon">${u.icon}</span><h3>${esc(u.title)}</h3></div>
          <p>${esc(u.summary)}</p>
          <div class="unit-facts"><span>📘 Pages ${u.pages}</span><span>✅ ${done}/4 lessons</span></div>
          <div class="quest-progress"><span style="width:${done / 4 * 100}%"></span></div>
          <button class="unit-enter" onclick="${unlocked ? `App.openUnit(${u.id})` : `App.toast('Complete Unit ${u.id - 1} first.')`}">${done === 4 ? 'Explore Again' : 'Enter Unit'} <b>→</b></button>
        </div>
      </article>`;
  }).join('');

  const badgePreview = progress.badges.length
    ? progress.badges.slice(-3).reverse().map(b => `<span class="mini-badge" title="${esc(b.title)}">${b.icon}</span>`).join('')
    : '<span class="no-badge">Complete missions to earn badges!</span>';

  shell(`
    <section class="home-hero">
      ${imageStage('assets/images/hero.png', 'English Primary 2 learning adventure', 'hero-image-stage')}
      <div class="home-hero-shade"></div>
      <div class="home-hero-copy">
        <span class="eyebrow">✨ A Complete Interactive Curriculum</span>
        <h1>Learn English.<br><em>Play. Win. Shine!</em></h1>
        <p>Six exciting units, clear lesson stations, colorful flashcards, listening, reading, writing, and skill challenges.</p>
        <div class="hero-buttons">
          <button class="hero-button" onclick="document.getElementById('units').scrollIntoView({behavior:'smooth'})">Start the Adventure 🚀</button>
          ${continueButton}
        </div>
      </div>
      <div class="hero-level-card">
        <span class="hero-level-number">${level()}</span>
        <div><b>Explorer Level</b><small>${progress.xp - levelStart()} / 250 XP to next level</small><div class="level-track"><span style="width:${levelPercent()}%"></span></div></div>
      </div>
    </section>

    <section class="dashboard-strip">
      <article><span>🎯</span><div><b>${coursePercent()}%</b><small>Course Progress</small></div></article>
      <article><span>✅</span><div><b>${completedLessons()}/24</b><small>Lessons Complete</small></div></article>
      <article><span>⭐</span><div><b>${progress.stars || 0}</b><small>Stars Collected</small></div></article>
      <article><span>🏅</span><div class="badge-preview">${badgePreview}</div></article>
    </section>

    <section class="quest-callout">
      <div class="quest-mascot">🦁</div>
      <div><span>TODAY'S QUEST</span><h2>Complete one learning station and collect XP!</h2><p>Every small step moves you closer to the next level.</p></div>
      <button onclick="document.getElementById('units').scrollIntoView({behavior:'smooth'})">Choose a Unit</button>
    </section>

    <section id="units" class="units-section">
      <div class="section-heading">
        <div><span class="section-kicker">YOUR LEARNING MAP</span><h2>Choose Your Next Unit</h2><p>Every unit opens into four lessons. Every lesson has six exciting stations.</p></div>
        <div class="section-count">6 Units • 24 Lessons</div>
      </div>
      <div class="units-journey-grid">${unitCards}</div>
    </section>
  `, 'home-view');
}

function openUnit(uid) {
  if (!isUnitUnlocked(uid)) {
    toast('This unit is available with the full subscription.');
    return;
  }
  state.view = 'unit';
  const u = unit(uid);
  const outcomes = Object.entries(u.outcomes).map(([skill, items]) => `
    <article class="outcome-card">
      <span>${skill === 'Speaking' ? '🗣️' : skill === 'Listening' ? '🎧' : skill === 'Reading' ? '📖' : '✍️'}</span>
      <h4>${esc(skill)}</h4>
      <ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
    </article>`).join('');

  const lessonCards = u.lessons.map(l => {
    const locked = !isLessonUnlocked(uid, l.id);
    const record = progress.lessons[lessonKey(uid, l.id)];
    const stationDone = STATIONS.slice(0, 5).filter(st => progress.stations[stationKey(uid, l.id, st.id)]).length;
    return `
      <article class="lesson-path-card ${locked ? 'locked' : ''}">
        <div class="lesson-path-number">${l.id}</div>
        <div class="lesson-path-icon">${l.icon}</div>
        <div class="lesson-path-copy">
          <span>Lesson ${l.id} • Pages ${l.pages}</span>
          <h3>${esc(l.title)}</h3>
          <p>${esc(l.focus)}</p>
          <div class="lesson-mini-track"><span style="width:${record?.completed ? 100 : stationDone * 20}%"></span></div>
          <small>${record?.completed ? 'Mission completed!' : `${stationDone}/5 study stations completed`}</small>
        </div>
        <button onclick="${locked ? `App.toast('Complete Lesson ${l.id - 1} first.')` : `App.openLesson(${uid},${l.id},'map')`}">${locked ? '🔒' : record?.completed ? 'Replay' : 'Start'} →</button>
      </article>`;
  }).join('');

  const challengeUnlocked = u.lessons.every(l => progress.lessons[lessonKey(uid, l.id)]?.completed);

  shell(`
    <section class="unit-hero" style="--unit-color:${u.color}">
      <div class="unit-hero-copy">
        <div class="breadcrumbs"><button onclick="App.home()">Home</button><span>›</span><b>Unit ${u.id}</b></div>
        <span class="unit-hero-label">UNIT ${u.id} ADVENTURE</span>
        <h1>${esc(u.title)}</h1>
        <p>${esc(u.summary)}</p>
        <div class="value-chip">💛 <b>Life Skill:</b> ${esc(u.value)}</div>
        <button class="hero-button" onclick="App.openLesson(${u.id},1,'map')">Start Lesson 1 🚀</button>
      </div>
      <div class="unit-hero-media">${imageStage(`assets/images/${u.image}`, `Unit ${u.id}: ${u.title}`, 'unit-hero-stage')}</div>
    </section>

    <section class="lesson-roadmap">
      <div class="section-heading compact"><div><span class="section-kicker">UNIT ROADMAP</span><h2>Four Lesson Adventures</h2><p>Open a lesson, travel through its stations, then finish the mission challenge.</p></div></div>
      <div class="lesson-path-list">${lessonCards}</div>
      <article class="unit-boss-card ${challengeUnlocked ? '' : 'locked'}">
        <span class="boss-icon">🏆</span>
        <div><span>FINAL UNIT MISSION</span><h2>Unit ${u.id} Boss Challenge</h2><p>30 carefully written questions covering the complete unit.</p></div>
        <button onclick="${challengeUnlocked ? `App.startChallenge(${u.id})` : `App.toast('Complete all four lessons first.')`}">${challengeUnlocked ? 'Start Challenge' : 'Locked'} →</button>
      </article>
    </section>

    <section class="outcomes-section">
      <div class="section-heading compact"><div><span class="section-kicker">WHAT YOU WILL LEARN</span><h2>Unit Skills</h2></div></div>
      <div class="outcomes-grid-new">${outcomes}</div>
    </section>
  `, 'unit-view');
}

function stationNav(uid, lid, active = 'map') {
  return `
    <div class="station-nav-shell">
      <button class="lesson-back" onclick="App.openUnit(${uid})">← Unit ${uid}</button>
      <button class="station-home ${active === 'map' ? 'active' : ''}" onclick="App.openLesson(${uid},${lid},'map')">🗺️ Lesson Map</button>
      <div class="station-nav-scroll">
        ${STATIONS.map(st => `<button class="station-nav-chip ${active === st.id ? 'active' : ''} ${progress.stations[stationKey(uid,lid,st.id)] ? 'done' : ''}" onclick="App.openLesson(${uid},${lid},'${st.id}')"><span>${st.icon}</span><b>${st.number}</b></button>`).join('')}
      </div>
    </div>`;
}

function lessonHeader(u, l, active) {
  const station = STATIONS.find(item => item.id === active);
  return `
    ${stationNav(u.id, l.id, active)}
    <section class="station-header" style="--unit-color:${u.color}">
      <div class="station-header-copy">
        <span>UNIT ${u.id} • LESSON ${l.id} • BOOK PAGES ${l.pages}</span>
        <h1>${station ? `${station.icon} ${station.title}` : esc(l.title)}</h1>
        <p>${station ? station.subtitle : esc(l.focus)}</p>
      </div>
      <div class="station-header-badge">${l.icon}</div>
    </section>`;
}

function openLesson(uid, lid, station = 'map') {
  if (!isLessonUnlocked(uid, lid)) {
    toast('This lesson is locked. Complete the previous lesson first.');
    return;
  }
  clearTimeout(state.answerTimer);
  state.unitId = Number(uid);
  state.lessonId = Number(lid);
  state.station = station;
  progress.last = { u: Number(uid), l: Number(lid) };
  const activityLesson = lesson(uid, lid);
  progress.portalLastActivity = {
    detail: `Unit ${uid}, Lesson ${lid}: ${activityLesson.title} • ${station === 'practice' ? 'Mission Challenge' : 'Learning station'}`,
    path: `lesson-${uid}-${lid}-${station}`,
  };
  save();

  const u = unit(uid);
  const l = lesson(uid, lid);

  if (station === 'map') return renderLessonMap(u, l);
  if (station === 'vocab') return renderVocabulary(u, l);
  if (station === 'explain') return renderExplanation(u, l);
  if (station === 'phonics') return renderPhonics(u, l);
  if (station === 'reading') return renderReading(u, l);
  if (station === 'writing') return renderWriting(u, l);
  if (station === 'practice') return startBank(l.questions, false, `lesson-${uid}-${lid}`);
}

function renderLessonMap(u, l) {
  const stationCards = STATIONS.map(st => {
    const done = Boolean(progress.stations[stationKey(u.id, l.id, st.id)]) || (st.id === 'practice' && progress.lessons[lessonKey(u.id,l.id)]?.completed);
    return `
      <article class="station-card tone-${st.tone} ${done ? 'completed' : ''}" onclick="App.openLesson(${u.id},${l.id},'${st.id}')">
        <span class="station-step">STATION ${st.number}</span>
        <div class="station-card-icon">${st.icon}</div>
        <h3>${st.title}</h3>
        <p>${st.subtitle}</p>
        <div class="station-card-footer"><span>${done ? '✅ Complete' : st.id === 'practice' ? '🏆 25 Questions' : '+20 XP'}</span><button>${done ? 'Replay' : 'Enter'} →</button></div>
      </article>`;
  }).join('');

  const doneCount = STATIONS.filter(st => progress.stations[stationKey(u.id,l.id,st.id)] || (st.id === 'practice' && progress.lessons[lessonKey(u.id,l.id)]?.completed)).length;

  shell(`
    ${stationNav(u.id, l.id, 'map')}
    <section class="lesson-map-hero" style="--unit-color:${u.color}">
      <div class="lesson-map-media">${imageStage(`assets/images/${u.image}`, `${l.title} lesson`, 'lesson-map-stage')}</div>
      <div class="lesson-map-copy">
        <span class="lesson-map-label">UNIT ${u.id} • LESSON ${l.id}</span>
        <h1>${l.icon} ${esc(l.title)}</h1>
        <p>${esc(l.focus)}</p>
        <div class="lesson-map-progress"><div><b>${doneCount}/6</b><span>Stations complete</span></div><div class="map-track"><span style="width:${doneCount/6*100}%"></span></div></div>
        <div class="lesson-reward"><span>🎁</span><div><b>Lesson Reward</b><small>Complete the mission to earn a badge and unlock the next lesson.</small></div></div>
      </div>
    </section>

    <section class="stations-section">
      <div class="section-heading compact"><div><span class="section-kicker">CHOOSE A STATION</span><h2>Your Lesson Adventure</h2><p>Each station opens on its own screen with large, clear content.</p></div></div>
      <div class="stations-grid">${stationCards}</div>
    </section>
  `, 'lesson-map-view');
}

function renderVocabulary(u, l) {
  const colors = ['violet','sky','mint','sun','coral','blue','pink','lime'];
  const cards = l.vocab.map((v, index) => `
    <article class="flashcard flash-${colors[index % colors.length]}">
      <button class="flash-audio" onclick="App.say('${encodeURIComponent(v[0])}')" aria-label="Listen to ${esc(v[0])}">🔊</button>
      <div class="flash-visual">${v[1]}</div>
      <h3>${esc(v[0])}</h3>
      <p>${esc(v[2].replace('___', `<strong>${v[0]}</strong>`)).replace('&lt;strong&gt;', '<strong>').replace('&lt;/strong&gt;', '</strong>')}</p>
      <button class="flash-say" onclick="App.say('${encodeURIComponent(v[0])}')">Listen & Repeat</button>
    </article>`).join('');

  shell(`
    ${lessonHeader(u, l, 'vocab')}
    <section class="station-content vocab-station">
      <div class="station-intro"><div><span>🧠 VOCABULARY LAB</span><h2>All New Words on One Page</h2><p>Look at the picture, read the word, then press the sound button and repeat.</p></div><div class="word-count">${l.vocab.length}<small>New Words</small></div></div>
      <div class="flashcards-grid">${cards}</div>
      ${stationFinish(u.id, l.id, 'vocab', 'explain', 'I learned the words!')}
    </section>
  `, 'station-view');
}

function patternExplanation(pattern) {
  const p = pattern.toLowerCase();
  if (p.startsWith('this is')) return ['Use “This is…” to point to one person or thing near you.', 'This is + a/an + thing'];
  if (p.startsWith('that is')) return ['Use “That is…” to point to one person or thing farther away.', 'That is + a/an + thing'];
  if (p.startsWith('there is')) return ['Use “There is…” when you talk about one thing in a place.', 'There is + one thing + place'];
  if (p.startsWith('there are')) return ['Use “There are…” when you talk about more than one thing.', 'There are + plural things + place'];
  if (p.startsWith('what color')) return ['Use this question to ask about a color.', 'What color is + thing?'];
  if (p.startsWith('how many')) return ['Use this question to ask about a number.', 'How many + plural noun + do you have?'];
  if (p.startsWith('who')) return ['Use “Who…?” to ask about a person.', 'Who is this?'];
  if (p.startsWith('what do')) return ['Use this question to ask about an action or routine.', 'What do you do?'];
  if (/^(open|close|stand|sit|raise|read|write|draw|color|clean|play|sing)/i.test(pattern)) return ['This is an instruction. Start with the action word.', 'Action word + object'];
  if (p.includes('my ')) return ['“My” shows that something belongs to me.', 'my + person / thing'];
  if (p.includes('your ')) return ['“Your” shows that something belongs to the person I am speaking to.', 'your + person / thing'];
  if (p.startsWith('i ')) return ['Use “I” to talk about yourself and what you do.', 'I + action / description'];
  if (p.startsWith('he ') || p.startsWith('she ')) return ['Use “He” for a boy or man and “She” for a girl or woman.', 'He/She + action'];
  return ['Learn the sentence as a useful language pattern, then change one word to make a new sentence.', 'Keep the same pattern and replace the key word'];
}

function highlightPattern(pattern) {
  const words = pattern.split(' ');
  if (words.length < 2) return esc(pattern);
  return `<mark>${esc(words.slice(0, Math.min(2, words.length)).join(' '))}</mark> ${esc(words.slice(Math.min(2, words.length)).join(' '))}`;
}

function renderExplanation(u, l) {
  const patternCards = l.patterns.map((pattern, index) => {
    const [explanation, formula] = patternExplanation(pattern);
    return `
      <article class="explanation-card">
        <div class="explanation-number">${index + 1}</div>
        <div class="explanation-main">
          <span class="example-label">MODEL SENTENCE</span>
          <h3>${highlightPattern(pattern)}</h3>
          <p>${esc(explanation)}</p>
          <div class="pattern-formula">🧩 ${esc(formula)}</div>
        </div>
        <button class="speak-circle" onclick="App.say('${encodeURIComponent(pattern)}')">🔊</button>
      </article>`;
  }).join('');

  const activities = l.activities.map((activity, index) => `<li><span>${index + 1}</span>${esc(activity)}</li>`).join('');

  shell(`
    ${lessonHeader(u, l, 'explain')}
    <section class="station-content explanation-station">
      <div class="focus-banner"><span>🎯</span><div><b>Lesson Focus</b><h2>${esc(l.focus)}</h2></div></div>
      <div class="explanation-title"><span>💡 EXPLANATION STATION</span><h2>Learn the Lesson Points</h2><p>Every point is shown in a large card with an example, a simple rule, and audio.</p></div>
      <div class="explanation-list">${patternCards}</div>
      <article class="practice-tips-card"><div><span>👨‍🏫</span><h2>Teacher's Practice Steps</h2></div><ol>${activities}</ol></article>
      ${stationFinish(u.id, l.id, 'explain', 'phonics', 'The lesson points are clear!')}
    </section>
  `, 'station-view');
}

function renderPhonics(u, l) {
  const wordCards = l.phonics.words.map((word, index) => `
    <button class="phonics-word-card" onclick="App.say('${encodeURIComponent(word)}')">
      <span class="phonics-letter">${esc(word.charAt(0).toUpperCase())}</span>
      <strong>${esc(word)}</strong>
      <small>Tap to listen 🔊</small>
    </button>`).join('');

  shell(`
    ${lessonHeader(u, l, 'phonics')}
    <section class="station-content phonics-station">
      <article class="sound-hero">
        <div class="sound-waves"><i></i><i></i><i></i><i></i></div>
        <div><span>TODAY'S SOUND</span><h2>${esc(l.phonics.title)}</h2><p>Listen carefully. Say the words slowly. Notice where the sound appears.</p></div>
        <button onclick="App.say('${encodeURIComponent(l.phonics.words.join('. '))}')">▶ Play All Words</button>
      </article>
      <div class="phonics-words-grid">${wordCards}</div>
      <article class="phonics-routine"><h2>👄 Listen → Repeat → Read</h2><div><span>1</span><p>Press the sound button.</p></div><div><span>2</span><p>Repeat the word two times.</p></div><div><span>3</span><p>Read it alone without the sound.</p></div></article>
      ${stationFinish(u.id, l.id, 'phonics', 'reading', 'I can hear the sound!')}
    </section>
  `, 'station-view');
}

function sentenceSegments(text) {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean).map((sentence, index) => `
    <button onclick="App.say('${encodeURIComponent(sentence)}')"><span>${index + 1}</span>${esc(sentence)}<b>🔊</b></button>`).join('');
}

function renderReading(u, l) {
  shell(`
    ${lessonHeader(u, l, 'reading')}
    <section class="station-content reading-station">
      <div class="reading-layout">
        <article class="reading-story-card">
          <div class="reading-card-top"><span>📖 READ WITH ME</span><button onclick="App.say('${encodeURIComponent(l.reading)}')">▶ Listen to the Whole Text</button></div>
          <h2>${esc(l.title)}</h2>
          <p class="reading-big-text">${esc(l.reading)}</p>
          <div class="reading-sentence-list">${sentenceSegments(l.reading)}</div>
        </article>
        <aside class="reading-coach">
          <div class="coach-avatar">🦉</div>
          <h3>Reading Coach</h3>
          <p>Point to each word while you listen. Then read one sentence at a time.</p>
          <div class="coach-step"><span>1</span>Listen to the full text.</div>
          <div class="coach-step"><span>2</span>Listen to each sentence.</div>
          <div class="coach-step"><span>3</span>Read it by yourself.</div>
        </aside>
      </div>
      ${stationFinish(u.id, l.id, 'reading', 'writing', 'I read the text!')}
    </section>
  `, 'station-view');
}

function renderWriting(u, l) {
  const key = `writing-${u.id}-${l.id}`;
  const saved = localStorage.getItem(key) || '';
  const labels = localStorage.getItem(`${key}-labels`) || '';
  shell(`
    ${lessonHeader(u, l, 'writing')}
    <section class="station-content writing-station">
      <div class="writing-layout-new">
        <article class="writing-task-card">
          <span>✍️ YOUR WRITING MISSION</span>
          <h2>${esc(l.writing)}</h2>
          <div class="useful-language"><b>Useful Language</b>${l.patterns.map(p => `<button onclick="App.say('${encodeURIComponent(p)}')">🔊 ${esc(p)}</button>`).join('')}</div>
        </article>
        <article class="writing-editor-card">
          <div class="editor-toolbar"><span>My Writing</span><small>Saved on this device</small></div>
          <textarea id="writingArea" spellcheck="true" placeholder="Start writing here…">${esc(saved)}</textarea>
          <label class="labels-field"><span>🏷️ Picture labels or key words</span><input id="labels" value="${esc(labels)}" placeholder="Example: chair, desk, book"></label>
          <div class="editor-actions"><button class="save-writing" onclick="App.saveWriting(${u.id},${l.id})">💾 Save My Work</button><button onclick="App.clearWriting(${u.id},${l.id})">Clear</button></div>
        </article>
      </div>
      ${stationFinish(u.id, l.id, 'writing', 'practice', 'My writing is ready!')}
    </section>
  `, 'station-view');
}

function stationFinish(uid, lid, current, next, label) {
  const done = progress.stations[stationKey(uid,lid,current)];
  return `
    <div class="station-finish-box ${done ? 'already-done' : ''}">
      <div><span>${done ? '✅' : '🎁'}</span><div><b>${done ? 'Station Completed' : 'Collect Your Station Reward'}</b><p>${done ? 'You can replay this station any time.' : 'Finish this station to earn 20 XP and 2 stars.'}</p></div></div>
      <button onclick="App.completeStation(${uid},${lid},'${current}','${next}')">${done ? `Next Station →` : `${esc(label)} +20 XP`}</button>
    </div>`;
}

function completeStation(uid, lid, current, next) {
  const key = stationKey(uid, lid, current);
  if (!progress.stations[key]) {
    progress.stations[key] = true;
    progress.xp += 20;
    progress.stars += 2;
    save();
    playTone('success');
    celebrate('Station Complete!', 'Amazing work! You earned 20 XP and 2 stars.', '+20 XP', '🚀');
    setTimeout(() => openLesson(uid, lid, next), 1650);
  } else {
    openLesson(uid, lid, next);
  }
}

function saveWriting(uid, lid) {
  localStorage.setItem(`writing-${uid}-${lid}`, document.getElementById('writingArea').value);
  localStorage.setItem(`writing-${uid}-${lid}-labels`, document.getElementById('labels').value);
  toast('Your writing has been saved. Great work!');
  playTone('success');
}

function clearWriting(uid, lid) {
  document.getElementById('writingArea').value = '';
  document.getElementById('labels').value = '';
  saveWriting(uid, lid);
}

function startBank(bank, isReview, bankKey, reviewId = null) {
  clearTimeout(state.answerTimer);
  state.bank = bank;
  state.bankKey = bankKey;
  state.qIndex = 0;
  state.score = 0;
  state.correct = 0;
  state.answered = false;
  state.isReview = isReview;
  state.reviewId = reviewId;
  state.order = [];
  state.streak = 0;
  state.maxStreak = 0;
  state.hearts = 3;
  state.sessionXP = 0;
  renderQuestion();
}

function startChallenge(uid) {
  if (sampleMode) {
    toast('The unit challenge is available with the full subscription.');
    return;
  }
  state.unitId = Number(uid);
  state.lessonId = 0;
  startBank(unit(uid).challenge, true, `unit-${uid}`, `unit-${uid}`);
}

function startReview(id) {
  if (sampleMode) {
    toast('Book reviews are available with the full subscription.');
    return;
  }
  const review = COURSE.reviews.find(item => item.id === id);
  startBank(review.questions, true, id, id);
}

function practiceTitle() {
  if (!state.isReview) return `Unit ${state.unitId} • Lesson ${state.lessonId} Mission`;
  if (state.reviewId?.startsWith('unit-')) return `Unit ${state.unitId} Boss Challenge`;
  return COURSE.reviews.find(r => r.id === state.reviewId)?.title || 'Course Review';
}

function optionButtons(q) {
  const letters = ['A','B','C','D'];
  return `<div class="game-options">${q.options.map((option, index) => `
    <button class="option-btn" data-value="${encodeURIComponent(option)}" onclick="App.choose('${encodeURIComponent(option)}')">
      <span class="option-letter">${letters[index]}</span><span class="option-text">${esc(option)}</span><span class="option-state"></span>
    </button>`).join('')}</div>`;
}

function questionBody(q) {
  if (['mcq','picture','listen','truefalse'].includes(q.type)) {
    return `
      ${q.visual ? `<div class="question-visual"><span>${q.visual}</span></div>` : ''}
      ${q.type === 'listen' ? `<button class="audio-mission-btn" onclick="App.say('${encodeURIComponent(q.speak)}')"><span>🎧</span><div><b>Play Audio</b><small>Listen carefully, then choose.</small></div></button>` : ''}
      ${optionButtons(q)}`;
  }
  if (q.type === 'order') {
    return `
      <div class="sentence-builder-zone">
        <div class="answer-bank" id="answerBank"><span>Tap the words to build the sentence here.</span></div>
        <div class="word-bank" id="wordBank">${q.words.map((word, index) => `<button onclick="App.addWord(${index},'${encodeURIComponent(word)}')">${esc(word)}</button>`).join('')}</div>
        <button class="check-answer-btn" onclick="App.checkOrder()">Check My Sentence ✓</button>
      </div>`;
  }
  if (q.type === 'spelling') {
    return `
      <div class="spelling-zone">
        <div class="scrambled-word">${esc(q.scrambled.split('').join('  '))}</div>
        <label><span>Type the correct word</span><input class="answer-input" id="textAnswer" autocomplete="off" placeholder="Write your answer"></label>
        <button class="check-answer-btn" onclick="App.checkText()">Check My Word ✓</button>
      </div>`;
  }
  return '';
}

function renderQuestion() {
  const q = state.bank[state.qIndex];
  if (!q) return finishBank();
  const title = practiceTitle();
  const percent = Math.round((state.qIndex / state.bank.length) * 100);
  const exitAction = state.isReview ? 'App.home()' : `App.openLesson(${state.unitId},${state.lessonId},'map')`;
  const source = q.source ? `<span class="question-source">${esc(q.source)}</span>` : '';

  shell(`
    <section class="game-arena">
      <header class="game-topbar">
        <button onclick="${exitAction}">✕ Exit</button>
        <div class="game-progress"><div><b>${esc(title)}</b><span>Question ${state.qIndex + 1} of ${state.bank.length}</span></div><div class="game-track"><span style="width:${percent}%"></span></div></div>
        <div class="game-stats"><span class="heart-stat">${'❤️'.repeat(Math.max(0,state.hearts))}${'🤍'.repeat(Math.max(0,3-state.hearts))}</span><span class="streak-stat">🔥 ${state.streak}</span><span class="score-stat">⭐ ${state.score}</span></div>
      </header>

      <div class="arena-scene">
        <aside class="mission-guide"><div class="guide-avatar">🦊</div><span>MISSION GUIDE</span><h3>${state.streak >= 3 ? 'You are on fire!' : 'Think carefully!'}</h3><p>${state.streak >= 3 ? `Amazing ${state.streak}-answer streak. Keep going!` : 'Read the question, then choose the best answer.'}</p><div class="session-xp">+${state.sessionXP} XP this mission</div></aside>
        <article class="game-question-card" id="questionCard">
          <div class="question-meta"><span class="question-category">${esc(q.category || q.type)}</span>${source}</div>
          <h1>${esc(q.prompt)}</h1>
          ${questionBody(q)}
          <div id="feedback" class="feedback-slot"></div>
        </article>
      </div>
    </section>
  `, 'game-view');
}

function choose(value) {
  check(decodeURIComponent(value), value);
}

function checkText() {
  const input = document.getElementById('textAnswer');
  if (!input || !input.value.trim()) return toast('Type your answer first.');
  check(input.value.trim());
}

function refreshOrder() {
  const answerBank = document.getElementById('answerBank');
  const buttons = [...document.querySelectorAll('#wordBank button')];
  if (!answerBank) return;
  answerBank.innerHTML = state.order.length
    ? state.order.map((item,index) => `<button class="chosen-word" onclick="App.removeWord(${index})">${esc(item.word)} <span>×</span></button>`).join('')
    : '<span>Tap the words to build the sentence here.</span>';
  const used = new Set(state.order.map(item => item.index));
  buttons.forEach((button,index) => { button.disabled = used.has(index); });
}

function addWord(index, value) {
  if (state.answered) return;
  state.order.push({ index, word: decodeURIComponent(value) });
  refreshOrder();
}

function removeWord(index) {
  if (state.answered) return;
  state.order.splice(index, 1);
  refreshOrder();
}

function checkOrder() {
  if (!state.order.length) return toast('Build the sentence first.');
  check(state.order.map(item => item.word).join(' '));
}

function normalize(value) {
  return String(value).toLowerCase().replace(/[?.!,”“"']/g, '').replace(/\s+/g, ' ').trim();
}

function markOptions(choice, answer) {
  document.querySelectorAll('.option-btn').forEach(button => {
    const value = decodeURIComponent(button.dataset.value);
    button.disabled = true;
    if (normalize(value) === normalize(answer)) button.classList.add('correct-option');
    if (choice && normalize(value) === normalize(choice) && normalize(choice) !== normalize(answer)) button.classList.add('wrong-option');
  });
}

function rewardForQuestion() {
  const key = `${state.bankKey}:${state.qIndex}`;
  if (progress.rewardedQuestions[key]) return 0;
  const reward = 10 + Math.min(state.streak * 2, 10);
  progress.rewardedQuestions[key] = true;
  progress.xp += reward;
  progress.stars += 1;
  state.sessionXP += reward;
  save();
  return reward;
}

function check(choice) {
  if (state.answered) return;
  const q = state.bank[state.qIndex];
  const correct = normalize(choice) === normalize(q.answer);
  state.answered = true;
  clearTimeout(state.answerTimer);

  const feedback = document.getElementById('feedback');
  const card = document.getElementById('questionCard');
  markOptions(choice, q.answer);

  if (correct) {
    state.score += 10;
    state.correct += 1;
    state.streak += 1;
    state.maxStreak = Math.max(state.maxStreak, state.streak);
    const reward = rewardForQuestion();
    playTone('success');
    card?.classList.add('correct-pulse');

    let title = 'Excellent!';
    let emoji = '🌟';
    if (state.streak >= 10) { title = 'Unstoppable!'; emoji = '🔥'; addBadge('streak-10','Unstoppable: 10 Correct in a Row','🔥'); }
    else if (state.streak >= 5) { title = 'Super Streak!'; emoji = '⚡'; addBadge('streak-5','Super Streak: 5 Correct in a Row','⚡'); }
    else if (state.streak >= 3) { title = 'On Fire!'; emoji = '🚀'; addBadge('streak-3','Hot Streak: 3 Correct in a Row','🚀'); }

    feedback.innerHTML = `
      <div class="answer-feedback correct-feedback">
        <div class="feedback-icon">${emoji}</div>
        <div><strong>${title}</strong><p>${esc(q.explanation)}</p><small>${reward ? `You earned +${reward} XP.` : 'Replay answer: XP was already collected.'}</small></div>
        <button onclick="App.nextQuestion()">Next →</button>
      </div>`;
    celebrate(title, state.streak > 1 ? `${state.streak} correct answers in a row!` : 'Brilliant answer!', reward ? `+${reward} XP` : 'Correct!', emoji);
    state.answerTimer = setTimeout(() => { if (state.answered) nextQuestion(); }, 5000);
  } else {
    state.hearts = Math.max(0, state.hearts - 1);
    state.streak = 0;
    playTone('wrong');
    card?.classList.add('wrong-shake');
    feedback.innerHTML = `
      <div class="answer-feedback wrong-feedback">
        <div class="feedback-icon">💡</div>
        <div><strong>Good try — now you know!</strong><p>The correct answer is <b>${esc(q.answer)}</b>.</p><small>${esc(q.explanation)}</small></div>
        <button onclick="App.nextQuestion()">Got it →</button>
      </div>`;
  }
}

function nextQuestion() {
  clearTimeout(state.answerTimer);
  state.qIndex += 1;
  state.answered = false;
  state.order = [];
  renderQuestion();
}

function finishBank() {
  clearTimeout(state.answerTimer);
  const max = state.bank.length * 10;
  const percent = Math.round((state.score / max) * 100);

  if (!state.isReview) {
    const key = lessonKey(state.unitId, state.lessonId);
    const previous = progress.lessons[key];
    progress.lessons[key] = {
      completed: true,
      score: Math.max(state.score, previous?.score || 0),
      total: max,
      completedAt: new Date().toISOString()
    };
    progress.stations[stationKey(state.unitId,state.lessonId,'practice')] = true;
    addBadge(`lesson-${key}`, `Unit ${state.unitId} Lesson ${state.lessonId} Hero`, '🏅');
  } else if (state.reviewId) {
    const previous = progress.reviews[state.reviewId];
    progress.reviews[state.reviewId] = {
      completed: true,
      score: Math.max(state.score, previous?.score || 0),
      total: max,
      completedAt: new Date().toISOString()
    };
    if (state.reviewId.startsWith('unit-')) addBadge(`boss-${state.reviewId}`, `${practiceTitle()} Champion`, '🏆');
  }
  save();

  const stars = percent >= 90 ? 3 : percent >= 70 ? 2 : 1;
  const nextButton = !state.isReview
    ? (state.lessonId < 4
      ? `<button class="finish-primary" onclick="App.openLesson(${state.unitId},${state.lessonId + 1},'map')">Next Lesson Adventure →</button>`
      : `<button class="finish-primary" onclick="App.openUnit(${state.unitId})">Return to Unit Map →</button>`)
    : `<button class="finish-primary" onclick="App.home()">Return Home →</button>`;

  playTone('success');
  shell(`
    <section class="mission-complete-screen">
      <div class="finish-confetti-bg"></div>
      <div class="finish-trophy">🏆</div>
      <span class="finish-label">MISSION COMPLETE</span>
      <h1>${percent >= 90 ? 'Outstanding Work!' : percent >= 70 ? 'Great Job!' : 'Mission Completed!'}</h1>
      <div class="finish-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
      <p>You completed <b>${esc(practiceTitle())}</b>.</p>
      <div class="finish-stat-grid">
        <article><span>🎯</span><b>${state.correct}/${state.bank.length}</b><small>Correct Answers</small></article>
        <article><span>📊</span><b>${percent}%</b><small>Accuracy</small></article>
        <article><span>🔥</span><b>${state.maxStreak}</b><small>Best Streak</small></article>
        <article><span>⚡</span><b>+${state.sessionXP}</b><small>XP Earned</small></article>
      </div>
      <div class="finish-actions">${nextButton}<button onclick="${state.isReview ? 'App.openReviews()' : `App.openLesson(${state.unitId},${state.lessonId},'map')`}">Replay / Review</button></div>
    </section>
  `, 'finish-view');
}

function celebrate(title, subtitle, points, emoji) {
  document.getElementById('celebration')?.remove();
  const colors = ['#ffcf33','#ff5c8a','#6b5cff','#31c985','#26a7ff','#ff8a34'];
  const confetti = Array.from({ length: 38 }, (_, index) => {
    const left = Math.round(Math.random() * 100);
    const delay = (Math.random() * 0.4).toFixed(2);
    const rotate = Math.round(Math.random() * 360);
    return `<i style="left:${left}%;--delay:${delay}s;--rotate:${rotate}deg;--confetti:${colors[index % colors.length]}"></i>`;
  }).join('');
  document.body.insertAdjacentHTML('beforeend', `
    <div class="celebration" id="celebration">
      <div class="confetti-rain">${confetti}</div>
      <div class="celebration-card"><span>${emoji}</span><b>${esc(title)}</b><p>${esc(subtitle)}</p><strong>${esc(points)}</strong></div>
    </div>`);
  setTimeout(() => document.getElementById('celebration')?.remove(), 1550);
}

function openReviews() {
  if (sampleMode) {
    toast('Book reviews are available with the full subscription.');
    return;
  }
  const cards = COURSE.reviews.map((review, index) => {
    const record = progress.reviews[review.id];
    return `
      <article class="review-adventure-card review-${index + 1}">
        <span class="review-icon">${index ? '🚀' : '🏰'}</span>
        <div><small>BOOK PAGES ${review.pages}</small><h2>${esc(review.title)}</h2><p>50 carefully written questions covering vocabulary, language, phonics, listening, reading, and sentence building.</p><div class="review-status">${record?.completed ? `✅ Best score: ${record.score}/${record.total}` : '🎯 Ready to start'}</div></div>
        <button onclick="App.startReview('${review.id}')">${record?.completed ? 'Replay Review' : 'Start Review'} →</button>
      </article>`;
  }).join('');
  shell(`
    <section class="simple-page-hero"><span>🏆 COURSE CHALLENGES</span><h1>Book Reviews</h1><p>Use these two major missions to review everything you learned.</p></section>
    <section class="reviews-adventure-grid">${cards}</section>
  `, 'reviews-view');
}

function openGlossary() {
  const cards = COURSE.glossary.map(([word, meaning], index) => `
    <article class="glossary-card" data-search="${esc(`${word} ${meaning}`.toLowerCase())}">
      <button onclick="App.say('${encodeURIComponent(word)}')">🔊</button><strong>${esc(word)}</strong><p>${esc(meaning)}</p>
    </article>`).join('');
  shell(`
    <section class="simple-page-hero"><span>📚 WORD LIBRARY</span><h1>Course Glossary</h1><p>Search, read, and listen to the important words from all six units.</p></section>
    <div class="glossary-search"><span>🔎</span><input id="glossarySearch" oninput="App.filterGlossary()" placeholder="Search for a word or meaning…"></div>
    <section class="glossary-card-grid" id="glossaryGrid">${cards}</section>
  `, 'glossary-view');
}

function filterGlossary() {
  const query = document.getElementById('glossarySearch').value.toLowerCase().trim();
  document.querySelectorAll('.glossary-card').forEach(card => {
    card.style.display = card.dataset.search.includes(query) ? '' : 'none';
  });
}

function teacher() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-backdrop" id="modal" onclick="if(event.target===this)App.closeModal()">
      <div class="teacher-modal">
        <button class="modal-close" onclick="App.closeModal()">✕</button>
        <div class="teacher-avatar-large">👨‍🏫</div>
        <div><span>MEET YOUR TEACHER</span><h2>Mr.Mohamed Farid</h2><h3>Senior English Instructor</h3><p>BA & Education — Faculty of Education, Mansoura University — 2007.</p><p>This platform turns the complete Primary 2 curriculum into large, clear learning stations and engaging, lesson-specific challenges.</p></div>
      </div>
    </div>`);
}

function closeModal() {
  document.getElementById('modal')?.remove();
}

function toast(message) {
  document.querySelector('.toast')?.remove();
  const element = document.createElement('div');
  element.className = 'toast';
  element.innerHTML = `<span>💬</span>${esc(message)}`;
  document.body.appendChild(element);
  setTimeout(() => element.remove(), 2800);
}

function say(value) {
  speak(decodeURIComponent(value));
}

window.App = {
  home,
  openUnit,
  openLesson,
  completeStation,
  startChallenge,
  startReview,
  openReviews,
  openGlossary,
  filterGlossary,
  teacher,
  closeModal,
  toast,
  say,
  choose,
  checkText,
  addWord,
  removeWord,
  checkOrder,
  nextQuestion,
  saveWriting,
  clearWriting
};

window.Primary2Store = {
  getState: () => progress,
  replaceState: next => {
    if (!next) return;
    Object.assign(progress, next, {
      lessons: { ...(progress.lessons || {}), ...(next.lessons || {}) },
      reviews: { ...(progress.reviews || {}), ...(next.reviews || {}) },
      stations: { ...(progress.stations || {}), ...(next.stations || {}) },
      rewardedQuestions: { ...(progress.rewardedQuestions || {}), ...(next.rewardedQuestions || {}) },
      badges: next.badges || progress.badges || [],
    });
    if (state.view === 'home') home();
  },
  setSyncStatus: () => {},
};

home();
})();
