# Bortx — Project Plan

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
│   ├── modifiers/            # Pro modifiers (hover-only, slow, fast, reverse)
│   │   ├── index.css
│   │   └── index.ts
│   ├── shared/               # Shared modifiers (.border-glow, .border-thick)
│   │   ├── modifiers.css
│   │   └── index.ts
│   └── index.ts              # Master barrel
├── text/                     # Text effects library
│   ├── base.css              # CSS vars, keyframes, .text-effect
│   ├── effects/              # Effect CSS files + barrels
│   │   ├── typewriter.css    # Typing animation
│   │   ├── glitch.css        # Digital distortion
│   │   ├── reveal/           # Reveal effects (shared base + 4 directions)
│   │   │   ├── base.css      # Container, word/letter, stagger
│   │   │   ├── reveal-up.css # Slide up
│   │   │   ├── reveal-down.css   # Slide down
│   │   │   ├── reveal-left.css   # Slide in from right
│   │   │   ├── reveal-right.css  # Slide in from left
│   │   │   ├── index.css
│   │   │   └── index.ts
│   │   ├── index.css
│   │   └── index.ts
│   ├── modifiers/            # Glow, gradient, speed, delays, color presets
│   │   ├── index.css
│   │   ├── index.ts
│   │   ├── color-presets.css # 24 CSS preset classes
│   │   └── color-presets.ts  # TypeScript types + metadata
│   ├── auto-animate.ts       # Vanilla IntersectionObserver trigger
│   ├── apply-config.ts       # JS config helper (applyTextConfig, applyColorPreset)
│   └── index.ts              # Master barrel
├── react/                    # React integration
│   └── hooks/
│       ├── useAnimateOnScroll.ts       # Scroll-triggered hooks (single + many)
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
| **Vitest**                                      | Unit testing (planned)         |
| **Playwright**                                  | Visual regression (planned)    |

Build tooling (tsup or Vite library mode) will be added when we need compiled output for npm publishing.

## Design Decisions

### CSS-first, thin framework wrappers

The core is pure CSS with CSS custom properties for configuration. Framework wrappers (React, Vue, Angular) are thin layers that apply the right CSS classes and pass through props. This avoids framework lock-in and keeps the bundle small.

### Multi-class composition over single classes

Effects and modifiers are separate CSS classes composed together (e.g. `border-effect border-rainbow border-hover-only border-glow`). This avoids combinatorial explosion (11 effects × 6 modifiers = 66 combinations vs thousands with single classes) and makes extending the library trivial — a new modifier is one CSS file.

### Hybrid configuration: Presets + CSS vars + JS helpers

Three layers of configuration, from simplest to most flexible:

1. **Color preset classes** (`.text-colors-sunset`, `.text-glow-purple`, etc.) — droppable CSS classes, no code needed
2. **CSS custom properties** (`--text-effect-gradient-start`, etc.) — inline styles or stylesheets, full control
3. **JS config helpers** (`applyTextConfig()`, `applyColorPreset()`) — programmatic configuration with TypeScript types

Inline styles always override class presets (higher specificity), so users can mix approaches.

### Namespaced class names and CSS variables

- Border classes: `.border-effect`, `.border-rainbow`, `.border-hover-only`, etc.
- Text classes: `.text-effect`, `.text-typewriter`, `.text-glow`, etc.
- Border CSS vars: `--border-effect-speed`, `--border-effect-accent`, etc.
- Text CSS vars: `--text-effect-speed`, `--text-effect-chars`, etc.

This prevents collisions when both libraries are used on the same page.

### Framework Compatibility

| Framework | Status                                                |
| --------- | ----------------------------------------------------- |
| **CSS core** | Framework-agnostic — works anywhere with class names |
| **React**    | First-class support via `useAnimateOnScroll` hooks  |
| **Vue**      | Use vanilla JS `initTextAnimations()` or manual `.is-animated` toggle; dedicated composable planned (Phase 3) |
| **Angular**  | Use vanilla JS trigger; directive planned (Phase 3) |
| **Tailwind** | Fully compatible — CSS classes work alongside Tailwind utilities; dedicated Tailwind plugin planned (Phase 4) |
| **Svelte / Solid / plain HTML** | Use vanilla JS trigger or manual class toggle |

## Roadmap

### Phase 1 — Foundation (current)

- [x] Border effects (11 effects + modifiers)
- [x] Shared modifiers (`.border-glow`, `.border-thick`)
- [x] Text effects (3 effects + modifiers)
- [x] Color presets (24 CSS classes: 10 gradient, 6 glitch, 8 glow)
- [x] JS config helpers (`applyTextConfig`, `applyColorPreset`)
- [x] Vanilla JS trigger (`initTextAnimations`)
- [x] React scroll-trigger hooks
- [x] Project structure under `src/`
- [x] Lint, format, typecheck scripts
- [x] MIT License
- [x] AGENTS.md for AI tooling
- [x] `.is-animated` trigger for text effects (built-in JS)
- [x] `prefers-reduced-motion` support
- [x] VitePress docs site (guide + demo pages)
- [x] Interactive sandbox page
- [x] First git commit
- [x] Verified border and text effects functionality
- [x] `package.json` exports field configured
- [x] `"files": ["src"]` set — npm/bun install pulls only library code, excludes docs
- [ ] Create `README.md` (GitHub landing page + npm package page)
- [ ] Create `CONTRIBUTING.md` (developer guide for PRs, forks, local dev setup)
- [ ] Finalize and polish documentation site structure (guide pages, demos, sandbox)
- [ ] Set up Vitest + initial tests (unit tests for JS helpers, auto-animate, hooks)
- [ ] Set up Playwright for visual regression testing of effects
- [ ] GitHub Actions CI/CD workflows:
  - Lint + typecheck + format check on PRs
  - Run tests on PRs
  - Build and deploy VitePress docs to GitHub Pages (on push to main)
- [ ] Add package.json metadata (keywords, repository, homepage, author)
- [ ] Update `tsconfig.json` as needed for build step compatibility
- [ ] Deploy documentation site to GitHub Pages via GitHub Actions

> **Gate for Phase 2**: All Phase 1 checkboxes above must be complete before moving to Phase 2. The docs site must be live on GitHub Pages and the library verified installable via local npm/bun link.

---

### Phase 2 — Package & Publish

- [ ] Build step (tsup or Vite library mode)
- [ ] Bundle CSS to single `dist/styles.css`
- [ ] Generate TypeScript declarations (`tsc --declaration`)
- [ ] `package.json` exports field finalize for multi-entry (already structured, may need `dist/` paths)
- [ ] npm publish (`bortx`)
- [ ] Bundle size tracking (bundlephobia)
- [ ] Semantic versioning strategy (changesets)

> After Phase 2, users can `bun add bortx` or `npm install bortx` and import effects directly.

---

### Phase 3 — Framework Wrappers

- [ ] React `<BortxBorder effect="pulse" glow />` component
- [ ] React `<BortxText effect="typewriter" />` component
- [ ] Vue composables (`useBortxText`, `useBortxBorder`)
- [ ] Vue components (`<BortxBorder>`, `<BortxText>`)
- [ ] Angular directive (secondary — may be separate package)

---

### Phase 4 — Ecosystem & Tooling

- [x] VitePress documentation site (Phase 1)
- [x] Interactive sandbox / playground (Phase 1)
- [ ] Tailwind CSS plugin (utility-first API for bortx effects)
- [ ] Changesets for versioning (automated changelog + version bumping)
- [ ] VSCode extension exploration (class autocomplete + CSS variable hints, similar to Tailwind CSS IntelliSense)
- [ ] Storybook or equivalent component demo catalog

---

### Future — Alt Effects & Broader Support

- [ ] Alt border effects (`.border-alt` — no `-webkit-mask` dependency, broader browser support for Firefox/Safari)
- [ ] Firefox/Safari `@property` polyfill or alternative animation approach
- [ ] Additional effect types (community-driven)

## Testing Strategy

| Layer            | Tool       | Scope                                                |
| ---------------- | ---------- | ---------------------------------------------------- |
| **Unit tests**   | Vitest     | JS helpers (`applyTextConfig`, `applyColorPreset`, `getPresetByClass`), React hooks, auto-animate |
| **Visual tests** | Playwright | Screenshot comparison of each effect + modifier combo across browsers |
| **Lint**         | ESLint     | All `.ts` files (CI gate)                            |
| **Type check**   | tsc        | `tsc --noEmit` on all `src/` (CI gate)               |
| **Format check** | Prettier   | `prettier --check` (CI gate)                         |

## CI/CD Pipelines (GitHub Actions)

| Workflow              | Trigger          | Actions                                           |
| --------------------- | ---------------- | ------------------------------------------------- |
| **PR Check**          | Pull request     | Lint, typecheck, format check, unit tests         |
| **Main CI**           | Push to `main`   | Lint, typecheck, format check, unit + visual tests |
| **Docs Deploy**       | Push to `main`   | Build VitePress → deploy to GitHub Pages          |
| **Release**           | Tag push / manual| Run tests, build, publish to npm                  |

## Deployment

### GitHub Pages

Docs site built via `bun run docs:build` (VitePress `build docs`), output in `docs/.vitepress/dist/`. This directory is gitignored — it will be built by CI and deployed via GitHub Actions (recommended VitePress approach: `peaceiris/actions-gh-pages` or `github-pages-deploy-action`).

### npm Package

Controlled by `"files": ["src"]` in `package.json` — only `src/` ships to npm. The `docs/`, `.github/`, and config files stay in the repo but never reach npm. This keeps the installed package lean (~source CSS + TS files only).

## Community & Contribution

- **LICENSE**: MIT — permissive, well-understood, easy for forks and commercial use
- **README.md** (to create): Project overview, quick start, feature grid, links to docs, contributing, license
- **CONTRIBUTING.md** (to create): Local dev setup (`bun install`, `bun run dev`), coding conventions, PR process, issue templates, testing expectations
- **AGENTS.md**: AI/agent development guide (exists)
- **GitHub Issues**: Templates TBD (bug report, feature request)
- **Pull Request template**: TBD

## Questions & Decisions

1. **CSS approach**: Pure CSS (no preprocessor)
2. **Animations**: CSS `@keyframes` + `@property` (GPU-accelerated)
3. **Theming**: CSS custom properties for all configurable values
4. **React version**: React 17+ (peer dependency, optional)
5. **Package manager**: Bun
6. **Build tool**: TBD (Vite library mode preferred per prior experience)
7. **`@property` browser caveat**: Chromium-only. Acceptable for a v0 library; Firefox/Safari degrade gracefully (animations jump instead of interpolate)
8. **Alt effects**: Deferred to future release — current priority is Chromium-first, cross-browser later
9. **Testing framework**: Vitest (matches Bun toolchain) + Playwright for visual regression
10. **CI/CD**: GitHub Actions (runs lint, typecheck, tests, docs deploy)
11. **GitHub Pages**: Deploy via Actions from `main` branch (docs/.vitepress/dist/ never committed)
