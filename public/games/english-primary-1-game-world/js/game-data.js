(() => {
  'use strict';
  const GAMES = {
  "u1l1": [
    {
      "id": "u1l1-g1",
      "title": "Hello Balloon Adventure",
      "engine": "dialogue",
      "icon": "🎈",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Listen, greet a new friend, and build the conversation."
    },
    {
      "id": "u1l1-g2",
      "title": "Friendship Penalty Cup",
      "engine": "penalty",
      "icon": "⚽",
      "theme": "stadium",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Choose the correct greeting to earn a gentle penalty kick."
    }
  ],
  "u1l2": [
    {
      "id": "u1l2-g1",
      "title": "T Sound Catcher",
      "engine": "phonics",
      "icon": "🔤",
      "theme": "sky",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Hear /t/ and catch table, tomato, tiger, teacher, and tree."
    },
    {
      "id": "u1l2-g2",
      "title": "Build the Letter T",
      "engine": "builder",
      "icon": "🧱",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 100,
      "description": "Put word pieces in order and build a strong T tower."
    }
  ],
  "u1l3": [
    {
      "id": "u1l3-g1",
      "title": "Classroom Treasure Hunt",
      "engine": "maze",
      "icon": "🎒",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Find the teacher, desk, chair, book, pencil, board, and bag."
    },
    {
      "id": "u1l3-g2",
      "title": "Teacher Says Runner",
      "engine": "runner",
      "icon": "🏃",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Run through the correct stand up, sit down, and open your book gates."
    }
  ],
  "u1l4": [
    {
      "id": "u1l4-g1",
      "title": "I Sound Bubble Pop",
      "engine": "phonics",
      "icon": "🫧",
      "theme": "sky",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Hear /ɪ/ and catch ink, insect, ill, and in."
    },
    {
      "id": "u1l4-g2",
      "title": "Ink Letter Puzzle",
      "engine": "puzzle",
      "icon": "🖋️",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 100,
      "description": "Solve simple beginning-letter clues to reveal the Ii picture."
    }
  ],
  "u2l1": [
    {
      "id": "u2l1-g1",
      "title": "Garden Explorer",
      "engine": "story",
      "icon": "🌳",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Explore the garden and discover grass, flowers, trees, birds, and butterflies."
    },
    {
      "id": "u2l1-g2",
      "title": "Butterfly Word Match",
      "engine": "memory",
      "icon": "🦋",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Match garden words with their picture clues."
    }
  ],
  "u2l2": [
    {
      "id": "u2l2-g1",
      "title": "S Sound Snake Catch",
      "engine": "phonics",
      "icon": "🐍",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Hear /s/ and catch sun, spoon, star, spider, and snake."
    },
    {
      "id": "u2l2-g2",
      "title": "Star Letter Builder",
      "engine": "builder",
      "icon": "⭐",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 100,
      "description": "Build short Ss words with large touch-friendly pieces."
    }
  ],
  "u2l3": [
    {
      "id": "u2l3-g1",
      "title": "Color Splash Studio",
      "engine": "simulation",
      "icon": "🎨",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Paint the grass green, sky blue, sun yellow, and flower red."
    },
    {
      "id": "u2l3-g2",
      "title": "Shape Car Race",
      "engine": "racing",
      "icon": "🏎️",
      "theme": "city",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Choose circles, squares, triangles, and rectangles to charge nitro."
    }
  ],
  "u2l4": [
    {
      "id": "u2l4-g1",
      "title": "Apple A Sound Catcher",
      "engine": "phonics",
      "icon": "🍎",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Hear /æ/ and catch ant, axe, apple, and arrow."
    },
    {
      "id": "u2l4-g2",
      "title": "Ant Maze Adventure",
      "engine": "maze",
      "icon": "🐜",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 100,
      "description": "Follow Aa clues through a gentle garden maze."
    }
  ],
  "u3l1": [
    {
      "id": "u3l1-g1",
      "title": "Family Tree Builder",
      "engine": "builder",
      "icon": "🌳",
      "theme": "home",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Place father, mother, brother, sister, grandmother, and grandfather."
    },
    {
      "id": "u3l1-g2",
      "title": "Family Memory House",
      "engine": "memory",
      "icon": "🏠",
      "theme": "home",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Match family members with names and simple clues."
    }
  ],
  "u3l2": [
    {
      "id": "u3l2-g1",
      "title": "N and P Sound Catcher",
      "engine": "phonics",
      "icon": "🎧",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /n/ and /p/ and catch the correct words."
    },
    {
      "id": "u3l2-g2",
      "title": "Pizza and Nose Puzzle",
      "engine": "puzzle",
      "icon": "🍕",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Sort Nn and Pp words to reveal the picture."
    }
  ],
  "u3l3": [
    {
      "id": "u3l3-g1",
      "title": "Number Train 1–5",
      "engine": "racing",
      "icon": "🚂",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Count objects from 1 to 5 and race the number train."
    },
    {
      "id": "u3l3-g2",
      "title": "Count and Collect Runner",
      "engine": "runner",
      "icon": "⭐",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Run to the gate with the correct number of objects."
    }
  ],
  "u3l4": [
    {
      "id": "u3l4-g1",
      "title": "H and D Sound Catcher",
      "engine": "phonics",
      "icon": "🎧",
      "theme": "home",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /h/ and /d/ and catch the correct words."
    },
    {
      "id": "u3l4-g2",
      "title": "House and Dog Builder",
      "engine": "builder",
      "icon": "🏡",
      "theme": "home",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Build short Hh and Dd words with picture clues."
    }
  ],
  "u4l1": [
    {
      "id": "u4l1-g1",
      "title": "Body Puzzle Builder",
      "engine": "builder",
      "icon": "🧍",
      "theme": "lab",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Build a friendly character from head to toes."
    },
    {
      "id": "u4l1-g2",
      "title": "Head-to-Toe Dance",
      "engine": "runner",
      "icon": "💃",
      "theme": "school",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Move to the body-part gate you hear or read."
    }
  ],
  "u4l2": [
    {
      "id": "u4l2-g1",
      "title": "R and E Sound Catcher",
      "engine": "phonics",
      "icon": "🐇",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /r/ and /e/ and catch rabbit, rocket, egg, and elephant."
    },
    {
      "id": "u4l2-g2",
      "title": "Rabbit and Egg Maze",
      "engine": "maze",
      "icon": "🥚",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Follow Rr and Ee clues to reach the treasure."
    }
  ],
  "u4l3": [
    {
      "id": "u4l3-g1",
      "title": "Five Senses Lab",
      "engine": "simulation",
      "icon": "🧪",
      "theme": "lab",
      "difficulty": "Easy",
      "reward": 130,
      "description": "Choose the correct body part for see, hear, smell, taste, and touch."
    },
    {
      "id": "u4l3-g2",
      "title": "Senses Detective",
      "engine": "detective",
      "icon": "🕵️",
      "theme": "lab",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Use picture clues to identify the correct sense."
    }
  ],
  "u4l4": [
    {
      "id": "u4l4-g1",
      "title": "C and K Sound Catcher",
      "engine": "phonics",
      "icon": "🐱",
      "theme": "sky",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /k/ and sort Cc and Kk words."
    },
    {
      "id": "u4l4-g2",
      "title": "Cat and Kite Builder",
      "engine": "builder",
      "icon": "🪁",
      "theme": "garden",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Build short Cc and Kk word patterns."
    }
  ],
  "u5l1": [
    {
      "id": "u5l1-g1",
      "title": "Farm Animal Adventure",
      "engine": "story",
      "icon": "🚜",
      "theme": "community",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Meet the cow, horse, duck, and chicken and compare big and small."
    },
    {
      "id": "u5l1-g2",
      "title": "Big or Small Penalty",
      "engine": "penalty",
      "icon": "⚽",
      "theme": "community",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Choose big or small to earn a friendly farmyard kick."
    }
  ],
  "u5l2": [
    {
      "id": "u5l2-g1",
      "title": "M and G Sound Catcher",
      "engine": "phonics",
      "icon": "🥛",
      "theme": "community",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /m/ and /g/ and catch milk, moon, goat, girl, and grapes."
    },
    {
      "id": "u5l2-g2",
      "title": "Milk and Grapes Memory",
      "engine": "memory",
      "icon": "🍇",
      "theme": "community",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Match Mm and Gg words with picture clues."
    }
  ],
  "u5l3": [
    {
      "id": "u5l3-g1",
      "title": "Number Race 6–10",
      "engine": "racing",
      "icon": "🏎️",
      "theme": "community",
      "difficulty": "Easy",
      "reward": 130,
      "description": "Count from 6 to 10 to charge nitro and finish the race."
    },
    {
      "id": "u5l3-g2",
      "title": "Farm Counting Mission",
      "engine": "simulation",
      "icon": "🐥",
      "theme": "community",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Count animals and place the correct number card."
    }
  ],
  "u5l4": [
    {
      "id": "u5l4-g1",
      "title": "O and F Sound Catcher",
      "engine": "phonics",
      "icon": "🐙",
      "theme": "waterpark",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /ɒ/ and /f/ and catch octopus, ostrich, fish, fan, and frog."
    },
    {
      "id": "u5l4-g2",
      "title": "Octopus and Fish Maze",
      "engine": "maze",
      "icon": "🐠",
      "theme": "waterpark",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Follow Oo and Ff clues through the underwater path."
    }
  ],
  "u6l1": [
    {
      "id": "u6l1-g1",
      "title": "Jungle Safari Quest",
      "engine": "story",
      "icon": "🦁",
      "theme": "zoo",
      "difficulty": "Easy",
      "reward": 130,
      "description": "Meet lions, tigers, elephants, monkeys, giraffes, and snakes."
    },
    {
      "id": "u6l1-g2",
      "title": "Animal Legs Detective",
      "engine": "detective",
      "icon": "🔍",
      "theme": "zoo",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Use simple clues to identify animals and count their legs."
    }
  ],
  "u6l2": [
    {
      "id": "u6l2-g1",
      "title": "B and L Sound Catcher",
      "engine": "phonics",
      "icon": "🍌",
      "theme": "zoo",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /b/ and /l/ and catch banana, ball, leaf, lamp, and lion."
    },
    {
      "id": "u6l2-g2",
      "title": "Banana and Lion Memory",
      "engine": "memory",
      "icon": "🦁",
      "theme": "zoo",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Match Bb and Ll words with their pictures."
    }
  ],
  "u6l3": [
    {
      "id": "u6l3-g1",
      "title": "Pet House Builder",
      "engine": "builder",
      "icon": "🐶",
      "theme": "home",
      "difficulty": "Easy",
      "reward": 130,
      "description": "Put the cat, dog, turtle, and bird in the correct places."
    },
    {
      "id": "u6l3-g2",
      "title": "Where Is My Pet?",
      "engine": "maze",
      "icon": "🐢",
      "theme": "home",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Follow in, on, and under clues to find every pet."
    }
  ],
  "u6l4": [
    {
      "id": "u6l4-g1",
      "title": "U and J Sound Catcher",
      "engine": "phonics",
      "icon": "☂️",
      "theme": "sky",
      "difficulty": "Easy",
      "reward": 120,
      "description": "Hear /ʌ/ and /dʒ/ and catch umbrella, under, jar, jam, and jacket."
    },
    {
      "id": "u6l4-g2",
      "title": "Umbrella Jam Puzzle",
      "engine": "puzzle",
      "icon": "🧩",
      "theme": "sky",
      "difficulty": "Easy",
      "reward": 110,
      "description": "Solve Uu and Jj beginning-letter clues."
    }
  ]
};
  const REVIEW_GAMES = [
  {
    "id": "review1-tournament",
    "reviewId": "review1",
    "title": "Rainbow School Championship",
    "engine": "tournament",
    "icon": "🌈",
    "reward": 500,
    "description": "Five friendly stages reviewing Units 1–3."
  },
  {
    "id": "review2-tournament",
    "reviewId": "review2",
    "title": "Primary 1 English Cup",
    "engine": "tournament",
    "icon": "🏆",
    "reward": 600,
    "description": "The final championship reviewing Units 4–6."
  }
];
  const ENGINE_LABELS = {
  "penalty": "Penalty Shootout",
  "dialogue": "Dialogue Adventure",
  "runner": "Adventure Runner",
  "phonics": "Phonics Action",
  "detective": "Detective Mission",
  "builder": "Build & Create",
  "racing": "Racing Challenge",
  "simulation": "Mission Simulator",
  "memory": "Memory Adventure",
  "story": "Story Quest",
  "maze": "Maze Adventure",
  "puzzle": "Puzzle Mission",
  "football": "Football Challenge",
  "tournament": "Tournament"
};
  window.GAME_DATA = { games: GAMES, reviews: REVIEW_GAMES, engineLabels: ENGINE_LABELS };
})();
