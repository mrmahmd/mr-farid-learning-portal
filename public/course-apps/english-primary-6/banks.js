(() => {
  'use strict';

  const mcq = (category, prompt, options, answer, explanation = '') => ({ type: 'mcq', category, prompt, options, answer, explanation });
  const fill = (category, prompt, answer, hint = '', explanation = '') => ({ type: 'fill', category, prompt, answer, hint, explanation });
  const correction = (category, prompt, wrong, answer, explanation = '') => ({ type: 'correction', category, prompt, wrong, answer, explanation });
  const reorder = (category, prompt, words, answer, explanation = '') => ({ type: 'reorder', category, prompt, words, answer, explanation });
  const orderSentences = (category, prompt, sentences, answer, explanation = '') => ({ type: 'order-sentences', category, prompt, sentences, answer, explanation });
  const match = (category, prompt, pairs, explanation = '') => ({ type: 'match', category, prompt, pairs, answer: pairs, explanation });
  const tf = (category, prompt, answer, explanation = '') => ({ type: 'truefalse', category, prompt, answer, explanation });
  const listen = (category, audio, prompt, options, answer, explanation = '') => ({ type: 'listening-mcq', category, audio, prompt, options, answer, explanation });

  const BANKS = {
    u1: [
      mcq('Vocabulary', 'Tourists buy ______ to remember their visit to Egypt.', ['souvenirs', 'fertilizer', 'pipes', 'uniforms'], 'souvenirs'),
      fill('Vocabulary', 'A carpenter can ______ furniture in Damietta.', 'make'),
      mcq('Vocabulary', 'Visitors wear a mask and use a tube when they ______ in the sea.', ['snorkel', 'harvest', 'weave', 'repair'], 'snorkel'),
      fill('Vocabulary', 'Fishermen catch fish with fishing ______.', 'nets'),
      mcq('Vocabulary', 'People use ______ to weave cloth and carpets.', ['looms', 'taps', 'bricks', 'vehicles'], 'looms'),
      match('Vocabulary', 'Match each activity to the correct place or person.', [
        ['buy souvenirs', 'a traditional market'],
        ['make furniture', 'a carpenter'],
        ['salute the flag', 'the school morning line'],
        ['snorkel', 'the clear sea']
      ]),

      mcq('Grammar', 'My sister ______ photos whenever we visit an ancient site.', ['takes', 'take', 'taking', 'is take'], 'takes', 'With he, she, or it in the present simple, the verb usually takes -s.'),
      fill('Grammar', 'Tourists ______ Ras Mohamed every year.', 'visit'),
      correction('Grammar', 'Correct the highlighted word: The park **have** colorful coral reefs.', 'have', 'has', 'The subject “The park” is singular, so use has.'),
      mcq('Grammar', '______ your father enjoy visiting museums?', ['Does', 'Do', 'Is', 'Are'], 'Does', 'Use Does with he, she, it, or a singular noun.'),
      correction('Grammar', 'Correct the highlighted word: Bedouins **lives** near Ras Mohamed.', 'lives', 'live', 'The plural subject Bedouins takes the base form live.'),
      reorder('Grammar', 'Put the words in the correct order.', ['Fady', 'usually', 'leaves', 'school', 'at 1:30'], ['Fady', 'usually', 'leaves', 'school', 'at 1:30']),

      tf('Reading', 'Ras Mohamed is a protected area in South Sinai.', true),
      mcq('Reading', 'Why must visitors follow the rules at Ras Mohamed?', ['To keep the park clean and safe', 'To make the sea warmer', 'To close the mountains', 'To move the mangrove trees'], 'To keep the park clean and safe'),
      mcq('Reading', 'In Fady’s school day, students sing the national ______ in the morning.', ['anthem', 'story', 'email', 'lesson'], 'anthem'),
      tf('Reading', 'Fady’s favorite subject in the school email is P.E.', true),
      orderSentences('Reading', 'Put the school routine in the correct order.', [
        'Students go to their classrooms.',
        'Students salute the flag.',
        'Students have a short break.',
        'Students leave school.'
      ], [
        'Students salute the flag.',
        'Students go to their classrooms.',
        'Students have a short break.',
        'Students leave school.'
      ]),
      match('Reading', 'Match each village activity to the correct worker.', [
        ['harvest crops', 'farmers'],
        ['catch fish', 'fishermen'],
        ['weave wool', 'craft workers'],
        ['make furniture', 'carpenters']
      ]),

      mcq('Writing', 'Which greeting is suitable for an informal email to a friend?', ['Hi Sam,', 'Dear Sir or Madam,', 'To whom it may concern,', 'Official Notice:'], 'Hi Sam,'),
      mcq('Writing', 'Which sentence is best for the body of an email about a school day?', ['We start lessons at 7:30 every morning.', 'Please find the attached legal document.', 'The meeting is hereby cancelled.', 'Your application was rejected.'], 'We start lessons at 7:30 every morning.'),
      orderSentences('Writing', 'Arrange the parts of an informal email.', [
        'Bye for now,\nFady',
        'Hi Mark,',
        'I want to tell you about my school day.',
        'How are you?'
      ], [
        'Hi Mark,',
        'How are you?',
        'I want to tell you about my school day.',
        'Bye for now,\nFady'
      ]),
      correction('Writing', 'Correct the highlighted word: I **goes** to school at 7:00 every day.', 'goes', 'go'),
      fill('Writing', 'Complete the poster sentence: Many people ______ on farms in Beni Suef.', 'work'),
      match('Writing', 'Match each poster part to its purpose.', [
        ['main heading', 'tells the poster topic'],
        ['picture', 'shows the idea visually'],
        ['details', 'give useful information'],
        ['closing line', 'finishes the message']
      ]),

      listen('Listening', 'Maged and his family visit a market in the morning. His sister buys a colorful necklace. In the evening, they visit a small museum and learn about Egyptian history.', 'What does Maged’s sister buy?', ['A necklace', 'A schoolbag', 'A fishing net', 'A book'], 'A necklace'),
      listen('Listening', 'At school, Fady salutes the flag, starts lessons at seven thirty, has a break at ten fifteen, and leaves at one thirty.', 'When does Fady have a break?', ['At 10:15', 'At 7:30', 'At 1:30', 'At 6:30'], 'At 10:15'),
      mcq('Pronunciation', 'Which word has a similar final sound to “chair”?', ['bear', 'car', 'book', 'fish'], 'bear'),
      mcq('Pronunciation', 'Which word does NOT belong to the same sound group as “square”?', ['airport', 'stare', 'bear', 'farm'], 'farm'),
      reorder('Mixed', 'Build a correct question.', ['What', 'do', 'people', 'do', 'in', 'your', 'village'], ['What', 'do', 'people', 'do', 'in', 'your', 'village']),
      correction('Mixed', 'Correct the highlighted word: She **don’t** play music after school.', 'don’t', 'doesn’t')
    ],

    u2: [
      mcq('Vocabulary', 'Gardeners pull out ______ because they can harm plants.', ['weeds', 'petals', 'fossils', 'bricks'], 'weeds'),
      fill('Vocabulary', 'People use natural ______ to help plants grow well.', 'fertilizer'),
      mcq('Vocabulary', 'Hibiscus is often used to make a tasty ______.', ['drink', 'vehicle', 'uniform', 'wall'], 'drink'),
      fill('Vocabulary', 'People sit in the ______ to protect themselves from strong sunlight.', 'shade'),
      mcq('Vocabulary', 'A ______ is the place where an animal or plant naturally lives.', ['habitat', 'museum', 'factory', 'office'], 'habitat'),
      match('Vocabulary', 'Match each word to the correct idea.', [
        ['waterfall', 'water falling over a high edge'],
        ['fossil', 'the remains of an ancient living thing'],
        ['kingfisher', 'a bird seen near rivers'],
        ['tilapia', 'a fish that lives in the Nile']
      ]),

      mcq('Grammar', 'Look! The children ______ in the park now.', ['are playing', 'play', 'plays', 'is playing'], 'are playing'),
      fill('Grammar', 'Maged ______ tennis at the moment. (play)', 'is playing'),
      correction('Grammar', 'Correct the highlighted word: I **is wearing** my jacket now.', 'is wearing', 'am wearing'),
      mcq('Grammar', '______ the farmers watering the plants now?', ['Are', 'Is', 'Do', 'Does'], 'Are'),
      correction('Grammar', 'Correct the highlighted word: She **are not sitting** in the shade.', 'are not sitting', 'is not sitting'),
      reorder('Grammar', 'Put the words in the correct order.', ['birds', 'are', 'flying', 'in', 'the clear sky'], ['birds', 'are', 'flying', 'in', 'the clear sky']),

      tf('Reading', 'The Nile flows through Egypt from south to north.', true),
      mcq('Reading', 'Why was the Nile important to farmers in the past?', ['It brought good soil after flooding', 'It made the desert colder', 'It stopped all birds from flying', 'It produced school books'], 'It brought good soil after flooding'),
      mcq('Reading', 'What did students see at Wadi El-Hitan?', ['Ancient whale skeletons', 'Modern trains', 'A large factory', 'A football stadium'], 'Ancient whale skeletons'),
      tf('Reading', 'Wadi El Rayan is in Fayoum.', true),
      orderSentences('Reading', 'Put the trip events in the correct order.', [
        'The teacher found the camera.',
        'The class rode the bus.',
        'The students saw the waterfalls.',
        'The students visited Wadi El-Hitan.'
      ], [
        'The class rode the bus.',
        'The students saw the waterfalls.',
        'The students visited Wadi El-Hitan.',
        'The teacher found the camera.'
      ]),
      match('Reading', 'Match each city to the weather described in the lesson.', [
        ['Alexandria', 'windy and rainy'],
        ['Cairo', 'warm and sunny'],
        ['Aswan', 'hot with strong sunshine'],
        ['wet streets', 'heavy rain']
      ]),

      mcq('Writing', 'Which word is useful for showing the second event in a story?', ['Next', 'Because', 'But', 'Always'], 'Next'),
      mcq('Writing', 'A good short story should include ______.', ['a setting, events, and an ending', 'only a title', 'only a list of words', 'no characters'], 'a setting, events, and an ending'),
      orderSentences('Writing', 'Arrange the story events.', [
        'Finally, we returned to school happily.',
        'First, our class left school early.',
        'Then, we visited the waterfall.',
        'Next, we rode the bus to Fayoum.'
      ], [
        'First, our class left school early.',
        'Next, we rode the bus to Fayoum.',
        'Then, we visited the waterfall.',
        'Finally, we returned to school happily.'
      ]),
      correction('Writing', 'Correct the highlighted word: The children **is visiting** a new place now.', 'is visiting', 'are visiting'),
      fill('Writing', 'Complete the fact card: A Nile crocodile lives in a river ______.', 'habitat'),
      match('Writing', 'Match each fact-card question to the information it asks for.', [
        ['Where does it live?', 'habitat'],
        ['What does it eat?', 'food'],
        ['What is special about it?', 'special feature'],
        ['What is the weather like?', 'climate']
      ]),

      listen('Listening', 'Grandpa grows parsley, mint, and basil in his garden. He waters the plants, checks for insects, and pulls out weeds every day.', 'Which herbs does Grandpa grow?', ['Parsley, mint, and basil', 'Rice, wheat, and beans', 'Roses and cactus only', 'Cotton and sugar cane'], 'Parsley, mint, and basil'),
      listen('Listening', 'In Alexandria, the sky is dark and the streets are wet. In Cairo, children are playing outdoors under a clear sky.', 'Where are the streets wet?', ['Alexandria', 'Cairo', 'Aswan', 'Fayoum'], 'Alexandria'),
      mcq('Pronunciation', 'Which word has the short /ɪ/ sound?', ['milk', 'desk', 'red', 'ten'], 'milk'),
      mcq('Pronunciation', 'Which word has the /e/ sound?', ['bed', 'fish', 'mint', 'river'], 'bed'),
      reorder('Mixed', 'Build a correct present-continuous question.', ['What', 'are', 'the students', 'doing', 'now'], ['What', 'are', 'the students', 'doing', 'now']),
      correction('Mixed', 'Correct the highlighted word: Farmers **is watering** their plants early today.', 'is watering', 'are watering')
    ],

    u3: [
      mcq('Vocabulary', 'A ______ gives quick medical help in an emergency.', ['paramedic', 'tailor', 'architect', 'mechanic'], 'paramedic'),
      fill('Vocabulary', 'An ______ designs buildings.', 'architect'),
      mcq('Vocabulary', 'A mechanic repairs ______.', ['vehicles', 'petals', 'crops', 'posters'], 'vehicles'),
      fill('Vocabulary', 'A traffic officer helps people cross the road ______.', 'safely'),
      mcq('Vocabulary', 'To look for information carefully is to do ______.', ['research', 'pollution', 'harvest', 'decoration'], 'research'),
      match('Vocabulary', 'Match each worker to the job.', [
        ['tailor', 'makes and repairs clothes'],
        ['street cleaner', 'keeps streets clean'],
        ['delivery person', 'takes packages to people'],
        ['water resources engineer', 'helps provide clean water']
      ]),

      mcq('Grammar', 'A mechanic ______ fix a car.', ['can', 'can to', 'is can', 'cans'], 'can'),
      fill('Grammar', 'She is ______ to speak with the traffic officer.', 'able'),
      correction('Grammar', 'Correct the highlighted word: He **can to repair** the vehicle.', 'can to repair', 'can repair'),
      mcq('Grammar', 'Ali hurt his leg, so he ______ run fast today.', ['can’t', 'can', 'is able', 'able to'], 'can’t'),
      correction('Grammar', 'Correct the highlighted word: They **is able to** finish the project.', 'is able to', 'are able to'),
      reorder('Grammar', 'Put the words in the correct order.', ['Can', 'you', 'help', 'your', 'community'], ['Can', 'you', 'help', 'your', 'community']),

      tf('Reading', 'At first, the proud rose judged the cactus by his appearance.', true),
      mcq('Reading', 'Why did the rose ask the cactus for help?', ['She was thirsty and needed water', 'She wanted sharper thorns', 'She wanted to leave the desert', 'She wanted to become a bird'], 'She was thirsty and needed water'),
      mcq('Reading', 'What is the moral of “The Proud Rose”?', ['Do not judge others by appearance', 'Never help anyone', 'Beauty is the only important thing', 'Water is never useful'], 'Do not judge others by appearance'),
      tf('Reading', 'Dr. Mostafa El-Sayed became an expert in chemistry and nanoscience.', true),
      orderSentences('Reading', 'Put the biography facts in time order.', [
        'He became a global expert.',
        'He was born in Egypt in 1933.',
        'He studied at Ain Shams University.',
        'He continued his research in the United States.'
      ], [
        'He was born in Egypt in 1933.',
        'He studied at Ain Shams University.',
        'He continued his research in the United States.',
        'He became a global expert.'
      ]),
      match('Reading', 'Match the community problem to a sensible solution.', [
        ['litter in a park', 'organize a clean-up'],
        ['dangerous traffic', 'make safety signs'],
        ['food waste', 'plan meals and share leftovers'],
        ['wasting water', 'close taps and repair leaks']
      ]),

      mcq('Writing', 'A biography usually starts with ______.', ['key facts about the person', 'a shopping list', 'a weather report', 'a dialogue only'], 'key facts about the person'),
      mcq('Writing', 'Which sentence gives an achievement?', ['He discovered important uses for gold nanoparticles.', 'He likes breakfast.', 'The sky is blue.', 'Open the window.'], 'He discovered important uses for gold nanoparticles.'),
      orderSentences('Writing', 'Arrange the biography paragraph.', [
        'His work made Egypt proud.',
        'Dr. Mostafa El-Sayed was born in Egypt in 1933.',
        'Later, he became an expert in nanoscience.',
        'He studied science in Egypt and the United States.'
      ], [
        'Dr. Mostafa El-Sayed was born in Egypt in 1933.',
        'He studied science in Egypt and the United States.',
        'Later, he became an expert in nanoscience.',
        'His work made Egypt proud.'
      ]),
      correction('Writing', 'Correct the highlighted word: A paramedic **can helps** injured people.', 'can helps', 'can help'),
      fill('Writing', 'Complete the solution: We can ______ posters to remind people not to waste food.', 'make'),
      match('Writing', 'Match each problem-map heading to its content.', [
        ['Causes', 'why the problem happens'],
        ['Effects', 'what happens because of the problem'],
        ['Solutions', 'ways to improve the situation'],
        ['Title', 'the main topic']
      ]),

      listen('Listening', 'Omar is researching jobs that help the community. Youssef wants to be a mechanic because he enjoys fixing things. Salma wants to be a paramedic and help people in emergencies.', 'Why does Youssef want to be a mechanic?', ['He enjoys fixing things', 'He wants to make clothes', 'He likes writing stories', 'He wants to control traffic'], 'He enjoys fixing things'),
      listen('Listening', 'Students suggest making posters, riding bikes, and asking a traffic officer for help near the school.', 'What do the students suggest instead of using cars?', ['Riding bikes', 'Flying planes', 'Building museums', 'Buying furniture'], 'Riding bikes'),
      mcq('Pronunciation', 'Which word has two syllables?', ['tailor', 'mechanic', 'architect', 'community'], 'tailor'),
      mcq('Pronunciation', 'In the word “mechanic”, the strongest syllable is usually ______.', ['CHAN', 'me', 'ic', 'all are equal'], 'CHAN'),
      reorder('Mixed', 'Build a sentence about ability.', ['The students', 'are able to', 'solve', 'the problem'], ['The students', 'are able to', 'solve', 'the problem']),
      correction('Mixed', 'Correct the highlighted word: She **can’t to cross** the road safely alone.', 'can’t to cross', 'can’t cross')
    ],

    u4: [
      mcq('Vocabulary', 'Ancient Egyptians wrote on ______.', ['papyrus', 'plastic', 'steel', 'glass screens'], 'papyrus'),
      fill('Vocabulary', 'Solar panels use sunlight to produce ______.', 'energy'),
      mcq('Vocabulary', 'Granite, gold, and clay are found ______ the ground.', ['under', 'above only', 'inside classrooms', 'on clouds'], 'under'),
      fill('Vocabulary', 'We should ______ materials to use them again.', 'recycle'),
      mcq('Vocabulary', 'A resource made by people is called a ______ resource.', ['man-made', 'wild', 'marine', 'ancient'], 'man-made'),
      match('Vocabulary', 'Match each material to a common use.', [
        ['clay', 'pots and bricks'],
        ['granite', 'buildings and statues'],
        ['gold', 'jewelry'],
        ['papyrus', 'ancient writing material']
      ]),

      mcq('Grammar', 'We ______ turn off lights when we leave a room.', ['should', 'shouldn’t', 'mustn’t to', 'are should'], 'should'),
      fill('Grammar', 'Students ______ waste water at school.', 'mustn’t'),
      correction('Grammar', 'Correct the highlighted word: We **should to save** energy.', 'should to save', 'should save'),
      mcq('Grammar', 'You ______ touch dangerous electrical wires.', ['mustn’t', 'must', 'should', 'can'], 'mustn’t'),
      correction('Grammar', 'Correct the highlighted word: People **mustn’t wastes** natural resources.', 'mustn’t wastes', 'mustn’t waste'),
      reorder('Grammar', 'Put the words in the correct order.', ['We', 'must', 'protect', 'natural', 'resources'], ['We', 'must', 'protect', 'natural', 'resources']),

      tf('Reading', 'The High Dam helps control Nile water and produce electricity.', true),
      mcq('Reading', 'Why are solar panels useful?', ['They produce clean energy from sunlight', 'They make rivers dry', 'They waste electricity', 'They pollute the air heavily'], 'They produce clean energy from sunlight'),
      mcq('Reading', 'Which is a natural resource?', ['gold', 'a plastic chair', 'a school desk', 'a glass bottle made in a factory'], 'gold'),
      tf('Reading', 'Bricks can be made from clay.', true),
      orderSentences('Reading', 'Put the research steps in the correct order.', [
        'Present the fact file.',
        'Choose a resource.',
        'Write clear facts.',
        'Find reliable information.'
      ], [
        'Choose a resource.',
        'Find reliable information.',
        'Write clear facts.',
        'Present the fact file.'
      ]),
      match('Reading', 'Match each action to its result.', [
        ['turn off unused lights', 'save electricity'],
        ['repair a leaking tap', 'save water'],
        ['recycle paper', 'reduce waste'],
        ['plant trees', 'protect the environment']
      ]),

      mcq('Writing', 'A good fact file should use ______.', ['headings and clear facts', 'one long sentence only', 'no title', 'unrelated opinions'], 'headings and clear facts'),
      mcq('Writing', 'Which heading belongs in a fact file about the High Dam?', ['Benefits', 'Dear Friend', 'Once upon a time', 'Shopping List'], 'Benefits'),
      orderSentences('Writing', 'Arrange the fact-file sections.', [
        'Why It Is Important',
        'The High Dam',
        'Where It Is',
        'What It Does'
      ], [
        'The High Dam',
        'Where It Is',
        'What It Does',
        'Why It Is Important'
      ]),
      correction('Writing', 'Correct the highlighted word: People **shouldn’t pollutes** the river.', 'shouldn’t pollutes', 'shouldn’t pollute'),
      fill('Writing', 'Complete the advice: We should use ______ energy from the sun and wind.', 'clean'),
      match('Writing', 'Match the research section to the information.', [
        ['Location', 'where the resource or project is'],
        ['Uses', 'how people benefit from it'],
        ['Materials', 'what it is made from'],
        ['Protection', 'how we can care for it']
      ]),

      listen('Listening', 'A family turns off the air conditioner, opens the windows, and switches off lights in empty rooms to save energy.', 'Which action saves electricity?', ['Switching off lights in empty rooms', 'Leaving every device on', 'Opening all taps', 'Throwing away batteries'], 'Switching off lights in empty rooms'),
      listen('Listening', 'Workers use granite for strong buildings, clay for bricks, and gold for jewelry.', 'What is clay used for?', ['Bricks', 'Fuel', 'Medicine', 'Fishing nets'], 'Bricks'),
      mcq('Pronunciation', 'Which word has the long /uː/ sound?', ['moon', 'book', 'look', 'good'], 'moon'),
      mcq('Pronunciation', 'Which word has the short /ʊ/ sound?', ['book', 'moon', 'school', 'room'], 'book'),
      reorder('Mixed', 'Build a sentence giving advice.', ['You', 'should', 'reuse', 'paper', 'and', 'plastic'], ['You', 'should', 'reuse', 'paper', 'and', 'plastic']),
      correction('Mixed', 'Correct the highlighted word: We **mustn’t to throw** rubbish in the river.', 'mustn’t to throw', 'mustn’t throw')
    ],

    u5: [
      mcq('Vocabulary', 'A traveler carries clothes in ______.', ['luggage', 'puddles', 'fertilizer', 'looms'], 'luggage'),
      fill('Vocabulary', 'A ______ gives visitors information about a place.', 'brochure'),
      mcq('Vocabulary', 'A guided ______ shows visitors around a place.', ['tour', 'pipe', 'harvest', 'leak'], 'tour'),
      fill('Vocabulary', 'The Grand Egyptian Museum has many ancient ______.', 'exhibits'),
      mcq('Vocabulary', 'A project that protects the environment is ______.', ['sustainable', 'unpleasant', 'careless', 'wasteful'], 'sustainable'),
      match('Vocabulary', 'Match each travel word to its use.', [
        ['passport', 'official travel document'],
        ['luggage', 'bags for clothes and belongings'],
        ['brochure', 'printed visitor information'],
        ['information desk', 'a place to ask for help']
      ]),

      mcq('Grammar', 'We ______ the museum last Saturday.', ['visited', 'visit', 'visits', 'are visiting'], 'visited'),
      fill('Grammar', 'The family ______ to Cairo yesterday. (go)', 'went'),
      correction('Grammar', 'Correct the highlighted word: They **didn’t visited** the exhibition.', 'didn’t visited', 'didn’t visit'),
      mcq('Grammar', '______ you enjoy the guided tour?', ['Did', 'Do', 'Does', 'Are'], 'Did'),
      correction('Grammar', 'Correct the highlighted word: The brothers **was argued** about the sticks.', 'was argued', 'argued'),
      reorder('Grammar', 'Put the words in the correct order.', ['The students', 'saw', 'ancient exhibits', 'at the museum'], ['The students', 'saw', 'ancient exhibits', 'at the museum']),

      tf('Reading', 'The Bundle of Sticks teaches that people are stronger when they work together.', true),
      mcq('Reading', 'Why could the sons not break the bundle?', ['The sticks were stronger together', 'The sticks were made of gold', 'The father hid the sticks', 'The sticks were wet'], 'The sticks were stronger together'),
      mcq('Reading', 'Benban Solar Park uses ______ to produce electricity.', ['sunlight', 'coal only', 'wood', 'river pollution'], 'sunlight'),
      tf('Reading', 'The Grand Egyptian Museum displays important objects from Egyptian history.', true),
      orderSentences('Reading', 'Put the story events in the correct order.', [
        'The sons understood the lesson.',
        'The father tied the sticks together.',
        'The sons argued with one another.',
        'Each son broke one stick easily.'
      ], [
        'The sons argued with one another.',
        'The father tied the sticks together.',
        'Each son broke one stick easily.',
        'The sons understood the lesson.'
      ]),
      match('Reading', 'Match each place or project to its main idea.', [
        ['Grand Egyptian Museum', 'heritage and ancient exhibits'],
        ['Benban Solar Park', 'clean solar energy'],
        ['New Capital', 'modern development'],
        ['guided tour', 'learning about a place with a guide']
      ]),

      mcq('Writing', 'An opinion paragraph should include an opinion and ______.', ['reasons and examples', 'only one word', 'no supporting details', 'a list of random verbs'], 'reasons and examples'),
      mcq('Writing', 'Which phrase clearly introduces an opinion?', ['In my opinion,', 'Yesterday at six,', 'How old are you?', 'Please close the door.'], 'In my opinion,'),
      orderSentences('Writing', 'Arrange the opinion paragraph.', [
        'For these reasons, it is an excellent project.',
        'In my opinion, Benban Solar Park is very important.',
        'It produces clean energy and protects the environment.',
        'It also creates useful jobs.'
      ], [
        'In my opinion, Benban Solar Park is very important.',
        'It produces clean energy and protects the environment.',
        'It also creates useful jobs.',
        'For these reasons, it is an excellent project.'
      ]),
      correction('Writing', 'Correct the highlighted word: We **didn’t went** to the information desk.', 'didn’t went', 'didn’t go'),
      fill('Writing', 'Complete the sentence: The museum was amazing because it had many ancient ______.', 'exhibits'),
      match('Writing', 'Match each paragraph part to its function.', [
        ['topic sentence', 'states the main opinion'],
        ['reason', 'explains why'],
        ['example', 'supports the reason'],
        ['conclusion', 'closes the paragraph']
      ]),

      listen('Listening', 'The family packed their luggage, boarded the train, and joined a guided tour at the Grand Egyptian Museum.', 'What did the family do after boarding the train?', ['They joined a guided tour', 'They watered plants', 'They repaired a car', 'They went fishing'], 'They joined a guided tour'),
      listen('Listening', 'Yesterday, the students visited Benban Solar Park. They learned that thousands of solar panels turn sunlight into electricity.', 'What do the solar panels use?', ['Sunlight', 'Oil', 'Wood', 'Plastic'], 'Sunlight'),
      mcq('Pronunciation', 'Which past verb ends with the /ɪd/ sound?', ['wanted', 'played', 'washed', 'helped'], 'wanted'),
      mcq('Pronunciation', 'Which past verb ends with the /t/ sound?', ['washed', 'played', 'needed', 'visited'], 'washed'),
      reorder('Mixed', 'Build a correct past-simple question.', ['Did', 'the students', 'visit', 'the museum', 'yesterday'], ['Did', 'the students', 'visit', 'the museum', 'yesterday']),
      correction('Mixed', 'Correct the highlighted word: She **buyed** a souvenir at the museum shop.', 'buyed', 'bought')
    ],

    u6: [
      mcq('Vocabulary', 'Water that falls slowly, drop by drop, can ______ from a tap.', ['drip', 'weave', 'harvest', 'shine'], 'drip'),
      fill('Vocabulary', 'A small amount of water on the floor is a ______.', 'puddle'),
      mcq('Vocabulary', 'Water may ______ when a container becomes too full.', ['overflow', 'decorate', 'board', 'research'], 'overflow'),
      fill('Vocabulary', 'A broken tap or pipe can cause a water ______.', 'leak'),
      mcq('Vocabulary', 'A long flexible tube used to carry water is a ______.', ['hose', 'loom', 'brochure', 'brick'], 'hose'),
      match('Vocabulary', 'Match each word to the correct description.', [
        ['tap', 'controls water flow'],
        ['pipe', 'carries water through a building'],
        ['leak', 'water escaping from a broken place'],
        ['drop', 'a very small amount of liquid']
      ]),

      mcq('Grammar', 'Students ______ close the tap after using it.', ['should', 'shouldn’t', 'didn’t', 'are'], 'should'),
      fill('Grammar', 'We ______ waste clean water.', 'mustn’t'),
      correction('Grammar', 'Correct the highlighted word: The tap **are leaking** now.', 'are leaking', 'is leaking'),
      mcq('Grammar', 'Yesterday, the Water Savers ______ posters around the school.', ['made', 'make', 'makes', 'are making'], 'made'),
      correction('Grammar', 'Correct the highlighted word: The children **can to repair** every pipe alone.', 'can to repair', 'can repair'),
      reorder('Grammar', 'Put the words in the correct order.', ['Every', 'drop', 'of water', 'counts'], ['Every', 'drop', 'of water', 'counts']),

      tf('Reading', 'The Water Savers notice a water problem and work together to solve it.', true),
      mcq('Reading', 'What should students do when they see a leaking tap?', ['Tell an adult and help report it', 'Leave it running', 'Hide the problem', 'Use more water'], 'Tell an adult and help report it'),
      mcq('Reading', 'Why do the children make posters?', ['To remind the school community to save water', 'To advertise a new car', 'To decorate a museum', 'To teach furniture making'], 'To remind the school community to save water'),
      tf('Reading', 'A small leak can waste a lot of water over time.', true),
      orderSentences('Reading', 'Put the campaign events in the correct order.', [
        'The school used less water.',
        'The children noticed a leak.',
        'They made a plan.',
        'They put up posters and checked taps.'
      ], [
        'The children noticed a leak.',
        'They made a plan.',
        'They put up posters and checked taps.',
        'The school used less water.'
      ]),
      match('Reading', 'Match each problem to the best action.', [
        ['leaking tap', 'report and repair it'],
        ['hose left running', 'turn it off'],
        ['water on the floor', 'find the source and clean safely'],
        ['overflowing tank', 'close the water supply and get help']
      ]),

      mcq('Writing', 'Which title is best for a water-saving poster?', ['Every Drop Counts!', 'Buy More Luggage!', 'Visit the Museum!', 'Make Furniture Today!'], 'Every Drop Counts!'),
      mcq('Writing', 'Which sentence gives clear advice?', ['Turn off the tap while brushing your teeth.', 'Water is a noun.', 'Yesterday was Tuesday.', 'The museum is ancient.'], 'Turn off the tap while brushing your teeth.'),
      orderSentences('Writing', 'Arrange the campaign paragraph.', [
        'Finally, our school used less water.',
        'First, we found several leaking taps.',
        'Then, we reported them and made posters.',
        'Next, workers repaired the leaks.'
      ], [
        'First, we found several leaking taps.',
        'Then, we reported them and made posters.',
        'Next, workers repaired the leaks.',
        'Finally, our school used less water.'
      ]),
      correction('Writing', 'Correct the highlighted word: Students **shouldn’t leaves** taps open.', 'shouldn’t leaves', 'shouldn’t leave'),
      fill('Writing', 'Complete the slogan: Save water, save our ______.', 'future'),
      match('Writing', 'Match each poster feature to its purpose.', [
        ['short slogan', 'easy to remember'],
        ['large title', 'catches attention'],
        ['clear picture', 'shows the message'],
        ['action sentence', 'tells people what to do']
      ]),

      listen('Listening', 'During break time, Lina hears water dripping. She finds a leaking tap near the playground and tells the teacher immediately.', 'What does Lina do after finding the leak?', ['She tells the teacher', 'She ignores it', 'She opens another tap', 'She goes home'], 'She tells the teacher'),
      listen('Listening', 'The Water Savers check taps, make posters, and ask everyone to use only the water they need.', 'What is the main goal of the group?', ['To save water', 'To build a museum', 'To travel abroad', 'To grow cotton'], 'To save water'),
      mcq('Pronunciation', 'Which word begins with the same sound as “water”?', ['window', 'future', 'pipe', 'save'], 'window'),
      mcq('Pronunciation', 'Which word has one syllable?', ['leak', 'water', 'puddle', 'overflow'], 'leak'),
      reorder('Mixed', 'Build a correct advice sentence.', ['We', 'should', 'use', 'only', 'the water', 'we need'], ['We', 'should', 'use', 'only', 'the water', 'we need']),
      correction('Mixed', 'Correct the highlighted word: Yesterday, the students **make** a water-saving poster.', 'make', 'made')
    ]
  };

  Object.entries(BANKS).forEach(([unitId, questions]) => {
    const unit = window.COURSE_DATA.units.find((item) => item.id === unitId);
    if (unit) unit.bank = questions;
  });
})();
