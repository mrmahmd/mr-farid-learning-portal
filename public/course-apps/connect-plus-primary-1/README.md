# Connect Plus Primary 1 – Term 1

A complete responsive interactive learning website built for the Egyptian **Connect Plus Primary 1 – Term 1** curriculum.

## Included

- Opening splash screen with student-name setup.
- Main dashboard with **Theme 1** and **Theme 2**.
- Six unit screens with original high-resolution 3D cover images.
- Vocabulary, language patterns, reading, phonics, values, projects, and unit challenges.
- Review 1, Review 2, *Homes Around the World*, and *The Little Red Hen*.
- 265 direct, child-friendly interactive questions.
- MCQ, True/False, fill-in, word ordering, and matching activities.
- Points, automatic local saving, best scores, continue button, and sequential unit unlocking.
- Wrong-answer correction with a **Got it** step.
- Browser text-to-speech buttons for words and sentences.
- Responsive desktop, tablet, and mobile design.
- PWA/offline caching support.

## Image handling

All supplied PNG cover files are kept at their original resolution. The website uses `<img>` elements with `object-fit: contain`, so the important image content is not stretched or cropped.

## Run locally

The simplest method:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Do not open `index.html` directly if you want the offline service worker to work.

## Teacher preview

Open the site with:

```text
?preview=1
```

or enable **Teacher preview** from the student menu. This temporarily unlocks every unit for testing.

## Main project structure

```text
connect-plus-primary1-app/
├── index.html
├── css/styles.css
├── js/data.js
├── js/app.js
├── assets/images/
├── assets/icons/
├── manifest.webmanifest
└── service-worker.js
```

## Saving and future database connection

The current build saves student progress in the browser using `localStorage`. The data and UI are separated, so authentication and Supabase synchronization can be added later without redesigning the curriculum screens.

Prepared and Designed by: **Mr.Mohamed Farid**
