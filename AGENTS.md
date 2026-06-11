# AGENTS.md

## What This Is

Two independent, pure-CSS animation libraries:

- **`src/borders/`** — 11 animated border effects (rainbow, pulse, shimmer, neon, etc.)
- **`src/text/`** — 3 text animation effects (typewriter, glitch, reveal-up)
- **`src/react/hooks/`** — React hooks for scroll-triggered text animations

This is a **pre-publish** library — no build step or npm package yet.
Code is raw `.css` + TypeScript barrel files consumed via bundler imports.

## Architecture

Each library has identical internal structure:

```
src/borders/ or src/text/
├── base.css             # CSS vars, @property defs, keyframes, base class
├── effects/             # Individual effect .css + barrel (.ts and .css)
├── modifiers/           # Modifier .css (speed, glow, hover-only) + barrel
└── index.ts             # Master barrel — imports everything
```

Import pattern: `.ts` barrel files import `.css` directly.
Requires a bundler with CSS module support (Vite, Webpack, etc.).

## Commands

```bash
bun run lint          # ESLint on src/
bun run lint:fix      # ESLint auto-fix
bun run format        # Prettier write
bun run format:check  # Prettier check (CI mode)
bun run typecheck     # tsc --noEmit
```

There is no `build` yet — the library ships source CSS directly.

## API Reference

### Import Paths

```ts
import 'knocking-borders/borders'; // All border effects + modifiers
import 'knocking-borders/borders/styles'; // CSS base only (no TS)
import 'knocking-borders/text'; // All text effects + modifiers
import 'knocking-borders/text/styles'; // CSS base only (no TS)
import {
  useAnimateOnScroll,
  useAnimateOnScrollMany,
} from 'knocking-borders/react';
```

### Border Effects

Base class: `.border-effect` (required)

| Effects                    | Modifiers                       |
| -------------------------- | ------------------------------- |
| `.border-rainbow`          | `.border-hover-only`            |
| `.border-light-trail`      | `.border-glow`                  |
| `.border-pulse`            | `.border-slow` / `.border-fast` |
| `.border-gradient`         | `.border-thick`                 |
| `.border-shimmer`          | `.border-reverse`               |
| `.border-dots`             |                                 |
| `.border-dual-spin`        |                                 |
| `.border-neon`             |                                 |
| `.border-ripple`           |                                 |
| `.border-corner-highlight` |                                 |
| `.border-dash-chase`       |                                 |

Border effects animate **by default**. Use `.border-hover-only` to pause until hover.

CSS variables: `--border-effect-speed`, `--border-effect-thickness`, `--border-effect-radius`, `--border-effect-color`, `--border-effect-accent`, `--border-effect-accent-secondary`, `--border-effect-intensity`

### Text Effects

Base class: `.text-effect` (required)  
Trigger class: `.is-animated` (required — all text animations are hidden/paused by default)

| Effects            | Modifiers                                                               |
| ------------------ | ----------------------------------------------------------------------- |
| `.text-typewriter` | `.text-glow` / `.text-glow-pulse` / `.text-glow-intense`                |
| `.text-reveal-up`  | `.text-gradient` / `.text-gradient-animated` / `.text-gradient-rainbow` |
| `.text-glitch`     | `.text-slow` / `.text-fast`                                             |
|                    | `.text-delay-1` through `.text-delay-5`                                 |

Text animations need `.is-animated` added via JS — use the React hook or `IntersectionObserver`.

CSS variables: `--text-effect-speed`, `--text-effect-delay`, `--text-effect-accent`, `--text-effect-chars`, `--text-effect-glow-color`, `--text-effect-glow-intensity`, `--text-effect-gradient-start/end/angle`

## Browser Caveats

CSS `@property` is used for animatable custom properties.
**Only supported in Chromium** (Chrome/Edge/Opera). Firefox and Safari lack `@property`.

## Gotchas

- No `prefers-reduced-motion` support yet (planned, not implemented)
- Framework wrappers (React/Vue/Angular components) are planned but not built — only the hook exists
- No build step configured — `src/` is shipped directly

## Docs

- `docs/border-animations.md` — full border effects reference
- `docs/text-animations.md` — full text effects reference + hook integration
- `plan.md` — roadmap and architectural decisions
