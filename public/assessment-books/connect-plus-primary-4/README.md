# Connect Plus 4 — Fixed UI & Navigation

Open `START_HERE.html` after extracting the ZIP.

Fixes in this edition:
- Removed every inline `onclick` handler.
- All controls now use CSP-safe JavaScript event delegation.
- Buttons work when the application is hosted inside a portal or on GitHub Pages.
- The entire visual system is scoped under `#cp4-app`, preventing the portal's CSS from breaking the app layout.
- Added safe localStorage handling and activity-level error protection.
- Added a visible error message when a required file is missing.
- Original workbook pages remain optional references only.
- Interactive activities remain fully written inside the application.
