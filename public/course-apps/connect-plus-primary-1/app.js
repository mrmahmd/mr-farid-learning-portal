const STORAGE_PREFIX = 'cp1v4_';
const COURSE_ID = 'connect-plus-primary-1-first-term';
const SAMPLE_SECTION_ID = 'unit-1';
const SAMPLE_LESSON_ID = 'unit1-lesson1';
// A standalone visit always starts as the free sample. The portal explicitly
// sends "full" only after it has verified the student's subscription.
let sampleMode = new URLSearchParams(location.search).get('sample') === '1' || window.parent === window;
let entryDestination = new URLSearchParams(location.search).get('resume') === '1' ? 'resume' : 'dashboard';
const navigationEntry = performance.getEntriesByType?.('navigation')?.[0];
const preserveRefreshLocation = navigationEntry?.type === 'reload' && Boolean(sessionStorage.getItem(`${STORAGE_PREFIX}openLocation`));
const state = {
  route: 'home',
  sectionId: null,
  lessonId: null,
  stationId: null,
  points: Number(localStorage.getItem(STORAGE_PREFIX + 'points') || 0),
  completedLessons: JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'completedLessons') || '[]'),
  stationProgress: JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'stationProgress') || '{}'),
  quizProgress: JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'quizProgress') || '{}'),
  lastLocation: JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'lastLocation') || 'null'),
};

function sampleAllowed(sectionId, lessonId) {
  return !sampleMode || (sectionId === SAMPLE_SECTION_ID && lessonId === SAMPLE_LESSON_ID);
}

function sectionAllowed(sectionId) {
  return !sampleMode || sectionId === SAMPLE_SECTION_ID;
}

function accessMessage() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = 'This is part of the full course. Subscribe on WhatsApp to continue.';
  toast.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => toast.classList.remove('show'), 2600);
}

function locationDetail(location = state.lastLocation) {
  if (!location?.sectionId || !location?.lessonId) return null;
  const section = getSection(location.sectionId);
  const lesson = getLesson(section, location.lessonId);
  if (!section || !lesson) return null;
  const bits = [section.type === 'unit' ? `Unit ${section.unitNumber}` : section.title, lesson.title];
  if (location.stationId) {
    const station = stations.find(item => item.id === location.stationId);
    if (station) bits.push(station.title);
  }
  return bits.join(' • ');
}

function portalState() {
  const detail = locationDetail();
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    points: state.points,
    completedLessons: [...state.completedLessons],
    stationProgress: state.stationProgress,
    quizProgress: state.quizProgress,
    lastLocation: state.lastLocation,
    portalLastActivity: detail ? {
      courseTitle: 'Connect Plus Primary 1 – First Term',
      detail,
      updatedAt: new Date().toISOString(),
    } : null,
  };
}

function applyPortalState(saved) {
  if (!saved || typeof saved !== 'object') return;
  state.points = Number(saved.points || 0);
  state.completedLessons = Array.isArray(saved.completedLessons) ? [...saved.completedLessons] : [];
  state.stationProgress = saved.stationProgress && typeof saved.stationProgress === 'object' ? saved.stationProgress : {};
  state.quizProgress = saved.quizProgress && typeof saved.quizProgress === 'object' ? saved.quizProgress : {};
  state.lastLocation = saved.lastLocation && typeof saved.lastLocation === 'object' ? saved.lastLocation : null;
  const resume = entryDestination === 'resume' || preserveRefreshLocation;
  if (resume && state.lastLocation && sampleAllowed(state.lastLocation.sectionId, state.lastLocation.lessonId)) {
    state.route = 'lesson';
    state.sectionId = state.lastLocation.sectionId;
    state.lessonId = state.lastLocation.lessonId;
    state.stationId = state.lastLocation.stationId || null;
  } else {
    state.route = 'home';
    state.sectionId = null;
    state.lessonId = null;
    state.stationId = null;
  }
}

function mergePortalState(local, remote) {
  if (!remote || typeof remote !== 'object') return local;
  if (!local || typeof local !== 'object') return remote;
  const remoteTime = Date.parse(String(remote.updatedAt || remote.portalLastActivity?.updatedAt || 0)) || 0;
  const localTime = Date.parse(String(local.updatedAt || local.portalLastActivity?.updatedAt || 0)) || 0;
  return remoteTime >= localTime ? remote : local;
}

const stations = [
  {id:'mission',title:'Mission Start',icon:'🚀',color:'purple',description:'Discover the lesson goals and get ready.'},
  {id:'words',title:'Picture Words',icon:'🖼️',color:'blue',description:'Learn every key word with a clear visual.'},
  {id:'language',title:'Language Lab',icon:'💬',color:'pink',description:'Listen, read, and practise the lesson sentences.'},
  {id:'listen',title:'Listen & Speak',icon:'🎧',color:'green',description:'Hear the words and speak with confidence.'},
  {id:'special',title:'Special Mission',icon:'🧭',color:'yellow',description:'Explore the special skill in this lesson.'},
  {id:'game',title:'Game Zone',icon:'🎮',color:'orange',description:'Play the main lesson challenges and earn stars.'},
  {id:'final',title:'Final Challenge',icon:'🏆',color:'red',description:'Complete the final five checks and finish the path.'},
];

function esc(value){return String(value ?? '').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
function norm(value){return String(value ?? '').replace(/[’]/g,"'").replace(/[.!?]+$/,'').replace(/\s+/g,' ').trim().toLowerCase();}
function getSections(){return window.COURSE_DATA.sections;}
function getSection(id){return getSections().find(s=>s.id===id);}
function getLesson(section,id){return section?.lessons.find(l=>l.id===id);}
function totalLessons(){return getSections().reduce((sum,s)=>sum+s.lessons.length,0);}
function isLessonDone(id){return state.completedLessons.includes(id);}
function sectionDone(section){return section.lessons.filter(l=>isLessonDone(l.id)).length;}
function percent(a,b){return b?Math.round(a/b*100):0;}

function platformName(){
  const q=new URLSearchParams(location.search);
  const candidates=[
    window.PLATFORM_USER?.name,
    window.PLATFORM_STUDENT_NAME,
    q.get('studentName'),
    q.get('student'),
    sessionStorage.getItem('platform_student_name'),
    localStorage.getItem('platform_student_name')
  ];
  try{
    if(window.parent!==window){
      candidates.unshift(window.parent.PLATFORM_USER?.name,window.parent.PLATFORM_STUDENT_NAME);
    }
  }catch(_e){}
  return candidates.find(v=>typeof v==='string'&&v.trim())?.trim()||'';
}

function save(){
  localStorage.setItem(STORAGE_PREFIX+'points',String(state.points));
  localStorage.setItem(STORAGE_PREFIX+'completedLessons',JSON.stringify(state.completedLessons));
  localStorage.setItem(STORAGE_PREFIX+'stationProgress',JSON.stringify(state.stationProgress));
  localStorage.setItem(STORAGE_PREFIX+'quizProgress',JSON.stringify(state.quizProgress));
  localStorage.setItem(STORAGE_PREFIX+'lastLocation',JSON.stringify(state.lastLocation));
  if(state.lastLocation) sessionStorage.setItem(STORAGE_PREFIX+'openLocation',JSON.stringify(state.lastLocation));
  else sessionStorage.removeItem(STORAGE_PREFIX+'openLocation');
  window.MrFaridCourseProgress?.queueSave?.();
  try{
    window.parent?.postMessage({
      type:'CONNECT_PLUS_PRIMARY1_PROGRESS',
      points:state.points,
      completedLessons:state.completedLessons.length,
      totalLessons:totalLessons(),
      lastLocation:state.lastLocation
    },'*');
  }catch(_e){}
}

function go(route,sectionId=null,lessonId=null,stationId=null){
  if(route==='section'&&!sectionAllowed(sectionId)){accessMessage();return}
  if(route==='lesson'&&!sampleAllowed(sectionId,lessonId)){accessMessage();return}
  state.route=route;state.sectionId=sectionId;state.lessonId=lessonId;state.stationId=stationId;
  if(route==='lesson') state.lastLocation={route,sectionId,lessonId,stationId};
  save();render();window.scrollTo({top:0,behavior:'smooth'});
}

function stationDoneList(lessonId){if(!state.stationProgress[lessonId])state.stationProgress[lessonId]=[];return state.stationProgress[lessonId];}
function isStationDone(lessonId,stationId){return stationDoneList(lessonId).includes(stationId);}
function isStationUnlocked(lesson,index){return index===0||isStationDone(lesson.id,stations[index-1].id);}
function lessonUnlocked(section,index){
  const lesson = section.lessons[index];
  if (!lesson) return false;
  if (sampleMode) return sampleAllowed(section.id, lesson.id);
  return true;
}

function quizKey(lessonId,zone){return `${lessonId}:${zone}`;}
function getQuiz(lesson,zone){
  const key=quizKey(lesson.id,zone);
  if(!state.quizProgress[key]) state.quizProgress[key]={index:0,score:0,done:false,selected:null,order:[],match:{},awarded:[]};
  return state.quizProgress[key];
}
function questionsFor(lesson,zone){return zone==='final'?lesson.finalQuestions:lesson.gameQuestions;}

function speak(text){
  if(!('speechSynthesis'in window))return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.9;u.pitch=1.03;speechSynthesis.speak(u);
}
function tone(freq,dur,start=0,type='triangle'){
  const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  window.__cpAudio=window.__cpAudio||new C();const c=window.__cpAudio,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;o.connect(g);g.connect(c.destination);const t=c.currentTime+start;g.gain.setValueAtTime(.055,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.start(t);o.stop(t+dur);
}
function goodSound(){tone(523,.16);tone(659,.2,.07);tone(784,.26,.14)}
function badSound(){tone(245,.15,0,'sawtooth');tone(195,.18,.08,'sawtooth')}
function celebrate(message='Great job!'){
  const toast=document.getElementById('toast');if(toast){toast.textContent=message;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),1700)}
  const layer=document.getElementById('celebration');if(!layer)return;
  const icons=['⭐','✨','🎉','🌟','💫'];for(let i=0;i<24;i++){const e=document.createElement('span');e.className='spark';e.textContent=icons[i%icons.length];e.style.left=`${38+Math.random()*24}%`;e.style.top=`${38+Math.random()*18}%`;e.style.setProperty('--x',`${(Math.random()-.5)*430}px`);e.style.setProperty('--y',`${(Math.random()-.5)*330}px`);e.style.setProperty('--s',`${16+Math.random()*20}px`);layer.appendChild(e);setTimeout(()=>e.remove(),1200)}
}

function visualHTML(v,size='normal'){
  if(!v)return '<div class="visual-frame"><span class="visual-emoji">🖼️</span></div>';
  const cls=size==='large'?'visual-frame large':'visual-frame';
  if(v.kind==='color') return `<div class="${cls}"><span class="visual-color" style="background:${esc(v.value)}"></span></div>`;
  if(v.kind==='number') return `<div class="${cls}"><span class="visual-number">${esc(v.value)}</span></div>`;
  if(v.kind==='shape'){
    let shape='';
    if(v.value==='circle')shape='<circle cx="60" cy="60" r="42" fill="#ff8a3d"/>';
    if(v.value==='square')shape='<rect x="18" y="18" width="84" height="84" rx="8" fill="#5b67f1"/>';
    if(v.value==='triangle')shape='<polygon points="60,13 108,105 12,105" fill="#22c58b"/>';
    if(v.value==='rectangle')shape='<rect x="8" y="29" width="104" height="62" rx="8" fill="#ff67a6"/>';
    return `<div class="${cls}"><svg class="shape-svg" viewBox="0 0 120 120" aria-hidden="true">${shape}</svg></div>`;
  }
  if(v.kind==='eyes'){
    return `<div class="${cls}"><svg class="face-svg" viewBox="0 0 160 160"><circle cx="80" cy="82" r="60" fill="#ffd4ad"/><path d="M25 64 Q80 10 135 64" fill="#5b3526"/><ellipse cx="58" cy="83" rx="17" ry="21" fill="#fff"/><ellipse cx="102" cy="83" rx="17" ry="21" fill="#fff"/><circle cx="58" cy="85" r="9" fill="${esc(v.value)}"/><circle cx="102" cy="85" r="9" fill="${esc(v.value)}"/><circle cx="58" cy="85" r="4"/><circle cx="102" cy="85" r="4"/><path d="M58 116 Q80 130 102 116" fill="none" stroke="#b84f55" stroke-width="5" stroke-linecap="round"/></svg></div>`;
  }
  if(v.kind==='hair'){
    const map={brown:'#6b351f',black:'#171717',blond:'#e7b83f',red:'#b84d2d',long:'#5b3526',short:'#3b2a20',curly:'#4a2b21',straight:'#3d2924'};const c=map[String(v.value).toLowerCase()]||'#5b3526';
    const curly=String(v.value).toLowerCase()==='curly';const long=String(v.value).toLowerCase()==='long';
    return `<div class="${cls}"><svg class="face-svg" viewBox="0 0 160 160"><circle cx="80" cy="87" r="55" fill="#ffd4ad"/>${long?`<path d="M28 64 Q80 5 132 64 L137 143 Q113 150 110 109 L50 109 Q46 149 23 142Z" fill="${c}"/>`:`<path d="M28 68 Q80 7 132 68 Q123 42 107 31 Q81 14 54 32 Q36 42 28 68" fill="${c}"/>`}${curly?'<g fill="'+c+'"><circle cx="41" cy="53" r="16"/><circle cx="61" cy="36" r="17"/><circle cx="83" cy="32" r="18"/><circle cx="106" cy="39" r="17"/><circle cx="124" cy="56" r="16"/></g>':''}<circle cx="60" cy="86" r="5"/><circle cx="100" cy="86" r="5"/><path d="M61 112 Q80 124 99 112" fill="none" stroke="#b84f55" stroke-width="5" stroke-linecap="round"/></svg></div>`;
  }
  return `<div class="${cls}"><span class="visual-emoji">${esc(v.value||v.emoji||'🖼️')}</span></div>`;
}

function topbar(){
  const name=platformName();
  return `<div class="topbar"><div class="topbar-inner"><div class="brand"><div class="logo">CP</div><div><h1>${name?`${esc(name)} — Connect Plus Primary 1`:'Connect Plus Primary 1'}</h1><p>Station-based interactive English course</p></div></div><div class="top-actions"><span class="badge badge-gold">⭐ ${state.points} stars</span><span class="badge">✅ ${state.completedLessons.length}/${totalLessons()} lessons</span><button class="btn btn-light btn-small" onclick="goHome()">Home</button></div></div></div>`;
}

function homeView(){
  const name=platformName();
  const greeting=name?`Welcome back, ${esc(name)}!`:'Welcome to Your English Adventure!';
  return `<main class="container">
    <section class="card hero"><img src="${esc(window.COURSE_DATA.welcomeImage)}" alt="Connect Plus Primary 1 welcome cover"><div class="hero-panel"><h2>${greeting}</h2><p>Your name comes from the main platform automatically. Open the course and continue through the station path.</p><div class="hero-actions"><button class="btn btn-primary" onclick="continueCourse()">${state.lastLocation?'Continue learning':'Start the course'}</button></div><div class="stat-row"><div class="stat"><strong>${state.completedLessons.length}</strong><span>Lessons done</span></div><div class="stat"><strong>${state.points}</strong><span>Stars earned</span></div><div class="stat"><strong>${totalLessons()}</strong><span>Total lessons</span></div></div></div></section>
    <div class="dashboard"><section class="card panel"><h3>A real station path in every lesson</h3><p>Each lesson opens into seven separate learning stations. Children study picture vocabulary, practise language, listen and speak, complete a special mission, play checked questions, and finish with a final challenge.</p><div class="feature-list"><div class="feature"><span class="feature-icon">🖼️</span><div><strong>Picture-supported vocabulary</strong><small>All lesson words have a visual card and audio.</small></div></div><div class="feature"><span class="feature-icon">🎮</span><div><strong>Checked questions</strong><small>No vague color blanks or questions with multiple correct answers.</small></div></div><div class="feature"><span class="feature-icon">🎉</span><div><strong>Child-friendly rewards</strong><small>Stars, sounds, clear correction, and celebration effects.</small></div></div></div></section><section class="card panel"><h3>Course progress</h3><div class="stat-row"><div class="stat"><strong>${state.completedLessons.length}</strong><span>Finished</span></div><div class="stat"><strong>${totalLessons()-state.completedLessons.length}</strong><span>Remaining</span></div><div class="stat"><strong>${percent(state.completedLessons.length,totalLessons())}%</strong><span>Complete</span></div></div><div style="margin-top:16px" class="progress"><span style="width:${percent(state.completedLessons.length,totalLessons())}%"></span></div><button style="margin-top:16px;width:100%" class="btn btn-light" onclick="resetAll()">Reset progress</button></section></div>
    <div class="section-heading"><div><h2>Course sections</h2><p>Choose a unit, review, or reader.</p></div></div>
    <section class="module-grid">${getSections().map(section=>{const d=sectionDone(section),p=percent(d,section.lessons.length),label=section.type==='unit'?`Unit ${section.unitNumber}`:section.type[0].toUpperCase()+section.type.slice(1),available=sectionAllowed(section.id);return `<article class="card module ${available?'':'locked'}"><div class="module-cover"><img src="${esc(section.cover)}" alt="${esc(section.title)}"><span class="module-label">${esc(label)}</span><span class="module-score">⭐ ${d}</span></div><div class="module-body"><div><h3>${esc(section.title)}</h3><p>${esc(section.subtitle)}</p></div><div class="pills"><span class="pill">${section.lessons.length} lessons</span><span class="pill">${p}% complete</span></div><div class="progress"><span style="width:${p}%"></span></div><button class="btn ${available?'btn-primary':'btn-light'}" ${available?`onclick="openSection('${section.id}')"`:'disabled'}>${available?'Open section':'Subscribe to open'}</button></div></article>`}).join('')}</section>
    <p class="footer-note">English-only course. Student identity is supplied by the parent platform.</p>
  </main>`;
}

function sectionView(section){
  const done=sectionDone(section),p=percent(done,section.lessons.length);
  return `<main class="container"><div class="breadcrumbs"><button class="btn btn-light btn-small" onclick="goHome()">Home</button><span class="crumb">›</span><span class="crumb">${esc(section.title)}</span></div><section class="card section-hero"><div class="section-image"><img src="${esc(section.cover)}" alt="${esc(section.title)}"><div class="section-copy"><span class="badge light-pill">${section.type==='unit'?`Unit ${section.unitNumber}`:esc(section.type)}</span><h2>${esc(section.title)}</h2><p>${esc(section.subtitle)}</p></div></div><div class="section-info"><div class="pills">${(section.outcomes||[]).map(x=>`<span class="pill">${esc(x)}</span>`).join('')}</div><div style="margin-top:15px" class="progress"><span style="width:${p}%"></span></div><p style="margin:9px 0 0;color:var(--muted);font-weight:800">${done} of ${section.lessons.length} lessons completed</p></div></section><div class="section-heading"><div><h2>Lesson path</h2><p>Each lesson contains seven stations.</p></div></div><section class="lesson-list">${section.lessons.map((lesson,i)=>{const unlocked=lessonUnlocked(section,i),doneLesson=isLessonDone(lesson.id),sd=stations.filter(s=>isStationDone(lesson.id,s.id)).length;return `<article class="lesson-row ${unlocked?'':'locked'}"><span class="number">${i+1}</span><div><h4>${esc(lesson.title)}</h4><p>${sd}/7 stations complete • ${lesson.questions.length} checked questions</p></div><button class="btn ${unlocked?'btn-primary':'btn-light'}" ${unlocked?`onclick="openLesson('${section.id}','${lesson.id}')"`:'disabled'}>${doneLesson?'Review stations':unlocked?'Open stations':'Locked'}</button></article>`}).join('')}</section></main>`;
}

function lessonHub(section,lesson){
  const done=stations.filter(s=>isStationDone(lesson.id,s.id)).length,p=percent(done,stations.length);
  return `<main class="container"><div class="breadcrumbs"><button class="btn btn-light btn-small" onclick="goHome()">Home</button><span class="crumb">›</span><button class="btn btn-light btn-small" onclick="openSection('${section.id}')">${esc(section.title)}</button><span class="crumb">›</span><span class="crumb">Station Map</span></div><section class="lesson-banner" style="background-image:url('${esc(section.cover)}')"><div class="lesson-banner-copy"><span class="badge light-pill">Station Adventure</span><h2>${esc(lesson.title)}</h2><p>${esc(lesson.summary)}</p><div class="pills" style="margin-top:13px"><span class="pill light-pill">📍 ${done}/7 stations</span><span class="pill light-pill">🎮 ${lesson.questions.length} checked questions</span></div></div></section><div class="station-head"><div><h2>Choose your next station</h2><p>Complete each station to unlock the next one.</p></div><div style="min-width:240px"><div class="progress"><span style="width:${p}%"></span></div></div></div><section class="station-map">${stations.map((s,i)=>{const unlocked=isStationUnlocked(lesson,i),doneS=isStationDone(lesson.id,s.id);return `<button class="station-card station-${s.color} ${doneS?'done':''} ${unlocked?'':'locked'}" ${unlocked?`onclick="openStation('${section.id}','${lesson.id}','${s.id}')"`:'disabled'}><span class="station-num">${i+1}</span><span class="station-icon">${s.icon}</span><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><span class="station-status">${doneS?'✅ Completed':unlocked?'▶️ Open':'🔒 Locked'}</span></button>`}).join('')}</section>${done===stations.length?`<section class="card complete-banner"><span class="trophy">🏆</span><div style="flex:1"><h3>All stations are complete!</h3><p>Finish the lesson and unlock the next lesson.</p></div><button class="btn btn-orange" onclick="finishLesson('${section.id}','${lesson.id}')">Finish lesson</button></section>`:''}</main>`;
}

function specialInfo(lesson){
  const t=lesson.title.toLowerCase();
  if(t.includes('phonic'))return{title:'Sound Detective Lab',icon:'🐝',intro:'Listen to the words and notice the target sound.'};
  if(t.includes('project'))return{title:'Project Studio',icon:'🎨',intro:'Follow the project steps and use English to describe your work.'};
  if(t.includes('value')||t.includes('safety')||t.includes('issue')||t.includes('life skill'))return{title:'Good Choices Mission',icon:'💛',intro:'Explore kind, helpful, safe, and responsible choices.'};
  if(t.includes('clil')||t.includes('science')||t.includes('math')||t.includes('world'))return{title:'Discovery Lab',icon:'🔬',intro:'Connect English with science, math, and the wider world.'};
  if(t.includes('read')||t.includes('story')||t.includes('reader'))return{title:'Story Corner',icon:'📚',intro:'Read the lesson lines, listen, and talk about the text.'};
  return{title:'Skill Mission',icon:'🧭',intro:'Use the lesson words and sentences in a focused activity.'};
}

function missionBody(lesson){const targets=lesson.targets?.length?lesson.targets:['Learn the key words.','Use the lesson language.','Finish the lesson games.'];return `<div class="station-layout"><section class="card station-main"><h3>Today’s mission</h3><p>Look at the lesson goals before you begin.</p><div class="objective-list">${targets.map((x,i)=>`<div class="objective"><span>${i+1}</span><p>${esc(x)}</p></div>`).join('')}</div></section><aside class="card station-side"><h3>Lesson skills</h3><div class="pills">${(lesson.skills||[]).map(x=>`<span class="pill">${esc(x)}</span>`).join('')||'<span class="pill">English practice</span>'}</div><div style="margin-top:18px" class="feature"><span class="feature-icon">🐝</span><div><strong>Busy Bee tip</strong><small>Say the lesson title aloud.</small></div></div><button style="width:100%;margin-top:14px" class="btn btn-primary" onclick="speakCurrentTitle()">🔊 Hear the title</button></aside></div>`}
function wordsBody(lesson){return `<section class="card station-main"><div class="game-header"><div><h3>Picture vocabulary</h3><p>Every word has a visual clue and a sound button.</p></div><button class="btn btn-light btn-small" onclick="speakAllWords()">🔊 Read all</button></div><div class="vocab-grid">${lesson.visualVocabulary.map(item=>`<article class="vocab-card">${visualHTML(item.visual)}<div><h4>${esc(item.word)}</h4><small>${esc(item.category)} word</small></div><button class="btn btn-light btn-small" onclick="speakWord(${lesson.visualVocabulary.indexOf(item)})">🔊 Say it</button></article>`).join('')}</div></section>`}
function languageBody(lesson){return `<div class="station-layout"><section class="card station-main"><h3>Language cards</h3><p>Listen, read, and repeat each sentence.</p><div class="language-stack">${lesson.language.map((line,i)=>`<article class="language-card"><span class="count">${i+1}</span><p>${esc(line)}</p><button class="btn btn-light btn-small" onclick="speakLine(${i})">🔊</button></article>`).join('')}</div></section><aside class="card station-side"><h3>Speaking steps</h3><div class="objective-list"><div class="objective"><span>1</span><p>Listen once.</p></div><div class="objective"><span>2</span><p>Listen again.</p></div><div class="objective"><span>3</span><p>Repeat slowly.</p></div><div class="objective"><span>4</span><p>Say it with confidence.</p></div></div></aside></div>`}
function listenBody(lesson){const items=[...lesson.vocabulary.slice(0,6),...lesson.language.slice(0,4)];return `<div class="station-layout"><section class="card station-main"><h3>Listen and repeat</h3><p>Tap a card, listen carefully, and repeat aloud.</p><div class="listen-grid">${items.map((x,i)=>`<button class="listen-card" onclick="speakListenItem(${i})"><span class="ear">${i%2?'🗣️':'🎧'}</span><strong>${esc(x)}</strong><small>Tap to listen</small></button>`).join('')}</div></section><aside class="card station-side"><h3>Voice mission</h3><div class="feature-list"><div class="feature"><span class="feature-icon">👂</span><div><strong>Listen</strong><small>Keep your eyes on the words.</small></div></div><div class="feature"><span class="feature-icon">🗣️</span><div><strong>Repeat</strong><small>Say the sound clearly.</small></div></div><div class="feature"><span class="feature-icon">⭐</span><div><strong>Try again</strong><small>Repeat difficult words twice.</small></div></div></div></aside></div>`}
function specialBody(lesson){const s=specialInfo(lesson),items=lesson.activities?.length?lesson.activities:lesson.targets;return `<div class="station-layout"><section class="card station-main"><div style="font-size:3rem">${s.icon}</div><h3>${esc(s.title)}</h3><p>${esc(s.intro)}</p><div class="objective-list">${(items||[]).slice(0,6).map((x,i)=>`<div class="objective"><span>${i+1}</span><p>${esc(x)}</p></div>`).join('')}</div></section><aside class="card station-side"><h3>Use the lesson language</h3><p>Listen to a model sentence and say it aloud.</p>${lesson.language.slice(0,3).map((x,i)=>`<button style="width:100%;margin-top:10px" class="btn btn-light" onclick="speakLine(${i})">🔊 ${esc(x)}</button>`).join('')}</aside></div>`}

function currentContext(){const section=getSection(state.sectionId),lesson=getLesson(section,state.lessonId);return{section,lesson,station:stations.find(s=>s.id===state.stationId)}}
function currentZone(){return state.stationId==='final'?'final':'game';}
function currentQuestion(){const {lesson}=currentContext(),zone=currentZone(),q=getQuiz(lesson,zone),list=questionsFor(lesson,zone);return{lesson,zone,quiz:q,list,question:list[q.index]};}
function optionClass(quiz,q,opt){if(!quiz.done)return'option';if(norm(opt)===norm(q.answer))return'option correct';if(norm(opt)===norm(quiz.selected))return'option wrong';return'option'}

function questionVisual(q){return q.visual?visualHTML(q.visual,'large'):''}
function feedbackHTML(quiz,q){if(!quiz.done)return'';const good=isCorrect(q,quiz.selected,quiz);return `<div class="feedback ${good?'good':'bad'}">${good?'Fantastic! That answer is correct.':`Good try. ${esc(q.explanation||`The correct answer is ${q.answer}.`)}`}</div>`}
function isCorrect(q,selected,quiz){
  if(q.type==='visual-true-false')return selected===q.answer;
  if(q.type==='spell')return norm(selected)===norm(q.answer);
  if(q.type==='sentence-order')return norm(selected)===norm(q.answer);
  if(q.type==='match-pairs')return q.pairs.every((p,i)=>norm(quiz.match[i])===norm(p.word));
  return norm(selected)===norm(q.answer);
}

function renderQuestion(q,quiz){
  if(!q)return'<p>No question is available.</p>';
  let core='';
  if(q.type==='picture-choice')core=`${questionVisual(q)}<p class="question-title">${esc(q.prompt)}</p><div class="options">${q.options.map((o,i)=>`<button class="${optionClass(quiz,q,o)}" ${quiz.done?'disabled':''} onclick="chooseOption(${i})">${esc(o)}</button>`).join('')}</div>`;
  if(q.type==='listen-choice'||q.type==='listen-sentence')core=`<button class="audio-button" onclick="playQuestionAudio()">🔊 Play the sound</button><p class="question-title">${esc(q.prompt)}</p><div class="options">${q.options.map((o,i)=>`<button class="${optionClass(quiz,q,o)}" ${quiz.done?'disabled':''} onclick="chooseOption(${i})">${esc(o)}</button>`).join('')}</div>`;
  if(q.type==='grammar-choice')core=`<p class="question-title">${esc(q.prompt)}</p><p class="question-text">${esc(q.sentence)}</p><div class="options">${q.options.map((o,i)=>`<button class="${optionClass(quiz,q,o)}" ${quiz.done?'disabled':''} onclick="chooseOption(${i})">${esc(o)}</button>`).join('')}</div>`;
  if(q.type==='visual-true-false')core=`${questionVisual(q)}<p class="question-title">${esc(q.prompt)}</p><p class="question-text">${esc(q.statement)}</p><div class="options"><button class="${quiz.done?(q.answer===true?'option correct':quiz.selected===true?'option wrong':'option'):'option'}" ${quiz.done?'disabled':''} onclick="chooseBoolean(true)">True</button><button class="${quiz.done?(q.answer===false?'option correct':quiz.selected===false?'option wrong':'option'):'option'}" ${quiz.done?'disabled':''} onclick="chooseBoolean(false)">False</button></div>`;
  if(q.type==='spell')core=`${questionVisual(q)}<p class="question-title">${esc(q.prompt)}</p><div class="spell-row"><input id="spellAnswer" class="answer-input" autocomplete="off" placeholder="Type the word" value="${quiz.done?esc(quiz.selected||''):''}" ${quiz.done?'disabled':''}><button class="btn btn-primary" ${quiz.done?'disabled':''} onclick="checkSpell()">Check</button></div>`;
  if(q.type==='sentence-order')core=`<p class="question-title">${esc(q.prompt)}</p><div class="answer-train">${quiz.order.map((w,i)=>`<button class="selected-word" ${quiz.done?'disabled':''} onclick="removeOrderWord(${i})">${esc(w)}</button>`).join('')}</div><div class="word-bank">${q.words.map((w,i)=>`<button class="word-tile" ${quiz.done?'disabled':''} onclick="addOrderWord(${i})">${esc(w)}</button>`).join('')}</div><div style="display:flex;gap:10px;margin-top:14px"><button class="btn btn-light" ${quiz.done?'disabled':''} onclick="clearOrder()">Clear</button><button class="btn btn-primary" ${quiz.done?'disabled':''} onclick="checkOrder()">Check</button></div>`;
  if(q.type==='match-pairs'){
    const opts=q.pairs.map(p=>p.word).sort(()=>.5-Math.random());
    core=`<p class="question-title">${esc(q.prompt)}</p><div class="match-grid">${q.pairs.map((p,i)=>`<div class="match-row">${visualHTML(p.visual)}<select class="match-select" ${quiz.done?'disabled':''} onchange="setMatch(${i},this.value)"><option value="">Choose a word</option>${opts.map(o=>`<option value="${esc(o)}" ${quiz.match[i]===o?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`).join('')}</div><button style="margin-top:14px" class="btn btn-primary" ${quiz.done?'disabled':''} onclick="checkMatch()">Check matches</button>`;
  }
  return `<div class="question">${core}${feedbackHTML(quiz,q)}</div>`;
}

function quizBody(lesson,zone){const quiz=getQuiz(lesson,zone),list=questionsFor(lesson,zone),q=list[quiz.index],p=percent(quiz.index+(quiz.done?1:0),list.length);return `<section class="card game-shell"><div class="game-header"><div><h3>${zone==='final'?'Final Challenge':'Game Zone'}</h3><p>${zone==='final'?'Complete all five final checks.':'Answer clear picture, listening, spelling, matching, and language questions.'}</p></div><span class="badge badge-gold">⭐ ${quiz.score} station stars</span></div><div class="game-progress"><div style="display:flex;justify-content:space-between;font-weight:900"><span>Challenge ${quiz.index+1} of ${list.length}</span><span>${p}%</span></div><div class="progress"><span style="width:${p}%"></span></div></div>${renderQuestion(q,quiz)}${quiz.done?`<div style="margin-top:14px"><button class="btn ${quiz.index<list.length-1?'btn-primary':'btn-green'}" onclick="nextQuestion()">${quiz.index<list.length-1?(isCorrect(q,quiz.selected,quiz)?'Next challenge':'Got it — next challenge'):'Finish this station'}</button></div>`:''}</section>`}

function stationBody(section,lesson,station){if(station.id==='mission')return missionBody(lesson);if(station.id==='words')return wordsBody(lesson);if(station.id==='language')return languageBody(lesson);if(station.id==='listen')return listenBody(lesson);if(station.id==='special')return specialBody(lesson);if(station.id==='game')return quizBody(lesson,'game');return quizBody(lesson,'final')}
function stationReady(lesson,station){if(station.id!=='game'&&station.id!=='final')return true;const zone=station.id==='final'?'final':'game',quiz=getQuiz(lesson,zone),list=questionsFor(lesson,zone);return quiz.done&&quiz.index===list.length-1}
function stationView(section,lesson,station){const index=stations.findIndex(s=>s.id===station.id),done=isStationDone(lesson.id,station.id),ready=stationReady(lesson,station);return `<main class="container"><div class="breadcrumbs"><button class="btn btn-light btn-small" onclick="goHome()">Home</button><span class="crumb">›</span><button class="btn btn-light btn-small" onclick="openSection('${section.id}')">${esc(section.title)}</button><span class="crumb">›</span><button class="btn btn-light btn-small" onclick="openLesson('${section.id}','${lesson.id}')">Station Map</button><span class="crumb">›</span><span class="crumb">${esc(station.title)}</span></div><section class="station-top station-${station.color}"><div class="station-top-icon">${station.icon}</div><div><span class="station-kicker">Station ${index+1} of 7</span><h2>${esc(station.title)}</h2><p>${esc(station.description)}</p></div><span class="station-reward">${done?'✅ Completed':'⭐ +5 stars'}</span></section>${stationBody(section,lesson,station)}<nav class="navbar"><button class="btn btn-light" onclick="openLesson('${section.id}','${lesson.id}')">Back to station map</button>${done?`<button class="btn btn-primary" onclick="openLesson('${section.id}','${lesson.id}')">Station completed</button>`:`<button class="btn btn-orange" ${ready?'':'disabled'} onclick="completeCurrentStation()">${ready?'Complete station':station.id==='game'||station.id==='final'?'Finish all questions first':'Complete station'}</button>`}</nav></main>`}

function render(){const app=document.getElementById('app');let view='';if(state.route==='home')view=homeView();if(state.route==='section')view=sectionView(getSection(state.sectionId));if(state.route==='lesson'){const section=getSection(state.sectionId),lesson=getLesson(section,state.lessonId);view=state.stationId?stationView(section,lesson,stations.find(s=>s.id===state.stationId)):lessonHub(section,lesson)}app.innerHTML=`<div class="app">${topbar()}${view}</div>`}

// Navigation
function goHome(){go('home')}
function openSection(id){
  if (!sectionAllowed(id)) { accessMessage(); return; }
  go('section',id);
}
function openLesson(sectionId,lessonId){
  if (!sampleAllowed(sectionId,lessonId)) { accessMessage(); return; }
  go('lesson',sectionId,lessonId);
}
function openStation(sectionId,lessonId,stationId){
  if (!sampleAllowed(sectionId,lessonId)) { accessMessage(); return; }
  go('lesson',sectionId,lessonId,stationId);
}
function continueCourse(){
  if(state.lastLocation && sampleAllowed(state.lastLocation.sectionId,state.lastLocation.lessonId)){
    go(state.lastLocation.route,state.lastLocation.sectionId,state.lastLocation.lessonId,state.lastLocation.stationId);
    return;
  }
  const section=getSection(SAMPLE_SECTION_ID),lesson=getLesson(section,SAMPLE_LESSON_ID);
  go('lesson',section.id,lesson.id);
}

// Station content actions
function speakCurrentTitle(){speak(currentContext().lesson.title)}
function speakAllWords(){speak(currentContext().lesson.vocabulary.join(', '))}
function speakWord(i){speak(currentContext().lesson.vocabulary[i])}
function speakLine(i){speak(currentContext().lesson.language[i])}
function speakListenItem(i){const l=currentContext().lesson,items=[...l.vocabulary.slice(0,6),...l.language.slice(0,4)];speak(items[i])}
function playQuestionAudio(){const {question}=currentQuestion();speak(question.audio)}

// Quiz actions
function awardQuestion(lesson,zone,q,quiz,correct){const token=q.id;if(correct&&!quiz.awarded.includes(token)){quiz.awarded.push(token);quiz.score+=5;state.points+=5;goodSound();celebrate('Correct! +5 stars')}else if(!correct){badSound();celebrate('Nice try! Read the correction.')}save()}
function chooseOption(i){const {lesson,zone,quiz,question}=currentQuestion();if(quiz.done)return;quiz.selected=question.options[i];quiz.done=true;awardQuestion(lesson,zone,question,quiz,isCorrect(question,quiz.selected,quiz));render()}
function chooseBoolean(value){const {lesson,zone,quiz,question}=currentQuestion();if(quiz.done)return;quiz.selected=value;quiz.done=true;awardQuestion(lesson,zone,question,quiz,isCorrect(question,value,quiz));render()}
function checkSpell(){const {lesson,zone,quiz,question}=currentQuestion();if(quiz.done)return;quiz.selected=document.getElementById('spellAnswer')?.value||'';quiz.done=true;awardQuestion(lesson,zone,question,quiz,isCorrect(question,quiz.selected,quiz));render()}
function addOrderWord(i){const {quiz,question}=currentQuestion();if(quiz.done)return;quiz.order.push(question.words[i]);save();render()}
function removeOrderWord(i){const {quiz}=currentQuestion();if(quiz.done)return;quiz.order.splice(i,1);save();render()}
function clearOrder(){const {quiz}=currentQuestion();if(quiz.done)return;quiz.order=[];save();render()}
function checkOrder(){const {lesson,zone,quiz,question}=currentQuestion();if(quiz.done)return;quiz.selected=quiz.order.join(' ');quiz.done=true;awardQuestion(lesson,zone,question,quiz,isCorrect(question,quiz.selected,quiz));render()}
function setMatch(i,value){const {quiz}=currentQuestion();quiz.match[i]=value;save()}
function checkMatch(){const {lesson,zone,quiz,question}=currentQuestion();if(quiz.done)return;quiz.selected='checked';quiz.done=true;awardQuestion(lesson,zone,question,quiz,isCorrect(question,quiz.selected,quiz));render()}
function nextQuestion(){const {lesson,zone,quiz,list}=currentQuestion();if(!quiz.done)return;if(quiz.index<list.length-1){quiz.index++;quiz.done=false;quiz.selected=null;quiz.order=[];quiz.match={};save();render()}else{completeCurrentStation()}}

function completeCurrentStation(){const {section,lesson,station}=currentContext();if(!stationReady(lesson,station))return;const list=stationDoneList(lesson.id);if(!list.includes(station.id)){list.push(station.id);state.points+=5;goodSound();celebrate('Station complete! +5 stars')}save();const idx=stations.findIndex(s=>s.id===station.id),next=stations[idx+1];if(next)go('lesson',section.id,lesson.id,next.id);else go('lesson',section.id,lesson.id)}
function finishLesson(sectionId,lessonId){const section=getSection(sectionId),lesson=getLesson(section,lessonId);if(!stations.every(s=>isStationDone(lesson.id,s.id))){celebrate('Complete all stations first.');return}if(!isLessonDone(lesson.id)){state.completedLessons.push(lesson.id);state.points+=20;goodSound();celebrate('Lesson complete! +20 stars')}save();const i=section.lessons.findIndex(l=>l.id===lesson.id),next=section.lessons[i+1];if(next)go('lesson',section.id,next.id);else go('section',section.id)}
function resetAll(){if(!confirm('Reset all saved course progress on this device?'))return;state.points=0;state.completedLessons=[];state.stationProgress={};state.quizProgress={};state.lastLocation=null;save();render()}

Object.assign(window,{goHome,openSection,openLesson,openStation,continueCourse,speakCurrentTitle,speakAllWords,speakWord,speakLine,speakListenItem,playQuestionAudio,chooseOption,chooseBoolean,checkSpell,addOrderWord,removeOrderWord,clearOrder,checkOrder,setMatch,checkMatch,nextQuestion,completeCurrentStation,finishLesson,resetAll});
window.CP1_APP={getProgress:()=>({points:state.points,completedLessons:state.completedLessons.length,totalLessons:totalLessons(),lastLocation:state.lastLocation,portalState:portalState()})};

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) return;
  const message = event.data || {};
  if (message.type === 'mrfarid-course-access') {
    sampleMode = message.mode === 'sample';
    if (sampleMode && !sampleAllowed(state.sectionId, state.lessonId)) goHome();
    render();
  }
  if (message.type === 'mrfarid-course-entry') {
    entryDestination = message.destination === 'resume' ? 'resume' : 'dashboard';
    if (entryDestination === 'resume' && state.lastLocation && sampleAllowed(state.lastLocation.sectionId, state.lastLocation.lessonId)) {
      go('lesson', state.lastLocation.sectionId, state.lastLocation.lessonId, state.lastLocation.stationId);
    } else if (!preserveRefreshLocation) {
      goHome();
    }
  }
});

async function connectPortalProgress() {
  if (!window.MrFaridCourseProgress) return;
  const result = await window.MrFaridCourseProgress.connect({
    courseId: COURSE_ID,
    getState: portalState,
    setState: (saved) => { applyPortalState(saved); render(); },
    mergeState: mergePortalState,
    onReady: () => render(),
    onStatus: ({ online, message }) => {
      document.documentElement.dataset.cloudProgress = online ? 'ready' : 'waiting';
      document.documentElement.dataset.cloudProgressMessage = message || '';
    },
  });
  if (!result?.connected) document.documentElement.dataset.cloudProgress = 'offline';
}

render();
void connectPortalProgress();
