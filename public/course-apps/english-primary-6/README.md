# English Primary 6 – Term 1

A complete static interactive learning website prepared and designed by **Mr.Mohamed Farid**.

## Included

- 6 complete units and 30 lesson stations.
- 240 lesson and unit-review activities.
- 6 dedicated unit question banks with 30 questions each.
- 420 total scored activities.
- Vocabulary in context, grammar, reading, listening, writing, pronunciation, correction, matching, true/false, word ordering, and sentence ordering.
- Wrong-answer feedback with the correct answer and grammar explanation when needed.
- Points, progress percentages, badges, finished status, saved writing, and automatic local progress saving.
- High-resolution 3D cinematic cover artwork for the main screen and every unit.
- Responsive desktop, tablet, and mobile layout.
- Browser speech playback for vocabulary and listening scripts.
- Offline-ready service worker when hosted through HTTPS or localhost.
- English-only interface and content.

## Run locally

Open `index.html` directly, or serve the folder with a simple local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Upload every file and folder to the repository root.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select the main branch and root folder.

## Main files

- `index.html` – website shell
- `styles.css` – responsive visual design
- `data.js` – lesson content and lesson practice
- `banks.js` – six unit question banks
- `app.js` – navigation, scoring, matching, correction, ordering, saving, and feedback
- `assets/covers/` – high-resolution cover artwork
- `manifest.json` and `sw.js` – install/offline support

## Detailed lesson explanations update

Every one of the 30 lessons now contains a full teaching sequence rather than a short summary:

- Four clear learning objectives.
- Vocabulary meanings, natural lesson-based examples, and text-to-speech buttons.
- Multiple detailed explanation paragraphs.
- A full grammar and language workshop with use, forms, examples, signal words, and common mistakes.
- A point-by-point reading/listening guide.
- Pronunciation and speaking guidance.
- A detailed writing workshop with ordered steps, useful language, a model structure, a writing area, and a checklist.
- A final key-points review before practice.

All lesson content remains English-only and suitable for Primary 6 learners.
