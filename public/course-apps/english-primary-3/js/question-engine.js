(() => {
  'use strict';

  const MANUAL_LESSON_QUESTIONS = {
  "u1l1": [
    {
      "type": "mcq",
      "prompt": "I ___ eight years old.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "am",
      "explanation": "Use “am” with I.",
      "id": "u1l1:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My name ___ Sara.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "Use “is” after “My name”.",
      "id": "u1l1:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I ___ from Egypt.",
      "options": [
        "am",
        "is",
        "be"
      ],
      "answer": "am",
      "explanation": "Use “I am”.",
      "id": "u1l1:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I am ___ Primary 3.",
      "options": [
        "from",
        "in",
        "on"
      ],
      "answer": "in",
      "explanation": "Use “in” before the grade.",
      "id": "u1l1:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ name is Ali.",
      "options": [
        "My",
        "I",
        "Me"
      ],
      "answer": "My",
      "explanation": "Use “My name is …”.",
      "id": "u1l1:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "“I’m” means ___.",
      "options": [
        "I is",
        "I am",
        "I are"
      ],
      "answer": "I am",
      "explanation": "I’m is the short form of I am.",
      "id": "u1l1:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "How old ___ you?",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "are",
      "explanation": "Use “are” with you.",
      "id": "u1l1:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "What ___ your name?",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "The question is “What is your name?”",
      "id": "u1l1:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Good ___, Miss Huda!",
      "options": [
        "name",
        "morning",
        "later"
      ],
      "answer": "morning",
      "explanation": "",
      "id": "u1l1:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Nice to ___ you.",
      "options": [
        "meet",
        "see",
        "thank"
      ],
      "answer": "meet",
      "explanation": "",
      "id": "u1l1:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "See you ___!",
      "options": [
        "fine",
        "later",
        "name"
      ],
      "answer": "later",
      "explanation": "",
      "id": "u1l1:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I am ___, thank you.",
      "options": [
        "fine",
        "eight",
        "Egypt"
      ],
      "answer": "fine",
      "explanation": "",
      "id": "u1l1:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "My ___ is Mariam.",
      "options": [
        "grade",
        "name",
        "morning"
      ],
      "answer": "name",
      "explanation": "",
      "id": "u1l1:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I am eight years ___.",
      "options": [
        "old",
        "fine",
        "later"
      ],
      "answer": "old",
      "explanation": "",
      "id": "u1l1:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "I ___ eight years old.",
      "options": [
        "am",
        "is",
        "are",
        "be"
      ],
      "answer": "am",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l1:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "My ___ is Omar.",
      "options": [
        "name",
        "fine",
        "grade",
        "country"
      ],
      "answer": "name",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l1:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "I am ___ Egypt.",
      "options": [
        "from",
        "in",
        "on",
        "at"
      ],
      "answer": "from",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l1:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Nice to ___ you.",
      "options": [
        "meet",
        "see",
        "go",
        "play"
      ],
      "answer": "meet",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l1:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Good ________, Miss Huda.",
          "answer": "morning"
        },
        {
          "sentence": "See you ________.",
          "answer": "later"
        },
        {
          "sentence": "My ________ is Ali.",
          "answer": "name"
        }
      ],
      "options": [
        "morning",
        "later",
        "name"
      ],
      "answer": {
        "0": "morning",
        "1": "later",
        "2": "name"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l1:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "I am ________, thank you.",
          "answer": "fine"
        },
        {
          "sentence": "Nice to ________ you.",
          "answer": "meet"
        },
        {
          "sentence": "I am eight years ________.",
          "answer": "old"
        }
      ],
      "options": [
        "fine",
        "meet",
        "old"
      ],
      "answer": {
        "0": "fine",
        "1": "meet",
        "2": "old"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l1:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "I",
        "am",
        "fine"
      ],
      "answer": "I am fine.",
      "comparison": "i am fine",
      "explanation": "I am fine.",
      "id": "u1l1:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "name",
        "is",
        "Lina"
      ],
      "answer": "My name is Lina.",
      "comparison": "my name is lina",
      "explanation": "My name is Lina.",
      "id": "u1l1:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "How",
        "old",
        "are",
        "you"
      ],
      "answer": "How old are you?",
      "comparison": "how old are you",
      "explanation": "How old are you?",
      "id": "u1l1:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Nice",
        "to",
        "meet",
        "you"
      ],
      "answer": "Nice to meet you.",
      "comparison": "nice to meet you",
      "explanation": "Nice to meet you.",
      "id": "u1l1:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“I am eight years old” talks about age.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l1:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“My name am Sara” is correct.",
      "answer": false,
      "explanation": "Say “My name is Sara.”",
      "id": "u1l1:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“I am in Primary 3” talks about the school grade.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l1:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What is the first girl’s name?",
      "options": [
        "Sara",
        "Lina",
        "Mona"
      ],
      "answer": "Sara",
      "explanation": "",
      "id": "u1l1:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "How old is Lina?",
      "options": [
        "Seven",
        "Eight",
        "Nine"
      ],
      "answer": "Eight",
      "explanation": "",
      "id": "u1l1:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Complete: Nice to meet you, ___.",
      "options": [
        "too",
        "old",
        "fine"
      ],
      "answer": "too",
      "explanation": "",
      "id": "u1l1:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u1l2": [
    {
      "type": "mcq",
      "prompt": "___ your hand before you speak.",
      "options": [
        "Raise",
        "Raises",
        "Raised"
      ],
      "answer": "Raise",
      "explanation": "Use the base verb for a command.",
      "id": "u1l2:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ shout in class.",
      "options": [
        "Don’t",
        "Doesn’t",
        "Not"
      ],
      "answer": "Don’t",
      "explanation": "Use “Don’t + verb” for a negative command.",
      "id": "u1l2:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ I go to the bathroom?",
      "options": [
        "May",
        "Am",
        "Is"
      ],
      "answer": "May",
      "explanation": "Use “May I …?” to ask permission.",
      "id": "u1l2:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ your book, please.",
      "options": [
        "Open",
        "Opens",
        "Opened"
      ],
      "answer": "Open",
      "explanation": "",
      "id": "u1l2:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ carefully to the teacher.",
      "options": [
        "Listen",
        "Listens",
        "Listening"
      ],
      "answer": "Listen",
      "explanation": "",
      "id": "u1l2:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ kind to your classmates.",
      "options": [
        "Be",
        "Is",
        "Are"
      ],
      "answer": "Be",
      "explanation": "",
      "id": "u1l2:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ the classroom clean.",
      "options": [
        "Keep",
        "Keeps",
        "Kept"
      ],
      "answer": "Keep",
      "explanation": "",
      "id": "u1l2:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "___ up, please.",
      "options": [
        "Stand",
        "Stands",
        "Standing"
      ],
      "answer": "Stand",
      "explanation": "",
      "id": "u1l2:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Please ___ down on your chair.",
      "options": [
        "sit",
        "shout",
        "open"
      ],
      "answer": "sit",
      "explanation": "",
      "id": "u1l2:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Ask for ___ before you leave the room.",
      "options": [
        "permission",
        "homework",
        "breakfast"
      ],
      "answer": "permission",
      "explanation": "",
      "id": "u1l2:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The teacher says, “Open your ___.”",
      "options": [
        "book",
        "bed",
        "park"
      ],
      "answer": "book",
      "explanation": "",
      "id": "u1l2:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Listen ___ to the instructions.",
      "options": [
        "carefully",
        "loudly",
        "sadly"
      ],
      "answer": "carefully",
      "explanation": "",
      "id": "u1l2:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "___ is your pencil?",
      "options": [
        "Where",
        "Whale",
        "White"
      ],
      "answer": "Where",
      "explanation": "Choose the correct wh-word.",
      "id": "u1l2:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "___ is your name?",
      "options": [
        "What",
        "Wheel",
        "When"
      ],
      "answer": "What",
      "explanation": "Choose the correct wh-word.",
      "id": "u1l2:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "___ your hand before answering.",
      "options": [
        "Raise",
        "Open",
        "Shout",
        "Run"
      ],
      "answer": "Raise",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l2:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "___ shout in the classroom.",
      "options": [
        "Don’t",
        "May",
        "Please",
        "Can"
      ],
      "answer": "Don’t",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l2:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "___ I go to the bathroom?",
      "options": [
        "May",
        "Do",
        "Am",
        "Are"
      ],
      "answer": "May",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l2:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Listen ___ to the teacher.",
      "options": [
        "carefully",
        "angry",
        "clean",
        "later"
      ],
      "answer": "carefully",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l2:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "________ your hand.",
          "answer": "Raise"
        },
        {
          "sentence": "________ your book.",
          "answer": "Open"
        },
        {
          "sentence": "________ down.",
          "answer": "Sit"
        }
      ],
      "options": [
        "Raise",
        "Open",
        "Sit"
      ],
      "answer": {
        "0": "Raise",
        "1": "Open",
        "2": "Sit"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l2:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "________ carefully.",
          "answer": "Listen"
        },
        {
          "sentence": "________ kind.",
          "answer": "Be"
        },
        {
          "sentence": "________ shout.",
          "answer": "Don’t"
        }
      ],
      "options": [
        "Listen",
        "Be",
        "Don’t"
      ],
      "answer": {
        "0": "Listen",
        "1": "Be",
        "2": "Don’t"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l2:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Raise",
        "your",
        "hand"
      ],
      "answer": "Raise your hand.",
      "comparison": "raise your hand",
      "explanation": "Raise your hand.",
      "id": "u1l2:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Do",
        "not",
        "shout"
      ],
      "answer": "Do not shout.",
      "comparison": "do not shout",
      "explanation": "Do not shout.",
      "id": "u1l2:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "May",
        "I",
        "go",
        "to",
        "the",
        "bathroom"
      ],
      "answer": "May I go to the bathroom?",
      "comparison": "may i go to the bathroom",
      "explanation": "May I go to the bathroom?",
      "id": "u1l2:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Listen",
        "carefully",
        "to",
        "the",
        "teacher"
      ],
      "answer": "Listen carefully to the teacher.",
      "comparison": "listen carefully to the teacher",
      "explanation": "Listen carefully to the teacher.",
      "id": "u1l2:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“Raise your hand” is a classroom rule.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l2:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“May I go to the bathroom?” is a polite request.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l2:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Students should shout before they answer.",
      "answer": false,
      "explanation": "Students should raise their hands.",
      "id": "u1l2:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Why do students raise their hands?",
      "options": [
        "To speak",
        "To sleep",
        "To run"
      ],
      "answer": "To speak",
      "explanation": "",
      "id": "u1l2:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What should students keep clean?",
      "options": [
        "The classroom",
        "The zoo",
        "The bus"
      ],
      "answer": "The classroom",
      "explanation": "",
      "id": "u1l2:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Which rule is best before answering?",
      "options": [
        "Raise your hand",
        "Close your eyes",
        "Leave the room"
      ],
      "answer": "Raise your hand",
      "explanation": "",
      "id": "u1l2:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u1l3": [
    {
      "type": "mcq",
      "prompt": "She ___ friendly.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u1l3:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ helpful.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "are",
      "explanation": "",
      "id": "u1l3:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I ___ shy.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "am",
      "explanation": "",
      "id": "u1l3:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ long hair.",
      "options": [
        "have",
        "has",
        "having"
      ],
      "answer": "has",
      "explanation": "",
      "id": "u1l3:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The boys ___ brown eyes.",
      "options": [
        "has",
        "have",
        "is"
      ],
      "answer": "have",
      "explanation": "",
      "id": "u1l3:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Ali ___ tall.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u1l3:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara and Lina ___ kind.",
      "options": [
        "is",
        "are",
        "has"
      ],
      "answer": "are",
      "explanation": "",
      "id": "u1l3:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "He ___ curly hair.",
      "options": [
        "have",
        "has",
        "are"
      ],
      "answer": "has",
      "explanation": "",
      "id": "u1l3:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona tells jokes. She is ___.",
      "options": [
        "funny",
        "shy",
        "short"
      ],
      "answer": "funny",
      "explanation": "",
      "id": "u1l3:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Omar helps his friends. He is ___.",
      "options": [
        "helpful",
        "angry",
        "tired"
      ],
      "answer": "helpful",
      "explanation": "",
      "id": "u1l3:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Lina smiles and talks to everyone. She is ___.",
      "options": [
        "friendly",
        "scared",
        "bored"
      ],
      "answer": "friendly",
      "explanation": "",
      "id": "u1l3:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who says “please” is ___.",
      "options": [
        "polite",
        "tall",
        "curly"
      ],
      "answer": "polite",
      "explanation": "",
      "id": "u1l3:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Her hair makes circles. It is ___.",
      "options": [
        "curly",
        "straight",
        "short"
      ],
      "answer": "curly",
      "explanation": "",
      "id": "u1l3:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "He does not talk much. He is ___.",
      "options": [
        "shy",
        "funny",
        "helpful"
      ],
      "answer": "shy",
      "explanation": "",
      "id": "u1l3:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "She ___ kind.",
      "options": [
        "is",
        "are",
        "am",
        "have"
      ],
      "answer": "is",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l3:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "They ___ brown eyes.",
      "options": [
        "have",
        "has",
        "is",
        "am"
      ],
      "answer": "have",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l3:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Mona ___ long hair.",
      "options": [
        "has",
        "have",
        "are",
        "am"
      ],
      "answer": "has",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l3:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar helps everyone. He is ___.",
      "options": [
        "helpful",
        "bored",
        "short",
        "scared"
      ],
      "answer": "helpful",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l3:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "She tells jokes. She is ________.",
          "answer": "funny"
        },
        {
          "sentence": "He helps people. He is ________.",
          "answer": "helpful"
        },
        {
          "sentence": "She says “please”. She is ________.",
          "answer": "polite"
        }
      ],
      "options": [
        "funny",
        "helpful",
        "polite"
      ],
      "answer": {
        "0": "funny",
        "1": "helpful",
        "2": "polite"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l3:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Hair with circles is ________.",
          "answer": "curly"
        },
        {
          "sentence": "Hair without curls is ________.",
          "answer": "straight"
        },
        {
          "sentence": "A person who talks little is ________.",
          "answer": "shy"
        }
      ],
      "options": [
        "curly",
        "straight",
        "shy"
      ],
      "answer": {
        "0": "curly",
        "1": "straight",
        "2": "shy"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l3:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "She",
        "is",
        "very",
        "friendly"
      ],
      "answer": "She is very friendly.",
      "comparison": "she is very friendly",
      "explanation": "She is very friendly.",
      "id": "u1l3:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Mona",
        "has",
        "long",
        "hair"
      ],
      "answer": "Mona has long hair.",
      "comparison": "mona has long hair",
      "explanation": "Mona has long hair.",
      "id": "u1l3:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "They",
        "have",
        "brown",
        "eyes"
      ],
      "answer": "They have brown eyes.",
      "comparison": "they have brown eyes",
      "explanation": "They have brown eyes.",
      "id": "u1l3:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "He",
        "is",
        "tall",
        "and",
        "kind"
      ],
      "answer": "He is tall and kind.",
      "comparison": "he is tall and kind",
      "explanation": "He is tall and kind.",
      "id": "u1l3:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“She are friendly” is correct.",
      "answer": false,
      "explanation": "Say “She is friendly.”",
      "id": "u1l3:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "We use “has” with he and she.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l3:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A helpful person likes to help others.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l3:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What colour is Mona’s hair?",
      "options": [
        "Black",
        "Blue",
        "Green"
      ],
      "answer": "Black",
      "explanation": "",
      "id": "u1l3:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What does Mona always do?",
      "options": [
        "Tells jokes",
        "Sleeps in class",
        "Shouts"
      ],
      "answer": "Tells jokes",
      "explanation": "",
      "id": "u1l3:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who likes to play with Mona?",
      "options": [
        "Everyone",
        "No one",
        "Only the teacher"
      ],
      "answer": "Everyone",
      "explanation": "",
      "id": "u1l3:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u1l4": [
    {
      "type": "mcq",
      "prompt": "He ___ to school at eight.",
      "options": [
        "go",
        "goes",
        "going"
      ],
      "answer": "goes",
      "explanation": "",
      "id": "u1l4:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Laila ___ English every day.",
      "options": [
        "study",
        "studies",
        "studying"
      ],
      "answer": "studies",
      "explanation": "",
      "id": "u1l4:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ breakfast at home.",
      "options": [
        "has",
        "have",
        "having"
      ],
      "answer": "have",
      "explanation": "",
      "id": "u1l4:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar ___ his teeth in the morning.",
      "options": [
        "brush",
        "brushes",
        "brushing"
      ],
      "answer": "brushes",
      "explanation": "",
      "id": "u1l4:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ her homework after school.",
      "options": [
        "do",
        "does",
        "doing"
      ],
      "answer": "does",
      "explanation": "",
      "id": "u1l4:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I ___ up at seven.",
      "options": [
        "get",
        "gets",
        "getting"
      ],
      "answer": "get",
      "explanation": "",
      "id": "u1l4:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "She ___ her bed every morning.",
      "options": [
        "make",
        "makes",
        "making"
      ],
      "answer": "makes",
      "explanation": "",
      "id": "u1l4:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We ___ to bed at nine.",
      "options": [
        "go",
        "goes",
        "went"
      ],
      "answer": "go",
      "explanation": "",
      "id": "u1l4:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I use a toothbrush to ___ my teeth.",
      "options": [
        "brush",
        "study",
        "play"
      ],
      "answer": "brush",
      "explanation": "",
      "id": "u1l4:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I put on my clothes. I ___.",
      "options": [
        "get dressed",
        "go to bed",
        "have breakfast"
      ],
      "answer": "get dressed",
      "explanation": "",
      "id": "u1l4:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I eat in the morning. I ___.",
      "options": [
        "have breakfast",
        "do homework",
        "make the bed"
      ],
      "answer": "have breakfast",
      "explanation": "",
      "id": "u1l4:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "After school, I ___ my homework.",
      "options": [
        "do",
        "brush",
        "get"
      ],
      "answer": "do",
      "explanation": "",
      "id": "u1l4:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Before sleeping, I ___.",
      "options": [
        "go to bed",
        "go to school",
        "study"
      ],
      "answer": "go to bed",
      "explanation": "",
      "id": "u1l4:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I arrange my sheets. I ___ the bed.",
      "options": [
        "make",
        "play",
        "have"
      ],
      "answer": "make",
      "explanation": "",
      "id": "u1l4:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "She ___ to school every day.",
      "options": [
        "goes",
        "go",
        "going",
        "went"
      ],
      "answer": "goes",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l4:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Ali ___ his teeth.",
      "options": [
        "brushes",
        "brush",
        "studies",
        "makes"
      ],
      "answer": "brushes",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l4:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "They ___ breakfast at seven.",
      "options": [
        "have",
        "has",
        "goes",
        "does"
      ],
      "answer": "have",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l4:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Mariam ___ English after school.",
      "options": [
        "studies",
        "study",
        "plays",
        "brushes"
      ],
      "answer": "studies",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u1l4:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "I ________ my teeth.",
          "answer": "brush"
        },
        {
          "sentence": "I ________ breakfast.",
          "answer": "have"
        },
        {
          "sentence": "I ________ my homework.",
          "answer": "do"
        }
      ],
      "options": [
        "brush",
        "have",
        "do"
      ],
      "answer": {
        "0": "brush",
        "1": "have",
        "2": "do"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l4:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "She ________ to school.",
          "answer": "goes"
        },
        {
          "sentence": "He ________ his bed.",
          "answer": "makes"
        },
        {
          "sentence": "Laila ________ English.",
          "answer": "studies"
        }
      ],
      "options": [
        "goes",
        "makes",
        "studies"
      ],
      "answer": {
        "0": "goes",
        "1": "makes",
        "2": "studies"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u1l4:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "I",
        "get",
        "up",
        "at",
        "seven"
      ],
      "answer": "I get up at seven.",
      "comparison": "i get up at seven",
      "explanation": "I get up at seven.",
      "id": "u1l4:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "She",
        "brushes",
        "her",
        "teeth"
      ],
      "answer": "She brushes her teeth.",
      "comparison": "she brushes her teeth",
      "explanation": "She brushes her teeth.",
      "id": "u1l4:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "They",
        "have",
        "breakfast",
        "at",
        "home"
      ],
      "answer": "They have breakfast at home.",
      "comparison": "they have breakfast at home",
      "explanation": "They have breakfast at home.",
      "id": "u1l4:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Mariam",
        "goes",
        "to",
        "school"
      ],
      "answer": "Mariam goes to school.",
      "comparison": "mariam goes to school",
      "explanation": "Mariam goes to school.",
      "id": "u1l4:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "We add “s” to many verbs with he and she.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l4:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“He go to school” is correct.",
      "answer": false,
      "explanation": "Say “He goes to school.”",
      "id": "u1l4:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“They have breakfast” is correct.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u1l4:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What does Mariam do after she gets up?",
      "options": [
        "Makes her bed",
        "Goes to sleep",
        "Plays football"
      ],
      "answer": "Makes her bed",
      "explanation": "",
      "id": "u1l4:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Where does Mariam go finally?",
      "options": [
        "To school",
        "To the zoo",
        "To the museum"
      ],
      "answer": "To school",
      "explanation": "",
      "id": "u1l4:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What does Mariam do before school?",
      "options": [
        "Has breakfast",
        "Goes to bed",
        "Watches a match"
      ],
      "answer": "Has breakfast",
      "explanation": "",
      "id": "u1l4:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u2l1": [
    {
      "type": "mcq",
      "prompt": "This is ___ mother. I am speaking.",
      "options": [
        "my",
        "his",
        "her"
      ],
      "answer": "my",
      "explanation": "",
      "id": "u2l1:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Ali has a kite. ___ kite is red.",
      "options": [
        "My",
        "His",
        "Her"
      ],
      "answer": "His",
      "explanation": "",
      "id": "u2l1:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona has a doll. ___ doll is new.",
      "options": [
        "My",
        "His",
        "Her"
      ],
      "answer": "Her",
      "explanation": "",
      "id": "u2l1:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I love ___ family.",
      "options": [
        "my",
        "his",
        "her"
      ],
      "answer": "my",
      "explanation": "",
      "id": "u2l1:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar is with ___ father.",
      "options": [
        "his",
        "her",
        "my"
      ],
      "answer": "his",
      "explanation": "",
      "id": "u2l1:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara helps ___ sister.",
      "options": [
        "her",
        "his",
        "my"
      ],
      "answer": "her",
      "explanation": "",
      "id": "u2l1:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My uncle and aunt have a child. ___ child is my cousin.",
      "options": [
        "Their",
        "His",
        "Her"
      ],
      "answer": "Their",
      "explanation": "",
      "id": "u2l1:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Grandpa is my mother’s ___.",
      "options": [
        "father",
        "brother",
        "son"
      ],
      "answer": "father",
      "explanation": "",
      "id": "u2l1:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My father’s mother is my ___.",
      "options": [
        "grandmother",
        "aunt",
        "sister"
      ],
      "answer": "grandmother",
      "explanation": "",
      "id": "u2l1:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "My mother’s brother is my ___.",
      "options": [
        "uncle",
        "cousin",
        "father"
      ],
      "answer": "uncle",
      "explanation": "",
      "id": "u2l1:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "My aunt’s child is my ___.",
      "options": [
        "cousin",
        "brother",
        "grandfather"
      ],
      "answer": "cousin",
      "explanation": "",
      "id": "u2l1:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A girl with the same parents is my ___.",
      "options": [
        "sister",
        "mother",
        "aunt"
      ],
      "answer": "sister",
      "explanation": "",
      "id": "u2l1:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A boy with the same parents is my ___.",
      "options": [
        "brother",
        "uncle",
        "father"
      ],
      "answer": "brother",
      "explanation": "",
      "id": "u2l1:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "My parents and relatives are my ___.",
      "options": [
        "family",
        "class",
        "team"
      ],
      "answer": "family",
      "explanation": "",
      "id": "u2l1:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "This is ___ mother.",
      "options": [
        "my",
        "his",
        "her",
        "their"
      ],
      "answer": "my",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l1:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Ali is with ___ father.",
      "options": [
        "his",
        "her",
        "my",
        "our"
      ],
      "answer": "his",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l1:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Mona plays with ___ sister.",
      "options": [
        "her",
        "his",
        "my",
        "your"
      ],
      "answer": "her",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l1:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "My aunt’s son is my ___.",
      "options": [
        "cousin",
        "uncle",
        "brother",
        "father"
      ],
      "answer": "cousin",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l1:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "My father’s father is my ________.",
          "answer": "grandfather"
        },
        {
          "sentence": "My mother’s sister is my ________.",
          "answer": "aunt"
        },
        {
          "sentence": "My uncle’s child is my ________.",
          "answer": "cousin"
        }
      ],
      "options": [
        "grandfather",
        "aunt",
        "cousin"
      ],
      "answer": {
        "0": "grandfather",
        "1": "aunt",
        "2": "cousin"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l1:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Ali has a bag. It is ________ bag.",
          "answer": "his"
        },
        {
          "sentence": "Mona has a book. It is ________ book.",
          "answer": "her"
        },
        {
          "sentence": "I have a pencil. It is ________ pencil.",
          "answer": "my"
        }
      ],
      "options": [
        "his",
        "her",
        "my"
      ],
      "answer": {
        "0": "his",
        "1": "her",
        "2": "my"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l1:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "This",
        "is",
        "my",
        "family"
      ],
      "answer": "This is my family.",
      "comparison": "this is my family",
      "explanation": "This is my family.",
      "id": "u2l1:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Ali",
        "loves",
        "his",
        "mother"
      ],
      "answer": "Ali loves his mother.",
      "comparison": "ali loves his mother",
      "explanation": "Ali loves his mother.",
      "id": "u2l1:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Mona",
        "helps",
        "her",
        "sister"
      ],
      "answer": "Mona helps her sister.",
      "comparison": "mona helps her sister",
      "explanation": "Mona helps her sister.",
      "id": "u2l1:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "cousin",
        "is",
        "eight"
      ],
      "answer": "My cousin is eight.",
      "comparison": "my cousin is eight",
      "explanation": "My cousin is eight.",
      "id": "u2l1:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "We use “his” for a boy or man.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l1:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "We use “her” for a boy.",
      "answer": false,
      "explanation": "Use “his” for a boy and “her” for a girl.",
      "id": "u2l1:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A cousin can be the child of an aunt or uncle.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l1:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What does Nour show?",
      "options": [
        "A family photo",
        "A map",
        "A toy car"
      ],
      "answer": "A family photo",
      "explanation": "",
      "id": "u2l1:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who is the child of an aunt or uncle?",
      "options": [
        "A cousin",
        "A teacher",
        "A doctor"
      ],
      "answer": "A cousin",
      "explanation": "",
      "id": "u2l1:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Which word completes: “This is Nour’s mother. ___ name is Salma.”",
      "options": [
        "Her",
        "His",
        "My"
      ],
      "answer": "Her",
      "explanation": "",
      "id": "u2l1:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u2l2": [
    {
      "type": "mcq",
      "prompt": "My favourite celebration ___ Eid.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u2l2:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We ___ our grandparents on Eid.",
      "options": [
        "visit",
        "visits",
        "visiting"
      ],
      "answer": "visit",
      "explanation": "",
      "id": "u2l2:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ her mother a gift.",
      "options": [
        "give",
        "gives",
        "giving"
      ],
      "answer": "gives",
      "explanation": "",
      "id": "u2l2:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Families ___ together.",
      "options": [
        "celebrate",
        "celebrates",
        "celebrating"
      ],
      "answer": "celebrate",
      "explanation": "",
      "id": "u2l2:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sham El-Nessim ___ in spring.",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u2l2:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mother’s Day is ___ March.",
      "options": [
        "in",
        "on",
        "at"
      ],
      "answer": "in",
      "explanation": "",
      "id": "u2l2:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We have a ___ day together.",
      "options": [
        "special",
        "specially",
        "specials"
      ],
      "answer": "special",
      "explanation": "",
      "id": "u2l2:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The family ___ happy.",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u2l2:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We give Mum a ___ on Mother’s Day.",
      "options": [
        "gift",
        "map",
        "helmet"
      ],
      "answer": "gift",
      "explanation": "",
      "id": "u2l2:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Eid Al-Fitr is a family ___.",
      "options": [
        "celebration",
        "station",
        "direction"
      ],
      "answer": "celebration",
      "explanation": "",
      "id": "u2l2:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A family custom is a ___.",
      "options": [
        "tradition",
        "lesson",
        "job"
      ],
      "answer": "tradition",
      "explanation": "",
      "id": "u2l2:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "We spend the day ___.",
      "options": [
        "together",
        "under",
        "slowly"
      ],
      "answer": "together",
      "explanation": "",
      "id": "u2l2:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the word with x: ___.",
      "options": [
        "exam",
        "photo",
        "whale"
      ],
      "answer": "exam",
      "explanation": "",
      "id": "u2l2:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the word with x: ___.",
      "options": [
        "exercise",
        "phone",
        "green"
      ],
      "answer": "exercise",
      "explanation": "",
      "id": "u2l2:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "My favourite celebration ___ Eid.",
      "options": [
        "is",
        "are",
        "am",
        "be"
      ],
      "answer": "is",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l2:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We ___ our grandparents.",
      "options": [
        "visit",
        "visits",
        "visited",
        "visiting"
      ],
      "answer": "visit",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l2:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Mona ___ a gift to Mum.",
      "options": [
        "gives",
        "give",
        "giving",
        "gave"
      ],
      "answer": "gives",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l2:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We celebrate ___.",
      "options": [
        "together",
        "under",
        "behind",
        "slow"
      ],
      "answer": "together",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l2:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "We give Mum a ________.",
          "answer": "gift"
        },
        {
          "sentence": "A family custom is a ________.",
          "answer": "tradition"
        },
        {
          "sentence": "Eid is a ________.",
          "answer": "celebration"
        }
      ],
      "options": [
        "gift",
        "tradition",
        "celebration"
      ],
      "answer": {
        "0": "gift",
        "1": "tradition",
        "2": "celebration"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l2:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag the complete word to each spelling pattern.",
      "pairs": [
        {
          "sentence": "Complete: e_am",
          "answer": "exam"
        },
        {
          "sentence": "Complete: e_ercise",
          "answer": "exercise"
        },
        {
          "sentence": "Complete: e_it",
          "answer": "exit"
        }
      ],
      "options": [
        "exam",
        "exercise",
        "exit"
      ],
      "answer": {
        "0": "exam",
        "1": "exercise",
        "2": "exit"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l2:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "visit",
        "our",
        "grandparents"
      ],
      "answer": "We visit our grandparents.",
      "comparison": "we visit our grandparents",
      "explanation": "We visit our grandparents.",
      "id": "u2l2:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "favourite",
        "celebration",
        "is",
        "Eid"
      ],
      "answer": "My favourite celebration is Eid.",
      "comparison": "my favourite celebration is eid",
      "explanation": "My favourite celebration is Eid.",
      "id": "u2l2:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Families",
        "celebrate",
        "together"
      ],
      "answer": "Families celebrate together.",
      "comparison": "families celebrate together",
      "explanation": "Families celebrate together.",
      "id": "u2l2:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Mother’s",
        "Day",
        "is",
        "special"
      ],
      "answer": "Mother’s Day is special.",
      "comparison": "mother’s day is special",
      "explanation": "Mother’s Day is special.",
      "id": "u2l2:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“We visits our grandparents” is correct.",
      "answer": false,
      "explanation": "Use “visit” with we.",
      "id": "u2l2:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Eid Al-Fitr is a celebration.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l2:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “exam” contains the letter x.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l2:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Why is the day special?",
      "options": [
        "The family is together",
        "Everyone is alone",
        "The school is closed only"
      ],
      "answer": "The family is together",
      "explanation": "",
      "id": "u2l2:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What do families often do on celebrations?",
      "options": [
        "Visit relatives",
        "Hide books",
        "Miss breakfast"
      ],
      "answer": "Visit relatives",
      "explanation": "",
      "id": "u2l2:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Which sentence is correct?",
      "options": [
        "We celebrate together.",
        "We celebrates together.",
        "We celebrating together."
      ],
      "answer": "We celebrate together.",
      "explanation": "",
      "id": "u2l2:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u2l3": [
    {
      "type": "mcq",
      "prompt": "My brother ___ me with homework.",
      "options": [
        "help",
        "helps",
        "helping"
      ],
      "answer": "helps",
      "explanation": "",
      "id": "u2l3:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My parents ___ me to school.",
      "options": [
        "take",
        "takes",
        "taking"
      ],
      "answer": "take",
      "explanation": "",
      "id": "u2l3:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Grandpa ___ with me.",
      "options": [
        "read",
        "reads",
        "reading"
      ],
      "answer": "reads",
      "explanation": "",
      "id": "u2l3:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mum ___ dinner.",
      "options": [
        "cook",
        "cooks",
        "cooking"
      ],
      "answer": "cooks",
      "explanation": "",
      "id": "u2l3:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ for me.",
      "options": [
        "care",
        "cares",
        "caring"
      ],
      "answer": "care",
      "explanation": "",
      "id": "u2l3:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My family ___ me.",
      "options": [
        "support",
        "supports",
        "supporting"
      ],
      "answer": "supports",
      "explanation": "",
      "id": "u2l3:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I ___ safe with my family.",
      "options": [
        "feel",
        "feels",
        "feeling"
      ],
      "answer": "feel",
      "explanation": "",
      "id": "u2l3:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My parents ___ proud of me.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "are",
      "explanation": "",
      "id": "u2l3:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "My family gives me help and ___.",
      "options": [
        "support",
        "museum",
        "goal"
      ],
      "answer": "support",
      "explanation": "",
      "id": "u2l3:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Mum makes food. She can ___.",
      "options": [
        "cook",
        "borrow",
        "score"
      ],
      "answer": "cook",
      "explanation": "",
      "id": "u2l3:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "My family keeps me ___.",
      "options": [
        "safe",
        "ancient",
        "nervous"
      ],
      "answer": "safe",
      "explanation": "",
      "id": "u2l3:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Good words from an adult are ___.",
      "options": [
        "advice",
        "homework",
        "lunch"
      ],
      "answer": "advice",
      "explanation": "",
      "id": "u2l3:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the ph word: ___.",
      "options": [
        "photo",
        "what",
        "exam"
      ],
      "answer": "photo",
      "explanation": "",
      "id": "u2l3:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the ph word: ___.",
      "options": [
        "elephant",
        "wheel",
        "duck"
      ],
      "answer": "elephant",
      "explanation": "",
      "id": "u2l3:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "My brother ___ me.",
      "options": [
        "helps",
        "help",
        "helping",
        "helped"
      ],
      "answer": "helps",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l3:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "My parents ___ me to school.",
      "options": [
        "take",
        "takes",
        "taking",
        "took"
      ],
      "answer": "take",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l3:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Grandpa ___ with me.",
      "options": [
        "reads",
        "read",
        "reading",
        "played"
      ],
      "answer": "reads",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l3:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "My family keeps me ___.",
      "options": [
        "safe",
        "angry",
        "ancient",
        "busy"
      ],
      "answer": "safe",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l3:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Mum ________ dinner.",
          "answer": "cooks"
        },
        {
          "sentence": "Grandpa ________ with me.",
          "answer": "reads"
        },
        {
          "sentence": "My brother ________ me.",
          "answer": "helps"
        }
      ],
      "options": [
        "cooks",
        "reads",
        "helps"
      ],
      "answer": {
        "0": "cooks",
        "1": "reads",
        "2": "helps"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l3:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag the complete ph-word to each spelling pattern.",
      "pairs": [
        {
          "sentence": "Complete: _oto",
          "answer": "photo"
        },
        {
          "sentence": "Complete: ele_ant",
          "answer": "elephant"
        },
        {
          "sentence": "Complete: _one",
          "answer": "phone"
        }
      ],
      "options": [
        "photo",
        "elephant",
        "phone"
      ],
      "answer": {
        "0": "photo",
        "1": "elephant",
        "2": "phone"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l3:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "family",
        "helps",
        "me"
      ],
      "answer": "My family helps me.",
      "comparison": "my family helps me",
      "explanation": "My family helps me.",
      "id": "u2l3:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Mum",
        "cooks",
        "dinner"
      ],
      "answer": "Mum cooks dinner.",
      "comparison": "mum cooks dinner",
      "explanation": "Mum cooks dinner.",
      "id": "u2l3:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Grandpa",
        "reads",
        "with",
        "me"
      ],
      "answer": "Grandpa reads with me.",
      "comparison": "grandpa reads with me",
      "explanation": "Grandpa reads with me.",
      "id": "u2l3:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "parents",
        "take",
        "me",
        "to",
        "school"
      ],
      "answer": "My parents take me to school.",
      "comparison": "my parents take me to school",
      "explanation": "My parents take me to school.",
      "id": "u2l3:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“My brother help me” is correct.",
      "answer": false,
      "explanation": "Say “My brother helps me.”",
      "id": "u2l3:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “photo” begins with ph.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l3:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Families can help children grow.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l3:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Who helps Nour with homework?",
      "options": [
        "Her mother",
        "A pilot",
        "A guide"
      ],
      "answer": "Her mother",
      "explanation": "",
      "id": "u2l3:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What does her grandfather do?",
      "options": [
        "Reads with her",
        "Flies a plane",
        "Cleans the park"
      ],
      "answer": "Reads with her",
      "explanation": "",
      "id": "u2l3:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "How does Nour feel with her family?",
      "options": [
        "Safe",
        "Lost",
        "Bored"
      ],
      "answer": "Safe",
      "explanation": "",
      "id": "u2l3:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u2l4": [
    {
      "type": "mcq",
      "prompt": "A baker ___ bread.",
      "options": [
        "make",
        "makes",
        "making"
      ],
      "answer": "makes",
      "explanation": "",
      "id": "u2l4:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A pilot ___ a plane.",
      "options": [
        "fly",
        "flies",
        "flying"
      ],
      "answer": "flies",
      "explanation": "",
      "id": "u2l4:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A doctor ___ sick people.",
      "options": [
        "help",
        "helps",
        "helping"
      ],
      "answer": "helps",
      "explanation": "",
      "id": "u2l4:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A teacher ___ children.",
      "options": [
        "teach",
        "teaches",
        "teaching"
      ],
      "answer": "teaches",
      "explanation": "",
      "id": "u2l4:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A farmer ___ on a farm.",
      "options": [
        "work",
        "works",
        "working"
      ],
      "answer": "works",
      "explanation": "",
      "id": "u2l4:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Doctors work ___ hospitals.",
      "options": [
        "in",
        "on",
        "under"
      ],
      "answer": "in",
      "explanation": "",
      "id": "u2l4:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A baker works in a ___.",
      "options": [
        "bakery",
        "library",
        "museum"
      ],
      "answer": "bakery",
      "explanation": "",
      "id": "u2l4:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Pilots fly ___.",
      "options": [
        "planes",
        "bread",
        "books"
      ],
      "answer": "planes",
      "explanation": "",
      "id": "u2l4:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A person who grows food is a ___.",
      "options": [
        "farmer",
        "pilot",
        "baker"
      ],
      "answer": "farmer",
      "explanation": "",
      "id": "u2l4:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who teaches is a ___.",
      "options": [
        "teacher",
        "doctor",
        "guide"
      ],
      "answer": "teacher",
      "explanation": "",
      "id": "u2l4:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who makes bread is a ___.",
      "options": [
        "baker",
        "farmer",
        "pilot"
      ],
      "answer": "baker",
      "explanation": "",
      "id": "u2l4:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who helps sick people is a ___.",
      "options": [
        "doctor",
        "teacher",
        "captain"
      ],
      "answer": "doctor",
      "explanation": "",
      "id": "u2l4:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A pilot works with a ___.",
      "options": [
        "plane",
        "farm",
        "bakery"
      ],
      "answer": "plane",
      "explanation": "",
      "id": "u2l4:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A farmer works on a ___.",
      "options": [
        "farm",
        "hospital",
        "station"
      ],
      "answer": "farm",
      "explanation": "",
      "id": "u2l4:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "A baker ___ bread.",
      "options": [
        "makes",
        "make",
        "flies",
        "teaches"
      ],
      "answer": "makes",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l4:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "A pilot ___ a plane.",
      "options": [
        "flies",
        "fly",
        "makes",
        "helps"
      ],
      "answer": "flies",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l4:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "A teacher ___ children.",
      "options": [
        "teaches",
        "teach",
        "works",
        "cooks"
      ],
      "answer": "teaches",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l4:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "A doctor works in a ___.",
      "options": [
        "hospital",
        "bakery",
        "farm",
        "park"
      ],
      "answer": "hospital",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u2l4:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "A ________ makes bread.",
          "answer": "baker"
        },
        {
          "sentence": "A ________ flies a plane.",
          "answer": "pilot"
        },
        {
          "sentence": "A ________ grows food.",
          "answer": "farmer"
        }
      ],
      "options": [
        "baker",
        "pilot",
        "farmer"
      ],
      "answer": {
        "0": "baker",
        "1": "pilot",
        "2": "farmer"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l4:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "A doctor works in a ________.",
          "answer": "hospital"
        },
        {
          "sentence": "A baker works in a ________.",
          "answer": "bakery"
        },
        {
          "sentence": "A farmer works on a ________.",
          "answer": "farm"
        }
      ],
      "options": [
        "hospital",
        "bakery",
        "farm"
      ],
      "answer": {
        "0": "hospital",
        "1": "bakery",
        "2": "farm"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u2l4:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "A",
        "baker",
        "makes",
        "bread"
      ],
      "answer": "A baker makes bread.",
      "comparison": "a baker makes bread",
      "explanation": "A baker makes bread.",
      "id": "u2l4:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "A",
        "pilot",
        "flies",
        "a",
        "plane"
      ],
      "answer": "A pilot flies a plane.",
      "comparison": "a pilot flies a plane",
      "explanation": "A pilot flies a plane.",
      "id": "u2l4:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Doctors",
        "work",
        "in",
        "hospitals"
      ],
      "answer": "Doctors work in hospitals.",
      "comparison": "doctors work in hospitals",
      "explanation": "Doctors work in hospitals.",
      "id": "u2l4:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "father",
        "is",
        "a",
        "teacher"
      ],
      "answer": "My father is a teacher.",
      "comparison": "my father is a teacher",
      "explanation": "My father is a teacher.",
      "id": "u2l4:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "A pilot makes bread.",
      "answer": false,
      "explanation": "A baker makes bread.",
      "id": "u2l4:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A farmer works on a farm.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l4:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "We use “flies” with a pilot.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u2l4:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Who works on a farm?",
      "options": [
        "A farmer",
        "A doctor",
        "A pilot"
      ],
      "answer": "A farmer",
      "explanation": "",
      "id": "u2l4:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who teaches children?",
      "options": [
        "A teacher",
        "A baker",
        "A farmer"
      ],
      "answer": "A teacher",
      "explanation": "",
      "id": "u2l4:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who helps sick people?",
      "options": [
        "A doctor",
        "A pilot",
        "A baker"
      ],
      "answer": "A doctor",
      "explanation": "",
      "id": "u2l4:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u3l1": [
    {
      "type": "mcq",
      "prompt": "I go ___ the museum.",
      "options": [
        "to",
        "at",
        "under"
      ],
      "answer": "to",
      "explanation": "",
      "id": "u3l1:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "She is ___ the library.",
      "options": [
        "at",
        "to",
        "behind"
      ],
      "answer": "at",
      "explanation": "",
      "id": "u3l1:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We go ___ the park after school.",
      "options": [
        "to",
        "in",
        "between"
      ],
      "answer": "to",
      "explanation": "",
      "id": "u3l1:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar is ___ the train station.",
      "options": [
        "at",
        "to",
        "on"
      ],
      "answer": "at",
      "explanation": "",
      "id": "u3l1:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Where ___ you go?",
      "options": [
        "do",
        "does",
        "is"
      ],
      "answer": "do",
      "explanation": "",
      "id": "u3l1:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Where ___ Sara go?",
      "options": [
        "do",
        "does",
        "are"
      ],
      "answer": "does",
      "explanation": "",
      "id": "u3l1:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara ___ to the supermarket.",
      "options": [
        "go",
        "goes",
        "going"
      ],
      "answer": "goes",
      "explanation": "",
      "id": "u3l1:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ books from the library.",
      "options": [
        "borrow",
        "borrows",
        "borrowing"
      ],
      "answer": "borrow",
      "explanation": "",
      "id": "u3l1:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We borrow books from the ___.",
      "options": [
        "library",
        "supermarket",
        "station"
      ],
      "answer": "library",
      "explanation": "",
      "id": "u3l1:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "We buy food at the ___.",
      "options": [
        "supermarket",
        "museum",
        "park"
      ],
      "answer": "supermarket",
      "explanation": "",
      "id": "u3l1:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "We see old things in a ___.",
      "options": [
        "museum",
        "house",
        "train station"
      ],
      "answer": "museum",
      "explanation": "",
      "id": "u3l1:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "We play in the ___.",
      "options": [
        "park",
        "library",
        "station"
      ],
      "answer": "park",
      "explanation": "",
      "id": "u3l1:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the double-letter word: ___.",
      "options": [
        "grass",
        "photo",
        "exam"
      ],
      "answer": "grass",
      "explanation": "",
      "id": "u3l1:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the double-letter word: ___.",
      "options": [
        "bell",
        "duck",
        "city"
      ],
      "answer": "bell",
      "explanation": "",
      "id": "u3l1:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "I go ___ the museum.",
      "options": [
        "to",
        "at",
        "under",
        "behind"
      ],
      "answer": "to",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l1:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "She is ___ the library.",
      "options": [
        "at",
        "to",
        "between",
        "on"
      ],
      "answer": "at",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l1:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We ___ books from the library.",
      "options": [
        "borrow",
        "borrows",
        "buy",
        "play"
      ],
      "answer": "borrow",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l1:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Sara ___ to the park.",
      "options": [
        "goes",
        "go",
        "going",
        "went"
      ],
      "answer": "goes",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l1:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "We borrow books at the ________.",
          "answer": "library"
        },
        {
          "sentence": "We buy food at the ________.",
          "answer": "supermarket"
        },
        {
          "sentence": "We play in the ________.",
          "answer": "park"
        }
      ],
      "options": [
        "library",
        "supermarket",
        "park"
      ],
      "answer": {
        "0": "library",
        "1": "supermarket",
        "2": "park"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l1:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag the letters to complete each word.",
      "pairs": [
        {
          "sentence": "gra________",
          "answer": "ss"
        },
        {
          "sentence": "be________",
          "answer": "ll"
        },
        {
          "sentence": "bu________",
          "answer": "zz"
        }
      ],
      "options": [
        "ss",
        "ll",
        "zz"
      ],
      "answer": {
        "0": "ss",
        "1": "ll",
        "2": "zz"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l1:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "I",
        "go",
        "to",
        "the",
        "museum"
      ],
      "answer": "I go to the museum.",
      "comparison": "i go to the museum",
      "explanation": "I go to the museum.",
      "id": "u3l1:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "She",
        "is",
        "at",
        "the",
        "library"
      ],
      "answer": "She is at the library.",
      "comparison": "she is at the library",
      "explanation": "She is at the library.",
      "id": "u3l1:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "play",
        "in",
        "the",
        "park"
      ],
      "answer": "We play in the park.",
      "comparison": "we play in the park",
      "explanation": "We play in the park.",
      "id": "u3l1:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Where",
        "does",
        "Sara",
        "go"
      ],
      "answer": "Where does Sara go?",
      "comparison": "where does sara go",
      "explanation": "Where does Sara go?",
      "id": "u3l1:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "We can borrow books from a library.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l1:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“She go to the park” is correct.",
      "answer": false,
      "explanation": "Say “She goes to the park.”",
      "id": "u3l1:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “bell” ends with double l.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l1:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Where does Youssef borrow a book?",
      "options": [
        "The library",
        "The park",
        "The supermarket"
      ],
      "answer": "The library",
      "explanation": "",
      "id": "u3l1:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Where does he play?",
      "options": [
        "The park",
        "The museum",
        "The station"
      ],
      "answer": "The park",
      "explanation": "",
      "id": "u3l1:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Where can he buy food?",
      "options": [
        "The supermarket",
        "The library",
        "The museum"
      ],
      "answer": "The supermarket",
      "explanation": "",
      "id": "u3l1:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u3l2": [
    {
      "type": "mcq",
      "prompt": "Choose the correct sentence.",
      "options": [
        "Cairo is in Egypt.",
        "cairo is in egypt.",
        "Cairo is in Egypt"
      ],
      "answer": "Cairo is in Egypt.",
      "explanation": "",
      "id": "u3l2:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Which mark ends a question?",
      "options": [
        "?",
        ".",
        ","
      ],
      "answer": "?",
      "explanation": "",
      "id": "u3l2:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Choose the correct sentence.",
      "options": [
        "Where is Cairo Tower?",
        "where is Cairo Tower.",
        "Where is cairo tower?"
      ],
      "answer": "Where is Cairo Tower?",
      "explanation": "",
      "id": "u3l2:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Choose the correct sentence.",
      "options": [
        "The Pyramids are famous.",
        "the pyramids are famous.",
        "The Pyramids are famous"
      ],
      "answer": "The Pyramids are famous.",
      "explanation": "",
      "id": "u3l2:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A sentence starts with a ___ letter.",
      "options": [
        "capital",
        "small",
        "double"
      ],
      "answer": "capital",
      "explanation": "",
      "id": "u3l2:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A statement ends with a ___.",
      "options": [
        "period",
        "question mark",
        "comma only"
      ],
      "answer": "period",
      "explanation": "",
      "id": "u3l2:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The name “Egypt” begins with a ___ letter.",
      "options": [
        "capital",
        "small",
        "soft"
      ],
      "answer": "capital",
      "explanation": "",
      "id": "u3l2:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Complete: Alexandria Library ___ famous.",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u3l2:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The Pyramids of Giza are an Egyptian ___.",
      "options": [
        "landmark",
        "classroom",
        "chore"
      ],
      "answer": "landmark",
      "explanation": "",
      "id": "u3l2:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Something very old is ___.",
      "options": [
        "ancient",
        "careful",
        "busy"
      ],
      "answer": "ancient",
      "explanation": "",
      "id": "u3l2:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person visiting a place is a ___.",
      "options": [
        "tourist",
        "teacher",
        "cousin"
      ],
      "answer": "tourist",
      "explanation": "",
      "id": "u3l2:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Cairo Tower has a great ___.",
      "options": [
        "view",
        "bed",
        "gift"
      ],
      "answer": "view",
      "explanation": "",
      "id": "u3l2:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the ck word: ___.",
      "options": [
        "duck",
        "photo",
        "city"
      ],
      "answer": "duck",
      "explanation": "",
      "id": "u3l2:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the ck word: ___.",
      "options": [
        "sock",
        "exam",
        "green"
      ],
      "answer": "sock",
      "explanation": "",
      "id": "u3l2:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "Cairo ___ in Egypt.",
      "options": [
        "is",
        "are",
        "am",
        "be"
      ],
      "answer": "is",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l2:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Where is Cairo Tower___",
      "options": [
        "?",
        ".",
        "!",
        ","
      ],
      "answer": "?",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l2:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The Pyramids are ___.",
      "options": [
        "famous",
        "fine",
        "shy",
        "clean"
      ],
      "answer": "famous",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l2:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The word “du___” ends with ck.",
      "options": [
        "ck",
        "ph",
        "wh",
        "ss"
      ],
      "answer": "ck",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l2:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "A question ends with ________.",
          "answer": "?"
        },
        {
          "sentence": "A statement ends with ________.",
          "answer": "."
        },
        {
          "sentence": "A name starts with a ________ letter.",
          "answer": "capital"
        }
      ],
      "options": [
        "?",
        ".",
        "capital"
      ],
      "answer": {
        "0": "?",
        "1": ".",
        "2": "capital"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l2:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag the complete ck-word to each spelling pattern.",
      "pairs": [
        {
          "sentence": "Complete: du_",
          "answer": "duck"
        },
        {
          "sentence": "Complete: so_",
          "answer": "sock"
        },
        {
          "sentence": "Complete: tru_",
          "answer": "truck"
        }
      ],
      "options": [
        "duck",
        "sock",
        "truck"
      ],
      "answer": {
        "0": "duck",
        "1": "sock",
        "2": "truck"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l2:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Cairo",
        "is",
        "in",
        "Egypt"
      ],
      "answer": "Cairo is in Egypt.",
      "comparison": "cairo is in egypt",
      "explanation": "Cairo is in Egypt.",
      "id": "u3l2:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Where",
        "is",
        "Cairo",
        "Tower"
      ],
      "answer": "Where is Cairo Tower?",
      "comparison": "where is cairo tower",
      "explanation": "Where is Cairo Tower?",
      "id": "u3l2:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "Pyramids",
        "are",
        "famous"
      ],
      "answer": "The Pyramids are famous.",
      "comparison": "the pyramids are famous",
      "explanation": "The Pyramids are famous.",
      "id": "u3l2:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Laila",
        "visits",
        "Alexandria",
        "Library"
      ],
      "answer": "Laila visits Alexandria Library.",
      "comparison": "laila visits alexandria library",
      "explanation": "Laila visits Alexandria Library.",
      "id": "u3l2:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“egypt is beautiful.” is written correctly.",
      "answer": false,
      "explanation": "Write “Egypt is beautiful.”",
      "id": "u3l2:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A question ends with a question mark.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l2:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “duck” ends with ck.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l2:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Where does Laila read books?",
      "options": [
        "Alexandria Library",
        "Cairo Tower",
        "The zoo"
      ],
      "answer": "Alexandria Library",
      "explanation": "",
      "id": "u3l2:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What does she learn about?",
      "options": [
        "History",
        "Cooking",
        "Football only"
      ],
      "answer": "History",
      "explanation": "",
      "id": "u3l2:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Which landmark is very ancient?",
      "options": [
        "The Pyramids of Giza",
        "A supermarket",
        "A train station"
      ],
      "answer": "The Pyramids of Giza",
      "explanation": "",
      "id": "u3l2:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u3l3": [
    {
      "type": "mcq",
      "prompt": "The cat is ___ the table. It is below it.",
      "options": [
        "under",
        "on",
        "behind"
      ],
      "answer": "under",
      "explanation": "",
      "id": "u3l3:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The park is ___ the school and library.",
      "options": [
        "between",
        "under",
        "in"
      ],
      "answer": "between",
      "explanation": "",
      "id": "u3l3:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The book is ___ the desk.",
      "options": [
        "on",
        "behind",
        "between"
      ],
      "answer": "on",
      "explanation": "",
      "id": "u3l3:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The toy is ___ the box.",
      "options": [
        "in",
        "on",
        "between"
      ],
      "answer": "in",
      "explanation": "",
      "id": "u3l3:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The tree is ___ the house.",
      "options": [
        "behind",
        "under",
        "in"
      ],
      "answer": "behind",
      "explanation": "",
      "id": "u3l3:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The teacher is ___ the class.",
      "options": [
        "in front of",
        "under",
        "between"
      ],
      "answer": "in front of",
      "explanation": "",
      "id": "u3l3:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The bank is ___ the supermarket.",
      "options": [
        "next to",
        "under",
        "in"
      ],
      "answer": "next to",
      "explanation": "",
      "id": "u3l3:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Where ___ the toy car?",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u3l3:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A drawing that shows places is a ___.",
      "options": [
        "map",
        "goal",
        "gift"
      ],
      "answer": "map",
      "explanation": "",
      "id": "u3l3:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The place of something is its ___.",
      "options": [
        "location",
        "celebration",
        "tradition"
      ],
      "answer": "location",
      "explanation": "",
      "id": "u3l3:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Words that tell the way are ___.",
      "options": [
        "directions",
        "feelings",
        "chores"
      ],
      "answer": "directions",
      "explanation": "",
      "id": "u3l3:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The ball is ___ the box.",
      "options": [
        "in",
        "tall",
        "friendly"
      ],
      "answer": "in",
      "explanation": "",
      "id": "u3l3:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The cat is ___ the chair.",
      "options": [
        "under",
        "happy",
        "famous"
      ],
      "answer": "under",
      "explanation": "",
      "id": "u3l3:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The park is ___ the library and school.",
      "options": [
        "between",
        "carefully",
        "ancient"
      ],
      "answer": "between",
      "explanation": "",
      "id": "u3l3:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "The book is ___ the desk.",
      "options": [
        "on",
        "under",
        "between",
        "behind"
      ],
      "answer": "on",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l3:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The toy is ___ the box.",
      "options": [
        "in",
        "on",
        "next to",
        "behind"
      ],
      "answer": "in",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l3:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The tree is ___ the house.",
      "options": [
        "behind",
        "between",
        "under",
        "in"
      ],
      "answer": "behind",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l3:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The school is ___ the park and library.",
      "options": [
        "between",
        "on",
        "in",
        "behind"
      ],
      "answer": "between",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l3:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "The cat is below the table. It is ________ it.",
          "answer": "under"
        },
        {
          "sentence": "The book touches the desk. It is ________ it.",
          "answer": "on"
        },
        {
          "sentence": "The toy is inside the box. It is ________ it.",
          "answer": "in"
        }
      ],
      "options": [
        "under",
        "on",
        "in"
      ],
      "answer": {
        "0": "under",
        "1": "on",
        "2": "in"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l3:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "The teacher faces the class. She is ________ the class.",
          "answer": "in front of"
        },
        {
          "sentence": "The tree is at the back of the house. It is ________ it.",
          "answer": "behind"
        },
        {
          "sentence": "The bank is beside the shop. It is ________ it.",
          "answer": "next to"
        }
      ],
      "options": [
        "in front of",
        "behind",
        "next to"
      ],
      "answer": {
        "0": "in front of",
        "1": "behind",
        "2": "next to"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l3:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "cat",
        "is",
        "under",
        "the",
        "table"
      ],
      "answer": "The cat is under the table.",
      "comparison": "the cat is under the table",
      "explanation": "The cat is under the table.",
      "id": "u3l3:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "toy",
        "is",
        "in",
        "the",
        "box"
      ],
      "answer": "The toy is in the box.",
      "comparison": "the toy is in the box",
      "explanation": "The toy is in the box.",
      "id": "u3l3:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "park",
        "is",
        "next",
        "to",
        "the",
        "school"
      ],
      "answer": "The park is next to the school.",
      "comparison": "the park is next to the school",
      "explanation": "The park is next to the school.",
      "id": "u3l3:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Where",
        "is",
        "the",
        "toy",
        "car"
      ],
      "answer": "Where is the toy car?",
      "comparison": "where is the toy car",
      "explanation": "Where is the toy car?",
      "id": "u3l3:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“Under” means below something.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l3:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Between” is used for one thing in the middle of two things.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l3:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“The book is in the desk” always means it is on top.",
      "answer": false,
      "explanation": "Use “on” for the top of the desk.",
      "id": "u3l3:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Where does Samy find the car?",
      "options": [
        "In the box",
        "On the roof",
        "At school"
      ],
      "answer": "In the box",
      "explanation": "",
      "id": "u3l3:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Where does he look after the table?",
      "options": [
        "Under the bed",
        "In the museum",
        "At the station"
      ],
      "answer": "Under the bed",
      "explanation": "",
      "id": "u3l3:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Which word shows the car is inside the box?",
      "options": [
        "in",
        "on",
        "behind"
      ],
      "answer": "in",
      "explanation": "",
      "id": "u3l3:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u3l4": [
    {
      "type": "mcq",
      "prompt": "Yesterday, we ___ around the zoo.",
      "options": [
        "walk",
        "walked",
        "walking"
      ],
      "answer": "walked",
      "explanation": "",
      "id": "u3l4:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The monkey ___ into the tree.",
      "options": [
        "jump",
        "jumped",
        "jumps"
      ],
      "answer": "jumped",
      "explanation": "",
      "id": "u3l4:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The children ___ football.",
      "options": [
        "play",
        "played",
        "plays"
      ],
      "answer": "played",
      "explanation": "",
      "id": "u3l4:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ at the lion.",
      "options": [
        "smile",
        "smiled",
        "smiles"
      ],
      "answer": "smiled",
      "explanation": "",
      "id": "u3l4:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The boy ___ the small wall.",
      "options": [
        "climb",
        "climbed",
        "climbs"
      ],
      "answer": "climbed",
      "explanation": "",
      "id": "u3l4:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We ___ lunch at noon.",
      "options": [
        "eat",
        "ate",
        "eats"
      ],
      "answer": "ate",
      "explanation": "",
      "id": "u3l4:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The bus ___ at eight.",
      "options": [
        "arrive",
        "arrived",
        "arrives"
      ],
      "answer": "arrived",
      "explanation": "",
      "id": "u3l4:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The guide ___ about animals.",
      "options": [
        "talk",
        "talked",
        "talks"
      ],
      "answer": "talked",
      "explanation": "",
      "id": "u3l4:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A visit with your class is a school ___.",
      "options": [
        "trip",
        "goal",
        "chore"
      ],
      "answer": "trip",
      "explanation": "",
      "id": "u3l4:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who explains a place is a ___.",
      "options": [
        "guide",
        "pilot",
        "cousin"
      ],
      "answer": "guide",
      "explanation": "",
      "id": "u3l4:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Lions and monkeys are ___.",
      "options": [
        "animals",
        "landmarks",
        "chores"
      ],
      "answer": "animals",
      "explanation": "",
      "id": "u3l4:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "We eat food at noon. It is ___.",
      "options": [
        "lunch",
        "breakfast",
        "homework"
      ],
      "answer": "lunch",
      "explanation": "",
      "id": "u3l4:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The monkey went up the tree. It ___.",
      "options": [
        "climbed",
        "donated",
        "borrowed"
      ],
      "answer": "climbed",
      "explanation": "",
      "id": "u3l4:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The children moved on foot. They ___.",
      "options": [
        "walked",
        "flew",
        "baked"
      ],
      "answer": "walked",
      "explanation": "",
      "id": "u3l4:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "Yesterday, we ___ around the zoo.",
      "options": [
        "walked",
        "walk",
        "walking",
        "walks"
      ],
      "answer": "walked",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l4:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The monkey ___ into the tree.",
      "options": [
        "jumped",
        "jump",
        "jumps",
        "jumping"
      ],
      "answer": "jumped",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l4:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The children ___ football.",
      "options": [
        "played",
        "play",
        "plays",
        "playing"
      ],
      "answer": "played",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l4:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The guide ___ about animals.",
      "options": [
        "talked",
        "talk",
        "talks",
        "talking"
      ],
      "answer": "talked",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u3l4:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag the past verb to the correct base verb.",
      "pairs": [
        {
          "sentence": "walk → ________",
          "answer": "walked"
        },
        {
          "sentence": "play → ________",
          "answer": "played"
        },
        {
          "sentence": "jump → ________",
          "answer": "jumped"
        }
      ],
      "options": [
        "walked",
        "played",
        "jumped"
      ],
      "answer": {
        "0": "walked",
        "1": "played",
        "2": "jumped"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l4:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "The monkey went up the tree. It ________.",
          "answer": "climbed"
        },
        {
          "sentence": "The children moved on foot. They ________.",
          "answer": "walked"
        },
        {
          "sentence": "Mona looked happy. She ________.",
          "answer": "smiled"
        }
      ],
      "options": [
        "climbed",
        "walked",
        "smiled"
      ],
      "answer": {
        "0": "climbed",
        "1": "walked",
        "2": "smiled"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u3l4:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "walked",
        "around",
        "the",
        "zoo"
      ],
      "answer": "We walked around the zoo.",
      "comparison": "we walked around the zoo",
      "explanation": "We walked around the zoo.",
      "id": "u3l4:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "monkey",
        "jumped",
        "into",
        "the",
        "tree"
      ],
      "answer": "The monkey jumped into the tree.",
      "comparison": "the monkey jumped into the tree",
      "explanation": "The monkey jumped into the tree.",
      "id": "u3l4:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "children",
        "played",
        "football"
      ],
      "answer": "The children played football.",
      "comparison": "the children played football",
      "explanation": "The children played football.",
      "id": "u3l4:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "guide",
        "talked",
        "about",
        "animals"
      ],
      "answer": "The guide talked about animals.",
      "comparison": "the guide talked about animals",
      "explanation": "The guide talked about animals.",
      "id": "u3l4:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "We often add -ed to regular verbs in the past.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l4:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Yesterday, we walk around the zoo” is correct.",
      "answer": false,
      "explanation": "Say “Yesterday, we walked around the zoo.”",
      "id": "u3l4:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Played” is the past form of “play”.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u3l4:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "How do the students travel?",
      "options": [
        "By bus",
        "By plane",
        "By boat"
      ],
      "answer": "By bus",
      "explanation": "",
      "id": "u3l4:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who tells them about animals?",
      "options": [
        "A guide",
        "A baker",
        "A cousin"
      ],
      "answer": "A guide",
      "explanation": "",
      "id": "u3l4:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Where do the students go?",
      "options": [
        "The zoo",
        "The library",
        "The bakery"
      ],
      "answer": "The zoo",
      "explanation": "",
      "id": "u3l4:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u4l1": [
    {
      "type": "mcq",
      "prompt": "They ___ excited yesterday.",
      "options": [
        "was",
        "were",
        "are"
      ],
      "answer": "were",
      "explanation": "",
      "id": "u4l1:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar ___ a bird.",
      "options": [
        "see",
        "saw",
        "seen"
      ],
      "answer": "saw",
      "explanation": "",
      "id": "u4l1:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We ___ to the garden.",
      "options": [
        "go",
        "went",
        "goes"
      ],
      "answer": "went",
      "explanation": "",
      "id": "u4l1:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I ___ tired yesterday.",
      "options": [
        "was",
        "were",
        "am"
      ],
      "answer": "was",
      "explanation": "",
      "id": "u4l1:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The boys ___ scared.",
      "options": [
        "was",
        "were",
        "is"
      ],
      "answer": "were",
      "explanation": "",
      "id": "u4l1:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara ___ a cat.",
      "options": [
        "saw",
        "see",
        "sees"
      ],
      "answer": "saw",
      "explanation": "",
      "id": "u4l1:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ a picnic.",
      "options": [
        "have",
        "had",
        "has"
      ],
      "answer": "had",
      "explanation": "",
      "id": "u4l1:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "He ___ his homework.",
      "options": [
        "did",
        "do",
        "does"
      ],
      "answer": "did",
      "explanation": "",
      "id": "u4l1:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I won a prize. I feel ___.",
      "options": [
        "happy",
        "sad",
        "bored"
      ],
      "answer": "happy",
      "explanation": "",
      "id": "u4l1:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I hear a loud noise. I feel ___.",
      "options": [
        "scared",
        "proud",
        "fine"
      ],
      "answer": "scared",
      "explanation": "",
      "id": "u4l1:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I have no energy. I am ___.",
      "options": [
        "tired",
        "excited",
        "angry"
      ],
      "answer": "tired",
      "explanation": "",
      "id": "u4l1:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "I want to play but there is nothing to do. I am ___.",
      "options": [
        "bored",
        "happy",
        "helpful"
      ],
      "answer": "bored",
      "explanation": "",
      "id": "u4l1:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the hard c word: ___.",
      "options": [
        "cat",
        "city",
        "face"
      ],
      "answer": "cat",
      "explanation": "",
      "id": "u4l1:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the hard c word: ___.",
      "options": [
        "cold",
        "pencil",
        "nice"
      ],
      "answer": "cold",
      "explanation": "",
      "id": "u4l1:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "They ___ excited yesterday.",
      "options": [
        "were",
        "was",
        "are",
        "is"
      ],
      "answer": "were",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l1:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar ___ a bird.",
      "options": [
        "saw",
        "see",
        "sees",
        "seeing"
      ],
      "answer": "saw",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l1:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We ___ to the garden.",
      "options": [
        "went",
        "go",
        "goes",
        "going"
      ],
      "answer": "went",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l1:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "I heard a loud noise. I felt ___.",
      "options": [
        "scared",
        "helpful",
        "famous",
        "clean"
      ],
      "answer": "scared",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l1:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "I won a prize. I am ________.",
          "answer": "happy"
        },
        {
          "sentence": "I hear a loud noise. I am ________.",
          "answer": "scared"
        },
        {
          "sentence": "I have no energy. I am ________.",
          "answer": "tired"
        }
      ],
      "options": [
        "happy",
        "scared",
        "tired"
      ],
      "answer": {
        "0": "happy",
        "1": "scared",
        "2": "tired"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u4l1:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "They ________ excited.",
          "answer": "were"
        },
        {
          "sentence": "Omar ________ a bird.",
          "answer": "saw"
        },
        {
          "sentence": "We ________ to the garden.",
          "answer": "went"
        }
      ],
      "options": [
        "were",
        "saw",
        "went"
      ],
      "answer": {
        "0": "were",
        "1": "saw",
        "2": "went"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u4l1:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "They",
        "were",
        "excited",
        "yesterday"
      ],
      "answer": "They were excited yesterday.",
      "comparison": "they were excited yesterday",
      "explanation": "They were excited yesterday.",
      "id": "u4l1:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Omar",
        "saw",
        "a",
        "bird"
      ],
      "answer": "Omar saw a bird.",
      "comparison": "omar saw a bird",
      "explanation": "Omar saw a bird.",
      "id": "u4l1:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "went",
        "to",
        "the",
        "garden"
      ],
      "answer": "We went to the garden.",
      "comparison": "we went to the garden",
      "explanation": "We went to the garden.",
      "id": "u4l1:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Finally",
        "the",
        "boys",
        "felt",
        "happy"
      ],
      "answer": "Finally, the boys felt happy.",
      "comparison": "finally the boys felt happy",
      "explanation": "Finally, the boys felt happy.",
      "id": "u4l1:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "We use “were” with they in the past.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u4l1:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Omar see a bird yesterday” is correct.",
      "answer": false,
      "explanation": "Say “Omar saw a bird.”",
      "id": "u4l1:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “cat” has a hard c sound.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u4l1:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "How did the boys feel at first?",
      "options": [
        "Scared",
        "Proud",
        "Bored"
      ],
      "answer": "Scared",
      "explanation": "",
      "id": "u4l1:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "How did they feel finally?",
      "options": [
        "Happy",
        "Angry",
        "Tired"
      ],
      "answer": "Happy",
      "explanation": "",
      "id": "u4l1:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Where were the boys?",
      "options": [
        "In the garden",
        "At the bakery",
        "On a plane"
      ],
      "answer": "In the garden",
      "explanation": "",
      "id": "u4l1:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u4l2": [
    {
      "type": "mcq",
      "prompt": "She was hurt, ___ she was brave.",
      "options": [
        "but",
        "and",
        "then"
      ],
      "answer": "but",
      "explanation": "",
      "id": "u4l2:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "He came ___ helped her.",
      "options": [
        "and",
        "but",
        "or"
      ],
      "answer": "and",
      "explanation": "",
      "id": "u4l2:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara fell, ___ her friend helped her.",
      "options": [
        "then",
        "because",
        "under"
      ],
      "answer": "then",
      "explanation": "",
      "id": "u4l2:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara ___ on the ground.",
      "options": [
        "fall",
        "fell",
        "falls"
      ],
      "answer": "fell",
      "explanation": "",
      "id": "u4l2:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Her friend ___ her.",
      "options": [
        "help",
        "helped",
        "helps"
      ],
      "answer": "helped",
      "explanation": "",
      "id": "u4l2:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The nurse ___ her knee.",
      "options": [
        "check",
        "checked",
        "checks"
      ],
      "answer": "checked",
      "explanation": "",
      "id": "u4l2:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "She ___ to the nurse.",
      "options": [
        "go",
        "went",
        "goes"
      ],
      "answer": "went",
      "explanation": "",
      "id": "u4l2:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara was hurt ___ calm.",
      "options": [
        "but",
        "in",
        "on"
      ],
      "answer": "but",
      "explanation": "",
      "id": "u4l2:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara fell and her knee ___.",
      "options": [
        "hurt",
        "won",
        "grew"
      ],
      "answer": "hurt",
      "explanation": "",
      "id": "u4l2:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who helps sick people at school can be a ___.",
      "options": [
        "nurse",
        "pilot",
        "captain"
      ],
      "answer": "nurse",
      "explanation": "",
      "id": "u4l2:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who helps others is ___.",
      "options": [
        "kind",
        "ancient",
        "busy"
      ],
      "answer": "kind",
      "explanation": "",
      "id": "u4l2:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Walk slowly and be ___.",
      "options": [
        "careful",
        "famous",
        "bored"
      ],
      "answer": "careful",
      "explanation": "",
      "id": "u4l2:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the soft c word: ___.",
      "options": [
        "city",
        "cat",
        "cold"
      ],
      "answer": "city",
      "explanation": "",
      "id": "u4l2:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the soft c word: ___.",
      "options": [
        "pencil",
        "carry",
        "come"
      ],
      "answer": "pencil",
      "explanation": "",
      "id": "u4l2:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "Sara ___ on the ground.",
      "options": [
        "fell",
        "fall",
        "falls",
        "falling"
      ],
      "answer": "fell",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l2:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Her friend ___ her.",
      "options": [
        "helped",
        "help",
        "helps",
        "helping"
      ],
      "answer": "helped",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l2:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "She was hurt, ___ she was brave.",
      "options": [
        "but",
        "and",
        "then",
        "in"
      ],
      "answer": "but",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l2:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "He came ___ helped her.",
      "options": [
        "and",
        "but",
        "under",
        "from"
      ],
      "answer": "and",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l2:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Sara ________ down.",
          "answer": "fell"
        },
        {
          "sentence": "Her friend ________ her.",
          "answer": "helped"
        },
        {
          "sentence": "The nurse ________ her knee.",
          "answer": "checked"
        }
      ],
      "options": [
        "fell",
        "helped",
        "checked"
      ],
      "answer": {
        "0": "fell",
        "1": "helped",
        "2": "checked"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u4l2:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "She was hurt, ________ she was brave.",
          "answer": "but"
        },
        {
          "sentence": "He came ________ helped.",
          "answer": "and"
        },
        {
          "sentence": "She fell, ________ her friend came.",
          "answer": "then"
        }
      ],
      "options": [
        "but",
        "and",
        "then"
      ],
      "answer": {
        "0": "but",
        "1": "and",
        "2": "then"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u4l2:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Sara",
        "fell",
        "on",
        "the",
        "ground"
      ],
      "answer": "Sara fell on the ground.",
      "comparison": "sara fell on the ground",
      "explanation": "Sara fell on the ground.",
      "id": "u4l2:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Her",
        "friend",
        "helped",
        "her"
      ],
      "answer": "Her friend helped her.",
      "comparison": "her friend helped her",
      "explanation": "Her friend helped her.",
      "id": "u4l2:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "nurse",
        "checked",
        "her",
        "knee"
      ],
      "answer": "The nurse checked her knee.",
      "comparison": "the nurse checked her knee",
      "explanation": "The nurse checked her knee.",
      "id": "u4l2:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "She",
        "was",
        "hurt",
        "but",
        "brave"
      ],
      "answer": "She was hurt but brave.",
      "comparison": "she was hurt but brave",
      "explanation": "She was hurt but brave.",
      "id": "u4l2:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“But” can join two different ideas.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u4l2:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “city” has a soft c sound.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u4l2:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Sara fall yesterday” is correct.",
      "answer": false,
      "explanation": "Say “Sara fell yesterday.”",
      "id": "u4l2:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Who checked Sara’s knee?",
      "options": [
        "The nurse",
        "The pilot",
        "The baker"
      ],
      "answer": "The nurse",
      "explanation": "",
      "id": "u4l2:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "How did her friend act?",
      "options": [
        "Kindly",
        "Angrily",
        "Sleepily"
      ],
      "answer": "Kindly",
      "explanation": "",
      "id": "u4l2:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What happened to Sara?",
      "options": [
        "She fell",
        "She won a match",
        "She flew a plane"
      ],
      "answer": "She fell",
      "explanation": "",
      "id": "u4l2:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u4l3": [
    {
      "type": "mcq",
      "prompt": "The team ___ the match.",
      "options": [
        "win",
        "won",
        "wins"
      ],
      "answer": "won",
      "explanation": "",
      "id": "u4l3:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar ___ a goal.",
      "options": [
        "score",
        "scored",
        "scores"
      ],
      "answer": "scored",
      "explanation": "",
      "id": "u4l3:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The players ___ hard.",
      "options": [
        "practice",
        "practised",
        "practises"
      ],
      "answer": "practised",
      "explanation": "",
      "id": "u4l3:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The fans ___ loudly.",
      "options": [
        "cheer",
        "cheered",
        "cheers"
      ],
      "answer": "cheered",
      "explanation": "",
      "id": "u4l3:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar ___ nervous before the match.",
      "options": [
        "was",
        "were",
        "is"
      ],
      "answer": "was",
      "explanation": "",
      "id": "u4l3:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The players ___ proud after the win.",
      "options": [
        "was",
        "were",
        "are"
      ],
      "answer": "were",
      "explanation": "",
      "id": "u4l3:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The captain ___ the ball.",
      "options": [
        "pass",
        "passed",
        "passes"
      ],
      "answer": "passed",
      "explanation": "",
      "id": "u4l3:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ after the match.",
      "options": [
        "celebrate",
        "celebrated",
        "celebrates"
      ],
      "answer": "celebrated",
      "explanation": "",
      "id": "u4l3:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A sports game between teams is a ___.",
      "options": [
        "match",
        "gift",
        "map"
      ],
      "answer": "match",
      "explanation": "",
      "id": "u4l3:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A point in football is a ___.",
      "options": [
        "goal",
        "chore",
        "step"
      ],
      "answer": "goal",
      "explanation": "",
      "id": "u4l3:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "People shout happily to ___.",
      "options": [
        "cheer",
        "borrow",
        "donate"
      ],
      "answer": "cheer",
      "explanation": "",
      "id": "u4l3:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Omar felt worried before the game. He was ___.",
      "options": [
        "nervous",
        "ancient",
        "careful"
      ],
      "answer": "nervous",
      "explanation": "",
      "id": "u4l3:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "After winning, the team felt ___.",
      "options": [
        "proud",
        "bored",
        "scared"
      ],
      "answer": "proud",
      "explanation": "",
      "id": "u4l3:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Players train before a match. They ___.",
      "options": [
        "practice",
        "visit",
        "cook"
      ],
      "answer": "practice",
      "explanation": "",
      "id": "u4l3:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "The team ___ the match.",
      "options": [
        "won",
        "win",
        "wins",
        "winning"
      ],
      "answer": "won",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l3:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar ___ a goal.",
      "options": [
        "scored",
        "score",
        "scores",
        "scoring"
      ],
      "answer": "scored",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l3:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The fans ___ loudly.",
      "options": [
        "cheered",
        "cheer",
        "cheers",
        "cheering"
      ],
      "answer": "cheered",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l3:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar felt ___ before the match.",
      "options": [
        "nervous",
        "safe",
        "ancient",
        "clean"
      ],
      "answer": "nervous",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u4l3:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "The team ________ the match.",
          "answer": "won"
        },
        {
          "sentence": "Omar ________ a goal.",
          "answer": "scored"
        },
        {
          "sentence": "The fans ________.",
          "answer": "cheered"
        }
      ],
      "options": [
        "won",
        "scored",
        "cheered"
      ],
      "answer": {
        "0": "won",
        "1": "scored",
        "2": "cheered"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u4l3:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Before the match, Omar was ________.",
          "answer": "nervous"
        },
        {
          "sentence": "After the win, he was ________.",
          "answer": "proud"
        },
        {
          "sentence": "The team had a big ________.",
          "answer": "win"
        }
      ],
      "options": [
        "nervous",
        "proud",
        "win"
      ],
      "answer": {
        "0": "nervous",
        "1": "proud",
        "2": "win"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u4l3:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "team",
        "won",
        "the",
        "match"
      ],
      "answer": "The team won the match.",
      "comparison": "the team won the match",
      "explanation": "The team won the match.",
      "id": "u4l3:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Omar",
        "scored",
        "a",
        "goal"
      ],
      "answer": "Omar scored a goal.",
      "comparison": "omar scored a goal",
      "explanation": "Omar scored a goal.",
      "id": "u4l3:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "fans",
        "cheered",
        "loudly"
      ],
      "answer": "The fans cheered loudly.",
      "comparison": "the fans cheered loudly",
      "explanation": "The fans cheered loudly.",
      "id": "u4l3:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "players",
        "celebrated",
        "the",
        "win"
      ],
      "answer": "The players celebrated the win.",
      "comparison": "the players celebrated the win",
      "explanation": "The players celebrated the win.",
      "id": "u4l3:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“Won” is the past form of “win”.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u4l3:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Omar score a goal yesterday” is correct.",
      "answer": false,
      "explanation": "Say “Omar scored a goal.”",
      "id": "u4l3:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A team can celebrate after a win.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u4l3:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "How did Omar feel before the match?",
      "options": [
        "Nervous",
        "Bored",
        "Sleepy"
      ],
      "answer": "Nervous",
      "explanation": "",
      "id": "u4l3:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What happened at the end?",
      "options": [
        "The team won",
        "The school closed",
        "The bus left"
      ],
      "answer": "The team won",
      "explanation": "",
      "id": "u4l3:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What did Omar score?",
      "options": [
        "A goal",
        "A book",
        "A gift"
      ],
      "answer": "A goal",
      "explanation": "",
      "id": "u4l3:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u5l1": [
    {
      "type": "mcq",
      "prompt": "My sister ___ the dishes.",
      "options": [
        "wash",
        "washes",
        "washing"
      ],
      "answer": "washes",
      "explanation": "",
      "id": "u5l1:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We ___ the room together.",
      "options": [
        "tidy",
        "tidies",
        "tidying"
      ],
      "answer": "tidy",
      "explanation": "",
      "id": "u5l1:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar ___ the floor.",
      "options": [
        "sweep",
        "sweeps",
        "sweeping"
      ],
      "answer": "sweeps",
      "explanation": "",
      "id": "u5l1:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I ___ the table.",
      "options": [
        "set",
        "sets",
        "setting"
      ],
      "answer": "set",
      "explanation": "",
      "id": "u5l1:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ her toys.",
      "options": [
        "share",
        "shares",
        "sharing"
      ],
      "answer": "shares",
      "explanation": "",
      "id": "u5l1:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ for the plants.",
      "options": [
        "care",
        "cares",
        "caring"
      ],
      "answer": "care",
      "explanation": "",
      "id": "u5l1:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Everyone ___ a job.",
      "options": [
        "have",
        "has",
        "having"
      ],
      "answer": "has",
      "explanation": "",
      "id": "u5l1:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The chores ___ quickly.",
      "options": [
        "finish",
        "finishes",
        "finishing"
      ],
      "answer": "finish",
      "explanation": "",
      "id": "u5l1:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A small job at home is a ___.",
      "options": [
        "chore",
        "landmark",
        "goal"
      ],
      "answer": "chore",
      "explanation": "",
      "id": "u5l1:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To make a room neat is to ___.",
      "options": [
        "tidy up",
        "score",
        "borrow"
      ],
      "answer": "tidy up",
      "explanation": "",
      "id": "u5l1:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To clean the floor with a broom is to ___.",
      "options": [
        "sweep",
        "fly",
        "read"
      ],
      "answer": "sweep",
      "explanation": "",
      "id": "u5l1:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Doing your part is a ___.",
      "options": [
        "responsibility",
        "celebration",
        "direction"
      ],
      "answer": "responsibility",
      "explanation": "",
      "id": "u5l1:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The work is equal for everyone. It is ___.",
      "options": [
        "fair",
        "ancient",
        "nervous"
      ],
      "answer": "fair",
      "explanation": "",
      "id": "u5l1:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "We finish faster when we work ___.",
      "options": [
        "together",
        "behind",
        "slowly"
      ],
      "answer": "together",
      "explanation": "",
      "id": "u5l1:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "My sister ___ the dishes.",
      "options": [
        "washes",
        "wash",
        "washing",
        "washed"
      ],
      "answer": "washes",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l1:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar ___ the floor.",
      "options": [
        "sweeps",
        "sweep",
        "sweeping",
        "swept"
      ],
      "answer": "sweeps",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l1:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We ___ the room together.",
      "options": [
        "tidy",
        "tidies",
        "tidying",
        "tided"
      ],
      "answer": "tidy",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l1:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Everyone has a ___.",
      "options": [
        "responsibility",
        "museum",
        "holiday",
        "goal"
      ],
      "answer": "responsibility",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l1:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Mona ________ the dishes.",
          "answer": "washes"
        },
        {
          "sentence": "Omar ________ the floor.",
          "answer": "sweeps"
        },
        {
          "sentence": "We ________ the room.",
          "answer": "tidy"
        }
      ],
      "options": [
        "washes",
        "sweeps",
        "tidy"
      ],
      "answer": {
        "0": "washes",
        "1": "sweeps",
        "2": "tidy"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l1:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "A job at home is a ________.",
          "answer": "chore"
        },
        {
          "sentence": "Equal work is ________.",
          "answer": "fair"
        },
        {
          "sentence": "Working with others is working ________.",
          "answer": "together"
        }
      ],
      "options": [
        "chore",
        "fair",
        "together"
      ],
      "answer": {
        "0": "chore",
        "1": "fair",
        "2": "together"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l1:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "tidy",
        "the",
        "room",
        "together"
      ],
      "answer": "We tidy the room together.",
      "comparison": "we tidy the room together",
      "explanation": "We tidy the room together.",
      "id": "u5l1:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "My",
        "sister",
        "washes",
        "the",
        "dishes"
      ],
      "answer": "My sister washes the dishes.",
      "comparison": "my sister washes the dishes",
      "explanation": "My sister washes the dishes.",
      "id": "u5l1:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Omar",
        "sweeps",
        "the",
        "floor"
      ],
      "answer": "Omar sweeps the floor.",
      "comparison": "omar sweeps the floor",
      "explanation": "Omar sweeps the floor.",
      "id": "u5l1:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Everyone",
        "has",
        "a",
        "responsibility"
      ],
      "answer": "Everyone has a responsibility.",
      "comparison": "everyone has a responsibility",
      "explanation": "Everyone has a responsibility.",
      "id": "u5l1:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“My sister wash the dishes” is correct.",
      "answer": false,
      "explanation": "Say “My sister washes the dishes.”",
      "id": "u5l1:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Teamwork can make chores finish quickly.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l1:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A chore is a small job at home.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l1:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Why do the chores finish quickly?",
      "options": [
        "Everyone helps",
        "No one works",
        "The room is empty"
      ],
      "answer": "Everyone helps",
      "explanation": "",
      "id": "u5l1:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What makes the work fun?",
      "options": [
        "Music and teamwork",
        "Sleeping",
        "Being alone"
      ],
      "answer": "Music and teamwork",
      "explanation": "",
      "id": "u5l1:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who should help with chores?",
      "options": [
        "Everyone",
        "Only one child",
        "Nobody"
      ],
      "answer": "Everyone",
      "explanation": "",
      "id": "u5l1:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u5l2": [
    {
      "type": "mcq",
      "prompt": "Let’s ___ a plan.",
      "options": [
        "make",
        "makes",
        "making"
      ],
      "answer": "make",
      "explanation": "",
      "id": "u5l2:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I can ___ the bridge.",
      "options": [
        "test",
        "tests",
        "tested"
      ],
      "answer": "test",
      "explanation": "",
      "id": "u5l2:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We can ___ the problem.",
      "options": [
        "solve",
        "solves",
        "solving"
      ],
      "answer": "solve",
      "explanation": "",
      "id": "u5l2:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Sara can ___ the pieces.",
      "options": [
        "find",
        "finds",
        "found"
      ],
      "answer": "find",
      "explanation": "",
      "id": "u5l2:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Let’s ___ together.",
      "options": [
        "work",
        "works",
        "worked"
      ],
      "answer": "work",
      "explanation": "",
      "id": "u5l2:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The team ___ on one idea.",
      "options": [
        "agree",
        "agrees",
        "agreeing"
      ],
      "answer": "agrees",
      "explanation": "",
      "id": "u5l2:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar ___ the weak part.",
      "options": [
        "fix",
        "fixes",
        "fixing"
      ],
      "answer": "fixes",
      "explanation": "",
      "id": "u5l2:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Everyone ___ a role.",
      "options": [
        "has",
        "have",
        "having"
      ],
      "answer": "has",
      "explanation": "",
      "id": "u5l2:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Working well with others is ___.",
      "options": [
        "teamwork",
        "homework",
        "history"
      ],
      "answer": "teamwork",
      "explanation": "",
      "id": "u5l2:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A thought for a project is an ___.",
      "options": [
        "idea",
        "exam",
        "exit"
      ],
      "answer": "idea",
      "explanation": "",
      "id": "u5l2:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A job in a team is a ___.",
      "options": [
        "role",
        "goal",
        "gift"
      ],
      "answer": "role",
      "explanation": "",
      "id": "u5l2:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To make something is to ___.",
      "options": [
        "build",
        "borrow",
        "celebrate"
      ],
      "answer": "build",
      "explanation": "",
      "id": "u5l2:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the hard g word: ___.",
      "options": [
        "game",
        "giraffe",
        "page"
      ],
      "answer": "game",
      "explanation": "",
      "id": "u5l2:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the hard g word: ___.",
      "options": [
        "green",
        "Egypt",
        "huge"
      ],
      "answer": "green",
      "explanation": "",
      "id": "u5l2:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "Let’s ___ a plan.",
      "options": [
        "make",
        "makes",
        "making",
        "made"
      ],
      "answer": "make",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l2:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "I can ___ the bridge.",
      "options": [
        "test",
        "tests",
        "tested",
        "testing"
      ],
      "answer": "test",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l2:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We can ___ the problem.",
      "options": [
        "solve",
        "solves",
        "solving",
        "solved"
      ],
      "answer": "solve",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l2:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar ___ the weak part.",
      "options": [
        "fixes",
        "fix",
        "fixed",
        "fixing"
      ],
      "answer": "fixes",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l2:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Let’s ________ a plan.",
          "answer": "make"
        },
        {
          "sentence": "We can ________ the problem.",
          "answer": "solve"
        },
        {
          "sentence": "I can ________ the bridge.",
          "answer": "test"
        }
      ],
      "options": [
        "make",
        "solve",
        "test"
      ],
      "answer": {
        "0": "make",
        "1": "solve",
        "2": "test"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l2:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "A team job is a ________.",
          "answer": "role"
        },
        {
          "sentence": "A thought is an ________.",
          "answer": "idea"
        },
        {
          "sentence": "Good group work is ________.",
          "answer": "teamwork"
        }
      ],
      "options": [
        "role",
        "idea",
        "teamwork"
      ],
      "answer": {
        "0": "role",
        "1": "idea",
        "2": "teamwork"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l2:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Let",
        "us",
        "make",
        "a",
        "plan"
      ],
      "answer": "Let us make a plan.",
      "comparison": "let us make a plan",
      "explanation": "Let us make a plan.",
      "id": "u5l2:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "can",
        "solve",
        "the",
        "problem"
      ],
      "answer": "We can solve the problem.",
      "comparison": "we can solve the problem",
      "explanation": "We can solve the problem.",
      "id": "u5l2:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "I",
        "can",
        "test",
        "the",
        "bridge"
      ],
      "answer": "I can test the bridge.",
      "comparison": "i can test the bridge",
      "explanation": "I can test the bridge.",
      "id": "u5l2:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Everyone",
        "has",
        "a",
        "role"
      ],
      "answer": "Everyone has a role.",
      "comparison": "everyone has a role",
      "explanation": "Everyone has a role.",
      "id": "u5l2:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "After “can”, use the base verb.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l2:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Let’s makes a plan” is correct.",
      "answer": false,
      "explanation": "Say “Let’s make a plan.”",
      "id": "u5l2:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “game” has a hard g sound.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l2:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What does the team build?",
      "options": [
        "A bridge model",
        "A plane",
        "A bakery"
      ],
      "answer": "A bridge model",
      "explanation": "",
      "id": "u5l2:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What do they do after testing?",
      "options": [
        "Fix a weak part",
        "Go to sleep",
        "Throw it away"
      ],
      "answer": "Fix a weak part",
      "explanation": "",
      "id": "u5l2:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Why does each child have a role?",
      "options": [
        "To work as a team",
        "To be alone",
        "To miss the project"
      ],
      "answer": "To work as a team",
      "explanation": "",
      "id": "u5l2:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u5l3": [
    {
      "type": "mcq",
      "prompt": "Yesterday, the players ___ the ball.",
      "options": [
        "pass",
        "passed",
        "passes"
      ],
      "answer": "passed",
      "explanation": "",
      "id": "u5l3:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The team ___ the match.",
      "options": [
        "win",
        "won",
        "wins"
      ],
      "answer": "won",
      "explanation": "",
      "id": "u5l3:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The captain ___ the team.",
      "options": [
        "lead",
        "led",
        "leads"
      ],
      "answer": "led",
      "explanation": "",
      "id": "u5l3:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The players ___ hard.",
      "options": [
        "practice",
        "practised",
        "practises"
      ],
      "answer": "practised",
      "explanation": "",
      "id": "u5l3:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ fair play.",
      "options": [
        "show",
        "showed",
        "shows"
      ],
      "answer": "showed",
      "explanation": "",
      "id": "u5l3:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The fans ___ for the team.",
      "options": [
        "cheer",
        "cheered",
        "cheers"
      ],
      "answer": "cheered",
      "explanation": "",
      "id": "u5l3:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The defender ___ the goal.",
      "options": [
        "protect",
        "protected",
        "protects"
      ],
      "answer": "protected",
      "explanation": "",
      "id": "u5l3:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The players ___ respect.",
      "options": [
        "have",
        "had",
        "has"
      ],
      "answer": "had",
      "explanation": "",
      "id": "u5l3:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "To send the ball to a teammate is to ___.",
      "options": [
        "pass",
        "donate",
        "borrow"
      ],
      "answer": "pass",
      "explanation": "",
      "id": "u5l3:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A player who leads the team is the ___.",
      "options": [
        "captain",
        "baker",
        "tourist"
      ],
      "answer": "captain",
      "explanation": "",
      "id": "u5l3:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person on your team is a ___.",
      "options": [
        "teammate",
        "neighbour",
        "cousin"
      ],
      "answer": "teammate",
      "explanation": "",
      "id": "u5l3:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Good behaviour in sport is ___.",
      "options": [
        "fair play",
        "homework",
        "history"
      ],
      "answer": "fair play",
      "explanation": "",
      "id": "u5l3:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the soft g word: ___.",
      "options": [
        "giraffe",
        "game",
        "green"
      ],
      "answer": "giraffe",
      "explanation": "",
      "id": "u5l3:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the soft g word: ___.",
      "options": [
        "page",
        "dog",
        "big"
      ],
      "answer": "page",
      "explanation": "",
      "id": "u5l3:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "The players ___ the ball.",
      "options": [
        "passed",
        "pass",
        "passes",
        "passing"
      ],
      "answer": "passed",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l3:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The team ___ the match.",
      "options": [
        "won",
        "win",
        "wins",
        "winning"
      ],
      "answer": "won",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l3:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The fans ___ loudly.",
      "options": [
        "cheered",
        "cheer",
        "cheers",
        "cheering"
      ],
      "answer": "cheered",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l3:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Players should show ___.",
      "options": [
        "respect",
        "anger",
        "fear",
        "sleep"
      ],
      "answer": "respect",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l3:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "The players ________ the ball.",
          "answer": "passed"
        },
        {
          "sentence": "The team ________ the match.",
          "answer": "won"
        },
        {
          "sentence": "The fans ________.",
          "answer": "cheered"
        }
      ],
      "options": [
        "passed",
        "won",
        "cheered"
      ],
      "answer": {
        "0": "passed",
        "1": "won",
        "2": "cheered"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l3:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "The team leader is the ________.",
          "answer": "captain"
        },
        {
          "sentence": "A player on your team is a ________.",
          "answer": "teammate"
        },
        {
          "sentence": "Good sports behaviour is ________.",
          "answer": "fair play"
        }
      ],
      "options": [
        "captain",
        "teammate",
        "fair play"
      ],
      "answer": {
        "0": "captain",
        "1": "teammate",
        "2": "fair play"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l3:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "players",
        "passed",
        "the",
        "ball"
      ],
      "answer": "The players passed the ball.",
      "comparison": "the players passed the ball",
      "explanation": "The players passed the ball.",
      "id": "u5l3:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "team",
        "won",
        "the",
        "match"
      ],
      "answer": "The team won the match.",
      "comparison": "the team won the match",
      "explanation": "The team won the match.",
      "id": "u5l3:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "captain",
        "led",
        "the",
        "team"
      ],
      "answer": "The captain led the team.",
      "comparison": "the captain led the team",
      "explanation": "The captain led the team.",
      "id": "u5l3:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Players",
        "should",
        "show",
        "respect"
      ],
      "answer": "Players should show respect.",
      "comparison": "players should show respect",
      "explanation": "Players should show respect.",
      "id": "u5l3:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“Passed” is the past form of “pass”.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l3:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “giraffe” has a soft g sound.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l3:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“The team win yesterday” is correct.",
      "answer": false,
      "explanation": "Say “The team won yesterday.”",
      "id": "u5l3:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "Why does the team succeed?",
      "options": [
        "They work together",
        "They argue",
        "They stop playing"
      ],
      "answer": "They work together",
      "explanation": "",
      "id": "u5l3:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What should players show to the other team?",
      "options": [
        "Respect",
        "Anger",
        "Fear"
      ],
      "answer": "Respect",
      "explanation": "",
      "id": "u5l3:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Who leads the team?",
      "options": [
        "The captain",
        "The baker",
        "The tourist"
      ],
      "answer": "The captain",
      "explanation": "",
      "id": "u5l3:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u5l4": [
    {
      "type": "mcq",
      "prompt": "Let’s ___ the park.",
      "options": [
        "clean",
        "cleans",
        "cleaning"
      ],
      "answer": "clean",
      "explanation": "",
      "id": "u5l4:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We can ___ books.",
      "options": [
        "donate",
        "donates",
        "donating"
      ],
      "answer": "donate",
      "explanation": "",
      "id": "u5l4:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The children ___ trees.",
      "options": [
        "plant",
        "plants",
        "planting"
      ],
      "answer": "plant",
      "explanation": "",
      "id": "u5l4:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ bottles for recycling.",
      "options": [
        "collect",
        "collects",
        "collecting"
      ],
      "answer": "collects",
      "explanation": "",
      "id": "u5l4:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We should ___ our community.",
      "options": [
        "help",
        "helps",
        "helping"
      ],
      "answer": "help",
      "explanation": "",
      "id": "u5l4:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Volunteers ___ the neighbourhood.",
      "options": [
        "clean",
        "cleans",
        "cleaning"
      ],
      "answer": "clean",
      "explanation": "",
      "id": "u5l4:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar can ___ paper.",
      "options": [
        "recycle",
        "recycles",
        "recycled"
      ],
      "answer": "recycle",
      "explanation": "",
      "id": "u5l4:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ the environment.",
      "options": [
        "protect",
        "protects",
        "protecting"
      ],
      "answer": "protect",
      "explanation": "",
      "id": "u5l4:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The area where people live together is a ___.",
      "options": [
        "community",
        "museum",
        "bakery"
      ],
      "answer": "community",
      "explanation": "",
      "id": "u5l4:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To give useful things is to ___.",
      "options": [
        "donate",
        "score",
        "borrow"
      ],
      "answer": "donate",
      "explanation": "",
      "id": "u5l4:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who helps without pay is a ___.",
      "options": [
        "volunteer",
        "pilot",
        "tourist"
      ],
      "answer": "volunteer",
      "explanation": "",
      "id": "u5l4:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To use paper again is to ___.",
      "options": [
        "recycle",
        "celebrate",
        "visit"
      ],
      "answer": "recycle",
      "explanation": "",
      "id": "u5l4:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person living near you is a ___.",
      "options": [
        "neighbour",
        "captain",
        "cousin only"
      ],
      "answer": "neighbour",
      "explanation": "",
      "id": "u5l4:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A group activity to clean an area is a ___.",
      "options": [
        "clean-up",
        "holiday",
        "match"
      ],
      "answer": "clean-up",
      "explanation": "",
      "id": "u5l4:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "Let’s ___ the park.",
      "options": [
        "clean",
        "cleans",
        "cleaning",
        "cleaned"
      ],
      "answer": "clean",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l4:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We can ___ books.",
      "options": [
        "donate",
        "donates",
        "donating",
        "donated"
      ],
      "answer": "donate",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l4:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Mona ___ bottles.",
      "options": [
        "collects",
        "collect",
        "collected",
        "collecting"
      ],
      "answer": "collects",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l4:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "We should ___ our community.",
      "options": [
        "help",
        "helps",
        "helping",
        "helped"
      ],
      "answer": "help",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u5l4:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "We ________ books.",
          "answer": "donate"
        },
        {
          "sentence": "We ________ trees.",
          "answer": "plant"
        },
        {
          "sentence": "We ________ paper.",
          "answer": "recycle"
        }
      ],
      "options": [
        "donate",
        "plant",
        "recycle"
      ],
      "answer": {
        "0": "donate",
        "1": "plant",
        "2": "recycle"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l4:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "A person who helps freely is a ________.",
          "answer": "volunteer"
        },
        {
          "sentence": "A person near your home is a ________.",
          "answer": "neighbour"
        },
        {
          "sentence": "People living in one area are a ________.",
          "answer": "community"
        }
      ],
      "options": [
        "volunteer",
        "neighbour",
        "community"
      ],
      "answer": {
        "0": "volunteer",
        "1": "neighbour",
        "2": "community"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u5l4:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Let",
        "us",
        "clean",
        "the",
        "park"
      ],
      "answer": "Let us clean the park.",
      "comparison": "let us clean the park",
      "explanation": "Let us clean the park.",
      "id": "u5l4:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "can",
        "donate",
        "books"
      ],
      "answer": "We can donate books.",
      "comparison": "we can donate books",
      "explanation": "We can donate books.",
      "id": "u5l4:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "The",
        "children",
        "plant",
        "trees"
      ],
      "answer": "The children plant trees.",
      "comparison": "the children plant trees",
      "explanation": "The children plant trees.",
      "id": "u5l4:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "We",
        "should",
        "help",
        "our",
        "community"
      ],
      "answer": "We should help our community.",
      "comparison": "we should help our community",
      "explanation": "We should help our community.",
      "id": "u5l4:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "After “can”, use the base verb.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l4:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“Let’s cleans the park” is correct.",
      "answer": false,
      "explanation": "Say “Let’s clean the park.”",
      "id": "u5l4:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Recycling can help protect the environment.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u5l4:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What do the children clean?",
      "options": [
        "The park",
        "The plane",
        "The bakery"
      ],
      "answer": "The park",
      "explanation": "",
      "id": "u5l4:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What do they donate?",
      "options": [
        "Books",
        "Cars",
        "Planes"
      ],
      "answer": "Books",
      "explanation": "",
      "id": "u5l4:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Why do they work together?",
      "options": [
        "To help the neighbourhood",
        "To miss school",
        "To be noisy"
      ],
      "answer": "To help the neighbourhood",
      "explanation": "",
      "id": "u5l4:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u6l1": [
    {
      "type": "mcq",
      "prompt": "I ___ trying my best.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "am",
      "explanation": "",
      "id": "u6l1:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "She is ___ now.",
      "options": [
        "practise",
        "practising",
        "practised"
      ],
      "answer": "practising",
      "explanation": "",
      "id": "u6l1:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They ___ planning a project.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "are",
      "explanation": "",
      "id": "u6l1:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar is ___ a book.",
      "options": [
        "read",
        "reading",
        "reads"
      ],
      "answer": "reading",
      "explanation": "",
      "id": "u6l1:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We are ___ for success.",
      "options": [
        "work",
        "working",
        "worked"
      ],
      "answer": "working",
      "explanation": "",
      "id": "u6l1:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona ___ practising now.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u6l1:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I am ___ a plan.",
      "options": [
        "make",
        "making",
        "made"
      ],
      "answer": "making",
      "explanation": "",
      "id": "u6l1:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The children are ___ their goal.",
      "options": [
        "reach",
        "reaching",
        "reached"
      ],
      "answer": "reaching",
      "explanation": "",
      "id": "u6l1:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Something you want to achieve is a ___.",
      "options": [
        "goal",
        "chore",
        "landmark"
      ],
      "answer": "goal",
      "explanation": "",
      "id": "u6l1:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A wish for the future is a ___.",
      "options": [
        "dream",
        "map",
        "gift"
      ],
      "answer": "dream",
      "explanation": "",
      "id": "u6l1:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To do something again to improve is to ___.",
      "options": [
        "practice",
        "donate",
        "borrow"
      ],
      "answer": "practice",
      "explanation": "",
      "id": "u6l1:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A way to reach a goal is a ___.",
      "options": [
        "plan",
        "tourist",
        "station"
      ],
      "answer": "plan",
      "explanation": "",
      "id": "u6l1:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Doing well after hard work is ___.",
      "options": [
        "success",
        "direction",
        "tradition"
      ],
      "answer": "success",
      "explanation": "",
      "id": "u6l1:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To get to a goal is to ___.",
      "options": [
        "reach",
        "sweep",
        "score"
      ],
      "answer": "reach",
      "explanation": "",
      "id": "u6l1:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "I ___ trying my best.",
      "options": [
        "am",
        "is",
        "are",
        "be"
      ],
      "answer": "am",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l1:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "She is ___ now.",
      "options": [
        "practising",
        "practise",
        "practised",
        "practises"
      ],
      "answer": "practising",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l1:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "They ___ planning a project.",
      "options": [
        "are",
        "is",
        "am",
        "be"
      ],
      "answer": "are",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l1:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Omar is ___ a book.",
      "options": [
        "reading",
        "read",
        "reads",
        "readed"
      ],
      "answer": "reading",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l1:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "I ________ trying.",
          "answer": "am"
        },
        {
          "sentence": "She ________ practising.",
          "answer": "is"
        },
        {
          "sentence": "They ________ planning.",
          "answer": "are"
        }
      ],
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": {
        "0": "am",
        "1": "is",
        "2": "are"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l1:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Something to achieve is a ________.",
          "answer": "goal"
        },
        {
          "sentence": "A future wish is a ________.",
          "answer": "dream"
        },
        {
          "sentence": "A way to succeed is a ________.",
          "answer": "plan"
        }
      ],
      "options": [
        "goal",
        "dream",
        "plan"
      ],
      "answer": {
        "0": "goal",
        "1": "dream",
        "2": "plan"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l1:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "I",
        "am",
        "trying",
        "my",
        "best"
      ],
      "answer": "I am trying my best.",
      "comparison": "i am trying my best",
      "explanation": "I am trying my best.",
      "id": "u6l1:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "She",
        "is",
        "practising",
        "now"
      ],
      "answer": "She is practising now.",
      "comparison": "she is practising now",
      "explanation": "She is practising now.",
      "id": "u6l1:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "They",
        "are",
        "planning",
        "a",
        "project"
      ],
      "answer": "They are planning a project.",
      "comparison": "they are planning a project",
      "explanation": "They are planning a project.",
      "id": "u6l1:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Omar",
        "is",
        "reading",
        "a",
        "book"
      ],
      "answer": "Omar is reading a book.",
      "comparison": "omar is reading a book",
      "explanation": "Omar is reading a book.",
      "id": "u6l1:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "Present continuous uses am, is or are plus verb-ing.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l1:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“She is practise now” is correct.",
      "answer": false,
      "explanation": "Say “She is practising now.”",
      "id": "u6l1:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "A goal is something you want to achieve.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l1:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What does Samer want to improve?",
      "options": [
        "Reading",
        "Cooking",
        "Flying"
      ],
      "answer": "Reading",
      "explanation": "",
      "id": "u6l1:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What helps him succeed?",
      "options": [
        "Daily practice",
        "Giving up",
        "Sleeping all day"
      ],
      "answer": "Daily practice",
      "explanation": "",
      "id": "u6l1:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What is Samer doing every day?",
      "options": [
        "Practising reading",
        "Building a bridge",
        "Visiting a museum"
      ],
      "answer": "Practising reading",
      "explanation": "",
      "id": "u6l1:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u6l2": [
    {
      "type": "mcq",
      "prompt": "Mona ___ riding a bicycle.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "is",
      "explanation": "",
      "id": "u6l2:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "They are ___ outside.",
      "options": [
        "play",
        "playing",
        "played"
      ],
      "answer": "playing",
      "explanation": "",
      "id": "u6l2:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "I am ___ a helmet.",
      "options": [
        "wear",
        "wearing",
        "wore"
      ],
      "answer": "wearing",
      "explanation": "",
      "id": "u6l2:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Omar is ___ carefully.",
      "options": [
        "pedal",
        "pedalling",
        "pedalled"
      ],
      "answer": "pedalling",
      "explanation": "",
      "id": "u6l2:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The children ___ laughing.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "are",
      "explanation": "",
      "id": "u6l2:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "She is ___ her balance.",
      "options": [
        "keep",
        "keeping",
        "kept"
      ],
      "answer": "keeping",
      "explanation": "",
      "id": "u6l2:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "We are ___ in the spring.",
      "options": [
        "play",
        "playing",
        "played"
      ],
      "answer": "playing",
      "explanation": "",
      "id": "u6l2:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The water is ___.",
      "options": [
        "splash",
        "splashing",
        "splashed"
      ],
      "answer": "splashing",
      "explanation": "",
      "id": "u6l2:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A hat that protects your head is a ___.",
      "options": [
        "helmet",
        "gift",
        "map"
      ],
      "answer": "helmet",
      "explanation": "",
      "id": "u6l2:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To stay steady is to keep your ___.",
      "options": [
        "balance",
        "celebration",
        "history"
      ],
      "answer": "balance",
      "explanation": "",
      "id": "u6l2:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To push bicycle parts with your feet is to ___.",
      "options": [
        "pedal",
        "donate",
        "borrow"
      ],
      "answer": "pedal",
      "explanation": "",
      "id": "u6l2:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "The opposite of inside is ___.",
      "options": [
        "outside",
        "under",
        "between"
      ],
      "answer": "outside",
      "explanation": "",
      "id": "u6l2:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the spr word: ___.",
      "options": [
        "spring",
        "screen",
        "splash"
      ],
      "answer": "spring",
      "explanation": "",
      "id": "u6l2:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Choose the spl word: ___.",
      "options": [
        "splash",
        "spring",
        "screen"
      ],
      "answer": "splash",
      "explanation": "",
      "id": "u6l2:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "Mona ___ riding a bicycle.",
      "options": [
        "is",
        "are",
        "am",
        "be"
      ],
      "answer": "is",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l2:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "They are ___ outside.",
      "options": [
        "playing",
        "play",
        "played",
        "plays"
      ],
      "answer": "playing",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l2:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "I am ___ a helmet.",
      "options": [
        "wearing",
        "wear",
        "wore",
        "wears"
      ],
      "answer": "wearing",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l2:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "She is keeping her ___.",
      "options": [
        "balance",
        "goal",
        "gift",
        "job"
      ],
      "answer": "balance",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l2:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Mona ________ riding.",
          "answer": "is"
        },
        {
          "sentence": "They ________ playing.",
          "answer": "are"
        },
        {
          "sentence": "I ________ wearing a helmet.",
          "answer": "am"
        }
      ],
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": {
        "0": "is",
        "1": "are",
        "2": "am"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l2:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag the beginning letters to complete each word.",
      "pairs": [
        {
          "sentence": "________ing",
          "answer": "spr"
        },
        {
          "sentence": "________ash",
          "answer": "spl"
        },
        {
          "sentence": "________een",
          "answer": "scr"
        }
      ],
      "options": [
        "spr",
        "spl",
        "scr"
      ],
      "answer": {
        "0": "spr",
        "1": "spl",
        "2": "scr"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l2:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Mona",
        "is",
        "riding",
        "a",
        "bicycle"
      ],
      "answer": "Mona is riding a bicycle.",
      "comparison": "mona is riding a bicycle",
      "explanation": "Mona is riding a bicycle.",
      "id": "u6l2:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "They",
        "are",
        "playing",
        "outside"
      ],
      "answer": "They are playing outside.",
      "comparison": "they are playing outside",
      "explanation": "They are playing outside.",
      "id": "u6l2:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "I",
        "am",
        "wearing",
        "a",
        "helmet"
      ],
      "answer": "I am wearing a helmet.",
      "comparison": "i am wearing a helmet",
      "explanation": "I am wearing a helmet.",
      "id": "u6l2:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "She",
        "is",
        "keeping",
        "her",
        "balance"
      ],
      "answer": "She is keeping her balance.",
      "comparison": "she is keeping her balance",
      "explanation": "She is keeping her balance.",
      "id": "u6l2:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“Mona is riding” is present continuous.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l2:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“They is playing” is correct.",
      "answer": false,
      "explanation": "Say “They are playing.”",
      "id": "u6l2:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "The word “spring” begins with spr.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l2:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What does Mona wear?",
      "options": [
        "A helmet",
        "A crown",
        "A scarf only"
      ],
      "answer": "A helmet",
      "explanation": "",
      "id": "u6l2:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "Why does she succeed?",
      "options": [
        "She keeps trying",
        "She gives up",
        "She goes to sleep"
      ],
      "answer": "She keeps trying",
      "explanation": "",
      "id": "u6l2:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What is Mona learning to ride?",
      "options": [
        "A bicycle",
        "A plane",
        "A train"
      ],
      "answer": "A bicycle",
      "explanation": "",
      "id": "u6l2:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u6l3": [
    {
      "type": "mcq",
      "prompt": "___, Tamer made a plan.",
      "options": [
        "First",
        "Finally",
        "Under"
      ],
      "answer": "First",
      "explanation": "",
      "id": "u6l3:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "He ___ the exam.",
      "options": [
        "pass",
        "passed",
        "passes"
      ],
      "answer": "passed",
      "explanation": "",
      "id": "u6l3:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Then, he ___ every day.",
      "options": [
        "study",
        "studied",
        "studies"
      ],
      "answer": "studied",
      "explanation": "",
      "id": "u6l3:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "He ___ from his mistakes.",
      "options": [
        "learn",
        "learned",
        "learns"
      ],
      "answer": "learned",
      "explanation": "",
      "id": "u6l3:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "After that, he ___ more questions.",
      "options": [
        "practice",
        "practised",
        "practises"
      ],
      "answer": "practised",
      "explanation": "",
      "id": "u6l3:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Finally, he ___ proud.",
      "options": [
        "feel",
        "felt",
        "feels"
      ],
      "answer": "felt",
      "explanation": "",
      "id": "u6l3:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "The exam ___ difficult.",
      "options": [
        "was",
        "were",
        "is"
      ],
      "answer": "was",
      "explanation": "",
      "id": "u6l3:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Tamer ___ a good result.",
      "options": [
        "get",
        "got",
        "gets"
      ],
      "answer": "got",
      "explanation": "",
      "id": "u6l3:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "A school test is an ___.",
      "options": [
        "exam",
        "exit",
        "idea"
      ],
      "answer": "exam",
      "explanation": "",
      "id": "u6l3:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To get ready is to ___.",
      "options": [
        "prepare",
        "donate",
        "borrow"
      ],
      "answer": "prepare",
      "explanation": "",
      "id": "u6l3:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Something not easy is ___.",
      "options": [
        "difficult",
        "friendly",
        "clean"
      ],
      "answer": "difficult",
      "explanation": "",
      "id": "u6l3:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "An answer that is not correct is a ___.",
      "options": [
        "mistake",
        "goal",
        "role"
      ],
      "answer": "mistake",
      "explanation": "",
      "id": "u6l3:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To become better is to ___.",
      "options": [
        "improve",
        "sweep",
        "score"
      ],
      "answer": "improve",
      "explanation": "",
      "id": "u6l3:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To continue trying is to ___.",
      "options": [
        "persevere",
        "celebrate",
        "visit"
      ],
      "answer": "persevere",
      "explanation": "",
      "id": "u6l3:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "___, Tamer made a plan.",
      "options": [
        "First",
        "Finally",
        "Under",
        "Behind"
      ],
      "answer": "First",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l3:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "He ___ the exam.",
      "options": [
        "passed",
        "pass",
        "passes",
        "passing"
      ],
      "answer": "passed",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l3:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "The exam ___ difficult.",
      "options": [
        "was",
        "were",
        "is",
        "are"
      ],
      "answer": "was",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l3:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Tamer ___ a good result.",
      "options": [
        "got",
        "get",
        "gets",
        "getting"
      ],
      "answer": "got",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l3:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "________, he made a plan.",
          "answer": "First"
        },
        {
          "sentence": "________, he studied.",
          "answer": "Then"
        },
        {
          "sentence": "________, he passed.",
          "answer": "Finally"
        }
      ],
      "options": [
        "First",
        "Then",
        "Finally"
      ],
      "answer": {
        "0": "First",
        "1": "Then",
        "2": "Finally"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l3:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "An incorrect answer is a ________.",
          "answer": "mistake"
        },
        {
          "sentence": "To become better is to ________.",
          "answer": "improve"
        },
        {
          "sentence": "To get ready is to ________.",
          "answer": "prepare"
        }
      ],
      "options": [
        "mistake",
        "improve",
        "prepare"
      ],
      "answer": {
        "0": "mistake",
        "1": "improve",
        "2": "prepare"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l3:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "First",
        "Tamer",
        "made",
        "a",
        "plan"
      ],
      "answer": "First, Tamer made a plan.",
      "comparison": "first tamer made a plan",
      "explanation": "First, Tamer made a plan.",
      "id": "u6l3:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Then",
        "he",
        "studied",
        "every",
        "day"
      ],
      "answer": "Then, he studied every day.",
      "comparison": "then he studied every day",
      "explanation": "Then, he studied every day.",
      "id": "u6l3:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "He",
        "learned",
        "from",
        "his",
        "mistakes"
      ],
      "answer": "He learned from his mistakes.",
      "comparison": "he learned from his mistakes",
      "explanation": "He learned from his mistakes.",
      "id": "u6l3:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Finally",
        "he",
        "passed",
        "the",
        "exam"
      ],
      "answer": "Finally, he passed the exam.",
      "comparison": "finally he passed the exam",
      "explanation": "Finally, he passed the exam.",
      "id": "u6l3:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "“Passed” is the past form of “pass”.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l3:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“First” is usually used for the last event.",
      "answer": false,
      "explanation": "Use “First” for the beginning.",
      "id": "u6l3:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Learning from mistakes can help us improve.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l3:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What was Tamer’s goal?",
      "options": [
        "Pass the maths exam",
        "Fly a plane",
        "Build a bakery"
      ],
      "answer": "Pass the maths exam",
      "explanation": "",
      "id": "u6l3:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What did he do with mistakes?",
      "options": [
        "Learned from them",
        "Ignored everything",
        "Stopped studying"
      ],
      "answer": "Learned from them",
      "explanation": "",
      "id": "u6l3:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "How did Tamer feel after passing?",
      "options": [
        "Proud",
        "Bored",
        "Scared"
      ],
      "answer": "Proud",
      "explanation": "",
      "id": "u6l3:manual:30",
      "category": "Reading / Dialogue"
    }
  ],
  "u6l4": [
    {
      "type": "mcq",
      "prompt": "You ___ drink water after running.",
      "options": [
        "should",
        "shoulds",
        "are"
      ],
      "answer": "should",
      "explanation": "",
      "id": "u6l4:manual:1",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Let’s ___ together.",
      "options": [
        "practise",
        "practises",
        "practising"
      ],
      "answer": "practise",
      "explanation": "",
      "id": "u6l4:manual:2",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "You should ___ slowly first.",
      "options": [
        "run",
        "runs",
        "running"
      ],
      "answer": "run",
      "explanation": "",
      "id": "u6l4:manual:3",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Mona can ___ her friend.",
      "options": [
        "help",
        "helps",
        "helping"
      ],
      "answer": "help",
      "explanation": "",
      "id": "u6l4:manual:4",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "You should ___ after training.",
      "options": [
        "rest",
        "rests",
        "resting"
      ],
      "answer": "rest",
      "explanation": "",
      "id": "u6l4:manual:5",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Let’s ___ again tomorrow.",
      "options": [
        "try",
        "tries",
        "trying"
      ],
      "answer": "try",
      "explanation": "",
      "id": "u6l4:manual:6",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Her friend ___ faster now.",
      "options": [
        "run",
        "runs",
        "running"
      ],
      "answer": "runs",
      "explanation": "",
      "id": "u6l4:manual:7",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "Yara ___ her friend.",
      "options": [
        "encourage",
        "encourages",
        "encouraging"
      ],
      "answer": "encourages",
      "explanation": "",
      "id": "u6l4:manual:8",
      "category": "Grammar"
    },
    {
      "type": "mcq",
      "prompt": "To give kind words is to ___.",
      "options": [
        "encourage",
        "borrow",
        "sweep"
      ],
      "answer": "encourage",
      "explanation": "",
      "id": "u6l4:manual:9",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Practice for a sport is ___.",
      "options": [
        "training",
        "history",
        "tradition"
      ],
      "answer": "training",
      "explanation": "",
      "id": "u6l4:manual:10",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "To stop for a short time is to ___.",
      "options": [
        "rest",
        "score",
        "donate"
      ],
      "answer": "rest",
      "explanation": "",
      "id": "u6l4:manual:11",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Belief in yourself is ___.",
      "options": [
        "confidence",
        "community",
        "celebration"
      ],
      "answer": "confidence",
      "explanation": "",
      "id": "u6l4:manual:12",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "Help from another person is ___.",
      "options": [
        "support",
        "direction",
        "landmark"
      ],
      "answer": "support",
      "explanation": "",
      "id": "u6l4:manual:13",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "mcq",
      "prompt": "A person who runs is a ___.",
      "options": [
        "runner",
        "baker",
        "tourist"
      ],
      "answer": "runner",
      "explanation": "",
      "id": "u6l4:manual:14",
      "category": "Vocabulary in a Sentence"
    },
    {
      "type": "dragFill",
      "prompt": "You ___ drink water.",
      "options": [
        "should",
        "shoulds",
        "are",
        "is"
      ],
      "answer": "should",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l4:manual:15",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Let’s ___ together.",
      "options": [
        "practise",
        "practises",
        "practising",
        "practised"
      ],
      "answer": "practise",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l4:manual:16",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "You should ___ after training.",
      "options": [
        "rest",
        "rests",
        "resting",
        "rested"
      ],
      "answer": "rest",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l4:manual:17",
      "category": "Drag & Drop"
    },
    {
      "type": "dragFill",
      "prompt": "Yara ___ her friend.",
      "options": [
        "encourages",
        "encourage",
        "encouraging",
        "encouraged"
      ],
      "answer": "encourages",
      "explanation": "Drag the word that completes the sentence.",
      "id": "u6l4:manual:18",
      "category": "Drag & Drop"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "You should ________ water.",
          "answer": "drink"
        },
        {
          "sentence": "You should ________ after training.",
          "answer": "rest"
        },
        {
          "sentence": "Let’s ________ together.",
          "answer": "practise"
        }
      ],
      "options": [
        "drink",
        "rest",
        "practise"
      ],
      "answer": {
        "0": "drink",
        "1": "rest",
        "2": "practise"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l4:manual:19",
      "category": "Drag & Match"
    },
    {
      "type": "dragMatch",
      "prompt": "Drag each word to the correct sentence.",
      "pairs": [
        {
          "sentence": "Kind words can ________ a friend.",
          "answer": "encourage"
        },
        {
          "sentence": "Belief in yourself is ________.",
          "answer": "confidence"
        },
        {
          "sentence": "Help from others is ________.",
          "answer": "support"
        }
      ],
      "options": [
        "encourage",
        "confidence",
        "support"
      ],
      "answer": {
        "0": "encourage",
        "1": "confidence",
        "2": "support"
      },
      "explanation": "Read each sentence before you match.",
      "id": "u6l4:manual:20",
      "category": "Drag & Match"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "You",
        "should",
        "drink",
        "water"
      ],
      "answer": "You should drink water.",
      "comparison": "you should drink water",
      "explanation": "You should drink water.",
      "id": "u6l4:manual:21",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Let",
        "us",
        "practise",
        "together"
      ],
      "answer": "Let us practise together.",
      "comparison": "let us practise together",
      "explanation": "Let us practise together.",
      "id": "u6l4:manual:22",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "Yara",
        "encourages",
        "her",
        "friend"
      ],
      "answer": "Yara encourages her friend.",
      "comparison": "yara encourages her friend",
      "explanation": "Yara encourages her friend.",
      "id": "u6l4:manual:23",
      "category": "Build the Sentence"
    },
    {
      "type": "reorder",
      "prompt": "Drag the words into the correct order.",
      "words": [
        "You",
        "should",
        "rest",
        "after",
        "training"
      ],
      "answer": "You should rest after training.",
      "comparison": "you should rest after training",
      "explanation": "You should rest after training.",
      "id": "u6l4:manual:24",
      "category": "Build the Sentence"
    },
    {
      "type": "trueFalse",
      "prompt": "After “should”, use the base verb.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l4:manual:25",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "“You should rests” is correct.",
      "answer": false,
      "explanation": "Say “You should rest.”",
      "id": "u6l4:manual:26",
      "category": "Grammar Check"
    },
    {
      "type": "trueFalse",
      "prompt": "Encouragement can build confidence.",
      "answer": true,
      "explanation": "The sentence is correct.",
      "id": "u6l4:manual:27",
      "category": "Grammar Check"
    },
    {
      "type": "mcq",
      "prompt": "What does Yara give her friend?",
      "options": [
        "Encouragement",
        "A plane",
        "A map"
      ],
      "answer": "Encouragement",
      "explanation": "",
      "id": "u6l4:manual:28",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What grows as the friend improves?",
      "options": [
        "Confidence",
        "Anger",
        "Fear"
      ],
      "answer": "Confidence",
      "explanation": "",
      "id": "u6l4:manual:29",
      "category": "Reading / Dialogue"
    },
    {
      "type": "mcq",
      "prompt": "What should the runner do after training?",
      "options": [
        "Rest and drink water",
        "Shout",
        "Stop forever"
      ],
      "answer": "Rest and drink water",
      "explanation": "",
      "id": "u6l4:manual:30",
      "category": "Reading / Dialogue"
    }
  ]
};

  const hash = (text) => {
    let h = 2166136261;
    for (let i = 0; i < String(text).length; i += 1) {
      h ^= String(text).charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const rng = (seedText) => {
    let s = hash(seedText) || 1;
    return () => {
      s += 0x6D2B79F5;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const shuffle = (arr, seedText = 'seed') => {
    const random = rng(seedText);
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  function buildLessonQuestions(lesson) {
    const questions = MANUAL_LESSON_QUESTIONS[lesson.id];
    if (!questions) throw new Error(`No reviewed questions found for lesson ${lesson.id}.`);
    return clone(questions);
  }

  // Pull questions round-robin across lessons so every unit bank is balanced.
  const roundRobin = (lessonPools, predicate, count, used) => {
    const result = [];
    let cursor = 0;
    let safety = 0;
    while (result.length < count && safety < 10000) {
      const pool = lessonPools[cursor % lessonPools.length];
      const found = pool.find((q) => predicate(q) && !used.has(q.id));
      if (found) { used.add(found.id); result.push(found); }
      cursor += 1;
      safety += 1;
      if (cursor % lessonPools.length === 0 && lessonPools.every((p) => !p.some((q) => predicate(q) && !used.has(q.id)))) break;
    }
    return result;
  };

  function buildUnitQuestions(unit) {
    const lessonPools = unit.lessons.map((lesson) => buildLessonQuestions(lesson));
    const used = new Set();
    const selected = [];
    const add = (items) => selected.push(...items);

    add(roundRobin(lessonPools, (q) => q.category === 'Grammar', 18, used));
    add(roundRobin(lessonPools, (q) => q.category === 'Vocabulary in a Sentence', 10, used));
    add(roundRobin(lessonPools, (q) => q.type === 'dragFill', 6, used));
    add(roundRobin(lessonPools, (q) => q.type === 'dragMatch', 4, used));
    add(roundRobin(lessonPools, (q) => q.type === 'reorder', 6, used));
    add(roundRobin(lessonPools, (q) => q.type === 'trueFalse', 3, used));
    add(roundRobin(lessonPools, (q) => q.category === 'Reading / Dialogue', 3, used));

    const all = lessonPools.flat();
    for (const q of all) {
      if (selected.length >= 50) break;
      if (!used.has(q.id)) { used.add(q.id); selected.push(q); }
    }

    return selected.slice(0, 50).map((q, index) => ({ ...clone(q), id: `unit-${unit.id}:manual:${index + 1}:${q.id}` }));
  }

  function buildReviewQuestions(review, curriculum) {
    const unitPools = curriculum.units.filter((unit) => review.unitIds.includes(unit.id)).map(buildUnitQuestions);
    const used = new Set();
    const selected = [];
    const add = (items) => selected.push(...items);

    add(roundRobin(unitPools, (q) => q.category === 'Grammar', 24, used));
    add(roundRobin(unitPools, (q) => q.category === 'Vocabulary in a Sentence', 12, used));
    add(roundRobin(unitPools, (q) => q.type === 'dragFill', 8, used));
    add(roundRobin(unitPools, (q) => q.type === 'dragMatch', 4, used));
    add(roundRobin(unitPools, (q) => q.type === 'reorder', 6, used));
    add(roundRobin(unitPools, (q) => q.type === 'trueFalse', 3, used));
    add(roundRobin(unitPools, (q) => q.category === 'Reading / Dialogue', 3, used));

    const all = unitPools.flat();
    for (const q of all) {
      if (selected.length >= 60) break;
      if (!used.has(q.id)) { used.add(q.id); selected.push(q); }
    }

    return selected.slice(0, 60).map((q, index) => ({ ...clone(q), id: `${review.id}:manual:${index + 1}:${q.id}` }));
  }

  window.QuestionEngine = {
    shuffle,
    buildLessonQuestions,
    buildUnitQuestions,
    buildReviewQuestions
  };
})();
