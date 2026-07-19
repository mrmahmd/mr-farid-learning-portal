(() => {
  'use strict';

  const GAMES = {
    u1l1: [
      { id: 'u1l1-g1', title: 'Greeting Penalty Shootout', engine: 'penalty', icon: '⚽', theme: 'stadium', difficulty: 'Easy', reward: 140, description: 'Answer correctly, aim your shot, and beat the goalkeeper.' },
      { id: 'u1l1-g2', title: 'Dialogue Builder Challenge', engine: 'dialogue', icon: '💬', theme: 'school', difficulty: 'Easy', reward: 120, description: 'Build friendly conversations in the correct order.' }
    ],
    u1l2: [
      { id: 'u1l2-g1', title: 'Classroom Rules Runner', engine: 'runner', icon: '🏃', theme: 'school', difficulty: 'Easy', reward: 140, description: 'Run through the correct classroom-rule gates.' },
      { id: 'u1l2-g2', title: 'WH Sound Storm', engine: 'phonics', icon: '🌪️', theme: 'sky', difficulty: 'Easy', reward: 120, description: 'Catch the correct wh words before time runs out.' }
    ],
    u1l3: [
      { id: 'u1l3-g1', title: 'Character Detective', engine: 'detective', icon: '🕵️', theme: 'city', difficulty: 'Easy', reward: 140, description: 'Use clues to identify the correct character.' },
      { id: 'u1l3-g2', title: 'Create a Character', engine: 'builder', icon: '🎨', theme: 'studio', difficulty: 'Easy', reward: 120, description: 'Build a character from appearance and personality clues.' }
    ],
    u1l4: [
      { id: 'u1l4-g1', title: 'Morning Rush Car Race', engine: 'racing', icon: '🏎️', theme: 'city', difficulty: 'Medium', reward: 170, description: 'Choose correct routine verbs to unlock nitro and win the race.' },
      { id: 'u1l4-g2', title: 'Routine Timeline Mission', engine: 'simulation', icon: '⏰', theme: 'home', difficulty: 'Easy', reward: 130, description: 'Plan the morning in the correct order before the school bus arrives.' }
    ],
    u2l1: [
      { id: 'u2l1-g1', title: 'Family Tree Builder', engine: 'builder', icon: '🌳', theme: 'home', difficulty: 'Easy', reward: 140, description: 'Place family members in the correct positions.' },
      { id: 'u2l1-g2', title: 'Family Memory Mansion', engine: 'memory', icon: '🏠', theme: 'home', difficulty: 'Easy', reward: 120, description: 'Match family words with pictures and clues.' }
    ],
    u2l2: [
      { id: 'u2l2-g1', title: 'Festival Adventure Quest', engine: 'story', icon: '🎉', theme: 'festival', difficulty: 'Medium', reward: 160, description: 'Travel through Egyptian celebrations and complete the story.' },
      { id: 'u2l2-g2', title: 'X-Sound Fireworks', engine: 'phonics', icon: '🎆', theme: 'night', difficulty: 'Easy', reward: 120, description: 'Tap words with the target x sound to launch fireworks.' }
    ],
    u2l3: [
      { id: 'u2l3-g1', title: 'Helping Hands Mission', engine: 'simulation', icon: '🤝', theme: 'home', difficulty: 'Easy', reward: 140, description: 'Choose helpful actions and complete family missions.' },
      { id: 'u2l3-g2', title: 'PH Photo Hunt', engine: 'memory', icon: '📸', theme: 'museum', difficulty: 'Easy', reward: 120, description: 'Find and match words with the ph sound.' }
    ],
    u2l4: [
      { id: 'u2l4-g1', title: 'Job City Simulator', engine: 'simulation', icon: '🏙️', theme: 'city', difficulty: 'Medium', reward: 160, description: 'Send every worker to the correct place and task.' },
      { id: 'u2l4-g2', title: 'Who Does What?', engine: 'detective', icon: '🔎', theme: 'city', difficulty: 'Easy', reward: 120, description: 'Read the clue and identify the job.' }
    ],
    u3l1: [
      { id: 'u3l1-g1', title: 'City Map Turbo Race', engine: 'racing', icon: '🚗', theme: 'city', difficulty: 'Medium', reward: 170, description: 'Race through the city and reach the correct places.' },
      { id: 'u3l1-g2', title: 'Double-Letter Treasure Hunt', engine: 'maze', icon: '🗺️', theme: 'city', difficulty: 'Medium', reward: 140, description: 'Explore the map and collect zz, ss, and ll words.' }
    ],
    u3l2: [
      { id: 'u3l2-g1', title: 'Egypt Landmark Expedition', engine: 'story', icon: '🏛️', theme: 'egypt', difficulty: 'Medium', reward: 170, description: 'Visit famous landmarks and unlock each destination.' },
      { id: 'u3l2-g2', title: 'Punctuation Repair Lab', engine: 'puzzle', icon: '🧩', theme: 'lab', difficulty: 'Medium', reward: 140, description: 'Repair sentences by fixing capitals and punctuation.' }
    ],
    u3l3: [
      { id: 'u3l3-g1', title: 'The Lost Toy Mystery', engine: 'maze', icon: '🧸', theme: 'room', difficulty: 'Medium', reward: 170, description: 'Search rooms and follow preposition clues to find the toy.' },
      { id: 'u3l3-g2', title: 'Interactive Room Explorer', engine: 'builder', icon: '🚪', theme: 'room', difficulty: 'Easy', reward: 130, description: 'Place objects under, behind, between, and in front of furniture.' }
    ],
    u3l4: [
      { id: 'u3l4-g1', title: 'Zoo Escape Runner', engine: 'runner', icon: '🦁', theme: 'zoo', difficulty: 'Medium', reward: 170, description: 'Run through the zoo and choose correct past-tense gates.' },
      { id: 'u3l4-g2', title: 'Zoo Trip Story Reel', engine: 'story', icon: '🎬', theme: 'zoo', difficulty: 'Easy', reward: 130, description: 'Put the school-trip events in the correct order.' }
    ],
    u4l1: [
      { id: 'u4l1-g1', title: 'Emotion Detective Agency', engine: 'detective', icon: '😀', theme: 'city', difficulty: 'Easy', reward: 140, description: 'Read situations and identify the correct feeling.' },
      { id: 'u4l1-g2', title: 'Feelings Story Quest', engine: 'story', icon: '📖', theme: 'garden', difficulty: 'Medium', reward: 150, description: 'Follow the adventure and order feelings and events.' }
    ],
    u4l2: [
      { id: 'u4l2-g1', title: 'Rescue Mission', engine: 'simulation', icon: '🚑', theme: 'park', difficulty: 'Medium', reward: 160, description: 'Make the right choices to help Sara safely.' },
      { id: 'u4l2-g2', title: 'Sentence Bridge Builder', engine: 'builder', icon: '🌉', theme: 'river', difficulty: 'Medium', reward: 150, description: 'Use and, but, and then to build a strong sentence bridge.' }
    ],
    u4l3: [
      { id: 'u4l3-g1', title: 'Championship Football Match', engine: 'football', icon: '🏆', theme: 'stadium', difficulty: 'Medium', reward: 180, description: 'Pass, shoot, and make smart language choices to win.' },
      { id: 'u4l3-g2', title: 'Match-Day Feelings Journey', engine: 'story', icon: '🎭', theme: 'stadium', difficulty: 'Easy', reward: 130, description: 'Connect match events to the correct feelings.' }
    ],
    u5l1: [
      { id: 'u5l1-g1', title: 'Chore Crew Simulator', engine: 'simulation', icon: '🧹', theme: 'home', difficulty: 'Easy', reward: 140, description: 'Organize chores and finish the home mission together.' },
      { id: 'u5l1-g2', title: 'Teamwork Puzzle Factory', engine: 'puzzle', icon: '🛠️', theme: 'workshop', difficulty: 'Medium', reward: 150, description: 'Solve cooperation puzzles to complete the project.' }
    ],
    u5l2: [
      { id: 'u5l2-g1', title: 'Build the School Bridge', engine: 'builder', icon: '🌉', theme: 'school', difficulty: 'Medium', reward: 170, description: 'Assign team roles and build the bridge step by step.' },
      { id: 'u5l2-g2', title: 'Hard G Pass Challenge', engine: 'football', icon: '⚽', theme: 'schoolyard', difficulty: 'Medium', reward: 150, description: 'Pass to the correct hard-g word to keep the play alive.' }
    ],
    u5l3: [
      { id: 'u5l3-g1', title: 'Team Tactics Football', engine: 'football', icon: '⚽', theme: 'stadium', difficulty: 'Hard', reward: 190, description: 'Choose the best team action and score the winning goal.' },
      { id: 'u5l3-g2', title: 'Soft G Goal Rush', engine: 'phonics', icon: '🥅', theme: 'stadium', difficulty: 'Medium', reward: 150, description: 'Hit soft-g targets to power up the final shot.' }
    ],
    u5l4: [
      { id: 'u5l4-g1', title: 'Neighborhood Hero Simulator', engine: 'simulation', icon: '🌱', theme: 'community', difficulty: 'Medium', reward: 170, description: 'Plan and complete a community clean-up mission.' },
      { id: 'u5l4-g2', title: 'Community Story Adventure', engine: 'story', icon: '🏘️', theme: 'community', difficulty: 'Medium', reward: 150, description: 'Order the actions that help the neighborhood.' }
    ],
    u6l1: [
      { id: 'u6l1-g1', title: 'Dream Lab Planner', engine: 'simulation', icon: '🚀', theme: 'lab', difficulty: 'Medium', reward: 170, description: 'Build a goal plan and guide the character to success.' },
      { id: 'u6l1-g2', title: 'Goal-Getter Championship Race', engine: 'racing', icon: '🏁', theme: 'future', difficulty: 'Hard', reward: 190, description: 'Use present continuous forms to unlock racing boosts.' }
    ],
    u6l2: [
      { id: 'u6l2-g1', title: 'Bike Balance Challenge', engine: 'runner', icon: '🚲', theme: 'park', difficulty: 'Medium', reward: 170, description: 'Balance, avoid obstacles, and complete action-now checkpoints.' },
      { id: 'u6l2-g2', title: 'Sound Splash Arena', engine: 'phonics', icon: '💦', theme: 'waterpark', difficulty: 'Medium', reward: 150, description: 'Catch spr, spl, and scr words in a fast splash challenge.' }
    ],
    u6l3: [
      { id: 'u6l3-g1', title: 'Exam Quest Adventure', engine: 'story', icon: '🧠', theme: 'school', difficulty: 'Hard', reward: 190, description: 'Complete the preparation journey and reach success.' },
      { id: 'u6l3-g2', title: 'Success Puzzle Vault', engine: 'puzzle', icon: '🔐', theme: 'vault', difficulty: 'Medium', reward: 160, description: 'Unlock the vault by solving goal and sequence puzzles.' }
    ],
    u6l4: [
      { id: 'u6l4-g1', title: 'Coach Race', engine: 'racing', icon: '🏃‍♀️', theme: 'track', difficulty: 'Hard', reward: 190, description: 'Support your friend, choose helpful language, and win the race.' },
      { id: 'u6l4-g2', title: 'Support Squad Builder', engine: 'builder', icon: '📣', theme: 'track', difficulty: 'Medium', reward: 160, description: 'Build encouraging messages and a winning practice plan.' }
    ]
  };

  const REVIEW_GAMES = [
    { id: 'review1-tournament', reviewId: 'review1', title: 'The Pyramid Championship', engine: 'tournament', icon: '🏜️', reward: 600, description: 'A five-stage tournament covering Units 1–3.' },
    { id: 'review2-tournament', reviewId: 'review2', title: 'The English World Cup', engine: 'tournament', icon: '🏆', reward: 700, description: 'A final championship covering Units 4–6.' }
  ];

  const ENGINE_LABELS = {
    penalty: 'Penalty Shootout',
    dialogue: 'Dialogue Builder',
    runner: 'Adventure Runner',
    phonics: 'Phonics Action',
    detective: 'Detective Mission',
    builder: 'Build & Create',
    racing: 'Racing Challenge',
    simulation: 'Mission Simulator',
    memory: 'Memory Adventure',
    story: 'Story Quest',
    maze: 'Maze Adventure',
    puzzle: 'Puzzle Mission',
    football: 'Football Challenge',
    tournament: 'Tournament'
  };

  window.GAME_DATA = { games: GAMES, reviews: REVIEW_GAMES, engineLabels: ENGINE_LABELS };
})();
