(() => {
  let id = 0;
  const make = (data) => ({ id: `q${++id}`, points: 100, ...data });
  const mcq = (tense, difficulty, stem, options, answer, explanation, instruction = "Choose the correct answer.") => make({ type: "mcq", tense, difficulty, stem, options, answer, explanation, instruction });
  const fill = (tense, difficulty, stem, accepted, explanation, instruction = "Complete the sentence.") => make({ type: "fill", tense, difficulty, stem, accepted: Array.isArray(accepted) ? accepted : [accepted], answer: Array.isArray(accepted) ? accepted[0] : accepted, explanation, instruction });
  const order = (tense, difficulty, words, answer, explanation, instruction = "Put the words in the correct order.") => make({ type: "order", tense, difficulty, stem: "Build the correct sentence.", words, answer, explanation, instruction });
  const drag = (tense, difficulty, before, after, options, answer, explanation, instruction = "Drag the correct word into the blank.") => make({ type: "drag", tense, difficulty, stem: "Complete the sentence.", before, after, options, answer, explanation, instruction });
  const correction = (tense, difficulty, before, wrongWord, after, answer, explanation, instruction = "Correct the red word. Type the correct word only.") => make({ type: "correction", tense, difficulty, stem: "Correct the sentence.", before, wrongWord, after, answer, accepted: [answer], explanation, instruction });

  const Q = [
    // PRESENT SIMPLE — affirmative and forms
    mcq("Present Simple",1,"Mona ____ her room every Friday.",["clean","cleans","cleaned","cleaning"],"cleans","Mona is he/she, so the verb takes -s in the present simple."),
    mcq("Present Simple",1,"I ____ breakfast at seven every day.",["have","has","had","having"],"have","Use the base verb with I, you, we, and they."),
    mcq("Present Simple",1,"My father ____ to work by car.",["go","goes","went","going"],"goes","With he, she, or it, go changes to goes."),
    mcq("Present Simple",1,"The children ____ football after school.",["plays","play","played","playing"],"play","Children is plural, so use the base verb play."),
    mcq("Present Simple",1,"Sara ____ English very well.",["speak","speaks","spoke","speaking"],"speaks","Sara is singular, so speak takes -s."),
    mcq("Present Simple",1,"We ____ our grandparents every weekend.",["visit","visits","visited","visiting"],"visit","Use the base verb with we."),
    mcq("Present Simple",1,"The sun ____ in the east.",["rise","rises","rose","rising"],"rises","This is a fact, and the singular subject takes rises."),
    mcq("Present Simple",1,"Ali ____ his teeth twice a day.",["brush","brushes","brushed","brushing"],"brushes","Verbs ending in -sh take -es with he, she, or it."),
    mcq("Present Simple",1,"My sister ____ TV in the evening.",["watch","watches","watched","watching"],"watches","Watch ends in -ch, so add -es."),
    mcq("Present Simple",1,"Omar ____ his homework after lunch.",["do","does","did","doing"],"does","Do changes to does with he, she, or it."),
    mcq("Present Simple",1,"The baby ____ when it is hungry.",["cry","cries","cried","crying"],"cries","Consonant + y changes to -ies with a singular subject."),
    mcq("Present Simple",1,"They ____ in Jeddah.",["lives","live","lived","living"],"live","Use the base verb with they."),
    mcq("Present Simple",1,"Rania ____ a blue school bag.",["have","has","had","having"],"has","Have changes to has with he, she, or it."),
    mcq("Present Simple",1,"Our lesson ____ at nine o’clock.",["start","starts","started","starting"],"starts","A timetable uses present simple; lesson is singular."),
    mcq("Present Simple",1,"Cats ____ milk.",["likes","like","liked","liking"],"like","Cats is plural, so use like."),
    mcq("Present Simple",1,"He usually ____ early.",["wake up","wakes up","woke up","waking up"],"wakes up","Usually shows a habit; he takes wakes."),
    mcq("Present Simple",1,"I always ____ my hands before meals.",["wash","washes","washed","washing"],"wash","Always shows a repeated habit; use wash with I."),
    mcq("Present Simple",1,"The bus ____ at 6:30 every morning.",["leave","leaves","left","leaving"],"leaves","Schedules use present simple, and bus is singular."),

    // PRESENT SIMPLE — negative
    mcq("Present Simple",1,"I ____ like spicy food.",["don’t","doesn’t","didn’t","isn’t"],"don’t","Use don’t with I, you, we, and they in the present simple."),
    mcq("Present Simple",1,"Huda ____ play tennis on Mondays.",["don’t","doesn’t","didn’t","aren’t"],"doesn’t","Use doesn’t with he, she, or it."),
    mcq("Present Simple",1,"The boys ____ walk to school.",["doesn’t","don’t","didn’t","isn’t"],"don’t","Boys is plural, so use don’t."),
    mcq("Present Simple",2,"My brother doesn’t ____ coffee.",["drinks","drink","drank","drinking"],"drink","After doesn’t, use the base verb."),
    mcq("Present Simple",2,"We don’t ____ late on school days.",["sleeps","sleep","slept","sleeping"],"sleep","After don’t, use the base verb."),
    mcq("Present Simple",2,"Mariam ____ watch cartoons before homework.",["don’t","doesn’t","didn’t","not"],"doesn’t","Mariam is singular, so use doesn’t."),
    mcq("Present Simple",2,"He doesn’t ____ his phone in class.",["uses","use","used","using"],"use","Doesn’t is followed by the base form use."),
    mcq("Present Simple",2,"Our teacher ____ arrive late.",["don’t","doesn’t","didn’t","aren’t"],"doesn’t","Teacher is singular; use doesn’t."),
    mcq("Present Simple",2,"They ____ eat lunch at home.",["doesn’t","don’t","didn’t","isn’t"],"don’t","Use don’t with they."),
    mcq("Present Simple",2,"The shop ____ open on Fridays.",["don’t","doesn’t","didn’t","aren’t"],"doesn’t","Shop is singular, so use doesn’t."),

    // PRESENT SIMPLE — questions
    mcq("Present Simple",1,"____ you play basketball after school?",["Do","Does","Did","Are"],"Do","Use Do with you in a present simple question."),
    mcq("Present Simple",1,"____ Salma help her mother every day?",["Do","Does","Did","Is"],"Does","Use Does with a singular subject."),
    mcq("Present Simple",1,"____ they live near the school?",["Do","Does","Did","Are"],"Do","Use Do with they."),
    mcq("Present Simple",2,"Does Ahmed ____ the piano?",["plays","play","played","playing"],"play","After Does, use the base verb."),
    mcq("Present Simple",2,"Do the students ____ uniforms?",["wears","wear","wore","wearing"],"wear","After Do, use the base verb."),
    mcq("Present Simple",2,"____ your father work in a hospital?",["Do","Does","Did","Is"],"Does","Father is singular, so use Does."),
    mcq("Present Simple",2,"What time ____ the lesson start?",["do","does","did","is"],"does","The lesson is singular, so use does."),
    mcq("Present Simple",2,"Where ____ your cousins live?",["do","does","did","are"],"do","Cousins is plural, so use do."),
    mcq("Present Simple",2,"How often ____ she read stories?",["do","does","did","is"],"does","Use does with she, then the base verb read."),
    mcq("Present Simple",2,"Which question is correct?",["Does he likes football?","Does he like football?","Do he like football?","Did he likes football?"],"Does he like football?","Use Does + subject + base verb."),
    mcq("Present Simple",2,"Which sentence is negative?",["Nour reads every night.","Does Nour read every night?","Nour doesn’t read every night.","Nour read last night."],"Nour doesn’t read every night.","A present simple negative uses doesn’t + base verb."),
    mcq("Present Simple",2,"Which sentence describes a habit?",["I visited Cairo yesterday.","I drink milk every morning.","I am drinking milk now.","I will drink milk tomorrow."],"I drink milk every morning.","Every morning signals a repeated habit."),

    // PAST SIMPLE — affirmative
    mcq("Past Simple",1,"We ____ our aunt yesterday.",["visit","visits","visited","visiting"],"visited","Yesterday shows a finished past action; use visited."),
    mcq("Past Simple",1,"Ali ____ football last Friday.",["play","plays","played","playing"],"played","Last Friday signals the past simple."),
    mcq("Past Simple",1,"My family ____ to the beach last weekend.",["go","goes","went","going"],"went","The past form of go is went."),
    mcq("Past Simple",1,"Sara ____ a new book two days ago.",["buy","buys","bought","buying"],"bought","The past form of buy is bought."),
    mcq("Past Simple",1,"I ____ breakfast at 7:00 yesterday.",["have","has","had","having"],"had","The past form of have is had."),
    mcq("Past Simple",1,"They ____ the match last night.",["watch","watches","watched","watching"],"watched","Last night shows a finished past action."),
    mcq("Past Simple",1,"Mona ____ her homework after dinner.",["finish","finishes","finished","finishing"],"finished","Use the regular past form finished."),
    mcq("Past Simple",1,"The baby ____ for ten minutes.",["cry","cries","cried","crying"],"cried","The past of cry is cried."),
    mcq("Past Simple",1,"Omar ____ a letter to his friend.",["write","writes","wrote","writing"],"wrote","The past form of write is wrote."),
    mcq("Past Simple",1,"We ____ a great film yesterday.",["see","sees","saw","seeing"],"saw","The past form of see is saw."),
    mcq("Past Simple",1,"She ____ up late last Saturday.",["wake","wakes","woke","waking"],"woke","The past form of wake is woke."),
    mcq("Past Simple",1,"The students ____ quietly during the test.",["sit","sits","sat","sitting"],"sat","The past form of sit is sat."),
    mcq("Past Simple",1,"My uncle ____ us a funny story.",["tell","tells","told","telling"],"told","The past form of tell is told."),
    mcq("Past Simple",1,"I ____ my keys on the table.",["leave","leaves","left","leaving"],"left","The past form of leave is left."),
    mcq("Past Simple",2,"The class ____ at ten yesterday.",["begin","begins","began","beginning"],"began","The past form of begin is began."),
    mcq("Past Simple",2,"Nadia ____ a beautiful picture last week.",["draw","draws","drew","drawing"],"drew","The past form of draw is drew."),
    mcq("Past Simple",2,"We ____ lunch at a restaurant yesterday.",["eat","eats","ate","eating"],"ate","The past form of eat is ate."),
    mcq("Past Simple",2,"He ____ the answer quickly.",["know","knows","knew","knowing"],"knew","The past form of know is knew."),

    // PAST SIMPLE — negative
    mcq("Past Simple",1,"I ____ go to the club yesterday.",["don’t","doesn’t","didn’t","wasn’t"],"didn’t","Use didn’t for a past simple negative."),
    mcq("Past Simple",1,"She ____ watch TV last night.",["don’t","doesn’t","didn’t","isn’t"],"didn’t","All subjects use didn’t in the past simple."),
    mcq("Past Simple",2,"They didn’t ____ the bus.",["missed","miss","misses","missing"],"miss","After didn’t, use the base verb."),
    mcq("Past Simple",2,"Ahmed didn’t ____ his phone.",["found","find","finds","finding"],"find","After didn’t, use the base form find."),
    mcq("Past Simple",2,"We ____ visit the museum last week.",["don’t","doesn’t","didn’t","aren’t"],"didn’t","Last week signals past simple, so use didn’t."),
    mcq("Past Simple",2,"Mona didn’t ____ breakfast yesterday.",["ate","eats","eat","eating"],"eat","After didn’t, use the base verb eat."),
    mcq("Past Simple",2,"The boys ____ play well in the first half.",["don’t","doesn’t","didn’t","weren’t"],"didn’t","Use didn’t + base verb for a past action."),
    mcq("Past Simple",2,"Which sentence is correct?",["He didn’t went home.","He didn’t go home.","He doesn’t went home.","He not go home."],"He didn’t go home.","Didn’t must be followed by the base verb go."),

    // PAST SIMPLE — questions
    mcq("Past Simple",1,"____ you visit your cousin yesterday?",["Do","Does","Did","Are"],"Did","Use Did for a past simple question."),
    mcq("Past Simple",1,"____ Salma finish her project last night?",["Do","Does","Did","Is"],"Did","Last night signals the past, so use Did."),
    mcq("Past Simple",2,"Did Omar ____ the goal?",["scored","scores","score","scoring"],"score","After Did, use the base verb score."),
    mcq("Past Simple",2,"Where ____ they go last weekend?",["do","does","did","were"],"did","Use did in a past simple information question."),
    mcq("Past Simple",2,"What time ____ the train arrive yesterday?",["do","does","did","was"],"did","Use did + base verb arrive."),
    mcq("Past Simple",2,"Did she ____ a sandwich?",["made","make","makes","making"],"make","After Did, use the base verb make."),
    mcq("Past Simple",2,"Which question is correct?",["Did they played football?","Did they play football?","Do they played football?","Were they play football?"],"Did they play football?","The correct pattern is Did + subject + base verb."),
    mcq("Past Simple",2,"Which sentence asks about a finished past action?",["Do you read every day?","Did you read yesterday?","Are you reading now?","Will you read tomorrow?"],"Did you read yesterday?","Did and yesterday clearly mark a finished past action."),

    // MIXED TENSE UNDERSTANDING
    mcq("Mixed",2,"Every morning, Youssef ____ to school, but yesterday he ____ at home.",["walks / stayed","walked / stays","walks / stays","walked / stayed"],"walks / stayed","Every morning needs present simple; yesterday needs past simple."),
    mcq("Mixed",2,"My mother usually ____ dinner, but Dad ____ it yesterday.",["cooks / cooked","cooked / cooks","cook / cooked","cooks / cooks"],"cooks / cooked","Usually shows a habit; yesterday shows a past event."),
    mcq("Mixed",2,"We ____ football on Fridays. Last Friday, we ____ basketball.",["play / played","played / play","plays / played","play / play"],"play / played","On Fridays is habitual; last Friday is finished past."),
    mcq("Mixed",2,"Nour ____ milk every day, but she ____ juice yesterday.",["drinks / drank","drank / drinks","drink / drank","drinks / drinks"],"drinks / drank","Every day uses drinks; yesterday uses drank."),
    mcq("Mixed",2,"Which sentence uses the present simple correctly?",["He went to school every day.","He goes to school every day.","He going to school every day.","He does goes to school every day."],"He goes to school every day.","A repeated routine uses goes with he."),
    mcq("Mixed",2,"Which sentence uses the past simple correctly?",["They visit us yesterday.","They visited us yesterday.","They visits us yesterday.","They did visited us yesterday."],"They visited us yesterday.","Yesterday requires the past form visited."),
    mcq("Mixed",3,"Choose the best pair: She ____ tennis every week, but she ____ last week because she was ill.",["plays / didn’t play","played / doesn’t play","plays / doesn’t played","play / didn’t played"],"plays / didn’t play","A habit uses plays; a past negative uses didn’t play."),
    mcq("Mixed",3,"Choose the correct sentence.",["Does he went yesterday?","Did he go yesterday?","Did he goes yesterday?","Does he go yesterday?"],"Did he go yesterday?","A past question uses Did + base verb."),
    mcq("Mixed",3,"Choose the correct sentence.",["She doesn’t eats meat.","She don’t eat meat.","She doesn’t eat meat.","She didn’t eats meat every day."],"She doesn’t eat meat.","Present negative with she is doesn’t + base verb."),
    mcq("Mixed",3,"Last year, my uncle ____ in Riyadh. Now he ____ in Jeddah.",["lived / lives","lives / lived","lived / lived","live / lives"],"lived / lives","Last year is past; now describes his current situation."),
    mcq("Mixed",3,"I usually ____ at six, but yesterday I ____ at eight.",["wake up / woke up","woke up / wake up","wakes up / woke up","wake up / wake up"],"wake up / woke up","Usually needs present simple; yesterday needs past simple."),
    mcq("Mixed",3,"Which word best completes the sentence? ‘Did Mona ____ her homework?’",["finished","finish","finishes","finishing"],"finish","After Did, use the base form."),
    mcq("Mixed",3,"Which word best completes the sentence? ‘Mona ____ her homework every day.’",["finish","finishes","finished","finishing"],"finishes","Mona is singular and every day shows present simple."),
    mcq("Mixed",3,"The museum ____ at nine every day, but it ____ late yesterday.",["opens / opened","opened / opens","open / opened","opens / open"],"opens / opened","A daily schedule uses opens; yesterday uses opened."),
    mcq("Mixed",3,"They ____ not tired after school every day, but they ____ very tired yesterday.",["are / were","were / are","is / was","are / was"],"are / were","Use are for a present state and were for a past plural state."),

    // FILL IN THE BLANK
    fill("Present Simple",1,"Maha ____ (study) English every evening.",["studies"],"Study changes to studies with a singular subject."),
    fill("Present Simple",1,"We ____ (play) in the park on Saturdays.",["play"],"Use the base verb with we."),
    fill("Present Simple",2,"He doesn’t ____ (watch) TV before homework.",["watch"],"After doesn’t, use the base verb."),
    fill("Present Simple",2,"____ your sister help you at home?",["does"],"Use Does with your sister."),
    fill("Present Simple",2,"My friends ____ (not / live) near my house.",["don't live","do not live"],"Use don’t live with a plural subject."),
    fill("Past Simple",1,"We ____ (visit) the zoo last Thursday.",["visited"],"Last Thursday requires the past simple."),
    fill("Past Simple",1,"Sara ____ (go) to the library yesterday.",["went"],"The past form of go is went."),
    fill("Past Simple",2,"They didn’t ____ (see) the match.",["see"],"After didn’t, use the base verb."),
    fill("Past Simple",2,"____ Ahmed call you last night?",["did"],"Use Did to ask about a finished past action."),
    fill("Past Simple",2,"My father ____ (buy) a new phone last month.",["bought"],"The past form of buy is bought."),
    fill("Mixed",3,"Hana usually ____ (walk) to school, but yesterday she ____ (take) the bus.",["walks, took","walks took"],"Usually needs walks; yesterday needs took."),
    fill("Mixed",3,"We ____ (not / play) yesterday, but we ____ (play) every Friday.",["didn't play, play","did not play, play","didn't play play"],"Past negative: didn’t play. Habit: play."),

    // WORD ORDER — click words into place
    order("Present Simple",1,["every","Ali","football","plays","Friday"],"Ali plays football every Friday.","Present simple order: subject + verb + object + time."),
    order("Present Simple",2,["doesn’t","coffee","drink","Mona"],"Mona doesn’t drink coffee.","Negative order: subject + doesn’t + base verb + object."),
    order("Present Simple",2,["school","Does","walk","to","he"],"Does he walk to school?","Question order: Does + subject + base verb."),
    order("Present Simple",2,["do","Where","live","they"],"Where do they live?","Information question: question word + do + subject + base verb."),
    order("Past Simple",1,["yesterday","visited","We","museum","the"],"We visited the museum yesterday.","Use the past verb before the object, then the time phrase."),
    order("Past Simple",2,["didn’t","game","win","They","the"],"They didn’t win the game.","Past negative: subject + didn’t + base verb."),
    order("Past Simple",2,["you","Did","homework","finish","your"],"Did you finish your homework?","Past question: Did + subject + base verb + object."),
    order("Past Simple",2,["go","Where","last","she","did","night"],"Where did she go last night?","Use Where + did + subject + base verb."),
    order("Mixed",3,["usually","early","He","wakes","up"],"He usually wakes up early.","Frequency adverbs usually come before the main verb."),
    order("Mixed",3,["last","went","We","weekend","camping"],"We went camping last weekend.","Went is the past form of go."),
    order("Mixed",3,["doesn’t","on","She","Fridays","work"],"She doesn’t work on Fridays.","Doesn’t must be followed by the base verb work."),
    order("Mixed",3,["Did","the","score","goal","he"],"Did he score the goal?","Did is followed by the subject and base verb."),

    // DRAG AND DROP
    drag("Present Simple",1,"Omar","to school every day.",["walk","walks","walked"],"walks","Omar is singular, so use walks."),
    drag("Present Simple",2,"They","like cold weather.",["doesn’t","don’t","didn’t"],"don’t","Use don’t with they."),
    drag("Present Simple",2,"Does Sara","her room every week?",["cleans","clean","cleaned"],"clean","After Does, use the base verb clean."),
    drag("Present Simple",2,"My father","the newspaper every morning.",["read","reads","readed"],"reads","A singular subject takes reads in the present simple."),
    drag("Past Simple",1,"We","the match yesterday.",["watch","watched","watches"],"watched","Yesterday requires the past form watched."),
    drag("Past Simple",2,"Ahmed didn’t","the door.",["opened","open","opens"],"open","After didn’t, use the base verb open."),
    drag("Past Simple",2,"Did they","the answer?",["knew","know","knows"],"know","After Did, use the base verb know."),
    drag("Past Simple",2,"Mona","a cake last Friday.",["make","made","makes"],"made","Made is the past form of make."),
    drag("Mixed",3,"My brother usually","early.",["gets up","got up","get up"],"gets up","Usually shows a habit; brother takes gets up."),
    drag("Mixed",3,"Yesterday, my brother","late.",["gets up","got up","get up"],"got up","Yesterday requires the past form got up."),

    // CORRECTION
    correction("Present Simple",2,"He ","go"," to the club every Thursday.","goes","With he, go changes to goes."),
    correction("Present Simple",2,"Mariam doesn’t ","likes"," fish.","like","After doesn’t, use the base verb like."),
    correction("Present Simple",2,"","Do"," your father work here?","Does","The auxiliary must agree with the singular subject father. Type Does."),
    correction("Present Simple",3,"Does she ","writes"," stories?","write","After Does, use the base verb write."),
    correction("Past Simple",2,"We ","visit"," the museum yesterday.","visited","Yesterday requires the past form visited."),
    correction("Past Simple",2,"Ali didn’t ","played"," football.","play","After didn’t, use the base verb play."),
    correction("Past Simple",2,"Did she ","went"," home early?","go","After Did, use the base verb go."),
    correction("Past Simple",3,"They ","buyed"," new shoes last week.","bought","The irregular past of buy is bought."),
    correction("Mixed",3,"My sister ","walk"," to school every day.","walks","A singular subject takes walks in the present simple."),
    correction("Mixed",3,"Yesterday, we ","eat"," lunch at a restaurant.","ate","The past form of eat is ate."),

    // ADVANCED / LEGEND
    mcq("Present Simple",4,"Choose the sentence with correct adverb position.",["Mona goes always to school early.","Mona always goes to school early.","Always Mona go to school early.","Mona goes to school always early."],"Mona always goes to school early.","A frequency adverb usually comes before the main verb."),
    mcq("Present Simple",4,"Choose the best question for the answer: ‘Twice a week.’",["Where do you swim?","How often do you swim?","When did you swim?","Does you swim?"],"How often do you swim?","How often asks about frequency."),
    mcq("Present Simple",4,"The school library ____ at 8:00 and ____ at 2:00 every day.",["open / close","opens / closes","opened / closed","does open / does close"],"opens / closes","A regular schedule uses present simple with singular library."),
    mcq("Present Simple",4,"Which sentence is NOT correct?",["She doesn’t work here.","Does she work here?","She works here.","She doesn’t works here."],"She doesn’t works here.","After doesn’t, the verb must be in the base form."),
    mcq("Past Simple",4,"Choose the correct pair: ‘The bell ____ and the students ____ the room.’",["rang / left","ringed / leaved","rings / leave","rang / leave"],"rang / left","The irregular past forms are rang and left."),
    mcq("Past Simple",4,"Choose the best question for the answer: ‘At the sports club.’",["When did they train?","Where did they train?","How often do they train?","Did they trained?"],"Where did they train?","Where asks about place; a past question uses did + base verb."),
    mcq("Past Simple",4,"Which sentence is NOT correct?",["Did you see the film?","I didn’t see the film.","I saw the film.","Did you saw the film?"],"Did you saw the film?","After Did, use see, not saw."),
    mcq("Mixed",4,"Choose the correct completion: ‘She usually ____ lunch at home, but last Tuesday she ____ at school.’",["has / ate","had / eats","has / eats","have / ate"],"has / ate","Usually requires present simple has; last Tuesday requires past ate."),
    mcq("Mixed",4,"Choose the sentence that correctly contrasts a habit and one past event.",["I visited my uncle every Friday, but I visit him yesterday.","I visit my uncle every Friday, but I visited him yesterday.","I visits my uncle every Friday, but I did visited him yesterday.","I visit my uncle every Friday, but I visit him yesterday."],"I visit my uncle every Friday, but I visited him yesterday.","Use present simple for the habit and past simple for yesterday."),
    mcq("Mixed",4,"Complete correctly: ‘Why ____ he usually walk, and why ____ he take a taxi yesterday?’",["does / did","did / does","do / did","does / does"],"does / did","Usually needs does; yesterday needs did."),
    fill("Present Simple",4,"How often ____ your brother ____ (practise) football?",["does practise","does practice"],"Use does + subject + base verb."),
    fill("Past Simple",4,"Why ____ they ____ (leave) early yesterday?",["did leave"],"A past information question uses did + subject + base verb."),
    order("Present Simple",4,["often","How","does","train","team","the"],"How often does the team train?","Use How often + does + subject + base verb."),
    order("Past Simple",4,["didn’t","because","come","ill","was","he","He"],"He didn’t come because he was ill.","Use didn’t come for the past negative and was for the past state."),
    drag("Mixed",4,"How often does your sister","the guitar?",["practises","practise","practised"],"practise","After does, use the base verb."),
    correction("Mixed",4,"Why did Ahmed ","left"," early?","leave","After did, use the base verb leave.")
  ];

  window.QUESTION_BANK = Object.freeze(Q);
})();
