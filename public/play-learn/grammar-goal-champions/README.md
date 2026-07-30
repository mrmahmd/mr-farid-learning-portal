# Grammar Penalty Champions

A responsive educational penalty-kick game for practising **Present Simple** and **Past Simple**.

## Included

- 149 carefully structured grammar questions
- Multiple choice, fill in the blank, word order, drag and drop, and error correction
- Affirmative, negative, questions, time expressions, and mixed-tense understanding
- 15-second timer; extra time for word-order and drag-and-drop questions
- Fully animated penalty scene: the player, kicking leg, goalkeeper, ball, goal net, crowd, and lights are independent moving elements
- Multiple goal, save, and miss trajectories with generated game sounds and confetti
- Four difficulty levels
- Score, coins, stars, streaks, badges, mastery bars, and coach feedback
- Automatic progress saving with `localStorage`
- Responsive layout for desktop, tablet, and mobile
- PWA manifest and service worker for offline use after the first visit

## Run locally

Open `index.html` directly, or start a small local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

Upload all files and folders in this project to a GitHub repository, then enable **Settings → Pages → Deploy from a branch**.

## Editing questions

Questions are stored in `questions.js`. Each item includes the tense, difficulty, answer, and a short teaching explanation.

## Brand note

The selectable team names are shown in text, but the visual emblems are original generic designs and not official club logos.

## Animated scene

The gameplay area does not use a player embedded in a static background image. The footballer and goalkeeper are separate layered SVG characters controlled by CSS and JavaScript. Each answer triggers a run-up, leg swing, ball flight, goalkeeper dive, net reaction, crowd reaction, and player celebration or disappointment.
