# QA Report — English Primary 1 Term 1

## Content validation
- 6 units.
- 24 lessons: 4 lessons in each unit.
- Review 1 and Review 2.
- 25 questions generated for every lesson.
- 30 questions generated for every unit challenge.
- 40 questions generated for every review challenge.

## Technical validation
- JavaScript syntax checked successfully with Node.js.
- All local asset references checked; no missing referenced files.
- 114 MP3 phonics files validated with FFprobe.
- Minimum audio duration: about 0.97 seconds.
- Browser DOM smoke test passed for home, unit, lesson, phonics tracing, question counts and mobile layout.
- Letter tracing tested with pointer input.
- Desktop and mobile preview screenshots generated.

## Integration
- No login page.
- Accepts studentId, studentName and className.
- Saves progress per student in localStorage.
- Parent platform can call Primary1App.setStudent(...).

## Final upload check for Codex
Run through an HTTP server and manually listen to a sample of every phonics sound after deployment because device audio policies can vary between browsers.
