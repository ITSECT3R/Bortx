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
src/borders/
├── base.css             # CSS vars, @property defs, keyframes, .border-effect base
├── effects/             # 11 mask-based effects (rainbow, pulse, etc.)
├── modifiers/           # Pro modifiers (hover-only, slow, fast, reverse)
├── alt/                 # Alternative effects without webkit-mask dependency
│   ├── base.css         # .border-alt base class (minimal, no mask)
│   ├── effects/         # Alt effects (glow-ring, etc.)
│   └── modifiers/       # Alt modifiers (alt-hover-only, alt-slow, alt-fast, alt-reverse)
├── shared/              # Modifiers that work with both .border-effect and .border-alt
│   └── modifiers.css    # .border-glow, .border-thick
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
import 'knocking-borders/borders'; // All border effects + modifiers (pro + alt + shared)
import 'knocking-borders/borders/styles'; // CSS base only (no TS)
import 'knocking-borders/borders/alt'; // Alt border effects only (no webkit-mask)
import 'knocking-borders/text'; // All text effects + modifiers
import 'knocking-borders/text/styles'; // CSS base only (no TS)
import {
  useAnimateOnScroll,
  useAnimateOnScrollMany,
} from 'knocking-borders/react';
```

### Border Effects

**Pro** (base class: `.border-effect`, uses webkit-mask pattern):

| Effects                    | Modifiers                           |
| -------------------------- | ----------------------------------- |
| `.border-rainbow`          | `.border-hover-only`                |
| `.border-light-trail`      | `.border-slow` / `.border-fast`     |
| `.border-pulse`            | `.border-reverse`                   |
| `.border-gradient`         |                                     |
| `.border-shimmer`          |                                     |
| `.border-dots`             |                                     |
| `.border-dual-spin`        |                                     |
| `.border-neon`             |                                     |
| `.border-ripple`           |                                     |
| `.border-corner-highlight` |                                     |
| `.border-dash-chase`       |                                     |

**Alt** (base class: `.border-alt`, no webkit-mask dependency, import `knocking-borders/borders/alt`):

| Effects         | Modifiers                                |
| --------------- | ---------------------------------------- |
| `.alt-glow-ring` | `.alt-hover-only` / `.alt-slow` / `.alt-fast` / `.alt-reverse` |

**Shared modifiers** (work with both `.border-effect` and `.border-alt`):

`.border-glow` — adds box-shadow glow  
`.border-thick` — sets `--border-effect-thickness` to 4px

Border effects animate **by default**. Use `.border-hover-only` (pro) or `.alt-hover-only` (alt) to pause until hover.

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

- `prefers-reduced-motion` is implemented in both border and text `base.css` files
- Framework wrappers (React/Vue/Angular components) are planned but not built — only the React hook exists
- No build step configured — `src/` is shipped directly

## Docs

- `docs/guide/border-animations.md` — full border effects reference
- `docs/guide/text-animations.md` — full text effects reference + hook integration
- `docs/sandbox.md` — interactive sandbox for testing effect + modifier combos
- `plan.md` — roadmap and architectural decisions
