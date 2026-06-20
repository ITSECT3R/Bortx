# Bortx

Open-source CSS border & text animation library — pure CSS, framework-agnostic, 0 dependencies.

## Quick Start

```bash
npm install @itsect3r/bortx
# or
bun add @itsect3r/bortx
# or
pnpm add @itsect3r/bortx
```

```ts
// Import all effects (borders + text + helpers)
import '@itsect3r/bortx';

// Or pick what you need
import '@itsect3r/bortx/borders';
import '@itsect3r/bortx/text';
```

```html
<!-- Border effect -->
<div class="border-effect border-rainbow">Hover me</div>

<!-- Text effect (needs .is-animated triggered by JS) -->
<h1 class="text-effect text-typewriter is-animated">Hello, World!</h1>
```

## Features

### Border Effects (11)

`.border-rainbow` `.border-light-trail` `.border-pulse` `.border-gradient` `.border-shimmer` `.border-dots` `.border-dual-spin` `.border-neon` `.border-ripple` `.border-corner-highlight` `.border-dash-chase`

**Modifiers:** `.border-hover-only` `.border-slow` `.border-fast` `.border-reverse` `.border-glow` `.border-thick`

### Text Effects (3 + variants)

`.text-typewriter` — typing animation (`.text-typewriter-loop` `.text-typewriter-no-cursor`)
`.text-glitch` — digital distortion (`.text-glitch-intense` `.text-glitch-subtle`)
`.text-reveal-up` `.text-reveal-down` `.text-reveal-left` `.text-reveal-right`

**Modifiers:** `.text-glow` `.text-glow-pulse` `.text-glow-intense` `.text-gradient` `.text-gradient-animated` `.text-gradient-rainbow` `.text-slow` `.text-fast` `.text-delay-1…5` `.text-shadow-depth`

### Color Presets (24)

10 gradient presets, 6 glitch presets, 8 glow presets — all as drop-in CSS classes (`.text-colors-sunset`, `.text-glitch-colors-matrix`, `.text-glow-purple`, etc.)

### React Hooks

```tsx
import { useAnimateOnScroll } from '@itsect3r/bortx/react';

function Heading() {
  const { ref } = useAnimateOnScroll({ threshold: 0.2 });
  return (
    <h1 ref={ref} className="text-effect text-reveal-up">
      Full Stack Developer
    </h1>
  );
}
```

### Vanilla JS

```ts
import { initTextAnimations } from '@itsect3r/bortx/text';
initTextAnimations({ threshold: 0.2 }); // auto-triggers on scroll
```

### JS Config Helpers

```ts
import { applyTextConfig, applyColorPreset } from '@itsect3r/bortx/text';

const el = document.querySelector('.text-effect')!;
applyTextConfig(el, { chars: 12, speed: '3s', gradient: ['#ff0', '#f0f'] });
applyColorPreset(el, 'text-colors-cyberpunk');
```

## Import Map

| Path                             | What you get                                      |
| -------------------------------- | ------------------------------------------------- |
| `@itsect3r/bortx`                | CSS (borders + text) + vanilla JS helpers + types |
| `@itsect3r/bortx/borders`        | Border effects + modifiers CSS                    |
| `@itsect3r/bortx/borders/styles` | Border base CSS only                              |
| `@itsect3r/bortx/text`           | Text effects + modifiers CSS + JS helpers + types |
| `@itsect3r/bortx/text/styles`    | Text base CSS only                                |
| `@itsect3r/bortx/react`          | React hooks                                       |

## Framework Support

| Framework              | Support                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| **Plain HTML / CSS**   | First-class — use vanilla JS trigger or manual `.is-animated` toggle |
| **React**              | First-class via `useAnimateOnScroll` / `useAnimateOnScrollMany`      |
| **Vue / Svelte / etc** | Use vanilla JS `initTextAnimations()` or manual class toggle         |
| **Tailwind CSS**       | Fully compatible — CSS classes work alongside Tailwind utilities     |

## Browser Support

CSS `@property` is used for smooth interpolation — **Chromium** (Chrome, Edge, Opera, Brave). Firefox and Safari degrade gracefully (animations jump instead of interpolate). Cross-browser alt effects are planned for a future release.

## Documentation

Full docs at [bortx.ai](https://bortx.ai) — includes getting started guide, effect reference, live demos, and interactive sandbox.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local dev setup, coding conventions, and PR process.

## License

MIT © Bortx Contributors
