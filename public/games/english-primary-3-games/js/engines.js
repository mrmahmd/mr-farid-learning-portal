(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

  const beep = (ok = true) => {
    const state = window.GameApp?.state;
    if (state && !state.sound) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = ok ? 'sine' : 'square';
      osc.frequency.value = ok ? 680 : 180;
      gain.gain.setValueAtTime(0.08, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.22);
      osc.connect(gain); gain.connect(ac.destination);
      osc.start(); osc.stop(ac.currentTime + 0.23);
    } catch (_) {}
  };

  const normalizeQuestion = (q) => {
    if (!q) return { prompt: 'Choose the correct answer.', options: ['A', 'B', 'C'], answer: 'A', explanation: '' };
    if (q.type === 'trueFalse') return { ...q, options: ['True', 'False'], answer: String(q.answer) };
    if (q.type === 'reorder') {
      const words = q.words || q.options || String(q.answer || '').replace(/[.?!]/g, '').split(/\s+/);
      const answer = Array.isArray(q.answer) ? q.answer.join(' ') : String(q.answer || words.join(' ')).replace(/[.?!]$/g, '');
      return { ...q, prompt: q.prompt || 'Put the words in the correct order.', options: shuffle(words), answer };
    }
    if (q.type === 'dragMatch') {
      const pairs = q.pairs || [];
      const first = pairs[0] || { sentence: 'Word', answer: 'Match' };
      const left = first.left || first.sentence || 'Word';
      const right = first.right || first.answer || 'Match';
      return { ...q, prompt: `Match: ${left}`, options: shuffle(pairs.map((p) => p.right || p.answer)), answer: right };
    }
    return { ...q, options: q.options || ['True', 'False'] };
  };

  const getQuestions = (ctx, count = 8) => shuffle(ctx.questions.map(normalizeQuestion)).slice(0, count);

  function shell(ctx, title, instructions) {
    ctx.container.innerHTML = `
      <section class="game-shell engine-${escapeHtml(ctx.game.engine)}">
        <header class="game-hud glass-panel">
          <button class="icon-btn game-exit" aria-label="Back">←</button>
          <div class="game-hud-title">
            <span class="game-icon">${ctx.game.icon}</span>
            <div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(instructions)}</small></div>
          </div>
          <div class="hud-meters">
            <span>⭐ <b data-hud-score>0</b></span>
            <span>🔥 <b data-hud-combo>0</b></span>
            <span>❤️ <b data-hud-lives>3</b></span>
          </div>
        </header>
        <div class="game-stage" data-game-stage></div>
        <div class="game-toast" data-game-toast></div>
      </section>`;
    $('.game-exit', ctx.container).addEventListener('click', () => ctx.navigate(ctx.backHash || `#lesson/${ctx.lesson.id}`));
    return {
      stage: $('[data-game-stage]', ctx.container),
      score: $('[data-hud-score]', ctx.container),
      combo: $('[data-hud-combo]', ctx.container),
      lives: $('[data-hud-lives]', ctx.container),
      toast: $('[data-game-toast]', ctx.container)
    };
  }

  function toast(ui, message, ok = true) {
    ui.toast.textContent = message;
    ui.toast.className = `game-toast show ${ok ? 'success' : 'error'}`;
    beep(ok);
    clearTimeout(ui.toast._t);
    ui.toast._t = setTimeout(() => ui.toast.className = 'game-toast', 1600);
  }

  function finish(ctx, score, summary) {
    const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 45 ? 1 : 0;
    ctx.container.innerHTML = `
      <section class="game-result-page">
        <div class="result-card glass-panel">
          <div class="result-burst">${score >= 70 ? '🏆' : '🎯'}</div>
          <p class="eyebrow">Mission Complete</p>
          <h1>${escapeHtml(ctx.game.title)}</h1>
          <div class="result-score"><strong>${Math.round(score)}%</strong><span>${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</span></div>
          <p>${escapeHtml(summary)}</p>
          <div class="result-rewards">
            <span>+${ctx.game.reward} XP</span><span>+${Math.round(ctx.game.reward * 0.55)} Coins</span>
          </div>
          <div class="result-actions">
            <button class="btn secondary" data-replay>Play Again</button>
            <button class="btn primary" data-continue>Back to Lesson</button>
          </div>
        </div>
      </section>`;
    ctx.onComplete(score);
    $('[data-replay]', ctx.container).addEventListener('click', () => window.GameEngines.render(ctx));
    $('[data-continue]', ctx.container).addEventListener('click', () => ctx.navigate(ctx.backHash || `#lesson/${ctx.lesson.id}`));
  }

  function questionCard(q, onAnswer, title = 'Choose the correct answer') {
    const wrap = document.createElement('div');
    wrap.className = 'question-modal glass-panel';
    wrap.innerHTML = `
      <span class="question-kicker">${escapeHtml(title)}</span>
      <h2>${escapeHtml(q.prompt)}</h2>
      <div class="question-options"></div>
      <p class="question-feedback" aria-live="polite"></p>`;
    const options = $('.question-options', wrap);
    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'answer-option';
      btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}`;
      btn.addEventListener('click', () => {
        if (wrap.dataset.answered) return;
        wrap.dataset.answered = '1';
        const ok = String(option).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
        btn.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) {
          [...options.children].forEach((b) => {
            if (b.textContent.slice(1).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) b.classList.add('correct');
          });
        }
        $('.question-feedback', wrap).textContent = ok ? 'Excellent! Mission power unlocked.' : `Correct answer: ${q.answer}`;
        setTimeout(() => onAnswer(ok, option, wrap), 650);
      });
      options.appendChild(btn);
    });
    return wrap;
  }

  function penalty(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Answer, aim, and score. Five kicks decide the cup.');
    const qs = getQuestions(ctx, 5);
    let round = 0, goals = 0, combo = 0, lives = 3;
    ui.stage.innerHTML = `
      <div class="stadium-scene">
        <div class="stadium-lights"></div>
        <div class="scoreboard">KICK <b data-round>1</b>/5 <span>GOALS <b data-goals>0</b></span></div>
        <div class="goal-frame"><div class="goal-net"></div><div class="keeper">🧤</div></div>
        <div class="penalty-player">🧒🏽</div><div class="football-ball">⚽</div>
        <div class="aim-controls hidden"><button data-dir="left">↖ Left</button><button data-dir="center">↑ Center</button><button data-dir="right">Right ↗</button></div>
        <div class="mission-panel"></div>
      </div>`;
    const scene = $('.stadium-scene', ui.stage);
    const panel = $('.mission-panel', scene);
    const keeper = $('.keeper', scene);
    const ball = $('.football-ball', scene);
    const aim = $('.aim-controls', scene);
    const updateHud = () => { ui.score.textContent = goals * 20; ui.combo.textContent = combo; ui.lives.textContent = lives; };

    const next = () => {
      if (round >= 5 || lives <= 0) return finish(ctx, goals * 20, `You scored ${goals} goal${goals === 1 ? '' : 's'} from five kicks.`);
      $('[data-round]', scene).textContent = round + 1;
      panel.innerHTML = '';
      aim.classList.add('hidden');
      ball.className = 'football-ball'; keeper.className = 'keeper';
      const card = questionCard(qs[round], (ok) => {
        combo = ok ? combo + 1 : 0; if (!ok) lives -= 1; updateHud();
        toast(ui, ok ? 'Power Shot unlocked! Choose your corner.' : 'You can still shoot, but the keeper has an advantage.', ok);
        panel.innerHTML = '<div class="shoot-ready">Choose your shot direction!</div>';
        aim.classList.remove('hidden');
        aim.querySelectorAll('button').forEach((btn) => btn.disabled = false);
        aim._quality = ok ? 0.9 : 0.35;
      }, 'Win the right to shoot');
      panel.appendChild(card);
    };

    aim.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-dir]'); if (!btn) return;
      aim.querySelectorAll('button').forEach((b) => b.disabled = true);
      const dir = btn.dataset.dir;
      const keeperDir = ['left', 'center', 'right'][Math.floor(Math.random() * 3)];
      keeper.classList.add(`dive-${keeperDir}`); ball.classList.add(`shoot-${dir}`);
      const scored = dir !== keeperDir && Math.random() < aim._quality;
      setTimeout(() => {
        if (scored) { goals += 1; toast(ui, 'GOAL! Brilliant finish!', true); } else { toast(ui, 'Saved! Get ready for the next kick.', false); }
        $('[data-goals]', scene).textContent = goals; round += 1; updateHud(); setTimeout(next, 850);
      }, 850);
    });
    updateHud(); next();
  }

  function racing(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Steer with ← →. Correct answers charge your nitro.');
    const qs = getQuestions(ctx, 6);
    let checkpoint = 0, progress = 0, speed = 1, lane = 1, combo = 0, lives = 3, correct = 0;
    ui.stage.innerHTML = `
      <div class="race-scene">
        <div class="race-sky"><div class="mountains"></div></div>
        <div class="race-road"><div class="road-lines"></div><div class="race-car lane-1">🏎️</div><div class="rival-car">🚙</div><div class="road-obstacle">🚧</div></div>
        <div class="race-dashboard glass-panel"><span>Checkpoint <b data-check>1</b>/6</span><div class="race-progress"><i></i></div><span>Nitro <b data-nitro>0</b>%</span></div>
        <div class="race-controls"><button data-left>←</button><button data-nitro-btn>⚡ NITRO</button><button data-right>→</button></div>
        <div class="race-question"></div>
      </div>`;
    const scene = $('.race-scene', ui.stage), car = $('.race-car', scene), qbox = $('.race-question', scene), bar = $('.race-progress i', scene);
    const move = (delta) => { lane = clamp(lane + delta, 0, 2); car.className = `race-car lane-${lane}`; };
    $('[data-left]', scene).onclick = () => move(-1); $('[data-right]', scene).onclick = () => move(1);
    const key = (e) => { if (e.key === 'ArrowLeft') move(-1); if (e.key === 'ArrowRight') move(1); };
    window.addEventListener('keydown', key);
    let nitro = 0;
    $('[data-nitro-btn]', scene).onclick = () => { if (nitro >= 30) { speed += 0.55; nitro -= 30; scene.classList.add('nitro-on'); setTimeout(() => scene.classList.remove('nitro-on'), 900); update(); } };
    const update = () => { ui.score.textContent = Math.round(progress); ui.combo.textContent = combo; ui.lives.textContent = lives; bar.style.width = `${progress}%`; $('[data-nitro]', scene).textContent = nitro; };
    const end = () => { window.removeEventListener('keydown', key); finish(ctx, correct / 6 * 100, `You finished the race with ${correct} correct checkpoint${correct === 1 ? '' : 's'}.`); };
    const next = () => {
      if (checkpoint >= 6 || lives <= 0) return end();
      $('[data-check]', scene).textContent = checkpoint + 1;
      qbox.innerHTML = '';
      qbox.appendChild(questionCard(qs[checkpoint], (ok) => {
        if (ok) { correct++; combo++; nitro = clamp(nitro + 25 + combo * 2, 0, 100); progress += 16.7; speed = 1 + combo * 0.08; toast(ui, 'Checkpoint cleared — nitro charged!', true); }
        else { combo = 0; lives--; progress += 8; speed = 0.75; scene.classList.add('race-bump'); setTimeout(() => scene.classList.remove('race-bump'), 600); toast(ui, 'Wrong route — recover and keep racing!', false); }
        checkpoint++; update(); setTimeout(next, 800);
      }, 'Checkpoint challenge'));
    };
    update(); next();
  }

  function runner(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Move to the gate with the correct answer.');
    const qs = getQuestions(ctx, 6);
    let round = 0, score = 0, lane = 1, lives = 3, combo = 0;
    ui.stage.innerHTML = `<div class="runner-scene"><div class="runner-world"><div class="runner-avatar lane-1">🏃🏽</div><div class="gate-row"></div></div><div class="runner-prompt glass-panel"></div><div class="runner-controls"><button data-left>←</button><button data-jump>JUMP</button><button data-right>→</button></div></div>`;
    const scene = $('.runner-scene', ui.stage), avatar = $('.runner-avatar', scene), gates = $('.gate-row', scene), prompt = $('.runner-prompt', scene);
    const move = (d) => { lane = clamp(lane + d, 0, 2); avatar.className = `runner-avatar lane-${lane}`; };
    $('[data-left]', scene).onclick = () => move(-1); $('[data-right]', scene).onclick = () => move(1);
    const next = () => {
      if (round >= 6 || lives <= 0) return finish(ctx, score / 6 * 100, `You passed ${score} of 6 challenge gates.`);
      const q = qs[round]; prompt.innerHTML = `<span>Gate ${round + 1}/6</span><h2>${escapeHtml(q.prompt)}</h2>`;
      gates.innerHTML = q.options.slice(0, 3).map((o, i) => `<button class="answer-gate gate-${i}" data-lane="${i}" data-value="${escapeHtml(o)}"><b>${String.fromCharCode(65 + i)}</b><span>${escapeHtml(o)}</span></button>`).join('');
      $$('button', gates).forEach((b) => b.onclick = () => { lane = Number(b.dataset.lane); avatar.className = `runner-avatar lane-${lane} jumping`; const ok = b.dataset.value.toLowerCase() === String(q.answer).toLowerCase(); setTimeout(() => { avatar.className = `runner-avatar lane-${lane}`; if (ok) { score++; combo++; b.classList.add('passed'); toast(ui, 'Perfect gate!', true); } else { lives--; combo = 0; b.classList.add('crash'); toast(ui, `Correct gate: ${q.answer}`, false); } ui.score.textContent = Math.round(score / 6 * 100); ui.combo.textContent = combo; ui.lives.textContent = lives; round++; setTimeout(next, 650); }, 650); });
    };
    next();
  }

  function phonics(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Catch target-sound words and avoid distractors.');
    const target = ctx.lesson.phonics?.words || ctx.lesson.vocab.slice(0, 5).map((v) => v.word);
    const distract = ctx.lesson.vocab.map((v) => v.word).filter((w) => !target.includes(w)).concat(['apple', 'book', 'chair', 'sun', 'fish']);
    let caught = 0, misses = 0, time = 30, combo = 0, timer;
    ui.stage.innerHTML = `<div class="phonics-scene"><div class="phonics-banner glass-panel"><span>Target sound</span><h2>${escapeHtml(ctx.lesson.phonics?.title || 'Target Words')}</h2><p>${escapeHtml(ctx.lesson.phonics?.sound || '')}</p></div><div class="phonics-arena"></div><div class="phonics-meter">Catch <b data-caught>0</b>/10 <span>⏱ <b data-time>30</b>s</span></div></div>`;
    const arena = $('.phonics-arena', ui.stage);
    const spawn = () => {
      if (caught >= 10 || time <= 0 || misses >= 5) return;
      const isTarget = Math.random() < 0.62;
      const word = isTarget ? target[Math.floor(Math.random() * target.length)] : distract[Math.floor(Math.random() * distract.length)];
      const chip = document.createElement('button'); chip.className = 'falling-word'; chip.textContent = word; chip.dataset.target = isTarget ? '1' : '0'; chip.style.left = `${5 + Math.random() * 82}%`; chip.style.animationDuration = `${3.8 + Math.random() * 2.3}s`;
      chip.onclick = () => { const ok = chip.dataset.target === '1'; if (ok) { caught++; combo++; toast(ui, 'Target word caught!', true); } else { misses++; combo = 0; toast(ui, 'That word has a different sound.', false); } chip.remove(); update(); };
      chip.addEventListener('animationend', () => { if (chip.dataset.target === '1') { misses++; combo = 0; update(); } chip.remove(); }); arena.appendChild(chip);
    };
    const update = () => { $('[data-caught]', ui.stage).textContent = caught; $('[data-time]', ui.stage).textContent = time; ui.score.textContent = caught * 10; ui.combo.textContent = combo; ui.lives.textContent = Math.max(0, 5 - misses); if (caught >= 10 || time <= 0 || misses >= 5) { clearInterval(timer); setTimeout(() => finish(ctx, caught * 10, `You caught ${caught} target-sound words.`), 500); } };
    timer = setInterval(() => { time--; if (Math.random() < 0.9) spawn(); update(); }, 900); for (let i = 0; i < 4; i++) setTimeout(spawn, i * 450); update();
  }

  function dialogue(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Arrange the conversation, then complete quick dialogue missions.');
    const baseLines = ctx.lesson.reading?.events?.slice(0, 5) || ctx.lesson.notes.slice(0, 5).map((n) => n.body);
    const correct = baseLines.length >= 4 ? baseLines : ['Say hello.', 'Ask a question.', 'Answer politely.', 'Say goodbye.'];
    let ordered = shuffle(correct), score = 0, phase = 1;
    ui.stage.innerHTML = `<div class="dialogue-scene"><div class="dialogue-characters"><div class="speaker boy">🧒🏽<span>Omar</span></div><div class="speech-stage"></div><div class="speaker girl">👧🏽<span>Laila</span></div></div><div class="dialogue-board glass-panel"><h2>Build the conversation</h2><p>Drag the lines or use the arrow buttons.</p><div class="sortable-lines"></div><button class="btn primary" data-check>Check Conversation</button></div></div>`;
    const list = $('.sortable-lines', ui.stage);
    const render = () => { list.innerHTML = ordered.map((line, i) => `<div class="sortable-line" draggable="true" data-index="${i}"><span>${i + 1}</span><p>${escapeHtml(line)}</p><div><button data-up="${i}">↑</button><button data-down="${i}">↓</button></div></div>`).join(''); wire(); };
    let dragged = null;
    const wire = () => {
      $$('.sortable-line', list).forEach((item) => { item.ondragstart = () => dragged = Number(item.dataset.index); item.ondragover = (e) => e.preventDefault(); item.ondrop = () => { const target = Number(item.dataset.index); const [m] = ordered.splice(dragged, 1); ordered.splice(target, 0, m); render(); }; });
      $$('[data-up]', list).forEach((b) => b.onclick = () => { const i = +b.dataset.up; if (i > 0) [ordered[i - 1], ordered[i]] = [ordered[i], ordered[i - 1]]; render(); });
      $$('[data-down]', list).forEach((b) => b.onclick = () => { const i = +b.dataset.down; if (i < ordered.length - 1) [ordered[i + 1], ordered[i]] = [ordered[i], ordered[i + 1]]; render(); });
    };
    $('[data-check]', ui.stage).onclick = () => { const ok = ordered.every((x, i) => x === correct[i]); if (ok) { score = 55; toast(ui, 'Conversation built perfectly!', true); phase2(); } else { toast(ui, 'The order needs another try.', false); } };
    const phase2 = () => {
      phase = 2; const qs = getQuestions(ctx, 3); let i = 0, good = 0; $('.dialogue-board', ui.stage).innerHTML = '<div class="dialogue-quiz"></div>'; const box = $('.dialogue-quiz', ui.stage);
      const next = () => { if (i >= qs.length) return finish(ctx, score + good * 15, `You built the conversation and solved ${good} dialogue missions.`); box.innerHTML = ''; box.appendChild(questionCard(qs[i], (ok) => { if (ok) good++; i++; next(); }, 'Dialogue mission')); }; next();
    };
    render();
  }

  function memory(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Match each word with its meaning.');
    const pairs = ctx.lesson.vocab.slice(0, 6).map((v, i) => ({ key: String(i), a: v.word, b: v.meaning }));
    let cards = shuffle(pairs.flatMap((p) => [{ id: `${p.key}a`, key: p.key, text: p.a }, { id: `${p.key}b`, key: p.key, text: p.b }]));
    let first = null, matched = 0, moves = 0;
    ui.stage.innerHTML = `<div class="memory-scene"><div class="memory-grid"></div><div class="memory-status glass-panel">Pairs <b data-pairs>0</b>/6 · Moves <b data-moves>0</b></div></div>`;
    const grid = $('.memory-grid', ui.stage);
    const render = () => { grid.innerHTML = cards.map((c) => `<button class="memory-card" data-id="${c.id}" data-key="${c.key}"><span class="card-back">?</span><span class="card-front">${escapeHtml(c.text)}</span></button>`).join(''); $$('.memory-card', grid).forEach((b) => b.onclick = () => flip(b)); };
    const flip = (b) => { if (b.classList.contains('open') || b.classList.contains('matched')) return; b.classList.add('open'); if (!first) return first = b; moves++; $('[data-moves]', ui.stage).textContent = moves; if (first.dataset.key === b.dataset.key) { first.classList.add('matched'); b.classList.add('matched'); matched++; $('[data-pairs]', ui.stage).textContent = matched; first = null; toast(ui, 'Great match!', true); if (matched === 6) setTimeout(() => finish(ctx, Math.max(55, 100 - Math.max(0, moves - 6) * 5), `You matched all six pairs in ${moves} moves.`), 650); } else { const prev = first; first = null; toast(ui, 'Try a different pair.', false); setTimeout(() => { prev.classList.remove('open'); b.classList.remove('open'); }, 850); } };
    render();
  }

  function detective(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Read the clue and inspect the evidence.');
    const qs = getQuestions(ctx, 6); let i = 0, solved = 0, lives = 3;
    ui.stage.innerHTML = `<div class="detective-scene"><div class="detective-office"><div class="detective-avatar">🕵🏽‍♂️</div><div class="evidence-board"></div></div><div class="detective-case glass-panel"></div></div>`;
    const board = $('.evidence-board', ui.stage), box = $('.detective-case', ui.stage);
    const next = () => { if (i >= qs.length || lives <= 0) return finish(ctx, solved / 6 * 100, `You solved ${solved} of 6 cases.`); const q = qs[i]; board.innerHTML = q.options.slice(0, 3).map((o, n) => `<div class="evidence-card"><span>${['🧑🏽','👧🏽','👨🏽‍🏫'][n]}</span><b>${escapeHtml(o)}</b></div>`).join(''); box.innerHTML = ''; box.appendChild(questionCard(q, (ok) => { if (ok) solved++; else lives--; i++; ui.score.textContent = Math.round(solved / 6 * 100); ui.lives.textContent = lives; next(); }, `Case ${i + 1}: Find the best clue`)); };
    next();
  }

  function story(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Explore story scenes, then put events in order.');
    const events = (ctx.lesson.reading?.events || ctx.lesson.notes.map((n) => n.body)).slice(0, 5);
    const correct = events.length >= 4 ? events : ['The story begins.', 'A problem appears.', 'The characters work together.', 'The story ends.'];
    let scenes = shuffle(correct), stars = 0;
    ui.stage.innerHTML = `<div class="story-scene"><div class="story-map">${scenes.map((s, i) => `<div class="story-location" style="--i:${i}"><span>${['🏫','🌳','🏛️','⚽','🏆'][i]}</span><small>Scene ${i + 1}</small></div>`).join('')}</div><div class="story-panel glass-panel"><h2>Order the story scenes</h2><div class="story-sort"></div><button class="btn primary" data-check-story>Open the final scene</button></div></div>`;
    const list = $('.story-sort', ui.stage); let drag = null;
    const render = () => { list.innerHTML = scenes.map((s, i) => `<div class="story-chip" draggable="true" data-i="${i}"><b>${i + 1}</b>${escapeHtml(s)}<span><button data-up="${i}">↑</button><button data-down="${i}">↓</button></span></div>`).join(''); $$('.story-chip', list).forEach((x) => { x.ondragstart = () => drag = +x.dataset.i; x.ondragover = (e) => e.preventDefault(); x.ondrop = () => { const t = +x.dataset.i; const [m] = scenes.splice(drag,1); scenes.splice(t,0,m); render(); }; }); $$('[data-up]', list).forEach((b) => b.onclick = () => { const i=+b.dataset.up; if(i>0)[scenes[i-1],scenes[i]]=[scenes[i],scenes[i-1]]; render(); }); $$('[data-down]', list).forEach((b) => b.onclick = () => { const i=+b.dataset.down; if(i<scenes.length-1)[scenes[i+1],scenes[i]]=[scenes[i],scenes[i+1]]; render(); }); };
    $('[data-check-story]', ui.stage).onclick = () => { const ok = scenes.every((s,i)=>s===correct[i]); if(ok) { toast(ui,'Story path unlocked!',true); finish(ctx,100,'You rebuilt the complete story in the correct order.'); } else toast(ui,'One or more scenes are out of order.',false); };
    render();
  }

  function maze(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Navigate the map. Language gates protect the shortest path.');
    const path = [[0,0],[1,0],[1,1],[2,1],[3,1],[3,2],[3,3],[4,3],[4,4]];
    const qs = getQuestions(ctx, 6); let step = 0, qIndex = 0, correct = 0, lives = 3;
    ui.stage.innerHTML = `<div class="maze-scene"><div class="maze-grid"></div><div class="maze-side glass-panel"><h2>Mission Map</h2><p>Follow the glowing path to the treasure.</p><div class="maze-question"></div><div class="maze-controls"><button data-up>↑</button><div><button data-left>←</button><button data-down>↓</button><button data-right>→</button></div></div></div></div>`;
    const grid = $('.maze-grid', ui.stage), box = $('.maze-question', ui.stage);
    const draw = () => { grid.innerHTML = Array.from({length:25},(_,i)=>{const r=Math.floor(i/5),c=i%5,pi=path.findIndex(([x,y])=>x===c&&y===r),active=pi===step;return `<div class="maze-cell ${pi>=0?'path':''} ${active?'player':''} ${i===24?'goal':''}">${active?'🧒🏽':i===24?'🏆':pi>=0&&pi>step?'✨':''}</div>`}).join(''); };
    const tryMove = (dx,dy) => { const [x,y]=path[step], [nx,ny]=path[step+1]||[]; if(x+dx===nx&&y+dy===ny){ if(step>0&&step%2===0&&qIndex<qs.length) return gate(); step++; draw(); if(step===path.length-1) finish(ctx, Math.max(40, correct/Math.max(1,qIndex)*100), `You reached the treasure with ${correct} language gates cleared.`); } else toast(ui,'A wall blocks that direction.',false); };
    const gate = () => { box.innerHTML=''; box.appendChild(questionCard(qs[qIndex],(ok)=>{qIndex++; if(ok){correct++;step++;toast(ui,'Gate unlocked!',true);}else{lives--;toast(ui,'The gate stayed locked. Try the next path clue.',false);}ui.lives.textContent=lives;draw();box.innerHTML='<p class="maze-ready">Choose your next direction.</p>'; if(lives<=0) finish(ctx,correct/6*100,'The maze mission ended. Review the clues and try again.');},'Language gate')); };
    $('[data-up]',ui.stage).onclick=()=>tryMove(0,-1); $('[data-down]',ui.stage).onclick=()=>tryMove(0,1); $('[data-left]',ui.stage).onclick=()=>tryMove(-1,0); $('[data-right]',ui.stage).onclick=()=>tryMove(1,0); draw(); box.innerHTML='<p class="maze-ready">Start at the top-left corner.</p>';
  }

  function builder(ctx) {
    const ui = shell(ctx, ctx.game.title, 'Drag the correct pieces into the mission slots.');
    const reorder = ctx.questions.find((q)=>q.type==='reorder');
    const words = reorder?.words || (Array.isArray(reorder?.options)?reorder.options:null) || ctx.lesson.vocab.slice(0,5).map(v=>v.word);
    const answerWords = reorder ? String(reorder.answer).replace(/[.?!]/g,'').split(/\s+/) : words.slice();
    let bank=shuffle(words), slots=Array(answerWords.length).fill(null), selected=null;
    ui.stage.innerHTML=`<div class="builder-scene"><div class="builder-world"><div class="construction-zone"><div class="builder-avatar">👷🏽‍♀️</div><div class="build-structure">${answerWords.map(()=>'<div class="structure-block"></div>').join('')}</div></div></div><div class="builder-panel glass-panel"><h2>Build the mission phrase</h2><div class="builder-slots"></div><div class="builder-bank"></div><button class="btn primary" data-check-build>Test the structure</button></div></div>`;
    const slotBox=$('.builder-slots',ui.stage),bankBox=$('.builder-bank',ui.stage);
    const render=()=>{slotBox.innerHTML=slots.map((w,i)=>`<button class="build-slot ${w?'filled':''}" data-slot="${i}">${w?escapeHtml(w):'Drop here'}</button>`).join('');bankBox.innerHTML=bank.map((w,i)=>`<button class="word-brick ${selected===i?'selected':''}" draggable="true" data-bank="${i}">${escapeHtml(w)}</button>`).join('');$$('[data-bank]',bankBox).forEach(b=>{b.onclick=()=>{selected=+b.dataset.bank;render()};b.ondragstart=e=>e.dataTransfer.setData('text/plain',b.dataset.bank)});$$('[data-slot]',slotBox).forEach(s=>{s.ondragover=e=>e.preventDefault();s.ondrop=e=>{const bi=+e.dataTransfer.getData('text/plain');slots[+s.dataset.slot]=bank[bi];bank.splice(bi,1);selected=null;render()};s.onclick=()=>{if(selected!==null){slots[+s.dataset.slot]=bank[selected];bank.splice(selected,1);selected=null;render()}else if(slots[+s.dataset.slot]){bank.push(slots[+s.dataset.slot]);slots[+s.dataset.slot]=null;render()}}});};
    $('[data-check-build]',ui.stage).onclick=()=>{const ok=slots.every((w,i)=>String(w).toLowerCase()===String(answerWords[i]).toLowerCase());if(ok){$$('.structure-block',ui.stage).forEach((b,i)=>setTimeout(()=>b.classList.add('built'),i*180));toast(ui,'Structure complete!',true);setTimeout(()=>finish(ctx,100,'You built the complete mission phrase.'),1000)}else toast(ui,'The structure is unstable. Reorder the pieces.',false)};render();
  }

  function simulation(ctx) {
    const ui=shell(ctx,ctx.game.title,'Plan tasks, manage time, and make mission decisions.');
    const tasks=(ctx.lesson.reading?.events||ctx.lesson.notes.map(n=>n.title)).slice(0,5);const correct=tasks.length>=4?tasks:['Plan the mission','Prepare the tools','Complete the task','Celebrate success'];let plan=shuffle(correct),energy=100,score=0;
    ui.stage.innerHTML=`<div class="sim-scene"><div class="sim-world"><div class="sim-clock">⏱ <b data-energy>100</b></div><div class="sim-avatar">🧒🏽</div><div class="sim-location">🏫</div></div><div class="sim-panel glass-panel"><h2>Mission Planner</h2><p>Arrange the task cards, then handle three surprise decisions.</p><div class="sim-timeline"></div><button class="btn primary" data-run-plan>Run Plan</button></div></div>`;
    const list=$('.sim-timeline',ui.stage);const render=()=>{list.innerHTML=plan.map((t,i)=>`<div class="timeline-task"><span>${i+1}</span><p>${escapeHtml(t)}</p><button data-up="${i}">↑</button><button data-down="${i}">↓</button></div>`).join('');$$('[data-up]',list).forEach(b=>b.onclick=()=>{const i=+b.dataset.up;if(i>0)[plan[i-1],plan[i]]=[plan[i],plan[i-1]];render()});$$('[data-down]',list).forEach(b=>b.onclick=()=>{const i=+b.dataset.down;if(i<plan.length-1)[plan[i+1],plan[i]]=[plan[i],plan[i+1]];render()});};
    $('[data-run-plan]',ui.stage).onclick=()=>{const ok=plan.every((t,i)=>t===correct[i]);if(!ok){energy-=20;$('[data-energy]',ui.stage).textContent=energy;return toast(ui,'The plan caused a delay. Put the steps in order.',false)}score=55;toast(ui,'Plan approved! Surprise decisions incoming.',true);const qs=getQuestions(ctx,3);let i=0,good=0;const panel=$('.sim-panel',ui.stage);const next=()=>{if(i>=3)return finish(ctx,score+good*15,`You completed the mission with ${energy}% energy left.`);panel.innerHTML='';panel.appendChild(questionCard(qs[i],ok=>{if(ok){good++;energy=Math.min(100,energy+5)}else energy-=15;$('[data-energy]',ui.stage).textContent=energy;i++;next()},`Surprise decision ${i+1}/3`))};next()};render();
  }

  function puzzle(ctx) {
    const ui=shell(ctx,ctx.game.title,'Solve clues to reveal the hidden achievement picture.');
    const qs=getQuestions(ctx,7);let i=0,revealed=0,lives=3;
    ui.stage.innerHTML=`<div class="puzzle-scene"><div class="puzzle-picture">${Array.from({length:9},(_,n)=>`<div class="puzzle-tile" data-tile="${n}"><span>${['🌟','📚','🏆','🎯','🧠','🚀','🤝','🎉','✅'][n]}</span></div>`).join('')}</div><div class="puzzle-question glass-panel"></div></div>`;
    const box=$('.puzzle-question',ui.stage);const next=()=>{if(i>=qs.length||lives<=0)return finish(ctx,revealed/7*100,`You revealed ${revealed} puzzle tiles.`);box.innerHTML='';box.appendChild(questionCard(qs[i],ok=>{if(ok){const hidden=$$('.puzzle-tile:not(.revealed)',ui.stage);if(hidden.length)hidden[Math.floor(Math.random()*hidden.length)].classList.add('revealed');revealed++;toast(ui,'Puzzle tile unlocked!',true)}else{lives--;toast(ui,'The vault resisted that answer.',false)}i++;ui.score.textContent=Math.round(revealed/7*100);ui.lives.textContent=lives;next()},`Vault clue ${i+1}/7`))};next();
  }

  function football(ctx) {
    const ui=shell(ctx,ctx.game.title,'Answer, choose a teammate, pass, and create a scoring move.');
    const qs=getQuestions(ctx,6);let play=0,passes=0,goals=0,lives=3;
    ui.stage.innerHTML=`<div class="football-scene"><div class="pitch"><div class="pitch-goal"></div><button class="teammate t1" data-player="left">🧒🏽</button><button class="teammate t2" data-player="center">👧🏽</button><button class="teammate t3" data-player="right">🧒🏻</button><div class="match-ball">⚽</div><div class="opponents">🧍🏿‍♂️ 🧍🏻‍♂️ 🧍🏽‍♂️</div></div><div class="football-question glass-panel"></div></div>`;
    const box=$('.football-question',ui.stage),ball=$('.match-ball',ui.stage);let unlocked=false,correctLane='center';
    $$('.teammate',ui.stage).forEach(p=>p.onclick=()=>{if(!unlocked)return;unlocked=false;const good=p.dataset.player===correctLane;ball.className=`match-ball pass-${p.dataset.player}`;setTimeout(()=>{if(good){passes++;if(play%2===1)goals++;toast(ui,play%2===1?'GOAL! Team move complete.':'Smart pass!',true)}else{lives--;toast(ui,'The defender intercepted the pass.',false)}play++;ui.score.textContent=Math.round((passes+goals)/12*100);ui.lives.textContent=lives;setTimeout(next,650)},650)});
    const next=()=>{if(play>=6||lives<=0)return finish(ctx,Math.min(100,(passes*12+goals*18)),`Your team completed ${passes} passes and scored ${goals} goal${goals===1?'':'s'}.`);ball.className='match-ball';box.innerHTML='';correctLane=['left','center','right'][play%3];box.appendChild(questionCard(qs[play],ok=>{if(ok){unlocked=true;toast(ui,`Play unlocked! Pass to the ${correctLane} teammate.`,true)}else{lives--;ui.lives.textContent=lives;correctLane=['left','center','right'][Math.floor(Math.random()*3)];unlocked=true;toast(ui,'The play is harder now. Watch the defenders!',false)}},`Build play ${play+1}/6`))};next();
  }

  function tournament(ctx) {
    const ui=shell(ctx,ctx.game.title,'Five stages. One trophy. Use all your English skills.');
    const qs=getQuestions(ctx,15);let stage=0,good=0,lives=5;
    ui.stage.innerHTML=`<div class="tournament-scene"><div class="tournament-path">${['Vocabulary Sprint','Grammar Gates','Story Puzzle','Penalty Final','Champion Round'].map((s,i)=>`<div class="tour-stop ${i===0?'active':''}" data-stop="${i}"><span>${['🏃','🚪','🧩','⚽','🏆'][i]}</span><b>${s}</b></div>`).join('')}</div><div class="tournament-arena glass-panel"></div></div>`;
    const arena=$('.tournament-arena',ui.stage);const nextStage=()=>{if(stage>=5||lives<=0)return finish(ctx,good/15*100,`You completed ${stage} tournament stages and solved ${good} challenges.`);$$('.tour-stop',ui.stage).forEach((x,i)=>x.classList.toggle('active',i===stage));let i=0;const stageGoodStart=good;const nextQ=()=>{if(i>=3){stage++;return nextStage()}arena.innerHTML='';arena.appendChild(questionCard(qs[stage*3+i],ok=>{if(ok)good++;else lives--;i++;ui.score.textContent=Math.round(good/15*100);ui.lives.textContent=lives;nextQ()},`Stage ${stage+1} · Challenge ${i+1}/3`))};nextQ()};nextStage();
  }

  const engines={penalty,racing,runner,phonics,dialogue,memory,detective,story,maze,builder,simulation,puzzle,football,tournament};

  window.GameEngines={
    render(ctx){const fn=engines[ctx.game.engine]||puzzle;fn(ctx);}
  };
})();
