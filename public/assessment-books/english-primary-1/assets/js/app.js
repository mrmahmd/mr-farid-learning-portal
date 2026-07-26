(() => {
  'use strict';
  const {UNITS,PAGES}=window.PRIMARY1_DATA;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const preview=new URLSearchParams(location.search).get('preview')==='1';
  const parentStudent={
    id:new URLSearchParams(location.search).get('studentId')||'',
    name:new URLSearchParams(location.search).get('studentName')||'',
    className:new URLSearchParams(location.search).get('className')||''
  };
  const KEY='primary1-assessment-interactive-v1';
  const initial={name:parentStudent.name||'Star Learner',className:parentStudent.className||'Primary 1',points:0,stars:0,streak:0,completed:{},lastPage:4,current:{route:'dashboard'},sound:true};
  let state=load();
  let activeUnit=null,activePage=null;
  let audioCtx=null;

  function load(){
    try{return {...initial,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...initial}}
  }
  function save(){
    localStorage.setItem(KEY,JSON.stringify(state));
    const payload={student:{id:parentStudent.id,name:state.name,className:state.className},progress:{points:state.points,stars:state.stars,completed:state.completed,lastPage:state.lastPage,percent:overallPercent()}};
    window.dispatchEvent(new CustomEvent('primary1-progress',{detail:payload}));
    if(window.parent!==window)window.parent.postMessage({type:'PRIMARY1_PROGRESS',payload},'*');
  }
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function clean(v){return String(v??'').toLowerCase().replace(/[’]/g,"'").replace(/[.,!?]/g,'').replace(/\s+/g,' ').trim()}
  function titleCase(v){return String(v).replace(/\b\w/g,c=>c.toUpperCase())}
  function completedPages(){return Object.keys(state.completed).filter(p=>state.completed[p]?.passed).length}
  function overallPercent(){return Math.round(completedPages()/Object.keys(PAGES).length*100)}
  function pageUnlocked(page){
    if(preview||page===4)return true;
    const previous=PAGES[page-1];
    if(!previous)return true;
    return !!state.completed[page-1]?.passed;
  }
  function unitUnlocked(index){
    if(preview||index===0)return true;
    const prev=UNITS[index-1];
    return prev.pages.every(p=>state.completed[p]?.passed);
  }
  function unitProgress(unit){
    const done=unit.pages.filter(p=>state.completed[p]?.passed).length;
    return {done,total:unit.pages.length,pct:Math.round(done/unit.pages.length*100)};
  }
  function theme(unit){return `theme-${unit.theme}`}
  function unitById(id){return UNITS.find(u=>u.id===id)}
  function unitIndex(id){return UNITS.findIndex(u=>u.id===id)}
  function pageQuestionCount(p){return PAGES[p]?.questions?.length||0}

  function tone(freq=660,duration=.12,type='sine'){
    if(!state.sound)return;
    try{
      audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type=type;o.frequency.value=freq;g.gain.value=.05;o.connect(g);g.connect(audioCtx.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);o.stop(audioCtx.currentTime+duration);
    }catch{}
  }
  function successSound(){tone(620,.12);setTimeout(()=>tone(820,.14),110);setTimeout(()=>tone(1040,.18),230)}
  function wrongSound(){tone(180,.18,'triangle')}
  function confetti(amount=55){
    const layer=$('#sparkle-layer'); if(!layer)return;
    const colors=['#ffcf33','#7c46e9','#1ecf78','#28a1ff','#ff5d9e','#ff7833'];
    for(let i=0;i<amount;i++){
      const s=document.createElement('i');s.className='spark';s.style.left=(45+Math.random()*10)+'%';s.style.top=(25+Math.random()*25)+'%';s.style.background=colors[i%colors.length];s.style.setProperty('--dx',`${(Math.random()-.5)*650}px`);s.style.setProperty('--dy',`${150+Math.random()*500}px`);s.style.animationDelay=(Math.random()*.2)+'s';layer.appendChild(s);setTimeout(()=>s.remove(),1800);
    }
  }
  function popStar(x=innerWidth/2,y=innerHeight/2){const s=document.createElement('div');s.className='star-pop';s.textContent='⭐';s.style.left=x+'px';s.style.top=y+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),1100)}
  function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}

  function updateChrome(){
    $('#topPoints').textContent=state.points;$('#topStars').textContent=state.stars;$('#topProgress').textContent=overallPercent()+'%';
    $('#studentNameSide').textContent=state.name||'Star Learner';$('#studentClassSide').textContent=state.className||'Primary 1';$('#sideProgress').style.width=overallPercent()+'%';
    $('#soundBtn').textContent=state.sound?'🔊':'🔇';
  }
  function start(){
    const welcome=$('#welcome'),app=$('#app');
    const hasProgress=completedPages()>0;
    $('#continueBtn').classList.toggle('hidden',!hasProgress);
    $('#startBtn').addEventListener('click',()=>enter(false));
    $('#continueBtn').addEventListener('click',()=>enter(true));
    $('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
    $('#soundBtn').addEventListener('click',()=>{state.sound=!state.sound;save();updateChrome();tone(520)});
    $('#homeBtn').addEventListener('click',renderDashboard);
    $('#resetBtn').addEventListener('click',()=>{if(confirm('Reset all saved progress for this book?')){localStorage.removeItem(KEY);state={...initial,name:state.name,className:state.className};save();renderDashboard()}});
    $('#certificateBtn').addEventListener('click',renderCertificate);
    window.Primary1Book={setStudent(student={}){state.name=student.name||state.name;state.className=student.className||state.className;save();updateChrome()},getProgress(){return JSON.parse(JSON.stringify(state))}};
    window.addEventListener('message',e=>{if(e.data?.type==='PRIMARY1_SET_STUDENT')window.Primary1Book.setStudent(e.data.student)});
    function enter(continueMode){
      state.name=state.name||'Star Learner';
      state.className=state.className||'Primary 1';
      save();
      welcome.classList.add('hidden');
      app.classList.remove('hidden');
      buildSidebar();
      updateChrome();
      if(continueMode&&state.lastPage&&pageUnlocked(state.lastPage))renderPage(state.lastPage);else renderDashboard();
    }
    // Restore the exact book view after a browser refresh instead of showing the cover screen again.
    const savedView=state.current;
    if(savedView?.route==='page' && savedView.page){
      enter(true);
    }else if(savedView?.route==='unit' && savedView.unit){
      enter(false);
      renderUnit(savedView.unit);
    }else if(savedView?.route==='certificate'){
      enter(false);
      renderCertificate();
    }
  }

  function buildSidebar(){
    const nav=$('#unitNav');
    nav.innerHTML=UNITS.map((u,i)=>{
      const prog=unitProgress(u),unlocked=unitUnlocked(i);
      return `<button class="nav-btn ${!unlocked?'locked':''}" data-unit="${u.id}"><span class="nav-icon">${unlocked?u.emoji:'🔒'}</span><span class="unit-nav-meta"><span>${u.number===7?'Revision':`Unit ${u.number}`}: ${esc(u.title)}</span><small>${unlocked?`${prog.pct}% complete`:'Locked'}</small></span><span class="lock">${prog.pct===100?'✅':''}</span></button>`
    }).join('');
    $$('[data-unit]',nav).forEach(b=>b.addEventListener('click',()=>{const i=unitIndex(b.dataset.unit);if(!unitUnlocked(i)){toast('Complete the previous unit first.');return}renderUnit(b.dataset.unit)}));
  }
  function setActiveNav(id){$$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.unit===id));if(innerWidth<821)$('#sidebar').classList.remove('open')}

  function renderDashboard(){
    activeUnit=null;activePage=null;state.current={route:'dashboard'};save();setActiveNav('');buildSidebar();updateChrome();
    const units=UNITS.map((u,i)=>unitCard(u,i)).join('');
    $('#main').innerHTML=`
      <section class="hero hero-artboard" aria-label="Primary 1 Assessment Book dashboard cover">
        <img src="assets/images/main-cover.png?v=5" alt="Primary 1 Assessment Book interactive learning dashboard">
        <div class="hero-live-progress">
          <div class="progress-line"><span>Whole-book progress</span><span>${overallPercent()}%</span></div>
          <div class="progress-track"><i style="width:${overallPercent()}%"></i></div>
        </div>
        <div class="hero-live-actions">
          <button id="continuePage" class="secondary">Continue Page ${state.lastPage||4} →</button>
          <button id="openFirstUnit" class="primary">Open Unit 1</button>
        </div>
      </section>
      <section class="dashboard-metrics">
        <div class="metric"><span style="font-size:34px">🏆</span><div><b>${state.points}</b><small>Total Points</small></div></div>
        <div class="metric"><span style="font-size:34px">⭐</span><div><b>${state.stars}</b><small>Stars Earned</small></div></div>
        <div class="metric"><span style="font-size:34px">✅</span><div><b>${completedPages()}/60</b><small>Pages Completed</small></div></div>
        <div class="metric"><span style="font-size:34px">🔥</span><div><b>${state.streak||0}</b><small>Perfect Pages</small></div></div>
      </section>
      <div class="section-head"><div><h3>Choose Your Unit</h3><p>Each page unlocks after the previous page is passed.</p></div></div>
      <section class="unit-grid">${units}</section>`;
    $('#continuePage').addEventListener('click',()=>renderPage(pageUnlocked(state.lastPage)?state.lastPage:4));
    $('#openFirstUnit').addEventListener('click',()=>renderUnit('u1'));
    $$('[data-open-unit]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.index;if(!unitUnlocked(i)){toast('Complete the previous unit first.');return}renderUnit(b.dataset.openUnit)}));
  }
  function unitCard(u,i){
    const p=unitProgress(u),unlocked=unitUnlocked(i),style=`--a:${themeColors(u)[0]};--b:${themeColors(u)[1]}`;
    const image=u.cover?`has-image" style="${style};background-image:url('${u.cover}')`:`" style="${style}`;
    return `<button class="unit-card ${unlocked?'':'locked'}" data-open-unit="${u.id}" data-index="${i}"><div class="unit-art ${image}"><span class="unit-num">${u.number===7?'Final':'Unit '+u.number}</span><span class="unit-emoji">${unlocked?u.emoji:'🔒'}</span><h4>${esc(u.title)}</h4></div><div class="unit-body"><p>${esc(u.subtitle)}</p><div class="unit-foot"><div class="mini-track"><i style="width:${p.pct}%"></i></div><span>${p.pct}%</span></div></div></button>`
  }
  function themeColors(u){return ({violet:['#6531d9','#a456ff'],green:['#0cae68','#57d756'],pink:['#e94791','#ff8b60'],blue:['#187ee9','#49c9ed'],orange:['#f3761f','#ffc039'],teal:['#0a9e99','#3dccd0'],gold:['#bf7a04','#ffd044']})[u.theme]}

  function renderUnit(id){
    const u=unitById(id),idx=unitIndex(id);if(!u||!unitUnlocked(idx)){renderDashboard();return}
    activeUnit=id;activePage=null;state.current={route:'unit',unit:id};save();setActiveNav(id);buildSidebar();updateChrome();
    const p=unitProgress(u),colors=themeColors(u),bg=u.cover?`background-image:url('${u.cover}')`:'';
    $('#main').innerHTML=`
      <section class="unit-hero ${u.cover?'has-image':''}" style="--a:${colors[0]};--b:${colors[1]};${bg}"><div class="unit-hero-content"><span class="chip">${u.number===7?'Whole Book Review':`Unit ${u.number}`}</span><h2>${u.emoji} ${esc(u.title)}</h2><p>${esc(u.subtitle)}</p><div class="unit-summary"><span class="chip">📄 ${u.pages.length} interactive pages</span><span class="chip">✅ ${p.done} completed</span><span class="chip">⭐ ${p.pct}% progress</span></div></div></section>
      <div class="section-head"><div><h3>Interactive Pages</h3><p>Pass each page with 70% or more to unlock the next one.</p></div><button id="backDashboard" class="ghost">← Dashboard</button></div>
      <section class="page-grid">${u.pages.map(pageCard).join('')}</section>`;
    $('#backDashboard').addEventListener('click',renderDashboard);
    $$('[data-page]').forEach(b=>b.addEventListener('click',()=>{const p=+b.dataset.page;if(!pageUnlocked(p)){toast('Pass the previous page first.');return}renderPage(p)}));
  }
  function pageCard(p){
    const data=PAGES[p],rec=state.completed[p],unlocked=pageUnlocked(p);
    return `<button class="page-card ${rec?.passed?'done':''} ${unlocked?'':'locked'}" data-page="${p}"><span class="page-no">${p}</span><span class="page-status">${rec?.passed?'✅':unlocked?'✨':'🔒'}</span><h4>${esc(data.title)}</h4><p>${esc(data.badge)} • ${pageQuestionCount(p)} activities</p><div class="page-score"><span>${rec?.passed?`${rec.score}% score`:'Ready to play'}</span><span>Page ${p}</span></div></button>`
  }

  function renderPage(page){
    const data=PAGES[page];if(!data||!pageUnlocked(page)){toast('This page is still locked.');return}
    const u=unitById(data.unit),colors=themeColors(u);activeUnit=u.id;activePage=page;state.lastPage=page;state.current={route:'page',page,unit:u.id};save();setActiveNav(u.id);updateChrome();
    $('#main').innerHTML=`<div class="activity-shell ${theme(u)}">
      <div class="activity-top"><div class="crumb"><button id="backUnit" class="back-btn">← Unit Map</button><span>${u.number===7?'Revision':`Unit ${u.number}`} / Source Page ${page}</span></div><button id="allPages" class="ghost">All Pages</button></div>
      <section class="activity-head" style="--a:${colors[0]};--b:${colors[1]}"><span class="chip">${esc(data.badge)}</span><h2>${esc(data.title)}</h2><p>Complete every activity, check your work and collect your stars.</p><div class="page-meta"><span>📘 Source page ${page}</span><span>🎯 ${data.questions.length} activities</span><span>⭐ 70% to pass</span></div></section>
      <section class="questions">${data.questions.map(renderQuestion).join('')}</section>
      <div id="celebration"></div>
      <div class="page-actions"><button id="prevPage" class="nav-action prev-btn" ${page===4?'disabled':''}>← Previous</button><div id="pageResult" class="result">Ready when you are!</div><button id="checkPage" class="nav-action check-btn">Check My Page ✓</button><button id="nextPage" class="nav-action next-btn" ${(!preview&&!state.completed[page]?.passed)?'disabled':''}>Next →</button></div>
    </div>`;
    wireQuestions();
    $('#backUnit').addEventListener('click',()=>renderUnit(u.id));$('#allPages').addEventListener('click',()=>renderUnit(u.id));
    $('#prevPage').addEventListener('click',()=>{const p=previousPage(page);if(p)renderPage(p)});
    $('#nextPage').addEventListener('click',()=>{const p=nextPage(page);if(p&&pageUnlocked(p))renderPage(p);else if(!p)renderCertificate();else toast('Pass this page first.')});
    $('#checkPage').addEventListener('click',checkPage);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function previousPage(p){return PAGES[p-1]?p-1:null} function nextPage(p){return PAGES[p+1]?p+1:null}

  function renderQuestion(q,i){
    const wide=(q.type==='order'||q.type==='draw')?'wide':'';
    let body='';
    if(q.type==='choice'||q.type==='count'){
      const opts=q.type==='count'?q.options.map(String):q.options;
      body=`${q.icon?`<div class="q-icon">${q.type==='count'?String(q.icon).repeat(Math.min(q.count,10)):q.icon}</div>`:''}<div class="q-prompt">${esc(q.prompt)}</div><div class="options">${opts.map(o=>`<button type="button" class="option" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
    }else if(q.type==='fill'||q.type==='write'){
      body=`${q.icon?`<div class="q-icon">${q.icon}</div>`:''}<div class="q-prompt">${esc(q.prompt)}</div><input class="answer-input" autocomplete="off" spellcheck="false" placeholder="Type your answer">`;
    }else if(q.type==='unscramble'){
      body=`${q.icon?`<div class="q-icon">${q.icon}</div>`:''}<div class="q-prompt">${esc(q.prompt)}</div><div class="jumble">${[...q.jumble].map(c=>`<span>${esc(c)}</span>`).join('')}</div><input class="answer-input" autocomplete="off" spellcheck="false" placeholder="Write the word">`;
    }else if(q.type==='order'){
      body=`<div class="q-prompt">${esc(q.prompt)}</div><div class="built-answer" data-built>Tap the words in order</div><div class="token-bank">${q.words.map((w,n)=>`<button type="button" class="word-token" data-word="${esc(w)}" data-token="${n}">${esc(w)}</button>`).join('')}</div><button type="button" class="reset-order">Reset words</button>`;
    }else if(q.type==='check'){
      body=`${q.icon?`<div class="q-icon">${q.icon}</div>`:''}<div class="q-prompt">${esc(q.prompt)}</div><div class="options"><button type="button" class="option" data-value="true">✓ True</button><button type="button" class="option" data-value="false">✗ False</button></div>`;
    }else if(q.type==='draw'){
      body=`<div class="q-prompt">${esc(q.prompt)}</div><div class="draw-wrap"><canvas class="draw-canvas" width="900" height="420"></canvas><div class="draw-tools"><span>Color:</span>${['#6d36e8','#2085f5','#25bd74','#ffbd21','#ef476f','#17254a'].map((c,n)=>`<button type="button" class="color-dot ${n===0?'active':''}" data-color="${c}" style="background:${c}" aria-label="Choose drawing color"></button>`).join('')}<button type="button" class="ghost clear-canvas">Clear</button></div></div>`;
    }
    return `<article class="question ${wide}" data-index="${i}" data-type="${q.type}" data-answer="${esc(q.answer??'')}"><span class="q-index">${i+1}</span>${body}<div class="feedback" aria-live="polite"></div></article>`
  }

  function wireQuestions(){
    $$('.question').forEach(card=>{
      $$('.option',card).forEach(b=>b.addEventListener('click',()=>{$$('.option',card).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');card.dataset.value=b.dataset.value;tone(420,.06)}));
      const built=$('[data-built]',card),tokens=$$('.word-token',card),selected=[];
      if(built){tokens.forEach(t=>t.addEventListener('click',()=>{if(t.classList.contains('used'))return;t.classList.add('used');selected.push(t.dataset.word);card.dataset.value=selected.join(' ');built.textContent=selected.join(' ');tone(460+selected.length*40,.06)}));$('.reset-order',card).addEventListener('click',()=>{selected.length=0;delete card.dataset.value;tokens.forEach(t=>t.classList.remove('used'));built.textContent='Tap the words in order'});}
      const canvas=$('.draw-canvas',card);if(canvas)wireCanvas(card,canvas);
    });
  }
  function wireCanvas(card,canvas){
    const ctx=canvas.getContext('2d');ctx.lineWidth=10;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#6d36e8';let drawing=false,last=null;
    const pos=e=>{const r=canvas.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return {x:(p.clientX-r.left)*canvas.width/r.width,y:(p.clientY-r.top)*canvas.height/r.height}};
    const start=e=>{drawing=true;last=pos(e);card.dataset.drawn='true';e.preventDefault()};const move=e=>{if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;e.preventDefault()};const end=()=>{drawing=false;last=null};
    canvas.addEventListener('pointerdown',start);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',end);canvas.addEventListener('pointerleave',end);
    $$('.color-dot',card).forEach(b=>b.addEventListener('click',()=>{$$('.color-dot',card).forEach(x=>x.classList.remove('active'));b.classList.add('active');ctx.strokeStyle=b.dataset.color}));
    $('.clear-canvas',card).addEventListener('click',()=>{ctx.clearRect(0,0,canvas.width,canvas.height);delete card.dataset.drawn});
  }

  function checkPage(){
    const data=PAGES[activePage],cards=$$('.question');let correct=0;
    cards.forEach((card,i)=>{
      const q=data.questions[i],type=card.dataset.type;let value='';
      if(['choice','count','check','order'].includes(type))value=card.dataset.value||'';
      else if(['fill','write','unscramble'].includes(type))value=$('.answer-input',card)?.value||'';
      else if(type==='draw')value=card.dataset.drawn==='true'?'drawn':'';
      const expected=q.answer;
      const isFree=type==='write'&&!expected;const ok=type==='draw'?value==='drawn':isFree?clean(value).length>0:type==='check'?String(value)===String(expected):clean(value)===clean(expected);
      card.classList.toggle('correct',ok);card.classList.toggle('wrong',!ok);const fb=$('.feedback',card);
      if(ok){correct++;fb.textContent='Great job! ✓'}else{const ans=type==='draw'?'Add a drawing to complete this activity.':isFree?'Write your own answer.':`Correct answer: ${expected===true?'True':expected===false?'False':expected}`;fb.innerHTML=`${esc(ans)} <button type="button" class="reset-order got-it">Got it</button>`;$('.got-it',fb)?.addEventListener('click',()=>{fb.style.opacity='.55'})}
    });
    const score=Math.round(correct/cards.length*100),passed=score>=70,old=state.completed[activePage];
    if(!old?.passed&&passed){state.points+=correct*10;state.stars+=Math.max(1,Math.round(score/20));if(score===100)state.streak=(state.streak||0)+1;state.completed[activePage]={passed:true,score,max:cards.length,correct};save();buildSidebar();updateChrome();successSound();confetti(score===100?90:50);popStar();}
    else if(old?.passed&&score>old.score){state.completed[activePage]={...old,score,correct};save()}
    else if(!passed){wrongSound()}
    const result=$('#pageResult'),next=$('#nextPage');
    result.textContent=passed?`Passed! ${correct}/${cards.length} correct • ${score}%`:`${correct}/${cards.length} correct • ${score}% — Try again to reach 70%.`;
    next.disabled=!preview&&!passed&&!old?.passed;
    const c=$('#celebration');
    c.innerHTML=passed?`<section class="celebration"><div class="bigstar">${score===100?'🌟':'⭐'}</div><h3>${score===100?'Perfect Page!':'Page Passed!'}</h3><p>You earned points and unlocked the next page. Keep shining, ${esc(state.name)}!</p></section>`:'';
    c.scrollIntoView({behavior:'smooth',block:'center'});
  }

  function renderCertificate(){
    if(!preview&&overallPercent()<100){toast(`Complete every page first. Current progress: ${overallPercent()}%.`);renderDashboard();return}
    state.current={route:'certificate'};save();setActiveNav('');
    $('#main').innerHTML=`<section class="certificate"><div style="font-size:72px">🏆</div><h2>Certificate of Achievement</h2><p>This certificate is proudly presented to</p><div class="name">${esc(state.name||'Star Learner')}</div><p>for successfully completing</p><h3>Primary 1 English • Interactive Assessment Book</h3><p>First Term • 2025 / 2026</p><p>with excellent effort, curiosity and determination.</p><div style="display:flex;justify-content:space-between;gap:20px;margin-top:50px;font-weight:900"><span>Teacher Signature</span><span>Prepared and Designed by Mr.Mohamed Farid</span></div><div class="start-actions" style="justify-content:center;margin-top:35px"><button id="printCert" class="primary">Print Certificate</button><button id="certHome" class="ghost">Dashboard</button></div></section>`;
    $('#printCert').addEventListener('click',()=>window.print());$('#certHome').addEventListener('click',renderDashboard);
  }

  start();
})();
