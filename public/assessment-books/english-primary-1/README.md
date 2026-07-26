# Primary 1 Interactive Assessment Book

A complete English-only interactive website based on the **Primary 1 – First Term – Performance Tasks and Assessment 2025/2026** book.

## Included

- The complete book from source pages 4–63.
- 60 interactive pages organized into six units, two reviews, monthly/general revision, and the final assessment.
- More than 600 source-based activities.
- Choice, fill-in, missing letter, matching-style choices, unscramble, sentence ordering, counting, True/False, free writing, and drawing activities.
- Instant correction, correct answers, points, stars, sounds, confetti, progress saving, sequential unlocking, and a printable certificate.
- English-only student interface.
- Responsive mobile, tablet, and desktop design.
- No login screen; student details can be passed from a parent platform.
- Offline caching when hosted through HTTP/HTTPS.

## Run locally

Opening `index.html` directly works for the main app. For full PWA/offline behavior, use a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Teacher preview

Unlock all units and pages for review:

```text
index.html?preview=1
```

## Parent platform integration

### Query parameters

```text
index.html?studentId=123&studentName=Ahmed&className=1A
```

### JavaScript

```js
window.Primary1Book.setStudent({
  id: "123",
  name: "Ahmed",
  className: "1A"
});
```

### iframe message

```js
iframe.contentWindow.postMessage({
  type: "PRIMARY1_SET_STUDENT",
  student: { id: "123", name: "Ahmed", className: "1A" }
}, "*");
```

The application sends progress to the parent page using `PRIMARY1_PROGRESS` and dispatches a browser event named `primary1-progress`.

## Credits

Prepared and Designed by **Mr.Mohamed Farid**.


## Fixed self-contained build
- `index.html` is fully self-contained: CSS, JavaScript, assessment data and essential images are embedded.
- It can be opened directly without losing its design.
- There is no login screen and no student-name input.
- The opening page contains only the visual book cover and Start/Continue controls.


## Final cover update
The opening screen uses the embedded titled cover artwork. No login or student-name entry is shown.


## Dashboard artwork update
The requested dashboard image is integrated in the live application. The progress bar and both navigation buttons are real, dynamic controls layered over the artwork.
