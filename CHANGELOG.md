# Changelog

## [0.1.1] - 2026-06-16

### Fixed

- Missing `dist/` directory in published v0.1.0 tarball — added `prepublishOnly` script to guarantee `tsup` build runs before every publish
- Scoped package `ENOVERSIONS` install error (caused by missing dist/ files referenced in `exports` map)

### Changed

- Package renamed from `bortx` to `@itsect3r/bortx` (scoped, as required by npm registry)

## [0.1.0] - 2026-06-16

### Added

- **Border Effects (11):** rainbow, light-trail, pulse, gradient, shimmer, dots, dual-spin, neon, ripple, corner-highlight, dash-chase
- **Border Modifiers (6):** hover-only, slow, fast, reverse, glow, thick
- **Text Effects (3):** typewriter (with loop/no-cursor variants), glitch (with intense/subtle variants), reveal (4 directions: up/down/left/right) with word/letter granularity and auto-stagger
- **Text Modifiers (9):** glow, glow-pulse, glow-intense, gradient, gradient-animated, gradient-rainbow, slow, fast, delay-1 through delay-5, shadow-depth
- **Color Presets (24):** 10 gradient presets, 6 glitch presets, 8 glow presets
- **React Hooks:** `useAnimateOnScroll`, `useAnimateOnScrollMany` — IntersectionObserver-based scroll-triggered animations
- **Vanilla JS:** `initTextAnimations()` — auto-trigger all `.text-effect` elements on scroll via IntersectionObserver + MutationObserver
- **JS Config Helpers:** `applyTextConfig()`, `applyColorPreset()` — programmatic configuration with TypeScript types
- **CSS Variables:** Full customization via `--border-effect-*` and `--text-effect-*` custom properties
- **Accessibility:** `prefers-reduced-motion` support on all effects, `forced-colors` support on text gradients
- **Documentation:** VitePress docs site with guide, live demos, and interactive sandbox
- **CI/CD:** GitHub Actions for PR checks (lint, typecheck, format, test, build) and docs deploy to GitHub Pages
- **Build:** tsup-based build pipeline producing ESM + TypeScript declarations + bundled CSS
