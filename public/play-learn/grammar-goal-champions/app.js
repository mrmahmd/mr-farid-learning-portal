(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const STORAGE_KEY = "grammarPenaltyChampions.v1";

  const LEVELS = {
    rookie: { label: "Rookie", maxDifficulty: 1, shots: 10, timePenalty: 0 },
    pro: { label: "Pro", maxDifficulty: 2, shots: 12, timePenalty: 0 },
    champion: { label: "Champion", maxDifficulty: 3, shots: 15, timePenalty: 1 },
    legend: { label: "Legend", maxDifficulty: 4, shots: 15, timePenalty: 2 }
  };

  const TEAM_DATA = {
    madrid: { display: "Real Madrid", short: "MW", className: "madrid" },
    barcelona: { display: "Barcelona", short: "BS", className: "barcelona" }
  };

  const DEFAULT_PROGRESS = {
    playerName: "GrammarStar",
    team: "madrid",
    level: "rookie",
    soundOn: true,
    coins: 0,
    stars: 0,
    highScore: 0,
    bestStreak: 0,
    matches: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    badges: []
  };

  const state = {
    progress: loadProgress(),
    selectedTeam: "madrid",
    selectedLevel: "rookie",
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedAnswer: null,
    orderWords: [],
    answered: false,
    paused: false,
    timeLimit: 20,
    timeLeft: 20,
    timerId: null,
    timerStartedAt: 0,
    timerRemainingMs: 0,
    nextQuestionTimer: null,
    confettiTimer: null,
    match: null,
    audioContext: null
  };

  const el = {
    startScreen: $("#startScreen"),
    gameScreen: $("#gameScreen"),
    resultScreen: $("#resultScreen"),
    playerName: $("#playerName"),
    startButton: $("#startButton"),
    howToButton: $("#howToButton"),
    howToDialog: $("#howToDialog"),
    soundStart: $("#soundButtonStart"),
    soundGame: $("#soundButtonGame"),
    pauseButton: $("#pauseButton"),
    pauseDialog: $("#pauseDialog"),
    resumeButton: $("#resumeButton"),
    quitButton: $("#quitButton"),
    savedSummary: $("#savedSummary"),
    savedSummaryText: $("#savedSummaryText"),
    hudPlayerName: $("#hudPlayerName"),
    hudTeamName: $("#hudTeamName"),
    hudLevel: $("#hudLevel"),
    avatar: $("#avatar"),
    coinCount: $("#coinCount"),
    starCount: $("#starCount"),
    streakCount: $("#streakCount"),
    goalsCount: $("#goalsCount"),
    shotsTotal: $("#shotsTotal"),
    correctCount: $("#correctCount"),
    shotNumber: $("#shotNumber"),
    shotNumberTotal: $("#shotNumberTotal"),
    timerCard: $("#timerCard"),
    timerValue: $("#timerValue"),
    timerProgress: $("#timerProgress"),
    questionTypeLabel: $("#questionTypeLabel"),
    tenseTag: $("#tenseTag"),
    difficultyTag: $("#difficultyTag"),
    questionInstruction: $("#questionInstruction"),
    questionStem: $("#questionStem"),
    answerArea: $("#answerArea"),
    shootButton: $("#shootButton"),
    feedbackBox: $("#feedbackBox"),
    pitch: $("#pitch"),
    ball: $("#ball"),
    resultPop: $("#resultPop"),
    confettiCanvas: $("#confettiCanvas"),
    comboLabel: $("#comboLabel"),
    comboText: $("#comboText"),
    fastAnswerText: $("#fastAnswerText"),
    grammarHeroText: $("#grammarHeroText"),
    presentMasteryLabel: $("#presentMasteryLabel"),
    presentMasteryBar: $("#presentMasteryBar"),
    pastMasteryLabel: $("#pastMasteryLabel"),
    pastMasteryBar: $("#pastMasteryBar"),
    matchProgressLabel: $("#matchProgressLabel"),
    matchProgressBar: $("#matchProgressBar"),
    resultKicker: $("#resultKicker"),
    resultTitle: $("#resultTitle"),
    resultMessage: $("#resultMessage"),
    resultGoals: $("#resultGoals"),
    resultAccuracy: $("#resultAccuracy"),
    resultStreak: $("#resultStreak"),
    resultScore: $("#resultScore"),
    resultCoins: $("#resultCoins"),
    resultStars: $("#resultStars"),
    coachNote: $("#coachNote"),
    badgeShelf: $("#badgeShelf"),
    badgeTemplate: $("#badgeTemplate"),
    playAgainButton: $("#playAgainButton"),
    homeButton: $("#homeButton"),
    resetProgressButton: $("#resetProgressButton")
  };

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...DEFAULT_PROGRESS, ...(saved || {}) };
    } catch {
      return { ...DEFAULT_PROGRESS };
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  }

  function init() {
    state.selectedTeam = state.progress.team || "madrid";
    state.selectedLevel = state.progress.level || "rookie";
    el.playerName.value = state.progress.playerName || "GrammarStar";
    updateTeamSelection();
    updateLevelSelection();
    updateSoundButtons();
    updateSavedSummary();
    bindEvents();
    registerServiceWorker();
  }

  function bindEvents() {
    $$(".team-card").forEach((btn) => btn.addEventListener("click", () => {
      state.selectedTeam = btn.dataset.team;
      updateTeamSelection();
      playClick();
    }));

    $$(".level-chip").forEach((btn) => btn.addEventListener("click", () => {
      state.selectedLevel = btn.dataset.level;
      updateLevelSelection();
      playClick();
    }));

    el.startButton.addEventListener("click", startMatch);
    el.playerName.addEventListener("keydown", (event) => {
      if (event.key === "Enter") startMatch();
    });
    el.howToButton.addEventListener("click", () => el.howToDialog.showModal());
    el.soundStart.addEventListener("click", toggleSound);
    el.soundGame.addEventListener("click", toggleSound);
    el.pauseButton.addEventListener("click", pauseGame);
    el.resumeButton.addEventListener("click", resumeGame);
    el.quitButton.addEventListener("click", quitToHome);
    el.pauseDialog.addEventListener("cancel", (event) => { event.preventDefault(); resumeGame(); el.pauseDialog.close(); });
    el.shootButton.addEventListener("click", submitAnswer);
    el.playAgainButton.addEventListener("click", startMatch);
    el.homeButton.addEventListener("click", showHome);
    el.resetProgressButton.addEventListener("click", resetProgress);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && el.gameScreen.classList.contains("is-active") && !state.answered) pauseGame();
    });

    window.addEventListener("resize", resizeConfettiCanvas);
  }

  function updateTeamSelection() {
    $$(".team-card").forEach((btn) => {
      const selected = btn.dataset.team === state.selectedTeam;
      btn.classList.toggle("selected", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });
  }

  function updateLevelSelection() {
    $$(".level-chip").forEach((btn) => btn.classList.toggle("selected", btn.dataset.level === state.selectedLevel));
  }

  function updateSavedSummary() {
    if (state.progress.matches > 0) {
      el.savedSummary.hidden = false;
      el.savedSummaryText.textContent = `${state.progress.matches} matches • ${state.progress.stars} stars • Best streak ${state.progress.bestStreak}`;
    } else {
      el.savedSummary.hidden = true;
    }
  }

  function updateSoundButtons() {
    const on = state.progress.soundOn;
    el.soundStart.textContent = on ? "🔊 Sound On" : "🔇 Sound Off";
    el.soundGame.textContent = on ? "🔊" : "🔇";
    el.soundStart.setAttribute("aria-pressed", String(on));
    el.soundGame.setAttribute("aria-pressed", String(on));
    el.soundGame.setAttribute("aria-label", on ? "Turn sound off" : "Turn sound on");
  }

  function toggleSound() {
    state.progress.soundOn = !state.progress.soundOn;
    saveProgress();
    updateSoundButtons();
    if (state.progress.soundOn) playClick();
  }

  function showScreen(target) {
    [el.startScreen, el.gameScreen, el.resultScreen].forEach((screen) => screen.classList.toggle("is-active", screen === target));
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function startMatch() {
    const name = el.playerName.value.trim().replace(/\s+/g, " ").slice(0, 18) || "GrammarStar";
    const level = LEVELS[state.selectedLevel];
    state.progress.playerName = name;
    state.progress.team = state.selectedTeam;
    state.progress.level = state.selectedLevel;
    saveProgress();

    state.questions = chooseQuestions(level.shots, level.maxDifficulty);
    state.currentIndex = 0;
    state.match = {
      goals: 0,
      correct: 0,
      answered: 0,
      score: 0,
      coinsEarned: 0,
      starsEarned: 0,
      streak: 0,
      bestStreak: 0,
      fastest: Infinity,
      wrongTypes: {},
      tense: {
        present: { asked: 0, correct: 0 },
        past: { asked: 0, correct: 0 }
      },
      badges: new Set(),
      hadWrong: false,
      comebackStreak: 0
    };

    updateHudIdentity();
    el.shotsTotal.textContent = level.shots;
    el.shotNumberTotal.textContent = level.shots;
    showScreen(el.gameScreen);
    resizeConfettiCanvas();
    resetPitch();
    playWhistle();
    renderQuestion();
  }

  function chooseQuestions(count, maxDifficulty) {
    const pool = QUESTION_BANK.filter((q) => q.difficulty <= maxDifficulty);
    const grouped = {
      present: shuffle(pool.filter((q) => q.tense === "Present Simple")),
      past: shuffle(pool.filter((q) => q.tense === "Past Simple")),
      mixed: shuffle(pool.filter((q) => q.tense === "Mixed"))
    };
    const desired = {
      present: Math.ceil(count * 0.4),
      past: Math.ceil(count * 0.4),
      mixed: Math.max(0, count - Math.ceil(count * 0.4) * 2)
    };
    let selected = [
      ...grouped.present.slice(0, desired.present),
      ...grouped.past.slice(0, desired.past),
      ...grouped.mixed.slice(0, desired.mixed)
    ];

    // Improve type variety without weakening grammar balance.
    const wantedTypes = maxDifficulty === 1 ? ["mcq", "fill", "order", "drag"] : ["mcq", "fill", "order", "drag", "correction"];
    wantedTypes.forEach((type) => {
      if (!selected.some((q) => q.type === type)) {
        const candidate = shuffle(pool.filter((q) => q.type === type && !selected.includes(q)))[0];
        if (candidate) selected[selected.length - 1] = candidate;
      }
    });

    if (selected.length < count) {
      const extras = shuffle(pool.filter((q) => !selected.includes(q)));
      selected.push(...extras.slice(0, count - selected.length));
    }
    return shuffle(selected).slice(0, count);
  }

  function shuffle(input) {
    const arr = [...input];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function updateHudIdentity() {
    const name = state.progress.playerName;
    const team = TEAM_DATA[state.selectedTeam];
    const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
    el.hudPlayerName.textContent = name;
    el.hudTeamName.textContent = team.display;
    el.hudLevel.textContent = LEVELS[state.selectedLevel].label;
    el.avatar.textContent = initials || team.short;
    el.avatar.className = `avatar ${team.className}`;
    updateHudStats();
  }

  function renderQuestion() {
    clearTimer();
    resetPitch();
    state.answered = false;
    state.selectedAnswer = null;
    state.orderWords = [];
    el.shootButton.disabled = true;
    el.feedbackBox.hidden = true;
    el.feedbackBox.innerHTML = "";

    const q = state.questions[state.currentIndex];
    state.currentQuestion = q;
    el.tenseTag.textContent = q.tense;
    el.difficultyTag.textContent = difficultyName(q.difficulty);
    el.questionInstruction.textContent = q.instruction;
    el.questionStem.textContent = q.stem;
    el.questionTypeLabel.textContent = typeLabel(q.type);
    el.answerArea.innerHTML = "";

    renderAnswerControl(q);
    updateHudStats();
    startTimer(getTimeLimit(q));
  }

  function difficultyName(n) {
    return ["", "Rookie", "Pro", "Champion", "Legend"][n] || "Rookie";
  }

  function typeLabel(type) {
    return ({ mcq: "Multiple Choice", fill: "Fill in the Blank", order: "Word Order", drag: "Drag & Drop", correction: "Error Correction" })[type] || type;
  }

  function renderAnswerControl(q) {
    if (q.type === "mcq") renderMcq(q);
    else if (q.type === "fill") renderTextInput(q, "Type your answer here...");
    else if (q.type === "correction") renderCorrection(q);
    else if (q.type === "order") renderOrder(q);
    else if (q.type === "drag") renderDrag(q);
  }

  function renderMcq(q) {
    shuffle(q.options).forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-option";
      btn.textContent = option;
      btn.dataset.value = option;
      btn.addEventListener("click", () => {
        if (state.answered) return;
        $$(".answer-option", el.answerArea).forEach((x) => x.classList.remove("selected"));
        btn.classList.add("selected");
        state.selectedAnswer = option;
        el.shootButton.disabled = false;
        playClick();
      });
      el.answerArea.appendChild(btn);
    });
  }

  function renderTextInput(q, placeholder) {
    const input = document.createElement("input");
    input.className = "answer-input";
    input.type = "text";
    input.placeholder = placeholder;
    input.autocomplete = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "Your answer");
    input.addEventListener("input", () => {
      state.selectedAnswer = input.value;
      el.shootButton.disabled = !input.value.trim();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && input.value.trim() && !state.answered) submitAnswer();
    });
    el.answerArea.appendChild(input);
    const hint = document.createElement("small");
    hint.className = "answer-hint";
    hint.textContent = "Capital letters do not matter. Spelling and grammar do matter.";
    el.answerArea.appendChild(hint);
    setTimeout(() => input.focus(), 80);
  }

  function renderCorrection(q) {
    const sentence = document.createElement("div");
    sentence.className = "sentence-frame";
    sentence.innerHTML = `<span>${escapeHtml(q.before)}</span><span class="wrong-word">${escapeHtml(q.wrongWord)}</span><span>${escapeHtml(q.after)}</span>`;
    el.answerArea.appendChild(sentence);
    renderTextInput(q, "Type the correct word only...");
  }

  function renderOrder(q) {
    const wrap = document.createElement("div");
    wrap.className = "word-order-wrap";
    const target = document.createElement("div");
    target.className = "order-target";
    target.setAttribute("aria-label", "Your sentence");
    const bank = document.createElement("div");
    bank.className = "word-bank";

    const words = shuffle(q.words.map((word, index) => ({ word, key: `${index}-${Math.random()}` })));
    words.forEach((item) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "word-chip";
      chip.textContent = item.word;
      chip.dataset.key = item.key;
      chip.addEventListener("click", () => moveOrderChip(chip, bank, target, item.word));
      bank.appendChild(chip);
    });

    wrap.append(target, bank);
    el.answerArea.appendChild(wrap);
    const hint = document.createElement("small");
    hint.className = "answer-hint";
    hint.textContent = "Tap a word to move it. Tap it again to return it.";
    el.answerArea.appendChild(hint);
  }

  function moveOrderChip(chip, bank, target, word) {
    if (state.answered) return;
    if (chip.parentElement === bank) {
      target.appendChild(chip);
      chip.classList.add("in-target");
      state.orderWords.push({ key: chip.dataset.key, word });
    } else {
      bank.appendChild(chip);
      chip.classList.remove("in-target");
      state.orderWords = state.orderWords.filter((item) => item.key !== chip.dataset.key);
    }
    state.selectedAnswer = state.orderWords.map((item) => item.word).join(" ");
    el.shootButton.disabled = state.orderWords.length !== state.currentQuestion.words.length;
    playClick();
  }

  function renderDrag(q) {
    const wrap = document.createElement("div");
    wrap.className = "drag-wrap";
    const frame = document.createElement("div");
    frame.className = "sentence-frame";
    const before = document.createElement("span");
    before.textContent = q.before;
    const dropzone = document.createElement("div");
    dropzone.className = "blank-dropzone";
    dropzone.textContent = "Drop here";
    dropzone.tabIndex = 0;
    const after = document.createElement("span");
    after.textContent = q.after;
    frame.append(before, dropzone, after);

    const bank = document.createElement("div");
    bank.className = "drag-bank";
    shuffle(q.options).forEach((option) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "drag-chip";
      chip.textContent = option;
      chip.draggable = true;
      chip.dataset.value = option;
      chip.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", option));
      chip.addEventListener("click", () => selectDragOption(option, chip, dropzone, bank));
      bank.appendChild(chip);
    });

    dropzone.addEventListener("dragover", (event) => event.preventDefault());
    dropzone.addEventListener("drop", (event) => {
      event.preventDefault();
      const value = event.dataTransfer.getData("text/plain");
      const chip = $$(".drag-chip", bank).find((x) => x.dataset.value === value);
      if (chip) selectDragOption(value, chip, dropzone, bank);
    });
    dropzone.addEventListener("click", () => clearDragSelection(dropzone, bank));

    wrap.append(frame, bank);
    el.answerArea.appendChild(wrap);
    const hint = document.createElement("small");
    hint.className = "answer-hint";
    hint.textContent = "Drag a word to the blank, or tap it. Tap the blank to change your answer.";
    el.answerArea.appendChild(hint);
  }

  function selectDragOption(value, chip, dropzone, bank) {
    if (state.answered) return;
    $$(".drag-chip", bank).forEach((x) => {
      x.disabled = false;
      x.classList.remove("in-target");
    });
    chip.classList.add("in-target");
    chip.disabled = true;
    dropzone.textContent = value;
    dropzone.dataset.value = value;
    state.selectedAnswer = value;
    el.shootButton.disabled = false;
    playClick();
  }

  function clearDragSelection(dropzone, bank) {
    if (state.answered) return;
    dropzone.textContent = "Drop here";
    delete dropzone.dataset.value;
    $$(".drag-chip", bank).forEach((x) => {
      x.disabled = false;
      x.classList.remove("in-target");
    });
    state.selectedAnswer = null;
    el.shootButton.disabled = true;
  }

  function getTimeLimit(q) {
    return 20;
  }

  function startTimer(seconds, remainingMs = null) {
    clearTimer();
    state.timeLimit = seconds;
    state.timerRemainingMs = remainingMs ?? seconds * 1000;
    state.timerStartedAt = performance.now();
    state.timeLeft = state.timerRemainingMs / 1000;
    updateTimerUi();
    state.timerId = window.setInterval(() => {
      if (state.paused || state.answered) return;
      const elapsed = performance.now() - state.timerStartedAt;
      state.timerRemainingMs = Math.max(0, (remainingMs ?? seconds * 1000) - elapsed);
      state.timeLeft = state.timerRemainingMs / 1000;
      updateTimerUi();
      if (state.timerRemainingMs <= 0) {
        clearTimer();
        timeoutAnswer();
      }
    }, 90);
  }

  function clearTimer() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
  }

  function updateTimerUi() {
    const display = Math.max(0, Math.ceil(state.timeLeft));
    const ratio = Math.max(0, Math.min(1, state.timeLeft / state.timeLimit));
    el.timerValue.textContent = display;
    el.timerCard.style.setProperty("--timer-progress", ratio.toFixed(3));
    el.timerCard.classList.toggle("warning", state.timeLeft <= 7 && state.timeLeft > 4);
    el.timerCard.classList.toggle("danger", state.timeLeft <= 4);
    if (display <= 3 && display > 0 && Math.abs(state.timeLeft - Math.round(state.timeLeft)) < 0.09) playTick();
  }

  function submitAnswer() {
    if (state.answered || el.shootButton.disabled) return;
    evaluateAnswer(false);
  }

  function timeoutAnswer() {
    if (state.answered) return;
    state.selectedAnswer = "";
    evaluateAnswer(true);
  }

  function evaluateAnswer(timedOut) {
    state.answered = true;
    clearTimer();
    el.shootButton.disabled = true;
    const q = state.currentQuestion;
    const answerTime = Math.max(0, state.timeLimit - state.timeLeft);
    const isCorrect = !timedOut && checkAnswer(q, state.selectedAnswer);

    state.match.answered += 1;
    updateTenseStats(q, isCorrect);

    if (isCorrect) handleCorrect(q, answerTime);
    else handleWrong(q, timedOut);

    markAnswerVisuals(q, isCorrect);
    updateHudStats();
    animateKick(isCorrect);
  }

  function checkAnswer(q, value) {
    const normalized = normalize(value);
    if (q.type === "order") return normalized === normalize(q.answer);
    const accepted = q.accepted || [q.answer];
    return accepted.some((ans) => normalize(ans) === normalized);
  }

  function normalize(value) {
    return String(value ?? "")
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/[?.!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function handleCorrect(q, answerTime) {
    const m = state.match;
    m.correct += 1;
    m.goals += 1;
    m.streak += 1;
    m.bestStreak = Math.max(m.bestStreak, m.streak);
    m.fastest = Math.min(m.fastest, answerTime);
    if (m.hadWrong) m.comebackStreak += 1;

    const speedBonus = answerTime <= 5 ? 50 : answerTime <= 8 ? 25 : 0;
    const streakBonus = Math.min(100, Math.max(0, m.streak - 1) * 20);
    const difficultyBonus = (q.difficulty - 1) * 15;
    const earned = q.points + speedBonus + streakBonus + difficultyBonus;
    const coins = 10 + Math.min(10, m.streak * 2);
    const stars = answerTime <= 5 ? 2 : 1;
    m.score += earned;
    m.coinsEarned += coins;
    m.starsEarned += stars;

    if (m.goals === 1) m.badges.add("first-goal");
    if (m.streak >= 3) m.badges.add("goal-streak");
    if (answerTime <= 5) m.badges.add("fast-shooter");
    if (m.comebackStreak >= 3) m.badges.add("comeback");

    el.feedbackBox.className = "feedback-box correct";
    el.feedbackBox.innerHTML = `<strong>Correct!</strong> ${escapeHtml(q.explanation)} <b>+${earned} points</b>`;
    el.feedbackBox.hidden = false;
    playGoalSound();
  }

  function handleWrong(q, timedOut) {
    const m = state.match;
    m.streak = 0;
    m.hadWrong = true;
    m.comebackStreak = 0;
    m.wrongTypes[q.type] = (m.wrongTypes[q.type] || 0) + 1;

    el.feedbackBox.className = "feedback-box wrong";
    const reason = timedOut ? "Time is up." : "Not quite.";
    el.feedbackBox.innerHTML = `<strong>${reason}</strong> The correct answer is <b>${escapeHtml(q.answer)}</b>. ${escapeHtml(q.explanation)} <button type="button" class="secondary-button got-it-button">Got it — Next Shot</button>`;
    el.feedbackBox.hidden = false;
    $(".got-it-button", el.feedbackBox).addEventListener("click", nextQuestion);
    playMissSound();
  }

  function updateTenseStats(q, isCorrect) {
    const m = state.match;
    const add = (key) => {
      m.tense[key].asked += 1;
      if (isCorrect) m.tense[key].correct += 1;
    };
    if (q.tense === "Present Simple") add("present");
    else if (q.tense === "Past Simple") add("past");
    else { add("present"); add("past"); }
  }

  function markAnswerVisuals(q, isCorrect) {
    if (q.type === "mcq") {
      $$(".answer-option", el.answerArea).forEach((btn) => {
        btn.disabled = true;
        if (normalize(btn.dataset.value) === normalize(q.answer)) btn.classList.add("correct");
        else if (btn.classList.contains("selected") && !isCorrect) btn.classList.add("wrong");
      });
    } else if (["fill", "correction"].includes(q.type)) {
      const input = $(".answer-input", el.answerArea);
      if (input) {
        input.disabled = true;
        input.style.borderColor = isCorrect ? "#75ff55" : "#ff6677";
      }
    } else {
      $$("button", el.answerArea).forEach((btn) => btn.disabled = true);
    }
  }

  function animateKick(isCorrect) {
    resetPitch();
    // Restart every body, keeper and ball animation even on repeated shot types.
    void el.pitch.offsetWidth;
    el.pitch.classList.add("is-shooting");

    if (isCorrect) {
      const goalClass = randomChoice([
        "shoot-goal-left",
        "shoot-goal-right",
        "shoot-goal-top",
        "shoot-goal-center"
      ]);
      el.pitch.classList.add(goalClass, "goal-celebration", "crowd-cheer");
      el.resultPop.textContent = randomChoice(["Great Goal!", "Brilliant!", "Amazing Shot!", "Grammar Goal!"]);
      el.resultPop.className = "result-pop show-goal";
      state.confettiTimer = window.setTimeout(launchConfetti, 1040);
      state.nextQuestionTimer = window.setTimeout(nextQuestion, 2850);
    } else {
      const missClass = randomChoice([
        "shoot-save-left",
        "shoot-save-right",
        "shoot-miss-left",
        "shoot-miss-right",
        "shoot-miss-high"
      ]);
      el.pitch.classList.add(missClass, "miss-reaction");
      el.resultPop.textContent = missClass.startsWith("shoot-save") ? "Saved!" : "Missed!";
      el.resultPop.className = "result-pop show-miss";
    }
  }

  function resetPitch() {
    if (state.nextQuestionTimer) window.clearTimeout(state.nextQuestionTimer);
    if (state.confettiTimer) window.clearTimeout(state.confettiTimer);
    state.nextQuestionTimer = null;
    state.confettiTimer = null;
    el.pitch.classList.remove(
      "is-shooting",
      "goal-celebration",
      "miss-reaction",
      "crowd-cheer",
      "shoot-goal",
      "shoot-goal-left",
      "shoot-goal-right",
      "shoot-goal-top",
      "shoot-goal-center",
      "shoot-save",
      "shoot-save-left",
      "shoot-save-right",
      "shoot-miss-left",
      "shoot-miss-right",
      "shoot-miss-high"
    );
    el.resultPop.className = "result-pop";
    el.resultPop.textContent = "";
    clearConfetti();
  }

  function nextQuestion() {
    if (!state.answered) return;
    state.currentIndex += 1;
    if (state.currentIndex >= state.questions.length) endMatch();
    else renderQuestion();
  }

  function updateHudStats() {
    const m = state.match;
    if (!m) {
      el.coinCount.textContent = state.progress.coins;
      el.starCount.textContent = state.progress.stars;
      return;
    }
    el.coinCount.textContent = state.progress.coins + m.coinsEarned;
    el.starCount.textContent = state.progress.stars + m.starsEarned;
    el.streakCount.textContent = m.streak;
    el.goalsCount.textContent = m.goals;
    el.correctCount.textContent = m.correct;
    el.shotNumber.textContent = Math.min(state.currentIndex + 1, state.questions.length);
    el.comboLabel.textContent = `Combo x${m.streak}`;
    el.comboText.textContent = m.streak >= 3 ? `${m.streak} correct in a row!` : "Build a streak!";
    $(".combo-card").classList.toggle("active", m.streak >= 3);
    el.fastAnswerText.textContent = Number.isFinite(m.fastest) ? `Best: ${m.fastest.toFixed(1)} sec` : "Answer under 5 sec";
    el.grammarHeroText.textContent = m.correct >= 8 ? "You are on fire!" : `${m.correct} correct so far`;

    const present = percentage(m.tense.present.correct, m.tense.present.asked);
    const past = percentage(m.tense.past.correct, m.tense.past.asked);
    el.presentMasteryLabel.textContent = `${present}%`;
    el.presentMasteryBar.style.width = `${present}%`;
    el.pastMasteryLabel.textContent = `${past}%`;
    el.pastMasteryBar.style.width = `${past}%`;

    const progress = Math.round((m.answered / state.questions.length) * 100);
    el.matchProgressLabel.textContent = `${progress}%`;
    el.matchProgressBar.style.width = `${progress}%`;
  }

  function percentage(correct, asked) {
    return asked ? Math.round((correct / asked) * 100) : 0;
  }

  function endMatch() {
    clearTimer();
    const m = state.match;
    const total = state.questions.length;
    const accuracy = percentage(m.correct, total);
    if (accuracy === 100) m.badges.add("perfect-match");
    if (percentage(m.tense.present.correct, m.tense.present.asked) >= 80 && m.tense.present.asked >= 3) m.badges.add("present-star");
    if (percentage(m.tense.past.correct, m.tense.past.asked) >= 80 && m.tense.past.asked >= 3) m.badges.add("past-hero");
    if (m.correct >= Math.ceil(total * .8)) m.badges.add("grammar-hero");

    state.progress.coins += m.coinsEarned;
    state.progress.stars += m.starsEarned;
    state.progress.highScore = Math.max(state.progress.highScore, m.score);
    state.progress.bestStreak = Math.max(state.progress.bestStreak, m.bestStreak);
    state.progress.matches += 1;
    state.progress.totalCorrect += m.correct;
    state.progress.totalQuestions += total;
    state.progress.badges = [...new Set([...state.progress.badges, ...m.badges])];
    saveProgress();

    fillResultScreen(accuracy);
    updateSavedSummary();
    showScreen(el.resultScreen);
    if (accuracy >= 70) playVictorySound();
  }

  function fillResultScreen(accuracy) {
    const m = state.match;
    const total = state.questions.length;
    const title = accuracy >= 90 ? "Grammar Champion!" : accuracy >= 70 ? "Great Match!" : accuracy >= 50 ? "Good Effort!" : "Keep Training!";
    const kicker = accuracy >= 70 ? "MATCH WON" : "MATCH COMPLETE";
    const message = accuracy >= 90
      ? `${state.progress.playerName}, you controlled both tenses like a champion.`
      : accuracy >= 70
        ? `${state.progress.playerName}, strong performance. One more match can make your grammar even sharper.`
        : `${state.progress.playerName}, review the coach’s note and try again. Every match builds skill.`;

    el.resultKicker.textContent = kicker;
    el.resultTitle.textContent = title;
    el.resultMessage.textContent = message;
    el.resultGoals.textContent = `${m.goals}/${total}`;
    el.resultAccuracy.textContent = `${accuracy}%`;
    el.resultStreak.textContent = m.bestStreak;
    el.resultScore.textContent = m.score.toLocaleString();
    el.resultCoins.textContent = m.coinsEarned;
    el.resultStars.textContent = m.starsEarned;
    el.coachNote.textContent = createCoachNote();
    renderBadges([...m.badges]);
  }

  function createCoachNote() {
    const m = state.match;
    const p = percentage(m.tense.present.correct, m.tense.present.asked);
    const past = percentage(m.tense.past.correct, m.tense.past.asked);
    const weakestType = Object.entries(m.wrongTypes).sort((a, b) => b[1] - a[1])[0]?.[0];
    const typeAdvice = {
      mcq: "Read every time expression before choosing a verb form.",
      fill: "Say the whole sentence quietly before typing the missing word.",
      order: "Start with the subject, then place the helper and main verb correctly.",
      drag: "Check the subject and time word before moving your choice.",
      correction: "After do, does, did, don’t, doesn’t, or didn’t, check whether the base verb is needed."
    };

    if (p >= 80 && past >= 80) return `Excellent balance: Present Simple ${p}% and Past Simple ${past}%. ${weakestType ? typeAdvice[weakestType] : "Keep practising mixed sentences."}`;
    if (p < past) return `Your Past Simple is stronger. Focus on Present Simple: add -s/-es with he, she, and it, and use does/doesn’t + base verb. ${weakestType ? typeAdvice[weakestType] : ""}`;
    if (past < p) return `Your Present Simple is stronger. Focus on Past Simple irregular verbs and remember: did/didn’t + base verb. ${weakestType ? typeAdvice[weakestType] : ""}`;
    return `Both tenses are developing together. Look carefully for time signals such as every day, usually, yesterday, last, and ago. ${weakestType ? typeAdvice[weakestType] : ""}`;
  }

  const BADGES = {
    "first-goal": ["⚽", "First Goal", "Score your first grammar goal"],
    "goal-streak": ["🔥", "Goal Streak", "Get 3 correct answers in a row"],
    "fast-shooter": ["⚡", "Fast Shooter", "Answer correctly in under 5 seconds"],
    "comeback": ["🚀", "Comeback Champion", "Build a streak after a mistake"],
    "perfect-match": ["💯", "Perfect Match", "Answer every question correctly"],
    "present-star": ["🌞", "Present Simple Star", "Score 80% or more in Present Simple"],
    "past-hero": ["⏳", "Past Simple Hero", "Score 80% or more in Past Simple"],
    "grammar-hero": ["📚", "Grammar Hero", "Score at least 80% overall"]
  };

  function renderBadges(ids) {
    el.badgeShelf.innerHTML = "";
    if (!ids.length) {
      el.badgeShelf.innerHTML = `<p>Score more goals to unlock a badge in your next match.</p>`;
      return;
    }
    ids.forEach((id) => {
      const data = BADGES[id];
      if (!data) return;
      const node = el.badgeTemplate.content.cloneNode(true);
      $("article > span", node).textContent = data[0];
      $("strong", node).textContent = data[1];
      $("small", node).textContent = data[2];
      el.badgeShelf.appendChild(node);
    });
  }

  function pauseGame() {
    if (!el.gameScreen.classList.contains("is-active") || state.answered || state.paused) return;
    state.paused = true;
    clearTimer();
    el.pauseDialog.showModal();
  }

  function resumeGame() {
    if (!state.paused) return;
    state.paused = false;
    startTimer(state.timeLimit, state.timerRemainingMs);
  }

  function quitToHome() {
    clearTimer();
    state.paused = false;
    showHome();
  }

  function showHome() {
    clearTimer();
    el.playerName.value = state.progress.playerName;
    state.selectedTeam = state.progress.team;
    state.selectedLevel = state.progress.level;
    updateTeamSelection();
    updateLevelSelection();
    updateSavedSummary();
    showScreen(el.startScreen);
  }

  function resetProgress() {
    const confirmed = window.confirm("Reset all saved coins, stars, badges, and match records? This cannot be undone.");
    if (!confirmed) return;
    state.progress = { ...DEFAULT_PROGRESS, playerName: state.progress.playerName, soundOn: state.progress.soundOn };
    state.selectedTeam = "madrid";
    state.selectedLevel = "rookie";
    saveProgress();
    updateSoundButtons();
    showHome();
  }

  function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  // Confetti
  let confettiAnimation = null;
  let particles = [];

  function resizeConfettiCanvas() {
    const rect = el.pitch.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.confettiCanvas.width = Math.max(1, Math.round(rect.width * dpr));
    el.confettiCanvas.height = Math.max(1, Math.round(rect.height * dpr));
    el.confettiCanvas.style.width = `${rect.width}px`;
    el.confettiCanvas.style.height = `${rect.height}px`;
    const ctx = el.confettiCanvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function launchConfetti() {
    clearConfetti();
    resizeConfettiCanvas();
    const rect = el.pitch.getBoundingClientRect();
    particles = Array.from({ length: 95 }, () => ({
      x: rect.width * (.65 + Math.random() * .18),
      y: rect.height * (.25 + Math.random() * .2),
      vx: (Math.random() - .5) * 8,
      vy: -2 - Math.random() * 6,
      gravity: .16 + Math.random() * .08,
      size: 4 + Math.random() * 7,
      rotation: Math.random() * Math.PI,
      vr: (Math.random() - .5) * .3,
      hue: Math.floor(Math.random() * 360),
      life: 70 + Math.random() * 45
    }));
    animateConfetti();
  }

  function animateConfetti() {
    const canvas = el.confettiCanvas;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `hsl(${p.hue} 90% 60%)`;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    particles = particles.filter((p) => p.life > 0 && p.y < height + 30);
    if (particles.length) confettiAnimation = requestAnimationFrame(animateConfetti);
  }

  function clearConfetti() {
    if (confettiAnimation) cancelAnimationFrame(confettiAnimation);
    confettiAnimation = null;
    particles = [];
    const ctx = el.confettiCanvas.getContext("2d");
    ctx.clearRect(0, 0, el.confettiCanvas.width, el.confettiCanvas.height);
  }

  // Web Audio — generated locally, so the game has no required external audio files.
  function getAudioContext() {
    if (!state.progress.soundOn) return null;
    if (!state.audioContext) state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (state.audioContext.state === "suspended") state.audioContext.resume();
    return state.audioContext;
  }

  function tone(frequency, duration = .12, type = "sine", volume = .07, delay = 0) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + delay + .015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + .02);
  }

  function noise(duration = .5, volume = .04, delay = 0) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const length = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 900;
    filter.Q.value = .5;
    source.buffer = buffer;
    gain.gain.value = volume;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(ctx.currentTime + delay);
  }

  function playClick() { tone(540, .07, "sine", .035); }
  function playTick() { tone(880, .055, "square", .025); }
  function playWhistle() { tone(1450, .16, "sine", .045); tone(1750, .2, "sine", .035, .13); }
  function playGoalSound() {
    tone(120, .1, "triangle", .09);
    tone(660, .15, "square", .05, .1);
    tone(880, .18, "square", .05, .22);
    tone(1100, .24, "sine", .055, .36);
    noise(.85, .07, .22);
  }
  function playMissSound() { tone(230, .22, "sawtooth", .045); tone(150, .32, "triangle", .04, .18); }
  function playVictorySound() {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, .34, "triangle", .045, i * .16));
    noise(1.1, .055, .25);
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    }
  }

  init();
})();
