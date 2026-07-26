// Curriculum-grounded question banks for English Primary 5 – Term 1.
// Every lesson contains 20 questions grouped by exercise type.
// Questions are based on the Ministry textbook content and use vocabulary in context.

export const QUESTION_GROUP_ORDER = [
  "choose",
  "complete",
  "truefalse",
  "matching",
  "dragdrop",
  "listening",
  "ordering",
  "correction",
  "builder"
];

export const QUESTION_GROUP_LABELS = {
  choose: "Choose",
  complete: "Complete",
  truefalse: "True / False",
  matching: "Matching",
  dragdrop: "Drag & Drop",
  listening: "Listening",
  ordering: "Ordering",
  correction: "Correction",
  builder: "Sentence Builder"
};

export const lessonQuestionBanks = {
  "u1-0": [
    {
      "id": "u1-0-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why must people protect the Nile?",
      "answer": "It supports people, plants, and animals.",
      "options": [
        "It supports people, plants, and animals.",
        "It has no living things.",
        "Only crocodiles need it.",
        "It is a desert road."
      ],
      "explain": "Many connected living things depend on the river."
    },
    {
      "id": "u1-0-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which animals eat plants, insects, and small fish?",
      "answer": "birds",
      "options": [
        "birds",
        "camels",
        "crocodiles",
        "rats"
      ],
      "explain": "Birds eat both plants and several small animals."
    },
    {
      "id": "u1-0-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Small fish eat _____.",
      "answer": "water weeds",
      "accepted": [
        "water weeds"
      ],
      "options": [
        "water weeds",
        "insects",
        "hunt",
        "crocodile"
      ],
      "explain": "Small fish eat water weeds."
    },
    {
      "id": "u1-0-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Birds eat _____ near the river.",
      "answer": "insects",
      "accepted": [
        "insects"
      ],
      "options": [
        "insects",
        "water weeds",
        "hunt",
        "crocodile"
      ],
      "explain": "Birds eat insects near the river."
    },
    {
      "id": "u1-0-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Small fish eat _____.",
      "answer": "water weeds",
      "accepted": [
        "water weeds"
      ],
      "explain": "Small fish eat water weeds."
    },
    {
      "id": "u1-0-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Birds eat _____ near the river.",
      "answer": "insects",
      "accepted": [
        "insects"
      ],
      "explain": "Birds eat insects near the river."
    },
    {
      "id": "u1-0-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Crocodiles _____ near the water.",
      "answer": "hunt",
      "accepted": [
        "hunt"
      ],
      "explain": "Crocodiles hunt near the water."
    },
    {
      "id": "u1-0-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: A _____ is a strong hunter.",
      "answer": "crocodile",
      "accepted": [
        "crocodile"
      ],
      "explain": "A crocodile is a strong hunter."
    },
    {
      "id": "u1-0-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Crocodiles are the kings of the Nile food chain.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Few animals hunt adult crocodiles."
    },
    {
      "id": "u1-0-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Big fish eat large land animals.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Big fish eat smaller fish, insects, and tiny water creatures."
    },
    {
      "id": "u1-0-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The Nile is home to many plants and animals.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u1-0-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "water weeds",
          "context": "Small fish eat _____."
        },
        {
          "word": "insects",
          "context": "Birds eat _____ near the river."
        },
        {
          "word": "hunt",
          "context": "Crocodiles _____ near the water."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u1-0-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: A _____ is a strong hunter.",
      "answer": "crocodile",
      "accepted": [
        "crocodile"
      ],
      "options": [
        "crocodile",
        "water weeds",
        "insects",
        "hunt"
      ],
      "explain": "A crocodile is a strong hunter."
    },
    {
      "id": "u1-0-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What do small fish in the Nile eat?",
      "audioText": "Small fish in the Nile eat water weeds. Birds eat insects and small fish. Crocodiles eat fish, birds, and larger animals near the water.",
      "answer": "water weeds",
      "options": [
        "water weeds",
        "large birds",
        "sand",
        "crispy onions"
      ],
      "explain": "The listening says that small fish eat water weeds."
    },
    {
      "id": "u1-0-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The Nile is home to many plants and animals. Small fish eat water weeds. Birds eat plants, insects, and small fish. Big fish eat smaller fish, insects, and tiny water creatures.",
      "words": [
        "The Nile is home to many plants and animals.",
        "Small fish eat water weeds. Birds eat plants, insects, and small fish.",
        "Big fish eat smaller fish, insects, and tiny water creatures."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-0-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Big fish eat smaller fish, insects, and tiny water creatures. Crocodiles eat fish, birds, and larger animals near the water. Every living thing has a role, so people must keep the Nile clean and safe.",
      "words": [
        "Big fish eat smaller fish, insects, and tiny water creatures.",
        "Crocodiles eat fish, birds, and larger animals near the water.",
        "Every living thing has a role, so people must keep the Nile clean and safe."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-0-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Small fish eat wtaer weeds.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Small fish eat <mark>wtaer weeds</mark>.</span>",
      "answer": "water weeds",
      "accepted": [
        "water weeds"
      ],
      "explain": "The correct lesson word is water weeds."
    },
    {
      "id": "u1-0-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Birds eat isnects near the river.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Birds eat <mark>isnects</mark> near the river.</span>",
      "answer": "insects",
      "accepted": [
        "insects"
      ],
      "explain": "The correct lesson word is insects."
    },
    {
      "id": "u1-0-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Small fish eat water weeds",
      "words": [
        "Small",
        "fish",
        "eat",
        "water",
        "weeds"
      ],
      "explain": "Small fish eat water weeds.",
      "itemMode": "word"
    },
    {
      "id": "u1-0-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Birds eat insects near the river",
      "words": [
        "Birds",
        "eat",
        "insects",
        "near",
        "the",
        "river"
      ],
      "explain": "Birds eat insects near the river.",
      "itemMode": "word"
    }
  ],
  "u1-1": [
    {
      "id": "u1-1-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What gives lizards energy?",
      "answer": "insects",
      "options": [
        "insects",
        "water weeds",
        "crispy onions",
        "branches"
      ],
      "explain": "The reading says lizards eat insects for energy."
    },
    {
      "id": "u1-1-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "When do many owls come out?",
      "answer": "at night",
      "options": [
        "at night",
        "at noon",
        "only in winter",
        "during floods"
      ],
      "explain": "The night is cooler than the daytime."
    },
    {
      "id": "u1-1-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Crocodiles _____ near the water.",
      "answer": "hunt",
      "accepted": [
        "hunt"
      ],
      "options": [
        "hunt",
        "insects",
        "survive",
        "water weeds"
      ],
      "explain": "Crocodiles hunt near the water."
    },
    {
      "id": "u1-1-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Birds eat _____ near the river.",
      "answer": "insects",
      "accepted": [
        "insects"
      ],
      "options": [
        "insects",
        "hunt",
        "survive",
        "water weeds"
      ],
      "explain": "Birds eat insects near the river."
    },
    {
      "id": "u1-1-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Crocodiles _____ near the water.",
      "answer": "hunt",
      "accepted": [
        "hunt"
      ],
      "explain": "Crocodiles hunt near the water."
    },
    {
      "id": "u1-1-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Birds eat _____ near the river.",
      "answer": "insects",
      "accepted": [
        "insects"
      ],
      "explain": "Birds eat insects near the river."
    },
    {
      "id": "u1-1-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Nile animals find food to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "explain": "Nile animals find food to survive."
    },
    {
      "id": "u1-1-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Some desert animals hide under rocks to _____.",
      "answer": "stay cool",
      "accepted": [
        "stay cool"
      ],
      "explain": "Some desert animals hide under rocks to stay cool."
    },
    {
      "id": "u1-1-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Camels eat plants to stay strong.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Plants are part of a camel's diet."
    },
    {
      "id": "u1-1-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Snakes always eat plants.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Snakes often eat small animals."
    },
    {
      "id": "u1-1-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The desert is hot and dry, but many animals live there.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u1-1-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "hunt",
          "context": "Crocodiles _____ near the water."
        },
        {
          "word": "insects",
          "context": "Birds eat _____ near the river."
        },
        {
          "word": "survive",
          "context": "Nile animals find food to _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u1-1-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Some desert animals hide under rocks to _____.",
      "answer": "stay cool",
      "accepted": [
        "stay cool"
      ],
      "options": [
        "stay cool",
        "find snow",
        "make the desert hotter",
        "catch large fish"
      ],
      "explain": "Some desert animals hide under rocks to stay cool."
    },
    {
      "id": "u1-1-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Why do some desert animals hide under rocks?",
      "audioText": "During the hot day, some desert animals hide under rocks to stay cool. Owls often come out at night when the air is cooler.",
      "answer": "to stay cool",
      "options": [
        "to stay cool",
        "to find snow",
        "to make the desert hotter",
        "to catch big fish"
      ],
      "explain": "They use the rocks for shade during the hot day."
    },
    {
      "id": "u1-1-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The desert is hot and dry, but many animals live there. Snakes often eat rats or lizards. Camels eat plants. Lizards eat insects for energy.",
      "words": [
        "The desert is hot and dry, but many animals live there.",
        "Snakes often eat rats or lizards. Camels eat plants.",
        "Lizards eat insects for energy."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-1-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Lizards eat insects for energy. Some animals hide under rocks during the day; owls come out at night. Each animal helps keep nature in balance.",
      "words": [
        "Lizards eat insects for energy.",
        "Some animals hide under rocks during the day; owls come out at night.",
        "Each animal helps keep nature in balance."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-1-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. Camels eat usually plants.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">Camels <mark>eat usually</mark> plants.</span>",
      "answer": "usually eat",
      "accepted": [
        "usually eat"
      ],
      "explain": "The adverb of frequency comes before the main verb."
    },
    {
      "id": "u1-1-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. Lizards sometimes are dangerous.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">Lizards <mark>sometimes are</mark> dangerous.</span>",
      "answer": "are sometimes",
      "accepted": [
        "are sometimes"
      ],
      "explain": "An adverb of frequency comes after the verb to be."
    },
    {
      "id": "u1-1-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Crocodiles hunt near the water",
      "words": [
        "Crocodiles",
        "hunt",
        "near",
        "the",
        "water"
      ],
      "explain": "Crocodiles hunt near the water.",
      "itemMode": "word"
    },
    {
      "id": "u1-1-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Birds eat insects near the river",
      "words": [
        "Birds",
        "eat",
        "insects",
        "near",
        "the",
        "river"
      ],
      "explain": "Birds eat insects near the river.",
      "itemMode": "word"
    }
  ],
  "u1-2": [
    {
      "id": "u1-2-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What did Tom do after he understood his mistake?",
      "answer": "He watered and protected the tree.",
      "options": [
        "He watered and protected the tree.",
        "He cut it down.",
        "He left forever.",
        "He sold its branches."
      ],
      "explain": "Tom began to give the tree the care it needed."
    },
    {
      "id": "u1-2-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What is the story's moral?",
      "answer": "We should appreciate those who care for us.",
      "options": [
        "We should appreciate those who care for us.",
        "We should take without giving.",
        "Trees do not need care.",
        "Friends should ignore each other."
      ],
      "explain": "The story teaches appreciation and care."
    },
    {
      "id": "u1-2-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The boy made _____ from leaves.",
      "answer": "crowns",
      "accepted": [
        "crowns",
        "crown"
      ],
      "options": [
        "crowns",
        "care for",
        "shade",
        "trunk"
      ],
      "explain": "The boy made crowns from leaves."
    },
    {
      "id": "u1-2-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: We must _____ trees.",
      "answer": "care for",
      "accepted": [
        "care for"
      ],
      "options": [
        "care for",
        "crown",
        "shade",
        "trunk"
      ],
      "explain": "We must care for trees."
    },
    {
      "id": "u1-2-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The boy made _____ from leaves.",
      "answer": "crowns",
      "accepted": [
        "crowns",
        "crown"
      ],
      "explain": "The boy made crowns from leaves."
    },
    {
      "id": "u1-2-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: We must _____ trees.",
      "answer": "care for",
      "accepted": [
        "care for"
      ],
      "explain": "We must care for trees."
    },
    {
      "id": "u1-2-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Tom rested in the tree's _____.",
      "answer": "shade",
      "accepted": [
        "shade"
      ],
      "explain": "Tom rested in the tree's shade."
    },
    {
      "id": "u1-2-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The tree had a strong _____.",
      "answer": "trunk",
      "accepted": [
        "trunk"
      ],
      "explain": "The tree had a strong trunk."
    },
    {
      "id": "u1-2-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Tom always cared for the tree from the beginning.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "At first, he rarely gave the tree food or water."
    },
    {
      "id": "u1-2-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The tree became healthy again after Tom cared for it.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Water and protection helped it recover."
    },
    {
      "id": "u1-2-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Tom loved an apple tree and used its apples, leaves, shade, and trunk.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u1-2-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "crowns",
          "context": "The boy made _____ from leaves."
        },
        {
          "word": "care for",
          "context": "We must _____ trees."
        },
        {
          "word": "shade",
          "context": "Tom rested in the tree's _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u1-2-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The tree had a strong _____.",
      "answer": "trunk",
      "accepted": [
        "trunk"
      ],
      "options": [
        "trunk",
        "crown",
        "care for",
        "shade"
      ],
      "explain": "The tree had a strong trunk."
    },
    {
      "id": "u1-2-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Why was the tree weak when Tom returned?",
      "audioText": "Tom took apples and shade from the tree, but he rarely gave it water. When he returned years later, the tree was weak, so Tom began to care for it.",
      "answer": "Tom had not cared for it.",
      "options": [
        "Tom had not cared for it.",
        "It was made of metal.",
        "It lived in a river.",
        "It had too many apples."
      ],
      "explain": "Tom had taken from the tree without giving it the care it needed."
    },
    {
      "id": "u1-2-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Tom loved an apple tree and used its apples, leaves, shade, and trunk. He took from the tree but rarely gave it food or water. After years away, Tom returned and found the tree weak and sad.",
      "words": [
        "Tom loved an apple tree and used its apples, leaves, shade, and trunk.",
        "He took from the tree but rarely gave it food or water.",
        "After years away, Tom returned and found the tree weak and sad."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-2-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "After years away, Tom returned and found the tree weak and sad. He understood that he had been selfish and started caring for it. The tree became strong again. Tom learned to give back to those who help him.",
      "words": [
        "After years away, Tom returned and found the tree weak and sad.",
        "He understood that he had been selfish and started caring for it.",
        "The tree became strong again. Tom learned to give back to those who help him."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-2-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The boy made corwns from leaves.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The boy made <mark>corwn</mark>s from leaves.</span>",
      "answer": "crown",
      "accepted": [
        "crown"
      ],
      "explain": "The correct lesson word is crown."
    },
    {
      "id": "u1-2-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. We must crae for trees.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">We must <mark>crae for</mark> trees.</span>",
      "answer": "care for",
      "accepted": [
        "care for"
      ],
      "explain": "The correct lesson word is care for."
    },
    {
      "id": "u1-2-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The boy made crowns from leaves",
      "words": [
        "The",
        "boy",
        "made",
        "crowns",
        "from",
        "leaves"
      ],
      "explain": "The boy made crowns from leaves.",
      "itemMode": "word"
    },
    {
      "id": "u1-2-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "We must care for trees",
      "words": [
        "We",
        "must",
        "care",
        "for",
        "trees"
      ],
      "explain": "We must care for trees.",
      "itemMode": "word"
    }
  ],
  "u1-3": [
    {
      "id": "u1-3-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What makes the onions crispy?",
      "answer": "Frying thin slices until brown",
      "options": [
        "Frying thin slices until brown",
        "Putting them in cold water",
        "Mixing them with rice first",
        "Leaving them raw"
      ],
      "explain": "The recipe fries thin onion slices until brown and crunchy."
    },
    {
      "id": "u1-3-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which ingredient is a legume?",
      "answer": "lentils",
      "options": [
        "lentils",
        "oil",
        "vinegar",
        "pasta"
      ],
      "explain": "Lentils are small legumes."
    },
    {
      "id": "u1-3-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The _____ explains how to make Koshari.",
      "answer": "recipe",
      "accepted": [
        "recipe"
      ],
      "options": [
        "recipe",
        "ingredients",
        "lentils",
        "chickpeas"
      ],
      "explain": "The recipe explains how to make Koshari."
    },
    {
      "id": "u1-3-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Rice and lentils are _____.",
      "answer": "ingredients",
      "accepted": [
        "ingredients"
      ],
      "options": [
        "ingredients",
        "recipe",
        "lentils",
        "chickpeas"
      ],
      "explain": "Rice and lentils are ingredients."
    },
    {
      "id": "u1-3-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ explains how to make Koshari.",
      "answer": "recipe",
      "accepted": [
        "recipe"
      ],
      "explain": "The recipe explains how to make Koshari."
    },
    {
      "id": "u1-3-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Rice and lentils are _____.",
      "answer": "ingredients",
      "accepted": [
        "ingredients"
      ],
      "explain": "Rice and lentils are ingredients."
    },
    {
      "id": "u1-3-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Koshari contains brown _____.",
      "answer": "lentils",
      "accepted": [
        "lentils"
      ],
      "explain": "Koshari contains brown lentils."
    },
    {
      "id": "u1-3-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Add _____ on top of the Koshari.",
      "answer": "chickpeas",
      "accepted": [
        "chickpeas"
      ],
      "explain": "Add chickpeas on top of the Koshari."
    },
    {
      "id": "u1-3-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A clear recipe should put its steps in order.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Readers need to know what to do first and next."
    },
    {
      "id": "u1-3-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Koshari contains only rice and water.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It includes pasta, lentils, chickpeas, sauces, and onions too."
    },
    {
      "id": "u1-3-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Koshari is a traditional Egyptian dish made from rice, pasta, lentils, chickpeas, sauces, and crispy onions.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u1-3-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "recipe",
          "context": "The _____ explains how to make Koshari."
        },
        {
          "word": "ingredients",
          "context": "Rice and lentils are _____."
        },
        {
          "word": "lentils",
          "context": "Koshari contains brown _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u1-3-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Add _____ on top of the Koshari.",
      "answer": "chickpeas",
      "accepted": [
        "chickpeas"
      ],
      "options": [
        "chickpeas",
        "recipe",
        "ingredients",
        "lentils"
      ],
      "explain": "Add chickpeas on top of the Koshari."
    },
    {
      "id": "u1-3-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Which word introduces the last step?",
      "audioText": "First, cook the rice, pasta, and lentils. Next, make the sauce and crispy onions. Finally, put all the ingredients together.",
      "answer": "Finally",
      "options": [
        "Finally",
        "First",
        "Sometimes",
        "Never"
      ],
      "explain": "Finally introduces the last step in a recipe."
    },
    {
      "id": "u1-3-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Koshari is a traditional Egyptian dish made from rice, pasta, lentils, chickpeas, sauces, and crispy onions. Cook the rice, pasta, and lentils separately. Make red sauce with garlic, tomato sauce, vinegar, and spices.",
      "words": [
        "Koshari is a traditional Egyptian dish made from rice, pasta, lentils, chickpeas, sauces, and crispy onions.",
        "Cook the rice, pasta, and lentils separately.",
        "Make red sauce with garlic, tomato sauce, vinegar, and spices."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-3-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Make red sauce with garlic, tomato sauce, vinegar, and spices. Fry thin onion slices until brown and crunchy. Put the parts together, then add sauce and crispy onions.",
      "words": [
        "Make red sauce with garlic, tomato sauce, vinegar, and spices.",
        "Fry thin onion slices until brown and crunchy.",
        "Put the parts together, then add sauce and crispy onions."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-3-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The rceipe explains how to make Koshari.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The <mark>rceipe</mark> explains how to make Koshari.</span>",
      "answer": "recipe",
      "accepted": [
        "recipe"
      ],
      "explain": "The correct lesson word is recipe."
    },
    {
      "id": "u1-3-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Rice and lentils are ignredients.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Rice and lentils are <mark>ignredients</mark>.</span>",
      "answer": "ingredients",
      "accepted": [
        "ingredients"
      ],
      "explain": "The correct lesson word is ingredients."
    },
    {
      "id": "u1-3-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The recipe explains how to make Koshari",
      "words": [
        "The",
        "recipe",
        "explains",
        "how",
        "to",
        "make",
        "Koshari"
      ],
      "explain": "The recipe explains how to make Koshari.",
      "itemMode": "word"
    },
    {
      "id": "u1-3-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Rice and lentils are ingredients",
      "words": [
        "Rice",
        "and",
        "lentils",
        "are",
        "ingredients"
      ],
      "explain": "Rice and lentils are ingredients.",
      "itemMode": "word"
    }
  ],
  "u1-4": [
    {
      "id": "u1-4-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What does a menu show?",
      "answer": "food and drink choices",
      "options": [
        "food and drink choices",
        "the student's class",
        "the story moral",
        "the weather forecast"
      ],
      "explain": "Customers use a menu to choose food and drinks."
    },
    {
      "id": "u1-4-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which is a call to action?",
      "answer": "Visit us today!",
      "options": [
        "Visit us today!",
        "Rice and lentils",
        "Our blue logo",
        "A small picture"
      ],
      "explain": "A call to action directly invites the reader to act."
    },
    {
      "id": "u1-4-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The restaurant _____ has a clear title.",
      "answer": "flyer",
      "accepted": [
        "flyer"
      ],
      "options": [
        "flyer",
        "menu",
        "call to action",
        "water weeds"
      ],
      "explain": "The restaurant flyer has a clear title."
    },
    {
      "id": "u1-4-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The _____ helps customers choose.",
      "answer": "menu",
      "accepted": [
        "menu"
      ],
      "options": [
        "menu",
        "flyer",
        "call to action",
        "water weeds"
      ],
      "explain": "The menu helps customers choose."
    },
    {
      "id": "u1-4-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The restaurant _____ has a clear title.",
      "answer": "flyer",
      "accepted": [
        "flyer"
      ],
      "explain": "The restaurant flyer has a clear title."
    },
    {
      "id": "u1-4-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ helps customers choose.",
      "answer": "menu",
      "accepted": [
        "menu"
      ],
      "explain": "The menu helps customers choose."
    },
    {
      "id": "u1-4-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Visit us today is a _____.",
      "answer": "call to action",
      "accepted": [
        "call to action"
      ],
      "explain": "Visit us today is a call to action."
    },
    {
      "id": "u1-4-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ is the biggest title on a flyer.",
      "answer": "main heading",
      "accepted": [
        "main heading"
      ],
      "explain": "The main heading is the biggest title on a flyer."
    },
    {
      "id": "u1-4-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A good flyer should be clear and attractive.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Clear sections and images help people understand it."
    },
    {
      "id": "u1-4-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A sub-heading must always be bigger than the main heading.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "The main heading is the biggest title."
    },
    {
      "id": "u1-4-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A flyer gives information and attracts customers.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u1-4-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "flyer",
          "context": "The restaurant _____ has a clear title."
        },
        {
          "word": "menu",
          "context": "The _____ helps customers choose."
        },
        {
          "word": "call to action",
          "context": "Visit us today is a _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u1-4-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The _____ is the biggest title on a flyer.",
      "answer": "main heading",
      "accepted": [
        "main heading"
      ],
      "options": [
        "main heading",
        "menu price",
        "feedback star",
        "image border"
      ],
      "explain": "The main heading is the biggest title on a flyer."
    },
    {
      "id": "u1-4-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What is the biggest text on a flyer?",
      "audioText": "A good restaurant flyer has a main heading, a sub-heading, an image, a menu, and a call to action.",
      "answer": "the main heading",
      "options": [
        "the main heading",
        "the menu price",
        "the image border",
        "the feedback star"
      ],
      "explain": "The main heading is the large title."
    },
    {
      "id": "u1-4-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "A flyer gives information and attracts customers. The main heading is the biggest title. A sub-heading adds a smaller important message.",
      "words": [
        "A flyer gives information and attracts customers.",
        "The main heading is the biggest title.",
        "A sub-heading adds a smaller important message."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-4-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "A sub-heading adds a smaller important message. Images make the flyer attractive and easy to understand. A menu shows choices, and a call to action invites customers to visit.",
      "words": [
        "A sub-heading adds a smaller important message.",
        "Images make the flyer attractive and easy to understand.",
        "A menu shows choices, and a call to action invites customers to visit."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u1-4-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The restaurant fyler has a clear title.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The restaurant <mark>fyler</mark> has a clear title.</span>",
      "answer": "flyer",
      "accepted": [
        "flyer"
      ],
      "explain": "The correct lesson word is flyer."
    },
    {
      "id": "u1-4-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The mneu helps customers choose.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The <mark>mneu</mark> helps customers choose.</span>",
      "answer": "menu",
      "accepted": [
        "menu"
      ],
      "explain": "The correct lesson word is menu."
    },
    {
      "id": "u1-4-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The restaurant flyer has a clear title",
      "words": [
        "The",
        "restaurant",
        "flyer",
        "has",
        "a",
        "clear",
        "title"
      ],
      "explain": "The restaurant flyer has a clear title.",
      "itemMode": "word"
    },
    {
      "id": "u1-4-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The menu helps customers choose",
      "words": [
        "The",
        "menu",
        "helps",
        "customers",
        "choose"
      ],
      "explain": "The menu helps customers choose.",
      "itemMode": "word"
    }
  ],
  "u2-0": [
    {
      "id": "u2-0-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What can give energy before exercise?",
      "answer": "fruit",
      "options": [
        "fruit",
        "only soda",
        "no food",
        "fried sweets"
      ],
      "explain": "Fruit can give the body useful energy."
    },
    {
      "id": "u2-0-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How can sports help mental health?",
      "answer": "They reduce stress and improve sleep.",
      "options": [
        "They reduce stress and improve sleep.",
        "They stop all thinking.",
        "They make people worried.",
        "They prevent rest."
      ],
      "explain": "Regular exercise supports both mood and sleep."
    },
    {
      "id": "u2-0-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Regular exercise helps us stay _____.",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "options": [
        "fit",
        "mental health",
        "stressed",
        "lungs"
      ],
      "explain": "Regular exercise helps us stay fit."
    },
    {
      "id": "u2-0-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Sports can improve _____.",
      "answer": "mental health",
      "accepted": [
        "mental health"
      ],
      "options": [
        "mental health",
        "fit",
        "stressed",
        "lungs"
      ],
      "explain": "Sports can improve mental health."
    },
    {
      "id": "u2-0-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Regular exercise helps us stay _____.",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "explain": "Regular exercise helps us stay fit."
    },
    {
      "id": "u2-0-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Sports can improve _____.",
      "answer": "mental health",
      "accepted": [
        "mental health"
      ],
      "explain": "Sports can improve mental health."
    },
    {
      "id": "u2-0-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Rest can help when you feel _____.",
      "answer": "stressed",
      "accepted": [
        "stressed"
      ],
      "explain": "Rest can help when you feel stressed."
    },
    {
      "id": "u2-0-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Swimming can make your _____ stronger.",
      "answer": "lungs",
      "accepted": [
        "lungs"
      ],
      "explain": "Swimming can make your lungs stronger."
    },
    {
      "id": "u2-0-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Exercise can make bones stronger.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Strong movement helps the body grow healthier."
    },
    {
      "id": "u2-0-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Feeling tired during sport is always dangerous.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Some tiredness is normal; the text suggests healthy food and rest."
    },
    {
      "id": "u2-0-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Sports make the body healthier and stronger.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u2-0-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "fit",
          "context": "Regular exercise helps us stay _____."
        },
        {
          "word": "mental health",
          "context": "Sports can improve _____."
        },
        {
          "word": "stressed",
          "context": "Rest can help when you feel _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u2-0-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Swimming can make your _____ stronger.",
      "answer": "lungs",
      "accepted": [
        "lungs"
      ],
      "options": [
        "lungs",
        "fit",
        "mental health",
        "stressed"
      ],
      "explain": "Swimming can make your lungs stronger."
    },
    {
      "id": "u2-0-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "How does swimming help the body?",
      "audioText": "Football makes the heart strong and helps muscles grow. Swimming makes the lungs strong. Exercise also helps people sleep better and reduces stress.",
      "answer": "It makes the lungs strong.",
      "options": [
        "It makes the lungs strong.",
        "It makes the bones disappear.",
        "It stops the heart.",
        "It increases stress."
      ],
      "explain": "The listening states that swimming strengthens the lungs."
    },
    {
      "id": "u2-0-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Sports make the body healthier and stronger. Football strengthens the heart and muscles. Swimming helps the lungs and the whole body.",
      "words": [
        "Sports make the body healthier and stronger.",
        "Football strengthens the heart and muscles.",
        "Swimming helps the lungs and the whole body."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-0-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Swimming helps the lungs and the whole body. Fruit can give energy before exercise. Regular exercise supports strong bones, better sleep, and lower stress.",
      "words": [
        "Swimming helps the lungs and the whole body.",
        "Fruit can give energy before exercise.",
        "Regular exercise supports strong bones, better sleep, and lower stress."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-0-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Regular exercise helps us stay ift.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Regular exercise helps us stay <mark>ift</mark>.</span>",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "explain": "The correct lesson word is fit."
    },
    {
      "id": "u2-0-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Sports can improve mnetal health.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Sports can improve <mark>mnetal health</mark>.</span>",
      "answer": "mental health",
      "accepted": [
        "mental health"
      ],
      "explain": "The correct lesson word is mental health."
    },
    {
      "id": "u2-0-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Regular exercise helps us stay fit",
      "words": [
        "Regular",
        "exercise",
        "helps",
        "us",
        "stay",
        "fit"
      ],
      "explain": "Regular exercise helps us stay fit.",
      "itemMode": "word"
    },
    {
      "id": "u2-0-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Sports can improve mental health",
      "words": [
        "Sports",
        "can",
        "improve",
        "mental",
        "health"
      ],
      "explain": "Sports can improve mental health.",
      "itemMode": "word"
    }
  ],
  "u2-1": [
    {
      "id": "u2-1-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How does Adam's family cook food now?",
      "answer": "They grill or bake it.",
      "options": [
        "They grill or bake it.",
        "They always fry it.",
        "They eat it raw.",
        "They add soda."
      ],
      "explain": "Grilling and baking replaced frying."
    },
    {
      "id": "u2-1-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What do fruit and vegetables give Adam?",
      "answer": "vitamins",
      "options": [
        "vitamins",
        "mud",
        "smoke",
        "stress"
      ],
      "explain": "Fruit and vegetables contain important vitamins."
    },
    {
      "id": "u2-1-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Fruit and vegetables give us _____.",
      "answer": "vitamins",
      "accepted": [
        "vitamins"
      ],
      "options": [
        "vitamins",
        "fit",
        "mental health",
        "stressed"
      ],
      "explain": "Fruit and vegetables give us vitamins."
    },
    {
      "id": "u2-1-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Regular exercise helps us stay _____.",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "options": [
        "fit",
        "vitamins",
        "mental health",
        "stressed"
      ],
      "explain": "Regular exercise helps us stay fit."
    },
    {
      "id": "u2-1-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Fruit and vegetables give us _____.",
      "answer": "vitamins",
      "accepted": [
        "vitamins"
      ],
      "explain": "Fruit and vegetables give us vitamins."
    },
    {
      "id": "u2-1-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Regular exercise helps us stay _____.",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "explain": "Regular exercise helps us stay fit."
    },
    {
      "id": "u2-1-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Adam drinks _____ instead of soda.",
      "answer": "water",
      "accepted": [
        "water"
      ],
      "explain": "Adam drinks water instead of soda."
    },
    {
      "id": "u2-1-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Adam plays _____ with friends every Saturday.",
      "answer": "football",
      "accepted": [
        "football"
      ],
      "explain": "Adam plays football with friends every Saturday."
    },
    {
      "id": "u2-1-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Adam now exercises every morning.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "His new routine includes morning exercise."
    },
    {
      "id": "u2-1-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Adam still watches TV all day.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "He now plays football with friends."
    },
    {
      "id": "u2-1-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Adam used to wake up late and exercise very little.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u2-1-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "vitamins",
          "context": "Fruit and vegetables give us _____."
        },
        {
          "word": "fit",
          "context": "Regular exercise helps us stay _____."
        },
        {
          "word": "water",
          "context": "Adam drinks _____ instead of soda."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u2-1-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Adam plays _____ with friends every Saturday.",
      "answer": "football",
      "accepted": [
        "football"
      ],
      "options": [
        "football",
        "chess all day",
        "video games all day",
        "no sport"
      ],
      "explain": "Adam plays football with friends every Saturday."
    },
    {
      "id": "u2-1-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What does Adam drink instead of soda?",
      "audioText": "Adam now drinks water instead of soda. He eats more fruit and vegetables and plays football with friends every Saturday.",
      "answer": "water",
      "options": [
        "water",
        "oil",
        "sauce",
        "coffee"
      ],
      "explain": "Adam replaced soda with water."
    },
    {
      "id": "u2-1-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Adam used to wake up late and exercise very little. Now he gets up early and exercises every morning. He replaced long hours of TV with football on Saturdays.",
      "words": [
        "Adam used to wake up late and exercise very little.",
        "Now he gets up early and exercises every morning.",
        "He replaced long hours of TV with football on Saturdays."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-1-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "He replaced long hours of TV with football on Saturdays. He eats fruit and vegetables and drinks water instead of soda. His family grills or bakes food, eats early, and walks after dinner.",
      "words": [
        "He replaced long hours of TV with football on Saturdays.",
        "He eats fruit and vegetables and drinks water instead of soda.",
        "His family grills or bakes food, eats early, and walks after dinner."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-1-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. She ate a apple.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">She ate <mark>a</mark> apple.</span>",
      "answer": "an",
      "accepted": [
        "an"
      ],
      "explain": "Use an before a vowel sound."
    },
    {
      "id": "u2-1-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. There isn't some milk.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">There isn&#x27;t <mark>some</mark> milk.</span>",
      "answer": "any",
      "accepted": [
        "any"
      ],
      "explain": "Use any in a negative sentence."
    },
    {
      "id": "u2-1-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Fruit and vegetables give us vitamins",
      "words": [
        "Fruit",
        "and",
        "vegetables",
        "give",
        "us",
        "vitamins"
      ],
      "explain": "Fruit and vegetables give us vitamins.",
      "itemMode": "word"
    },
    {
      "id": "u2-1-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Regular exercise helps us stay fit",
      "words": [
        "Regular",
        "exercise",
        "helps",
        "us",
        "stay",
        "fit"
      ],
      "explain": "Regular exercise helps us stay fit.",
      "itemMode": "word"
    }
  ],
  "u2-2": [
    {
      "id": "u2-2-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What does blood carry to cells?",
      "answer": "oxygen and nutrients",
      "options": [
        "oxygen and nutrients",
        "sand and rocks",
        "only water",
        "sound and light"
      ],
      "explain": "Cells need oxygen and nutrients to work."
    },
    {
      "id": "u2-2-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What are blood vessels?",
      "answer": "tubes that carry blood",
      "options": [
        "tubes that carry blood",
        "bones in the hand",
        "parts of the lungs",
        "foods with vitamins"
      ],
      "explain": "Blood moves through vessels like water through tubes."
    },
    {
      "id": "u2-2-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The heart is an important _____.",
      "answer": "organ",
      "accepted": [
        "organ"
      ],
      "options": [
        "organ",
        "heart",
        "blood vessels",
        "fist"
      ],
      "explain": "The heart is an important organ."
    },
    {
      "id": "u2-2-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Exercise keeps the _____ strong.",
      "answer": "heart",
      "accepted": [
        "heart"
      ],
      "options": [
        "heart",
        "organ",
        "blood vessels",
        "fist"
      ],
      "explain": "Exercise keeps the heart strong."
    },
    {
      "id": "u2-2-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The heart is an important _____.",
      "answer": "organ",
      "accepted": [
        "organ"
      ],
      "explain": "The heart is an important organ."
    },
    {
      "id": "u2-2-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Exercise keeps the _____ strong.",
      "answer": "heart",
      "accepted": [
        "heart"
      ],
      "explain": "Exercise keeps the heart strong."
    },
    {
      "id": "u2-2-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Blood travels through _____.",
      "answer": "blood vessels",
      "accepted": [
        "blood vessels"
      ],
      "explain": "Blood travels through blood vessels."
    },
    {
      "id": "u2-2-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The heart is about the size of a _____.",
      "answer": "fist",
      "accepted": [
        "fist"
      ],
      "explain": "The heart is about the size of a fist."
    },
    {
      "id": "u2-2-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The heart is about the size of your fist.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This comparison helps us imagine its size."
    },
    {
      "id": "u2-2-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Too much stress always makes the heart healthier.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Too much stress can hurt the heart."
    },
    {
      "id": "u2-2-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The heart is a strong muscle about the size of a fist.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u2-2-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "organ",
          "context": "The heart is an important _____."
        },
        {
          "word": "heart",
          "context": "Exercise keeps the _____ strong."
        },
        {
          "word": "blood vessels",
          "context": "Blood travels through _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u2-2-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The heart is about the size of a _____.",
      "answer": "fist",
      "accepted": [
        "fist"
      ],
      "options": [
        "fist",
        "organ",
        "heart",
        "blood vessels"
      ],
      "explain": "The heart is about the size of a fist."
    },
    {
      "id": "u2-2-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What does blood carry to the cells?",
      "audioText": "The heart is about the size of a fist. It pumps blood through blood vessels. Blood carries oxygen and nutrients to the cells.",
      "answer": "oxygen and nutrients",
      "options": [
        "oxygen and nutrients",
        "sand and stones",
        "books and pencils",
        "only water"
      ],
      "explain": "Blood carries oxygen and nutrients around the body."
    },
    {
      "id": "u2-2-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The heart is a strong muscle about the size of a fist. It pumps blood to every part of the body. Blood carries oxygen and nutrients to cells and takes away waste such as carbon dioxide.",
      "words": [
        "The heart is a strong muscle about the size of a fist.",
        "It pumps blood to every part of the body.",
        "Blood carries oxygen and nutrients to cells and takes away waste such as carbon dioxide."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-2-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Blood carries oxygen and nutrients to cells and takes away waste such as carbon dioxide. Blood moves through tubes called blood vessels. Good food, water, sleep, and exercise help the heart stay strong.",
      "words": [
        "Blood carries oxygen and nutrients to cells and takes away waste such as carbon dioxide.",
        "Blood moves through tubes called blood vessels.",
        "Good food, water, sleep, and exercise help the heart stay strong."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-2-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The heart is an important ogran.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The heart is an important <mark>ogran</mark>.</span>",
      "answer": "organ",
      "accepted": [
        "organ"
      ],
      "explain": "The correct lesson word is organ."
    },
    {
      "id": "u2-2-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Exercise keeps the haert strong.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Exercise keeps the <mark>haert</mark> strong.</span>",
      "answer": "heart",
      "accepted": [
        "heart"
      ],
      "explain": "The correct lesson word is heart."
    },
    {
      "id": "u2-2-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The heart is an important organ",
      "words": [
        "The",
        "heart",
        "is",
        "an",
        "important",
        "organ"
      ],
      "explain": "The heart is an important organ.",
      "itemMode": "word"
    },
    {
      "id": "u2-2-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Exercise keeps the heart strong",
      "words": [
        "Exercise",
        "keeps",
        "the",
        "heart",
        "strong"
      ],
      "explain": "Exercise keeps the heart strong.",
      "itemMode": "word"
    }
  ],
  "u2-3": [
    {
      "id": "u2-3-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Who gives advice about using medicine safely?",
      "answer": "a pharmacist",
      "options": [
        "a pharmacist",
        "a baker",
        "a farmer",
        "a pilot"
      ],
      "explain": "Pharmacists prepare medicine and explain safe use."
    },
    {
      "id": "u2-3-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Who often gives urgent help on the spot?",
      "answer": "a paramedic",
      "options": [
        "a paramedic",
        "a shopkeeper",
        "a scientist in a lab",
        "a football coach"
      ],
      "explain": "Paramedics respond quickly in emergencies."
    },
    {
      "id": "u2-3-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Doctors _____ diseases.",
      "answer": "diagnose",
      "accepted": [
        "diagnose"
      ],
      "options": [
        "diagnose",
        "pharmacist",
        "paramedic",
        "around the clock"
      ],
      "explain": "Doctors diagnose diseases."
    },
    {
      "id": "u2-3-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: A _____ explains how to use medicine.",
      "answer": "pharmacist",
      "accepted": [
        "pharmacist"
      ],
      "options": [
        "pharmacist",
        "diagnose",
        "paramedic",
        "around the clock"
      ],
      "explain": "A pharmacist explains how to use medicine."
    },
    {
      "id": "u2-3-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Doctors _____ diseases.",
      "answer": "diagnose",
      "accepted": [
        "diagnose"
      ],
      "explain": "Doctors diagnose diseases."
    },
    {
      "id": "u2-3-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: A _____ explains how to use medicine.",
      "answer": "pharmacist",
      "accepted": [
        "pharmacist"
      ],
      "explain": "A pharmacist explains how to use medicine."
    },
    {
      "id": "u2-3-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: A _____ helps at an accident.",
      "answer": "paramedic",
      "accepted": [
        "paramedic"
      ],
      "explain": "A paramedic helps at an accident."
    },
    {
      "id": "u2-3-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Nurses may work _____.",
      "answer": "around the clock",
      "accepted": [
        "around the clock"
      ],
      "explain": "Nurses may work around the clock."
    },
    {
      "id": "u2-3-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Non-fiction should use true information.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Writers should check facts and sources."
    },
    {
      "id": "u2-3-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Healthcare workers never teach healthy habits.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "They encourage healthy food, activity, and safe choices."
    },
    {
      "id": "u2-3-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Doctors check patients, diagnose diseases, and provide treatments.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u2-3-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "diagnose",
          "context": "Doctors _____ diseases."
        },
        {
          "word": "pharmacist",
          "context": "A _____ explains how to use medicine."
        },
        {
          "word": "paramedic",
          "context": "A _____ helps at an accident."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u2-3-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Nurses may work _____.",
      "answer": "around the clock",
      "accepted": [
        "around the clock"
      ],
      "options": [
        "around the clock",
        "diagnose",
        "pharmacist",
        "paramedic"
      ],
      "explain": "Nurses may work around the clock."
    },
    {
      "id": "u2-3-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Who explains how to use medicine safely?",
      "audioText": "A doctor diagnoses illness. A pharmacist explains how to use medicine safely. A paramedic gives urgent help on the spot.",
      "answer": "a pharmacist",
      "options": [
        "a pharmacist",
        "a baker",
        "a farmer",
        "a photographer"
      ],
      "explain": "A pharmacist gives advice about medicine."
    },
    {
      "id": "u2-3-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Doctors check patients, diagnose diseases, and provide treatments. Nurses care for patients and may work around the clock. Pharmacists give the correct medicine and explain safe use.",
      "words": [
        "Doctors check patients, diagnose diseases, and provide treatments.",
        "Nurses care for patients and may work around the clock.",
        "Pharmacists give the correct medicine and explain safe use."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-3-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Pharmacists give the correct medicine and explain safe use. Paramedics respond to emergencies, help on the spot, and transport patients. Healthcare workers also teach people healthy habits and deserve respect.",
      "words": [
        "Pharmacists give the correct medicine and explain safe use.",
        "Paramedics respond to emergencies, help on the spot, and transport patients.",
        "Healthcare workers also teach people healthy habits and deserve respect."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-3-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Doctors daignose diseases.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Doctors <mark>daignose</mark> diseases.</span>",
      "answer": "diagnose",
      "accepted": [
        "diagnose"
      ],
      "explain": "The correct lesson word is diagnose."
    },
    {
      "id": "u2-3-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. A pahrmacist explains how to use medicine.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">A <mark>pahrmacist</mark> explains how to use medicine.</span>",
      "answer": "pharmacist",
      "accepted": [
        "pharmacist"
      ],
      "explain": "The correct lesson word is pharmacist."
    },
    {
      "id": "u2-3-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Doctors diagnose diseases",
      "words": [
        "Doctors",
        "diagnose",
        "diseases"
      ],
      "explain": "Doctors diagnose diseases.",
      "itemMode": "word"
    },
    {
      "id": "u2-3-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "A pharmacist explains how to use medicine",
      "words": [
        "A",
        "pharmacist",
        "explains",
        "how",
        "to",
        "use",
        "medicine"
      ],
      "explain": "A pharmacist explains how to use medicine.",
      "itemMode": "word"
    }
  ],
  "u2-4": [
    {
      "id": "u2-4-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why should a poster have organized steps?",
      "answer": "They make the message easy to follow.",
      "options": [
        "They make the message easy to follow.",
        "They hide the main idea.",
        "They make all text smaller.",
        "They remove the title."
      ],
      "explain": "Organization helps readers act on the advice."
    },
    {
      "id": "u2-4-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which is a healthy daily drink?",
      "answer": "water",
      "options": [
        "water",
        "paint",
        "oil",
        "very sugary soda only"
      ],
      "explain": "The poster recommends enough water daily."
    },
    {
      "id": "u2-4-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Regular exercise helps us stay _____.",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "options": [
        "fit",
        "vitamins",
        "mental health",
        "stressed"
      ],
      "explain": "Regular exercise helps us stay fit."
    },
    {
      "id": "u2-4-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Fruit and vegetables give us _____.",
      "answer": "vitamins",
      "accepted": [
        "vitamins"
      ],
      "options": [
        "vitamins",
        "fit",
        "mental health",
        "stressed"
      ],
      "explain": "Fruit and vegetables give us vitamins."
    },
    {
      "id": "u2-4-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Regular exercise helps us stay _____.",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "explain": "Regular exercise helps us stay fit."
    },
    {
      "id": "u2-4-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Fruit and vegetables give us _____.",
      "answer": "vitamins",
      "accepted": [
        "vitamins"
      ],
      "explain": "Fruit and vegetables give us vitamins."
    },
    {
      "id": "u2-4-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Drink enough _____ every day.",
      "answer": "water",
      "accepted": [
        "water"
      ],
      "explain": "Drink enough water every day."
    },
    {
      "id": "u2-4-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Brush your teeth daily with _____.",
      "answer": "toothpaste",
      "accepted": [
        "toothpaste"
      ],
      "explain": "Brush your teeth daily with toothpaste."
    },
    {
      "id": "u2-4-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Sleeping early and getting enough rest are healthy habits.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Sleep helps the body and mind recover."
    },
    {
      "id": "u2-4-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A poster should have no title or drawings.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "A good poster uses a clear title and useful visuals."
    },
    {
      "id": "u2-4-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Wash your hands before and after eating.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u2-4-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "fit",
          "context": "Regular exercise helps us stay _____."
        },
        {
          "word": "vitamins",
          "context": "Fruit and vegetables give us _____."
        },
        {
          "word": "water",
          "context": "Drink enough _____ every day."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u2-4-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Brush your teeth daily with _____.",
      "answer": "toothpaste",
      "accepted": [
        "toothpaste"
      ],
      "options": [
        "toothpaste",
        "sand",
        "sugar",
        "paint"
      ],
      "explain": "Brush your teeth daily with toothpaste."
    },
    {
      "id": "u2-4-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Which habit protects your teeth?",
      "audioText": "Wash your hands, drink enough water, exercise regularly, sleep early, and brush your teeth every day with toothpaste.",
      "answer": "Brush them daily with toothpaste.",
      "options": [
        "Brush them daily with toothpaste.",
        "Drink soda before bed.",
        "Eat sweets all day.",
        "Never clean them."
      ],
      "explain": "Daily brushing with toothpaste helps protect the teeth."
    },
    {
      "id": "u2-4-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Wash your hands before and after eating. Eat fruit and vegetables regularly. Drink enough water every day.",
      "words": [
        "Wash your hands before and after eating.",
        "Eat fruit and vegetables regularly.",
        "Drink enough water every day."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-4-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Drink enough water every day. Exercise regularly and sleep early. Brush your teeth daily with toothpaste.",
      "words": [
        "Drink enough water every day.",
        "Exercise regularly and sleep early.",
        "Brush your teeth daily with toothpaste."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u2-4-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Regular exercise helps us stay ift.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Regular exercise helps us stay <mark>ift</mark>.</span>",
      "answer": "fit",
      "accepted": [
        "fit"
      ],
      "explain": "The correct lesson word is fit."
    },
    {
      "id": "u2-4-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Fruit and vegetables give us vtiamins.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Fruit and vegetables give us <mark>vtiamins</mark>.</span>",
      "answer": "vitamins",
      "accepted": [
        "vitamins"
      ],
      "explain": "The correct lesson word is vitamins."
    },
    {
      "id": "u2-4-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Regular exercise helps us stay fit",
      "words": [
        "Regular",
        "exercise",
        "helps",
        "us",
        "stay",
        "fit"
      ],
      "explain": "Regular exercise helps us stay fit.",
      "itemMode": "word"
    },
    {
      "id": "u2-4-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Fruit and vegetables give us vitamins",
      "words": [
        "Fruit",
        "and",
        "vegetables",
        "give",
        "us",
        "vitamins"
      ],
      "explain": "Fruit and vegetables give us vitamins.",
      "itemMode": "word"
    }
  ],
  "u3-0": [
    {
      "id": "u3-0-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How did the flood affect Mazen's uncle?",
      "answer": "It damaged his living room.",
      "options": [
        "It damaged his living room.",
        "It grew his crops.",
        "It built a new road.",
        "It made his house fly."
      ],
      "explain": "Flood water entered and damaged the house."
    },
    {
      "id": "u3-0-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why can farmers not grow crops during a drought?",
      "answer": "There is not enough water.",
      "options": [
        "There is not enough water.",
        "There is too much snow.",
        "The soil is made of metal.",
        "The crops are underwater."
      ],
      "explain": "Crops need water to grow."
    },
    {
      "id": "u3-0-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Children stayed inside during the _____.",
      "answer": "thunderstorm",
      "accepted": [
        "thunderstorm"
      ],
      "options": [
        "thunderstorm",
        "sandstorm",
        "flood",
        "drought"
      ],
      "explain": "Children stayed inside during the thunderstorm."
    },
    {
      "id": "u3-0-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: A _____ makes it hard to see.",
      "answer": "sandstorm",
      "accepted": [
        "sandstorm"
      ],
      "options": [
        "sandstorm",
        "thunderstorm",
        "flood",
        "drought"
      ],
      "explain": "A sandstorm makes it hard to see."
    },
    {
      "id": "u3-0-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Children stayed inside during the _____.",
      "answer": "thunderstorm",
      "accepted": [
        "thunderstorm"
      ],
      "explain": "Children stayed inside during the thunderstorm."
    },
    {
      "id": "u3-0-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: A _____ makes it hard to see.",
      "answer": "sandstorm",
      "accepted": [
        "sandstorm"
      ],
      "explain": "A sandstorm makes it hard to see."
    },
    {
      "id": "u3-0-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ covered the streets.",
      "answer": "flood",
      "accepted": [
        "flood"
      ],
      "explain": "The flood covered the streets."
    },
    {
      "id": "u3-0-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Crops cannot grow during a _____.",
      "answer": "drought",
      "accepted": [
        "drought"
      ],
      "explain": "Crops cannot grow during a drought."
    },
    {
      "id": "u3-0-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A heat wave means dangerously high temperatures for days.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "A heat wave lasts for a period of extreme heat."
    },
    {
      "id": "u3-0-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A wildfire helps all animals keep their homes.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It can burn forests and destroy habitats."
    },
    {
      "id": "u3-0-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A flood covered city streets and damaged Mazen's uncle's home.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u3-0-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "thunderstorm",
          "context": "Children stayed inside during the _____."
        },
        {
          "word": "sandstorm",
          "context": "A _____ makes it hard to see."
        },
        {
          "word": "flood",
          "context": "The _____ covered the streets."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u3-0-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Crops cannot grow during a _____.",
      "answer": "drought",
      "accepted": [
        "drought"
      ],
      "options": [
        "drought",
        "thunderstorm",
        "sandstorm",
        "flood"
      ],
      "explain": "Crops cannot grow during a drought."
    },
    {
      "id": "u3-0-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Which weather event makes it hard to see?",
      "audioText": "A thunderstorm brings thunder, lightning, and rain. A sandstorm fills the air with sand and makes it hard to see. A heat wave brings very hot weather.",
      "answer": "a sandstorm",
      "options": [
        "a sandstorm",
        "a heat wave",
        "a drought",
        "a peaceful pond"
      ],
      "explain": "Sand in the air reduces visibility."
    },
    {
      "id": "u3-0-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "A flood covered city streets and damaged Mazen's uncle's home. A drought leaves land dry, so farmers cannot grow crops and animals cannot find water. A wildfire can spread quickly when the land is dry and winds are strong.",
      "words": [
        "A flood covered city streets and damaged Mazen's uncle's home.",
        "A drought leaves land dry, so farmers cannot grow crops and animals cannot find water.",
        "A wildfire can spread quickly when the land is dry and winds are strong."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-0-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "A wildfire can spread quickly when the land is dry and winds are strong. Wildfires burn trees and destroy animal homes. People should learn safety rules and take care of the planet.",
      "words": [
        "A wildfire can spread quickly when the land is dry and winds are strong.",
        "Wildfires burn trees and destroy animal homes.",
        "People should learn safety rules and take care of the planet."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-0-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Children stayed inside during the tuhnderstorm.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Children stayed inside during the <mark>tuhnderstorm</mark>.</span>",
      "answer": "thunderstorm",
      "accepted": [
        "thunderstorm"
      ],
      "explain": "The correct lesson word is thunderstorm."
    },
    {
      "id": "u3-0-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. A snadstorm makes it hard to see.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">A <mark>snadstorm</mark> makes it hard to see.</span>",
      "answer": "sandstorm",
      "accepted": [
        "sandstorm"
      ],
      "explain": "The correct lesson word is sandstorm."
    },
    {
      "id": "u3-0-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Children stayed inside during the thunderstorm",
      "words": [
        "Children",
        "stayed",
        "inside",
        "during",
        "the",
        "thunderstorm"
      ],
      "explain": "Children stayed inside during the thunderstorm.",
      "itemMode": "word"
    },
    {
      "id": "u3-0-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "A sandstorm makes it hard to see",
      "words": [
        "A",
        "sandstorm",
        "makes",
        "it",
        "hard",
        "to",
        "see"
      ],
      "explain": "A sandstorm makes it hard to see.",
      "itemMode": "word"
    }
  ],
  "u3-1": [
    {
      "id": "u3-1-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What helped fields during droughts?",
      "answer": "irrigation systems",
      "options": [
        "irrigation systems",
        "wildfires",
        "more sand",
        "closed wells"
      ],
      "explain": "Irrigation carried water to crops."
    },
    {
      "id": "u3-1-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How did people protect homes from sandstorms?",
      "answer": "They built with thick mud bricks.",
      "options": [
        "They built with thick mud bricks.",
        "They removed all walls.",
        "They used thin paper.",
        "They lived in the river."
      ],
      "explain": "Thick mud-brick walls blocked wind and sand."
    },
    {
      "id": "u3-1-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The _____ covered the streets.",
      "answer": "flood",
      "accepted": [
        "flood"
      ],
      "options": [
        "flood",
        "drought",
        "sandstorm",
        "irrigation"
      ],
      "explain": "The flood covered the streets."
    },
    {
      "id": "u3-1-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Crops cannot grow during a _____.",
      "answer": "drought",
      "accepted": [
        "drought"
      ],
      "options": [
        "drought",
        "flood",
        "sandstorm",
        "irrigation"
      ],
      "explain": "Crops cannot grow during a drought."
    },
    {
      "id": "u3-1-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ covered the streets.",
      "answer": "flood",
      "accepted": [
        "flood"
      ],
      "explain": "The flood covered the streets."
    },
    {
      "id": "u3-1-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Crops cannot grow during a _____.",
      "answer": "drought",
      "accepted": [
        "drought"
      ],
      "explain": "Crops cannot grow during a drought."
    },
    {
      "id": "u3-1-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: A _____ makes it hard to see.",
      "answer": "sandstorm",
      "accepted": [
        "sandstorm"
      ],
      "explain": "A sandstorm makes it hard to see."
    },
    {
      "id": "u3-1-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Egyptians used _____ during droughts.",
      "answer": "irrigation",
      "accepted": [
        "irrigation"
      ],
      "explain": "Egyptians used irrigation during droughts."
    },
    {
      "id": "u3-1-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The Nile's floods could help farming by bringing rich soil.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Controlled floodwater renewed the farmland."
    },
    {
      "id": "u3-1-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Ancient Egyptians used modern electric machines.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "They used simple tools and smart systems."
    },
    {
      "id": "u3-1-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The Nile gave Ancient Egypt water and rich soil for farming.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u3-1-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "flood",
          "context": "The _____ covered the streets."
        },
        {
          "word": "drought",
          "context": "Crops cannot grow during a _____."
        },
        {
          "word": "sandstorm",
          "context": "A _____ makes it hard to see."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u3-1-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Egyptians used _____ during droughts.",
      "answer": "irrigation",
      "accepted": [
        "irrigation"
      ],
      "options": [
        "irrigation",
        "flood",
        "drought",
        "sandstorm"
      ],
      "explain": "Egyptians used irrigation during droughts."
    },
    {
      "id": "u3-1-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Why did ancient farmers use basin irrigation?",
      "audioText": "Ancient Egyptians used basin irrigation. Nile floodwater filled the basins, and farmers later planted crops in the wet, fertile soil.",
      "answer": "to use Nile floodwater to grow crops",
      "options": [
        "to use Nile floodwater to grow crops",
        "to stop all farming",
        "to build theme parks",
        "to make the soil dry"
      ],
      "explain": "Basin irrigation stored floodwater for farming."
    },
    {
      "id": "u3-1-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The Nile gave Ancient Egypt water and rich soil for farming. Strong floods could damage farms, so people built canals and basins to control water. During droughts, low Nile water made land dry; irrigation brought water to fields.",
      "words": [
        "The Nile gave Ancient Egypt water and rich soil for farming.",
        "Strong floods could damage farms, so people built canals and basins to control water.",
        "During droughts, low Nile water made land dry; irrigation brought water to fields."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-1-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "During droughts, low Nile water made land dry; irrigation brought water to fields. Khamsin sandstorms made seeing and breathing difficult. Thick mud-brick homes protected people from wind, sand, and heat.",
      "words": [
        "During droughts, low Nile water made land dry; irrigation brought water to fields.",
        "Khamsin sandstorms made seeing and breathing difficult.",
        "Thick mud-brick homes protected people from wind, sand, and heat."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-1-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. They didn't had modern machines.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">They didn&#x27;t <mark>had</mark> modern machines.</span>",
      "answer": "have",
      "accepted": [
        "have"
      ],
      "explain": "After didn't, use the base verb."
    },
    {
      "id": "u3-1-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. What did they built?",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">What did they <mark>built</mark>?</span>",
      "answer": "build",
      "accepted": [
        "build"
      ],
      "explain": "After did, use the base verb."
    },
    {
      "id": "u3-1-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The flood covered the streets",
      "words": [
        "The",
        "flood",
        "covered",
        "the",
        "streets"
      ],
      "explain": "The flood covered the streets.",
      "itemMode": "word"
    },
    {
      "id": "u3-1-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Crops cannot grow during a drought",
      "words": [
        "Crops",
        "cannot",
        "grow",
        "during",
        "a",
        "drought"
      ],
      "explain": "Crops cannot grow during a drought.",
      "itemMode": "word"
    }
  ],
  "u3-2": [
    {
      "id": "u3-2-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why was the well risky?",
      "answer": "They might get stuck if it dried up.",
      "options": [
        "They might get stuck if it dried up.",
        "It had too many trees.",
        "It was beside a bakery.",
        "It was not deep."
      ],
      "explain": "Its deep sides could stop them from escaping."
    },
    {
      "id": "u3-2-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What is the story's moral?",
      "answer": "Think carefully before making a choice.",
      "options": [
        "Think carefully before making a choice.",
        "Always choose the first idea.",
        "Never listen to a friend.",
        "Deep places are always safe."
      ],
      "explain": "The second frog checks a future risk before acting."
    },
    {
      "id": "u3-2-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The village was _____.",
      "answer": "peaceful",
      "accepted": [
        "peaceful"
      ],
      "options": [
        "peaceful",
        "pond",
        "well",
        "flies"
      ],
      "explain": "The village was peaceful."
    },
    {
      "id": "u3-2-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The frogs lived in a _____.",
      "answer": "pond",
      "accepted": [
        "pond"
      ],
      "options": [
        "pond",
        "peaceful",
        "well",
        "flies"
      ],
      "explain": "The frogs lived in a pond."
    },
    {
      "id": "u3-2-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The village was _____.",
      "answer": "peaceful",
      "accepted": [
        "peaceful"
      ],
      "explain": "The village was peaceful."
    },
    {
      "id": "u3-2-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The frogs lived in a _____.",
      "answer": "pond",
      "accepted": [
        "pond"
      ],
      "explain": "The frogs lived in a pond."
    },
    {
      "id": "u3-2-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The frogs found a deep _____.",
      "answer": "well",
      "accepted": [
        "well"
      ],
      "explain": "The frogs found a deep well."
    },
    {
      "id": "u3-2-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The frogs caught _____.",
      "answer": "flies",
      "accepted": [
        "flies"
      ],
      "explain": "The frogs caught flies."
    },
    {
      "id": "u3-2-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The frogs decided to live in the well.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "They decided it might be unsafe and kept searching."
    },
    {
      "id": "u3-2-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The frogs used careful thinking to stay safe.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "They considered what could happen later."
    },
    {
      "id": "u3-2-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Two frog friends lived happily in a pond near a village.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u3-2-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "peaceful",
          "context": "The village was _____."
        },
        {
          "word": "pond",
          "context": "The frogs lived in a _____."
        },
        {
          "word": "well",
          "context": "The frogs found a deep _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u3-2-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The frogs caught _____.",
      "answer": "flies",
      "accepted": [
        "flies"
      ],
      "options": [
        "flies",
        "peaceful",
        "pond",
        "well"
      ],
      "explain": "The frogs caught flies."
    },
    {
      "id": "u3-2-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Why did the second frog escape?",
      "audioText": "Two frogs fell into a deep well. One frog gave up, but the other kept leaping until it escaped.",
      "answer": "It did not give up.",
      "options": [
        "It did not give up.",
        "It stopped trying.",
        "It waited for a car.",
        "It became a bird."
      ],
      "explain": "The frog continued trying until it reached safety."
    },
    {
      "id": "u3-2-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Two frog friends lived happily in a pond near a village. A very hot summer dried the pond, so they searched for a new home. They found a deep well with cool water.",
      "words": [
        "Two frog friends lived happily in a pond near a village.",
        "A very hot summer dried the pond, so they searched for a new home.",
        "They found a deep well with cool water."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-2-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "They found a deep well with cool water. One frog wanted to jump in, but the other asked how they would escape if the well dried. They chose not to enter and kept searching. The moral is to think before acting.",
      "words": [
        "They found a deep well with cool water.",
        "One frog wanted to jump in, but the other asked how they would escape if the well dried.",
        "They chose not to enter and kept searching. The moral is to think before acting."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-2-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The village was paeceful.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The village was <mark>paeceful</mark>.</span>",
      "answer": "peaceful",
      "accepted": [
        "peaceful"
      ],
      "explain": "The correct lesson word is peaceful."
    },
    {
      "id": "u3-2-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The frogs lived in a pnod.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The frogs lived in a <mark>pnod</mark>.</span>",
      "answer": "pond",
      "accepted": [
        "pond"
      ],
      "explain": "The correct lesson word is pond."
    },
    {
      "id": "u3-2-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The village was peaceful",
      "words": [
        "The",
        "village",
        "was",
        "peaceful"
      ],
      "explain": "The village was peaceful.",
      "itemMode": "word"
    },
    {
      "id": "u3-2-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The frogs lived in a pond",
      "words": [
        "The",
        "frogs",
        "lived",
        "in",
        "a",
        "pond"
      ],
      "explain": "The frogs lived in a pond.",
      "itemMode": "word"
    }
  ],
  "u3-3": [
    {
      "id": "u3-3-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which plot part introduces characters and setting?",
      "answer": "the beginning",
      "options": [
        "the beginning",
        "the climax",
        "the final title",
        "the glossary"
      ],
      "explain": "Readers meet the story world at the beginning."
    },
    {
      "id": "u3-3-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What is the climax?",
      "answer": "the most exciting part",
      "options": [
        "the most exciting part",
        "the ingredient list",
        "the writer's name only",
        "the first vocabulary word"
      ],
      "explain": "The climax is the high point of the plot."
    },
    {
      "id": "u3-3-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Lily's story is _____.",
      "answer": "fiction",
      "accepted": [
        "fiction"
      ],
      "options": [
        "fiction",
        "thunderstorm",
        "sandstorm",
        "flood"
      ],
      "explain": "Lily's story is fiction."
    },
    {
      "id": "u3-3-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The _____ introduces the characters and setting.",
      "answer": "beginning",
      "accepted": [
        "beginning"
      ],
      "options": [
        "beginning",
        "climax",
        "ending",
        "solution"
      ],
      "explain": "The beginning introduces the characters and setting."
    },
    {
      "id": "u3-3-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Lily's story is _____.",
      "answer": "fiction",
      "accepted": [
        "fiction"
      ],
      "explain": "Lily's story is fiction."
    },
    {
      "id": "u3-3-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ introduces the characters and setting.",
      "answer": "beginning",
      "accepted": [
        "beginning"
      ],
      "explain": "The beginning introduces the characters and setting."
    },
    {
      "id": "u3-3-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ is the most exciting part of a story.",
      "answer": "climax",
      "accepted": [
        "climax"
      ],
      "explain": "The climax is the most exciting part of a story."
    },
    {
      "id": "u3-3-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ shows how the problem is solved.",
      "answer": "solution",
      "accepted": [
        "solution"
      ],
      "explain": "The solution shows how the problem is solved."
    },
    {
      "id": "u3-3-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A fiction story needs a clear sequence of events.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "A plot helps the reader follow what happens."
    },
    {
      "id": "u3-3-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A story's setting means only its moral.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "The setting is the time and place."
    },
    {
      "id": "u3-3-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Lily saw clouds floating upside down and worried that her flowers would get no sunshine.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u3-3-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "fiction",
          "context": "Lily's story is _____."
        },
        {
          "word": "beginning",
          "context": "The _____ introduces the characters and setting."
        },
        {
          "word": "climax",
          "context": "The _____ is the most exciting part of a story."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u3-3-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The _____ shows how the problem is solved.",
      "answer": "solution",
      "accepted": [
        "solution"
      ],
      "options": [
        "solution",
        "character",
        "setting",
        "problem"
      ],
      "explain": "The solution shows how the problem is solved."
    },
    {
      "id": "u3-3-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What is the climax of a story?",
      "audioText": "Fiction is a made-up story created from imagination. A story begins with characters and setting, reaches a climax, and ends with a solution.",
      "answer": "the most exciting part",
      "options": [
        "the most exciting part",
        "the list of ingredients",
        "the first page number",
        "the writer's address"
      ],
      "explain": "The climax is the point of greatest excitement."
    },
    {
      "id": "u3-3-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Lily saw clouds floating upside down and worried that her flowers would get no sunshine. She remembered her grandmother's idea about a gentle whisper. Lily politely asked the clouds to turn over.",
      "words": [
        "Lily saw clouds floating upside down and worried that her flowers would get no sunshine.",
        "She remembered her grandmother's idea about a gentle whisper.",
        "Lily politely asked the clouds to turn over."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-3-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Lily politely asked the clouds to turn over. The clouds magically moved, the sun returned, and the flowers smiled. The story suggests that kindness can help solve big problems.",
      "words": [
        "Lily politely asked the clouds to turn over.",
        "The clouds magically moved, the sun returned, and the flowers smiled.",
        "The story suggests that kindness can help solve big problems."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-3-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Lily's story is fcition.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Lily&#x27;s story is <mark>fcition</mark>.</span>",
      "answer": "fiction",
      "accepted": [
        "fiction"
      ],
      "explain": "The correct lesson word is fiction."
    },
    {
      "id": "u3-3-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Children stayed inside during the tuhnderstorm.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Children stayed inside during the <mark>tuhnderstorm</mark>.</span>",
      "answer": "thunderstorm",
      "accepted": [
        "thunderstorm"
      ],
      "explain": "The correct lesson word is thunderstorm."
    },
    {
      "id": "u3-3-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Lily's story is fiction",
      "words": [
        "Lily's",
        "story",
        "is",
        "fiction"
      ],
      "explain": "Lily's story is fiction.",
      "itemMode": "word"
    },
    {
      "id": "u3-3-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Children stayed inside during the thunderstorm",
      "words": [
        "Children",
        "stayed",
        "inside",
        "during",
        "the",
        "thunderstorm"
      ],
      "explain": "Children stayed inside during the thunderstorm.",
      "itemMode": "word"
    }
  ],
  "u3-4": [
    {
      "id": "u3-4-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What should a safety caption be?",
      "answer": "short, clear, and accurate",
      "options": [
        "short, clear, and accurate",
        "hidden and confusing",
        "unrelated to the image",
        "made only of prices"
      ],
      "explain": "A clear caption quickly teaches the viewer."
    },
    {
      "id": "u3-4-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which title best fits this project?",
      "answer": "Nature Changes, We Stay Safe",
      "options": [
        "Nature Changes, We Stay Safe",
        "My Medicine Shop",
        "Koshari Prices",
        "The Gold Ring Menu"
      ],
      "explain": "The project focuses on nature and safety."
    },
    {
      "id": "u3-4-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Earth is our _____.",
      "answer": "planet",
      "accepted": [
        "planet"
      ],
      "options": [
        "planet",
        "wildfire",
        "flood",
        "drought"
      ],
      "explain": "Earth is our planet."
    },
    {
      "id": "u3-4-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The _____ destroyed animal homes.",
      "answer": "wildfire",
      "accepted": [
        "wildfire"
      ],
      "options": [
        "wildfire",
        "planet",
        "flood",
        "drought"
      ],
      "explain": "The wildfire destroyed animal homes."
    },
    {
      "id": "u3-4-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Earth is our _____.",
      "answer": "planet",
      "accepted": [
        "planet"
      ],
      "explain": "Earth is our planet."
    },
    {
      "id": "u3-4-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ destroyed animal homes.",
      "answer": "wildfire",
      "accepted": [
        "wildfire"
      ],
      "explain": "The wildfire destroyed animal homes."
    },
    {
      "id": "u3-4-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ covered the streets.",
      "answer": "flood",
      "accepted": [
        "flood"
      ],
      "explain": "The flood covered the streets."
    },
    {
      "id": "u3-4-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Crops cannot grow during a _____.",
      "answer": "drought",
      "accepted": [
        "drought"
      ],
      "explain": "Crops cannot grow during a drought."
    },
    {
      "id": "u3-4-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A collage can use both images and short words.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Pictures and captions work together."
    },
    {
      "id": "u3-4-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Safety information should be invented without checking.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Safety facts should be accurate and reliable."
    },
    {
      "id": "u3-4-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A collage combines pictures and words around one idea.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u3-4-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "planet",
          "context": "Earth is our _____."
        },
        {
          "word": "wildfire",
          "context": "The _____ destroyed animal homes."
        },
        {
          "word": "flood",
          "context": "The _____ covered the streets."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u3-4-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Crops cannot grow during a _____.",
      "answer": "drought",
      "accepted": [
        "drought"
      ],
      "options": [
        "drought",
        "planet",
        "wildfire",
        "flood"
      ],
      "explain": "Crops cannot grow during a drought."
    },
    {
      "id": "u3-4-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What should you do after cutting out the pictures?",
      "audioText": "To make a nature collage, find pictures of different weather conditions, cut them out, and then glue them together. The pictures can overlap.",
      "answer": "glue them together",
      "options": [
        "glue them together",
        "throw them away",
        "hide them",
        "write a recipe"
      ],
      "explain": "The next step is to glue the pictures together."
    },
    {
      "id": "u3-4-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "A collage combines pictures and words around one idea. Choose images that clearly show changes in nature. Arrange the images so viewers can understand the message.",
      "words": [
        "A collage combines pictures and words around one idea.",
        "Choose images that clearly show changes in nature.",
        "Arrange the images so viewers can understand the message."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-4-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Arrange the images so viewers can understand the message. Add short captions about safety and protecting the planet. Review the work and explain your choices to a classmate.",
      "words": [
        "Arrange the images so viewers can understand the message.",
        "Add short captions about safety and protecting the planet.",
        "Review the work and explain your choices to a classmate."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u3-4-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Earth is our palnet.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Earth is our <mark>palnet</mark>.</span>",
      "answer": "planet",
      "accepted": [
        "planet"
      ],
      "explain": "The correct lesson word is planet."
    },
    {
      "id": "u3-4-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The wlidfire destroyed animal homes.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The <mark>wlidfire</mark> destroyed animal homes.</span>",
      "answer": "wildfire",
      "accepted": [
        "wildfire"
      ],
      "explain": "The correct lesson word is wildfire."
    },
    {
      "id": "u3-4-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Earth is our planet",
      "words": [
        "Earth",
        "is",
        "our",
        "planet"
      ],
      "explain": "Earth is our planet.",
      "itemMode": "word"
    },
    {
      "id": "u3-4-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The wildfire destroyed animal homes",
      "words": [
        "The",
        "wildfire",
        "destroyed",
        "animal",
        "homes"
      ],
      "explain": "The wildfire destroyed animal homes.",
      "itemMode": "word"
    }
  ],
  "u4-0": [
    {
      "id": "u4-0-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Where does Tamer choose groceries?",
      "answer": "at the supermarket",
      "options": [
        "at the supermarket",
        "at the barn",
        "at the theme park",
        "at the well"
      ],
      "explain": "A supermarket sells groceries."
    },
    {
      "id": "u4-0-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Where do the boys plan to go in the afternoon?",
      "answer": "the bakery",
      "options": [
        "the bakery",
        "the airport",
        "the hospital",
        "the swamp"
      ],
      "explain": "They want fresh bread from the bakery."
    },
    {
      "id": "u4-0-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: My family has dinner at a _____.",
      "answer": "restaurant",
      "accepted": [
        "restaurant"
      ],
      "options": [
        "restaurant",
        "coffee shop",
        "bakery",
        "supermarket"
      ],
      "explain": "My family has dinner at a restaurant."
    },
    {
      "id": "u4-0-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Adel likes cake at the _____.",
      "answer": "coffee shop",
      "accepted": [
        "coffee shop"
      ],
      "options": [
        "coffee shop",
        "restaurant",
        "bakery",
        "supermarket"
      ],
      "explain": "Adel likes cake at the coffee shop."
    },
    {
      "id": "u4-0-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: My family has dinner at a _____.",
      "answer": "restaurant",
      "accepted": [
        "restaurant"
      ],
      "explain": "My family has dinner at a restaurant."
    },
    {
      "id": "u4-0-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Adel likes cake at the _____.",
      "answer": "coffee shop",
      "accepted": [
        "coffee shop"
      ],
      "explain": "Adel likes cake at the coffee shop."
    },
    {
      "id": "u4-0-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: We bought fresh bread at the _____.",
      "answer": "bakery",
      "accepted": [
        "bakery"
      ],
      "explain": "We bought fresh bread at the bakery."
    },
    {
      "id": "u4-0-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: My family shops at the _____.",
      "answer": "supermarket",
      "accepted": [
        "supermarket"
      ],
      "explain": "My family shops at the supermarket."
    },
    {
      "id": "u4-0-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A bakery sells bread and cakes.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Bakers prepare these foods there."
    },
    {
      "id": "u4-0-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A theme park is mainly a place to buy medicine.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "A theme park has rides and games."
    },
    {
      "id": "u4-0-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Adel goes to the club to play sports, video games, and spend time with friends.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u4-0-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "restaurant",
          "context": "My family has dinner at a _____."
        },
        {
          "word": "coffee shop",
          "context": "Adel likes cake at the _____."
        },
        {
          "word": "bakery",
          "context": "We bought fresh bread at the _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u4-0-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: My family shops at the _____.",
      "answer": "supermarket",
      "accepted": [
        "supermarket"
      ],
      "options": [
        "supermarket",
        "restaurant",
        "coffee shop",
        "bakery"
      ],
      "explain": "My family shops at the supermarket."
    },
    {
      "id": "u4-0-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Where does Adel buy fresh bread?",
      "audioText": "Adel's community has a bakery, supermarket, coffee shop, restaurant, club, and theme park. He buys fresh bread at the bakery and groceries at the supermarket.",
      "answer": "at the bakery",
      "options": [
        "at the bakery",
        "at the club",
        "at the theme park",
        "at the hospital"
      ],
      "explain": "The bakery sells fresh bread."
    },
    {
      "id": "u4-0-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Adel goes to the club to play sports, video games, and spend time with friends. Tamer goes to the supermarket with his family to choose groceries. Tamer's family often eats dinner at restaurants.",
      "words": [
        "Adel goes to the club to play sports, video games, and spend time with friends.",
        "Tamer goes to the supermarket with his family to choose groceries.",
        "Tamer's family often eats dinner at restaurants."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-0-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Tamer's family often eats dinner at restaurants. Adel enjoys coffee and cake at a relaxing coffee shop. They plan to buy fresh bread from the bakery in the afternoon.",
      "words": [
        "Tamer's family often eats dinner at restaurants.",
        "Adel enjoys coffee and cake at a relaxing coffee shop.",
        "They plan to buy fresh bread from the bakery in the afternoon."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-0-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. My family has dinner at a rsetaurant.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">My family has dinner at a <mark>rsetaurant</mark>.</span>",
      "answer": "restaurant",
      "accepted": [
        "restaurant"
      ],
      "explain": "The correct lesson word is restaurant."
    },
    {
      "id": "u4-0-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Adel likes cake at the cfofee shop.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Adel likes cake at the <mark>cfofee shop</mark>.</span>",
      "answer": "coffee shop",
      "accepted": [
        "coffee shop"
      ],
      "explain": "The correct lesson word is coffee shop."
    },
    {
      "id": "u4-0-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "My family has dinner at a restaurant",
      "words": [
        "My",
        "family",
        "has",
        "dinner",
        "at",
        "a",
        "restaurant"
      ],
      "explain": "My family has dinner at a restaurant.",
      "itemMode": "word"
    },
    {
      "id": "u4-0-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Adel likes cake at the coffee shop",
      "words": [
        "Adel",
        "likes",
        "cake",
        "at",
        "the",
        "coffee",
        "shop"
      ],
      "explain": "Adel likes cake at the coffee shop.",
      "itemMode": "word"
    }
  ],
  "u4-1": [
    {
      "id": "u4-1-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Where do farmers keep cows and sheep?",
      "answer": "in barns",
      "options": [
        "in barns",
        "in coffee shops",
        "in towers",
        "in canoes"
      ],
      "explain": "A barn is a farm building for animals."
    },
    {
      "id": "u4-1-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What is the village like at night?",
      "answer": "quiet and peaceful",
      "options": [
        "quiet and peaceful",
        "full of traffic",
        "underwater",
        "dangerously hot every night"
      ],
      "explain": "The text describes calm nights and clear stars."
    },
    {
      "id": "u4-1-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Farmers work in green _____.",
      "answer": "fields",
      "accepted": [
        "fields",
        "field"
      ],
      "options": [
        "fields",
        "cottage",
        "community center",
        "barn"
      ],
      "explain": "Farmers work in green fields."
    },
    {
      "id": "u4-1-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The family lives in a _____.",
      "answer": "cottage",
      "accepted": [
        "cottage"
      ],
      "options": [
        "cottage",
        "field",
        "community center",
        "barn"
      ],
      "explain": "The family lives in a cottage."
    },
    {
      "id": "u4-1-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Farmers work in green _____.",
      "answer": "fields",
      "accepted": [
        "fields",
        "field"
      ],
      "explain": "Farmers work in green fields."
    },
    {
      "id": "u4-1-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The family lives in a _____.",
      "answer": "cottage",
      "accepted": [
        "cottage"
      ],
      "explain": "The family lives in a cottage."
    },
    {
      "id": "u4-1-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Children play at the _____.",
      "answer": "community center",
      "accepted": [
        "community center"
      ],
      "explain": "Children play at the community center."
    },
    {
      "id": "u4-1-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Cows and sheep stay in the _____.",
      "answer": "barn",
      "accepted": [
        "barn"
      ],
      "explain": "Cows and sheep stay in the barn."
    },
    {
      "id": "u4-1-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The community center is a place to meet friends.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "The narrator plays games with friends there."
    },
    {
      "id": "u4-1-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The village has no fields or animals.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It has green fields and several farm animals."
    },
    {
      "id": "u4-1-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The narrator lives in a small, friendly village with fields, trees, and hills.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u4-1-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "fields",
          "context": "Farmers work in green _____."
        },
        {
          "word": "cottage",
          "context": "The family lives in a _____."
        },
        {
          "word": "community center",
          "context": "Children play at the _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u4-1-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Cows and sheep stay in the _____.",
      "answer": "barn",
      "accepted": [
        "barn"
      ],
      "options": [
        "barn",
        "field",
        "cottage",
        "community center"
      ],
      "explain": "Cows and sheep stay in the barn."
    },
    {
      "id": "u4-1-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Which places bring people together?",
      "audioText": "In Egyptian villages, people may live in cozy cottages near fields and barns. The main square and community center bring people together.",
      "answer": "the main square and community center",
      "options": [
        "the main square and community center",
        "only the barn roof",
        "a private bedroom",
        "the desert road"
      ],
      "explain": "These shared places are used by the community."
    },
    {
      "id": "u4-1-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The narrator lives in a small, friendly village with fields, trees, and hills. The family has a cozy cottage near the community center. Farmers work in fields and keep cows, sheep, and chickens in barns.",
      "words": [
        "The narrator lives in a small, friendly village with fields, trees, and hills.",
        "The family has a cozy cottage near the community center.",
        "Farmers work in fields and keep cows, sheep, and chickens in barns."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-1-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Farmers work in fields and keep cows, sheep, and chickens in barns. The main square is busiest on Saturdays because people shop at the market. The village becomes quiet at night, and the narrator enjoys the stars.",
      "words": [
        "Farmers work in fields and keep cows, sheep, and chickens in barns.",
        "The main square is busiest on Saturdays because people shop at the market.",
        "The village becomes quiet at night, and the narrator enjoys the stars."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-1-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. We meet in 3 p.m.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">We meet <mark>in</mark> 3 p.m.</span>",
      "answer": "at",
      "accepted": [
        "at"
      ],
      "explain": "Use at with a clock time."
    },
    {
      "id": "u4-1-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. My birthday is in May 17th.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">My birthday is <mark>in</mark> May 17th.</span>",
      "answer": "on",
      "accepted": [
        "on"
      ],
      "explain": "Use on with a date."
    },
    {
      "id": "u4-1-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Farmers work in green fields",
      "words": [
        "Farmers",
        "work",
        "in",
        "green",
        "fields"
      ],
      "explain": "Farmers work in green fields.",
      "itemMode": "word"
    },
    {
      "id": "u4-1-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The family lives in a cottage",
      "words": [
        "The",
        "family",
        "lives",
        "in",
        "a",
        "cottage"
      ],
      "explain": "The family lives in a cottage.",
      "itemMode": "word"
    }
  ],
  "u4-2": [
    {
      "id": "u4-2-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which word contains the trigraph 'igh'?",
      "answer": "flight",
      "options": [
        "flight",
        "near",
        "chair",
        "farm"
      ],
      "explain": "The three letters igh make one long i sound."
    },
    {
      "id": "u4-2-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which trigraph sounds like 'ch'?",
      "answer": "tch",
      "options": [
        "tch",
        "dge",
        "igh",
        "str"
      ],
      "explain": "The letters tch form the ch sound in match."
    },
    {
      "id": "u4-2-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Farmers work in green _____.",
      "answer": "fields",
      "accepted": [
        "fields",
        "field"
      ],
      "options": [
        "fields",
        "groceries",
        "restaurant",
        "coffee shop"
      ],
      "explain": "Farmers work in green fields."
    },
    {
      "id": "u4-2-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: We picked _____ together.",
      "answer": "groceries",
      "accepted": [
        "groceries"
      ],
      "options": [
        "groceries",
        "field",
        "restaurant",
        "coffee shop"
      ],
      "explain": "We picked groceries together."
    },
    {
      "id": "u4-2-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Farmers work in green _____.",
      "answer": "fields",
      "accepted": [
        "fields",
        "field"
      ],
      "explain": "Farmers work in green fields."
    },
    {
      "id": "u4-2-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: We picked _____ together.",
      "answer": "groceries",
      "accepted": [
        "groceries"
      ],
      "explain": "We picked groceries together."
    },
    {
      "id": "u4-2-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Equal groups in a word problem suggest _____.",
      "answer": "multiplication",
      "accepted": [
        "multiplication"
      ],
      "explain": "Equal groups in a word problem suggest multiplication."
    },
    {
      "id": "u4-2-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Multiply the _____ first, then the tens.",
      "answer": "ones",
      "accepted": [
        "ones"
      ],
      "explain": "Multiply the ones first, then the tens."
    },
    {
      "id": "u4-2-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A trigraph is a group of three letters for one sound.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "The letters work together as one sound pattern."
    },
    {
      "id": "u4-2-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "32 multiplied by 4 equals 68.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "32 × 4 equals 128."
    },
    {
      "id": "u4-2-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Read the word problem carefully and find the numbers.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u4-2-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "fields",
          "context": "Farmers work in green _____."
        },
        {
          "word": "groceries",
          "context": "We picked _____ together."
        },
        {
          "word": "multiplication",
          "context": "Equal groups in a word problem suggest _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u4-2-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Multiply the _____ first, then the tens.",
      "answer": "ones",
      "accepted": [
        "ones"
      ],
      "options": [
        "ones",
        "hundreds",
        "headings",
        "pictures"
      ],
      "explain": "Multiply the ones first, then the tens."
    },
    {
      "id": "u4-2-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "How many apples are there altogether?",
      "audioText": "Four boxes have thirty-two apples each. Equal groups suggest multiplication. Thirty-two times four equals one hundred and twenty-eight.",
      "answer": "128",
      "options": [
        "128",
        "36",
        "64",
        "96"
      ],
      "explain": "32 multiplied by 4 equals 128."
    },
    {
      "id": "u4-2-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Read the word problem carefully and find the numbers. Choose the correct operation: equal groups suggest multiplication. Multiply ones first, then tens.",
      "words": [
        "Read the word problem carefully and find the numbers.",
        "Choose the correct operation: equal groups suggest multiplication.",
        "Multiply ones first, then tens."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-2-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Multiply ones first, then tens. Write a complete answer with the correct unit. A trigraph is three letters representing one sound.",
      "words": [
        "Multiply ones first, then tens.",
        "Write a complete answer with the correct unit.",
        "A trigraph is three letters representing one sound."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-2-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Farmers work in green feilds.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Farmers work in green <mark>feild</mark>s.</span>",
      "answer": "field",
      "accepted": [
        "field"
      ],
      "explain": "The correct lesson word is field."
    },
    {
      "id": "u4-2-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. We picked gorceries together.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">We picked <mark>gorceries</mark> together.</span>",
      "answer": "groceries",
      "accepted": [
        "groceries"
      ],
      "explain": "The correct lesson word is groceries."
    },
    {
      "id": "u4-2-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Farmers work in green fields",
      "words": [
        "Farmers",
        "work",
        "in",
        "green",
        "fields"
      ],
      "explain": "Farmers work in green fields.",
      "itemMode": "word"
    },
    {
      "id": "u4-2-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "We picked groceries together",
      "words": [
        "We",
        "picked",
        "groceries",
        "together"
      ],
      "explain": "We picked groceries together.",
      "itemMode": "word"
    }
  ],
  "u4-3": [
    {
      "id": "u4-3-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why was the new city built?",
      "answer": "to reduce crowding in Cairo",
      "options": [
        "to reduce crowding in Cairo",
        "to create a sandstorm",
        "to hide all farms",
        "to stop people using technology"
      ],
      "explain": "New development gives people and offices more space."
    },
    {
      "id": "u4-3-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How tall is the Iconic Tower?",
      "answer": "385 meters",
      "options": [
        "385 meters",
        "80 meters",
        "45 meters",
        "2026 meters"
      ],
      "explain": "The text states that the tower is 385 meters high."
    },
    {
      "id": "u4-3-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The New Administrative Capital is a _____.",
      "answer": "smart city",
      "accepted": [
        "smart city"
      ],
      "options": [
        "smart city",
        "reduce",
        "Iconic Tower",
        "steel"
      ],
      "explain": "The New Administrative Capital is a smart city."
    },
    {
      "id": "u4-3-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: New cities _____ crowding.",
      "answer": "reduce",
      "accepted": [
        "reduce"
      ],
      "options": [
        "reduce",
        "smart city",
        "Iconic Tower",
        "steel"
      ],
      "explain": "New cities reduce crowding."
    },
    {
      "id": "u4-3-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The New Administrative Capital is a _____.",
      "answer": "smart city",
      "accepted": [
        "smart city"
      ],
      "explain": "The New Administrative Capital is a smart city."
    },
    {
      "id": "u4-3-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: New cities _____ crowding.",
      "answer": "reduce",
      "accepted": [
        "reduce"
      ],
      "explain": "New cities reduce crowding."
    },
    {
      "id": "u4-3-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ has 80 floors.",
      "answer": "Iconic Tower",
      "accepted": [
        "Iconic Tower"
      ],
      "explain": "The Iconic Tower has 80 floors."
    },
    {
      "id": "u4-3-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The tower is made of glass and _____.",
      "answer": "steel",
      "accepted": [
        "steel"
      ],
      "explain": "The tower is made of glass and steel."
    },
    {
      "id": "u4-3-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The city uses technology to manage services.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "It is designed as a smart city."
    },
    {
      "id": "u4-3-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The Iconic Tower is made only of mud bricks.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It is made of strong glass and steel."
    },
    {
      "id": "u4-3-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The New Administrative Capital is about 45 km east of Cairo.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u4-3-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "smart city",
          "context": "The New Administrative Capital is a _____."
        },
        {
          "word": "reduce",
          "context": "New cities _____ crowding."
        },
        {
          "word": "Iconic Tower",
          "context": "The _____ has 80 floors."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u4-3-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The tower is made of glass and _____.",
      "answer": "steel",
      "accepted": [
        "steel"
      ],
      "options": [
        "steel",
        "smart city",
        "reduce",
        "Iconic Tower"
      ],
      "explain": "The tower is made of glass and steel."
    },
    {
      "id": "u4-3-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What is the Iconic Tower made of?",
      "audioText": "The New Administrative Capital is a smart city east of Cairo. The Iconic Tower has eighty floors and is made of glass and steel.",
      "answer": "glass and steel",
      "options": [
        "glass and steel",
        "wood and paper",
        "sand and cotton",
        "water and soil"
      ],
      "explain": "The text describes the tower as a glass-and-steel building."
    },
    {
      "id": "u4-3-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The New Administrative Capital is about 45 km east of Cairo. It was built to help reduce crowding in Cairo. Technology manages roads, water, energy, and other services.",
      "words": [
        "The New Administrative Capital is about 45 km east of Cairo.",
        "It was built to help reduce crowding in Cairo.",
        "Technology manages roads, water, energy, and other services."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-3-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Technology manages roads, water, energy, and other services. The city has green areas, government offices, an airport, and the Iconic Tower. The Iconic Tower is 385 meters high, has 80 floors, and is made of glass and steel.",
      "words": [
        "Technology manages roads, water, energy, and other services.",
        "The city has green areas, government offices, an airport, and the Iconic Tower.",
        "The Iconic Tower is 385 meters high, has 80 floors, and is made of glass and steel."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-3-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The New Administrative Capital is a samrt city.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The New Administrative Capital is a <mark>samrt city</mark>.</span>",
      "answer": "smart city",
      "accepted": [
        "smart city"
      ],
      "explain": "The correct lesson word is smart city."
    },
    {
      "id": "u4-3-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. New cities rdeuce crowding.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">New cities <mark>rdeuce</mark> crowding.</span>",
      "answer": "reduce",
      "accepted": [
        "reduce"
      ],
      "explain": "The correct lesson word is reduce."
    },
    {
      "id": "u4-3-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The New Administrative Capital is a smart city",
      "words": [
        "The",
        "New",
        "Administrative",
        "Capital",
        "is",
        "a",
        "smart",
        "city"
      ],
      "explain": "The New Administrative Capital is a smart city.",
      "itemMode": "word"
    },
    {
      "id": "u4-3-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "New cities reduce crowding",
      "words": [
        "New",
        "cities",
        "reduce",
        "crowding"
      ],
      "explain": "New cities reduce crowding.",
      "itemMode": "word"
    }
  ],
  "u4-4": [
    {
      "id": "u4-4-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How should a report be organized?",
      "answer": "with headings and clear paragraphs",
      "options": [
        "with headings and clear paragraphs",
        "as one confused sentence",
        "without a title",
        "with random words"
      ],
      "explain": "Clear sections help readers find information."
    },
    {
      "id": "u4-4-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which information belongs in a community report?",
      "answer": "location and important places",
      "options": [
        "location and important places",
        "only a frog's dialogue",
        "only comparative adjectives",
        "Koshari ingredients only"
      ],
      "explain": "A report describes the community and its features."
    },
    {
      "id": "u4-4-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Use _____ before writing a report.",
      "answer": "research notes",
      "accepted": [
        "research notes"
      ],
      "options": [
        "research notes",
        "main square",
        "community center",
        "restaurant"
      ],
      "explain": "Use research notes before writing a report."
    },
    {
      "id": "u4-4-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The market is in the _____.",
      "answer": "main square",
      "accepted": [
        "main square"
      ],
      "options": [
        "main square",
        "research notes",
        "community center",
        "restaurant"
      ],
      "explain": "The market is in the main square."
    },
    {
      "id": "u4-4-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Use _____ before writing a report.",
      "answer": "research notes",
      "accepted": [
        "research notes"
      ],
      "explain": "Use research notes before writing a report."
    },
    {
      "id": "u4-4-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The market is in the _____.",
      "answer": "main square",
      "accepted": [
        "main square"
      ],
      "explain": "The market is in the main square."
    },
    {
      "id": "u4-4-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Children play at the _____.",
      "answer": "community center",
      "accepted": [
        "community center"
      ],
      "explain": "Children play at the community center."
    },
    {
      "id": "u4-4-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Organize the report with _____ and clear paragraphs.",
      "answer": "headings",
      "accepted": [
        "headings"
      ],
      "explain": "Organize the report with headings and clear paragraphs."
    },
    {
      "id": "u4-4-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Research facts should come from reliable sources.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Reliable information makes the report accurate."
    },
    {
      "id": "u4-4-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A research report should copy every source word for word.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Students should select facts and explain them in their own words."
    },
    {
      "id": "u4-4-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Choose a city, village, or neighborhood to research.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u4-4-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "research notes",
          "context": "Use _____ before writing a report."
        },
        {
          "word": "main square",
          "context": "The market is in the _____."
        },
        {
          "word": "community center",
          "context": "Children play at the _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u4-4-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Organize the report with _____ and clear paragraphs.",
      "answer": "headings",
      "accepted": [
        "headings"
      ],
      "options": [
        "headings",
        "random pictures",
        "jokes",
        "recipes"
      ],
      "explain": "Organize the report with headings and clear paragraphs."
    },
    {
      "id": "u4-4-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What should research notes contain?",
      "audioText": "A community research report includes the location, important places, people, and special features. Use short research notes and organize facts under headings.",
      "answer": "short, useful facts",
      "options": [
        "short, useful facts",
        "long copied pages",
        "made-up events",
        "only jokes"
      ],
      "explain": "Research notes should record short facts that help the report."
    },
    {
      "id": "u4-4-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Choose a city, village, or neighborhood to research. Collect facts about its location, important places, people, and special features. Use short research notes instead of copying long text.",
      "words": [
        "Choose a city, village, or neighborhood to research.",
        "Collect facts about its location, important places, people, and special features.",
        "Use short research notes instead of copying long text."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-4-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Use short research notes instead of copying long text. Organize the report with headings and clear paragraphs. Add a map or image and check that each fact is reliable.",
      "words": [
        "Use short research notes instead of copying long text.",
        "Organize the report with headings and clear paragraphs.",
        "Add a map or image and check that each fact is reliable."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u4-4-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Use rseearch notes before writing a report.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Use <mark>rseearch notes</mark> before writing a report.</span>",
      "answer": "research notes",
      "accepted": [
        "research notes"
      ],
      "explain": "The correct lesson word is research notes."
    },
    {
      "id": "u4-4-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The market is in the main suqare.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The market is in the <mark>main suqare</mark>.</span>",
      "answer": "main square",
      "accepted": [
        "main square"
      ],
      "explain": "The correct lesson word is main square."
    },
    {
      "id": "u4-4-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Use research notes before writing a report",
      "words": [
        "Use",
        "research",
        "notes",
        "before",
        "writing",
        "a",
        "report"
      ],
      "explain": "Use research notes before writing a report.",
      "itemMode": "word"
    },
    {
      "id": "u4-4-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The market is in the main square",
      "words": [
        "The",
        "market",
        "is",
        "in",
        "the",
        "main",
        "square"
      ],
      "explain": "The market is in the main square.",
      "itemMode": "word"
    }
  ],
  "u5-0": [
    {
      "id": "u5-0-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Where does Egypt find gold and iron?",
      "answer": "in its deserts",
      "options": [
        "in its deserts",
        "inside coffee shops",
        "on tree branches",
        "in the Everglades"
      ],
      "explain": "Egyptian deserts contain mineral resources."
    },
    {
      "id": "u5-0-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why is land near the Nile good for farming?",
      "answer": "It is fertile.",
      "options": [
        "It is fertile.",
        "It is made of steel.",
        "It never has water.",
        "It is a theme park."
      ],
      "explain": "Fertile soil helps crops grow."
    },
    {
      "id": "u5-0-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Plants need _____ to grow.",
      "answer": "sunlight",
      "accepted": [
        "sunlight"
      ],
      "options": [
        "sunlight",
        "soil",
        "fossil fuel",
        "minerals"
      ],
      "explain": "Plants need sunlight to grow."
    },
    {
      "id": "u5-0-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Fertile _____ helps crops.",
      "answer": "soil",
      "accepted": [
        "soil"
      ],
      "options": [
        "soil",
        "sunlight",
        "fossil fuel",
        "minerals"
      ],
      "explain": "Fertile soil helps crops."
    },
    {
      "id": "u5-0-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Plants need _____ to grow.",
      "answer": "sunlight",
      "accepted": [
        "sunlight"
      ],
      "explain": "Plants need sunlight to grow."
    },
    {
      "id": "u5-0-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Fertile _____ helps crops.",
      "answer": "soil",
      "accepted": [
        "soil"
      ],
      "explain": "Fertile soil helps crops."
    },
    {
      "id": "u5-0-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Oil is a _____.",
      "answer": "fossil fuel",
      "accepted": [
        "fossil fuel"
      ],
      "explain": "Oil is a fossil fuel."
    },
    {
      "id": "u5-0-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Gold and iron are _____.",
      "answer": "minerals",
      "accepted": [
        "minerals"
      ],
      "explain": "Gold and iron are minerals."
    },
    {
      "id": "u5-0-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Natural resources support daily life.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "They provide water, food, energy, and materials."
    },
    {
      "id": "u5-0-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Egypt grows no cotton or wheat.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Both are important Egyptian crops."
    },
    {
      "id": "u5-0-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Natural resources are useful things found in nature.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u5-0-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "sunlight",
          "context": "Plants need _____ to grow."
        },
        {
          "word": "soil",
          "context": "Fertile _____ helps crops."
        },
        {
          "word": "fossil fuel",
          "context": "Oil is a _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u5-0-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Gold and iron are _____.",
      "answer": "minerals",
      "accepted": [
        "minerals"
      ],
      "options": [
        "minerals",
        "sunlight",
        "soil",
        "fossil fuel"
      ],
      "explain": "Gold and iron are minerals."
    },
    {
      "id": "u5-0-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Which resource helps farmers grow crops?",
      "audioText": "Natural resources include sunlight, water, soil, wind, minerals, cotton, and fossil fuel. Fertile soil helps farmers grow food.",
      "answer": "fertile soil",
      "options": [
        "fertile soil",
        "plastic toys",
        "traffic lights",
        "empty boxes"
      ],
      "explain": "Rich, fertile soil supports plant growth."
    },
    {
      "id": "u5-0-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Natural resources are useful things found in nature. The Nile provides water for drinking and farming. Oil and natural gas are fossil fuels used for fuel and electricity.",
      "words": [
        "Natural resources are useful things found in nature.",
        "The Nile provides water for drinking and farming.",
        "Oil and natural gas are fossil fuels used for fuel and electricity."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-0-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Oil and natural gas are fossil fuels used for fuel and electricity. Fertile land along the Nile and in the Delta grows cotton, wheat, and fruit. Egypt's deserts contain gold, iron, and other minerals used in jewelry and buildings.",
      "words": [
        "Oil and natural gas are fossil fuels used for fuel and electricity.",
        "Fertile land along the Nile and in the Delta grows cotton, wheat, and fruit.",
        "Egypt's deserts contain gold, iron, and other minerals used in jewelry and buildings."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-0-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Plants need snulight to grow.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Plants need <mark>snulight</mark> to grow.</span>",
      "answer": "sunlight",
      "accepted": [
        "sunlight"
      ],
      "explain": "The correct lesson word is sunlight."
    },
    {
      "id": "u5-0-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Fertile siol helps crops.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Fertile <mark>siol</mark> helps crops.</span>",
      "answer": "soil",
      "accepted": [
        "soil"
      ],
      "explain": "The correct lesson word is soil."
    },
    {
      "id": "u5-0-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Plants need sunlight to grow",
      "words": [
        "Plants",
        "need",
        "sunlight",
        "to",
        "grow"
      ],
      "explain": "Plants need sunlight to grow.",
      "itemMode": "word"
    },
    {
      "id": "u5-0-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Fertile soil helps crops",
      "words": [
        "Fertile",
        "soil",
        "helps",
        "crops"
      ],
      "explain": "Fertile soil helps crops.",
      "itemMode": "word"
    }
  ],
  "u5-1": [
    {
      "id": "u5-1-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why must people use minerals wisely?",
      "answer": "They take millions of years to form.",
      "options": [
        "They take millions of years to form.",
        "They grow every morning.",
        "They are all made of water.",
        "They can never be useful."
      ],
      "explain": "Their supply is limited on a human timescale."
    },
    {
      "id": "u5-1-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which material helps make cars, ships, and bridges?",
      "answer": "iron",
      "options": [
        "iron",
        "chickpeas",
        "shade",
        "cotton"
      ],
      "explain": "Iron is strong enough for heavy structures."
    },
    {
      "id": "u5-1-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: _____ is used for jewelry.",
      "answer": "Gold",
      "accepted": [
        "Gold",
        "gold"
      ],
      "options": [
        "Gold",
        "diamond",
        "copper",
        "iron"
      ],
      "explain": "Gold is used for jewelry."
    },
    {
      "id": "u5-1-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: _____ is more valuable than gold.",
      "answer": "Diamond",
      "accepted": [
        "Diamond",
        "diamond"
      ],
      "options": [
        "Diamond",
        "gold",
        "copper",
        "iron"
      ],
      "explain": "Diamond is more valuable than gold."
    },
    {
      "id": "u5-1-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: _____ is used for jewelry.",
      "answer": "Gold",
      "accepted": [
        "Gold",
        "gold"
      ],
      "explain": "Gold is used for jewelry."
    },
    {
      "id": "u5-1-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: _____ is more valuable than gold.",
      "answer": "Diamond",
      "accepted": [
        "Diamond",
        "diamond"
      ],
      "explain": "Diamond is more valuable than gold."
    },
    {
      "id": "u5-1-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: _____ carries electricity in wires.",
      "answer": "Copper",
      "accepted": [
        "Copper",
        "copper"
      ],
      "explain": "Copper carries electricity in wires."
    },
    {
      "id": "u5-1-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Ships can be made with _____.",
      "answer": "iron",
      "accepted": [
        "iron"
      ],
      "explain": "Ships can be made with iron."
    },
    {
      "id": "u5-1-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Diamond is described as more valuable than gold.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Its rarity helps make it very valuable."
    },
    {
      "id": "u5-1-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Minerals are renewable in a few days.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "They take millions of years to form."
    },
    {
      "id": "u5-1-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Gold is soft, shiny, and easy to shape into coins and jewelry.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u5-1-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "Gold",
          "context": "_____ is used for jewelry."
        },
        {
          "word": "Diamond",
          "context": "_____ is more valuable than gold."
        },
        {
          "word": "Copper",
          "context": "_____ carries electricity in wires."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u5-1-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Ships can be made with _____.",
      "answer": "iron",
      "accepted": [
        "iron"
      ],
      "options": [
        "iron",
        "gold",
        "diamond",
        "copper"
      ],
      "explain": "Ships can be made with iron."
    },
    {
      "id": "u5-1-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Why should people use metals carefully?",
      "audioText": "Gold, copper, and iron are metals that come from the Earth. They are non-renewable, so people must use them carefully.",
      "answer": "because they are non-renewable",
      "options": [
        "because they are non-renewable",
        "because they grow every night",
        "because they are made of water",
        "because they are unlimited"
      ],
      "explain": "Non-renewable resources cannot be replaced quickly."
    },
    {
      "id": "u5-1-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Gold is soft, shiny, and easy to shape into coins and jewelry. Diamond is rare and more valuable than gold. Copper is strong and useful for wires, pipes, and tools.",
      "words": [
        "Gold is soft, shiny, and easy to shape into coins and jewelry.",
        "Diamond is rare and more valuable than gold.",
        "Copper is strong and useful for wires, pipes, and tools."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-1-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Copper is strong and useful for wires, pipes, and tools. Iron is very strong and is used in cars, ships, airplanes, and bridges. Minerals take millions of years to form, so they are non-renewable and must not be wasted.",
      "words": [
        "Copper is strong and useful for wires, pipes, and tools.",
        "Iron is very strong and is used in cars, ships, airplanes, and bridges.",
        "Minerals take millions of years to form, so they are non-renewable and must not be wasted."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-1-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. Iron is more strong than gold.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">Iron is <mark>more strong</mark> than gold.</span>",
      "answer": "stronger",
      "accepted": [
        "stronger"
      ],
      "explain": "Short adjectives usually add -er."
    },
    {
      "id": "u5-1-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. Diamond is valuabler than gold.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">Diamond is <mark>valuabler</mark> than gold.</span>",
      "answer": "more valuable",
      "accepted": [
        "more valuable"
      ],
      "explain": "Use more before a long adjective."
    },
    {
      "id": "u5-1-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Gold is used for jewelry",
      "words": [
        "Gold",
        "is",
        "used",
        "for",
        "jewelry"
      ],
      "explain": "Gold is used for jewelry.",
      "itemMode": "word"
    },
    {
      "id": "u5-1-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Diamond is more valuable than gold",
      "words": [
        "Diamond",
        "is",
        "more",
        "valuable",
        "than",
        "gold"
      ],
      "explain": "Diamond is more valuable than gold.",
      "itemMode": "word"
    }
  ],
  "u5-2": [
    {
      "id": "u5-2-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How did the digger free the ship?",
      "answer": "It cleared the mud around it.",
      "options": [
        "It cleared the mud around it.",
        "It lifted the ocean.",
        "It built an airport.",
        "It asked a frog."
      ],
      "explain": "A clear path allowed the ship to float."
    },
    {
      "id": "u5-2-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What is the story's main lesson?",
      "answer": "Skill and helpful effort matter more than size.",
      "options": [
        "Skill and helpful effort matter more than size.",
        "Only big machines can help.",
        "People should give up quickly.",
        "Cargo is never valuable."
      ],
      "explain": "The little machine succeeds through effort and the right skill."
    },
    {
      "id": "u5-2-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The ship came to load _____.",
      "answer": "cargo",
      "accepted": [
        "cargo"
      ],
      "options": [
        "cargo",
        "digger",
        "give up",
        "path"
      ],
      "explain": "The ship came to load cargo."
    },
    {
      "id": "u5-2-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The little _____ cleared the mud.",
      "answer": "digger",
      "accepted": [
        "digger"
      ],
      "options": [
        "digger",
        "cargo",
        "give up",
        "path"
      ],
      "explain": "The little digger cleared the mud."
    },
    {
      "id": "u5-2-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The ship came to load _____.",
      "answer": "cargo",
      "accepted": [
        "cargo"
      ],
      "explain": "The ship came to load cargo."
    },
    {
      "id": "u5-2-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The little _____ cleared the mud.",
      "answer": "digger",
      "accepted": [
        "digger"
      ],
      "explain": "The little digger cleared the mud."
    },
    {
      "id": "u5-2-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The digger did not _____.",
      "answer": "give up",
      "accepted": [
        "give up"
      ],
      "explain": "The digger did not give up."
    },
    {
      "id": "u5-2-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The digger made a clear _____.",
      "answer": "path",
      "accepted": [
        "path"
      ],
      "explain": "The digger made a clear path."
    },
    {
      "id": "u5-2-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The big machines laughed at the little digger.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "They thought its small size meant it could not help."
    },
    {
      "id": "u5-2-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The little digger stopped trying immediately.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It worked for a long time and did not give up."
    },
    {
      "id": "u5-2-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A proud big ship came near shore to load cargo and became stuck in thick mud.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u5-2-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "cargo",
          "context": "The ship came to load _____."
        },
        {
          "word": "digger",
          "context": "The little _____ cleared the mud."
        },
        {
          "word": "give up",
          "context": "The digger did not _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u5-2-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: The digger made a clear _____.",
      "answer": "path",
      "accepted": [
        "path"
      ],
      "options": [
        "path",
        "cargo",
        "digger",
        "give up"
      ],
      "explain": "The digger made a clear path."
    },
    {
      "id": "u5-2-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What did the digger finally move?",
      "audioText": "A small digger pulled a heavy load along a thick path. It did not give up and finally moved the cargo.",
      "answer": "the cargo",
      "options": [
        "the cargo",
        "a cloud",
        "a restaurant",
        "the moon"
      ],
      "explain": "The digger kept trying until the cargo moved."
    },
    {
      "id": "u5-2-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "A proud big ship came near shore to load cargo and became stuck in thick mud. Large machines tried to help but failed and began to give up. A little digger offered help, but the big machines laughed at its size.",
      "words": [
        "A proud big ship came near shore to load cargo and became stuck in thick mud.",
        "Large machines tried to help but failed and began to give up.",
        "A little digger offered help, but the big machines laughed at its size."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-2-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "A little digger offered help, but the big machines laughed at its size. The digger patiently cleared the mud until the ship floated free. The lesson is that size does not decide value; effort, skill, and helping others matter.",
      "words": [
        "A little digger offered help, but the big machines laughed at its size.",
        "The digger patiently cleared the mud until the ship floated free.",
        "The lesson is that size does not decide value; effort, skill, and helping others matter."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-2-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The ship came to load crago.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The ship came to load <mark>crago</mark>.</span>",
      "answer": "cargo",
      "accepted": [
        "cargo"
      ],
      "explain": "The correct lesson word is cargo."
    },
    {
      "id": "u5-2-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. The little dgiger cleared the mud.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">The little <mark>dgiger</mark> cleared the mud.</span>",
      "answer": "digger",
      "accepted": [
        "digger"
      ],
      "explain": "The correct lesson word is digger."
    },
    {
      "id": "u5-2-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The ship came to load cargo",
      "words": [
        "The",
        "ship",
        "came",
        "to",
        "load",
        "cargo"
      ],
      "explain": "The ship came to load cargo.",
      "itemMode": "word"
    },
    {
      "id": "u5-2-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The little digger cleared the mud",
      "words": [
        "The",
        "little",
        "digger",
        "cleared",
        "the",
        "mud"
      ],
      "explain": "The little digger cleared the mud.",
      "itemMode": "word"
    }
  ],
  "u5-3": [
    {
      "id": "u5-3-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which pronouns fit object-perspective writing?",
      "answer": "I, me, and my",
      "options": [
        "I, me, and my",
        "only he and him",
        "only they and them",
        "no pronouns"
      ],
      "explain": "The object becomes the first-person narrator."
    },
    {
      "id": "u5-3-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What should the ending explain?",
      "answer": "why the object is important",
      "options": [
        "why the object is important",
        "only its price",
        "the student's class number",
        "a random weather event"
      ],
      "explain": "Importance gives the narrative a meaningful close."
    },
    {
      "id": "u5-3-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: I Am Water is an _____ narrative.",
      "answer": "object-perspective",
      "accepted": [
        "object-perspective"
      ],
      "options": [
        "object-perspective",
        "natural resources",
        "valuable",
        "sunlight"
      ],
      "explain": "I Am Water is an object-perspective narrative."
    },
    {
      "id": "u5-3-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Water is _____ natural resource.",
      "answer": "natural resources",
      "accepted": [
        "natural resources"
      ],
      "options": [
        "natural resources",
        "object-perspective",
        "valuable",
        "sunlight"
      ],
      "explain": "Water is natural resources natural resource."
    },
    {
      "id": "u5-3-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: I Am Water is an _____ narrative.",
      "answer": "object-perspective",
      "accepted": [
        "object-perspective"
      ],
      "explain": "I Am Water is an object-perspective narrative."
    },
    {
      "id": "u5-3-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Water is _____ natural resource.",
      "answer": "natural resources",
      "accepted": [
        "natural resources"
      ],
      "explain": "Water is natural resources natural resource."
    },
    {
      "id": "u5-3-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Clean water is _____.",
      "answer": "valuable",
      "accepted": [
        "valuable"
      ],
      "explain": "Clean water is valuable."
    },
    {
      "id": "u5-3-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Use _____ because water is the narrator.",
      "answer": "I, me, and my",
      "accepted": [
        "I, me, and my",
        "I me and my",
        "I, me and my"
      ],
      "explain": "Use I, me, and my because water is the narrator."
    },
    {
      "id": "u5-3-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Object-perspective writing builds creativity.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "It asks writers to imagine a non-human viewpoint."
    },
    {
      "id": "u5-3-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Water always has one fixed shape.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It takes the shape of its container and moves through many forms."
    },
    {
      "id": "u5-3-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The narrator is water speaking as 'I'.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u5-3-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "object-perspective",
          "context": "I Am Water is an _____ narrative."
        },
        {
          "word": "natural resources",
          "context": "Water is _____ natural resource."
        },
        {
          "word": "valuable",
          "context": "Clean water is _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u5-3-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Use _____ because water is the narrator.",
      "answer": "I, me, and my",
      "accepted": [
        "I, me, and my",
        "I me and my",
        "I, me and my"
      ],
      "options": [
        "I, me, and my",
        "he, him, and his",
        "they and them",
        "you only"
      ],
      "explain": "Use I, me, and my because water is the narrator."
    },
    {
      "id": "u5-3-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Who is speaking in the text?",
      "audioText": "I am water. I can be rain, clouds, rivers, oceans, tears, or sweat. I clean, cool, and help living things grow.",
      "answer": "water itself",
      "options": [
        "water itself",
        "a pharmacist",
        "a crocodile",
        "a baker"
      ],
      "explain": "The object-perspective text uses water as the narrator."
    },
    {
      "id": "u5-3-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The narrator is water speaking as 'I'. Water appears in glasses, rivers, clouds, rain, tears, lakes, oceans, and sweat. It can be calm or powerful; it cleans, cools, and helps living things grow.",
      "words": [
        "The narrator is water speaking as 'I'.",
        "Water appears in glasses, rivers, clouds, rain, tears, lakes, oceans, and sweat.",
        "It can be calm or powerful; it cleans, cools, and helps living things grow."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-3-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "It can be calm or powerful; it cleans, cools, and helps living things grow. It can also flood, freeze, or fall dangerously. Water has no fixed shape, yet it can shape the world.",
      "words": [
        "It can be calm or powerful; it cleans, cools, and helps living things grow.",
        "It can also flood, freeze, or fall dangerously.",
        "Water has no fixed shape, yet it can shape the world."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-3-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. I Am Water is an ojbect-perspective narrative.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">I Am Water is an <mark>ojbect-perspective</mark> narrative.</span>",
      "answer": "object-perspective",
      "accepted": [
        "object-perspective"
      ],
      "explain": "The correct lesson word is object-perspective."
    },
    {
      "id": "u5-3-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. In this lesson, we use the word natural rseources.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">In this lesson, we use the word <mark>natural rseources</mark>.</span>",
      "answer": "natural resources",
      "accepted": [
        "natural resources"
      ],
      "explain": "The correct lesson word is natural resources."
    },
    {
      "id": "u5-3-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "I Am Water is an object-perspective narrative",
      "words": [
        "I",
        "Am",
        "Water",
        "is",
        "an",
        "object-perspective",
        "narrative"
      ],
      "explain": "I Am Water is an object-perspective narrative.",
      "itemMode": "word"
    },
    {
      "id": "u5-3-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Water is a natural resource",
      "words": [
        "Water",
        "is",
        "a",
        "natural",
        "resource"
      ],
      "explain": "Water is a natural resource.",
      "itemMode": "word"
    }
  ],
  "u5-4": [
    {
      "id": "u5-4-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What should each picture have?",
      "answer": "a short explanatory caption",
      "options": [
        "a short explanatory caption",
        "a medicine label",
        "a multiplication sign only",
        "no connection to the title"
      ],
      "explain": "Captions explain the personal meaning."
    },
    {
      "id": "u5-4-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which could be part of a My Gold poster?",
      "answer": "family and trusted friends",
      "options": [
        "family and trusted friends",
        "only fossil fuels",
        "only storm damage",
        "only restaurant prices"
      ],
      "explain": "People and relationships can be personally valuable."
    },
    {
      "id": "u5-4-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: _____ is used for jewelry.",
      "answer": "Gold",
      "accepted": [
        "Gold",
        "gold"
      ],
      "options": [
        "Gold",
        "valuable",
        "sunlight",
        "soil"
      ],
      "explain": "Gold is used for jewelry."
    },
    {
      "id": "u5-4-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Clean water is _____.",
      "answer": "valuable",
      "accepted": [
        "valuable"
      ],
      "options": [
        "valuable",
        "gold",
        "sunlight",
        "soil"
      ],
      "explain": "Clean water is valuable."
    },
    {
      "id": "u5-4-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: _____ is used for jewelry.",
      "answer": "Gold",
      "accepted": [
        "Gold",
        "gold"
      ],
      "explain": "Gold is used for jewelry."
    },
    {
      "id": "u5-4-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Clean water is _____.",
      "answer": "valuable",
      "accepted": [
        "valuable"
      ],
      "explain": "Clean water is valuable."
    },
    {
      "id": "u5-4-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Each picture on the poster needs a short _____.",
      "answer": "caption",
      "accepted": [
        "caption"
      ],
      "explain": "Each picture on the poster needs a short caption."
    },
    {
      "id": "u5-4-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Family and memories can be shown as _____.",
      "answer": "gold",
      "accepted": [
        "gold"
      ],
      "explain": "Family and memories can be shown as gold."
    },
    {
      "id": "u5-4-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Something can be valuable without costing much money.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Love, friendship, and memories may be priceless."
    },
    {
      "id": "u5-4-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The poster should contain unrelated pictures with no explanation.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Every image should support the main message."
    },
    {
      "id": "u5-4-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The title of the poster is My Gold.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "u5-4-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "Gold",
          "context": "_____ is used for jewelry."
        },
        {
          "word": "valuable",
          "context": "Clean water is _____."
        },
        {
          "word": "caption",
          "context": "Each picture on the poster needs a short _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "u5-4-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Family and memories can be shown as _____.",
      "answer": "gold",
      "accepted": [
        "gold"
      ],
      "options": [
        "gold",
        "fossil fuel",
        "cargo",
        "soil"
      ],
      "explain": "Family and memories can be shown as gold."
    },
    {
      "id": "u5-4-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Why are family and memories shown as gold?",
      "audioText": "On a My Gold poster, gold is a symbol for people, memories, and values that are deeply important. Each picture needs a short caption.",
      "answer": "because they are deeply valuable",
      "options": [
        "because they are deeply valuable",
        "because they are made of metal",
        "because they are expensive to draw",
        "because they are natural disasters"
      ],
      "explain": "Gold represents personal value, not only money."
    },
    {
      "id": "u5-4-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The title of the poster is My Gold. Gold is used as a symbol for something very valuable. Students choose people, animals, experiences, or values that matter to them.",
      "words": [
        "The title of the poster is My Gold.",
        "Gold is used as a symbol for something very valuable.",
        "Students choose people, animals, experiences, or values that matter to them."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-4-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Students choose people, animals, experiences, or values that matter to them. Pictures and short captions explain each choice. The project teaches that value is not only about money.",
      "words": [
        "Students choose people, animals, experiences, or values that matter to them.",
        "Pictures and short captions explain each choice.",
        "The project teaches that value is not only about money."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "u5-4-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Glod is used for jewelry.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\"><mark>Glod</mark> is used for jewelry.</span>",
      "answer": "gold",
      "accepted": [
        "gold"
      ],
      "explain": "The correct lesson word is gold."
    },
    {
      "id": "u5-4-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Clean water is vlauable.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Clean water is <mark>vlauable</mark>.</span>",
      "answer": "valuable",
      "accepted": [
        "valuable"
      ],
      "explain": "The correct lesson word is valuable."
    },
    {
      "id": "u5-4-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Gold is used for jewelry",
      "words": [
        "Gold",
        "is",
        "used",
        "for",
        "jewelry"
      ],
      "explain": "Gold is used for jewelry.",
      "itemMode": "word"
    },
    {
      "id": "u5-4-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Clean water is valuable",
      "words": [
        "Clean",
        "water",
        "is",
        "valuable"
      ],
      "explain": "Clean water is valuable.",
      "itemMode": "word"
    }
  ],
  "story-0": [
    {
      "id": "story-0-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What did Billie's family believe?",
      "answer": "The Earth could share wisdom through nature.",
      "options": [
        "The Earth could share wisdom through nature.",
        "The swamp had no life.",
        "Science was useless.",
        "All animals could speak English."
      ],
      "explain": "They listened to wind, water, animals, and land."
    },
    {
      "id": "story-0-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Why were the elders disappointed?",
      "answer": "Billie rejected their belief without listening.",
      "options": [
        "Billie rejected their belief without listening.",
        "She lost a gold ring.",
        "She built a tower.",
        "She cooked Koshari."
      ],
      "explain": "They wanted her to understand their traditional wisdom."
    },
    {
      "id": "story-0-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Billie packed her _____.",
      "answer": "canoe",
      "accepted": [
        "canoe"
      ],
      "options": [
        "canoe",
        "Everglades",
        "scientist",
        "native"
      ],
      "explain": "Billie packed her canoe."
    },
    {
      "id": "story-0-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Billie travelled into the _____.",
      "answer": "Everglades",
      "accepted": [
        "Everglades"
      ],
      "options": [
        "Everglades",
        "canoe",
        "scientist",
        "native"
      ],
      "explain": "Billie travelled into the Everglades."
    },
    {
      "id": "story-0-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie packed her _____.",
      "answer": "canoe",
      "accepted": [
        "canoe"
      ],
      "explain": "Billie packed her canoe."
    },
    {
      "id": "story-0-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie travelled into the _____.",
      "answer": "Everglades",
      "accepted": [
        "Everglades"
      ],
      "explain": "Billie travelled into the Everglades."
    },
    {
      "id": "story-0-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie dreamed of becoming a _____.",
      "answer": "scientist",
      "accepted": [
        "scientist"
      ],
      "explain": "Billie dreamed of becoming a scientist."
    },
    {
      "id": "story-0-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie was a young _____ American girl.",
      "answer": "Native",
      "accepted": [
        "Native",
        "native"
      ],
      "explain": "Billie was a young Native American girl."
    },
    {
      "id": "story-0-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie was a young Native American girl in Florida.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This is how the story introduces her."
    },
    {
      "id": "story-0-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The elders told Billie to avoid nature completely.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "They sent her into the Everglades to observe and listen."
    },
    {
      "id": "story-0-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie Wind is a young Native American girl living in Florida.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "story-0-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "canoe",
          "context": "Billie packed her _____."
        },
        {
          "word": "Everglades",
          "context": "Billie travelled into the _____."
        },
        {
          "word": "scientist",
          "context": "Billie dreamed of becoming a _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "story-0-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Billie was a young _____ American girl.",
      "answer": "Native",
      "accepted": [
        "Native",
        "native"
      ],
      "options": [
        "Native",
        "canoe",
        "Everglades",
        "scientist"
      ],
      "explain": "Billie was a young Native American girl."
    },
    {
      "id": "story-0-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What did Billie dream of becoming?",
      "audioText": "Billie Wind wanted to become a scientist. Her family and tribal elders believed the Earth shared wisdom through nature, but Billie doubted them.",
      "answer": "a scientist",
      "options": [
        "a scientist",
        "a baker",
        "a ship captain",
        "a pharmacist"
      ],
      "explain": "Billie's interest in science shaped her dream."
    },
    {
      "id": "story-0-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Billie Wind is a young Native American girl living in Florida. She loves science and hopes to become a scientist. Her family and tribal elders believe the Earth shares wisdom through nature.",
      "words": [
        "Billie Wind is a young Native American girl living in Florida.",
        "She loves science and hopes to become a scientist.",
        "Her family and tribal elders believe the Earth shares wisdom through nature."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "story-0-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Her family and tribal elders believe the Earth shares wisdom through nature. Billie thinks this belief is only an old story. The elders are disappointed and challenge her to listen for herself.",
      "words": [
        "Her family and tribal elders believe the Earth shares wisdom through nature.",
        "Billie thinks this belief is only an old story.",
        "The elders are disappointed and challenge her to listen for herself."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "story-0-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Billie packed her cnaoe.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Billie packed her <mark>cnaoe</mark>.</span>",
      "answer": "canoe",
      "accepted": [
        "canoe"
      ],
      "explain": "The correct lesson word is canoe."
    },
    {
      "id": "story-0-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Billie travelled into the Eevrglades.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Billie travelled into the <mark>Eevrglades</mark>.</span>",
      "answer": "Everglades",
      "accepted": [
        "Everglades"
      ],
      "explain": "The correct lesson word is Everglades."
    },
    {
      "id": "story-0-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Billie packed her canoe",
      "words": [
        "Billie",
        "packed",
        "her",
        "canoe"
      ],
      "explain": "Billie packed her canoe.",
      "itemMode": "word"
    },
    {
      "id": "story-0-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Billie travelled into the Everglades",
      "words": [
        "Billie",
        "travelled",
        "into",
        "the",
        "Everglades"
      ],
      "explain": "Billie travelled into the Everglades.",
      "itemMode": "word"
    }
  ],
  "story-1": [
    {
      "id": "story-1-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What frightened Billie at night?",
      "answer": "alligators splashing and owls hooting",
      "options": [
        "alligators splashing and owls hooting",
        "city traffic and trains",
        "a school bell",
        "bakery machines"
      ],
      "explain": "The swamp's animal sounds felt strange and dangerous."
    },
    {
      "id": "story-1-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What did Billie lack at first?",
      "answer": "food, shelter, and help",
      "options": [
        "food, shelter, and help",
        "gold and diamonds only",
        "a tower and airport",
        "a menu and flyer"
      ],
      "explain": "These basic needs made survival difficult."
    },
    {
      "id": "story-1-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The Everglades is a _____.",
      "answer": "National Park",
      "accepted": [
        "National Park"
      ],
      "options": [
        "National Park",
        "swamp",
        "splash",
        "owl"
      ],
      "explain": "The Everglades is a National Park."
    },
    {
      "id": "story-1-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: The _____ was full of strange sounds.",
      "answer": "swamp",
      "accepted": [
        "swamp"
      ],
      "options": [
        "swamp",
        "National Park",
        "splash",
        "owl"
      ],
      "explain": "The swamp was full of strange sounds."
    },
    {
      "id": "story-1-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The Everglades is a _____.",
      "answer": "National Park",
      "accepted": [
        "National Park"
      ],
      "explain": "The Everglades is a National Park."
    },
    {
      "id": "story-1-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: The _____ was full of strange sounds.",
      "answer": "swamp",
      "accepted": [
        "swamp"
      ],
      "explain": "The swamp was full of strange sounds."
    },
    {
      "id": "story-1-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Alligators _____ in the water.",
      "answer": "splashed",
      "accepted": [
        "splashed",
        "splash"
      ],
      "explain": "Alligators splashed in the water."
    },
    {
      "id": "story-1-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie heard an _____ hoot.",
      "answer": "owl",
      "accepted": [
        "owl"
      ],
      "explain": "Billie heard an owl hoot."
    },
    {
      "id": "story-1-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie felt safe and comfortable from the first minute.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "At first, she was afraid and struggled."
    },
    {
      "id": "story-1-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie travelled by canoe.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "She packed a canoe for the wetland journey."
    },
    {
      "id": "story-1-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The elders tell Billie to go alone into Everglades National Park.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "story-1-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "National Park",
          "context": "The Everglades is a _____."
        },
        {
          "word": "swamp",
          "context": "The _____ was full of strange sounds."
        },
        {
          "word": "splashed",
          "context": "Alligators _____ in the water."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "story-1-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Billie heard an _____ hoot.",
      "answer": "owl",
      "accepted": [
        "owl"
      ],
      "options": [
        "owl",
        "National Park",
        "swamp",
        "splash"
      ],
      "explain": "Billie heard an owl hoot."
    },
    {
      "id": "story-1-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What frightened Billie at night?",
      "audioText": "Billie packed her canoe and entered the Everglades alone. At night, alligators splashed and owls hooted, and she felt afraid.",
      "answer": "alligators splashing and owls hooting",
      "options": [
        "alligators splashing and owls hooting",
        "city traffic",
        "a school bell",
        "bakery machines"
      ],
      "explain": "The unfamiliar animal sounds made the swamp feel frightening."
    },
    {
      "id": "story-1-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "The elders tell Billie to go alone into Everglades National Park. She packs her canoe even though she does not want to go. At first, she has no shelter, food, or helper and struggles to survive.",
      "words": [
        "The elders tell Billie to go alone into Everglades National Park.",
        "She packs her canoe even though she does not want to go.",
        "At first, she has no shelter, food, or helper and struggles to survive."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "story-1-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "At first, she has no shelter, food, or helper and struggles to survive. The swamp is full of unfamiliar sounds that make her afraid. At night, she hears alligators splashing and owls hooting and wishes she were home.",
      "words": [
        "At first, she has no shelter, food, or helper and struggles to survive.",
        "The swamp is full of unfamiliar sounds that make her afraid.",
        "At night, she hears alligators splashing and owls hooting and wishes she were home."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "story-1-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. Billie go into the Everglades.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">Billie <mark>go</mark> into the Everglades.</span>",
      "answer": "went",
      "accepted": [
        "went"
      ],
      "explain": "Use the past simple for a finished story event."
    },
    {
      "id": "story-1-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted word or phrase. She heared an owl at night.",
      "promptHtml": "Correct the highlighted word or phrase.<br><span class=\"correction-sentence\">She <mark>heared</mark> an owl at night.</span>",
      "answer": "heard",
      "accepted": [
        "heard"
      ],
      "explain": "Heard is the irregular past form of hear."
    },
    {
      "id": "story-1-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The Everglades is a National Park",
      "words": [
        "The",
        "Everglades",
        "is",
        "a",
        "National",
        "Park"
      ],
      "explain": "The Everglades is a National Park.",
      "itemMode": "word"
    },
    {
      "id": "story-1-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "The swamp was full of strange sounds",
      "words": [
        "The",
        "swamp",
        "was",
        "full",
        "of",
        "strange",
        "sounds"
      ],
      "explain": "The swamp was full of strange sounds.",
      "itemMode": "word"
    }
  ],
  "story-2": [
    {
      "id": "story-2-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What did turtles do when danger was near?",
      "answer": "They hid in their shells.",
      "options": [
        "They hid in their shells.",
        "They flew away.",
        "They made a fire.",
        "They loaded cargo."
      ],
      "explain": "A shell is protective shelter."
    },
    {
      "id": "story-2-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How did birds help one another?",
      "answer": "They gave warnings about danger.",
      "options": [
        "They gave warnings about danger.",
        "They built roads.",
        "They carried fossil fuel.",
        "They stopped the wind."
      ],
      "explain": "Warning calls protected the group."
    },
    {
      "id": "story-2-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: _____ splashed in the swamp.",
      "answer": "Alligators",
      "accepted": [
        "Alligators",
        "alligator"
      ],
      "options": [
        "Alligators",
        "shell",
        "attack",
        "survive"
      ],
      "explain": "Alligators splashed in the swamp."
    },
    {
      "id": "story-2-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Turtles hid inside their _____.",
      "answer": "shells",
      "accepted": [
        "shells",
        "shell"
      ],
      "options": [
        "shells",
        "alligator",
        "attack",
        "survive"
      ],
      "explain": "Turtles hid inside their shells."
    },
    {
      "id": "story-2-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: _____ splashed in the swamp.",
      "answer": "Alligators",
      "accepted": [
        "Alligators",
        "alligator"
      ],
      "explain": "Alligators splashed in the swamp."
    },
    {
      "id": "story-2-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Turtles hid inside their _____.",
      "answer": "shells",
      "accepted": [
        "shells",
        "shell"
      ],
      "explain": "Turtles hid inside their shells."
    },
    {
      "id": "story-2-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Birds warned each other about an _____.",
      "answer": "attack",
      "accepted": [
        "attack"
      ],
      "explain": "Birds warned each other about an attack."
    },
    {
      "id": "story-2-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Animals taught Billie how to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "explain": "Animals taught Billie how to survive."
    },
    {
      "id": "story-2-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie learned survival skills by carefully watching animals.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Observation helped her find food, fire, and shelter."
    },
    {
      "id": "story-2-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Nature taught Billie by writing English sentences in the sky.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "It communicated through sounds, movement, and changes."
    },
    {
      "id": "story-2-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie watches alligators wait patiently instead of wasting energy.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "story-2-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "Alligators",
          "context": "_____ splashed in the swamp."
        },
        {
          "word": "shells",
          "context": "Turtles hid inside their _____."
        },
        {
          "word": "attack",
          "context": "Birds warned each other about an _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "story-2-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Animals taught Billie how to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "options": [
        "survive",
        "alligator",
        "shell",
        "attack"
      ],
      "explain": "Animals taught Billie how to survive."
    },
    {
      "id": "story-2-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "What did turtles do when danger was near?",
      "audioText": "Billie watched alligators wait patiently, turtles hide in their shells, and birds warn one another. She learned survival skills by observing them.",
      "answer": "They hid in their shells.",
      "options": [
        "They hid in their shells.",
        "They flew away.",
        "They made a fire.",
        "They loaded cargo."
      ],
      "explain": "The shell protected the turtles."
    },
    {
      "id": "story-2-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Billie watches alligators wait patiently instead of wasting energy. She sees turtles use shells for protection. Birds warn one another when danger approaches.",
      "words": [
        "Billie watches alligators wait patiently instead of wasting energy.",
        "She sees turtles use shells for protection.",
        "Birds warn one another when danger approaches."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "story-2-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Birds warn one another when danger approaches. By observing these behaviors, she learns to catch fish, make a fire, and find shelter. She begins to understand that nature teaches through actions, patterns, and connections.",
      "words": [
        "Birds warn one another when danger approaches.",
        "By observing these behaviors, she learns to catch fish, make a fire, and find shelter.",
        "She begins to understand that nature teaches through actions, patterns, and connections."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "story-2-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Alligatorxs splashed in the swamp.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\"><mark>Alligatorx</mark>s splashed in the swamp.</span>",
      "answer": "alligator",
      "accepted": [
        "alligator"
      ],
      "explain": "The correct lesson word is alligator."
    },
    {
      "id": "story-2-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Turtles hid inside their sehlls.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Turtles hid inside their <mark>sehll</mark>s.</span>",
      "answer": "shell",
      "accepted": [
        "shell"
      ],
      "explain": "The correct lesson word is shell."
    },
    {
      "id": "story-2-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Alligators splashed in the swamp",
      "words": [
        "Alligators",
        "splashed",
        "in",
        "the",
        "swamp"
      ],
      "explain": "Alligators splashed in the swamp.",
      "itemMode": "word"
    },
    {
      "id": "story-2-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Turtles hid inside their shells",
      "words": [
        "Turtles",
        "hid",
        "inside",
        "their",
        "shells"
      ],
      "explain": "Turtles hid inside their shells.",
      "itemMode": "word"
    }
  ],
  "story-3": [
    {
      "id": "story-3-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "How did the Earth 'talk'?",
      "answer": "through wind, animals, sounds, and land changes",
      "options": [
        "through wind, animals, sounds, and land changes",
        "through a mobile phone",
        "through written homework",
        "through a restaurant flyer"
      ],
      "explain": "The phrase is a metaphor for reading natural signs."
    },
    {
      "id": "story-3-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "What can break nature's balance?",
      "answer": "people failing to care for it",
      "options": [
        "people failing to care for it",
        "careful observation",
        "protecting habitats",
        "using resources wisely"
      ],
      "explain": "Harm to connected systems affects many living things."
    },
    {
      "id": "story-3-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Her family believed nature shared _____.",
      "answer": "wisdom",
      "accepted": [
        "wisdom"
      ],
      "options": [
        "wisdom",
        "the wild",
        "connected",
        "survive"
      ],
      "explain": "Her family believed nature shared wisdom."
    },
    {
      "id": "story-3-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Billie spent many days in _____.",
      "answer": "the wild",
      "accepted": [
        "the wild"
      ],
      "options": [
        "the wild",
        "wisdom",
        "connected",
        "survive"
      ],
      "explain": "Billie spent many days in the wild."
    },
    {
      "id": "story-3-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Her family believed nature shared _____.",
      "answer": "wisdom",
      "accepted": [
        "wisdom"
      ],
      "explain": "Her family believed nature shared wisdom."
    },
    {
      "id": "story-3-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie spent many days in _____.",
      "answer": "the wild",
      "accepted": [
        "the wild"
      ],
      "explain": "Billie spent many days in the wild."
    },
    {
      "id": "story-3-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Everything in nature is _____.",
      "answer": "connected",
      "accepted": [
        "connected"
      ],
      "explain": "Everything in nature is connected."
    },
    {
      "id": "story-3-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Animals taught Billie how to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "explain": "Animals taught Billie how to survive."
    },
    {
      "id": "story-3-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Billie's scientific curiosity helped her observe nature.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "The story connects science and traditional knowledge."
    },
    {
      "id": "story-3-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "The story says every part of nature is completely separate.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Its central idea is connection."
    },
    {
      "id": "story-3-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "After many days, Billie is no longer afraid of the wild.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "story-3-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "wisdom",
          "context": "Her family believed nature shared _____."
        },
        {
          "word": "the wild",
          "context": "Billie spent many days in _____."
        },
        {
          "word": "connected",
          "context": "Everything in nature is _____."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "story-3-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Animals taught Billie how to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "options": [
        "survive",
        "wisdom",
        "the wild",
        "connected"
      ],
      "explain": "Animals taught Billie how to survive."
    },
    {
      "id": "story-3-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "How did the Earth talk to Billie?",
      "audioText": "Billie understood that the Earth talks through wind, animal movements, sounds, and changes in the land. Everything in nature is connected.",
      "answer": "through wind, animals, sounds, and land changes",
      "options": [
        "through wind, animals, sounds, and land changes",
        "through a mobile phone",
        "through homework sheets",
        "through a restaurant flyer"
      ],
      "explain": "Billie learned to read natural signs."
    },
    {
      "id": "story-3-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "After many days, Billie is no longer afraid of the wild. She has learned both practical survival and careful listening. She realizes that the Earth talks through wind, animal movements, sounds, and changes in the land.",
      "words": [
        "After many days, Billie is no longer afraid of the wild.",
        "She has learned both practical survival and careful listening.",
        "She realizes that the Earth talks through wind, animal movements, sounds, and changes in the land."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "story-3-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "She realizes that the Earth talks through wind, animal movements, sounds, and changes in the land. Nature is connected; harming one part can break the balance. Billie now connects scientific observation with the elders' wisdom.",
      "words": [
        "She realizes that the Earth talks through wind, animal movements, sounds, and changes in the land.",
        "Nature is connected; harming one part can break the balance.",
        "Billie now connects scientific observation with the elders' wisdom."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "story-3-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Her family believed nature shared wsidom.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Her family believed nature shared <mark>wsidom</mark>.</span>",
      "answer": "wisdom",
      "accepted": [
        "wisdom"
      ],
      "explain": "The correct lesson word is wisdom."
    },
    {
      "id": "story-3-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Billie spent many days in the wlid.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Billie spent many days in <mark>the wlid</mark>.</span>",
      "answer": "the wild",
      "accepted": [
        "the wild"
      ],
      "explain": "The correct lesson word is the wild."
    },
    {
      "id": "story-3-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Her family believed nature shared wisdom",
      "words": [
        "Her",
        "family",
        "believed",
        "nature",
        "shared",
        "wisdom"
      ],
      "explain": "Her family believed nature shared wisdom.",
      "itemMode": "word"
    },
    {
      "id": "story-3-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Billie spent many days in the wild",
      "words": [
        "Billie",
        "spent",
        "many",
        "days",
        "in",
        "the",
        "wild"
      ],
      "explain": "Billie spent many days in the wild.",
      "itemMode": "word"
    }
  ],
  "story-4": [
    {
      "id": "story-4-choose-1",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which event belongs in the middle?",
      "answer": "Billie learns survival skills from animals.",
      "options": [
        "Billie learns survival skills from animals.",
        "The title is printed.",
        "She has already returned home.",
        "The glossary ends."
      ],
      "explain": "Her learning forms the middle development."
    },
    {
      "id": "story-4-choose-2",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Which sentence best retells the ending in first person?",
      "answer": "I understood that nature spoke through signs and connections.",
      "options": [
        "I understood that nature spoke through signs and connections.",
        "Billie understand nature yesterday.",
        "You will buy a canoe.",
        "They are a restaurant."
      ],
      "explain": "The sentence uses first person and past tense."
    },
    {
      "id": "story-4-choose-3",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Billie packed her _____.",
      "answer": "canoe",
      "accepted": [
        "canoe"
      ],
      "options": [
        "canoe",
        "Everglades",
        "struggle",
        "survive"
      ],
      "explain": "Billie packed her canoe."
    },
    {
      "id": "story-4-choose-4",
      "type": "mcq",
      "group": "choose",
      "typeLabel": "Choose",
      "prompt": "Choose the word or phrase that completes the sentence: Billie travelled into the _____.",
      "answer": "Everglades",
      "accepted": [
        "Everglades"
      ],
      "options": [
        "Everglades",
        "canoe",
        "struggle",
        "survive"
      ],
      "explain": "Billie travelled into the Everglades."
    },
    {
      "id": "story-4-complete-1",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie packed her _____.",
      "answer": "canoe",
      "accepted": [
        "canoe"
      ],
      "explain": "Billie packed her canoe."
    },
    {
      "id": "story-4-complete-2",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Billie travelled into the _____.",
      "answer": "Everglades",
      "accepted": [
        "Everglades"
      ],
      "explain": "Billie travelled into the Everglades."
    },
    {
      "id": "story-4-complete-3",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: At first, Billie _____ in the wild.",
      "answer": "struggled",
      "accepted": [
        "struggled",
        "struggle"
      ],
      "explain": "At first, Billie struggled in the wild."
    },
    {
      "id": "story-4-complete-4",
      "type": "complete",
      "group": "complete",
      "typeLabel": "Complete",
      "prompt": "Complete the sentence: Animals taught Billie how to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "explain": "Animals taught Billie how to survive."
    },
    {
      "id": "story-4-tf-1",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A strong retelling includes beginning, middle, and end.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "Sequence helps show Billie's change."
    },
    {
      "id": "story-4-tf-2",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "A retelling from Billie's perspective should use only 'he'.",
      "answer": "False",
      "options": [
        "True",
        "False"
      ],
      "explain": "Billie would use I, me, and my."
    },
    {
      "id": "story-4-tf-3",
      "type": "mcq",
      "group": "truefalse",
      "typeLabel": "True / False",
      "prompt": "Beginning: Billie does not believe the Earth can talk.",
      "answer": "True",
      "options": [
        "True",
        "False"
      ],
      "explain": "This sentence is stated in the lesson."
    },
    {
      "id": "story-4-matching-1",
      "type": "matching",
      "group": "matching",
      "typeLabel": "Matching",
      "prompt": "Match each word or phrase to the sentence where it belongs.",
      "pairs": [
        {
          "word": "canoe",
          "context": "Billie packed her _____."
        },
        {
          "word": "Everglades",
          "context": "Billie travelled into the _____."
        },
        {
          "word": "struggled",
          "context": "At first, Billie _____ in the wild."
        }
      ],
      "explain": "Each answer is used in a real sentence from this lesson."
    },
    {
      "id": "story-4-dragdrop-1",
      "type": "dragdrop",
      "group": "dragdrop",
      "typeLabel": "Drag & Drop",
      "prompt": "Drag the correct answer into the gap: Animals taught Billie how to _____.",
      "answer": "survive",
      "accepted": [
        "survive"
      ],
      "options": [
        "survive",
        "canoe",
        "Everglades",
        "struggle"
      ],
      "explain": "Animals taught Billie how to survive."
    },
    {
      "id": "story-4-listening-1",
      "type": "listening",
      "group": "listening",
      "typeLabel": "Listening",
      "prompt": "Which event belongs in the middle of the retelling?",
      "audioText": "At the beginning, Billie doubted the elders. In the middle, she learned survival skills from animals. At the end, she understood nature's language.",
      "answer": "Billie learns survival skills from animals.",
      "options": [
        "Billie learns survival skills from animals.",
        "The title is printed.",
        "Billie has not started the journey.",
        "The glossary ends."
      ],
      "explain": "Her learning from animals develops the middle of the story."
    },
    {
      "id": "story-4-ordering-1",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Put these lesson ideas in the order used in the text.",
      "answer": "Beginning: Billie does not believe the Earth can talk. Challenge: The elders send her alone into the Everglades. Middle: Fear and lack of food or shelter make her struggle.",
      "words": [
        "Beginning: Billie does not believe the Earth can talk.",
        "Challenge: The elders send her alone into the Everglades.",
        "Middle: Fear and lack of food or shelter make her struggle."
      ],
      "explain": "The lesson develops the ideas in this order.",
      "itemMode": "sentence"
    },
    {
      "id": "story-4-ordering-2",
      "type": "builder",
      "group": "ordering",
      "typeLabel": "Ordering",
      "prompt": "Arrange the final ideas in the correct sequence.",
      "answer": "Middle: Fear and lack of food or shelter make her struggle. Learning: Animals show her patience, protection, warning, and survival. End: Billie understands nature's language and the importance of balance.",
      "words": [
        "Middle: Fear and lack of food or shelter make her struggle.",
        "Learning: Animals show her patience, protection, warning, and survival.",
        "End: Billie understands nature's language and the importance of balance."
      ],
      "explain": "This is the correct sequence of the final lesson ideas.",
      "itemMode": "sentence"
    },
    {
      "id": "story-4-correction-1",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Billie packed her cnaoe.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Billie packed her <mark>cnaoe</mark>.</span>",
      "answer": "canoe",
      "accepted": [
        "canoe"
      ],
      "explain": "The correct lesson word is canoe."
    },
    {
      "id": "story-4-correction-2",
      "type": "correction",
      "group": "correction",
      "typeLabel": "Correction",
      "prompt": "Correct the highlighted spelling in the sentence. Billie travelled into the Eevrglades.",
      "promptHtml": "Correct the highlighted spelling in the sentence.<br><span class=\"correction-sentence\">Billie travelled into the <mark>Eevrglades</mark>.</span>",
      "answer": "Everglades",
      "accepted": [
        "Everglades"
      ],
      "explain": "The correct lesson word is Everglades."
    },
    {
      "id": "story-4-builder-1",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Billie packed her canoe",
      "words": [
        "Billie",
        "packed",
        "her",
        "canoe"
      ],
      "explain": "Billie packed her canoe.",
      "itemMode": "word"
    },
    {
      "id": "story-4-builder-2",
      "type": "builder",
      "group": "builder",
      "typeLabel": "Sentence Builder",
      "prompt": "Build the correct sentence using all the words.",
      "answer": "Billie travelled into the Everglades",
      "words": [
        "Billie",
        "travelled",
        "into",
        "the",
        "Everglades"
      ],
      "explain": "Billie travelled into the Everglades.",
      "itemMode": "word"
    }
  ]
};

export function cloneLessonQuestions(unitId, lessonIndex) {
  const key = `${unitId}-${lessonIndex}`;
  return (lessonQuestionBanks[key] || []).map(question =>
    JSON.parse(JSON.stringify(question))
  );
}
