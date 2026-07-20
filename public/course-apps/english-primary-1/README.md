# English Primary 1 – Term 1 Interactive Website

Complete data-driven educational website based on the Egyptian Ministry curriculum for 2025/2026.

## Included
- 6 units, 24 lessons, Review 1 and Review 2.
- 25 short questions per lesson.
- 30 questions per unit challenge.
- 40 questions per review challenge.
- Vocabulary flashcards with pronunciation.
- Language in Use, verbs, dialogues/readings where relevant.
- Phonics audio files and touch/mouse letter tracing.
- XP, stars, coins, levels, badges and sequential unlocking.
- Saves progress separately for each `studentId`.
- No login page.
- Responsive and installable as a PWA.

## Platform integration
Open the website with query parameters:
```
?studentId=123&studentName=Mohamed&className=1A
```
Or call:
```js
Primary1App.setStudent({ id: '123', name: 'Mohamed', className: '1A' });
```

## Local test
```bash
python -m http.server 8765
```
Then open `http://localhost:8765`.

## Author
Prepared and Designed by: Mr.Mohamed Farid
