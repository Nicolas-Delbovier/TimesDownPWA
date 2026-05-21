# CHANGELOG

## [1.2.0] - 2026-05-21

### Added

- **Progress Bar:** A progress bar is now showed in-game alongside the remaining number of seconds.
- **Better Integrated Pop-up's:** Replace default browser pop-up's with custom pop-up component.

## [1.1.0] - 2026-05-20

### Added

- **Custom Themes:** Users can now create and edit custom visual themes.
- **Data Persistence:** Decks and words are now saved locally via `localStorage`.
- **Developer Tooling:** Added Git `pre-commit` hooks for automated code linting.
- **Assets:** Introduced new SVG icons for the user interface.

### Changed

- **Data Architecture:** Updated the underlying data schema to support custom themes.
- **Performance Optimization:** Consolidated multiple timers into a single `setInterval` loop to reduce CPU overhead.
- **Code Architecture:** Refactored for maintainability:
  - Extracted core business logic from components into dedicated services.
  - Reduced template duplication using structural loops (`v-for`).
  - Standardized UI interactions with a global CSS button class.

### Fixed

- **PWA Offline Mode:** Resolved an issue where certain SVG icons failed to load while offline.

### Removed

- Unused `Vue Router` dependency to reduce production bundle size.

## [1.0.0] - 2025-05-19

### Added

- **UI/UX Design:** Implemented a completely redesigned user interface.
- **Styling Framework:** Integrated Tailwind CSS for modern, utility-first styling.

### Changed

- **Vue Architecture:** Migrated the codebase from the Options API to the modern Composition API for better logic reuse.

### Fixed

- **Overscroll Behavior:** Disabled pull-to-refresh and elastic overscroll behaviors to make the app feel more like a native mobile application.
- **Stability:** Patched various minor bugs discovered during the beta phase.

---

## [0.0.0] - 2026-04-01

### Added

- **Core Game Loop:** Implemented base game functionality and state tracking.
- **Initial Setup:** Initialized the project structure utilizing Vue's standard Options API.
