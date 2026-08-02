"use strict";

const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];
const canvas = $("#gameCanvas");
const ctx = canvas.getContext("2d");

const AVATARS = {
  "astro-boy": "🧑‍🚀",
  "astro-girl": "👩‍🚀",
  robot: "🤖"
};

const LEVELS = [
  { id: 0, name: "Subject Launch Pad", icon: "🌈", color: "#45c8ff", description: "Meet I, you, he, she, it, we and they in short sentences.", type: "subjectStarter", difficulty: "Starter", questionCount: 8, time: 22 },
  { id: 1, name: "Subject Hero Planet", icon: "🌍", color: "#6c8cff", description: "Choose who does the action in longer sentences.", type: "subjectAction", difficulty: "Easy", questionCount: 12, time: 20 },
  { id: 2, name: "Object Moon Base", icon: "🌙", color: "#a77bff", description: "Meet me, him, her, it, us and them.", type: "objectStarter", difficulty: "Easy", questionCount: 8, time: 22 },
  { id: 3, name: "Object Rescue Mission", icon: "🚀", color: "#ff8fbd", description: "Find who or what receives the action.", type: "objectAction", difficulty: "Growing", questionCount: 12, time: 20 },
  { id: 4, name: "He–Him & She–Her Arena", icon: "🦸", color: "#ffac62", description: "Choose the correct subject or object form for one person.", type: "singlePairs", difficulty: "Medium", questionCount: 12, time: 18 },
  { id: 5, name: "We–Us & They–Them Zone", icon: "👨‍👩‍👧‍👦", color: "#42d7ae", description: "Master plural pronouns and groups of people.", type: "pluralPairs", difficulty: "Medium", questionCount: 12, time: 18 },
  { id: 6, name: "Pronoun Mix Galaxy", icon: "🪐", color: "#48bfe3", description: "Use sentence position and meaning to choose correctly.", type: "mixedAdvanced", difficulty: "Challenging", questionCount: 14, time: 17 },
  { id: 7, name: "Preposition Spaceport", icon: "🛸", color: "#9f86ff", description: "Choose object pronouns after to, for, with, from and about.", type: "prepositions", difficulty: "Hard", questionCount: 14, time: 16 },
  { id: 8, name: "Correction Laboratory", icon: "🛰️", color: "#ffbf47", description: "Repair incorrect pronouns inside complete sentences.", type: "correctionAdvanced", difficulty: "Expert", questionCount: 15, time: 16 },
  { id: 9, name: "Final Grammar Battle", icon: "🏆", color: "#37d5a5", description: "A complete battle using every subject and object pronoun skill.", type: "final", difficulty: "Champion", questionCount: 20, time: 15 }
];

const QUESTIONS = {
  subject: [
    q("Mona is my sister. ___ is ten years old.", "She", ["She", "Her", "He", "They"], "Mona is one girl and she does the action, so we use She.", "She is ten years old."),
    q("Omar plays football. ___ is very fast.", "He", ["He", "Him", "She", "It"], "Omar is one boy and the pronoun is the subject, so we use He.", "He is very fast."),
    q("The cat is under the chair. ___ is sleeping.", "It", ["It", "They", "Him", "Her"], "We normally use It for one animal or thing when it is the subject.", "It is sleeping."),
    q("My friends are at school. ___ are in class now.", "They", ["They", "Them", "We", "It"], "My friends means more than one person, so the subject pronoun is They.", "They are in class now."),
    q("Ali and I are classmates. ___ sit together.", "We", ["We", "Us", "They", "You"], "Ali and I includes the speaker, so we use We.", "We sit together."),
    q("___ am ready for the test.", "I", ["I", "Me", "He", "We"], "The speaker is the subject, so we use I.", "I am ready for the test."),
    q("Mr. Samy is our teacher. ___ teaches English.", "He", ["He", "Him", "They", "She"], "Mr. Samy is one man and he is doing the action.", "He teaches English."),
    q("Sara and Laila are cousins. ___ live in Jeddah.", "They", ["They", "Them", "She", "We"], "Two girls take the plural subject pronoun They.", "They live in Jeddah."),
    q("The books are new. ___ are on the desk.", "They", ["They", "It", "Them", "We"], "Books is plural, so we use They as the subject.", "They are on the desk."),
    q("My mother is a doctor. ___ works in a hospital.", "She", ["She", "Her", "He", "They"], "My mother is one woman and the pronoun does the action.", "She works in a hospital."),
    q("The car is blue. ___ is very clean.", "It", ["It", "They", "Him", "Us"], "A car is one thing, so the subject pronoun is It.", "It is very clean."),
    q("Ahmed and you are on the same team. ___ can play now.", "You", ["You", "We", "They", "Us"], "We use You for the person or people we are speaking to.", "You can play now."),
    q("My brother and I like science. ___ do experiments together.", "We", ["We", "Us", "They", "I"], "My brother and I includes the speaker, so we use We.", "We do experiments together."),
    q("The baby is hungry. ___ wants some milk.", "It", ["It", "He", "They", "Them"], "In this sentence, the baby is treated as one subject, so It fits.", "It wants some milk."),
    q("You and I are good friends. ___ help each other.", "We", ["We", "Us", "You", "They"], "You and I together means We.", "We help each other.")
  ],
  object: [
    q("I can see Ahmed. I can see ___.", "him", ["him", "he", "her", "them"], "Ahmed receives the action, so we use the object pronoun him.", "I can see him."),
    q("Mona is calling Sara. Mona is calling ___.", "her", ["her", "she", "him", "us"], "Sara receives the action, so the object pronoun is her.", "Mona is calling her."),
    q("The teacher helps my friends and me. She helps ___.", "us", ["us", "we", "them", "me"], "My friends and me includes the speaker and receives the action, so we use us.", "She helps us."),
    q("I like these books. I read ___ every night.", "them", ["them", "they", "it", "us"], "Books is plural and receives the action, so we use them.", "I read them every night."),
    q("This is my new phone. I use ___ every day.", "it", ["it", "they", "him", "her"], "One thing receiving the action takes the object pronoun it.", "I use it every day."),
    q("My mother loves ___. I am her son.", "me", ["me", "I", "him", "us"], "The speaker receives the action, so we use me.", "My mother loves me."),
    q("We know Mr. Ali. We know ___.", "him", ["him", "he", "her", "them"], "Mr. Ali is one man receiving the action, so we use him.", "We know him."),
    q("Can you help Sara and Laila? Can you help ___?", "them", ["them", "they", "her", "us"], "Sara and Laila are plural and receive the action, so we use them.", "Can you help them?"),
    q("Dad bought a cake. We ate ___ after dinner.", "it", ["it", "they", "him", "them"], "A cake is one thing receiving the action, so we use it.", "We ate it after dinner."),
    q("The coach is talking to Ali and me. He is talking to ___.", "us", ["us", "we", "them", "me"], "Ali and me includes the speaker and follows a preposition, so us is correct.", "He is talking to us."),
    q("I have a little sister. I play with ___.", "her", ["her", "she", "him", "them"], "My sister receives the action after with, so we use her.", "I play with her."),
    q("Your friends are outside. Please call ___.", "them", ["them", "they", "us", "it"], "Friends is plural and receives the action, so them is correct.", "Please call them."),
    q("This present is for ___. Thank you!", "me", ["me", "I", "us", "him"], "After the preposition for, the speaker uses the object pronoun me.", "This present is for me."),
    q("I am listening to my teacher. I am listening to ___.", "him", ["him", "he", "them", "it"], "Teacher is one man after a preposition, so him is correct.", "I am listening to him."),
    q("The dog is friendly. The children like ___.", "it", ["it", "they", "him", "them"], "One animal receiving the action can take it.", "The children like it.")
  ],
  mixed: [
    q("Nora is clever. ___ always answers correctly.", "She", ["She", "Her", "They", "Him"], "The pronoun comes before the verb and does the action, so it must be a subject pronoun: She.", "She always answers correctly."),
    q("I know Nora. I sit next to ___.", "her", ["her", "she", "him", "they"], "The pronoun comes after the preposition to, so it must be the object pronoun her.", "I sit next to her."),
    q("My cousins are here. ___ want to play.", "They", ["They", "Them", "We", "It"], "The pronoun does the action want, so use the subject pronoun They.", "They want to play."),
    q("My cousins are here. Please welcome ___.", "them", ["them", "they", "us", "it"], "The pronoun receives the action welcome, so use the object pronoun them.", "Please welcome them."),
    q("My father drives to work. ___ leaves at seven.", "He", ["He", "Him", "She", "They"], "The pronoun does the action leaves, so use He.", "He leaves at seven."),
    q("I call my father every day. I call ___.", "him", ["him", "he", "her", "them"], "The pronoun receives the action call, so use him.", "I call him."),
    q("The rabbit is small. ___ has long ears.", "It", ["It", "They", "Him", "Them"], "One animal doing the action takes the subject pronoun It.", "It has long ears."),
    q("The rabbit is small. I feed ___ carrots.", "it", ["it", "they", "him", "them"], "The rabbit receives the action feed, so the object pronoun is it.", "I feed it carrots."),
    q("Mariam and I are ready. ___ can begin.", "We", ["We", "Us", "They", "I"], "Mariam and I are doing the action, so use We.", "We can begin."),
    q("The teacher asked Mariam and me. She asked ___.", "us", ["us", "we", "them", "me"], "Mariam and me receive the action, so use us.", "She asked us."),
    q("Sam has a new bike. ___ rides it every morning.", "He", ["He", "Him", "It", "They"], "Sam is one boy doing the action, so use He.", "He rides it every morning."),
    q("Sam has a new bike. His father bought it for ___.", "him", ["him", "he", "her", "them"], "After for, Sam becomes the object, so use him.", "His father bought it for him."),
    q("The girls sing well. ___ are in the school band.", "They", ["They", "Them", "She", "We"], "The girls are plural and the subject of are, so use They.", "They are in the school band."),
    q("The girls sing well. Everyone likes ___.", "them", ["them", "they", "her", "us"], "The girls receive the action likes, so use them.", "Everyone likes them."),
    q("You and I have a mission. The captain needs ___.", "us", ["us", "we", "you", "them"], "You and I receive the action needs, so use us.", "The captain needs us.")
  ],
  correction: [
    q("Him plays basketball after school.", "He", ["He", "Him", "Her", "They"], "The pronoun is before the verb plays and does the action, so He is correct.", "He plays basketball after school."),
    q("The teacher helps we every day.", "us", ["us", "we", "them", "me"], "The pronoun receives the action helps, so use the object pronoun us.", "The teacher helps us every day."),
    q("Her is my best friend.", "She", ["She", "Her", "He", "Them"], "The pronoun is the subject of is, so She is correct.", "She is my best friend."),
    q("I can see they in the garden.", "them", ["them", "they", "us", "it"], "After see, we need an object pronoun: them.", "I can see them in the garden."),
    q("Me am ready to start.", "I", ["I", "Me", "We", "He"], "The speaker is the subject before am, so I is correct.", "I am ready to start."),
    q("Omar is my cousin. I visit he on Friday.", "him", ["him", "he", "her", "them"], "After visit, Omar receives the action, so use him.", "I visit him on Friday."),
    q("My sister and I are students. Us study together.", "We", ["We", "Us", "They", "You"], "The pronoun does the action study, so use We.", "We study together."),
    q("The books are interesting. I read they at night.", "them", ["them", "they", "it", "us"], "The books receive the action read, so use them.", "I read them at night."),
    q("Ahmed and Ali are brothers. Them live near us.", "They", ["They", "Them", "We", "He"], "Ahmed and Ali are the subject, so use They.", "They live near us."),
    q("This is my bag. Please give it to I.", "me", ["me", "I", "us", "him"], "After the preposition to, use the object pronoun me.", "Please give it to me."),
    q("Sara loves English. Her reads every day.", "She", ["She", "Her", "He", "They"], "The pronoun does the action reads, so use She.", "She reads every day."),
    q("The robot is friendly. We like they.", "it", ["it", "they", "them", "him"], "Robot is one thing receiving the action, so use it.", "We like it."),
    q("My parents are at home. I am talking to they.", "them", ["them", "they", "us", "it"], "After to, use the object pronoun them.", "I am talking to them."),
    q("Mona and I play tennis. Them practise on Monday.", "We", ["We", "Us", "They", "Them"], "Mona and I are doing the action, so use We.", "We practise on Monday."),
    q("The baby is crying. Please help she.", "her", ["her", "she", "him", "them"], "The baby receives the action help, so her is correct here.", "Please help her.")
  ]
};

const EXTRA_SUBJECT = [
  q("Lina has a red kite. ___ flies it in the park.", "She", ["She", "Her", "He", "Them"], "Lina is one girl doing the action, so use She.", "She flies it in the park."),
  q("My father and mother are teachers. ___ work at the same school.", "They", ["They", "Them", "We", "He"], "Two people doing the action take They.", "They work at the same school."),
  q("The little bird is in the tree. ___ is singing.", "It", ["It", "They", "Him", "Her"], "The bird is one animal and the subject, so use It.", "It is singing."),
  q("My sister and I make breakfast. ___ cook together.", "We", ["We", "Us", "They", "You"], "My sister and I includes the speaker, so use We.", "We cook together."),
  q("Adam, ___ are a great goalkeeper!", "you", ["you", "he", "him", "they"], "We are speaking directly to Adam, so use you.", "Adam, you are a great goalkeeper!"),
  q("The pencils are in my bag. ___ are blue.", "They", ["They", "Them", "It", "We"], "Pencils is plural and the subject, so use They.", "They are blue."),
  q("My uncle lives in Cairo. ___ visits us in summer.", "He", ["He", "Him", "She", "They"], "My uncle is one man doing the action, so use He.", "He visits us in summer."),
  q("The school bus is here. ___ is waiting outside.", "It", ["It", "They", "Us", "Him"], "The bus is one thing and the subject, so use It.", "It is waiting outside."),
  q("Salma and Huda love art. ___ paint beautiful pictures.", "They", ["They", "Them", "She", "We"], "Salma and Huda are two people doing the action, so use They.", "They paint beautiful pictures."),
  q("___ have a new English book.", "I", ["I", "Me", "We", "Him"], "The speaker is doing the action have, so use I.", "I have a new English book.")
];

const EXTRA_OBJECT = [
  q("Yousef is my friend. I play football with ___.", "him", ["him", "he", "her", "them"], "After with, Yousef is the object, so use him.", "I play football with him."),
  q("My aunt is calling. Please answer ___.", "her", ["her", "she", "him", "it"], "My aunt receives the action answer, so use her.", "Please answer her."),
  q("These flowers are lovely. Put ___ in the vase.", "them", ["them", "they", "it", "us"], "Flowers is plural and receives the action, so use them.", "Put them in the vase."),
  q("The ball is under the table. Can you get ___?", "it", ["it", "they", "him", "her"], "The ball is one thing receiving the action, so use it.", "Can you get it?"),
  q("My cousins invited my brother and me. They invited ___.", "us", ["us", "we", "them", "me"], "My brother and me includes the speaker and receives the action, so use us.", "They invited us."),
  q("I am new here. Can you show ___ the classroom?", "me", ["me", "I", "us", "him"], "The speaker receives the action show, so use me.", "Can you show me the classroom?"),
  q("The players are tired. Give ___ some water.", "them", ["them", "they", "us", "it"], "The players receive the action give, so use them.", "Give them some water."),
  q("Nadia has a question. The teacher is helping ___.", "her", ["her", "she", "him", "them"], "Nadia receives the action helping, so use her.", "The teacher is helping her."),
  q("This song is wonderful. We listen to ___ every morning.", "it", ["it", "they", "him", "them"], "The song is one thing after to, so use it.", "We listen to it every morning."),
  q("My grandfather tells great stories. I love listening to ___.", "him", ["him", "he", "her", "them"], "Grandfather is one man after to, so use him.", "I love listening to him.")
];

QUESTIONS.subjectStarter = QUESTIONS.subject.slice(0, 10);
QUESTIONS.subjectAction = [...QUESTIONS.subject.slice(5), ...EXTRA_SUBJECT];
QUESTIONS.objectStarter = QUESTIONS.object.slice(0, 10);
QUESTIONS.objectAction = [...QUESTIONS.object.slice(5), ...EXTRA_OBJECT];

QUESTIONS.singlePairs = [
  q("Hassan is helpful. ___ carries the boxes.", "He", ["He", "Him", "She", "Her"], "Hassan does the action carries, so use He.", "He carries the boxes."),
  q("Hassan is helpful. Everyone thanks ___.", "him", ["him", "he", "her", "them"], "Hassan receives the action thanks, so use him.", "Everyone thanks him."),
  q("Rania is a good reader. ___ reads every night.", "She", ["She", "Her", "He", "Him"], "Rania does the action reads, so use She.", "She reads every night."),
  q("Rania is a good reader. Her teacher praises ___.", "her", ["her", "she", "him", "them"], "Rania receives the action praises, so use her.", "Her teacher praises her."),
  q("My brother has a camera. ___ takes photos.", "He", ["He", "Him", "It", "They"], "My brother does the action, so use He.", "He takes photos."),
  q("My brother has a camera. I borrow it from ___.", "him", ["him", "he", "her", "it"], "After from, use the object pronoun him.", "I borrow it from him."),
  q("The nurse is kind. ___ helps the children.", "She", ["She", "Her", "He", "Them"], "The nurse does the action helps, so use She.", "She helps the children."),
  q("The nurse is kind. The children smile at ___.", "her", ["her", "she", "him", "them"], "After at, the nurse is the object, so use her.", "The children smile at her."),
  q("Karim is on the stage. ___ is singing now.", "He", ["He", "Him", "She", "Her"], "Karim is doing the action, so use He.", "He is singing now."),
  q("Karim is on the stage. We can hear ___.", "him", ["him", "he", "her", "it"], "Karim receives the action hear, so use him.", "We can hear him."),
  q("Aya has a new dress. ___ wears it to the party.", "She", ["She", "Her", "He", "Him"], "Aya does the action wears, so use She.", "She wears it to the party."),
  q("Aya has a new dress. Her mother bought it for ___.", "her", ["her", "she", "him", "them"], "After for, use the object pronoun her.", "Her mother bought it for her."),
  q("Mr. Nabil is our coach. ___ trains the team.", "He", ["He", "Him", "She", "They"], "The coach does the action trains, so use He.", "He trains the team."),
  q("Mr. Nabil is our coach. We listen to ___.", "him", ["him", "he", "her", "them"], "After to, use the object pronoun him.", "We listen to him."),
  q("Maha is absent today. ___ is ill.", "She", ["She", "Her", "He", "Him"], "Maha is the subject of is, so use She.", "She is ill."),
  q("Maha is absent today. I will call ___.", "her", ["her", "she", "him", "them"], "Maha receives the action call, so use her.", "I will call her.")
];

QUESTIONS.pluralPairs = [
  q("My friends are excited. ___ are going on a trip.", "They", ["They", "Them", "We", "Us"], "My friends do the action, so use They.", "They are going on a trip."),
  q("My friends are excited. I am going with ___.", "them", ["them", "they", "us", "we"], "After with, use the object pronoun them.", "I am going with them."),
  q("My sister and I share a room. ___ keep it tidy.", "We", ["We", "Us", "They", "Them"], "My sister and I includes the speaker, so use We.", "We keep it tidy."),
  q("My sister and I are ready. Dad is waiting for ___.", "us", ["us", "we", "them", "they"], "After for, use the object pronoun us.", "Dad is waiting for us."),
  q("The boys are in the playground. ___ are running.", "They", ["They", "Them", "We", "Us"], "The boys do the action running, so use They.", "They are running."),
  q("The boys are in the playground. The teacher can see ___.", "them", ["them", "they", "us", "it"], "The boys receive the action see, so use them.", "The teacher can see them."),
  q("Mona and I have a project. ___ work after school.", "We", ["We", "Us", "They", "Them"], "Mona and I do the action, so use We.", "We work after school."),
  q("Mona and I have a project. Our teacher guides ___.", "us", ["us", "we", "them", "me"], "Mona and I receive the action guides, so use us.", "Our teacher guides us."),
  q("The cats are hungry. ___ are near the kitchen.", "They", ["They", "Them", "It", "We"], "Cats is plural and the subject, so use They.", "They are near the kitchen."),
  q("The cats are hungry. Please feed ___.", "them", ["them", "they", "it", "us"], "The cats receive the action feed, so use them.", "Please feed them."),
  q("You and I can solve this puzzle. ___ are a great team.", "We", ["We", "Us", "You", "They"], "You and I together means We.", "We are a great team."),
  q("The coach chose you and me. He chose ___.", "us", ["us", "we", "you", "them"], "You and me receive the action chose, so use us.", "He chose us."),
  q("The children made posters. ___ used bright colours.", "They", ["They", "Them", "We", "It"], "The children do the action used, so use They.", "They used bright colours."),
  q("The children made posters. The principal praised ___.", "them", ["them", "they", "us", "it"], "The children receive the action praised, so use them.", "The principal praised them."),
  q("My family and I visit the beach. ___ go every summer.", "We", ["We", "Us", "They", "Them"], "My family and I includes the speaker, so use We.", "We go every summer."),
  q("Our neighbours are friendly. They often invite ___.", "us", ["us", "we", "them", "me"], "The speaker's family receives the action invite, so use us.", "They often invite us.")
];

const EXTRA_MIXED = [
  q("The new student is friendly. ___ showed me his book.", "He", ["He", "Him", "They", "Them"], "The pronoun does the action showed, so use He.", "He showed me his book."),
  q("The new student is friendly. I sat beside ___.", "him", ["him", "he", "her", "them"], "After beside, use the object pronoun him.", "I sat beside him."),
  q("My parents bought a computer. ___ use it for work.", "They", ["They", "Them", "We", "Us"], "My parents do the action use, so use They.", "They use it for work."),
  q("My parents bought a computer. I thanked ___.", "them", ["them", "they", "us", "it"], "My parents receive the action thanked, so use them.", "I thanked them."),
  q("This puzzle is difficult, but ___ is fun.", "it", ["it", "they", "him", "them"], "The puzzle is one thing and the subject, so use it.", "It is fun."),
  q("This puzzle is difficult. Can you help me solve ___?", "it", ["it", "they", "him", "them"], "The puzzle receives the action solve, so use it.", "Can you help me solve it?"),
  q("Layla and I joined the club. ___ attend every Thursday.", "We", ["We", "Us", "They", "Them"], "Layla and I do the action attend, so use We.", "We attend every Thursday."),
  q("Layla and I joined the club. The coach welcomed ___.", "us", ["us", "we", "them", "me"], "Layla and I receive the action welcomed, so use us.", "The coach welcomed us.")
];
QUESTIONS.mixedAdvanced = [...QUESTIONS.mixed, ...EXTRA_MIXED];

QUESTIONS.prepositions = [
  q("This letter is from ___. I wrote it.", "me", ["me", "I", "we", "him"], "After from, use the object pronoun me.", "This letter is from me."),
  q("The teacher is speaking to Ali. She is speaking to ___.", "him", ["him", "he", "her", "them"], "After to, use the object pronoun him.", "She is speaking to him."),
  q("I bought a gift for my mother. I bought it for ___.", "her", ["her", "she", "him", "them"], "After for, use the object pronoun her.", "I bought it for her."),
  q("The dog is running after the children. It is running after ___.", "them", ["them", "they", "us", "it"], "After after, use the object pronoun them.", "It is running after them."),
  q("Please come with my brother and me. Come with ___.", "us", ["us", "we", "them", "me"], "After with, use the object pronoun us.", "Come with us."),
  q("This secret is between you and ___.", "me", ["me", "I", "we", "him"], "After between, use the object pronoun me.", "This secret is between you and me."),
  q("We are talking about Sara. We are talking about ___.", "her", ["her", "she", "him", "them"], "After about, use the object pronoun her.", "We are talking about her."),
  q("The teacher stood near Omar. She stood near ___.", "him", ["him", "he", "her", "it"], "After near, use the object pronoun him.", "She stood near him."),
  q("The prize is for the winners. It is for ___.", "them", ["them", "they", "us", "it"], "After for, use the object pronoun them.", "It is for them."),
  q("Our grandparents live far from ___.", "us", ["us", "we", "them", "me"], "After from, use the object pronoun us.", "Our grandparents live far from us."),
  q("The baby smiled at his mother. He smiled at ___.", "her", ["her", "she", "him", "them"], "After at, use the object pronoun her.", "He smiled at her."),
  q("I put the books beside the bag. I put ___ beside it.", "them", ["them", "they", "it", "us"], "The books receive the action put, so use them.", "I put them beside it."),
  q("My friends sat behind ___. I was in front.", "me", ["me", "I", "us", "them"], "After behind, use the object pronoun me.", "My friends sat behind me."),
  q("Can you save a seat for Ali and me? Save it for ___.", "us", ["us", "we", "them", "me"], "After for, Ali and me becomes us.", "Save it for us."),
  q("The kitten is hiding under the chair. Look under ___.", "it", ["it", "they", "him", "them"], "The chair is one thing after under, so use it.", "Look under it."),
  q("The class is proud of Nada. Everyone is proud of ___.", "her", ["her", "she", "him", "them"], "After of, use the object pronoun her.", "Everyone is proud of her.")
];

QUESTIONS.correctionAdvanced = [
  ...QUESTIONS.correction,
  q("Us are ready for the match.", "We", ["We", "Us", "They", "Them"], "The pronoun is the subject of are, so use We.", "We are ready for the match."),
  q("The teacher gave they new books.", "them", ["them", "they", "us", "it"], "The pronoun receives the action gave, so use them.", "The teacher gave them new books."),
  q("Him and I are neighbours.", "He", ["He", "Him", "They", "We"], "The pronoun is part of the subject, so use He.", "He and I are neighbours."),
  q("Please wait for she outside.", "her", ["her", "she", "him", "them"], "After for, use the object pronoun her.", "Please wait for her outside."),
  q("The children are happy because us helped them.", "we", ["we", "us", "they", "them"], "The pronoun does the action helped, so use we.", "The children are happy because we helped them."),
  q("My dad and me wash the car.", "I", ["I", "me", "we", "us"], "In a compound subject, use I, not me.", "My dad and I wash the car."),
  q("The coach spoke to he after the game.", "him", ["him", "he", "her", "them"], "After to, use the object pronoun him.", "The coach spoke to him after the game."),
  q("Them are my new classmates.", "They", ["They", "Them", "We", "Us"], "The pronoun is the subject of are, so use They.", "They are my new classmates.")
];

QUESTIONS.final = [
  ...QUESTIONS.subjectAction,
  ...QUESTIONS.objectAction,
  ...QUESTIONS.singlePairs,
  ...QUESTIONS.pluralPairs,
  ...QUESTIONS.mixedAdvanced,
  ...QUESTIONS.prepositions,
  ...QUESTIONS.correctionAdvanced
];

function q(sentence, answer, options, explanation, completed) {
  return { sentence, answer, options, explanation, completed };
}

const state = {
  player: { name: "", avatar: "astro-boy" },
  currentLevel: 0,
  questionIndex: 0,
  roundQuestions: [],
  score: 0,
  combo: 0,
  bestCombo: 0,
  lives: 4,
  correct: 0,
  attempts: 0,
  misses: {},
  timeLeft: 22,
  timerId: null,
  running: false,
  sound: true,
  targets: [],
  particles: [],
  projectiles: [],
  stars: [],
  shake: 0,
  lastTimestamp: 0,
  progress: loadProgress()
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("pronounBlasterProgress")) || { unlocked: 0, levels: {}, totalStars: 0 };
  } catch {
    return { unlocked: 0, levels: {}, totalStars: 0 };
  }
}

function saveProgress() {
  localStorage.setItem("pronounBlasterProgress", JSON.stringify(state.progress));
  localStorage.setItem("pronounBlasterPlayer", JSON.stringify(state.player));
}

function restorePlayer() {
  try {
    const saved = JSON.parse(localStorage.getItem("pronounBlasterPlayer"));
    if (saved?.name) {
      state.player = saved;
      $("#playerName").value = saved.name;
      const radio = document.querySelector(`input[name="avatar"][value="${saved.avatar}"]`);
      if (radio) radio.checked = true;
    }
  } catch { /* ignore invalid storage */ }
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  document.body.classList.toggle("game-active", id === "gameScreen");
  window.scrollTo({ top: 0, behavior: id === "gameScreen" ? "auto" : "smooth" });
  if (id === "gameScreen") {
    requestAnimationFrame(() => {
      resizeCanvas();
      const question = state.roundQuestions[state.questionIndex];
      if (question) createTargets(question.options);
    });
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderMap() {
  $("#welcomeText").textContent = `Welcome, ${state.player.name}. Complete each mission to unlock the next planet.`;
  $("#profileName").textContent = state.player.name;
  $("#profileAvatar").textContent = AVATARS[state.player.avatar];
  $("#totalStars").textContent = `${state.progress.totalStars || 0} stars`;

  const grid = $("#levelGrid");
  grid.innerHTML = "";
  LEVELS.forEach((level) => {
    const saved = state.progress.levels[level.id];
    const locked = level.id > state.progress.unlocked;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-card";
    button.disabled = locked;
    button.style.setProperty("--planet-color", level.color);
    button.innerHTML = `
      ${locked ? '<span class="lock-badge">🔒 Locked</span>' : ''}
      <span class="level-number">Mission ${level.id + 1}</span>
      <span class="planet">${level.icon}</span>
      <span class="difficulty-tag">${level.difficulty}</span>
      <h3>${level.name}</h3>
      <p>${level.description}</p>
      <span class="level-meta"><span>${level.questionCount} questions · ${level.time}s</span><span class="level-stars">${saved ? "★".repeat(saved.stars) + "☆".repeat(3 - saved.stars) : "☆☆☆"}</span></span>
    `;
    button.addEventListener("click", () => startLevel(level.id));
    grid.appendChild(button);
  });
}

function beginAdventure() {
  const name = $("#playerName").value.trim();
  if (!name) {
    $("#nameError").textContent = "Please enter your name to begin.";
    $("#playerName").focus();
    return;
  }
  $("#nameError").textContent = "";
  state.player.name = name;
  state.player.avatar = document.querySelector('input[name="avatar"]:checked').value;
  saveProgress();
  renderMap();
  showScreen("mapScreen");
  sound("start");
}

function startLevel(levelId) {
  state.currentLevel = levelId;
  const level = LEVELS[levelId];
  const questionPool = QUESTIONS[level.type];
  const count = Math.min(level.questionCount, questionPool.length);
  state.roundQuestions = shuffle(questionPool).slice(0, count).map((item) => ({ ...item, options: shuffle(item.options) }));
  state.questionIndex = 0;
  state.score = 0;
  state.combo = 0;
  state.bestCombo = 0;
  state.lives = 4;
  state.correct = 0;
  state.attempts = 0;
  state.misses = {};
  state.running = true;
  $("#missionName").textContent = level.name;
  $("#missionDifficulty").textContent = level.difficulty;
  updateHud();
  showScreen("gameScreen");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(state.timerId);
  state.projectiles = [];
  state.particles = [];
  state.running = true;
  const question = state.roundQuestions[state.questionIndex];
  if (!question) {
    finishLevel();
    return;
  }

  const level = LEVELS[state.currentLevel];
  const prompts = {
    correctionAdvanced: "Blast the correct replacement",
    prepositions: "Choose the object pronoun after the preposition",
    singlePairs: "Choose the correct he/him or she/her form",
    pluralPairs: "Choose the correct plural pronoun",
    final: "Final challenge: choose carefully"
  };
  $("#questionType").textContent = prompts[level.type] || "Choose the correct pronoun";
  $("#questionCount").textContent = `${state.questionIndex + 1} / ${state.roundQuestions.length}`;
  $("#questionSentence").textContent = question.sentence;
  $("#progressBar").style.width = `${(state.questionIndex / state.roundQuestions.length) * 100}%`;
  state.timeLeft = LEVELS[state.currentLevel].time;
  updateTimer();
  createTargets(question.options);

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      handleTimeout();
    }
  }, 1000);
}

function updateHud() {
  $("#scoreValue").textContent = state.score;
  $("#comboValue").textContent = `x${Math.max(1, state.combo)}`;
  $("#livesValue").textContent = "❤".repeat(state.lives) + "♡".repeat(Math.max(0, 4 - state.lives));
}

function updateTimer() {
  $("#timerText").textContent = state.timeLeft;
  const pct = Math.max(0, (state.timeLeft / LEVELS[state.currentLevel].time) * 100);
  $("#timerBar").style.width = `${pct}%`;
  $("#timerBar").style.background = state.timeLeft <= 5
    ? "linear-gradient(90deg, #ff6f7e, #ffd66b)"
    : "linear-gradient(90deg, #6df2b4, #ffd66b)";
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return;
  const width = Math.max(300, Math.round(rect.width));
  const height = Math.max(220, Math.round(rect.height));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    initStars();
  }
}

function createTargets(options) {
  resizeCanvas();
  const portrait = canvas.width / canvas.height < 1.25;
  const normalized = portrait
    ? [[.26, .20], [.74, .20], [.26, .55], [.74, .55]]
    : [[.22, .25], [.78, .25], [.31, .61], [.69, .61]];
  const radius = Math.max(36, Math.min(64, Math.min(canvas.width, canvas.height) * (portrait ? .115 : .12)));
  state.targets = options.map((text, index) => ({
    text,
    x: canvas.width * normalized[index][0],
    y: canvas.height * normalized[index][1],
    baseX: canvas.width * normalized[index][0],
    baseY: canvas.height * normalized[index][1],
    radius,
    phase: Math.random() * Math.PI * 2,
    speed: .62 + Math.random() * .28,
    alive: true,
    hit: false
  }));
}

function handleShot(target) {
  if (!state.running || !target.alive) return;
  state.running = false;
  clearInterval(state.timerId);
  sound("laser");
  state.projectiles.push({ x: canvas.width / 2, y: canvas.height - Math.max(34, canvas.height * .09), tx: target.x, ty: target.y, progress: 0, target });
}

function resolveShot(target) {
  const question = state.roundQuestions[state.questionIndex];
  const correct = target.text === question.answer;
  state.attempts += 1;

  if (correct) {
    state.correct += 1;
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    const speedBonus = Math.max(0, state.timeLeft * 2);
    const multiplier = Math.min(4, Math.max(1, Math.ceil(state.combo / 3)));
    state.score += (100 + speedBonus) * multiplier;
    target.alive = false;
    burst(target.x, target.y, LEVELS[state.currentLevel].color, 34);
    sound("correct");
    updateHud();
    showCombo(multiplier);
    setTimeout(() => {
      state.questionIndex += 1;
      loadQuestion();
    }, 850);
  } else {
    state.combo = 0;
    state.lives = Math.max(0, state.lives - 1);
    state.shake = 14;
    state.misses[question.answer] = (state.misses[question.answer] || 0) + 1;
    burst(target.x, target.y, "#ff6f7e", 18);
    sound("wrong");
    updateHud();
    showFeedback(question, "wrong");
  }
}

function handleTimeout() {
  if (!state.running) return;
  state.running = false;
  const question = state.roundQuestions[state.questionIndex];
  state.attempts += 1;
  state.combo = 0;
  state.lives = Math.max(0, state.lives - 1);
  state.misses[question.answer] = (state.misses[question.answer] || 0) + 1;
  updateHud();
  sound("wrong");
  showFeedback(question, "timeout");
}

function showFeedback(question, type) {
  $("#feedbackIcon").textContent = type === "timeout" ? "⏱️" : "💡";
  $("#feedbackLabel").textContent = type === "timeout" ? "TIME IS UP" : "LEARNING TIP";
  $("#feedbackTitle").textContent = type === "timeout" ? "Let’s learn it." : "Almost!";
  $("#feedbackSentence").innerHTML = `Correct sentence: <b>${question.completed}</b>`;
  $("#feedbackExplanation").innerHTML = `<b>Why?</b><p>${question.explanation}</p>`;
  $("#feedbackDialog").showModal();
}

function continueAfterFeedback() {
  $("#feedbackDialog").close();
  if (state.lives <= 0) {
    finishLevel();
    return;
  }
  state.questionIndex += 1;
  loadQuestion();
}

function showCombo(multiplier) {
  if (state.combo < 2) return;
  const toast = $("#comboToast");
  toast.textContent = state.combo % 3 === 0 ? `POWER COMBO x${multiplier}!` : `${state.combo} IN A ROW!`;
  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");
}

function finishLevel() {
  clearInterval(state.timerId);
  state.running = false;
  $("#progressBar").style.width = "100%";
  const total = Math.max(1, state.attempts);
  const accuracy = Math.round((state.correct / total) * 100);
  const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;
  const previous = state.progress.levels[state.currentLevel];
  const previousStars = previous?.stars || 0;
  state.progress.levels[state.currentLevel] = {
    score: Math.max(previous?.score || 0, state.score),
    accuracy: Math.max(previous?.accuracy || 0, accuracy),
    stars: Math.max(previousStars, stars)
  };
  state.progress.totalStars = Object.values(state.progress.levels).reduce((sum, level) => sum + level.stars, 0);
  if (state.currentLevel === state.progress.unlocked && state.currentLevel < LEVELS.length - 1) {
    state.progress.unlocked += 1;
  }
  saveProgress();

  const passed = state.correct >= Math.ceil(state.roundQuestions.length * .55);
  $("#resultMedal").textContent = accuracy >= 90 ? "🏆" : accuracy >= 70 ? "🥇" : "🚀";
  $("#resultTitle").textContent = accuracy >= 90 ? "Pronoun power unlocked!" : accuracy >= 70 ? "Great mission!" : "Good training!";
  $("#resultMessage").textContent = passed
    ? `${state.player.name}, you completed ${LEVELS[state.currentLevel].name} and earned ${stars} star${stars > 1 ? "s" : ""}.`
    : `${state.player.name}, every mission makes your grammar stronger. Try again to improve your score.`;
  $("#finalScore").textContent = state.score;
  $("#finalAccuracy").textContent = `${accuracy}%`;
  $("#finalCombo").textContent = `x${Math.max(1, state.bestCombo)}`;
  $("#learningTip").innerHTML = buildLearningTip();
  $("#nextMission").textContent = state.currentLevel < LEVELS.length - 1 ? "Next mission →" : "Mission map →";
  showScreen("resultScreen");
  sound("finish");
}

function buildLearningTip() {
  const weak = Object.entries(state.misses).sort((a, b) => b[1] - a[1])[0];
  if (!weak) return "<b>Excellent:</b> You answered every attempted pronoun correctly. Keep using subject pronouns before verbs and object pronouns after verbs or prepositions.";
  const pronoun = weak[0];
  const subjects = ["I", "you", "he", "she", "it", "we", "they"];
  const kind = subjects.includes(pronoun.toLowerCase() === "i" ? "I" : pronoun.toLowerCase()) ? "subject" : "object";
  return `<b>Practice tip:</b> Review <strong>${pronoun}</strong>. It is used as an ${kind} pronoun. Ask: “Who does the action?” for a subject, or “Who receives the action?” for an object.`;
}

function nextMission() {
  if (state.currentLevel < LEVELS.length - 1 && state.currentLevel + 1 <= state.progress.unlocked) {
    startLevel(state.currentLevel + 1);
  } else {
    renderMap();
    showScreen("mapScreen");
  }
}

function resetProgress() {
  const confirmed = window.confirm("Reset all stars, scores and unlocked missions?");
  if (!confirmed) return;
  state.progress = { unlocked: 0, levels: {}, totalStars: 0 };
  saveProgress();
  renderMap();
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const clientX = event.touches?.[0]?.clientX ?? event.clientX;
  const clientY = event.touches?.[0]?.clientY ?? event.clientY;
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height)
  };
}

function shootAtEvent(event) {
  event.preventDefault();
  const point = canvasPoint(event);
  const hit = state.targets.find((target) => target.alive && Math.hypot(point.x - target.x, point.y - target.y) <= target.radius + 15);
  if (hit) handleShot(hit);
}

function initStars() {
  state.stars = Array.from({ length: 85 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + .3,
    a: Math.random() * .65 + .25,
    s: Math.random() * .15 + .04
  }));
}

function burst(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 5.8;
    state.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color, size: 2 + Math.random() * 4 });
  }
}

function drawBackground(dt) {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#bdeaff");
  gradient.addColorStop(.56, "#e8f7ff");
  gradient.addColorStop(1, "#f8edff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  const glow1 = ctx.createRadialGradient(canvas.width * .16, canvas.height * .25, 0, canvas.width * .16, canvas.height * .25, canvas.width * .34);
  glow1.addColorStop(0, "rgba(255,255,255,.82)");
  glow1.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const glow2 = ctx.createRadialGradient(canvas.width * .84, canvas.height * .20, 0, canvas.width * .84, canvas.height * .20, canvas.width * .30);
  glow2.addColorStop(0, "rgba(207,184,255,.46)");
  glow2.addColorStop(1, "rgba(207,184,255,0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  state.stars.forEach((star) => {
    star.y += star.s * dt;
    if (star.y > canvas.height) star.y = 0;
    ctx.globalAlpha = star.a;
    ctx.fillStyle = star.r > 1.2 ? "#ffffff" : "#6aaee8";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(73,128,181,.075)";
  ctx.lineWidth = 1;
  const grid = Math.max(56, Math.min(82, canvas.width / 12));
  for (let x = 0; x <= canvas.width; x += grid) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += grid) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
}

function drawTargets(time) {
  state.targets.forEach((target, index) => {
    if (!target.alive) return;
    const moveX = Math.max(10, Math.min(28, canvas.width * .028));
    const moveY = Math.max(8, Math.min(20, canvas.height * .035));
    target.x = target.baseX + Math.sin(time * .001 * target.speed + target.phase) * moveX;
    target.y = target.baseY + Math.cos(time * .0012 * target.speed + target.phase) * moveY;
    const pulse = 1 + Math.sin(time * .004 + index) * .035;
    const r = target.radius * pulse;

    ctx.save();
    ctx.translate(target.x, target.y);
    ctx.shadowBlur = 28;
    ctx.shadowColor = LEVELS[state.currentLevel].color;
    const gradient = ctx.createRadialGradient(-18, -22, 8, 0, 0, r);
    gradient.addColorStop(0, "rgba(255,255,255,.95)");
    gradient.addColorStop(.17, LEVELS[state.currentLevel].color);
    gradient.addColorStop(.72, "#ffffff");
    gradient.addColorStop(1, "#dcecff");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,.75)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = "rgba(62,112,168,.16)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, 0, r - 11, -.9, 1.4);
    ctx.stroke();

    ctx.fillStyle = "#16345f";
    ctx.font = `900 ${Math.max(20, Math.min(29, r * .46))}px Segoe UI, Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(target.text, 0, 2);
    ctx.restore();
  });
}

function drawBlaster(time) {
  const x = canvas.width / 2;
  const y = canvas.height - Math.max(50, canvas.height * .09);
  const scale = Math.max(.58, Math.min(1, canvas.width / 900));
  const glow = (10 + Math.sin(time * .006) * 4) * scale;
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowBlur = 22 * scale;
  ctx.shadowColor = "#34c8ff";
  ctx.fillStyle = "#ffffff";
  ctx.beginPath(); ctx.arc(0, -24 * scale, glow, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  const g = ctx.createLinearGradient(-70 * scale, 0, 70 * scale, 0);
  g.addColorStop(0, "#6d86ff"); g.addColorStop(.5, "#ffffff"); g.addColorStop(1, "#35d4bd");
  ctx.fillStyle = g;
  roundRect(ctx, -75 * scale, -17 * scale, 150 * scale, 34 * scale, 17 * scale);
  ctx.fill();
  ctx.strokeStyle = "rgba(27,72,125,.35)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#385c9a";
  roundRect(ctx, -24 * scale, 12 * scale, 48 * scale, 24 * scale, 9 * scale);
  ctx.fill();
  ctx.restore();
}

function updateProjectiles(dt) {
  state.projectiles.forEach((projectile) => {
    projectile.progress += dt * .0032;
    const eased = 1 - Math.pow(1 - Math.min(1, projectile.progress), 3);
    const originY = canvas.height - Math.max(38, canvas.height * .10);
    projectile.x = canvas.width / 2 + (projectile.tx - canvas.width / 2) * eased;
    projectile.y = originY + (projectile.ty - originY) * eased;
    ctx.save();
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#b5fbff";
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(projectile.x, projectile.y, 9, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    if (projectile.progress >= 1 && !projectile.resolved) {
      projectile.resolved = true;
      resolveShot(projectile.target);
    }
  });
  state.projectiles = state.projectiles.filter((item) => item.progress < 1.08);
}

function updateParticles(dt) {
  state.particles.forEach((p) => {
    p.x += p.vx * dt * .06;
    p.y += p.vy * dt * .06;
    p.vy += .035 * dt * .06;
    p.life -= .018 * dt * .06;
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
  ctx.globalAlpha = 1;
  state.particles = state.particles.filter((p) => p.life > 0);
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function gameLoop(timestamp) {
  const dt = Math.min(34, timestamp - state.lastTimestamp || 16);
  state.lastTimestamp = timestamp;
  ctx.save();
  if (state.shake > 0) {
    ctx.translate((Math.random() - .5) * state.shake, (Math.random() - .5) * state.shake);
    state.shake *= .86;
  }
  drawBackground(dt);
  drawTargets(timestamp);
  updateProjectiles(dt);
  updateParticles(dt);
  drawBlaster(timestamp);
  ctx.restore();
  requestAnimationFrame(gameLoop);
}

let audioContext;
function sound(type) {
  if (!state.sound) return;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain); gain.connect(audioContext.destination);
  const presets = {
    laser: [420, 1000, .09, "sawtooth", .07],
    correct: [540, 860, .18, "sine", .09],
    wrong: [220, 125, .22, "square", .07],
    start: [330, 660, .28, "triangle", .06],
    finish: [520, 1040, .38, "sine", .08]
  };
  const [from, to, duration, wave, volume] = presets[type] || presets.laser;
  osc.type = wave;
  osc.frequency.setValueAtTime(from, now);
  osc.frequency.exponentialRampToValueAtTime(to, now + duration);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

$("#startButton").addEventListener("click", beginAdventure);
$("#playerName").addEventListener("keydown", (event) => { if (event.key === "Enter") beginAdventure(); });
$("#howToButton").addEventListener("click", () => $("#howToDialog").showModal());
$("#gotItButton").addEventListener("click", continueAfterFeedback);
$("#backToMap").addEventListener("click", () => {
  clearInterval(state.timerId);
  state.running = false;
  renderMap();
  showScreen("mapScreen");
});
$("#playAgain").addEventListener("click", () => startLevel(state.currentLevel));
$("#nextMission").addEventListener("click", nextMission);
$("#resetProgress").addEventListener("click", resetProgress);
$("#soundToggle").addEventListener("click", () => {
  state.sound = !state.sound;
  $("#soundToggle").textContent = state.sound ? "🔊" : "🔇";
  $("#soundToggle").setAttribute("aria-label", state.sound ? "Mute sound" : "Turn sound on");
});
canvas.addEventListener("pointerdown", shootAtEvent);
window.addEventListener("resize", () => {
  if (document.body.classList.contains("game-active")) {
    resizeCanvas();
    const question = state.roundQuestions[state.questionIndex];
    if (question) createTargets(question.options);
  }
});
if (window.ResizeObserver) {
  new ResizeObserver(() => {
    if (document.body.classList.contains("game-active")) resizeCanvas();
  }).observe($("#playfield"));
}

restorePlayer();
initStars();
requestAnimationFrame(gameLoop);
