# Quality Assurance Report

## Coverage

- Interactive pages: 66
- Printed source pages: 4–69
- Chapters / sections: 9
- Interactive activities: 147
- Original page reference images present: 66 / 66

## Activity counts

- Look and Write: 18
- Fill from Word Bank: 21
- Listen and Choose: 8
- Listen and Missing Letter: 13
- Reorder: 27
- Unscramble: 7
- Choose: 8
- Picture Choice: 1
- Match: 6
- Count: 3
- Write a Sentence: 13
- Free Writing: 8
- Punctuation: 3
- Short Answer: 5
- Drawing: 4
- Classification: 1
- True / False: 1

## Validation completed

- `app.js` passed JavaScript syntax validation.
- `book-data.js` was parsed successfully.
- All 66 pages were rendered sequentially in a headless Chromium test.
- Every page rendered at least one activity card.
- No unsupported activity-type messages appeared.
- No JavaScript page errors occurred during the complete page loop.
- No `<img>` elements appear inside the interactive activity area.
- All original printed-page images are restricted to the separate reference view.
- Picture-choice labels are visually hidden and do not reveal the answer.
- Picture selection and correct-answer highlighting were tested.
- Word-bank click-to-blank interaction was tested.
- Desktop, tablet, and mobile layouts were checked for horizontal overflow.

## Responsive checks

- Mobile width: no horizontal overflow.
- Tablet width: no horizontal overflow.
- Desktop width: no horizontal overflow.
