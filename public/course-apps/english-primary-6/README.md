# English Primary 6 – Term 1

A complete static interactive learning website prepared and designed by **Mr.Mohamed Farid**.

## Included

- 6 complete units and 30 detailed lesson stations.
- Exactly 30 varied questions in every lesson: **900 lesson questions**.
- Exactly 50 varied questions in every unit question bank: **300 bank questions**.
- **1,200 scored questions and activities in total**.
- Vocabulary tested in meaningful lesson sentences and situations, not dictionary-style definition questions.
- Multiple choice, complete, single-word correction, drag and drop, matching, true/false, word ordering, sentence ordering, listening, and guided writing practice.
- Single-word correction: one wrong word is highlighted in red and the student writes only its correct form.
- Questions grouped by type inside every lesson and unit bank.
- Wrong-answer feedback with the correct answer and a short explanation.
- Points, progress percentages, badges, finished status, saved writing, automatic local progress saving, and cloud synchronisation when opened through Mr.Farid Learning Portal.
- High-resolution 3D cinematic cover artwork for the main screen and every unit.
- Responsive desktop, tablet, and mobile layout.
- Mouse drag-and-drop plus tap-to-place support for touch devices.
- Browser speech playback for vocabulary and listening scripts.
- Offline-ready service worker when hosted through HTTPS or localhost.
- English-only interface and content.

## Exact lesson question mix

Every lesson has:

- 8 Choose
- 5 Complete
- 4 Correct the highlighted word
- 4 Order the words
- 2 Order the sentences
- 2 Drag and Drop
- 2 Match
- 2 True / False
- 1 Listening

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
- `data.js` – detailed lesson content
- `banks.js` – original unit bank source content
- `question-upgrade.js` – 30-question lesson sets and 50-question unit banks
- `app.js` – navigation, scoring, drag and drop, matching, correction, ordering, saving, and feedback
- `assets/covers/` – high-resolution cover artwork
- `manifest.json` and `sw.js` – install/offline support
- `QUESTION_SYSTEM_UPGRADE_REPORT.md` – question totals, mix, and validation record

## Detailed lesson explanations

Every one of the 30 lessons contains a full teaching sequence rather than a short summary:

- Clear learning objectives.
- Vocabulary meanings, natural lesson-based examples, and text-to-speech buttons.
- Detailed explanation paragraphs.
- A grammar and language workshop with use, forms, examples, signal words, and common mistakes.
- A point-by-point reading/listening guide.
- Pronunciation and speaking guidance.
- A detailed writing workshop with ordered steps, useful language, a model structure, a writing area, and a checklist.
- A final key-points review before practice.

## Complete Fixed Build

This package is build **2026.07.29.3**. It includes the repaired interactive controls, a runtime data-integrity layer, cache-safe updates, and the included QA reports.

When replacing an older hosted version, upload **all files together**, including `qa-fixes.js` and `sw.js`. Then refresh the site once. The new service worker removes the older cached build automatically.
