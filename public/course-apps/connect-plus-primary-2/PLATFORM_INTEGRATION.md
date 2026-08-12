# Student / Platform Integration

The course never asks the learner to type a name. It opens directly on the dashboard.

Student information is optional. If no name is supplied, the heading displays **Welcome back!**. Supplying a stable student ID is strongly recommended because local progress is then separated per learner on shared devices.

## Method 1 — JavaScript object before app.js

Define the current learner before loading `app.js`:

```html
<script>
  window.CONNECT_PLUS_STUDENT = {
    id: "student-database-id",
    name: "Ahmed Mohamed"
  };
</script>
<script src="data.js"></script>
<script src="app.js"></script>
```

The course also recognizes:

- `window.PLATFORM_STUDENT`
- `window.STUDENT_DATA`
- `window.currentStudent`

Supported name fields:

- `name`
- `studentName`
- `fullName`
- `full_name`
- `displayName`
- `display_name`
- `username`

Supported ID fields:

- `id`
- `studentId`
- `student_id`
- `userId`
- `user_id`

## Method 2 — URL parameters

Example:

```text
index.html?studentId=12345&studentName=Ahmed%20Mohamed
```

Alternative accepted parameter names:

- ID: `student_id`, `userId`, `user_id`
- Name: `student_name`, `name`

For production systems, avoid putting sensitive information in the URL. A database ID plus display name is usually enough; do not pass passwords, tokens or private profile data this way.

## Method 3 — iframe + postMessage

If the course is embedded in the school platform:

```js
const frame = document.querySelector('#connect-plus-frame');

frame.contentWindow.postMessage({
  type: 'CONNECT_PLUS_STUDENT',
  student: {
    id: 'student-database-id',
    name: 'Ahmed Mohamed'
  }
}, 'https://your-course-domain.example');
```

Accepted incoming message types:

- `CONNECT_PLUS_STUDENT`
- `PLATFORM_STUDENT`
- `STUDENT_DATA`

The example uses an explicit target origin. This is safer than `'*'` when the course domain is known.

## Receiving answers and completion events

The course emits messages that the parent platform can listen for and save to its own database.

### Answer event

```js
window.addEventListener('message', event => {
  if (event.data?.type !== 'CONNECT_PLUS_ANSWER') return;

  console.log(event.data);
  // Send event.data to your platform API / Supabase / database here.
});
```

The payload includes fields such as:

```js
{
  type: 'CONNECT_PLUS_ANSWER',
  course: 'connect-plus-2-first-term',
  student: { id: '...', name: '...' },
  contentId: 'u1l1',
  questionId: 'u1l1-mcq-1',
  category: 'mcq',
  correct: true,
  answer: 'good morning',
  completed: false,
  points: 10,
  timestamp: '...'
}
```

### Completion event

When a lesson, bank, reader, story part or review is completed, the app sends:

```text
CONNECT_PLUS_COMPLETION
```

The payload includes `contentId`, `score`, `answered`, `totalQuestions`, student information and points.

## Restricting outgoing postMessage origin

By default the embedded course can post progress events to its parent window. If you know the exact parent origin, define it before `app.js`:

```html
<script>
  window.CONNECT_PLUS_PARENT_ORIGIN = 'https://school.example.com';
</script>
```

## Local progress vs database progress

The course currently keeps an immediate local copy in `localStorage`, so the learner does not lose work after refreshing the page.

Passing the student ID **does not automatically create cross-device sync**. For cross-device progress, the host platform should listen for the answer/completion events above and save them in its database. Restoring server-side progress back into the app would be the next integration step if required.
