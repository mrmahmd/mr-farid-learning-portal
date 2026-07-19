(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const escapeHtml=(value='')=>String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const app=$('#app');
  const curriculum=window.CURRICULUM;const gameData=window.GAME_DATA;
  let state=window.GameStorage.load();

  const allLessons=curriculum.units.flatMap((unit)=>unit.lessons.map((lesson)=>({...lesson,unitId:unit.id,unitTitle:unit.title,unitCover:unit.cover,unitColor:unit.color})));
  const findLesson=(id)=>allLessons.find((l)=>l.id===id);
  const findUnit=(id)=>curriculum.units.find((u)=>String(u.id)===String(id));
  const gamesForLesson=(id)=>gameData.games[id]||[];
  const completedCount=(lessonId)=>gamesForLesson(lessonId).filter((g)=>state.completedGames[g.id]).length;
  const lessonPercent=(id)=>Math.round(completedCount(id)/Math.max(1,gamesForLesson(id).length)*100);
  const unitPercent=(unit)=>Math.round(unit.lessons.reduce((sum,l)=>sum+lessonPercent(l.id),0)/Math.max(1,unit.lessons.length));
  const allGames=Object.values(gameData.games).flat();
  const totalCompleted=()=>allGames.filter((g)=>state.completedGames[g.id]).length;
  const overallPercent=()=>Math.round(totalCompleted()/allGames.length*100);

  const navItems=[['#home','🏠','Dashboard'],['#units','📚','Units'],['#tournaments','🏆','Tournaments'],['#achievements','🛡️','Achievements'],['#progress','📊','My Progress'],['#how-to-play','🎮','How to Play']];

  function layout(content,active='#home'){
    const levelNeed=GameStorage.xpForLevel(state.level);const xpPct=Math.round(state.xp/levelNeed*100);
    app.innerHTML=`
      <div class="app-frame">
        <aside class="sidebar">
          <a class="brand" href="#home"><span>ENGLISH</span><strong>PRIMARY 3</strong><em>GAME WORLD</em></a>
          <nav>${navItems.map(([href,icon,label])=>`<a href="${href}" class="${active===href?'active':''}"><span>${icon}</span>${label}</a>`).join('')}</nav>
          <div class="player-mini glass-panel">
            <img src="assets/images/omar-laila.png" alt="Learning characters">
            <small>Hello, Champion!</small><strong>${escapeHtml(state.studentName)}</strong>
            <span>⭐ Level ${state.level}</span><div class="mini-progress"><i style="width:${xpPct}%"></i></div><small>${state.xp} / ${levelNeed} XP</small>
          </div>
          <div class="wallet-mini"><span>🪙 ${state.coins}</span><span>💎 ${state.gems}</span></div>
          <button class="sound-toggle" data-sound>${state.sound?'🔊 Sound On':'🔇 Sound Off'}</button>
        </aside>
        <main class="main-area">
          <header class="topbar">
            <button class="mobile-menu" aria-label="Menu">☰</button>
            <div class="welcome"><span>👋</span><div><strong>Welcome back, ${escapeHtml(state.studentName)}!</strong><small>Learn English · Play Games · Win Rewards</small></div></div>
            <div class="top-stats"><span>⭐ <b>${state.points}</b><small>Points</small></span><span>🪙 <b>${state.coins}</b><small>Coins</small></span><span>💎 <b>${state.gems}</b><small>Gems</small></span><span>🛡️ <b>${state.badges.length}</b><small>Badges</small></span></div>
          </header>
          <div class="page-content">${content}</div>
        </main>
      </div>`;
    $('.mobile-menu').onclick=()=>$('.sidebar').classList.toggle('open');
    $('[data-sound]').onclick=()=>{state.sound=!state.sound;GameStorage.save(state);renderRoute()};
  }

  function unitCard(unit){
    const pct=unitPercent(unit);const locked=unit.id>1 && unitPercent(curriculum.units[unit.id-2])<50;
    return `<article class="unit-world-card ${locked?'locked':''}" style="--unit:${unit.color};background-image:linear-gradient(180deg,rgba(5,22,60,.05),rgba(5,22,60,.85)),url('${unit.cover}')">
      <div class="unit-card-top"><span>UNIT ${unit.id}</span><b>${locked?'🔒':'⭐ '+pct+'%'}</b></div>
      <div class="unit-card-copy"><h3>${escapeHtml(unit.title)}</h3><p>${escapeHtml(unit.tagline)}</p><div class="unit-progress"><i style="width:${pct}%"></i></div><small>${unit.lessons.reduce((s,l)=>s+completedCount(l.id),0)} / ${unit.lessons.length*2} games completed</small>${locked?'<button disabled>Locked</button>':`<a href="#unit/${unit.id}">Explore World →</a>`}</div>
    </article>`;
  }

  function renderHome(){
    const continueGame=allGames.find((g)=>!state.completedGames[g.id])||allGames[0];const continueLesson=allLessons.find((l)=>gamesForLesson(l.id).some((g)=>g.id===continueGame.id));
    const content=`
      <section class="game-hero">
        <img src="assets/images/hero.jpg" alt="English Primary 3 Game World">
        <div class="hero-overlay"><span class="eyebrow">WELCOME TO</span><h1>English Primary 3<br><em>Game World!</em></h1><p>Explore six worlds, master 46 games, and become an English champion.</p><div class="hero-buttons"><a class="btn primary" href="#units">Start Adventure ▶</a><a class="btn secondary" href="#tournaments">View Tournaments 🏆</a></div></div>
        <div class="hero-dashboard"><span><b>${overallPercent()}%</b> Overall</span><span><b>${totalCompleted()}</b>/46 Games</span><span><b>${state.level}</b> Level</span></div>
      </section>
      <section class="section-heading"><div><span class="eyebrow">Choose Your World</span><h2>Six English Adventures</h2></div><a href="#progress">View My Progress →</a></section>
      <section class="unit-world-grid">${curriculum.units.map(unitCard).join('')}</section>
      <section class="home-lower-grid">
        <article class="continue-card glass-panel"><div class="continue-thumb" style="background-image:url('${continueLesson.unitCover}')"><span>${continueGame.icon}</span></div><div><span class="eyebrow">Continue Playing</span><h3>${escapeHtml(continueGame.title)}</h3><p>${escapeHtml(continueLesson.title)}</p><div class="wide-progress"><i style="width:${lessonPercent(continueLesson.id)}%"></i></div></div><a class="btn primary" href="#game/${continueLesson.id}/${continueGame.id}">Continue ▶</a></article>
        <article class="daily-card glass-panel"><span class="daily-icon">🎯</span><div><span class="eyebrow">Daily Challenge</span><h3>Win any game today</h3><p>Earn a 200 coin bonus and build your streak.</p></div><a class="btn gold" href="#units">Start Challenge</a></article>
      </section>`;
    layout(content,'#home');
  }

  function renderUnits(){layout(`<section class="page-banner" style="background-image:linear-gradient(90deg,rgba(3,31,87,.9),rgba(3,31,87,.25)),url('assets/images/hero.jpg')"><span class="eyebrow">GAME WORLDS</span><h1>Choose a Unit</h1><p>Every lesson has two cinematic mini-games.</p></section><section class="unit-world-grid units-page">${curriculum.units.map(unitCard).join('')}</section>`,'#units')}

  function gameCard(game,lesson,unit){const complete=state.completedGames[game.id];const score=state.bestScores[game.id]||0;return `<article class="lesson-game-card ${complete?'complete':''}" style="--accent:${unit.color};background-image:linear-gradient(180deg,rgba(6,25,65,.05),rgba(6,25,65,.92)),url('${unit.cover}')"><div class="game-card-badge">${game.icon} GAME ${gamesForLesson(lesson.id).findIndex(g=>g.id===game.id)+1}</div><div class="game-card-content"><span class="game-type">${escapeHtml(gameData.engineLabels[game.engine]||game.engine)}</span><h3>${escapeHtml(game.title)}</h3><p>${escapeHtml(game.description)}</p><div class="game-meta"><span>⭐ ${complete?Math.max(1,Math.ceil(score/34)):0}/3</span><span>🪙 ${game.reward}</span><span>📶 ${game.difficulty}</span></div><a class="btn primary" href="#game/${lesson.id}/${game.id}">${complete?'Play Again':'Play Now'} ▶</a></div></article>`}

  function renderUnit(id){const unit=findUnit(id);if(!unit)return renderHome();const pct=unitPercent(unit);const lessons=unit.lessons.map((l,i)=>{const g=gamesForLesson(l.id);const done=completedCount(l.id);return `<article class="lesson-row-card"><div class="lesson-row-number">${i+1}</div><div class="lesson-row-image" style="background-image:url('${unit.cover}')"></div><div class="lesson-row-copy"><span>LESSON ${i+1}</span><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.focus)}</p><div class="wide-progress"><i style="width:${lessonPercent(l.id)}%"></i></div><small>${done}/2 games complete</small></div><div class="lesson-row-games">${g.map(game=>`<a href="#game/${l.id}/${game.id}"><span>${game.icon}</span><b>${escapeHtml(gameData.engineLabels[game.engine])}</b>${state.completedGames[game.id]?'<em>✓ Complete</em>':'<em>Play →</em>'}</a>`).join('')}</div><a class="round-arrow" href="#lesson/${l.id}">→</a></article>`}).join('');layout(`<section class="unit-hero" style="--unit:${unit.color};background-image:linear-gradient(90deg,rgba(5,25,70,.9),rgba(5,25,70,.2)),url('${unit.cover}')"><a href="#units">← All Units</a><span class="eyebrow">UNIT ${unit.id}</span><h1>${escapeHtml(unit.title)}</h1><p>${escapeHtml(unit.tagline)}</p><div class="unit-hero-progress"><div><i style="width:${pct}%"></i></div><strong>${pct}% complete</strong></div></section><section class="section-heading"><div><span class="eyebrow">MISSIONS</span><h2>Lessons in this Unit</h2></div><span>${unit.lessons.length*2} total games</span></section><section class="lesson-list">${lessons}</section>`,'#units')}

  function renderLesson(id){const lesson=findLesson(id);if(!lesson)return renderHome();const unit=findUnit(lesson.unitId);const games=gamesForLesson(id);const pct=lessonPercent(id);layout(`<section class="lesson-hero" style="background-image:linear-gradient(90deg,rgba(4,31,86,.94),rgba(4,31,86,.1)),url('${unit.cover}')"><a href="#unit/${unit.id}">← Unit ${unit.id}</a><span class="eyebrow">UNIT ${unit.id} · LESSON ${unit.lessons.findIndex(l=>l.id===id)+1}</span><h1>${escapeHtml(lesson.title)}</h1><p>${escapeHtml(lesson.focus)}</p><div class="lesson-hero-stats"><span>🎮 2 Games</span><span>⭐ ${completedCount(id)*3}/6 Stars</span><span>🎁 +${games.reduce((s,g)=>s+g.reward,0)} XP</span></div></section><section class="section-heading"><div><span class="eyebrow">CHOOSE YOUR GAME</span><h2>Two Missions to Master This Lesson</h2></div><div class="circular-progress" style="--p:${pct}"><b>${pct}%</b></div></section><section class="game-card-grid">${games.map(g=>gameCard(g,lesson,unit)).join('')}</section><section class="lesson-reward glass-panel"><div><span>🏆</span><div><strong>Lesson Reward Chest</strong><p>Complete both games to unlock bonus coins, stars, and a lesson badge.</p></div></div><div class="reward-items"><span>+${games.reduce((s,g)=>s+g.reward,0)} XP</span><span>+3 Stars</span><span>+1 Badge</span></div></section>`,'#units')}

  function renderGame(lessonId,gameId){const lesson=findLesson(lessonId);const game=gamesForLesson(lessonId).find(g=>g.id===gameId)||gameData.reviews.find(g=>g.id===gameId);if(!lesson||!game)return renderHome();const questions=QuestionEngine.buildLessonQuestions(lesson);app.innerHTML='<div class="standalone-game" id="gameMount"></div>';const mount=$('#gameMount');const ctx={container:mount,game,lesson,questions,state,navigate:(hash)=>{location.hash=hash},onComplete:(score)=>{const first=GameStorage.markGameComplete(state,game.id,score,game.reward);state=GameStorage.load();if(first&&lessonPercent(lesson.id)===100&&!state.badges.includes(`Lesson Master: ${lesson.title}`)){GameStorage.addRewards(state,{gems:1,badge:`Lesson Master: ${lesson.title}`});state=GameStorage.load()}}};GameEngines.render(ctx)}

  function renderTournaments(){const cards=gameData.reviews.map((g,i)=>{const review=curriculum.reviews.find(r=>r.id===g.reviewId);const unit=findUnit(review.unitIds[0]);return `<article class="tournament-card" style="background-image:linear-gradient(180deg,rgba(3,27,78,.1),rgba(3,27,78,.92)),url('${unit.cover}')"><span>${g.icon}</span><small>${review.subtitle}</small><h3>${escapeHtml(g.title)}</h3><p>${escapeHtml(g.description)}</p><div><b>5 stages</b><b>+${g.reward} XP</b></div><a class="btn gold" href="#tournament/${review.id}/${g.id}">Enter Tournament</a></article>`}).join('');layout(`<section class="page-banner tournament-banner"><span class="eyebrow">CHAMPIONSHIP ARENA</span><h1>English Tournaments</h1><p>Complete unit worlds, enter multi-stage championships, and win legendary trophies.</p></section><section class="tournament-grid">${cards}</section>`,'#tournaments')}

  function renderTournamentGame(reviewId,gameId){const review=curriculum.reviews.find(r=>r.id===reviewId);const game=gameData.reviews.find(g=>g.id===gameId);const lessons=curriculum.units.filter(u=>review.unitIds.includes(u.id)).flatMap(u=>u.lessons);const pseudoLesson={id:review.id,title:review.title,focus:review.subtitle,reading:null,notes:[],vocab:[],phonics:null};const questions=QuestionEngine.buildReviewQuestions(review,curriculum);app.innerHTML='<div class="standalone-game" id="gameMount"></div>';GameEngines.render({container:$('#gameMount'),game,lesson:pseudoLesson,questions,state,backHash:'#tournaments',navigate:(h)=>location.hash=h,onComplete:(score)=>{GameStorage.markGameComplete(state,game.id,score,game.reward);state=GameStorage.load()}})}

  function renderAchievements(){const badges=[['First Kick','Complete your first game','⚽',totalCompleted()>=1],['Racing Rookie','Complete a racing game','🏎️',allGames.some(g=>g.engine==='racing'&&state.completedGames[g.id])],['Grammar Master','Score 90% in any game','📘',Object.values(state.bestScores).some(s=>s>=90)],['World Explorer','Open every unit','🗺️',curriculum.units.every(u=>unitPercent(u)>0)],['Game Champion','Complete all 46 games','🏆',totalCompleted()===46],...state.badges.map(b=>[b,'Special achievement','🌟',true])];layout(`<section class="page-banner achievement-banner"><span class="eyebrow">TROPHY ROOM</span><h1>Your Achievements</h1><p>Every badge tells the story of your learning adventure.</p></section><section class="achievement-grid">${badges.map(([t,d,i,on])=>`<article class="achievement-card ${on?'earned':'locked'}"><span>${i}</span><h3>${escapeHtml(t)}</h3><p>${escapeHtml(d)}</p><b>${on?'Earned ✓':'Locked 🔒'}</b></article>`).join('')}</section>`,'#achievements')}

  function renderProgress(){const rows=curriculum.units.map(u=>`<article class="progress-unit glass-panel"><img src="${u.cover}" alt=""><div><span>UNIT ${u.id}</span><h3>${escapeHtml(u.title)}</h3><div class="wide-progress"><i style="width:${unitPercent(u)}%"></i></div><small>${unitPercent(u)}% complete · ${u.lessons.reduce((s,l)=>s+completedCount(l.id),0)}/${u.lessons.length*2} games</small></div><a href="#unit/${u.id}">Open →</a></article>`).join('');layout(`<section class="progress-summary"><div><span class="eyebrow">MY JOURNEY</span><h1>${overallPercent()}% Complete</h1><p>You have completed ${totalCompleted()} of 46 games.</p></div><div class="big-ring" style="--p:${overallPercent()}"><b>${overallPercent()}%</b></div><div class="summary-chips"><span>⭐ ${state.points} points</span><span>🪙 ${state.coins} coins</span><span>🛡️ ${state.badges.length} badges</span><span>🔥 ${state.streak} day streak</span></div></section><section class="progress-list">${rows}</section>`,'#progress')}

  function renderHowTo(){layout(`<section class="page-banner how-banner"><span class="eyebrow">PLAYER GUIDE</span><h1>How to Play</h1><p>Every game teaches English through movement, missions, choices, and rewards.</p></section><section class="guide-grid">${[['⚽','Penalty Games','Answer correctly, choose a corner, and control the shot.'],['🏎️','Racing Games','Use arrow keys or touch controls, clear language checkpoints, and charge nitro.'],['🏃','Runner Games','Move between lanes and pass through the correct answer gate.'],['🧩','Puzzle Missions','Solve clues to reveal pictures, repair sentences, or unlock a vault.'],['🗺️','Adventure Games','Explore maps, follow clues, and complete story objectives.'],['🤝','Simulations','Plan tasks, manage time, and make decisions in realistic missions.']].map(([i,t,d])=>`<article class="guide-card"><span>${i}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</section>`,'#how-to-play')}

  function renderRoute(){state=GameStorage.load();const hash=location.hash||'#home';GameStorage.setLastRoute(state,hash);if(hash==='#home')return renderHome();if(hash==='#units')return renderUnits();if(hash==='#tournaments')return renderTournaments();if(hash==='#achievements')return renderAchievements();if(hash==='#progress')return renderProgress();if(hash==='#how-to-play')return renderHowTo();let m=hash.match(/^#unit\/(\d+)$/);if(m)return renderUnit(m[1]);m=hash.match(/^#lesson\/(u\d+l\d+)$/);if(m)return renderLesson(m[1]);m=hash.match(/^#game\/(u\d+l\d+)\/(.+)$/);if(m)return renderGame(m[1],m[2]);m=hash.match(/^#tournament\/(review\d+)\/(.+)$/);if(m)return renderTournamentGame(m[1],m[2]);renderHome()}

  window.GameApp={get state(){return state},renderRoute};window.addEventListener('hashchange',renderRoute);window.addEventListener('message',(event)=>{if(event.data?.type==='STUDENT_CONTEXT'){window.PLATFORM_STUDENT=event.data.payload||{};state=GameStorage.load();renderRoute()}});renderRoute();
})();
