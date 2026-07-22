(() => {
  'use strict';
  const hash = (text) => { let h=2166136261; for (let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);} return h>>>0; };
  const rng = (seedText) => { let s=hash(seedText)||1; return ()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};};
  const shuffle = (arr, seed='seed') => { const r=rng(seed), c=[...arr]; for(let i=c.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]];} return c; };
  const unique = (arr)=>[...new Set(arr.filter(Boolean))];
  const options = (correct,pool,seed,count=3)=>shuffle([correct,...shuffle(unique(pool).filter(x=>x!==correct),seed).slice(0,count-1)],seed+':o');
  const blank = (sentence,word)=>{const i=sentence.toLowerCase().indexOf(word.toLowerCase());return i<0?`${sentence} ____`:sentence.slice(0,i)+'____'+sentence.slice(i+word.length);};
  const wordsOf=(s)=>s.replace(/[“”"'?!.,:;()]/g,'').split(/\s+/).filter(Boolean);
  const qid=(id,t,i)=>`${id}:${t}:${i+1}`;

  function buildPhonics(lesson){
    const letters=lesson.phonics.letters;
    const allWords=letters.flatMap(l=>l.words.map(w=>({...w,letter:l})));
    const letterNames=letters.map(l=>l.upper+l.lower);
    const distractorLetters=['Tt','Ii','Ss','Aa','Nn','Pp','Hh','Dd','Rr','Ee','Cc','Kk','Mm','Gg','Oo','Ff','Bb','Ll','Uu','Jj'];
    const qs=[];
    for(let i=0;i<5;i++){
      const item=allWords[i%allWords.length]; const correct=item.letter.upper+item.letter.lower;
      qs.push({id:qid(lesson.id,'start-letter',i),type:'mcq',category:'Beginning Sound',prompt:`Choose the beginning letter for [[word:${item.word}]] ${item.word}.`,options:options(correct,distractorLetters,lesson.id+':sl:'+i),answer:correct,explanation:`${item.word} starts with ${correct}.`});
    }
    for(let i=0;i<5;i++){
      const letter=letters[i%letters.length]; const correct=letter.words[i%letter.words.length].word;
      qs.push({id:qid(lesson.id,'choose-word',i),type:'mcq',category:'Phonics',prompt:`Which word starts with ${letter.upper}${letter.lower} ${letter.sound}?`,options:options(correct,allWords.map(w=>w.word),lesson.id+':cw:'+i),answer:correct,explanation:`${correct} starts with ${letter.upper}${letter.lower}.`});
    }
    for(let i=0;i<5;i++){
      const item=allWords[(i+2)%allWords.length];
      qs.push({id:qid(lesson.id,'listen',i),type:'mcq',category:'Listen and Choose',prompt:'Listen, then choose the word you hear.',audioText:item.word,audioPath:item.audio,options:options(item.word,allWords.map(w=>w.word),lesson.id+':ls:'+i),answer:item.word,explanation:`You heard “${item.word}”.`});
    }
    for(let i=0;i<5;i++){
      const item=allWords[(i+4)%allWords.length]; const first=item.word[0].toLowerCase();
      qs.push({id:qid(lesson.id,'missing-letter',i),type:'fill',category:'Missing Letter',prompt:`Write the first letter: _${item.word.slice(1)} [[word:${item.word}]]`,answer:first,accepted:[first,item.letter.upper,item.letter.lower],explanation:`${item.word} starts with ${item.letter.upper}${item.letter.lower}.`});
    }
    for(let i=0;i<5;i++){
      const item=allWords[(i+1)%allWords.length]; const trueValue=i%2===0; const shown=trueValue?item.letter:letters[(letters.indexOf(item.letter)+1)%letters.length] || {upper:'Z',lower:'z'};
      qs.push({id:qid(lesson.id,'sound-check',i),type:'trueFalse',category:'Sound Check',prompt:`[[word:${item.word}]] ${item.word} starts with ${shown.upper}${shown.lower}.`,answer:trueValue,explanation:`${item.word} starts with ${item.letter.upper}${item.letter.lower}.`});
    }
    return qs.slice(0,25);
  }

  function buildContent(lesson){
    const vocab=lesson.vocab||[], words=vocab.map(v=>v.word), qs=[];
    for(let i=0;i<5;i++){
      const item=vocab[i%vocab.length];
      qs.push({id:qid(lesson.id,'picture-word',i),type:'mcq',category:'Look and Choose',prompt:`Choose the word for [[word:${item.word}]].`,options:options(item.word,words,lesson.id+':pw:'+i),answer:item.word,explanation:item.example});
    }
    for(let i=0;i<5;i++){
      const item=vocab[(i+2)%vocab.length];
      qs.push({id:qid(lesson.id,'context',i),type:'mcq',category:'Complete the Sentence',prompt:blank(item.example,item.word),options:options(item.word,words,lesson.id+':ct:'+i),answer:item.word,explanation:item.example});
    }
    for(let i=0;i<4;i++){
      const item=vocab[(i+1)%vocab.length], trueValue=i%2===0, shown=trueValue?item.word:vocab[(i+3)%vocab.length].word;
      qs.push({id:qid(lesson.id,'true-false',i),type:'trueFalse',category:'Picture Check',prompt:`[[word:${item.word}]] is “${shown}”.`,answer:trueValue,explanation:`${item.word} is “${item.word}”.`});
    }
    for(let i=0;i<4;i++){
      const item=vocab[(i+3)%vocab.length], answer=item.example.trim(), toks=wordsOf(answer);
      qs.push({id:qid(lesson.id,'reorder',i),type:'reorder',category:'Build the Sentence',prompt:'Put the words in the correct order.',words:shuffle(toks,lesson.id+':ro:'+i),answer,comparison:toks.map(x=>x.toLowerCase()).join(' '),explanation:answer});
    }
    const checks=lesson.grammar?.checks||[];
    for(let i=0;i<4;i++){
      const c=checks[i%checks.length];
      qs.push({id:qid(lesson.id,'grammar',i),type:'mcq',category:'Language in Use',prompt:c.prompt,options:shuffle(c.options,lesson.id+':gr:'+i),answer:c.answer,explanation:lesson.grammar?.explanation||'Use the lesson sentence pattern.'});
    }
    const rqs=lesson.reading?.questions||[];
    for(let i=0;i<3;i++){
      const r=rqs[i%rqs.length];
      qs.push({id:qid(lesson.id,'reading',i),type:'mcq',category:'Dialogue / Reading',prompt:r.prompt,options:shuffle(r.options,lesson.id+':rd:'+i),answer:r.answer,explanation:lesson.reading?.summary||''});
    }
    return qs.slice(0,25);
  }
  function buildLessonQuestions(lesson){ return lesson.phonics?buildPhonics(lesson):buildContent(lesson); }
  function matchQuestion(unit,index){
    const items=shuffle(unit.lessons.flatMap(l=>l.vocab),`u${unit.id}:m:${index}`).slice(0,4);
    return {id:`unit-${unit.id}:match:${index}`,type:'matching',category:'Match',prompt:'Match each word with its picture clue.',pairs:items.map(v=>({word:v.word,meaning:`${v.icon} ${v.example}`})),answer:Object.fromEntries(items.map(v=>[v.word,`${v.icon} ${v.example}`])),explanation:'Use the lesson flashcards for help.'};
  }
  function buildUnitQuestions(unit){
    const pool=unit.lessons.flatMap(buildLessonQuestions), chosen=shuffle(pool,`u${unit.id}:bank`).slice(0,26).map((q,i)=>({...q,id:`unit-${unit.id}:${i+1}:${q.id}`}));
    for(let i=0;i<4;i++) chosen.push(matchQuestion(unit,i));
    return chosen.slice(0,30);
  }
  function buildReviewQuestions(review,curriculum){
    const pool=curriculum.units.filter(u=>review.unitIds.includes(u.id)).flatMap(buildUnitQuestions);
    return shuffle(pool,review.id).slice(0,40).map((q,i)=>({...q,id:`${review.id}:${i+1}:${q.id}`}));
  }
  window.QuestionEngine={shuffle,buildLessonQuestions,buildUnitQuestions,buildReviewQuestions};
})();
