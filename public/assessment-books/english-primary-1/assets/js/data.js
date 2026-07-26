const C=(prompt,options,answer,icon='',note='')=>({type:'choice',prompt,options,answer,icon,note});
const F=(prompt,answer,icon='',hint='')=>({type:'fill',prompt,answer,icon,hint});
const O=(words,answer,prompt='Put the words in the correct order.')=>({type:'order',prompt,words,answer});
const U=(jumble,answer,icon='')=>({type:'unscramble',prompt:'Unscramble and write.',jumble,answer,icon});
const T=(prompt,answer,icon='')=>({type:'check',prompt,answer,icon});
const N=(icon,count,options,prompt='Count and choose.')=>({type:'count',prompt,icon,count,options,answer:String(count)});
const W=(prompt,answer='',icon='')=>({type:'write',prompt,answer,icon});
const D=(prompt,guide='')=>({type:'draw',prompt,guide});
const mw=(word,options,icon)=>C(`Choose the word for the picture.`,options,word,icon);
const miss=(word,icon)=>F(`_${word.slice(1)}`,word[0],icon,`Write the first letter.`);
const spell=(word,icon)=>U(word.split('').sort(()=>0.5-Math.random()).join(''),word,icon);

const UNITS=[
  {id:'u1',number:1,title:'Welcome to My School',subtitle:'Greetings, classroom objects, phonics T and I',emoji:'🏫',theme:'violet',cover:'assets/images/unit1-cover.png',pages:[4,5,6,7,8,9,10]},
  {id:'u2',number:2,title:'The Garden of Colors and Shapes',subtitle:'Garden words, colors, shapes, phonics S and A',emoji:'🌈',theme:'green',pages:[11,12,13,14,15,16,17]},
  {id:'u3',number:3,title:'I Love My Family',subtitle:'Family members, numbers 1–5, phonics N, P, H and D',emoji:'👨‍👩‍👧‍👦',theme:'pink',pages:[18,19,20,21,22,23,24,25,26,27,28,29]},
  {id:'u4',number:4,title:'My Body and My Senses',subtitle:'Body parts, five senses, phonics E, R, C and K',emoji:'🖐️',theme:'blue',pages:[30,31,32,33,34,35,36]},
  {id:'u5',number:5,title:'On the Farm',subtitle:'Farm animals, numbers 6–10, phonics G, M, O and F',emoji:'🚜',theme:'orange',pages:[37,38,39,40,41,42,43,44,45,46]},
  {id:'u6',number:6,title:'Animals Around Me',subtitle:'Jungle animals, pets, positions, phonics B, L, U and J',emoji:'🦁',theme:'teal',pages:[47,48,49,50,51,52,53,54]},
  {id:'rev',number:7,title:'General Revision & Final Assessment',subtitle:'Complete review of the whole book',emoji:'🏆',theme:'gold',pages:[55,56,57,58,59,60,61,62,63]}
];

const PAGES={
4:{unit:'u1',title:'Lesson 1 • Greetings',badge:'Classroom Performance',questions:[
 mw('Hello',['Hello','friends'],'👋'),mw('play',['play','shake hands'],'⚽'),mw('shake hands',['play','shake hands'],'🤝'),mw('friends',['friends','Hello'],'🧒🧒'),
 O(["your","What's","name?"],"What's your name?"),O(["name","Hana.","My","is"],"My name is Hana."),W('Complete about yourself: My name is …','')
]},
5:{unit:'u1',title:'Lesson 2 • Phonics /t/',badge:'Classroom Performance',questions:[
 miss('tomato','🍅'),miss('teacher','👩‍🏫'),miss('tiger','🐯'),miss('tree','🌳'),miss('table','🪵'),
 mw('tiger',['tiger','tree','table'],'🐯'),mw('tree',['tomato','tree','teacher'],'🌳'),mw('tomato',['table','tomato','tiger'],'🍅'),mw('teacher',['teacher','table','tree'],'👩‍🏫'),mw('table',['table','tomato','tiger'],'🪵'),
 W('Look and write the word.','tiger','🐯'),W('Look and write the word.','tree','🌳'),W('Look and write the word.','table','🪵'),W('Look and write the word.','tomato','🍅'),W('Look and write the word.','teacher','👩‍🏫')
]},
6:{unit:'u1',title:'Weekly Assessment • A & B',badge:'Weekly Assessment',questions:[
 mw('tiger',['tiger','teacher'],'🐯'),mw('shake hands',['play','shake hands'],'🤝'),mw('tree',['table','tree'],'🌳'),miss('table','🪵'),miss('tomato','🍅'),
 mw('teacher',['tree','teacher'],'👩‍🏫'),mw('play',['play','hello'],'⚽'),mw('tomato',['tomato','table'],'🍅'),miss('tree','🌳'),miss('tiger','🐯')
]},
7:{unit:'u1',title:'Weekly Assessment C • Around My Classroom',badge:'Page Challenge',questions:[
 mw('friends',['friends','hello'],'🧒🧒'),mw('shake hands',['hello','shake hands'],'🤝'),mw('table',['table','tiger'],'🪵'),miss('teacher','👩‍🏫'),miss('hello','👋'),
 mw('book',['book','pencil'],'📕'),mw('bag',['chair','bag'],'🎒'),mw('pencil',['desk','pencil'],'✏️'),mw('board',['board','bag'],'🖼️')
]},
8:{unit:'u1',title:'Lesson 3 & Lesson 4 • Classroom / Phonics I',badge:'Classroom Performance',questions:[
 mw('chair',['chair','book','bag'],'🪑'),mw('desk',['desk','chair','board'],'🗄️'),mw('bag',['bag','book','pencil'],'🎒'),mw('book',['book','desk','chair'],'📕'),
 W('Look and write.','book','📕'),W('Look and write.','bag','🎒'),W('Look and write.','pencil','✏️'),W('Look and write.','board','🖼️'),W('Look and write.','chair','🪑'),W('Look and write.','desk','🗄️'),
 miss('ink','🖋️'),miss('ill','🤒'),miss('insect','🐞'),miss('in','📦')
]},
9:{unit:'u1',title:'Lesson 4 • Phonics I + Weekly Assessment A',badge:'Practice & Assessment',questions:[
 U('nki','ink','🖋️'),U('lil','ill','🤒'),U('nestic','insect','🐞'),U('ni','in','📦'),W('Look and write.','ink','🖋️'),W('Look and write.','ill','🤒'),W('Look and write.','insect','🐞'),W('Look and write.','in','📦'),
 mw('desk',['desk','chair'],'🗄️'),mw('book',['pencil','book'],'📕'),mw('bag',['book','bag'],'🎒'),C('Choose the beginning letter.',['Ii','Tt'],'Ii','🖋️'),C('Choose the beginning letter.',['Tt','Ii'],'Ii','🐞')
]},
10:{unit:'u1',title:'Weekly Assessment • B & C',badge:'Weekly Assessment',questions:[
 mw('chair',['chair','desk'],'🪑'),mw('pencil',['chair','pencil'],'✏️'),mw('sit down',['stand up','sit down'],'🧒🪑'),C('Choose the beginning letter.',['Ii','Tt'],'Ii','🤒'),C('Choose the beginning letter.',['Tt','Ii'],'Ii','📦'),
 mw('chair',['chair','board'],'🪑'),mw('stand up',['stand up','sit down'],'🧒⬆️'),mw('open your books',['open your books','play'],'📖'),C('Choose the beginning letter.',['Ii','Tt'],'Ii','🤒'),C('Choose the beginning letter.',['Tt','Ii'],'Ii','🐞')
]},
11:{unit:'u2',title:'Lesson 1 • In the Garden',badge:'Classroom Performance',questions:[
 mw('sky',['sky','tree','grass'],'☁️'),mw('bird',['bird','butterfly','flower'],'🐦'),mw('tree',['tree','sky','grass'],'🌳'),mw('grass',['grass','flower','sky'],'🌿'),
 mw('butterfly',['butterfly','tree'],'🦋'),mw('flower',['bird','flower'],'🌸'),mw('grass',['sky','grass'],'🌿'),mw('sky',['sky','flower'],'☁️'),
 O(['green','The','is','grass.'],'The grass is green.'),O(['is','a butterfly.','This'],'This is a butterfly.'),O(['can','a tree.','I','see'],'I can see a tree.')
]},
12:{unit:'u2',title:'Lesson 2 • Phonics /s/',badge:'Classroom Performance',questions:[
 mw('spider',['spider','sun'],'🕷️'),mw('snake',['star','snake'],'🐍'),mw('spoon',['spoon','spider'],'🥄'),mw('sun',['sun','star'],'☀️'),
 miss('snake','🐍'),miss('sun','☀️'),miss('spoon','🥄'),miss('star','⭐'),miss('spider','🕷️'),
 W('Look and write.','sun','☀️'),W('Look and write.','spider','🕷️'),W('Look and write.','spoon','🥄'),W('Look and write.','snake','🐍'),W('Look and write.','star','⭐')
]},
13:{unit:'u2',title:'Weekly Assessment • A & B',badge:'Weekly Assessment',questions:[
 U('usn','sun','☀️'),U('poson','spoon','🥄'),U('pdisre','spider','🕷️'),T('The grass is green.',true,'🌿'),T('This is a bird.',false,'🌸'),
 U('tsra','star','⭐'),U('nksae','snake','🐍'),U('kys','sky','☁️'),T('I can see a star.',false,'🦋'),T('This is a tree.',true,'🌳')
]},
14:{unit:'u2',title:'Weekly Assessment C • Shapes and Colors',badge:'Page Challenge',questions:[
 U('oefwlr','flower','🌼'),U('drbi','bird','🐦'),U('rete','tree','🌳'),T('This is a flower.',true,'🌸'),T('I can see the sky.',false,'🐦'),
 mw('circle',['square','circle'],'🔴'),mw('triangle',['triangle','square'],'🔺'),mw('square',['circle','square'],'🟩'),
 U('niltgrae','triangle','🔺'),U('ursaqe','square','🟩'),U('crteagnel','rectangle','▭'),U('icelcr','circle','🔴')
]},
15:{unit:'u2',title:'Lesson 3 Homework • Lesson 4 Phonics A',badge:'Classroom Performance',questions:[
 O(['blue.','The','square','is'],'The square is blue.'),O(['yellow.','sun','is','The'],'The sun is yellow.'),O(['grass','is','The','green.'],'The grass is green.'),
 mw('apple',['apple','arrow'],'🍎'),mw('axe',['ant','axe'],'🪓'),mw('ant',['arrow','ant'],'🐜'),mw('arrow',['arrow','apple'],'⬅️'),
 mw('apple',['apple','axe','ant','arrow'],'🍎'),mw('axe',['apple','axe','ant','arrow'],'🪓'),mw('ant',['apple','axe','ant','arrow'],'🐜'),mw('arrow',['apple','axe','ant','arrow'],'⬅️')
]},
16:{unit:'u2',title:'Lesson 4 Homework • Weekly Assessment A & B',badge:'Practice & Assessment',questions:[
 W('Look and write.','apple','🍎'),W('Look and write.','axe','🪓'),W('Look and write.','ant','🐜'),W('Look and write.','arrow','⬅️'),
 mw('circle',['circle','square'],'🔵'),mw('axe',['arrow','axe'],'🪓'),mw('ant',['ant','apple'],'🐜'),T('This is a triangle.',true,'🔺'),T('The square is blue.',true,'🟦'),
 mw('square',['circle','square'],'🟩'),mw('apple',['apple','axe'],'🍎'),mw('arrow',['arrow','ant'],'⬅️')
]},
17:{unit:'u2',title:'Weekly Assessment • B & C',badge:'Weekly Assessment',questions:[
 T('This is a circle.',true,'🟣'),T('The triangle is blue.',false,'🔺'),mw('axe',['axe','ant'],'🪓'),mw('apple',['arrow','apple'],'🍎'),mw('triangle',['circle','triangle'],'🔺'),T('This is a triangle.',false,'▭'),T('The circle is blue.',false,'🟣')
]},
18:{unit:'u3',title:"Lesson 1 • Who's in My Family?",badge:'Classroom Performance',questions:[
 C('Complete: This is my …',['father','sisters','brothers','grandmother'],'father','👨'),C('Complete: I have 2 …',['brothers','father','grandmother','mother'],'brothers','👦👦'),C('Complete: This is my …',['grandmother','sisters','brothers','father'],'grandmother','👵'),C('Complete: I have 2 …',['sisters','father','grandmother','brothers'],'sisters','👧👧'),
 mw('father',['father','mother','grandfather'],'👨'),mw('mother',['mother','father','grandmother'],'👩'),mw('brothers',['brothers','sisters','parents'],'👦👦'),mw('grandfather',['grandfather','father','mother'],'👴'),mw('sisters',['sisters','brothers','parents'],'👧👧')
]},
19:{unit:'u3',title:'Family Homework • Lesson 2 Phonics N/P',badge:'Classroom Performance',questions:[
 O(['my','This','father.','is'],'This is my father.'),O(['is','grandmother.','This','my'],'This is my grandmother.'),O(['have','I','sisters.','2'],'I have 2 sisters.'),
 mw('nail',['nail','pizza','nose'],'🔩'),mw('potato',['potato','pizza','nail'],'🥔'),mw('neck',['neck','nose','nail'],'🦒'),mw('pizza',['pizza','potato','pencil'],'🍕'),mw('nose',['nose','neck','nail'],'👃'),
 mw('nurse',['nurse','pencil'],'👩‍⚕️'),mw('net',['pizza','net'],'🥅'),mw('panda',['panda','nose'],'🐼'),mw('parrot',['neck','parrot'],'🦜'),mw('pencil',['pencil','nurse'],'✏️')
]},
20:{unit:'u3',title:'Phonics Homework • Weekly Assessment A & B',badge:'Practice & Assessment',questions:[
 W('Look and write.','potato','🥔'),W('Look and write.','neck','🦒'),W('Look and write.','nose','👃'),W('Look and write.','pizza','🍕'),
 mw('father',['father','mother'],'👨'),mw('pizza',['pizza','nail'],'🍕'),mw('nurse',['potato','nurse'],'👩‍⚕️'),O(['is','Who','this?'],'Who is this?'),O(['parents.','They','are'],'They are parents.'),
 mw('pencil',['pencil','parrot'],'✏️'),mw('grandmother',['grandfather','grandmother'],'👵'),mw('nose',['nose','nail'],'👃')
]},
21:{unit:'u3',title:'Weekly Assessment • B & C',badge:'Weekly Assessment',questions:[
 O(['brother.','have','I','1'],'I have 1 brother.'),O(['my','This','father.','is'],'This is my father.'),mw('sisters',['sisters','brothers'],'👧👧'),mw('parrot',['panda','parrot'],'🦜'),mw('neck',['neck','nose'],'🦒'),O(['have','I','sisters.','2'],'I have 2 sisters.'),O(['is','grandfather.','This','my'],'This is my grandfather.')
]},
22:{unit:'u3',title:'Monthly Revision • Matching',badge:'Monthly Revision',questions:[
 mw('nail',['tomato','pencil','grandmother','circle','nail'],'🔩'),mw('circle',['tomato','pencil','grandmother','circle','nail'],'🟢'),mw('tomato',['tomato','pencil','grandmother','circle','nail'],'🍅'),mw('pencil',['tomato','pencil','grandmother','circle','nail'],'✏️'),mw('grandmother',['tomato','pencil','grandmother','circle','nail'],'👵'),
 mw('sky',['sky','parrot','mother','tiger','board'],'☁️'),mw('parrot',['sky','parrot','mother','tiger','board'],'🦜'),mw('mother',['sky','parrot','mother','tiger','board'],'👩'),mw('tiger',['sky','parrot','mother','tiger','board'],'🐯'),mw('board',['sky','parrot','mother','tiger','board'],'🖼️'),
 mw('teacher',['teacher','bag','father','flower','triangle'],'👩‍🏫'),mw('bag',['teacher','bag','father','flower','triangle'],'🎒'),mw('father',['teacher','bag','father','flower','triangle'],'👨'),mw('flower',['teacher','bag','father','flower','triangle'],'🌼'),mw('triangle',['teacher','bag','father','flower','triangle'],'🔺')
]},
23:{unit:'u3',title:'Monthly Revision • Words and Sounds',badge:'Monthly Revision',questions:[
 mw('table',['table','chair'],'🪵'),mw('net',['nail','net'],'🥅'),mw('square',['triangle','square'],'🟩'),mw('book',['book','pencil'],'📕'),mw('chair',['desk','chair'],'🪑'),mw('sisters',['brothers','sisters'],'👧👧'),mw('grandfather',['grandfather','grandmother'],'👴'),mw('desk',['table','desk'],'🗄️'),mw('rectangle',['rectangle','circle'],'▭'),mw('play',['hello','play'],'⚽'),mw('grass',['bird','grass'],'🌿'),mw('butterfly',['flower','butterfly'],'🦋'),
 miss('pizza','🍕'),miss('nurse','👩‍⚕️'),miss('axe','🪓'),miss('apple','🍎'),miss('ant','🐜'),miss('arrow','⬅️'),miss('snake','🐍'),miss('spoon','🥄'),miss('tree','🌳')
]},
24:{unit:'u3',title:'Monthly Revision • Sounds, Sentences and Spelling',badge:'Monthly Revision',questions:[
 miss('panda','🐼'),miss('star','⭐'),miss('nail','🔩'),miss('sun','☀️'),miss('spider','🕷️'),miss('in','📦'),miss('ink','🖋️'),miss('ill','🤒'),miss('insect','🐞'),
 O(['your','Open','books.'],'Open your books.'),O(['flower','is','red.','The'],'The flower is red.'),O(['is','This','a bird.'],'This is a bird.'),O(['see','I','the','can','sky.'],'I can see the sky.'),O(['is','The','blue.','sky'],'The sky is blue.'),O(['sun','yellow.','The','is'],'The sun is yellow.'),O(['is','This','a square.'],'This is a square.'),O(['yellow.','is','The','triangle.'],'The triangle is yellow.'),O(['is','This','a circle.'],'This is a circle.'),O(['see','I','a tree.','can'],'I can see a tree.'),
 U('mdngtroaerh','grandmother','👵'),U('ctaehre','teacher','👩‍🏫'),U('wfelro','flower','🌼'),U('torapr','parrot','🦜'),U('emhtor','mother','👩'),U('griltean','triangle','🔺'),U('ridb','bird','🐦'),U('fburtetyl','butterfly','🦋'),U('ohlel','hello','👋')
]},
25:{unit:'u3',title:'Lesson 3 • Numbers from 1 to 5',badge:'Classroom Performance',questions:[
 N('🌸',2,[2,4,5]),N('🍎',4,[5,4,3]),N('🐝',3,[5,3,4]),
 N('🐒',1,[1,2,4]),N('🐱',4,[2,4,5]),N('🦜',5,[1,4,5]),N('🌴',2,[2,4,5]),
 F('There are … books.','4','📚'),F('There are … birds.','5','🐦🐦🐦🐦🐦'),F('There are … trees.','2','🌳🌳'),F('I have … brother.','1','👦')
]},
26:{unit:'u3',title:'Lesson 4 • Phonics H and D',badge:'Classroom Performance',questions:[
 C('Choose the beginning sound.',['Hh','Dd'],'Hh','👒'),C('Choose the beginning sound.',['Hh','Dd'],'Dd','🐶'),C('Choose the beginning sound.',['Dd','Hh'],'Hh','🐴'),C('Choose the beginning sound.',['Dd','Hh'],'Dd','🦆'),
 mw('house',['house','dog'],'🏠'),mw('door',['door','horse'],'🚪'),mw('hair',['duck','hair'],'💇'),mw('drum',['drum','hat'],'🥁'),mw('hands',['hands','doll'],'👐'),
 W('Look and write.','doll','🪆'),W('Look and write.','horse','🐴'),W('Look and write.','hat','👒'),W('Look and write.','door','🚪'),W('Look and write.','hands','👐')
]},
27:{unit:'u3',title:'Weekly Assessment • A & B',badge:'Weekly Assessment',questions:[
 N('🍎',1,[3,1,5]),N('🐠',3,[4,3,2]),mw('hat',['hat','hands'],'👒'),mw('door',['house','door'],'🚪'),mw('hands',['hands','drum'],'👐'),
 N('🐦',2,[4,5,2]),N('🌼',4,[4,1,3]),mw('duck',['duck','door'],'🦆'),mw('house',['hair','house'],'🏠'),mw('dog',['dog','doll'],'🐶')
]},
28:{unit:'u3',title:'Weekly Assessment C • Review 1',badge:'Review Challenge',questions:[
 N('🦋',5,[3,5,2]),N('🦆',1,[4,1,3]),mw('hair',['hair','hand'],'💇'),mw('doll',['door','doll'],'🪆'),mw('drum',['drum','duck'],'🥁'),
 mw('tiger',['tiger','pizza','desk','ink'],'🐯'),mw('pizza',['tiger','pizza','desk','ink'],'🍕'),mw('desk',['tiger','pizza','desk','ink'],'🗄️'),mw('ink',['tiger','pizza','desk','ink'],'🖋️')
]},
29:{unit:'u3',title:'Review 1 • Sentences and Words',badge:'Review Challenge',questions:[
 O(['is','yellow.','The','sun'],'The sun is yellow.'),O(['1','have','I','brother.'],'I have 1 brother.'),O(['grass','is','The','green.'],'The grass is green.'),W('Look and write.','green','🟢'),W('Look and write.','hair','💇'),W('Look and write.','ink','🖋️'),W('Look and write.','dog','🐶'),W('Look and write.','panda','🐼')
]},
30:{unit:'u4',title:'Lesson 1 • Head to Toe',badge:'Classroom Performance',questions:[
 mw('eye',['eye','nose'],'👁️'),mw('ear',['head','ear'],'👂'),mw('mouth',['nose','mouth'],'👄'),mw('hand',['tongue','hand'],'🖐️'),mw('legs',['legs','arms'],'🦵'),
 F('I have … eyes.','2','👀'),F('I have … mouth.','1','👄'),F('I have … nose.','1','👃'),F('I have … arms.','2','💪💪')
]},
31:{unit:'u4',title:'Body Homework • Lesson 2 Phonics E/R',badge:'Classroom Performance',questions:[
 W('Look and write.','eye','👁️'),W('Look and write.','nose','👃'),W('Look and write.','mouth','👄'),W('Look and write.','ear','👂'),W('Look and write.','arms','💪'),
 C('Choose the beginning letter.',['Ee','Rr'],'Rr','🐇'),C('Choose the beginning letter.',['Rr','Ee'],'Ee','🐘'),C('Choose the beginning letter.',['Rr','Ee'],'Ee','🍆'),C('Choose the beginning letter.',['Ee','Rr'],'Rr','💍'),
 mw('egg',['egg','robot'],'🥚'),mw('rocket',['elephant','rocket'],'🚀'),mw('red',['elbow','red'],'🔴'),mw('enter',['enter','rabbit'],'🚪➡️')
]},
32:{unit:'u4',title:'Phonics Homework • Weekly Assessment A & B',badge:'Practice & Assessment',questions:[
 W('Look and write.','elephant','🐘'),W('Look and write.','robot','🤖'),W('Look and write.','elbow','💪'),W('Look and write.','ring','💍'),
 U('umtoh','mouth','👄'),U('geg','egg','🥚'),U('kcrtoe','rocket','🚀'),O(['feet.','2','I','have'],'I have 2 feet.'),O(['have','I','nose.','1'],'I have 1 nose.'),
 U('ignr','ring','💍'),U('are','ear','👂'),U('pgtgenal','eggplant','🍆')
]},
33:{unit:'u4',title:'Weekly Assessment C • Lesson 3 My 5 Senses',badge:'Page Challenge',questions:[
 O(['mouth.','I','have','1'],'I have 1 mouth.'),O(['arms.','2','have','I'],'I have 2 arms.'),U('sleg','legs','🦵'),U('obrto','robot','🤖'),U('petehalnt','elephant','🐘'),O(['have','I','2','eyes.'],'I have 2 eyes.'),O(['head.','1','have','I'],'I have 1 head.'),
 T('I can hear with my ears.',true,'👂'),T('I can see with my eyes.',true,'👀'),T('I can touch with my hands.',true,'👐'),T('I can smell with my nose.',true,'👃')
]},
34:{unit:'u4',title:'Lesson 3 Homework • Lesson 4 Phonics C/K',badge:'Classroom Performance',questions:[
 C('I can … with my eyes.',['hear','smell','see','touch'],'see','👀'),C('I can … with my ears.',['hear','smell','see','touch'],'hear','👂'),C('I can … with my hands.',['hear','smell','see','touch'],'touch','👐'),C('I can … with my tongue.',['hear','smell','taste','touch'],'taste','👅'),
 O(['smell','nose.','I','with','can','my'],'I can smell with my nose.'),O(['eyes.','my','see','I','can','with'],'I can see with my eyes.'),O(['tongue.','I','with','can','taste','my'],'I can taste with my tongue.'),
 C('Choose the beginning letter.',['Cc','Kk'],'Cc','🎂'),C('Choose the beginning letter.',['Cc','Kk'],'Kk','👑'),C('Choose the beginning letter.',['Kk','Cc'],'Cc','🥕'),C('Choose the beginning letter.',['Kk','Cc'],'Kk','🍳')
]},
35:{unit:'u4',title:'Lesson 4 Homework • Weekly Assessment A & B',badge:'Practice & Assessment',questions:[
 W('Look and write.','cup','☕'),W('Look and write.','kite','🪁'),W('Look and write.','key','🔑'),W('Look and write.','cat','🐱'),
 U('rca','car','🚗'),U('ehra','hear','👂'),U('ikgn','king','👑'),O(['hands.','touch','can','I','my','with'],'I can touch with my hands.'),O(['my','nose.','can','with','I','smell'],'I can smell with my nose.'),
 U('ocrart','carrot','🥕'),U('mlsle','smell','👃'),U('kace','cake','🎂')
]},
36:{unit:'u4',title:'Weekly Assessment • B & C',badge:'Weekly Assessment',questions:[
 O(['see','my','can','eyes.','I','with'],'I can see with my eyes.'),O(['tongue.','I','with','can','taste','my'],'I can taste with my tongue.'),U('eyk','key','🔑'),U('tac','cat','🐱'),U('atset','taste','👅'),O(['can','ears.','with','hear','I','my'],'I can hear with my ears.'),O(['my','nose.','can','with','I','smell'],'I can smell with my nose.')
]},
37:{unit:'u5',title:'Lesson 1 • Welcome to the Farm',badge:'Classroom Performance',questions:[
 U('ickhnec','chicken','🐔'),U('osreh','horse','🐴'),U('ucdk','duck','🦆'),U('ocw','cow','🐄'),
 O(['duck','small.','The','is'],'The duck is small.'),O(['is','big.','cow','The'],'The cow is big.'),O(['I','animals.','love','farm'],'I love farm animals.'),O(['you','Do','a horse?','see'],'Do you see a horse?'),
 W('Look and write.','cow','🐄'),W('Look and write.','duck','🦆'),W('Look and write.','horse','🐴'),W('Look and write.','chicken','🐔')
]},
38:{unit:'u5',title:'Lesson 2 • Phonics G and M',badge:'Classroom Performance',questions:[
 U('iklm','milk','🥛'),U('uagirt','guitar','🎸'),U('sgaper','grapes','🍇'),U('usmoe','mouse','🐭'),
 C('Circle the odd sound word.',['moon','monkey','grapes','milk'],'grapes',''),C('Circle the odd sound word.',['goat','mouse','girl','guitar'],'mouse',''),C('Circle the odd sound word.',['gloves','grapes','girl','mango'],'mango',''),
 W('Look and write.','goat','🐐'),W('Look and write.','monkey','🐒'),W('Look and write.','gloves','🧤'),W('Look and write.','mango','🥭'),
 miss('goat','🐐'),miss('mouse','🐭'),miss('moon','🌙')
]},
39:{unit:'u5',title:'Weekly Assessment • A, B and C',badge:'Weekly Assessment',questions:[
 C('The duck is …',['big','small'],'small','🦆'),C('The horse is …',['big','small'],'big','🐴'),miss('guitar','🎸'),miss('mango','🥭'),miss('girl','👧'),C('The chicken is …',['big','small'],'small','🐔'),C('The cow is …',['big','small'],'big','🐄'),miss('monkey','🐒'),miss('gloves','🧤'),miss('grapes','🍇'),C('The horse is …',['big','small'],'big','🐴'),C('The bird is …',['big','small'],'small','🐦')
]},
40:{unit:'u5',title:'Lesson 3 • Numbers from 6 to 10',badge:'Classroom Performance',questions:[
 N('✏️',8,[6,8,10]),N('🍎',6,[10,6,9]),N('🚙',7,[7,9,10]),N('🐝',10,[9,10,8]),
 F('I can see … pencils.','6','✏️✏️✏️✏️✏️✏️'),F('I can see … flowers.','9','🌸🌼🌺🌸🌼🌺🌸🌼🌺'),F('I can see … cats.','10','🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱'),F('I can see … stars.','7','⭐⭐⭐⭐⭐⭐⭐'),
 N('✏️',6,[6,7,8]),N('🥭',9,[8,9,10]),N('⭐',8,[7,8,9]),N('🥭',10,[8,9,10])
]},
41:{unit:'u5',title:'Lesson 4 • Phonics O and F',badge:'Classroom Performance',questions:[
 U('elvio','olive','🫒'),U('hifs','fish','🐟'),U('ctrshio','ostrich','🦤'),U('ofgr','frog','🐸'),
 C('Circle the odd sound word.',['octopus','on','fork','olive'],'fork',''),C('Circle the odd sound word.',['ostrich','fish','frog','fan'],'ostrich',''),C('Circle the odd sound word.',['fox','on','fan','fork'],'on',''),
 W('Look and write.','fan','🪭'),W('Look and write.','octopus','🐙'),W('Look and write.','fox','🦊'),W('Look and write.','on','🐱🪑'),
 mw('frog',['frog','fish'],'🐸'),mw('olive',['on','olive'],'🫒'),mw('fox',['fork','fox'],'🦊')
]},
42:{unit:'u5',title:'Weekly Assessment • A, B and C',badge:'Weekly Assessment',questions:[
 F('I can see a …','fan','🪭'),F('This is an …','ostrich','🦤'),mw('on',['ostrich','on'],'🐱🪑'),mw('fish',['fish','fork'],'🐟'),mw('octopus',['octopus','olive'],'🐙'),F('I can see a …','fox','🦊'),F('This is a …','fork','🍴'),mw('ostrich',['ostrich','octopus'],'🦤'),mw('fork',['fork','fox'],'🍴'),mw('fan',['frog','fan'],'🪭'),F('I can see an …','octopus','🐙'),F('This is a …','fish','🐟')
]},
43:{unit:'u5',title:'Monthly Revision • Matching',badge:'Monthly Revision',questions:[
 mw('door',['door','elephant','toes','eggplant','horse'],'🚪'),mw('elephant',['door','elephant','toes','eggplant','horse'],'🐘'),mw('toes',['door','elephant','toes','eggplant','horse'],'🦶'),mw('eggplant',['door','elephant','toes','eggplant','horse'],'🍆'),mw('horse',['door','elephant','toes','eggplant','horse'],'🐴'),
 mw('ostrich',['ostrich','chicken','gloves','king','arms'],'🦤'),mw('chicken',['ostrich','chicken','gloves','king','arms'],'🐔'),mw('gloves',['ostrich','chicken','gloves','king','arms'],'🧤'),mw('king',['ostrich','chicken','gloves','king','arms'],'👑'),mw('arms',['ostrich','chicken','gloves','king','arms'],'💪'),
 mw('octopus',['octopus','doll','head','drum','rocket'],'🐙'),mw('doll',['octopus','doll','head','drum','rocket'],'🪆'),mw('head',['octopus','doll','head','drum','rocket'],'🙂'),mw('drum',['octopus','doll','head','drum','rocket'],'🥁'),mw('rocket',['octopus','doll','head','drum','rocket'],'🚀')
]},
44:{unit:'u5',title:'Monthly Revision • Complete and Reorder',badge:'Monthly Revision',questions:[
 F('There are … books.','4','📚'),F('I have 2 …','arms','💪💪'),F('I have 2 …','eyes','👀'),F('I can … with my nose.','smell','👃'),F('The … is big.','cow','🐄'),F('The … is small.','duck','🦆'),F('There are … apples.','6','🍎🍎🍎🍎🍎🍎'),F('I can see a …','horse','🐴'),F('This is a …','chicken','🐔'),F('This is a …','fox','🦊'),
 O(['see','I','stars.','can','10'],'I can see 10 stars.'),O(['small.','is','The','chicken'],'The chicken is small.'),O(['an','have','apple.','I'],'I have an apple.'),O(['tongue.','I','with','can','taste','my'],'I can taste with my tongue.'),O(['the','see','horse?','Do','you'],'Do you see the horse?')
]},
45:{unit:'u5',title:'Monthly Revision • Sentences and Sounds',badge:'Monthly Revision',questions:[
 O(['is','This','car.','a'],'This is a car.'),O(['animals.','love','farm','I'],'I love farm animals.'),O(['toes.','have','I','5'],'I have 5 toes.'),O(['is','horse','big.','The'],'The horse is big.'),O(['the','hands.','touch','I','can','with','desk','my'],'I can touch the desk with my hands.'),
 miss('cat','🐱'),miss('dog','🐶'),miss('hair','💇'),miss('octopus','🐙'),miss('king','👑'),miss('egg','🥚'),miss('fan','🪭'),miss('fork','🍴'),miss('hands','👐'),miss('ostrich','🦤'),miss('fish','🐟'),miss('olive','🫒'),miss('frog','🐸'),miss('grapes','🍇'),miss('chicken','🐔')
]},
46:{unit:'u5',title:'Monthly Revision • Odd Sounds and Spelling',badge:'Monthly Revision',questions:[
 C('Circle the odd sound word.',['hat','hair','doll','horse'],'doll',''),C('Circle the odd sound word.',['drum','house','hands','hat'],'drum',''),C('Circle the odd sound word.',['duck','horse','dog','door'],'horse',''),C('Circle the odd sound word.',['red','rabbit','ring','egg'],'egg',''),C('Circle the odd sound word.',['eggplant','rocket','elbow','enter'],'rocket',''),C('Circle the odd sound word.',['carrot','car','cup','robot'],'robot',''),C('Circle the odd sound word.',['milk','kite','king','key'],'milk',''),C('Circle the odd sound word.',['mouse','goat','monkey','mango'],'goat',''),C('Circle the odd sound word.',['girl','moon','gloves','grapes'],'moon',''),C('Circle the odd sound word.',['olives','on','fish','octopus'],'fish',''),C('Circle the odd sound word.',['ostrich','frog','fox','fan'],'ostrich',''),
 U('tac','cat','🐱'),U('elsg','legs','🦵'),U('ofx','fox','🦊'),U('tkie','kite','🪁'),U('kcihnec','chicken','🐔'),U('kace','cake','🎂'),U('utigra','guitar','🎸'),U('blewo','elbow','💪'),U('efet','feet','🦶'),U('etos','toes','🦶'),U('gtoune','tongue','👅'),U('neret','enter','🚪➡️')
]},
47:{unit:'u6',title:'Lesson 1 • Welcome to the Jungle',badge:'Classroom Performance',questions:[
 U('igtre','tiger','🐯'),U('oiln','lion','🦁'),U('fgraife','giraffe','🦒'),U('nskae','snake','🐍'),
 O(['lions','How','you','see?','many','can'],'How many lions can you see?'),O(['is','the','tree.','monkey','in','The'],'The monkey is in the tree.'),O(['is','Where','monkey?','the'],'Where is the monkey?'),O(['a snake','There','on','the','is','ground!'],'There is a snake on the ground!'),
 F('There is a … on the ground!','snake','🐍'),F('I can see an …','elephant','🐘'),F('The … is in the tree.','monkey','🐒'),F('I can see a …','giraffe','🦒')
]},
48:{unit:'u6',title:'Lesson 2 • Phonics B and L',badge:'Classroom Performance',questions:[
 miss('bike','🚲'),miss('leaf','🍃'),miss('ball','⚽'),miss('lamp','💡'),C('Circle the odd sound word.',['leaf','lion','boy','lunch'],'boy',''),C('Circle the odd sound word.',['bike','bird','banana','lemon'],'lemon',''),C('Circle the odd sound word.',['lamp','ball','lion','leaf'],'ball',''),
 W('Look and write.','bike','🚲'),W('Look and write.','leaf','🍃'),W('Look and write.','ball','⚽'),W('Look and write.','lamp','💡'),
 mw('snake',['snake','tiger'],'🐍'),mw('bike',['bird','bike'],'🚲'),mw('lamp',['lamp','lion'],'💡')
]},
49:{unit:'u6',title:'Weekly Assessment • A, B and C',badge:'Weekly Assessment',questions:[
 O(['can','a','I','lion.','see'],'I can see a lion.'),O(['love','We','jungle!','the'],'We love the jungle!'),mw('monkey',['monkey','lion'],'🐒'),mw('lemon',['lemon','bike'],'🍋'),mw('bird',['lunch','bird'],'🐦'),O(['elephant.','see','I','an'],'I see an elephant.'),O(['tiger','legs.','has','A','4'],'A tiger has 4 legs.'),mw('leaf',['leaf','lemon'],'🍃'),mw('tiger',['monkey','tiger'],'🐯'),mw('ball',['lamp','ball'],'⚽'),O(['see','2','I','lions!','can'],'I can see 2 lions!'),O(['is','There','tiger.','a'],'There is a tiger.')
]},
50:{unit:'u6',title:'Lesson 3 • My Pets',badge:'Classroom Performance',questions:[
 C('Where is the cat?',['on','under','in'],'on','🐱🛋️'),C('Where is the dog?',['on','under','in'],'under','🐶🪑'),C('Where is the bird?',['on','under','in'],'in','🐦🪹'),
 O(['The','leg!','cat','my','is','on'],'The cat is on my leg!'),O(['dog?','is','Where','the'],'Where is the dog?'),O(['dog','the','is','couch.','The','on'],'The dog is on the couch.'),
 W('Look and write.','cat','🐱'),W('Look and write.','dog','🐶'),W('Look and write.','bird','🐦'),W('Look and write.','turtle','🐢')
]},
51:{unit:'u6',title:'Lesson 4 • Phonics U and J',badge:'Classroom Performance',questions:[
 mw('up',['up','under'],'⬆️'),mw('jam',['jar','jam'],'🍓'),mw('jeans',['jacket','jeans'],'👖'),mw('umbrella',['umbrella','up'],'☂️'),
 U('rja','jar','🫙'),U('duenr','under','⬇️'),U('luonkc','unlock','🔓'),U('ejkcat','jacket','🧥'),
 W('Look and write.','jar','🫙'),W('Look and write.','under','⬇️'),W('Look and write.','unlock','🔓'),W('Look and write.','jacket','🧥')
]},
52:{unit:'u6',title:'Weekly Assessment • A & B',badge:'Weekly Assessment',questions:[
 miss('jeans','👖'),miss('unlock','🔓'),miss('jar','🫙'),O(['is','Where','bird?','the'],'Where is the bird?'),O(['under','the','is','table.','The','turtle'],'The turtle is under the table.'),
 miss('umbrella','☂️'),miss('jellyfish','🪼'),miss('jam','🍓'),O(['love','pets!','I'],'I love pets!'),O(['The','under','cat','chair.','the','is'],'The cat is under the chair.')
]},
53:{unit:'u6',title:'Weekly Assessment C • Review 2',badge:'Review Challenge',questions:[
 miss('under','⬇️'),miss('jacket','🧥'),miss('jam','🍓'),O(['is','Where','cat?','the'],'Where is the cat?'),O(['The','in','bird','cage.','the','is'],'The bird is in the cage.'),
 mw('chicken',['chicken','gloves','lunch','tongue','tiger'],'🐔'),mw('gloves',['chicken','gloves','lunch','tongue','tiger'],'🧤'),mw('lunch',['chicken','gloves','lunch','tongue','tiger'],'🍱'),mw('tongue',['chicken','gloves','lunch','tongue','tiger'],'👅'),mw('tiger',['chicken','gloves','lunch','tongue','tiger'],'🐯')
]},
54:{unit:'u6',title:'Review 2 • Spelling',badge:'Review Challenge',questions:[
 U('kibe','bike','🚲'),U('anf','fan','🪭'),U('udmr','drum','🥁'),U('urltet','turtle','🐢'),W('Look and write.','bike','🚲'),W('Look and write.','fan','🪭'),W('Look and write.','drum','🥁'),W('Look and write.','turtle','🐢')
]},
55:{unit:'rev',title:'General Revision • Look and Write',badge:'General Revision',questions:[
 W('Look and write.','hello','👋'),W('Look and write.','teacher','👩‍🏫'),W('Look and write.','tiger','🐯'),W('Look and write.','tree','🌳'),W('Look and write.','book','📕'),W('Look and write.','bag','🎒'),W('Look and write.','pencil','✏️'),W('Look and write.','chair','🪑'),W('Look and write.','flower','🌼'),W('Look and write.','butterfly','🦋'),W('Look and write.','circle','🔴'),W('Look and write.','triangle','🔺'),W('Look and write.','father','👨'),W('Look and write.','mother','👩'),W('Look and write.','brother','👦'),W('Look and write.','sister','👧'),W('Look and write.','eye','👁️'),W('Look and write.','ear','👂'),W('Look and write.','nose','👃'),W('Look and write.','mouth','👄'),W('Look and write.','cow','🐄'),W('Look and write.','horse','🐴'),W('Look and write.','lion','🦁'),W('Look and write.','monkey','🐒')
]},
56:{unit:'rev',title:'General Revision • Complete 1',badge:'General Revision',questions:[
 F('We are …','friends','🧒🧒'),F('I can see a …','flower','🌼'),F('I see a little … in the tree!','bird','🐦🌳'),F('The … is green.','grass','🌿'),F('The … is blue.','sky','☁️'),F('The … is yellow.','sun','☀️'),F('This is a …','triangle','🔺'),F('I can see a …','butterfly','🦋'),F('This is a …','circle','🔴'),F('This is a …','square','🟩'),F('The … is yellow.','triangle','🔺'),F('I have … brothers.','2','👦👦'),F('This is my …','mother','👩'),F('I have 1 …','brother','👦'),F('There are 2 …','books','📚'),F('There are … stars.','8','⭐⭐⭐⭐⭐⭐⭐⭐'),F('I have 1 …','nose','👃'),F('I have 2 …','ears','👂👂')
]},
57:{unit:'rev',title:'General Revision • Complete 2 and Reorder 1',badge:'General Revision',questions:[
 F('I can see it with my …','eyes','👀'),F('I can … the desk with my hands.','touch','👐'),F('The … is big.','cow','🐄'),F('The … is small.','duck','🦆'),F('The … is in the tree!','monkey','🐒🌳'),F('The cat is … the chair.','under','🐱🪑'),
 O(['your',"What's",'name?'],"What's your name?"),O(['name','My','is','Maya.'],'My name is Maya.'),O(['friends','are','We','now!'],'We are friends now!'),O(['can','I','flower.','see','a'],'I can see a flower.'),O(['sun','yellow.','is','The'],'The sun is yellow.'),O(['The','is','red.','flower'],'The flower is red.'),O(['I','a','see','bird.','can'],'I can see a bird.'),O(['can','the','sky.','see','I'],'I can see the sky.'),O(['you','brothers?','have','Do','any'],'Do you have any brothers?'),O(['are','books.','There','3'],'There are 3 books.'),O(['books','there?','many','How','are'],'How many books are there?')
]},
58:{unit:'rev',title:'General Revision • Reorder 2, Shapes and Counting',badge:'General Revision',questions:[
 O(['desk.','see','can','I','the'],'I can see the desk.'),O(['you','horse?','see','Do','the'],'Do you see the horse?'),O(['farm','I','animals!','love'],'I love farm animals!'),O(['How','see?','many','can','horses','you'],'How many horses can you see?'),O(['are','ducks!','There','9'],'There are 9 ducks!'),O(['many','see?','lions','you','How','can'],'How many lions can you see?'),O(['love','jungle!','We','the'],'We love the jungle!'),O(['the','couch.','dog','on','The','is'],'The dog is on the couch.'),O(['The','is','table!','turtle','under','the'],'The turtle is under the table!'),
 F('What shape is this?','circle','🔴'),F('What color is the square?','blue','🟦'),F('What shape is this?','triangle','🔺'),F('What color is the triangle?','yellow','🔺'),F('I have … sisters.','2','👧👧'),F('There are … birds.','5','🐦🐦🐦🐦🐦'),F('I have … brother.','1','👦'),F('There is … butterfly.','1','🦋'),F('There are … apples.','6','🍎🍎🍎🍎🍎🍎')
]},
59:{unit:'rev',title:'General Revision • Garden and Family Art',badge:'General Revision',questions:[
 F('The tree is …','green','🌳'),F('The sun is …','yellow','☀️'),F('The sky is …','blue','☁️'),F('I see a little … in the tree!','bird','🐦'),F('The … is flying near the tree!','butterfly','🦋'),F('The grass is …','green','🌿'),D('Draw and color a picture of your family.','Use the drawing tools to create your family picture.')
]},
60:{unit:'rev',title:'General Revision • My Body and Shapes',badge:'General Revision',questions:[
 F('I can see with my …','eyes','👀'),F('I can … with my ears.','hear','👂'),F('I have … hands.','2','👐'),F('I have 1 …','nose','👃'),F('I can … with my nose.','smell','👃'),F('I have … eyes.','2','👀'),F('I can taste with my …','tongue','👅'),F('I can … with my hands.','touch','👐'),F('I have … mouth.','1','👄'),F('I have … ears.','2','👂👂'),D('Draw a yellow triangle.','triangle-yellow'),D('Draw a blue square.','square-blue'),D('Draw a red circle.','circle-red'),D('Draw a green rectangle.','rectangle-green')
]},
61:{unit:'rev',title:'General Revision • Jungle Dialogue',badge:'General Revision',questions:[
 F('I can see … lion.','1','🦁'),F('A lion has … legs.','4','🦁'),F('The monkey is in the …','tree','🐒🌳'),F('I see an … too!','elephant','🐘'),F('There is a … on the ground!','snake','🐍'),C('The cat is … the table.',['on','in'],'on','🐱🪵'),C('The dog is … the box.',['under','in'],'in','🐶📦')
]},
62:{unit:'rev',title:'Final Assessment • Matching and Sentences',badge:'Final Assessment',questions:[
 mw('bike',['bike','tomato','ill','leaf','square'],'🚲'),mw('tomato',['bike','tomato','ill','leaf','square'],'🍅'),mw('ill',['bike','tomato','ill','leaf','square'],'🤒'),mw('leaf',['bike','tomato','ill','leaf','square'],'🍃'),mw('square',['bike','tomato','ill','leaf','square'],'🟩'),
 O(['can','I','butterfly.','see','a'],'I can see a butterfly.'),O(['are','horses.','There','6'],'There are 6 horses.'),O(['is','Where','dog?','the'],'Where is the dog?'),O(['love','pets!','I'],'I love pets!'),O(['is','There','a monkey.'],'There is a monkey.')
]},
63:{unit:'rev',title:'Final Assessment • Spelling and Complete',badge:'Final Assessment',questions:[
 U('pdisre','spider','🕷️'),U('fgraife','giraffe','🦒'),U('urltet','turtle','🐢'),U('luonkc','unlock','🔓'),U('tumoh','mouth','👄'),F('The … is big!','lion','🦁'),F('The bird is … the cage.','in','🐦🪹'),F('I have 2 …','hands','👐'),F('The … is red.','flower','🌹'),F('This is my …','mother','👩')
]}
};

window.PRIMARY1_DATA={UNITS,PAGES};
