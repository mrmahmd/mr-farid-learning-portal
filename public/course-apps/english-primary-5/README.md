# English Primary 5 – First Term

A complete multi-file interactive curriculum website for the Egyptian Primary 5 English First Term course.

## Run locally

Because the project uses JavaScript modules, run it through a local server instead of opening `index.html` directly:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Student platform integration

There is no login screen. The parent platform can pass the student directly.

### Query parameters

```text
index.html?studentId=123&studentName=Ahmed&className=5A
```

### JavaScript API

```js
window.Primary5App.setStudent({
  id: "123",
  name: "Ahmed",
  className: "5A"
});
```

### Parent iframe message

```js
iframe.contentWindow.postMessage({
  type: "PRIMARY5_SET_STUDENT",
  student: { id: "123", name: "Ahmed", className: "5A" }
}, "*");
```

The app sends progress to the parent platform using:

```js
{
  type: "PRIMARY5_PROGRESS",
  payload: { student, progress }
}
```

It also dispatches a browser event named `primary5-progress`.

## Teacher preview

To unlock every unit and lesson for review:

```text
index.html?preview=1
```

## Question system

The project contains **600 curriculum-grounded lesson questions**: 20 questions for each of the 30 lessons. Questions are stored separately in `assets/js/questions-data.js` so they can be reviewed or replaced without changing the interface code.

Questions are grouped inside every lesson in this order:

1. Choose
2. Complete
3. True / False
4. Matching
5. Drag & Drop
6. Listening
7. Ordering
8. Correction
9. Sentence Builder

The questions use vocabulary in real sentences and situations. They assess reading details, lesson content, grammar, writing, story sequence, pronunciation topics, and projects. There are no dictionary-style prompts such as “Which word means…?”.

For correction activities, only the incorrect word or phrase is highlighted. The student types only the correction.

Listening activities use the browser's English text-to-speech feature. Progress, the current question, points, and completed answers are saved automatically for each student on the device.

## Project structure

```text
index.html
manifest.webmanifest
sw.js
assets/
  css/styles.css
  js/app.js
  js/curriculum-data.js
  js/questions-data.js
  images/covers/
  icons/favicon.svg
```

## Included features

- No login page.
- Dynamic student name from the parent platform.
- Premium main cover and six horizontal 3D unit covers.
- Six units and thirty lessons.
- Separate learning stations for every lesson.
- 600 direct lesson questions based on the Ministry textbook.
- Choose, Complete, True/False, Matching, Drag & Drop, Listening, Ordering, Correction, and Sentence Builder.
- Twenty questions per lesson and fifty-question unit challenges.
- Questions grouped by type rather than randomized.
- Correct-answer feedback and a required **GOT IT** button after mistakes.
- Five-second automatic move after a correct answer.
- Unique-answer points, stars, coins, badges, and sequential unlocking.
- Automatic progress and current-question saving.
- Certificate of completion.
- Responsive mobile and desktop layout.
- Offline caching when hosted through HTTP/HTTPS.
