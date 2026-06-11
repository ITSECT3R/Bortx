# Knocking-Borders — Project Plan

> Open-source CSS border & text animation library (MIT)
> Goal: framework-agnostic CSS core with thin framework wrappers

---

## Current Architecture

```
src/
├── borders/                  # Border effects library
│   ├── base.css              # CSS vars, @property, keyframes, .border-effect
│   ├── effects/              # 11 effect CSS files + barrel
│   │   ├── rainbow.css       # Rotating conic gradient
│   │   ├── light-trail.css   # Single chasing light
│   │   ├── pulse.css         # Breathing glow
│   │   ├── gradient.css      # Shifting diagonal gradient
│   │   ├── shimmer.css       # Silver streak
│   │   ├── dots.css          # Marching ants
│   │   ├── dual-spin.css     # Two-color chase
│   │   ├── neon.css          # Neon tube flicker
│   │   ├── ripple.css        # Three rotating waves
│   │   ├── corner-highlight.css  # Cyberpunk corner glow
│   │   ├── dash-chase.css    # Racing stripe dashes
│   │   ├── index.css         # @import barrel (for CSS consumers)
│   │   └── index.ts          # import barrel (for TS/bundler consumers)
│   ├── modifiers/            # Speed, glow, hover-only, thick, reverse
│   │   ├── index.css
│   │   └── index.ts
│   └── index.ts              # Master barrel
├── text/                     # Text effects library
│   ├── base.css              # CSS vars, keyframes, .text-effect
│   ├── effects/              # 3 effect CSS files + barrel
│   │   ├── typewriter.css    # Typing animation
│   │   ├── reveal-up.css     # Slide-up reveal
│   │   ├── glitch.css        # Digital distortion
│   │   ├── index.css
│   │   └── index.ts
│   ├── modifiers/            # Glow, gradient, speed, delays
│   │   ├── index.css
│   │   └── index.ts
│   └── index.ts              # Master barrel
├── react/                    # React integration
│   └── hooks/
│       ├── useAnimateOnScroll.ts       # Single element
│       └── index.ts                    # Barrel export
└── index.ts                  # Root entry — imports borders + text, exports React hooks
```

## Tooling

| Tool                                            | Purpose                        |
| ----------------------------------------------- | ------------------------------ |
| **Bun**                                         | Package manager and runtime    |
| **Prettier**                                    | Code formatting                |
| **ESLint** (`@eslint/js` + `typescript-eslint`) | Linting                        |
| **TypeScript**                                  | Type checking (`tsc --noEmit`) |

Build tooling (tsup or Vite library mode) will be added when we need compiled output for npm publishing.

## Design Decisions

### CSS-first, thin framework wrappers

The core is pure CSS with CSS custom properties for configuration. Framework wrappers (React, Vue, Angular) are thin layers that apply the right CSS classes and pass through props. This avoids framework lock-in and keeps the bundle small.

### Multi-class composition over single classes

Effects and modifiers are separate CSS classes composed together (e.g. `border-effect border-rainbow border-hover-only border-glow`). This avoids combinatorial explosion (11 effects × 6 modifiers = 66 combinations vs thousands with single classes) and makes extending the library trivial — a new modifier is one CSS file.

### Namespaced class names and CSS variables

- Border classes: `.border-effect`, `.border-rainbow`, `.border-hover-only`, etc.
- Text classes: `.text-effect`, `.text-typewriter`, `.text-glow`, etc.
- Border CSS vars: `--border-effect-speed`, `--border-effect-accent`, etc.
- Text CSS vars: `--text-effect-speed`, `--text-effect-chars`, etc.

This prevents collisions when both libraries are used on the same page.

## Roadmap

### Phase 1 — Foundation (current)

- [x] Border effects (11 effects + modifiers)
- [x] Text effects (3 effects + modifiers)
- [x] React scroll-trigger hooks
- [x] Project structure under `src/`
- [x] Lint, format, typecheck scripts
- [x] MIT License
- [x] AGENTS.md for AI tooling
- [ ] `.is-animated` trigger for text effects (built-in JS, not just hook)
- [ ] `prefers-reduced-motion` support
- [ ] First git commit

### Phase 2 — Package & Publish

- [ ] Build step (tsup or Vite library mode)
- [ ] Bundle CSS to single `dist/styles.css`
- [ ] `package.json` exports field for multi-entry
- [ ] npm publish (`knocking-borders`)
- [ ] Bundle size tracking (bundlephobia)

### Phase 3 — Framework Wrappers

- [ ] React `<KnockingBorder effect="pulse" glow />` component
- [ ] React `<KnockingText effect="typewriter" />` component
- [ ] Vue composables and components
- [ ] Angular directive (secondary — may be separate package)

### Phase 4 — Docs & Ecosystem

- [ ] GitHub Pages documentation site (Vitepress)
- [ ] Interactive demo/playground
- [ ] Tailwind CSS plugin
- [ ] Changesets for versioning

## Questions & Decisions

1. **CSS approach**: Pure CSS (no preprocessor)
2. **Animations**: CSS `@keyframes` + `@property` (GPU-accelerated)
3. **Theming**: CSS custom properties for all configurable values
4. **React version**: React 17+ (peer dependency, optional)
5. **Package manager**: Bun
6. **Build tool**: TBD (Vite library mode preferred per prior experience)
7. **`@property` browser caveat**: Chromium-only. Acceptable for a v0 library; Firefox/Safari degrade gracefully (animations jump instead of interpolate).
