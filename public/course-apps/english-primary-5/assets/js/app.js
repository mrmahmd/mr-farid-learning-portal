import { curriculum, coverByUnit } from "./curriculum-data.js";

"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const main = $("#mainContent");

const params = new URLSearchParams(location.search);
const previewMode = params.get("unlockAll") === "1" || params.get("preview") === "1";

let student = {
  id: params.get("studentId") || params.get("id") || "guest",
  name: params.get("studentName") || params.get("student") || params.get("name") || "Student",
  className: params.get("className") || params.get("class") || "Primary 5"
};

const makeDefaultState = () => ({
  xp: 0,
  stars: 0,
  coins: 0,
  completed: {},
  moduleScores: {},
  badges: [],
  earnedQuestions: {},
  sound: true,
  current: { route: "home" },
  lastLearning: { route: "unit", moduleIndex: 0 }
});

let state = loadState();
let activeQuiz = null;
let autoTimer = null;
let countdownTimer = null;
let toastTimer = null;

const correctionBank = {
  u1: [
    { sentence: "Camels <mark>always</mark> eat grass. (90%)", answer: "usually", explain: "Usually matches about 90%." },
    { sentence: "Lizards are <mark>never</mark> dangerous. (50%)", answer: "sometimes", explain: "Sometimes matches about 50%." },
    { sentence: "Owls <mark>usually</mark> come out at night. (70%)", answer: "often", explain: "Often matches about 70%." }
  ],
  u2: [
    { sentence: "I eat <mark>a</mark> apple before exercise.", answer: "an", explain: "Use an before a vowel sound." },
    { sentence: "There aren't <mark>some</mark> vegetables in the bowl.", answer: "any", explain: "Use any in negative sentences." },
    { sentence: "We need <mark>any</mark> water after sport.", answer: "some", explain: "Use some in affirmative sentences." }
  ],
  u3: [
    { sentence: "Yesterday, Ali <mark>play</mark> football.", answer: "played", explain: "A completed past action needs the past simple." },
    { sentence: "Did Mona <mark>visited</mark> her aunt?", answer: "visit", explain: "After did, use the base form." },
    { sentence: "The frogs <mark>doesn't</mark> leave the well.", answer: "didn't", explain: "Use didn't for a negative past action." }
  ],
  u4: [
    { sentence: "We meet <mark>in</mark> Monday.", answer: "on", explain: "Use on with days." },
    { sentence: "The lesson starts <mark>on</mark> 8 o'clock.", answer: "at", explain: "Use at with exact clock times." },
    { sentence: "My family travels <mark>at</mark> summer.", answer: "in", explain: "Use in with seasons." }
  ],
  u5: [
    { sentence: "Gold is <mark>expensive</mark> than iron.", answer: "more expensive", explain: "Long adjectives use more in comparisons." },
    { sentence: "A truck is <mark>big</mark> than a car.", answer: "bigger", explain: "Double the final consonant: big → bigger." },
    { sentence: "Wind power is <mark>clean</mark> than fossil fuel.", answer: "cleaner", explain: "Add -er to short adjectives." }
  ],
  story: [
    { sentence: "Yesterday, Billie <mark>walks</mark> through the swamp.", answer: "walked", explain: "Use the past simple to retell completed events." },
    { sentence: "Now, she <mark>learned</mark> that nature is connected.", answer: "learns", explain: "Use the present simple for what she understands now." },
    { sentence: "Billie <mark>hear</mark> an owl during the journey.", answer: "heard", explain: "Hear is irregular: hear → heard." }
  ]
};

function storageKey() {
  return `mrfarid-primary5-premium:${student.id || "guest"}`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey()) || "null");
    return saved ? { ...makeDefaultState(), ...saved } : makeDefaultState();
  } catch {
    return makeDefaultState();
  }
}

function saveState() {
  localStorage.setItem(storageKey(), JSON.stringify(state));
  updateChrome();
  emitProgress();
  window.MrFaridCourseProgress?.queueSave();
}

function emitProgress() {
  const payload = {
    student,
    progress: {
      xp: state.xp,
      stars: state.stars,
      coins: state.coins,
      completedLessons: completedLessonsCount(),
      totalLessons: totalLessonsCount(),
      percentage: overallPercent(),
      badges: [...state.badges],
      moduleScores: { ...state.moduleScores },
      current: { ...state.current }
    }
  };
  window.dispatchEvent(new CustomEvent("primary5-progress", { detail: payload }));
  if (window.parent !== window) {
    window.parent.postMessage({ type: "PRIMARY5_PROGRESS", payload }, "*");
  }
}

window.Primary5App = {
  setStudent(nextStudent = {}) {
    const oldKey = storageKey();
    student = {
      id: String(nextStudent.id || nextStudent.studentId || student.id || "guest"),
      name: String(nextStudent.name || nextStudent.studentName || student.name || "Student"),
      className: String(nextStudent.className || nextStudent.class || student.className || "Primary 5")
    };
    if (storageKey() !== oldKey) state = loadState();
    updateChrome();
    renderCurrent();
  },
  getProgress() {
    return JSON.parse(JSON.stringify({ student, state }));
  },
  resetProgress() {
    localStorage.removeItem(storageKey());
    state = makeDefaultState();
    renderHome();
  }
};

window.addEventListener("message", event => {
  const message = event.data || {};
  if (message.type === "PLATFORM_STUDENT" && message.student) {
    window.Primary5App.setStudent(message.student);
  }
  if (message.type === "PRIMARY5_SET_STUDENT" && message.student) {
    window.Primary5App.setStudent(message.student);
  }
});

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeAnswer(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[.,!?;:'"()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seedText) {
  let seed = hashString(seedText) || 1;
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(items, seedText) {
  const result = [...items];
  const random = seededRandom(seedText);
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function lessonKey(moduleId, lessonIndex) {
  return `${moduleId}:lesson:${lessonIndex}`;
}

function totalLessonsCount() {
  return curriculum.reduce((sum, module) => sum + module.lessons.length, 0);
}

function completedLessonsCount() {
  return Object.values(state.completed).filter(record => record?.passed).length;
}

function overallPercent() {
  return Math.round((completedLessonsCount() / totalLessonsCount()) * 100) || 0;
}

function moduleLessonProgress(module) {
  const passed = module.lessons.filter((_, index) => state.completed[lessonKey(module.id, index)]?.passed).length;
  return { passed, total: module.lessons.length, percent: Math.round((passed / module.lessons.length) * 100) || 0 };
}

function unitUnlocked(moduleIndex) {
  if (previewMode || moduleIndex === 0) return true;
  const previous = curriculum[moduleIndex - 1];
  return (state.moduleScores[previous.id] || 0) >= 70;
}

function lessonUnlocked(moduleIndex, lessonIndex) {
  if (previewMode || lessonIndex === 0) return true;
  const module = curriculum[moduleIndex];
  return Boolean(state.completed[lessonKey(module.id, lessonIndex - 1)]?.passed);
}

function allUnitChallengesPassed() {
  return curriculum.every(module => (state.moduleScores[module.id] || 0) >= 70);
}

function updateChrome() {
  const initial = (student.name || "S").trim().charAt(0).toUpperCase() || "S";
  $("#topStudentName").textContent = student.name;
  $("#sidebarStudentName").textContent = student.name;
  $("#sidebarClassName").textContent = student.className;
  $("#studentAvatar").textContent = initial;
  $("#sidebarAvatar").textContent = initial;
  $("#sideXp").textContent = state.xp;
  $("#sideStars").textContent = state.stars;
  $("#sideProgress").textContent = `${overallPercent()}%`;
  $("#soundToggle").textContent = state.sound ? "🔊" : "🔇";
  renderUnitNav();
}

function renderUnitNav() {
  const host = $("#unitNav");
  if (!host) return;
  host.innerHTML = curriculum.map((module, index) => {
    const unlocked = unitUnlocked(index);
    const progress = moduleLessonProgress(module);
    return `
      <button class="unit-nav-button ${unlocked ? "" : "locked"}" data-unit-index="${index}" type="button">
        <span class="unit-nav-icon">${unlocked ? module.emoji : "🔒"}</span>
        <span class="unit-nav-copy"><strong>Unit ${module.number}: ${esc(module.title)}</strong><small>${progress.passed}/${progress.total} lessons</small></span>
        <span>${unlocked ? "›" : "🔒"}</span>
      </button>`;
  }).join("");
  $$('[data-unit-index]', host).forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.unitIndex);
      if (!unitUnlocked(index)) return toast("Pass the previous unit challenge to unlock this unit.");
      renderUnit(index);
    });
  });
}

function setActiveNav(route) {
  $$(".side-link").forEach(button => button.classList.toggle("active", button.dataset.route === route));
  $$(".unit-nav-button").forEach(button => {
    const moduleIndex = Number(button.dataset.unitIndex);
    button.classList.toggle("active", route === curriculum[moduleIndex]?.id);
  });
}

function pageShell(content) {
  main.innerHTML = `<div class="page-container">${content}</div>`;
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
  closeSidebar();
}

function renderHome() {
  clearQuizTimers();
  state.current = { route: "home" };
  saveState();
  setActiveNav("home");
  const continueText = state.currentLessonLabel || "Start Unit 1";
  pageShell(`
    <section class="hero-cover">
      <img src="assets/images/covers/home-cover.png" alt="English Primary 5 interactive course cover">
      <div class="hero-shade"></div>
      <div class="hero-dynamic-panel">
        <small>Your learning journey</small>
        <h1>Welcome, ${esc(student.name)}!</h1>
        <p>Learn through focused stations, real lesson practice, rewards, and unit challenges.</p>
        <div class="hero-actions">
          <button class="btn btn-gold" id="homeContinue" type="button">▶ ${esc(continueText)}</button>
          <button class="btn btn-ghost" id="homeProgress" type="button">View progress</button>
        </div>
      </div>
    </section>

    <section class="metrics-grid" aria-label="Student progress summary">
      ${metricCard("Experience Points", state.xp, "Earned from first-time correct answers")}
      ${metricCard("Stars", `${state.stars} ★`, "Collected through lessons and challenges")}
      ${metricCard("Lessons Passed", `${completedLessonsCount()}/${totalLessonsCount()}`, `${overallPercent()}% of the course`)}
      ${metricCard("Unit Badges", `${state.badges.length}/${curriculum.length}`, "Earned after master challenges")}
    </section>

    <div class="section-head">
      <div><h2>Choose Your Unit</h2><p>Every unit has five lessons, separate learning stations, and a 50-question master challenge.</p></div>
      <span class="section-badge">6 units • 30 lessons</span>
    </div>

    <section class="units-grid">
      ${curriculum.map((module, index) => unitCard(module, index)).join("")}
    </section>
  `);

  $("#homeContinue").addEventListener("click", continueLearning);
  $("#homeProgress").addEventListener("click", renderProgress);
  $$('[data-open-unit]').forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.openUnit);
    if (!unitUnlocked(index)) return toast("Complete the previous unit challenge first.");
    renderUnit(index);
  }));
}

function metricCard(label, value, note) {
  return `<article class="metric-card"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></article>`;
}

function unitCard(module, index) {
  const unlocked = unitUnlocked(index);
  const progress = moduleLessonProgress(module);
  const challengeScore = state.moduleScores[module.id] || 0;
  const status = !unlocked ? "Locked" : challengeScore >= 70 ? `Badge earned • ${challengeScore}%` : `${progress.percent}% complete`;
  return `
    <article class="unit-card ${unlocked ? "" : "locked"}" style="--unit-color:${module.color}">
      <div class="unit-cover-wrap">
        <img src="${coverByUnit[module.id]}" alt="Unit ${module.number}: ${esc(module.title)} cover">
        <div class="unit-cover-overlay"></div>
        <span class="unit-status">${esc(status)}</span>
      </div>
      <div class="unit-card-body">
        <h3>Unit ${module.number}: ${esc(module.title)}</h3>
        <p>${esc(module.description)}</p>
        <div class="progress-line"><span>${progress.passed}/${progress.total} lessons passed</span><span>${progress.percent}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${progress.percent}%;--unit-color:${module.color}"></div></div>
        <div class="unit-card-actions">
          <button class="btn ${unlocked ? "btn-primary" : "btn-secondary"}" data-open-unit="${index}" type="button">${unlocked ? (progress.passed ? "Continue Unit" : "Open Unit") : "Complete Previous Unit"}</button>
        </div>
      </div>
    </article>`;
}

function renderUnit(moduleIndex) {
  clearQuizTimers();
  const module = curriculum[moduleIndex];
  if (!module || !unitUnlocked(moduleIndex)) return renderHome();
  state.current = { route: "unit", moduleIndex };
  state.lastLearning = { route: "unit", moduleIndex };
  state.currentLessonLabel = `Continue Unit ${module.number}`;
  saveState();
  setActiveNav(module.id);
  const progress = moduleLessonProgress(module);
  const challengeScore = state.moduleScores[module.id] || 0;

  pageShell(`
    <section class="unit-hero">
      <img src="${coverByUnit[module.id]}" alt="Unit ${module.number}: ${esc(module.title)} cover">
      <div class="unit-toolbar">
        <div><h1>Unit ${module.number}: ${esc(module.title)}</h1><p>${esc(module.description)}</p></div>
        <div class="unit-toolbar-actions"><button class="btn btn-ghost" id="unitHome" type="button">← Home</button><button class="btn btn-gold" id="unitProgressButton" type="button">${progress.percent}% complete</button></div>
      </div>
    </section>

    <section class="metrics-grid">
      ${metricCard("Key Vocabulary", module.vocab.length, "Words studied in real contexts")}
      ${metricCard("Language Focus", module.grammar, "Grammar applied in situations")}
      ${metricCard("Pronunciation", module.pronunciation, "Sound and speaking practice")}
      ${metricCard("Master Challenge", challengeScore ? `${challengeScore}%` : "Not attempted", "50 questions • 70% to pass")}
    </section>

    <div class="section-head"><div><h2>Unit Learning Path</h2><p>Open one lesson at a time. Pass its practice to unlock the next lesson.</p></div><span class="section-badge">${progress.passed}/${progress.total} passed</span></div>
    <section class="lesson-grid">
      ${module.lessons.map((lesson, lessonIndex) => lessonCard(module, moduleIndex, lesson, lessonIndex)).join("")}
    </section>

    <div class="section-head"><div><h2>Unit Master Challenge</h2><p>Complete all five lessons, then pass a 50-question review to unlock the next unit.</p></div></div>
    <section class="station-panel">
      ${progress.passed === progress.total
        ? `<h3>🏆 Ready for the challenge?</h3><p>Your practice includes vocabulary in context, grammar, comprehension, matching, correction, ordering, and sentence building.</p><button class="btn btn-gold" id="startChallenge" type="button">Start 50-Question Challenge</button>`
        : `<div class="empty-state"><h2>🔒 Challenge Locked</h2><p>Pass all five lessons first. You have completed ${progress.passed} of ${progress.total}.</p></div>`}
    </section>
  `);

  $("#unitHome").addEventListener("click", renderHome);
  $("#unitProgressButton").addEventListener("click", renderProgress);
  $$('[data-open-lesson]').forEach(button => button.addEventListener("click", () => {
    const lessonIndex = Number(button.dataset.openLesson);
    if (!lessonUnlocked(moduleIndex, lessonIndex)) return toast("Pass the previous lesson first.");
    renderLesson(moduleIndex, lessonIndex);
  }));
  $("#startChallenge")?.addEventListener("click", () => startQuiz(moduleIndex, -1, true));
}

function lessonCard(module, moduleIndex, lesson, lessonIndex) {
  const unlocked = lessonUnlocked(moduleIndex, lessonIndex);
  const record = state.completed[lessonKey(module.id, lessonIndex)];
  return `
    <article class="lesson-card ${unlocked ? "" : "locked"}" style="--unit-color:${module.color}">
      <div class="lesson-card-top"><span class="lesson-number">${unlocked ? lessonIndex + 1 : "🔒"}</span><span class="lesson-score">${record?.passed ? `Passed • ${record.score}%` : unlocked ? "Ready" : "Locked"}</span></div>
      <h3>${esc(lesson.title)}</h3>
      <p>${esc(lesson.focus)}</p>
      <div class="lesson-skills"><span>${esc(lesson.type)}</span><span>20 questions</span><span>70% to pass</span></div>
      <button class="btn ${unlocked ? "btn-primary" : "btn-secondary"}" data-open-lesson="${lessonIndex}" type="button">${record?.passed ? "Review Lesson" : unlocked ? "Start Lesson" : "Pass Previous Lesson"}</button>
    </article>`;
}

function renderLesson(moduleIndex, lessonIndex) {
  clearQuizTimers();
  const module = curriculum[moduleIndex];
  const lesson = module?.lessons[lessonIndex];
  if (!lesson || !lessonUnlocked(moduleIndex, lessonIndex)) return renderUnit(moduleIndex);
  state.current = { route: "lesson", moduleIndex, lessonIndex, station: "hub" };
  state.lastLearning = { route: "lesson", moduleIndex, lessonIndex };
  state.currentLessonLabel = `Continue: ${lesson.title}`;
  saveState();
  setActiveNav(module.id);
  const record = state.completed[lessonKey(module.id, lessonIndex)];

  pageShell(`
    ${lessonBanner(module, lesson, lessonIndex, record)}
    <section id="lessonStage">
      ${stationHub(module, moduleIndex, lesson, lessonIndex)}
    </section>
  `);
  bindStationHub(moduleIndex, lessonIndex);
}

function lessonBanner(module, lesson, lessonIndex, record) {
  return `
    <section class="lesson-banner" style="--unit-color:${module.color}">
      <img src="${coverByUnit[module.id]}" alt="Unit ${module.number} visual cover">
      <div class="lesson-banner-overlay">
        <div class="lesson-banner-copy">
          <div class="crumb">Unit ${module.number} • Lesson ${lessonIndex + 1} of ${module.lessons.length}</div>
          <h1>${esc(lesson.title)}</h1>
          <p>${esc(lesson.focus)}</p>
          <div class="lesson-meta"><span>${esc(lesson.type)}</span><span>${record?.passed ? `✅ Passed: ${record.score}%` : "🎯 20-question practice"}</span><span>🔒 Sequential progress</span></div>
        </div>
      </div>
    </section>`;
}

function stationHub(module, moduleIndex, lesson, lessonIndex) {
  const stations = [
    { id: "overview", icon: "🧭", title: "Lesson Overview", description: "Goals, focus, and the big idea", color: module.color },
    { id: "vocabulary", icon: "🧠", title: "Vocabulary", description: "Flashcards, examples, and pronunciation", color: "#1b6de0" },
    { id: "notes", icon: "💡", title: "Language Notes", description: "Useful phrases and lesson connections", color: "#16a878" },
    { id: "grammar", icon: "⚙️", title: "Grammar", description: module.grammar, color: "#df485b" },
    { id: "reading", icon: "📖", title: "Reading / Story", description: "Detailed study summary and key details", color: "#7358c8" },
    { id: "pronunciation", icon: "🔤", title: "Pronunciation", description: module.pronunciation, color: "#ec8c22" },
    ...(lesson.writing ? [{ id: "writing", icon: "✍️", title: "Writing Workshop", description: "Plan, build, and check your writing", color: "#c948a7" }] : []),
    { id: "practice", icon: "🎮", title: "Interactive Practice", description: "20 direct questions • 70% to pass", color: "#f0a51a" }
  ];
  return `
    <section class="station-hub">
      <div class="station-hub-intro"><div><h2>Choose a Learning Station</h2><p>Each station opens separately so the lesson stays clear, focused, and easy to study.</p></div><button class="btn btn-secondary" id="backToUnit" type="button">← Unit Map</button></div>
      <div class="stations-grid">
        ${stations.map(station => `
          <button class="station-button" style="--station-color:${station.color}" data-station="${station.id}" type="button">
            <span class="station-icon">${station.icon}</span><strong>${esc(station.title)}</strong><span>${esc(station.description)}</span><em>Open station →</em>
          </button>`).join("")}
      </div>
    </section>`;
}

function bindStationHub(moduleIndex, lessonIndex) {
  $("#backToUnit").addEventListener("click", () => renderUnit(moduleIndex));
  $$('[data-station]').forEach(button => button.addEventListener("click", () => {
    const station = button.dataset.station;
    if (station === "practice") return startQuiz(moduleIndex, lessonIndex, false);
    openStation(moduleIndex, lessonIndex, station);
  }));
}

function openStation(moduleIndex, lessonIndex, station) {
  const module = curriculum[moduleIndex];
  const lesson = module.lessons[lessonIndex];
  state.current = { route: "lesson", moduleIndex, lessonIndex, station };
  saveState();
  const titleMap = {
    overview: ["🧭", "Lesson Overview"],
    vocabulary: ["🧠", "Vocabulary Station"],
    notes: ["💡", "Language Notes"],
    grammar: ["⚙️", "Grammar Made Easy"],
    reading: ["📖", "Reading / Story Study"],
    pronunciation: ["🔤", "Pronunciation Station"],
    writing: ["✍️", "Writing Workshop"]
  };
  const [icon, title] = titleMap[station] || ["📘", "Lesson Station"];
  $("#lessonStage").innerHTML = `
    <section class="station-view" style="--unit-color:${module.color}">
      <div class="station-toolbar"><div><h2>${icon} ${esc(title)}</h2></div><button class="btn btn-secondary" id="backToStations" type="button">← Back to Lesson Stations</button></div>
      <article class="station-panel">${stationContent(module, lesson, station)}</article>
    </section>`;
  $("#backToStations").addEventListener("click", () => {
    $("#lessonStage").innerHTML = stationHub(module, moduleIndex, lesson, lessonIndex);
    bindStationHub(moduleIndex, lessonIndex);
  });
  $$("[data-speak]").forEach(button => button.addEventListener("click", () => speak(button.dataset.speak)));
  $("#stationPractice")?.addEventListener("click", () => startQuiz(moduleIndex, lessonIndex, false));
}

function stationContent(module, lesson, station) {
  const lessonVocab = lesson.vocab.map(word => module.vocab.find(item => item.word === word)).filter(Boolean);
  if (station === "overview") {
    return `
      <h3>${esc(lesson.title)}</h3>
      <div class="info-callout"><strong>Teacher's simple explanation:</strong> ${esc(lesson.focus)}</div>
      <h4>By the end of this lesson, you can:</h4>
      <ul>${lesson.summary.slice(0, 5).map(point => `<li>${esc(point)}</li>`).join("")}</ul>
      <div class="rule-callout"><strong>80/20 focus:</strong> Study the key words, understand the main idea, apply the unit grammar, then complete the practice.</div>
      <button class="btn btn-primary" id="stationPractice" type="button">Go to Interactive Practice →</button>`;
  }
  if (station === "vocabulary") {
    return `<div class="vocab-grid">${lessonVocab.map(item => `
      <section class="vocab-card"><button class="speak-button" data-speak="${esc(item.word)}" type="button" aria-label="Hear ${esc(item.word)}">🔊</button><h3>${esc(item.word)}</h3><p>${esc(item.meaning)}</p><p class="vocab-example"><strong>In context:</strong> ${esc(item.example)}</p></section>`).join("")}</div>`;
  }
  if (station === "notes") {
    return `
      <h3>Useful Language Connections</h3>
      <p>These notes connect the lesson vocabulary to the real text, story, dialog, or task.</p>
      ${lesson.notes.map((note, index) => `<div class="info-callout"><strong>${index + 1}.</strong> ${esc(note)}</div>`).join("")}
      <h4>Use the words naturally</h4>
      ${lessonVocab.slice(0, 4).map(item => `<div class="example-callout">${esc(item.example)}</div>`).join("")}`;
  }
  if (station === "grammar") {
    return `
      <h3>${esc(module.grammar)}</h3>
      ${module.grammarNotes.map(note => `<div class="rule-callout">${esc(note)}</div>`).join("")}
      <h4>Clear examples</h4>
      ${module.grammarExamples.map(example => `<div class="example-callout">${esc(example)}</div>`).join("")}
      <div class="info-callout"><strong>Remember:</strong> Do not memorize the rule alone. Use it inside a complete sentence connected to the unit.</div>`;
  }
  if (station === "reading") {
    return `
      <h3>Study Summary</h3>
      <ol>${lesson.summary.map(point => `<li>${esc(point)}</li>`).join("")}</ol>
      <h4>Check the details</h4>
      ${lesson.facts.map(fact => `<div class="info-callout"><strong>Think:</strong> ${esc(fact.q)}</div>`).join("")}
      <div class="rule-callout"><strong>Main learning connection:</strong> ${esc(lesson.focus)}</div>`;
  }
  if (station === "pronunciation") {
    const details = lesson.pronunciation?.length ? lesson.pronunciation : [
      `This unit practises ${module.pronunciation}.`,
      "Listen carefully, repeat slowly, then say the complete word inside a sentence.",
      "Use the audio button on vocabulary cards to hear key lesson words."
    ];
    return `
      <h3>${esc(module.pronunciation)}</h3>
      ${details.map(detail => `<div class="info-callout">${esc(detail)}</div>`).join("")}
      <h4>Say these lesson words</h4>
      <div class="vocab-grid">${lessonVocab.slice(0, 6).map(item => `<section class="vocab-card"><button class="speak-button" data-speak="${esc(item.word)}" type="button">🔊</button><h3>${esc(item.word)}</h3><p>${esc(item.example)}</p></section>`).join("")}</div>`;
  }
  if (station === "writing") {
    return `
      <h3>Writing Task</h3>
      <div class="info-callout">${esc(lesson.writing)}</div>
      <h4>Plan before you write</h4>
      <ol><li>Read the task and underline the topic.</li><li>Choose the important lesson words you will use.</li><li>Organize your ideas in a clear order.</li><li>Write complete sentences.</li><li>Check capitals, punctuation, spelling, and the target grammar.</li></ol>
      <div class="rule-callout"><strong>Writing checklist:</strong> Clear title • connected ideas • lesson vocabulary • correct grammar • final check.</div>`;
  }
  return `<p>Station content is being prepared.</p>`;
}

function renderProgress() {
  clearQuizTimers();
  state.current = { route: "progress" };
  saveState();
  setActiveNav("progress");
  pageShell(`
    <div class="section-head"><div><h2>${esc(student.name)}'s Progress</h2><p>Progress is saved automatically on this device and can also be sent to the parent platform.</p></div><span class="section-badge">${overallPercent()}% complete</span></div>
    <section class="metrics-grid">
      ${metricCard("XP", state.xp, "Unique correct answers only")}
      ${metricCard("Stars", `${state.stars} ★`, "Achievement rewards")}
      ${metricCard("Coins", state.coins, "Practice rewards")}
      ${metricCard("Lessons", `${completedLessonsCount()}/${totalLessonsCount()}`, "Passed with 70% or more")}
    </section>
    <section class="progress-page-grid">
      ${curriculum.map((module, index) => {
        const progress = moduleLessonProgress(module);
        const score = state.moduleScores[module.id] || 0;
        return `<article class="progress-unit-card" style="--unit-color:${module.color}"><h3>Unit ${module.number}: ${esc(module.title)}</h3><p>${progress.passed}/${progress.total} lessons • Challenge: ${score ? `${score}%` : "Not attempted"}</p><div class="progress-track"><div class="progress-fill" style="width:${progress.percent}%;--unit-color:${module.color}"></div></div><button class="btn btn-secondary" data-progress-unit="${index}" type="button" style="margin-top:13px">Open Unit</button></article>`;
      }).join("")}
    </section>
    <div class="section-head"><div><h2>Badge Cabinet</h2><p>Unit badges are earned after passing the 50-question challenge.</p></div></div>
    <div class="badges-wrap">${curriculum.map(module => `<span class="badge-chip ${state.badges.includes(module.id) ? "earned" : ""}">${state.badges.includes(module.id) ? module.emoji : "🔒"} Unit ${module.number}</span>`).join("")}</div>
    <div class="section-head"><div><h2>Device Tools</h2><p>Resetting affects only the current student on this device.</p></div></div>
    <button class="btn btn-danger" id="openReset" type="button">Reset Local Progress</button>
  `);
  $$('[data-progress-unit]').forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.progressUnit);
    if (!unitUnlocked(index)) return toast("This unit is still locked.");
    renderUnit(index);
  }));
  $("#openReset").addEventListener("click", () => openModal("resetModal"));
}

function continueLearning() {
  const current = state.lastLearning || {};
  if (current.route === "lesson" && Number.isInteger(current.moduleIndex) && Number.isInteger(current.lessonIndex)) {
    renderLesson(current.moduleIndex, current.lessonIndex);
  } else if (current.route === "unit" && Number.isInteger(current.moduleIndex)) {
    renderUnit(current.moduleIndex);
  } else {
    const firstIncompleteModule = curriculum.findIndex((module, index) => unitUnlocked(index) && moduleLessonProgress(module).passed < module.lessons.length);
    renderUnit(firstIncompleteModule >= 0 ? firstIncompleteModule : 0);
  }
}

function renderCurrent() {
  const current = state.current || {};
  if (current.route === "progress") return renderProgress();
  if (current.route === "unit" && Number.isInteger(current.moduleIndex)) return renderUnit(current.moduleIndex);
  if (current.route === "lesson" && Number.isInteger(current.moduleIndex) && Number.isInteger(current.lessonIndex)) return renderLesson(current.moduleIndex, current.lessonIndex);
  renderHome();
}

function blankExample(example, word) {
  const safe = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(safe, "i");
  if (pattern.test(example)) return example.replace(pattern, "________");
  const words = example.split(" ");
  words[Math.max(0, Math.floor(words.length / 2))] = "________";
  return words.join(" ");
}

function cleanSentence(sentence) {
  return sentence.replace(/[“”".,!?;:()]/g, "").replace(/\s+/g, " ").trim();
}

function contextualDistractors(module, answer, seed) {
  return seededShuffle(module.vocab.map(item => item.word).filter(word => word !== answer), seed).slice(0, 3);
}

function buildLessonQuestions(moduleIndex, lessonIndex) {
  const module = curriculum[moduleIndex];
  const lesson = module.lessons[lessonIndex];
  const prefix = `${module.id}-${lessonIndex}`;
  const lessonVocab = lesson.vocab.map(word => module.vocab.find(item => item.word === word)).filter(Boolean);
  const questions = [];

  lessonVocab.slice(0, 4).forEach((item, index) => {
    questions.push({
      id: `${prefix}-complete-${index}`,
      type: "complete",
      typeLabel: "Complete",
      prompt: `Complete the lesson sentence with the correct word: ${blankExample(item.example, item.word)}`,
      answer: item.word,
      explain: item.example
    });
  });

  lesson.facts.slice(0, 3).forEach((fact, index) => {
    questions.push({
      id: `${prefix}-mcq-${index}`,
      type: "mcq",
      typeLabel: "Multiple Choice",
      prompt: fact.q,
      answer: fact.a,
      options: seededShuffle([fact.a, ...fact.wrong], `${prefix}-fact-${index}`),
      explain: fact.explain
    });
  });

  lesson.checks.slice(0, 2).forEach((check, index) => {
    questions.push({
      id: `${prefix}-tf-${index}`,
      type: "mcq",
      typeLabel: "True / False",
      prompt: check.statement,
      answer: check.value ? "True" : "False",
      options: ["True", "False"],
      explain: check.explain
    });
  });

  module.grammarQuestions.slice(0, 4).forEach((question, index) => {
    questions.push({
      id: `${prefix}-grammar-${index}`,
      type: "mcq",
      typeLabel: "Grammar in Context",
      prompt: question.q,
      answer: question.a,
      options: seededShuffle([question.a, ...question.wrong], `${prefix}-grammar-${index}`),
      explain: question.explain
    });
  });

  const matchingPairs = lessonVocab.slice(0, 4).map(item => ({
    word: item.word,
    context: blankExample(item.example, item.word)
  }));
  questions.push({
    id: `${prefix}-matching-0`,
    type: "matching",
    typeLabel: "Matching",
    prompt: "Match each lesson word to the sentence where it belongs.",
    pairs: matchingPairs,
    explain: "The words are matched through their real use in lesson sentences."
  });

  const orderSources = [...lesson.summary, ...module.grammarExamples].map(cleanSentence).filter(sentence => sentence.split(" ").length >= 4);
  orderSources.slice(0, 2).forEach((sentence, index) => {
    questions.push({
      id: `${prefix}-ordering-${index}`,
      type: "builder",
      typeLabel: "Ordering",
      prompt: "Put the words in the correct order.",
      answer: sentence,
      words: seededShuffle(sentence.split(" "), `${prefix}-order-${index}`),
      explain: sentence
    });
  });

  const corrections = correctionBank[module.id] || [];
  [0, 1].forEach((offset, index) => {
    const item = corrections[(lessonIndex + offset) % corrections.length];
    questions.push({
      id: `${prefix}-correction-${index}`,
      type: "correction",
      typeLabel: "Correction",
      promptHtml: `Correct the highlighted word or phrase: ${item.sentence}`,
      answer: item.answer,
      explain: item.explain
    });
  });

  const builderSources = [...module.grammarExamples, ...lesson.summary].map(cleanSentence).filter(sentence => sentence.split(" ").length >= 4);
  builderSources.slice(-2).forEach((sentence, index) => {
    questions.push({
      id: `${prefix}-builder-${index}`,
      type: "builder",
      typeLabel: "Sentence Builder",
      prompt: "Build a correct sentence connected to this unit.",
      answer: sentence,
      words: seededShuffle(sentence.split(" "), `${prefix}-builder-${index}`),
      explain: sentence
    });
  });

  while (questions.length < 20) {
    const item = lessonVocab[questions.length % lessonVocab.length] || module.vocab[questions.length % module.vocab.length];
    const index = questions.length;
    questions.push({
      id: `${prefix}-extra-${index}`,
      type: "mcq",
      typeLabel: "Vocabulary in Context",
      prompt: `Choose the word that completes this lesson sentence: ${blankExample(item.example, item.word)}`,
      answer: item.word,
      options: seededShuffle([item.word, ...contextualDistractors(module, item.word, `${prefix}-extra-options-${index}`)], `${prefix}-extra-${index}`),
      explain: item.example
    });
  }

  return questions.slice(0, 20);
}

function buildChallengeQuestions(moduleIndex) {
  const module = curriculum[moduleIndex];
  const all = module.lessons.flatMap((_, lessonIndex) => buildLessonQuestions(moduleIndex, lessonIndex));
  const groups = ["complete", "mcq", "matching", "builder", "correction"];
  const chosen = [];
  groups.forEach(type => {
    const typeItems = all.filter(question => question.type === type);
    chosen.push(...typeItems.slice(0, type === "mcq" ? 24 : type === "complete" ? 10 : type === "builder" ? 8 : 4));
  });
  const unique = [];
  const seen = new Set();
  for (const question of chosen) {
    if (!seen.has(question.id)) {
      seen.add(question.id);
      unique.push({ ...question, id: `${question.id}-challenge` });
    }
  }
  for (const question of all) {
    if (unique.length >= 50) break;
    if (!seen.has(question.id)) {
      seen.add(question.id);
      unique.push({ ...question, id: `${question.id}-challenge` });
    }
  }
  return unique.slice(0, 50);
}

function startQuiz(moduleIndex, lessonIndex, challenge = false) {
  clearQuizTimers();
  const module = curriculum[moduleIndex];
  const questions = challenge ? buildChallengeQuestions(moduleIndex) : buildLessonQuestions(moduleIndex, lessonIndex);
  activeQuiz = { moduleIndex, lessonIndex, challenge, questions, index: 0, correct: 0, answered: false };
  state.current = challenge
    ? { route: "unit", moduleIndex }
    : { route: "lesson", moduleIndex, lessonIndex, station: "practice" };
  saveState();
  setActiveNav(module.id);
  pageShell(`
    ${challenge
      ? `<section class="lesson-banner"><img src="${coverByUnit[module.id]}" alt="Unit ${module.number} cover"><div class="lesson-banner-overlay"><div class="lesson-banner-copy"><div class="crumb">Unit ${module.number} • Master Challenge</div><h1>50-Question Unit Challenge</h1><p>Direct questions covering vocabulary in context, grammar, reading, matching, correction, ordering, and sentence building.</p><div class="lesson-meta"><span>🏆 70% to pass</span><span>🔓 Unlocks the next unit</span></div></div></div></section>`
      : lessonBanner(module, module.lessons[lessonIndex], lessonIndex, state.completed[lessonKey(module.id, lessonIndex)])}
    <section class="quiz-shell" id="quizStage"></section>
  `);
  renderQuestion();
}

function renderQuestion() {
  const quiz = activeQuiz;
  if (!quiz) return;
  const question = quiz.questions[quiz.index];
  const module = curriculum[quiz.moduleIndex];
  const percent = Math.round((quiz.index / quiz.questions.length) * 100);
  $("#quizStage").innerHTML = `
    <div class="quiz-topbar"><div><strong>Question ${quiz.index + 1} of ${quiz.questions.length}</strong><span> • ${esc(question.typeLabel)}</span></div><strong>Score: ${quiz.correct}</strong></div>
    <div class="quiz-card" style="--unit-color:${module.color}">
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%;--unit-color:${module.color}"></div></div>
      <div style="margin-top:17px"><span class="question-type">${esc(question.typeLabel)}</span></div>
      <h2 class="question-title">${question.promptHtml || esc(question.prompt)}</h2>
      <div id="answerArea">${questionAnswerMarkup(question)}</div>
      <div id="feedbackArea" aria-live="polite"></div>
      <div class="check-row"><button class="btn btn-secondary" id="leaveQuiz" type="button">← Leave Practice</button></div>
    </div>`;
  bindQuestionControls(question);
  $("#leaveQuiz").addEventListener("click", () => {
    const { moduleIndex, lessonIndex, challenge } = quiz;
    activeQuiz = null;
    challenge ? renderUnit(moduleIndex) : renderLesson(moduleIndex, lessonIndex);
  });
}

function questionAnswerMarkup(question) {
  if (question.type === "mcq") {
    return `<div class="options-grid">${question.options.map((option, index) => `<button class="option-button" data-option="${esc(option)}" type="button"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${esc(option)}</span></button>`).join("")}</div>`;
  }
  if (question.type === "complete" || question.type === "correction") {
    return `<label for="textAnswer" class="question-type" style="margin-bottom:8px">Type your answer</label><input class="answer-input" id="textAnswer" type="text" autocomplete="off"><div class="check-row"><button class="btn btn-primary" id="checkText" type="button">Check Answer</button></div>`;
  }
  if (question.type === "matching") {
    const words = seededShuffle(question.pairs.map(pair => pair.word), `${question.id}-words`);
    return `<div class="matching-list">${question.pairs.map((pair, index) => `<div class="match-row"><p>${index + 1}. ${esc(pair.context)}</p><select data-match-index="${index}"><option value="">Choose a word</option>${words.map(word => `<option value="${esc(word)}">${esc(word)}</option>`).join("")}</select></div>`).join("")}</div><div class="check-row"><button class="btn btn-primary" id="checkMatching" type="button">Check Matching</button></div>`;
  }
  if (question.type === "builder") {
    return `<p style="color:var(--muted)">Click words to build the sentence. Click a selected word to return it.</p><div class="answer-builder" id="answerBuilder" aria-label="Your sentence"></div><div class="word-bank" id="wordBank" aria-label="Word bank"></div><div class="check-row"><button class="btn btn-primary" id="checkBuilder" type="button">Check Sentence</button><button class="btn btn-secondary" id="resetBuilder" type="button">Reset</button></div>`;
  }
  return "";
}

function bindQuestionControls(question) {
  if (question.type === "mcq") {
    $$('[data-option]').forEach(button => button.addEventListener("click", () => checkAnswer(button.dataset.option, button)));
    return;
  }
  if (question.type === "complete" || question.type === "correction") {
    const input = $("#textAnswer");
    $("#checkText").addEventListener("click", () => checkAnswer(input.value));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") checkAnswer(input.value);
    });
    input.focus();
    return;
  }
  if (question.type === "matching") {
    $("#checkMatching").addEventListener("click", () => {
      const answers = $$('[data-match-index]').map(select => select.value);
      const correct = question.pairs.every((pair, index) => normalizeAnswer(pair.word) === normalizeAnswer(answers[index]));
      checkAnswer(correct ? "__correct__" : answers.join(" | "), null, correct);
    });
    return;
  }
  if (question.type === "builder") setupBuilder(question);
}

function setupBuilder(question) {
  const bank = question.words.map((word, index) => ({ id: `${index}-${word}`, word }));
  const selected = [];
  const bankHost = $("#wordBank");
  const selectedHost = $("#answerBuilder");

  function draw() {
    bankHost.innerHTML = bank.map(item => `<button class="word-chip" data-bank-id="${esc(item.id)}" type="button">${esc(item.word)}</button>`).join("");
    selectedHost.innerHTML = selected.length ? selected.map(item => `<button class="word-chip" data-selected-id="${esc(item.id)}" type="button">${esc(item.word)}</button>`).join("") : `<span style="color:var(--muted)">Your sentence appears here.</span>`;
    $$('[data-bank-id]', bankHost).forEach(button => button.addEventListener("click", () => {
      const index = bank.findIndex(item => item.id === button.dataset.bankId);
      if (index >= 0) selected.push(...bank.splice(index, 1));
      draw();
    }));
    $$('[data-selected-id]', selectedHost).forEach(button => button.addEventListener("click", () => {
      const index = selected.findIndex(item => item.id === button.dataset.selectedId);
      if (index >= 0) bank.push(...selected.splice(index, 1));
      draw();
    }));
  }

  draw();
  $("#checkBuilder").addEventListener("click", () => checkAnswer(selected.map(item => item.word).join(" ")));
  $("#resetBuilder").addEventListener("click", () => {
    bank.push(...selected.splice(0));
    const reset = seededShuffle(bank, `${question.id}-reset`);
    bank.splice(0, bank.length, ...reset);
    draw();
  });
}

function checkAnswer(value, optionButton = null, forcedResult = null) {
  const quiz = activeQuiz;
  if (!quiz || quiz.answered) return;
  const question = quiz.questions[quiz.index];
  if (!String(value).trim() && forcedResult === null) return toast("Write or choose an answer first.");
  quiz.answered = true;
  let correct;
  if (forcedResult !== null) correct = forcedResult;
  else correct = normalizeAnswer(value) === normalizeAnswer(question.answer);

  disableCurrentControls();
  if (question.type === "mcq") {
    $$('[data-option]').forEach(button => {
      if (normalizeAnswer(button.dataset.option) === normalizeAnswer(question.answer)) button.classList.add("correct");
    });
    if (!correct && optionButton) optionButton.classList.add("wrong");
  }

  if (correct) {
    quiz.correct += 1;
    awardQuestion(question.id);
    playTone(true);
    $("#feedbackArea").innerHTML = `<div class="feedback-box good">✅ Correct!${state.earnedQuestions[question.id] ? "" : ""}<small>${esc(question.explain || "Well done.")}</small><span class="next-countdown"><i class="pulse-dot"></i> Next question in <strong id="countdownValue">5</strong> seconds…</span></div>`;
    let seconds = 5;
    countdownTimer = setInterval(() => {
      seconds -= 1;
      if ($("#countdownValue")) $("#countdownValue").textContent = seconds;
    }, 1000);
    autoTimer = setTimeout(advanceQuestion, 5000);
  } else {
    playTone(false);
    const correctDisplay = question.type === "matching"
      ? question.pairs.map(pair => `${pair.context} → ${pair.word}`).join(" • ")
      : question.answer;
    $("#feedbackArea").innerHTML = `<div class="feedback-box bad">Not correct. <small>Correct answer: <strong>${esc(correctDisplay)}</strong><br>${esc(question.explain || "Review the lesson station and try again.")}</small><div class="check-row"><button class="btn btn-primary" id="gotItButton" type="button">GOT IT →</button></div></div>`;
    $("#gotItButton").addEventListener("click", advanceQuestion);
  }
}

function disableCurrentControls() {
  $$('button, input, select', $("#answerArea")).forEach(control => { control.disabled = true; });
}

function awardQuestion(questionId) {
  if (state.earnedQuestions[questionId]) return;
  state.earnedQuestions[questionId] = true;
  state.xp += 10;
  state.coins += 2;
  if (Object.keys(state.earnedQuestions).length % 5 === 0) state.stars += 1;
  saveState();
}

function advanceQuestion() {
  clearQuizTimers();
  if (!activeQuiz) return;
  activeQuiz.index += 1;
  activeQuiz.answered = false;
  if (activeQuiz.index >= activeQuiz.questions.length) finishQuiz();
  else renderQuestion();
}

function finishQuiz() {
  const quiz = activeQuiz;
  if (!quiz) return;
  const module = curriculum[quiz.moduleIndex];
  const score = Math.round((quiz.correct / quiz.questions.length) * 100);
  const passed = score >= 70;
  let firstPass = false;

  if (quiz.challenge) {
    const previousScore = state.moduleScores[module.id] || 0;
    state.moduleScores[module.id] = Math.max(previousScore, score);
    firstPass = passed && previousScore < 70;
    if (firstPass) {
      if (!state.badges.includes(module.id)) state.badges.push(module.id);
      state.xp += 100;
      state.coins += 25;
      state.stars += 5;
    }
  } else {
    const key = lessonKey(module.id, quiz.lessonIndex);
    const previous = state.completed[key];
    firstPass = passed && !previous?.passed;
    if (!previous || score > previous.score) state.completed[key] = { passed: previous?.passed || passed, score: Math.max(previous?.score || 0, score) };
    if (firstPass) {
      state.xp += 40;
      state.coins += 10;
      state.stars += 2;
    }
  }

  saveState();
  if (passed) {
    celebrate();
    playTone(true);
  }

  const nextLessonAvailable = !quiz.challenge && passed && quiz.lessonIndex < module.lessons.length - 1;
  $("#quizStage").innerHTML = `
    <div class="quiz-card"><div class="quiz-result"><div class="result-icon">${passed ? "🏆" : "🌱"}</div><h2>${passed ? "Excellent work!" : "Review and try again"}</h2><strong>${score}% • ${quiz.correct}/${quiz.questions.length} correct</strong><p>${passed ? (quiz.challenge ? "You earned the unit badge and unlocked the next unit." : "The next lesson is now available.") : "You need 70% to pass. Return to the learning stations, review, and retry."}</p><div class="quiz-result-actions"><button class="btn btn-secondary" id="retryQuiz" type="button">Try Again</button>${nextLessonAvailable ? `<button class="btn btn-primary" id="nextLesson" type="button">Next Lesson →</button>` : `<button class="btn btn-primary" id="returnMap" type="button">Return to Unit Map</button>`}</div></div></div>`;

  $("#retryQuiz").addEventListener("click", () => startQuiz(quiz.moduleIndex, quiz.lessonIndex, quiz.challenge));
  $("#nextLesson")?.addEventListener("click", () => renderLesson(quiz.moduleIndex, quiz.lessonIndex + 1));
  $("#returnMap")?.addEventListener("click", () => renderUnit(quiz.moduleIndex));
  activeQuiz = null;
}

function renderCertificate() {
  if (!allUnitChallengesPassed()) return toast("Complete all unit challenges first to unlock the certificate.");
  clearQuizTimers();
  state.current = { route: "certificate" };
  saveState();
  pageShell(`
    <section class="certificate">
      <div style="font-size:4rem">🏆</div>
      <h1>Certificate of Achievement</h1>
      <p>This certificate is proudly presented to</p>
      <div class="certificate-name">${esc(student.name)}</div>
      <p>${esc(student.className)}</p>
      <p>for successfully completing</p>
      <h2>English Primary 5 • First Term</h2>
      <p>with dedication, curiosity, and excellent effort.</p>
      <div style="margin-top:35px;font-weight:1000;color:#173c70">Prepared and Designed by: Mr. Mohamed Farid</div>
      <div class="quiz-result-actions"><button class="btn btn-gold" id="printCertificate" type="button">Print Certificate</button><button class="btn btn-secondary" id="certificateHome" type="button">Dashboard</button></div>
    </section>`);
  $("#printCertificate").addEventListener("click", () => window.print());
  $("#certificateHome").addEventListener("click", renderHome);
}

function speak(text) {
  if (!("speechSynthesis" in window)) return toast("Speech is not supported in this browser.");
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.86;
  speechSynthesis.speak(utterance);
}

function playTone(correct) {
  if (!state.sound) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.frequency.value = correct ? 660 : 190;
    oscillator.type = correct ? "sine" : "triangle";
    gain.gain.setValueAtTime(.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.12, context.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .24);
    oscillator.start();
    oscillator.stop(context.currentTime + .26);
  } catch {
    // Sound is optional.
  }
}

function celebrate() {
  const host = $("#celebration");
  const colors = ["#ffc83d", "#1b6de0", "#15a06b", "#dc4050", "#9a61d8"];
  host.innerHTML = Array.from({ length: 70 }, (_, index) => `<i style="left:${(index * 37) % 100}%;background:${colors[index % colors.length]};animation-delay:${(index % 10) * .06}s"></i>`).join("");
  setTimeout(() => { host.innerHTML = ""; }, 3200);
}

function clearQuizTimers() {
  if (autoTimer) clearTimeout(autoTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  autoTimer = null;
  countdownTimer = null;
}

function toast(message) {
  const host = $("#toast");
  host.textContent = message;
  host.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => host.classList.remove("show"), 2800);
}

function openModal(id) {
  $("#" + id).classList.remove("hidden");
}

function closeModal(id) {
  $("#" + id).classList.add("hidden");
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
}

$("#menuToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#brandHome").addEventListener("click", renderHome);
$("#teacherButton").addEventListener("click", () => openModal("teacherModal"));
$("#soundToggle").addEventListener("click", () => {
  state.sound = !state.sound;
  saveState();
  toast(state.sound ? "Sound is on." : "Sound is off.");
});
$("#continueButton").addEventListener("click", continueLearning);
$("#certificateButton").addEventListener("click", renderCertificate);
$("#confirmReset").addEventListener("click", () => {
  localStorage.removeItem(storageKey());
  state = makeDefaultState();
  closeModal("resetModal");
  renderHome();
  toast("Local progress was reset.");
});
$$('[data-route]').forEach(button => button.addEventListener("click", () => button.dataset.route === "home" ? renderHome() : renderProgress()));
$$('[data-close-modal]').forEach(button => button.addEventListener("click", () => closeModal(button.dataset.closeModal)));
$$('.modal-backdrop').forEach(modal => modal.addEventListener("click", event => {
  if (event.target === modal) closeModal(modal.id);
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    $$(".modal-backdrop").forEach(modal => modal.classList.add("hidden"));
    closeSidebar();
  }
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

updateChrome();
renderCurrent();

window.MrFaridCourseProgress?.connect({
  courseId: "english-primary-5",
  getState: () => state,
  setState: (next) => {
    state = next;
    localStorage.setItem(storageKey(), JSON.stringify(state));
    updateChrome();
    renderCurrent();
  },
  mergeState: (_local, remote) => ({ ...makeDefaultState(), ...remote }),
  onStatus: ({ online, message }) => {
    document.title = online ? "English Primary 5 • Saved" : "English Primary 5";
    if (message && !online) console.info(message);
  }
});
