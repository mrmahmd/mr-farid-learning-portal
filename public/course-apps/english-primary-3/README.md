# English Primary 3 – Term 1

A complete responsive educational website designed for use inside an external learning platform or as an independent GitHub Pages website.

## What is included

- 6 curriculum units and 23 lessons.
- Separate learning stations for Vocabulary, Language Notes, Important Verbs, Grammar, Phonics, Reading/Dialogues and Lesson Challenges.
- 30 automatically prepared, deterministic questions for every lesson.
- 50 questions for every unit challenge.
- 60 questions in each Review challenge.
- Multiple choice, true/false, fill, reorder and matching question types.
- Points, stars, coins, levels and badges.
- Sequential lesson and unit unlocking.
- Auto-save by `studentId` in `localStorage`.
- Saves the last page and last challenge question.
- Responsive design for laptop, tablet and mobile.
- No login page inside the website.
- Offline/PWA support through a service worker.

## Run locally

Use a local web server. Do not open the file directly if you want the service worker to work.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## GitHub Pages

1. Upload the complete contents of this folder to the repository root.
2. In GitHub: **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select the main branch and `/root`.
5. Save and wait for the published URL.

## Platform student integration

The website does not display a login form. It accepts the student context in any of these ways.

### URL query parameters

```text
index.html?studentId=123&studentName=Ahmed&className=3A#home
```

### JavaScript API

```javascript
window.Primary3App.setStudent({
  studentId: '123',
  studentName: 'Ahmed',
  className: '3A'
});
```

### iframe postMessage

```javascript
iframe.contentWindow.postMessage({
  type: 'PLATFORM_STUDENT',
  student: {
    studentId: '123',
    studentName: 'Ahmed',
    className: '3A'
  }
}, '*');
```

The child website posts progress back to the parent page with the event type:

```text
PRIMARY3_PROGRESS
```

## Teacher preview

To inspect every unit and lesson without completing the sequence, add:

```text
?unlockAll=1
```

Example:

```text
http://localhost:8000/?unlockAll=1#home
```

## Main files

```text
index.html
css/style.css
js/curriculum.js
js/question-engine.js
js/storage.js
js/app.js
assets/images/
manifest.webmanifest
service-worker.js
```

Prepared and Designed by: Mr.Mohamed Farid
