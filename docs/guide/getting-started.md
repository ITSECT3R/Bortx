# Getting Started

## Installation

```bash
npm install @itsect3r/bortx
# or
bun add @itsect3r/bortx
# or
pnpm add @itsect3r/bortx
```

## Import

The library ships as raw CSS + TypeScript barrel files. Import what you need:

```ts
// Everything — borders, text, React hooks, vanilla JS trigger
import '@itsect3r/bortx';

// Just borders
import '@itsect3r/bortx/borders';

// Just text (CSS + vanilla JS trigger + JS helpers)
import '@itsect3r/bortx/text';

// Named JS exports from text module
import {
  initTextAnimations,
  applyTextConfig,
  applyColorPreset,
} from '@itsect3r/bortx/text';

// React hooks only (no CSS)
import {
  useAnimateOnScroll,
  useAnimateOnScrollMany,
} from '@itsect3r/bortx/react';

// Vanilla JS auto-animate trigger only (no React)
import { initTextAnimations } from '@itsect3r/bortx/text';
```

## Usage

### Border Effects

All border effects require the `.border-effect` base class plus an effect class:

```html
<div class="border-effect border-rainbow">Basic rainbow border</div>

<div class="border-effect border-pulse border-glow border-hover-only">
  Pulse + glow, only on hover
</div>

<div class="border-effect border-neon border-thick border-slow border-glow">
  Neon tube, thick, slow, with glow
</div>
```

Customize with CSS variables:

```html
<div
  class="border-effect border-rainbow"
  style="--border-effect-radius: 50px; --border-effect-accent: #ff00ff"
></div>
```

Border effects animate **by default**. Use `.border-hover-only` to pause until hover.

### Text Effects

Text effects require `.text-effect` base class, an effect class, and the `.is-animated` trigger class.

**Colors can be configured three ways — pick the approach that fits your use case:**

**1. Color preset classes (simplest, no inline styles):**

```html
<h1
  class="text-effect text-typewriter text-gradient-animated text-colors-sunset"
  style="--text-effect-chars: 13"
>
  Hello, World!
</h1>
```

Available presets: `.text-colors-sunset`, `.text-colors-ocean`, `.text-colors-cyberpunk`, `.text-glitch-colors-error`, `.text-glow-purple`, and more (see full docs).

**2. CSS custom properties (most flexible):**

```html
<h1
  class="text-effect text-glitch text-glow"
  style="--text-effect-glitch-color-1: #ff00ff; --text-effect-glow-color: #00ffff;"
>
  Cyber Punk
</h1>
```

**3. JS config helper (programmatic, type-safe):**

```ts
import { applyTextConfig } from '@itsect3r/bortx/text';

const el = document.querySelector('.hero-title')!;
applyTextConfig(el, {
  chars: 15,
  gradient: ['#ff9f40', '#ff0000'],
  glowColor: '#00ffff',
});
```

Text animations are **paused by default**. The `.is-animated` class triggers them. You can add this class manually or use one of the trigger methods:

**Method 1: React Hook**

```tsx
import { useAnimateOnScroll } from '@itsect3r/bortx/react';

function Heading() {
  const { ref } = useAnimateOnScroll();
  return (
    <h1
      ref={ref}
      className="text-effect text-typewriter text-glow"
      style={{ '--text-effect-chars': 13 } as React.CSSProperties}
    >
      Hello, World!
    </h1>
  );
}
```

**Method 2: Vanilla JS**

```ts
import { initTextAnimations } from '@itsect3r/bortx/text';

// Call once — watches all .text-effect elements
initTextAnimations();
```

**Method 3: Manual**

Add `.is-animated` class yourself — useful for button clicks, page load, etc.

```js
document.querySelector('.text-effect').classList.add('is-animated');
```

## CSS Variables

### Border Variables

| Variable                           | Default                 | Purpose                |
| ---------------------------------- | ----------------------- | ---------------------- |
| `--border-effect-speed`            | `3s`                    | Animation duration     |
| `--border-effect-thickness`        | `2px`                   | Border width           |
| `--border-effect-radius`           | `12px`                  | Border radius          |
| `--border-effect-color`            | `rgba(255,255,255,0.5)` | Static border color    |
| `--border-effect-accent`           | `#8b52fd`               | Primary effect color   |
| `--border-effect-accent-secondary` | `#00ffff`               | Secondary effect color |
| `--border-effect-intensity`        | `6px`                   | Glow blur radius       |

### Text Variables

| Variable                         | Default        | Purpose                        |
| -------------------------------- | -------------- | ------------------------------ |
| `--text-effect-speed`            | `2s`           | Animation duration             |
| `--text-effect-delay`            | `0s`           | Animation delay                |
| `--text-effect-chars`            | `20`           | Character count for typewriter |
| `--text-effect-accent`           | `#8b52fd`      | Accent color                   |
| `--text-effect-glow-color`       | `currentColor` | Glow color                     |
| `--text-effect-glow-intensity`   | `10px`         | Glow blur radius               |
| `--text-effect-gradient-start`   | `#8b52fd`      | Gradient start color           |
| `--text-effect-gradient-end`     | `#00ffff`      | Gradient end color             |
| `--text-effect-gradient-angle`   | `90deg`        | Gradient angle                 |
| `--text-effect-glitch-color-1`   | `#ff0000`      | Glitch color 1                 |
| `--text-effect-glitch-color-2`   | `#00ffff`      | Glitch color 2                 |
| `--text-effect-glitch-intensity` | `2px`          | Glitch distortion strength     |
| `--text-effect-cursor-width`     | `3px`          | Typewriter cursor width        |
| `--text-effect-cursor-color`     | `currentColor` | Typewriter cursor color        |

## Browser Support

The library uses CSS `@property` for smooth custom property animations. This is **Chromium-only** (Chrome, Edge, Opera). Firefox and Safari degrade gracefully — animations will jump instead of interpolate, but the effects still work.

## Framework Support

- **Core CSS**: Framework-agnostic, works anywhere you can add classes
- **React**: First-class hook for scroll-triggered text animations
- **Vue/Angular/Svelte**: Use the vanilla JS `initTextAnimations()` trigger or add `.is-animated` manually
- **Plain HTML**: Import CSS, add classes, call `initTextAnimations()`
