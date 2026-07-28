(() => {
  'use strict';

  const COURSE = window.COURSE_DATA;

  const q = {
    mcq: (category, prompt, options, answer, explanation = '') => ({ type: 'mcq', category, prompt, options, answer, explanation }),
    fill: (category, prompt, answer, hint = '', explanation = '') => ({ type: 'fill', category, prompt, answer, hint, explanation }),
    correction: (category, prompt, answer, explanation = '') => ({ type: 'correction', category, prompt, answer, hint: 'Write the correct word only.', explanation }),
    reorder: (category, prompt, words, answer, explanation = '') => ({ type: 'reorder', category, prompt, words, answer, explanation }),
    orderSentences: (category, prompt, sentences, answer, explanation = '') => ({ type: 'order-sentences', category, prompt, sentences, answer, explanation }),
    match: (category, prompt, pairs, explanation = '') => ({ type: 'match', category, prompt, pairs, explanation }),
    drag: (category, prompt, groups, explanation = '') => ({ type: 'drag-drop', category, prompt, groups, explanation }),
    tf: (category, prompt, answer, explanation = '') => ({ type: 'truefalse', category, prompt, answer, explanation }),
    listen: (category, audio, prompt, options, answer, explanation = '') => ({ type: 'listening-mcq', category, audio, prompt, options, answer, explanation })
  };

  const DRAG_SETS = {
    u1l1: [
      { prompt: 'Drag each activity to the person who usually does it.', groups: [
        { name: 'Tourists and visitors', items: ['buy souvenirs', 'visit ancient sites', 'take photos'] },
        { name: 'Local workers and performers', items: ['make furniture', 'play music'] }
      ] },
      { prompt: 'Drag each action to the correct place.', groups: [
        { name: 'Traditional market', items: ['buy souvenirs'] },
        { name: 'Workshop in Damietta', items: ['make furniture'] },
        { name: 'Historical place', items: ['visit ancient sites', 'take photos'] },
        { name: 'Small museum', items: ['learn about old coins'] }
      ] }
    ],
    u1l2: [
      { prompt: 'Drag the words into sea features or land features.', groups: [
        { name: 'Sea and marine features', items: ['coral reefs', 'marine life', 'colorful fish'] },
        { name: 'Land and coastal features', items: ['mountains', 'landscape', 'mangrove trees'] }
      ] },
      { prompt: 'Drag each action into visitor activity or protection action.', groups: [
        { name: 'Visitor activities', items: ['snorkel', 'swim', 'dive'] },
        { name: 'Protection actions', items: ['follow the rules', 'keep the park clean', 'protect animals'] }
      ] }
    ],
    u1l3: [
      { prompt: 'Drag the words to the correct village job.', groups: [
        { name: 'Fishing', items: ['fishermen', 'fishing net', 'boats'] },
        { name: 'Weaving', items: ['looms', 'dye', 'wool'] },
        { name: 'Farming', items: ['harvest', 'crops', 'farmers'] }
      ] },
      { prompt: 'Drag each step into the correct process.', groups: [
        { name: 'Making woven products', items: ['spin the wool', 'dye the wool', 'weave on looms'] },
        { name: 'Catching fish', items: ['leave early in boats', 'use fishing nets', 'bring fish to the village'] }
      ] }
    ],
    u1l4: [
      { prompt: 'Drag each school action to the correct part of the day.', groups: [
        { name: 'Morning assembly', items: ['stand in line', 'salute the flag', 'sing the national anthem'] },
        { name: 'Break time', items: ['eat a sandwich', 'chat with friends', 'play in the playground'] },
        { name: 'After school', items: ['go home', 'eat lunch', 'do homework'] }
      ] },
      { prompt: 'Drag each item to the correct part of an informal email.', groups: [
        { name: 'Opening', items: ['Hi Sam,', 'How are you?'] },
        { name: 'Main body', items: ['details about the school day', 'times and activities'] },
        { name: 'Closing', items: ['Bye for now,', 'Ahmed'] }
      ] }
    ],
    u1l5: [
      { prompt: 'Drag each poster element to its job.', groups: [
        { name: 'Catches attention', items: ['main header', 'large title'] },
        { name: 'Shows the idea visually', items: ['pictures', 'drawings'] },
        { name: 'Explains the information', items: ['detailed description', 'short factual sentences'] }
      ] },
      { prompt: 'Drag each feature into strong poster or weak poster.', groups: [
        { name: 'Strong poster', items: ['clear title', 'organized sections', 'useful pictures', 'accurate sentences'] },
        { name: 'Weak poster', items: ['tiny title', 'random order', 'unrelated picture', 'unclear sentence'] }
      ] }
    ],
    u2l1: [
      { prompt: 'Drag each item into plant care or plant problem.', groups: [
        { name: 'Plant care', items: ['water the plants', 'add natural fertilizer', 'check for insects'] },
        { name: 'Plant problems', items: ['weeds', 'dry soil', 'harmful insects'] }
      ] },
      { prompt: 'Drag each word into plant, herb, or action.', groups: [
        { name: 'Herbs and plants', items: ['hibiscus', 'basil', 'mint'] },
        { name: 'Care actions', items: ['pull out', 'water', 'grow'] }
      ] }
    ],
    u2l2: [
      { prompt: 'Drag each detail to the correct Egyptian city.', groups: [
        { name: 'Alexandria', items: ['windy and rainy', 'wet streets', 'dark clouds'] },
        { name: 'Cairo', items: ['warm and sunny', 'children playing in parks', 'clear sky'] },
        { name: 'Aswan', items: ['hot weather', 'strong sun', 'people resting in the shade'] }
      ] },
      { prompt: 'Drag each sentence into happening now or general weather fact.', groups: [
        { name: 'Happening now', items: ['People are walking in the streets.', 'Children are playing in the park.', 'Farmers are watering plants.'] },
        { name: 'General fact', items: ['Alexandria often has winter rain.', 'Aswan is usually hot.', 'Weather can change from city to city.'] }
      ] }
    ],
    u2l3: [
      { prompt: 'Drag each detail into animals, river facts, or history.', groups: [
        { name: 'Animals', items: ['kingfisher', 'crocodile', 'tilapia'] },
        { name: 'River facts', items: ['flows south to north', 'provides water', 'supports travel'] },
        { name: 'History', items: ['flooded the land', 'brought rich soil', 'temples were built nearby'] }
      ] },
      { prompt: 'Drag each sentence into past or present.', groups: [
        { name: 'Past', items: ['The Nile flooded the land.', 'Ancient Egyptians built temples.', 'Farmers used rich soil.'] },
        { name: 'Present', items: ['The Nile flows through Egypt.', 'Tilapia live in the river.', 'People depend on the Nile.'] }
      ] }
    ],
    u2l4: [
      { prompt: 'Drag each detail into place, person, or object.', groups: [
        { name: 'Places', items: ['Wadi El Rayan', 'Wadi El-Hitan', 'Fayoum'] },
        { name: 'People', items: ['students', 'guide', 'Mr. Ahmed'] },
        { name: 'Objects and discoveries', items: ['camera', 'fossil', 'whale skeleton'] }
      ] },
      { prompt: 'Drag each story detail into setting, problem, or solution.', groups: [
        { name: 'Setting', items: ['lakes and waterfalls', 'sand dunes', 'fossil museum'] },
        { name: 'Problem', items: ['the camera was missing'] },
        { name: 'Solution', items: ['Mr. Ahmed found it under a bench'] }
      ] }
    ],
    u2l5: [
      { prompt: 'Drag each detail to the correct fact-card section.', groups: [
        { name: 'Habitat', items: ['desert', 'river', 'wetland'] },
        { name: 'Weather', items: ['hot', 'dry', 'sunny'] },
        { name: 'Special fact', items: ['what it eats', 'whether it is dangerous', 'a special body feature'] }
      ] },
      { prompt: 'Drag each animal to a suitable habitat.', groups: [
        { name: 'Desert', items: ['camel', 'desert fox'] },
        { name: 'River or wetland', items: ['Nile crocodile', 'kingfisher', 'tilapia'] }
      ] }
    ],
    u3l1: [
      { prompt: 'Drag each job to the work it does.', groups: [
        { name: 'Health and emergencies', items: ['paramedic'] },
        { name: 'Buildings and design', items: ['architect'] },
        { name: 'Water services', items: ['water resources engineer'] },
        { name: 'Vehicles', items: ['mechanic'] },
        { name: 'Clothes', items: ['tailor'] },
        { name: 'Road safety', items: ['traffic officer'] }
      ] },
      { prompt: 'Drag each action to the correct worker.', groups: [
        { name: 'Paramedic', items: ['helps injured people', 'works in emergencies'] },
        { name: 'Mechanic', items: ['fixes engines', 'repairs vehicles'] },
        { name: 'Traffic officer', items: ['stops cars', 'helps people cross safely'] }
      ] }
    ],
    u3l2: [
      { prompt: 'Drag each community problem to the best solution.', groups: [
        { name: 'Litter', items: ['use rubbish bins', 'organize a clean-up', 'make posters'] },
        { name: 'Dangerous traffic', items: ['walk or ride bikes', 'ask a traffic officer for help', 'put up safety signs'] },
        { name: 'Wasted water', items: ['report leaks', 'turn off taps', 'change daily habits'] }
      ] },
      { prompt: 'Drag each action into helpful or unhelpful.', groups: [
        { name: 'Helpful', items: ['bring garbage bags', 'ride bikes', 'work together'] },
        { name: 'Unhelpful', items: ['drop litter', 'ignore a leak', 'drive too fast near school'] }
      ] }
    ],
    u3l3: [
      { prompt: 'Drag each quality to the correct character.', groups: [
        { name: 'Rose at the beginning', items: ['proud', 'unkind', 'judges appearance'] },
        { name: 'Cactus', items: ['patient', 'kind', 'helpful'] },
        { name: 'Rose at the end', items: ['embarrassed', 'sorry', 'changed'] }
      ] },
      { prompt: 'Drag each detail to the correct story stage.', groups: [
        { name: 'Beginning', items: ['the rose laughs at the cactus'] },
        { name: 'Problem', items: ['the summer is very hot', 'the rose becomes thirsty'] },
        { name: 'Turning point', items: ['a bird drinks from the cactus'] },
        { name: 'Solution', items: ['the rose apologizes', 'the cactus shares water'] }
      ] }
    ],
    u3l4: [
      { prompt: 'Drag each fact to the correct biography section.', groups: [
        { name: 'Early life', items: ['born in Egypt in 1933', 'loved learning', 'studied at Ain Shams University'] },
        { name: 'Career', items: ['continued research in the United States', 'became a global expert'] },
        { name: 'Achievements', items: ['El-Sayed’s Rule', 'gold nanoparticle research', 'major awards'] }
      ] },
      { prompt: 'Drag each statement into fact or opinion.', groups: [
        { name: 'Biography fact', items: ['He studied chemistry.', 'He worked in nanoscience.', 'He received important awards.'] },
        { name: 'Writer’s opinion', items: ['He is an inspiring hero.', 'His work is amazing.'] }
      ] }
    ],
    u3l5: [
      { prompt: 'Drag each idea into cause, effect, or solution for food waste.', groups: [
        { name: 'Causes', items: ['people prepare too much food', 'restaurants throw away leftovers'] },
        { name: 'Effects', items: ['money and water are wasted', 'more pollution', 'poor people may not get food'] },
        { name: 'Solutions', items: ['plan meals', 'support food banks', 'store food properly'] }
      ] },
      { prompt: 'Drag each feature into a strong problem-solving poster.', groups: [
        { name: 'Information', items: ['causes', 'effects', 'solutions'] },
        { name: 'Design', items: ['main heading', 'subheadings', 'clear pictures'] }
      ] }
    ],
    u4l1: [
      { prompt: 'Drag each material to its common ancient use.', groups: [
        { name: 'Building', items: ['granite', 'bricks', 'colored stones'] },
        { name: 'Writing', items: ['papyrus'] },
        { name: 'Objects and decoration', items: ['gold', 'clay'] }
      ] },
      { prompt: 'Drag each material into natural material or made product.', groups: [
        { name: 'Natural material', items: ['granite', 'gold', 'clay'] },
        { name: 'Made product', items: ['brick', 'papyrus sheet', 'decorated object'] }
      ] }
    ],
    u4l2: [
      { prompt: 'Drag each action into saves energy or wastes energy.', groups: [
        { name: 'Saves energy', items: ['turn off lights', 'use natural light', 'choose solar power'] },
        { name: 'Wastes energy', items: ['leave lights on', 'run empty machines', 'ignore open doors with air conditioning'] }
      ] },
      { prompt: 'Drag each source into renewable or non-renewable.', groups: [
        { name: 'Renewable', items: ['sunlight', 'wind', 'moving water'] },
        { name: 'Non-renewable', items: ['oil', 'coal', 'natural gas'] }
      ] }
    ],
    u4l3: [
      { prompt: 'Drag each resource to its use.', groups: [
        { name: 'Iron', items: ['machines', 'building frames'] },
        { name: 'Gold', items: ['jewelry', 'decoration'] },
        { name: 'Rock and stone', items: ['roads', 'buildings'] }
      ] },
      { prompt: 'Drag each step into before, during, or after a mineral survey.', groups: [
        { name: 'Before', items: ['research the area', 'prepare safety equipment'] },
        { name: 'During', items: ['collect samples', 'record locations'] },
        { name: 'After', items: ['test the samples', 'write a report'] }
      ] }
    ],
    u4l4: [
      { prompt: 'Drag each item into natural resource or man-made resource.', groups: [
        { name: 'Natural resource', items: ['sand', 'wood', 'water', 'metal ore'] },
        { name: 'Man-made resource', items: ['glass bottle', 'paper', 'brick', 'plastic container'] }
      ] },
      { prompt: 'Drag each material to a product made from it.', groups: [
        { name: 'Sand', items: ['glass'] },
        { name: 'Clay', items: ['bricks', 'pots'] },
        { name: 'Wood', items: ['furniture', 'paper'] }
      ] }
    ],
    u4l5: [
      { prompt: 'Drag each result into a benefit of the High Dam or not a benefit.', groups: [
        { name: 'High Dam benefit', items: ['flood control', 'irrigation water', 'electricity', 'reservoir storage'] },
        { name: 'Not a benefit', items: ['wasting electricity', 'polluting water', 'destroying roads'] }
      ] },
      { prompt: 'Drag each idea to the correct project section.', groups: [
        { name: 'Purpose', items: ['manage Nile water', 'reduce dangerous floods'] },
        { name: 'Benefits', items: ['support farming', 'produce electricity'] },
        { name: 'Care and responsibility', items: ['inspect the dam', 'consider environmental effects'] }
      ] }
    ],
    u5l1: [
      { prompt: 'Drag each item into travel document, luggage item, or museum activity.', groups: [
        { name: 'Travel document', items: ['passport', 'ticket'] },
        { name: 'Travel item', items: ['luggage', 'brochure'] },
        { name: 'Museum activity', items: ['guided tour', 'visit an exhibition', 'buy a souvenir'] }
      ] },
      { prompt: 'Drag each action into before the trip or during the visit.', groups: [
        { name: 'Before the trip', items: ['pack luggage', 'check the passport', 'read the brochure'] },
        { name: 'During the visit', items: ['join a guided tour', 'view the exhibition', 'buy a souvenir'] }
      ] }
    ],
    u5l2: [
      { prompt: 'Drag each idea into old problem or modern solution.', groups: [
        { name: 'Old problem', items: ['overcrowded city', 'long travel time', 'limited services'] },
        { name: 'Modern solution', items: ['smart city', 'new roads', 'cable car', 'sustainable design'] }
      ] },
      { prompt: 'Drag each feature to nature, transport, or city design.', groups: [
        { name: 'Nature', items: ['beach', 'mountain'] },
        { name: 'Transport', items: ['cable car', 'new road'] },
        { name: 'City design', items: ['smart systems', 'sustainable buildings'] }
      ] }
    ],
    u5l3: [
      { prompt: 'Drag each idea into division or unity.', groups: [
        { name: 'Division', items: ['the sons argue', 'each stick breaks easily', 'the family is weak'] },
        { name: 'Unity', items: ['the bundle is strong', 'the sons cooperate', 'the family succeeds together'] }
      ] },
      { prompt: 'Drag each detail to the correct story element.', groups: [
        { name: 'Problem', items: ['the sons keep arguing'] },
        { name: 'Father’s lesson', items: ['he gives them a bundle of sticks'] },
        { name: 'Result', items: ['they understand the strength of unity'] },
        { name: 'Moral', items: ['together we are stronger'] }
      ] }
    ],
    u5l4: [
      { prompt: 'Drag each idea into clean-energy action or environmental benefit.', groups: [
        { name: 'Clean-energy action', items: ['build solar projects', 'use strong sunlight', 'expand renewable energy'] },
        { name: 'Environmental benefit', items: ['reduce pollution', 'save fossil fuels', 'protect the future'] }
      ] },
      { prompt: 'Drag each sentence to the correct opinion-paragraph part.', groups: [
        { name: 'Opinion', items: ['Solar projects are important.'] },
        { name: 'Reason', items: ['They reduce pollution.'] },
        { name: 'Example', items: ['Benban uses Egypt’s strong sunlight.'] },
        { name: 'Conclusion', items: ['Clean energy should be expanded.'] }
      ] }
    ],
    u5l5: [
      { prompt: 'Drag each display-board element to its purpose.', groups: [
        { name: 'Title', items: ['names the object', 'catches attention'] },
        { name: 'Caption', items: ['explains the picture', 'gives a short key detail'] },
        { name: 'Facts', items: ['tell age, material, and use'] },
        { name: 'Layout', items: ['keeps information organized'] }
      ] },
      { prompt: 'Drag each fact into object description or board design.', groups: [
        { name: 'Object description', items: ['material', 'age', 'use', 'symbols'] },
        { name: 'Board design', items: ['large title', 'clear picture', 'balanced layout'] }
      ] }
    ],
    u6l1: [
      { prompt: 'Drag each word into water problem or water tool.', groups: [
        { name: 'Water problem', items: ['drip', 'overflow', 'puddle', 'leak'] },
        { name: 'Water tool or part', items: ['hose', 'tap', 'pipe'] }
      ] },
      { prompt: 'Drag each sign into possible leak or normal use.', groups: [
        { name: 'Possible leak', items: ['water dripping', 'a puddle in the hallway', 'a wet pipe'] },
        { name: 'Normal use', items: ['a closed tap', 'a dry floor', 'a hose turned off'] }
      ] }
    ],
    u6l2: [
      { prompt: 'Drag each idea into problem or responsible action.', groups: [
        { name: 'Problem', items: ['a leaking tap', 'water being wasted', 'a growing puddle'] },
        { name: 'Responsible action', items: ['notice the problem', 'report it', 'help get it fixed'] }
      ] },
      { prompt: 'Drag each action into saves water or wastes water.', groups: [
        { name: 'Saves water', items: ['close the tap', 'report a leak', 'use only what you need'] },
        { name: 'Wastes water', items: ['leave water running', 'ignore a puddle', 'overflow a sink'] }
      ] }
    ],
    u6l3: [
      { prompt: 'Drag each item into campaign tool or campaign action.', groups: [
        { name: 'Campaign tools', items: ['poster', 'slogan', 'mini-challenge'] },
        { name: 'Campaign actions', items: ['spread the message', 'visit classrooms', 'work as a team'] }
      ] },
      { prompt: 'Drag each idea into planning or teamwork.', groups: [
        { name: 'Planning', items: ['choose a goal', 'decide the steps', 'prepare materials'] },
        { name: 'Teamwork', items: ['share jobs', 'listen to ideas', 'help one another'] }
      ] }
    ],
    u6l4: [
      { prompt: 'Drag each action into report, repair, or conserve.', groups: [
        { name: 'Report', items: ['tell the teacher about a leak', 'write down the location'] },
        { name: 'Repair', items: ['fix the tap', 'replace a broken pipe'] },
        { name: 'Conserve', items: ['turn off water', 'use only what is needed'] }
      ] },
      { prompt: 'Drag each action into one-time action or daily habit.', groups: [
        { name: 'One-time action', items: ['repair a broken pipe', 'put up a new poster'] },
        { name: 'Daily habit', items: ['close taps carefully', 'check for leaks', 'avoid wasting water'] }
      ] }
    ],
    u6l5: [
      { prompt: 'Drag each detail into event, result, or moral.', groups: [
        { name: 'Event', items: ['students changed their habits', 'the team checked the school'] },
        { name: 'Result', items: ['the school used less water', 'the team received a certificate'] },
        { name: 'Moral', items: ['teamwork makes a difference', 'young people can protect resources'] }
      ] },
      { prompt: 'Drag each action into responsible or irresponsible.', groups: [
        { name: 'Responsible', items: ['report leaks', 'conserve water', 'help the team'] },
        { name: 'Irresponsible', items: ['ignore dripping water', 'leave taps open', 'waste clean water'] }
      ] }
    ]
  };


  const CORRECTION_TARGETS = {
    u1l1: [null, null, 'do', null],
    u1l2: [null, null, null, 'Does'],
    u1l4: [null, null, 'does', 'does'],
    u2l1: [null, null, null, 'give'],
    u2l4: [null, null, 'find', null],
    u2l5: [null, null, null, 'be'],
    u3l1: ['repair', null, null, 'help'],
    u3l2: ['bring', null, null, null],
    u4l2: [null, 'leave', null, null],
    u4l3: [null, 'pollute', null, null],
    u4l4: [null, 'waste', null, null],
    u5l1: ['join', null, null, 'buy'],
    u5l5: [null, null, null, 'see'],
    u6l3: ['make', null, null, null]
  };

  const IRREGULAR_VARIANTS = {
    make: ['make', 'makes', 'made', 'making'], buy: ['buy', 'buys', 'bought', 'buying'], take: ['take', 'takes', 'took', 'taking'],
    go: ['go', 'goes', 'went', 'going'], see: ['see', 'sees', 'saw', 'seeing'], find: ['find', 'finds', 'found', 'finding'],
    build: ['build', 'builds', 'built', 'building'], bring: ['bring', 'brings', 'brought', 'bringing'], grow: ['grow', 'grows', 'grew', 'growing'],
    leave: ['leave', 'leaves', 'left', 'leaving'], write: ['write', 'writes', 'wrote', 'writing'], eat: ['eat', 'eats', 'ate', 'eating'],
    give: ['give', 'gives', 'gave', 'giving'], become: ['become', 'becomes', 'became', 'becoming'], break: ['break', 'breaks', 'broke', 'breaking'],
    speak: ['speak', 'speaks', 'spoke', 'speaking'], catch: ['catch', 'catches', 'caught', 'catching'], teach: ['teach', 'teaches', 'taught', 'teaching']
  };

  const ERROR_MAP = {
    do: 'does', does: 'do', be: 'is', find: 'finds', leave: 'leaves', pollute: 'pollutes', protect: 'protects', consider: 'considers', act: 'acts', see: 'sees', join: 'joins', follow: 'follows', study: 'studies', recycle: 'recycles',
    visit: 'visits', visits: 'visit', make: 'makes', makes: 'make', play: 'plays', plays: 'play', take: 'takes', takes: 'take',
    buy: 'buys', buys: 'buy', has: 'have', have: 'has', is: 'are', are: 'is', am: 'is', was: 'were', were: 'was',
    snorkel: 'snorkels', grow: 'grows', grows: 'grow', catch: 'catches', catches: 'catch', spins: 'spin', spin: 'spins',
    accompanies: 'accompany', accompany: 'accompanies', harvest: 'harvests', harvests: 'harvest', starts: 'start', start: 'starts',
    salute: 'salutes', work: 'works', works: 'work', eat: 'eats', eats: 'eat', put: 'puts', water: 'waters', pull: 'pulls',
    give: 'gives', checking: 'check', wearing: 'wear', staying: 'stay', watering: 'water', flows: 'flow', live: 'lives', lives: 'live',
    flooded: 'flood', built: 'build', travelled: 'travel', traveled: 'travel', saw: 'see', found: 'find', repair: 'repairs',
    design: 'designs', help: 'helps', bring: 'brings', cross: 'crosses', laughed: 'laugh', judged: 'judge', became: 'become',
    grew: 'grow', looked: 'look', apologized: 'apologize', changed: 'change', studied: 'study', continued: 'continue', helps: 'help',
    waste: 'wastes', prepare: 'prepares', thrown: 'throw', wasted: 'waste', plan: 'plans', support: 'supports', used: 'use',
    use: 'uses', managed: 'manage', inspect: 'inspects', produces: 'produce', join: 'joins', pack: 'packs', read: 'reads',
    visited: 'visit', went: 'goed', ride: 'rode', did: 'does', argued: 'argue', brought: 'bring', tried: 'try', failed: 'fail',
    separated: 'separate', broke: 'break', reduce: 'reduces', decorated: 'decorate', displayed: 'display', noticed: 'notice',
    decided: 'decide', dripping: 'drip', leaking: 'leak', report: 'reports', fix: 'fixes', spread: 'spreads', explained: 'explain',
    demonstrated: 'demonstrate', reported: 'report', gave: 'give', makes: 'make', can: 'could', should: 'shoulds', must: 'musts'
  };

  const BASE_VERBS = new Set(Object.keys(ERROR_MAP));

  function cleanSentence(text) {
    return String(text || '').replace(/^(?:Affirmative|Third person|Negative|Question|Example|Examples):\s*/i, '').replace(/\s+/g, ' ').trim();
  }

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9’']/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function variantsFor(word) {
    const base = normalize(word);
    if (!base) return [];
    if (IRREGULAR_VARIANTS[base]) return IRREGULAR_VARIANTS[base];
    const values = new Set([base]);
    if (base.endsWith('y') && !/[aeiou]y$/.test(base)) values.add(`${base.slice(0, -1)}ies`);
    else {
      values.add(`${base}s`);
      values.add(`${base}es`);
    }
    if (base.endsWith('e')) values.add(`${base.slice(0, -1)}ing`);
    else values.add(`${base}ing`);
    if (base.endsWith('e')) values.add(`${base}d`);
    else values.add(`${base}ed`);
    return [...values];
  }

  function findPhrase(text, term) {
    const raw = String(text || '');
    const words = String(term || '').trim().split(/\s+/);
    if (!raw || !words.length) return null;
    const firstVariants = variantsFor(words[0]).sort((a, b) => b.length - a.length).map(escapeRegex).join('|');
    const rest = words.slice(1).map(escapeRegex).join('\\s+');
    const pattern = rest ? `\\b(?:${firstVariants})\\s+${rest}\\b` : `\\b(?:${firstVariants})\\b`;
    const match = raw.match(new RegExp(pattern, 'i'));
    if (!match) return null;
    return { answer: match[0], prompt: `${raw.slice(0, match.index)}______${raw.slice(match.index + match[0].length)}` };
  }

  function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function findGrammarTarget(sentence) {
    const tokens = cleanSentence(sentence).match(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g) || [];
    const priority = ['is', 'are', 'am', 'was', 'were', 'does', 'do', 'did', 'has', 'have'];
    for (const item of priority) {
      const token = tokens.find((word) => normalize(word) === item);
      if (token) return token;
    }
    for (const token of tokens) {
      const key = normalize(token);
      if (ERROR_MAP[key] && key.length > 2) return token;
    }
    return tokens.find((word) => word.length > 4) || tokens[1] || tokens[0] || '';
  }

  function clozeSingleWord(sentence, target) {
    const raw = cleanSentence(sentence);
    if (!raw || !target) return null;
    const rx = new RegExp(`\\b${escapeRegex(target)}\\b`, 'i');
    const match = raw.match(rx);
    if (!match) return null;
    return { prompt: raw.replace(rx, '______'), answer: match[0] };
  }

  function corruptSentence(sentence, variant = 0, forcedTarget = null) {
    const raw = cleanSentence(sentence);
    const tokens = raw.match(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g) || [];
    const candidates = tokens.filter((token, index) => {
      const key = normalize(token);
      if (!ERROR_MAP[key]) return false;
      if (['can', 'could', 'must', 'should', 'will', 'would', 'may', 'might'].includes(key)) return false;
      if (index === 0 && /^[A-Z]/.test(token) && ['water', 'people', 'students', 'families', 'visitors', 'tourists'].includes(key)) return false;
      return true;
    });
    const forced = forcedTarget ? tokens.find((token) => normalize(token) === normalize(forcedTarget)) : null;
    const correct = forced || candidates[variant % Math.max(candidates.length, 1)] || findGrammarTarget(raw);
    const key = normalize(correct);
    const wrong = ERROR_MAP[key] || `${correct}s`;
    const rx = new RegExp(`\\b${escapeRegex(correct)}\\b`, 'i');
    return {
      prompt: `Correct the highlighted word. Write the correct word only: ${raw.replace(rx, `**${wrong}**`)}`,
      answer: correct,
      explanation: `The correct form is “${correct}”. Only that word is required.`
    };
  }

  function collectClozes(lesson) {
    const out = [];
    const seen = new Set();
    const add = (item, category = 'Vocabulary') => {
      if (!item) return;
      const key = normalize(item.prompt);
      if (!key || seen.has(key)) return;
      seen.add(key);
      out.push({ ...item, category });
    };
    const details = lesson.details || {};
    (details.vocabularyDetails || []).forEach((item) => add(findPhrase(item.example, item.term), 'Vocabulary'));
    (details.grammar?.forms || []).forEach((form) => {
      const sentence = cleanSentence(form);
      add(clozeSingleWord(sentence, findGrammarTarget(sentence)), 'Grammar');
    });
    const sources = [lesson.summary, lesson.reading, details.writing?.model || '', ...(details.reading || [])];
    for (const source of sources) {
      for (const term of lesson.vocab || []) add(findPhrase(source, term), source === details.writing?.model ? 'Writing' : 'Reading');
    }
    const fallbackWords = (lesson.vocab || []).map((term) => String(term).split(' ')[0]);
    for (const source of sources) {
      for (const word of fallbackWords) add(clozeSingleWord(source, word), 'Reading');
    }
    return out;
  }

  function uniqueOptions(correct, pool, count = 4) {
    const values = [correct];
    for (const item of pool) {
      if (values.length >= count) break;
      if (normalize(item) !== normalize(correct) && !values.some((value) => normalize(value) === normalize(item))) values.push(item);
    }
    while (values.length < count) values.push(['usually', 'carefully', 'yesterday', 'quickly'][values.length - 1]);
    if (values.length > 2) return [values[1], values[0], ...values.slice(2)];
    return values;
  }

  function sentenceTokens(sentence) {
    return cleanSentence(sentence).replace(/[?.!]/g, '').split(/\s+/).filter(Boolean);
  }

  function splitSentences(text) {
    return String(text || '')
      .split(/\n+|(?<=[.!?])\s+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 3)
      .map((item) => item.replace(/^[•-]\s*/, ''));
  }

  function sentencePairs(forms) {
    return forms.slice(0, 4).map((form) => {
      const words = sentenceTokens(form);
      const cut = Math.max(1, Math.min(words.length - 1, Math.ceil(words.length / 2)));
      return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
    });
  }

  function readingQuestionFromExisting(lesson, fallbackOptions) {
    const existing = (lesson.questions || []).find((item) => item.type === 'mcq');
    if (existing) return q.mcq('Reading', existing.prompt, existing.options, existing.answer, 'This answer comes directly from the lesson content.');
    return q.mcq('Reading', `Which title best matches this lesson?`, uniqueOptions(lesson.title, fallbackOptions), lesson.title, 'The title summarizes the lesson topic.');
  }

  function buildLessonQuestions(unit, lesson, allLessonTitles) {
    const clozes = collectClozes(lesson);
    const answerPool = [...clozes.map((item) => item.answer), ...(lesson.vocab || [])];
    const forms = (lesson.details?.grammar?.forms || []).map(cleanSentence).filter(Boolean);
    while (forms.length < 4) forms.push(cleanSentence(lesson.details?.vocabularyDetails?.[forms.length]?.example || lesson.summary));
    const corrections = forms.slice(0, 4).map((form, index) => corruptSentence(form, index, CORRECTION_TARGETS[lesson.id]?.[index] || null));
    const questions = [];

    const mcqClozes = clozes.slice(0, 6);
    mcqClozes.forEach((item) => questions.push(q.mcq(item.category || 'Vocabulary', `Choose the best word or phrase: ${item.prompt}`, uniqueOptions(item.answer, answerPool), item.answer, `The complete sentence uses “${item.answer}”.`)));

    const grammarCorrection = corrections[0];
    const wrongMatch = grammarCorrection.prompt.match(/\*\*(.*?)\*\*/);
    const wrongWord = wrongMatch ? wrongMatch[1] : `${grammarCorrection.answer}s`;
    questions.push(q.mcq('Grammar', grammarCorrection.prompt.replace(/Correct the highlighted word\. Write the correct word only:\s*/i, 'Choose the correct word: ').replace(/\*\*(.*?)\*\*/g, '______'), uniqueOptions(grammarCorrection.answer, [wrongWord, 'is', 'are', 'does']), grammarCorrection.answer, grammarCorrection.explanation));
    questions.push(readingQuestionFromExisting(lesson, allLessonTitles));

    const fillClozes = clozes.slice(6, 11);
    fillClozes.forEach((item, index) => questions.push(q.fill(item.category || (index === 4 ? 'Writing' : 'Reading'), `Complete the sentence with one lesson word or phrase: ${item.prompt}`, item.answer, 'Use the lesson context.', `The complete sentence uses “${item.answer}”.`)));
    while (questions.filter((item) => item.type === 'fill').length < 5) {
      const item = clozes[questions.filter((entry) => entry.type === 'fill').length % Math.max(clozes.length, 1)] || { prompt: `${lesson.title} is the lesson ______.`, answer: 'topic' };
      questions.push(q.fill('Writing', `Complete this lesson sentence: ${item.prompt}`, item.answer, 'Write only the missing word or phrase.', `The missing answer is “${item.answer}”.`));
    }

    corrections.forEach((item) => questions.push(q.correction('Grammar', item.prompt, item.answer, item.explanation)));

    forms.slice(0, 4).forEach((form, index) => questions.push(q.reorder(index < 3 ? 'Grammar' : 'Writing', `Order the words to rebuild lesson sentence ${index + 1}.`, sentenceTokens(form), sentenceTokens(form), `Correct sentence: ${form}`)));

    const modelSentences = splitSentences(lesson.details?.writing?.model || lesson.writing);
    const readingSteps = (lesson.details?.reading || []).map(cleanSentence).filter(Boolean);
    const sequenceOne = (modelSentences.length >= 4 ? modelSentences : [...modelSentences, ...forms]).slice(0, 4);
    const sequenceTwo = (readingSteps.length >= 4 ? readingSteps : [...readingSteps, ...(lesson.details?.writing?.steps || [])]).slice(0, 4);
    questions.push(q.orderSentences('Writing', 'Put the writing ideas in the best order.', sequenceOne, sequenceOne, 'The order moves from an opening idea to supporting details and a clear ending.'));
    questions.push(q.orderSentences('Reading', 'Put the lesson ideas or events in the correct order.', sequenceTwo, sequenceTwo, 'The order follows the text or process in the lesson.'));

    const dragSets = DRAG_SETS[lesson.id] || [];
    dragSets.slice(0, 2).forEach((item, index) => questions.push(q.drag(index === 0 ? 'Vocabulary' : 'Reading', item.prompt, item.groups, 'Place each item in the group that matches its meaning and use in the lesson.')));

    const vocabPairs = (lesson.details?.vocabularyDetails || []).slice(0, 4).map((item) => {
      const cloze = findPhrase(item.example, item.term);
      return [item.term, cloze ? cloze.prompt : item.example];
    });
    questions.push(q.match('Vocabulary', 'Match each lesson word or phrase to the sentence where it fits.', vocabPairs, 'Use each word in its correct lesson context.'));
    questions.push(q.match('Grammar', 'Match each sentence beginning to the correct ending.', sentencePairs(forms), 'Each pair forms one grammatically correct sentence.'));

    const trueFact = cleanSentence(lesson.details?.vocabularyDetails?.[0]?.example || lesson.details?.reading?.[0] || lesson.summary);
    const falseSource = lesson.details?.vocabularyDetails?.[1] || lesson.details?.vocabularyDetails?.[0];
    const falseCloze = falseSource ? findPhrase(falseSource.example, falseSource.term) : null;
    const falseReplacement = lesson.vocab?.find((term) => normalize(term) !== normalize(falseSource?.term)) || 'a different topic';
    const falseFact = falseCloze ? falseCloze.prompt.replace('______', falseReplacement) : `This lesson is mainly about ${allLessonTitles.find((title) => title !== lesson.title)}.`;
    questions.push(q.tf('Reading', trueFact, true, 'This fact is stated in the lesson.'));
    questions.push(q.tf('Reading', falseFact, false, 'The highlighted idea does not match the lesson text.'));

    const listeningAnswer = lesson.vocab?.[0] || lesson.title;
    const listeningOptions = uniqueOptions(listeningAnswer, lesson.vocab?.slice(1) || allLessonTitles);
    const audio = `${lesson.reading} ${lesson.details?.vocabularyDetails?.[0]?.example || ''}`;
    questions.push(q.listen('Listening', audio, 'Which lesson word or idea is mentioned in the audio?', listeningOptions, listeningAnswer, `The audio mentions “${listeningAnswer}”.`));

    const seen = new Set();
    const deduped = [];
    for (const item of questions) {
      const key = `${item.type}|${normalize(item.prompt)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }
    while (deduped.length < 30) {
      const index = deduped.length;
      const source = clozes[index % Math.max(clozes.length, 1)] || { prompt: `${lesson.title} is the lesson ______.`, answer: 'topic', category: 'Mixed' };
      deduped.push(q.fill(index % 2 ? 'Writing' : 'Vocabulary', `Lesson check ${index + 1}: ${source.prompt}`, source.answer, 'Use the lesson content.', `The answer is “${source.answer}”.`));
    }
    return deduped.slice(0, 30);
  }

  function buildBankExtras(unit, lessonQuestionMap) {
    const extras = [];
    const lessons = unit.lessons;
    lessons.forEach((lesson, lessonIndex) => {
      const generated = lessonQuestionMap[lesson.id];
      const clozes = collectClozes(lesson);
      const bankCloze = clozes[11] || clozes[clozes.length - 1] || { prompt: `${lesson.title} is the lesson ______.`, answer: 'topic' };
      const pool = [...clozes.map((item) => item.answer), ...(lesson.vocab || [])];
      extras.push(q.mcq('Mixed', `Unit bank — ${bankCloze.prompt}`, uniqueOptions(bankCloze.answer, pool), bankCloze.answer, `The correct lesson word or phrase is “${bankCloze.answer}”.`));
      extras.push(generated.find((item) => item.type === 'drag-drop'));
      extras.push(generated.filter((item) => item.type === 'correction')[0]);
      if (lessonIndex < 3) extras.push(generated.filter((item) => item.type === 'correction')[1]);
      if ([0, 2, 4].includes(lessonIndex)) extras.push(generated.filter((item) => item.type === 'reorder')[lessonIndex === 4 ? 3 : lessonIndex]);
      if ([1, 3, 4].includes(lessonIndex)) extras.push(generated.filter((item) => item.type === 'order-sentences')[lessonIndex === 4 ? 1 : 0]);
    });
    return extras.filter(Boolean);
  }

  const allLessonTitles = COURSE.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.title));
  const lessonQuestionMap = {};
  COURSE.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => {
      lessonQuestionMap[lesson.id] = buildLessonQuestions(unit, lesson, allLessonTitles);
      lesson.questions = lessonQuestionMap[lesson.id];
    });
  });

  COURSE.units.forEach((unit) => {
    const originalNonCorrection = (unit.bank || []).filter((item) => item.type !== 'correction');
    const extras = buildBankExtras(unit, lessonQuestionMap);
    const combined = [...originalNonCorrection, ...extras];
    const seen = new Set();
    unit.bank = combined.filter((item) => {
      const key = `${item.type}|${normalize(item.prompt)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 50);

    if (unit.bank.length < 50) {
      for (const lesson of unit.lessons) {
        for (const item of lessonQuestionMap[lesson.id]) {
          if (unit.bank.length >= 50) break;
          const copy = JSON.parse(JSON.stringify(item));
          copy.prompt = `Unit mastery check — ${copy.prompt}`;
          const key = `${copy.type}|${normalize(copy.prompt)}`;
          if (!seen.has(key)) {
            seen.add(key);
            unit.bank.push(copy);
          }
        }
      }
    }
    unit.bank = unit.bank.slice(0, 50);
  });

  window.QUESTION_UPGRADE_REPORT = {
    lessonCounts: Object.fromEntries(COURSE.units.flatMap((unit) => unit.lessons.map((lesson) => [lesson.id, lesson.questions.length]))),
    bankCounts: Object.fromEntries(COURSE.units.map((unit) => [unit.id, unit.bank.length]))
  };
})();
