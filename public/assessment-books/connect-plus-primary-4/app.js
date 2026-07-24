
const B=window.BOOK_DATA;
const COLORS={violet:'#7047e8',blue:'#2877f5',green:'#18a765',orange:'#ff7a3c',pink:'#e64eb6',teal:'#13aaa6',gold:'#e5a500',red:'#e75555'};
const state=JSON.parse(localStorage.getItem('cp4_rebuilt_state')||'{"answers":{},"completed":{},"xp":0,"stars":0,"last":{"u":0,"l":0,"p":0},"sound":true}');
let U=0,L=0,P=0,selectedToken=null;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function save(){localStorage.setItem('cp4_rebuilt_state',JSON.stringify(state));updateStats()}
function allLessons(){return B.units.flatMap((u,ui)=>u.lessons.map((l,li)=>({ui,li,l})))}
function updateStats(){
 $('#stars').textContent=state.stars;$('#xp').textContent=state.xp;
 const lessons=allLessons(),done=lessons.filter(x=>state.completed[x.l.id]).length,pct=Math.round(done/lessons.length*100);
 $('#progressText').textContent=pct+'%';$('#progressBar').style.width=pct+'%';
 $('#soundBtn').textContent=state.sound?'🔊':'🔇';
}
function showHome(){$('#homeView').classList.remove('hidden');$('#bookView').classList.add('hidden');renderHome();window.scrollTo(0,0)}
function startBook(){U=0;L=0;P=0;openBook()}
function continueBook(){U=state.last.u||0;L=state.last.l||0;P=state.last.p||0;openBook()}
function openUnit(i){U=i;L=0;P=0;openBook()}
function openBook(){$('#homeView').classList.add('hidden');$('#bookView').classList.remove('hidden');renderSidebar();renderLesson();window.scrollTo(0,0)}
function renderHome(){
 $('#unitGrid').innerHTML=B.units.map((u,i)=>`<button class="unitCard" onclick="openUnit(${i})" style="background:linear-gradient(135deg,${COLORS[u.color]||'#7047e8'},${shade(COLORS[u.color]||'#7047e8',35)})"><span class="icon">${u.icon||'📘'}</span><h3>${esc(u.title)}</h3><p>${esc(u.description||'')}</p><small>${u.lessons.length} learning stations →</small></button>`).join('');
}
function shade(hex,amount){let c=hex.replace('#',''),n=parseInt(c,16),r=Math.min(255,(n>>16)+amount),g=Math.min(255,((n>>8)&255)+amount),b=Math.min(255,(n&255)+amount);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
function renderSidebar(){
 $('#sidebar').innerHTML=`<button class="sideHome" onclick="showHome()">⌂ Book Home</button>`+B.units.map((u,ui)=>`<div class="sideUnit"><div class="sideUnitTitle">${u.icon||'📘'} ${esc(u.title)}</div>${u.lessons.map((l,li)=>`<button class="lessonBtn ${ui===U&&li===L?'active':''} ${state.completed[l.id]?'done':''}" onclick="goLesson(${ui},${li})">${li+1}. ${esc(l.title)}</button>`).join('')}</div>`).join('');
}
function goLesson(ui,li){U=ui;L=li;P=0;renderSidebar();renderLesson();window.scrollTo(0,0)}
function renderLesson(){
 const u=B.units[U],l=u.lessons[L];P=Math.min(P,l.pageData.length-1);
 state.last={u:U,l:L,p:P};save();
 $('#lessonHeader').innerHTML=`<div><h1>${u.icon||'📘'} ${esc(l.title)}</h1><p>${esc(u.title)} • ${l.pageData.length>1?l.pageData.length+' workbook pages':'Workbook page '+l.pageData[0].page}</p></div><button id="referenceBtn" class="referenceBtn" onclick="toggleOriginal()">👁 Show Original Page${l.pageData.length>1?'s':''}</button>`;
 $('#originalPages').classList.add('hidden');
 $('#originalPages').innerHTML=`<h3>Original workbook reference</h3><p class="noteBox">These pages are for reference only. Complete every exercise in the interactive activities below.</p><div class="originalGrid">${l.pageData.map(p=>`<img src="${esc(p.original)}" alt="Original workbook page ${p.page}">`).join('')}</div>`;
 $('#pageTabs').innerHTML=l.pageData.map((p,i)=>`<button class="pageTab ${i===P?'active':''}" onclick="selectPage(${i})">Page ${p.page}</button>`).join('');
 renderActivities();
}
function toggleOriginal(){
 const box=$('#originalPages'),btn=$('#referenceBtn'),open=box.classList.toggle('hidden')===false;
 btn.textContent=open?'🙈 Hide Original Page'+(B.units[U].lessons[L].pageData.length>1?'s':''):'👁 Show Original Page'+(B.units[U].lessons[L].pageData.length>1?'s':'');
}
function selectPage(i){P=i;state.last.p=P;save();renderLesson();window.scrollTo({top:90,behavior:'smooth'})}
function renderActivities(){
 const u=B.units[U],l=u.lessons[L],page=l.pageData[P],accent=COLORS[u.color]||'#7047e8';
 $('#activities').innerHTML=page.activities.map((a,i)=>activityHTML(a,i,page,accent)).join('');
 bindControls();
}
function activityKey(a){return `${B.units[U].lessons[L].id}|${B.units[U].lessons[L].pageData[P].page}|${a.id}`}
function activityHTML(a,idx,page,accent){
 const key=activityKey(a),saved=state.answers[key]||{},isOptional=!!a.optional,isListening=!!a.listening;
 const badge=isOptional?`<span class="badgeOptional ${isListening?'listenOptional':''}">${isListening?'🎧 Optional Listening Activity':'Optional Activity'}</span>`:'';
 let body='';
 if(a.type==='choice')body=renderChoice(a,key,saved);
 else if(a.type==='fill')body=renderFill(a,key,saved);
 else if(a.type==='match')body=renderMatch(a,key,saved);
 else if(a.type==='tf')body=renderTF(a,key,saved);
 else if(a.type==='order')body=renderOrder(a,key,saved);
 else if(a.type==='reading')body=renderReading(a,key,saved);
 else if(a.type==='creative'||a.type==='open')body=renderOpen(a,key,saved,isOptional);
 else if(a.type==='crossword')body=renderOpen(a,key,saved,isOptional);
 else body=renderOpen(a,key,saved,isOptional);
 const speakText=encodeURIComponent((a.instruction+" "+a.lines.join(" ")).slice(0,1800));
 return `<section class="activity" style="--accent:${accent}"><div class="activityHeader"><div class="activityNo">${idx+1}</div><h2>${esc(a.instruction)}</h2>${badge}<button class="readBtn" data-speak="${speakText}">🔊 Read Aloud</button></div>${body}<div class="saveRow"><span class="saved" id="saved-${safeId(key)}">Saved ✓</span><button class="saveActivity" onclick='saveActivity(${JSON.stringify(key)})'>Save Activity</button></div></section>`;
}
function safeId(s){return s.replace(/[^a-z0-9]/gi,'_')}
function parseChoice(line){
 const s=line.replace(/^\s*\d+[\.\-\)]?\s*/,'').trim();
 const parts=s.split(/\s*\/\s*/).map(x=>x.trim()).filter(Boolean);
 if(parts.length<2)return {stem:s,opts:[]};
 let stem=parts[0],first='';
 const m=stem.match(/^(.*?)([A-Za-z][A-Za-z '-]*)$/);
 if(m&&m[1].trim().length>3){stem=m[1].trim();first=m[2].trim()}else{first=parts.shift();stem='Choose the correct answer.'}
 return {stem,opts:[first,...parts]};
}
function renderChoice(a,key,saved){
 return a.lines.map((line,i)=>{const p=parseChoice(line);return p.opts.length>1?`<div class="questionCard"><div class="questionText">${esc(p.stem)}</div><div class="choiceGrid">${p.opts.map(o=>`<button class="choice ${saved[i]===o?'selected':''}" data-choice-key="${esc(key)}" data-index="${i}" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>`:`<div class="questionCard"><div class="questionText">${esc(line)}</div><input class="answerInput answerField" data-key="${esc(key)}" data-index="${i}" value="${esc(saved[i]||'')}" placeholder="Type your answer"></div>`}).join('');
}
function countBlanks(s){return (s.match(/_{2,}|\.{4,}|…{2,}|\(\d+\)\s*_{2,}/g)||[]).length}
function textWithBlanks(text,key,saved,bank){
 let n=0,last=0,out='',re=/_{2,}|\.{4,}|…{2,}/g,m;
 while((m=re.exec(text))){out+=esc(text.slice(last,m.index));const val=saved[n]||'';out+=`<span class="inlineBlank ${val?'filled':''}" data-blank-key="${esc(key)}" data-index="${n}" data-bank="${esc(JSON.stringify(bank))}">${esc(val||'Drop or choose')}</span>`;n++;last=m.index+m[0].length}
 out+=esc(text.slice(last));return {html:out,count:n}
}
function bankHTML(bank,key){return bank.length?`<div class="wordBankPanel"><div class="wordBankTitle">🧩 Word Box — choose from these words</div><div class="wordBank">${bank.map(w=>`<button class="bankChip" draggable="true" data-token="${esc(w)}" data-token-key="${esc(key)}">${esc(w)}</button>`).join('')}</div></div>`:''}
function renderFill(a,key,saved){
 const bank=a.bank||[],long=a.lines.length===1&&countBlanks(a.lines[0])>1;
 let out=bankHTML(bank,key);
 if(long){
   const rendered=textWithBlanks(a.lines[0],key,saved,bank);
   out+=`<div class="inlineText">${rendered.html}</div>`;
   if(!bank.length)out+=`<div class="noteBox">Click each blank and type its answer.</div>`;
   return out;
 }
 out+=a.lines.map((line,i)=>{
   const blanks=countBlanks(line);
   if(blanks>1){
     const r=textWithBlanks(line,key,saved,bank);return `<div class="questionCard"><div class="inlineText">${r.html}</div></div>`;
   }
   if(blanks===1&&bank.length){
     return `<div class="questionCard"><div class="questionText">${esc(line)}</div><select class="answerSelect answerField" data-key="${esc(key)}" data-index="${i}"><option value="">Choose a word...</option>${bank.map(w=>`<option ${saved[i]===w?'selected':''}>${esc(w)}</option>`).join('')}</select></div>`;
   }
   return `<div class="questionCard"><div class="questionText">${esc(line)}</div><input class="answerInput answerField" data-key="${esc(key)}" data-index="${i}" value="${esc(saved[i]||'')}" placeholder="Type your answer"></div>`;
 }).join('');
 return out;
}
function matchData(a){
 const lines=a.lines.slice(),bank=a.bank||[];
 const categories=lines.filter(x=>/:$/.test(x));
 if(categories.length>=2)return {mode:'sort',items:bank.length?bank:lines.filter(x=>!/:$/.test(x)),categories:categories.map(x=>x.replace(/:$/,''))};
 if(/advantages and disadvantages/i.test(a.instruction))return {mode:'sort',items:lines,categories:['Advantages','Disadvantages']};
 if(/vertebrate or invertebrate/i.test(a.instruction))return {mode:'sort',items:lines,categories:['Vertebrate','Invertebrate']};
 if(/warm or cold/i.test(a.instruction))return {mode:'sort',items:lines,categories:['Warm','Cold']};
 const explicit=bank.length?bank:[];
 let prompts=lines;
 if(explicit.length)return {mode:'pair',prompts,options:explicit};
 if(lines.every(x=>/^\d+\s/.test(x)))return {mode:'pair',prompts:lines,options:lines.map((_,i)=>`Answer ${i+1}`),imageDependent:true};
 return {mode:'pair',prompts:lines,options:lines.slice()};
}
function renderMatch(a,key,saved){
 const d=matchData(a);
 if(d.mode==='sort'){
   return `<div class="noteBox">Drag each colored card into the correct category. On phones, tap a card and then tap a category.</div><div class="matchSource">${d.items.map(x=>`<button class="dragChip" draggable="true" data-token="${esc(x)}" data-token-key="${esc(key)}">${esc(x)}</button>`).join('')}</div><div class="sortBoard">${d.categories.map((c,i)=>`<div class="sortColumn"><h3>${esc(c)}</h3><div class="sortDrop" data-sort-key="${esc(key)}" data-category="${esc(c)}">${Object.entries(saved).filter(([_,v])=>v===c).map(([item])=>`<span class="dragChip">${esc(item)}</span>`).join('')}</div></div>`).join('')}</div>`;
 }
 const note=d.imageDependent?`<div class="noteBox">This activity refers to numbered pictures. Open <b>Show Original Page</b> above to view the full page, then complete the interactive matches here.</div>`:'';
 return `${note}<div class="matchBoard"><div class="matchSource">${d.options.map(o=>`<button class="dragChip" draggable="true" data-token="${esc(o)}" data-token-key="${esc(key)}">${esc(o)}</button>`).join('')}</div><div class="matchTargets">${d.prompts.map((p,i)=>`<div class="dropRow"><div class="questionText">${esc(p)}</div><div class="dropZone ${saved[i]?'filled':''}" data-drop-key="${esc(key)}" data-index="${i}">${esc(saved[i]||'Drop an answer here')}</div></div>`).join('')}</div></div>`;
}
function renderTF(a,key,saved){return a.lines.map((line,i)=>`<div class="questionCard"><div class="questionText">${esc(line)}</div><div class="choiceGrid"><button class="choice ${saved[i]==='True'?'selected':''}" data-choice-key="${esc(key)}" data-index="${i}" data-value="True">✓ True</button><button class="choice ${saved[i]==='False'?'selected':''}" data-choice-key="${esc(key)}" data-index="${i}" data-value="False">✕ False</button></div></div>`).join('')}
function renderOrder(a,key,saved){return a.lines.map((line,i)=>{const words=line.replace(/^\d+[\.\-\)]?\s*/,'').split(/\s*[–—-]\s*/).filter(Boolean);return `<div class="questionCard"><div class="questionText">Arrange the words to make a correct sentence.</div><div class="orderArea">${words.map(w=>`<span class="orderChip" draggable="true">${esc(w)}</span>`).join('')}</div><input class="answerInput answerField" data-key="${esc(key)}" data-index="${i}" value="${esc(saved[i]||'')}" placeholder="Write the complete sentence"></div>`}).join('')}
function renderReading(a,key,saved){
 const passage=a.lines.find(x=>x.length>120&&!/^\d+/.test(x))||a.lines[0]||'';
 const qs=a.lines.filter(x=>x!==passage);
 return `<div class="passage">${esc(passage)}</div>${qs.map((q,i)=>`<div class="questionCard"><div class="questionText">${esc(q)}</div><textarea class="answerArea answerField" data-key="${esc(key)}" data-index="${i}" placeholder="Write your answer">${esc(saved[i]||'')}</textarea></div>`).join('')}`;
}
function renderOpen(a,key,saved,isOptional){
 return `${isOptional?'<div class="noteBox">This activity is optional and does not block lesson completion.</div>':''}${a.lines.map((q,i)=>`<div class="questionCard"><div class="questionText">${esc(q)}</div><textarea class="answerArea answerField" data-key="${esc(key)}" data-index="${i}" placeholder="Write your response">${esc(saved[i]||'')}</textarea></div>`).join('')}`;
}
function bindControls(){
 $$('.readBtn[data-speak]').forEach(el=>el.onclick=()=>speak(decodeURIComponent(el.dataset.speak)));
 $$('.answerField').forEach(el=>{const h=()=>setAnswer(el.dataset.key,el.dataset.index,el.value);el.oninput=h;el.onchange=h});
 $$('[data-choice-key]').forEach(el=>el.onclick=()=>{setAnswer(el.dataset.choiceKey,el.dataset.index,el.dataset.value);el.parentElement.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');});
 $$('.bankChip,.dragChip').forEach(el=>{
   el.onclick=()=>selectToken(el);
   el.ondragstart=e=>{selectedToken=el.dataset.token;e.dataTransfer.setData('text/plain',selectedToken)};
 });
 $$('.inlineBlank').forEach(el=>{
   el.onclick=()=>placeInBlank(el);
   el.ondragover=e=>e.preventDefault();
   el.ondrop=e=>{e.preventDefault();selectedToken=e.dataTransfer.getData('text/plain');placeInBlank(el)};
 });
 $$('.dropZone').forEach(el=>{
   el.onclick=()=>placeInDrop(el);
   el.ondragover=e=>e.preventDefault();
   el.ondrop=e=>{e.preventDefault();selectedToken=e.dataTransfer.getData('text/plain');placeInDrop(el)};
 });
 $$('.sortDrop').forEach(el=>{
   el.onclick=()=>placeInSort(el);
   el.ondragover=e=>e.preventDefault();
   el.ondrop=e=>{e.preventDefault();selectedToken=e.dataTransfer.getData('text/plain');placeInSort(el)};
 });
}
function selectToken(el){selectedToken=el.dataset.token;$$('.bankChip,.dragChip').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');showToast('Now choose a blank or drop zone.')}
function placeInBlank(el){
 const bank=JSON.parse(el.dataset.bank||'[]');
 let value=selectedToken;
 if(!value&&bank.length)value=prompt('Choose or type a word:',state.answers[el.dataset.blankKey]?.[el.dataset.index]||'');
 if(!value&&!bank.length)value=prompt('Type the answer:',state.answers[el.dataset.blankKey]?.[el.dataset.index]||'');
 if(!value)return;setAnswer(el.dataset.blankKey,el.dataset.index,value);el.textContent=value;el.classList.add('filled');clearToken()
}
function placeInDrop(el){if(!selectedToken){showToast('Choose an answer card first.');return}setAnswer(el.dataset.dropKey,el.dataset.index,selectedToken);el.textContent=selectedToken;el.classList.add('filled');clearToken()}
function placeInSort(el){if(!selectedToken){showToast('Choose a card first.');return}const key=el.dataset.sortKey;state.answers[key]=state.answers[key]||{};state.answers[key][selectedToken]=el.dataset.category;save();renderActivities();clearToken()}
function clearToken(){selectedToken=null;$$('.bankChip,.dragChip').forEach(x=>x.classList.remove('selected'))}
function setAnswer(key,index,value){state.answers[key]=state.answers[key]||{};state.answers[key][index]=value;save()}
function saveActivity(key){save();const el=$('#saved-'+safeId(key));if(el){el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}showToast('Activity saved ✓')}
function requiredActivitiesAnswered(){
 const l=B.units[U].lessons[L];
 return l.pageData.every(page=>page.activities.filter(a=>!a.optional).every(a=>{
   const k=`${l.id}|${page.page}|${a.id}`,ans=state.answers[k]||{};
   return Object.values(ans).some(v=>String(v).trim()!=='');
 }));
}
function completeLesson(){
 const l=B.units[U].lessons[L];
 if(!requiredActivitiesAnswered()){showToast('Complete at least one answer in every required activity first.');return}
 if(!state.completed[l.id]){state.completed[l.id]=true;state.xp+=50;state.stars+=5;save()}
 renderSidebar();$('#celebration').classList.remove('hidden')
}
function closeCelebration(){$('#celebration').classList.add('hidden');nextLesson()}
function previousLesson(){const all=allLessons(),idx=all.findIndex(x=>x.ui===U&&x.li===L),t=all[Math.max(0,idx-1)];U=t.ui;L=t.li;P=0;renderSidebar();renderLesson();window.scrollTo(0,0)}
function nextLesson(){const all=allLessons(),idx=all.findIndex(x=>x.ui===U&&x.li===L),t=all[Math.min(all.length-1,idx+1)];U=t.ui;L=t.li;P=0;renderSidebar();renderLesson();window.scrollTo(0,0)}
function toggleSound(){state.sound=!state.sound;save()}
function speak(text){if(!state.sound)return;if(!('speechSynthesis'in window)){showToast('Read Aloud is not supported in this browser.');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.88;speechSynthesis.speak(u)}
function showToast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
renderHome();updateStats();
