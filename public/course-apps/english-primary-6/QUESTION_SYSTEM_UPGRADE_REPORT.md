# Question System Upgrade Report

## Scope

The assessment layer for **English Primary 6 – Term 1** was rebuilt after reviewing the six units, thirty lessons, grammar targets, reading texts, writing tasks, vocabulary sets, stories, and projects already mapped from the ministry book.

## Exact question totals

- **30 lessons × 30 questions = 900 lesson questions**
- **6 unit banks × 50 questions = 300 unit-bank questions**
- **Total scored questions = 1,200**

## Fixed lesson mix

Every lesson contains exactly:

- 8 multiple-choice questions
- 5 complete questions
- 4 single-word grammar correction questions
- 4 word-order questions
- 2 sentence-order questions
- 2 drag-and-drop classification questions
- 2 matching questions
- 2 true/false questions
- 1 listening question

The questions are grouped by type inside the practice flow rather than shown randomly.

## Unit question bank mix

Every unit contains exactly 50 questions, including:

- vocabulary and grammar multiple choice
- complete questions
- single-word correction
- drag and drop
- word ordering
- sentence ordering
- matching
- reading and true/false
- listening

## Correction behavior

- Exactly one wrong word is highlighted in red.
- The student writes only the corrected word.
- The app rejects an empty response.
- A wrong response shows the correct word and an explanation.
- The student must press **Got It** before continuing.

## Drag-and-drop behavior

- Every lesson has two lesson-specific drag-and-drop tasks.
- Cards can be dragged with a mouse.
- On touch devices, the student can tap a card and then tap its target group.
- A reset control returns all cards to the source area.
- The answer is checked only when every card has been placed.

## Quality controls completed

- JavaScript syntax checks passed.
- Every one of the 30 lessons contains exactly 30 questions.
- Every one of the 6 unit banks contains exactly 50 questions.
- Every correction prompt contains one highlighted wrong word.
- Every correction answer contains one word only.
- No duplicate prompt exists inside the same lesson.
- All drag-and-drop questions contain at least two populated groups.
- Question totals and type distributions were audited programmatically.

## Files changed or added

- `question-upgrade.js` — lesson and unit-bank question expansion and lesson-specific drag-and-drop sets
- `app.js` — drag-and-drop interaction, checking, grouping, and answer display
- `styles.css` — drag-and-drop cards and target-group styling
- `index.html` — loads the question upgrade before the application engine
- `sw.js` — caches the new assessment file for offline use
- `README.md` — updated totals and project documentation
