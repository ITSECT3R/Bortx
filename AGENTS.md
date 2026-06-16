# AGENTS.md

## What This Is

Two independent, pure-CSS animation libraries:

- **`src/borders/`** — 11 animated border effects (rainbow, pulse, shimmer, neon, etc.)
- **`src/text/`** — 3 text animation effects (typewriter, glitch, reveal-up)
- **`src/react/hooks/`** — React hooks for scroll-triggered text animations
- **`src/logo/`** — Internal assets (vortex logo CSS + HTML), used by VitePress theme only

This is a **pre-publish** library — no build step or npm package yet.
Code is raw `.css` + TypeScript barrel files consumed via bundler imports.

## Architecture

Each library has identical internal structure:

```
src/borders/
├── base.css             # CSS vars, @property defs, keyframes, .border-effect base
├── effects/             # 11 mask-based effects (rainbow, pulse, etc.)
├── modifiers/           # Pro modifiers (hover-only, slow, fast, reverse)
├── shared/              # Shared modifiers (.border-glow, .border-thick)
│   └── modifiers.css
└── index.ts             # Master barrel — imports everything

src/text/
├── base.css             # CSS vars, keyframes, .text-effect base, composition bridge
├── effects/             # Effect CSS files + barrels
│   ├── typewriter.css   # Typing animation + no-cursor/loop variants
│   ├── glitch.css       # Digital distortion + intense/subtle variants
│   ├── reveal/          # Reveal effects (shared base + 4 directions)
│   │   ├── base.css     # Container, word/letter, stagger
│   │   ├── reveal-up.css / reveal-down.css / reveal-left.css / reveal-right.css
│   │   ├── index.css
│   │   └── index.ts
│   ├── index.css
│   └── index.ts
├── modifiers/           # Glow, gradient, speed, delays, color presets
│   ├── index.css        # Modifier classes + @import for color-presets.css
│   ├── index.ts         # Barrel (CSS import + preset re-exports)
│   ├── color-presets.css   # 24 preset classes (10 gradient, 6 glitch, 8 glow)
│   └── color-presets.ts    # TypeScript types + metadata for presets
├── auto-animate.ts      # Vanilla IntersectionObserver trigger
├── apply-config.ts      # JS helpers: applyTextConfig(), applyColorPreset()
└── index.ts             # Master barrel — imports CSS, exports helpers + types
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
import '@itsect3r/bortx/borders'; // All border effects + modifiers (pro + shared)
import '@itsect3r/bortx/borders/styles'; // CSS base only (no TS)
import '@itsect3r/bortx/text'; // All text CSS + TS exports (effects, modifiers, helpers)
import '@itsect3r/bortx/text/styles'; // CSS base only (no TS)
import {
  useAnimateOnScroll,
  useAnimateOnScrollMany,
} from '@itsect3r/bortx/react';
import {
  applyTextConfig,
  applyColorPreset,
  initTextAnimations,
  gradientPresets,
  glitchPresets,
  glowPresets,
  allColorPresets,
  getPresetByClass,
} from '@itsect3r/bortx/text';
import type {
  TextEffectConfig,
  GradientPreset,
  GlitchPreset,
  GlowPreset,
} from '@itsect3r/bortx/text';
```

### Border Effects

**Pro** (base class: `.border-effect`, uses webkit-mask pattern):

| Effects                    | Modifiers                       |
| -------------------------- | ------------------------------- |
| `.border-rainbow`          | `.border-hover-only`            |
| `.border-light-trail`      | `.border-slow` / `.border-fast` |
| `.border-pulse`            | `.border-reverse`               |
| `.border-gradient`         |                                 |
| `.border-shimmer`          |                                 |
| `.border-dots`             |                                 |
| `.border-dual-spin`        |                                 |
| `.border-neon`             |                                 |
| `.border-ripple`           |                                 |
| `.border-corner-highlight` |                                 |
| `.border-dash-chase`       |                                 |

**Shared modifiers** (work with `.border-effect`):

`.border-glow` — adds box-shadow glow  
`.border-thick` — sets `--border-effect-thickness` to 4px

Border effects animate **by default**. Use `.border-hover-only` to pause until hover.

CSS variables: `--border-effect-speed`, `--border-effect-thickness`, `--border-effect-radius`, `--border-effect-color`, `--border-effect-accent`, `--border-effect-accent-secondary`, `--border-effect-intensity`

### Text Effects

Base class: `.text-effect` (required)  
Trigger class: `.is-animated` (required — all text animations are hidden/paused by default)

| Effects                                                                              | Modifiers                                                               |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `.text-typewriter`                                                                   | `.text-glow` / `.text-glow-pulse` / `.text-glow-intense`                |
| `.text-reveal-up` / `.text-reveal-down` / `.text-reveal-left` / `.text-reveal-right` | `.text-gradient` / `.text-gradient-animated` / `.text-gradient-rainbow` |
| `.text-glitch`                                                                       | `.text-slow` / `.text-fast`                                             |
| `.text-typewriter-loop` (variant)                                                    | `.text-delay-1` through `.text-delay-5`                                 |
| `.text-typewriter-no-cursor` (variant)                                               | `.text-shadow-depth`                                                    |
| `.text-glitch-intense` / `.text-glitch-subtle` (variants)                            | `.text-typewriter-loop` / `.text-typewriter-no-cursor`                  |

**Color presets** (CSS classes that set color variables — combine with gradient/glitch/glow modifiers):

| Gradient presets                                                                                                                  | Glitch presets                                                                         | Glow presets                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `.text-colors-sunset` / `-ocean` / `-cyberpunk` / `-forest` / `-fire` / `-twilight` / `-neon` / `-candy` / `-midnight` / `-ember` | `.text-glitch-colors-error` / `-neon` / `-matrix` / `-vaporwave` / `-cyber` / `-toxic` | `.text-glow-purple` / `-cyan` / `-orange` / `-pink` / `-green` / `-red` / `-gold` / `-white` |

Text animations need `.is-animated` added via JS — use the React hook, vanilla `initTextAnimations()`, or manual class toggle.

**JS helpers** (`applyTextConfig`, `applyColorPreset`) provide programmatic configuration without inline styles. `initTextAnimations()` is a vanilla IntersectionObserver auto-trigger.

CSS variables: `--text-effect-speed`, `--text-effect-delay`, `--text-effect-accent`, `--text-effect-chars`, `--text-effect-glow-color`, `--text-effect-glow-intensity`, `--text-effect-gradient-start/end/angle`, `--text-effect-glitch-color-1/2`, `--text-effect-glitch-intensity`

## Browser Caveats

CSS `@property` is used for animatable custom properties.
**Only supported in Chromium** (Chrome/Edge/Opera). Firefox and Safari lack `@property`.

## Gotchas

- `prefers-reduced-motion` is implemented in both border and text `base.css` files
- Alt border effects (no webkit-mask dependency) are planned for a future release — see plan.md
- Framework wrappers (React/Vue/Angular components) are planned but not built — only the React hook exists
- No build step configured — `src/` is shipped directly

## Docs

- `docs/guide/border-animations.md` — full border effects reference
- `docs/guide/text-animations.md` — full text effects reference + hook integration
- `docs/sandbox.md` — interactive sandbox for testing effect + modifier combos
- `plan.md` — roadmap and architectural decisions
