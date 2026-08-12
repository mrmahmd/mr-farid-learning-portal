# QA Report — Connect Plus 2 Pixar Visual Edition V3

## Automated checks completed

- JavaScript syntax: `app.js` passes `node --check`.
- Course data syntax: `data.js` passes `node --check`.
- Units present: **6**.
- Core lessons present: **18**.
- Visual vocabulary assets: **229**.
- Unit cover assets: **6**.
- New lesson/special visual assets: present and referenced.
- Asset reference audit: **259 referenced visual paths checked, 0 missing**.
- Student-name entry screen: not used; app opens on Dashboard.
- Progress namespace supports `studentId`, so students can have separate local progress on a shared device.
- Platform events for answers/completion are retained.

## Curriculum/question structure retained from the full edition

- 30 grouped questions per core lesson.
- 50-question bank after each unit.
- Review 1 and Review 2.
- Animals in the Wild non-fiction reader.
- The Gingerbread Man interactive reader.
- Choose, Complete, True/False, Ordering, Correction, Matching, Listening, Look & Write, and Reading practice.

## Visual changes checked

- Unit art now points to `assets/covers/unit1.jpg` … `unit6.jpg`.
- Core lesson hero art now points to `assets/lesson-media-new/`.
- Old scan-derived lesson-media directory has been removed from the V3 project.
- Vocabulary image files are picture-based visual clues rather than the old text-only image cards.
- Choose / Complete / Look & Write can display vocabulary picture clues where available.

## Audio note

The uploaded PDF indicates listening activities but does not contain the complete official publisher audio package. Recreated audio in this project must not be described as the official publisher recordings.
