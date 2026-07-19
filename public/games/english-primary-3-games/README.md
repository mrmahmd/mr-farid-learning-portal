# English Primary 3 – Game World

A complete static educational games website for the Egyptian **English Primary 3 – Term 1 (2025/2026)** curriculum.

## Included

- 6 curriculum worlds.
- 23 lessons.
- 2 games per lesson: **46 games**.
- 13 reusable game engines: penalty shootout, racing, runner, phonics action, dialogue builder, memory, detective, story quest, maze, builder, simulation, puzzle, and football.
- Review 1 and Review 2 tournaments.
- XP, points, coins, gems, levels, badges, best scores, saved progress, and sequential world progression.
- Responsive design for laptop, tablet, and mobile.
- No login page. Student identity can be received from the host platform.

## Run locally

From the project folder:

```bash
python -m http.server 8765
```

Open:

```text
http://localhost:8765/#home
```

## Platform integration

The website accepts query parameters:

```text
?studentId=123&studentName=Ahmed
```

It also accepts an iframe message:

```js
iframe.contentWindow.postMessage({
  type: 'STUDENT_CONTEXT',
  payload: { studentId: '123', studentName: 'Ahmed', className: '3A' }
}, '*');
```

Progress is currently stored in `localStorage`, separated by `studentId`.

## Deployment

Upload all files in this folder to the repository root and enable GitHub Pages. No build command or server backend is required.
