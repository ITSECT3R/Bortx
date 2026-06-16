# Contributing to Bortx

Thanks for your interest in contributing! Bortx is a pure-CSS animation library — most contributions will be new effects, modifiers, or color presets.

## Local Dev Setup

```bash
# Clone
git clone git@github.com:ITSECT3R/bortx.git
cd bortx

# Install dependencies (Bun is the package manager)
bun install

# Start docs dev server
bun run dev
```

You need **Bun** installed. Get it at [bun.sh](https://bun.sh).

## Project Structure

```
src/
├── borders/                  # Border effects library
│   ├── base.css              # CSS vars, @property, .border-effect base
│   ├── effects/              # Individual effect CSS files
│   ├── modifiers/            # Pro modifiers (hover-only, slow, fast, reverse)
│   ├── shared/               # Shared modifiers (.border-glow, .border-thick)
│   └── index.ts              # Master barrel
├── text/                     # Text effects library
│   ├── base.css              # CSS vars, @property, .text-effect base
│   ├── effects/              # Effect CSS + reveal subfolder
│   ├── modifiers/            # Glow, gradient, speed, color presets
│   ├── auto-animate.ts       # Vanilla IntersectionObserver trigger
│   ├── apply-config.ts       # JS helpers + types
│   └── index.ts              # Master barrel
├── react/hooks/              # useAnimateOnScroll, useAnimateOnScrollMany
├── types/css.d.ts            # *.css module declaration
└── index.ts                  # Root barrel
docs/                         # VitePress documentation site
```

## Commands

| Command                | Purpose                         |
| ---------------------- | ------------------------------- |
| `bun run dev`          | Start VitePress docs dev server |
| `bun run lint`         | ESLint on `src/`                |
| `bun run lint:fix`     | ESLint auto-fix                 |
| `bun run format`       | Prettier write                  |
| `bun run format:check` | Prettier check (CI mode)        |
| `bun run typecheck`    | `tsc --noEmit`                  |
| `bun run test`         | Run Vitest tests                |
| `bun run build`        | Bundle CSS + generate .d.ts     |
| `bun run docs:build`   | Build VitePress docs site       |

## Adding a New Effect

### Border Effect

1. Create `src/borders/effects/my-effect.css`
2. Define the effect class (`.border-my-effect`) using border image masks
3. Add `@import` to `src/borders/effects/index.css`
4. Add `import` to `src/borders/effects/index.ts`
5. Update `docs/guide/border-animations.md`

### Text Effect

1. Create the CSS file in `src/text/effects/`
2. Define the effect class (`.text-my-effect`) with `is-animated` trigger
3. Add `@import` to `src/text/effects/index.css`
4. Add `import` to `src/text/effects/index.ts`
5. Update `docs/guide/text-animations.md`

### Color Preset

1. Add the class to `src/text/modifiers/color-presets.css`
2. Add TypeScript metadata to `src/text/modifiers/color-presets.ts`
3. Add the preset to the correct array (gradient/glitch/glow)

## Conventions

- **CSS class naming**: `.{namespace}-{name}` (`.border-rainbow`, `.text-glow`)
- **CSS var naming**: `--{namespace}-{name}` (`--border-effect-speed`)
- **No comments**: Code should be self-documenting; only JSDoc on public APIs
- **No new dependencies**: Keep the library 0-dep; no preprocessors, no utility classes
- **TypeScript**: All `.ts` files must pass `tsc --noEmit` with `strict: true`

## Testing

```bash
bun run test        # Unit tests (Vitest)
bun run test:watch  # Watch mode
```

Tests cover:

- `applyTextConfig` / `applyColorPreset` / `getPresetByClass`
- `initTextAnimations` (vanilla IntersectionObserver trigger)
- React hooks
- Visual regression tests (Playwright, planned)

Write tests for any new JS/TS logic. CSS changes should be visually verified in the docs sandbox (`bun run dev` → `/sandbox`).

## PR Process

1. Fork the repo and create a feature branch
2. Make your changes following conventions above
3. Run `bun run lint && bun run typecheck && bun run test`
4. Update docs if adding user-facing features
5. Open a PR against `main` with a clear description

PRs are checked automatically by GitHub Actions (lint, typecheck, format check, tests).

## Questions?

Open a [GitHub Discussion](https://github.com/ITSECT3R/bortx/discussions) or issue.
