# Mr.Farid Learning Portal - Agent Instructions

## Project identity

- Product: Mr.Farid Learning Portal / بوابة مستر فريد التعليمية.
- Main repository: `https://github.com/mrmahmd/mr-farid-learning-portal`.
- Main custom domain: `https://mrfarid.net` (also verify the `www` form when deployment or DNS is in scope).
- This repository contains the portal plus multiple standalone curriculum, assessment-book, and game applications.
- Portal code lives mainly under `app/`.
- Static learning applications live mainly under `public/course-apps/`.

## Communication and approval

- Communicate with the owner in clear Arabic.
- Keep Arabic paragraphs right-to-left and avoid mixing untranslated English into Arabic sentences when a clear Arabic equivalent exists.
- Before editing, state the exact repository, target folder, and files that will be changed.
- When the request concerns a single application, do not modify other applications or shared portal files unless the owner explicitly approves it.
- Before publishing, summarize the proposed changes and the non-regression checks.
- Do not claim that a change is live until the deployment and the live custom-domain result have both been verified.

## Worktree safety

- Treat the worktree as user-owned and potentially dirty.
- Never run destructive cleanup commands, `git reset --hard`, or discard unrelated changes.
- Preserve the current uncommitted English Primary 1 rebuild work under:
  - `public/course-apps/english-primary-1/`
  - `public/course-apps/english-primary-1-next/`
- Do not commit preview folders, extracted incoming packages, backups, logs, PID files, or build caches unless explicitly requested.
- Before any edit, run `git status --short` and inspect overlapping changes.
- Inspect the final diff before committing. A commit must contain only the approved scope.

## Architecture and source of truth

- The portal is a Next.js/Vinext application. Check `package.json` before choosing commands.
- Do not assume every embedded course has the same internal structure. Inspect each application before integrating access control, navigation, or saving.
- Prefer a single central registry for every published item. Each record should identify at least:
  - stable `app_id`
  - title in English and Arabic
  - grade
  - content type: curriculum, assessment book, curriculum game, or free game
  - route
  - term
  - availability state
- Reuse the registry for portal cards, permissions, Last Activity, student progress, and navigation instead of maintaining separate partial maps.

## Supabase, authentication, and security

- The active portal Supabase project reference is `tygekqfjytwbkvdkjcrg`. Verify current environment configuration before making database changes.
- Never expose or commit a service-role key, database password, private JWT secret, or admin credential.
- Privileged account creation, password reset, suspension, and access changes must remain server-side or in protected Edge Functions.
- Do not weaken Row Level Security to make a feature work.
- Cloud progress must be keyed by the authenticated Supabase `user_id` and a stable `app_id`, never only by username or device storage.
- The `course_progress` row must support both progress restoration and a normalized Last Activity payload.
- Read errors must be visible in diagnostics; do not silently treat a failed Supabase read as "no activity".
- Preserve student accounts, profiles, progress, and existing subscriptions during schema or code changes.
- Database migrations must be additive and reviewable. Include rollback notes for risky changes.

## Progress and Last Activity contract

- Use one versioned progress bridge across applications instead of copying divergent bridge implementations.
- Normalize legacy progress safely, including state stored at the top level or under nested `state.progress` objects.
- Every published curriculum, assessment book, and curriculum game must be registered so the portal can display its Last Activity.
- A Last Activity record should contain enough information to show:
  - application title
  - unit
  - lesson or section
  - question/page when relevant
  - a safe resume URL
  - update timestamp
- Entry behavior and refresh behavior are different:
  - Opening an application from the portal should first show that application's dashboard/home screen.
  - The dashboard may offer a clear "Continue last activity" action.
  - Refreshing while already inside an activity should keep the student on the same internal screen/question.
- Points must not be awarded twice when a saved question is revisited.
- Cross-device saving is not verified until it is tested with the same real student account on two separate browser/device sessions.

## Subscription and access rules

- Access is controlled by the portal and database, not by visual hiding alone.
- Supported access concepts currently include: locked/none, sample, grade, custom, and full/all. Verify the current schema names before editing.
- The intended default for a newly registered or currently unsubscribed student is free-sample access only.
- A free sample should expose only Unit 1, Lesson 1 for the student's assigned grade/content, unless the owner explicitly changes this rule.
- Sample restrictions must cover every entry path:
  - dashboard cards
  - unit and lesson lists
  - sidebars
  - direct URLs
  - hash routes
  - saved resume links
  - previous/next buttons
- Never rely only on disabled CSS or hidden buttons for paid-content protection.
- Static files on GitHub Pages remain publicly addressable if a visitor knows the URL. Do not describe UI gating as strong commercial security.
- For real paid-content enforcement, use an authorized server/Edge Function or private/signed resources.
- When access changes from sample to paid/full, remove stale sample locks without deleting the student's saved progress.
- Suspension and forced-password-change states must take precedence over content permissions.

## Content-area expectations

- Curricula, assessment books, curriculum game platforms, and booklet downloads must all use the same authoritative permission evaluator.
- `custom` access must be honored consistently in every content area, not only curricula.
- Booklet download links must not be rendered as active links for unauthorized students.
- The public `Play & Learn / العب وتعلم` section is intentionally free unless the owner explicitly changes it.
- Do not confuse general free games with subscription-controlled curriculum game platforms.

## Internationalization and visual rules

- The portal has Arabic and English experiences. All visible portal text, including descriptions, empty states, access notices, buttons, and student dashboard text, must change language without requiring a manual refresh.
- Arabic pages use `dir="rtl"`; English pages use `dir="ltr"`.
- Arabic typography preference:
  - Cairo for body text.
  - Baloo Bhaijaan 2 for headings, buttons, and highlighted labels.
- Preserve UTF-8 throughout. Mojibake such as `Ã`, `Â`, `â`, or broken Arabic glyphs is a release blocker.
- Keep headings centered where the established portal design expects them, and keep Arabic secondary text aligned from the right.
- Verify responsive layouts on laptop and mobile. Do not fix mobile by breaking desktop, or vice versa.
- Images must remain properly contained, uncropped where important subjects are involved, and optimized enough for GitHub Pages performance.

## Embedded application UI rules

- Embedded curriculum applications normally occupy the full content area and provide clear actions back to:
  - the relevant portal section
  - the portal home page
- Do not reintroduce legacy authentication, legacy Supabase projects, developer signatures, "Who am I", Hero of the Week, profile-picture upload, or unrelated social buttons inside course applications unless explicitly requested.
- Student display names must come from the authenticated portal session, not a hard-coded "Student" value.
- Technical support controls must not obscure content on mobile.

## Known deferred repair program

The owner postponed the comprehensive repair. When asked to resume it, use this order:

1. Build and adopt the central application/content registry.
2. Make Home Last Activity and Student Dashboard use that registry.
3. Standardize one progress bridge and normalize legacy saved states.
4. Repair missing activity reporting, especially assessment books and curriculum games.
5. Consolidate access evaluation across curricula, games, assessment books, and booklets.
6. Add explicit, app-specific free-sample maps rather than heuristic DOM-only locking.
7. Verify sample-to-paid transitions and stale-lock removal.
8. Repair UTF-8/mojibake issues and update affected cache/service-worker versions.
9. Fix lint/build blockers without deleting user work or incoming reference packages.
10. Run authenticated desktop/mobile/cross-device regression tests before publishing.

Previously observed audit risks include:

- Partial Last Activity mapping that omits some apps.
- Multiple incompatible progress bridge versions.
- Missing activity payloads in some games/assessment books.
- Inconsistent `custom` access behavior.
- Heuristic sample guards that can be bypassed or can lock the wrong element.
- Sample locks that may remain after a student receives full access.
- Source-text encoding corruption in some applications.
- Supabase security warnings that must be reviewed separately from normal UI work.
- Build/lint noise from untracked incoming and preview folders.

Re-audit current files and database state before implementing these fixes; this list records known risks, not proof that every item is still current.

## Verification checklist

For portal changes, run the applicable checks:

1. `git status --short` before and after.
2. Targeted syntax/type checks for changed files.
3. `npm run lint` with unrelated pre-existing findings separated from new findings.
4. `npm run build` or the repository's current Pages build command.
5. Relevant rendered/static tests.
6. Local browser test for Arabic, English, desktop, and mobile layouts.
7. Authentication test using a real non-admin student account.
8. Permission tests for sample, grade, custom, full, locked, and suspended states when access code changes.
9. Refresh and portal-entry behavior tests for changed applications.
10. Cross-device Supabase verification when progress or Last Activity changes.
11. Service-worker/cache-version check for modified static applications.
12. GitHub Actions success and live custom-domain verification after an authorized push.

## Publishing rules

- Publishing requires an explicit user request.
- Confirm the active branch and remote before committing or pushing. Do not assume the current branch is `main`.
- The GitHub remote is normally named `github`; verify it before use.
- Do not mix unrelated local changes into a deployment commit.
- After pushing, check:
  - GitHub commit and diff
  - GitHub Actions/Pages result
  - raw deployed assets when relevant
  - live `mrfarid.net` behavior
  - cached/service-worker behavior in a fresh session
- If any verification boundary remains, report it clearly instead of saying the deployment is fully complete.


