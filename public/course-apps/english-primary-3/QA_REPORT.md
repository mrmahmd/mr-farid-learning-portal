# QA Report

## Automated checks completed

- JavaScript syntax checked with Node.js.
- Curriculum data loaded successfully.
- 6 units detected.
- 23 lessons detected.
- Every lesson generates exactly 30 questions.
- Every unit generates exactly 50 questions.
- Review 1 generates 60 questions.
- Review 2 generates 60 questions.
- Desktop interaction test passed:
  - Home page rendered.
  - Six unit cards rendered.
  - Unit 1 opened.
  - Four Unit 1 lessons rendered.
  - Lesson 1 opened.
  - Vocabulary card flipped.
  - Language Notes opened.
  - Lesson Challenge opened.
  - Answer feedback displayed.
- Mobile responsive render completed with six unit cards.
- No JavaScript page errors were reported during the automated interaction test.

## Preview files generated outside the project folder

- `english-primary3-complete-website-preview.png`
- `english-primary3-mobile-preview.png`

## Deployment note

Use an HTTP server or GitHub Pages. The main learning features work as a static website. The service worker requires HTTP/HTTPS and does not run when `index.html` is opened directly with a `file://` URL.
