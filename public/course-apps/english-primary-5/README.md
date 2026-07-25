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

## Project structure

```text
index.html
manifest.webmanifest
sw.js
assets/
  css/styles.css
  js/app.js
  js/curriculum-data.js
  images/covers/
  icons/favicon.svg
```

## Included features

- No login page.
- Dynamic student name from the parent platform.
- Premium main cover and six horizontal 3D unit covers.
- Six units and thirty lessons.
- Separate learning stations for every lesson.
- Direct, lesson-based questions without dictionary-style assessment.
- Complete, MCQ, True/False, matching, ordering, correction, and sentence-builder activities.
- Twenty questions per lesson and fifty-question unit challenges.
- Sequential unlocking, points, stars, badges, progress saving, feedback, and certificate.
- Responsive mobile and desktop layout.
- Offline caching when hosted through HTTP/HTTPS.
