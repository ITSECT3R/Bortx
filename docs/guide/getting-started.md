# Getting Started

## Installation

```bash
# Coming soon — not yet published to npm
# npm install knocking-borders
# bun add knocking-borders

# For now, clone and import locally
import 'knocking-borders/borders';
import 'knocking-borders/text';
```

## Import

The library ships as raw CSS + TypeScript barrel files. Import what you need:

```ts
// Everything — borders, text, React hooks, vanilla JS trigger
import 'knocking-borders';

// Just borders
import 'knocking-borders/borders';

// Just text (CSS + vanilla JS trigger)
import 'knocking-borders/text';

// React hooks only (no CSS)
import { useAnimateOnScroll } from 'knocking-borders/react';

// Vanilla JS auto-animate trigger only (no React)
import { initTextAnimations } from 'knocking-borders/text';
```

## Usage

### Border Effects

All border effects require the `.border-effect` base class plus an effect class:

```html
<div class="border-effect border-rainbow">
  Basic rainbow border
</div>

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
>
</div>
```

Border effects animate **by default**. Use `.border-hover-only` to pause until hover.

### Text Effects

Text effects require `.text-effect` base class, an effect class, and the `.is-animated` trigger class:

```html
<h1 class="text-effect text-typewriter" style="--text-effect-chars: 13">
  Hello, World!
</h1>
```

Text animations are **paused by default**. The `.is-animated` class triggers them. You can add this class manually or use one of the trigger methods:

**Method 1: React Hook**

```tsx
import { useAnimateOnScroll } from 'knocking-borders/react';

function Heading() {
  const { ref } = useAnimateOnScroll();
  return (
    <h1 ref={ref} className="text-effect text-typewriter text-glow"
        style={{ '--text-effect-chars': 13 } as React.CSSProperties}>
      Hello, World!
    </h1>
  );
}
```

**Method 2: Vanilla JS**

```ts
import { initTextAnimations } from 'knocking-borders/text';

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

| Variable | Default | Purpose |
|---|---|---|
| `--border-effect-speed` | `3s` | Animation duration |
| `--border-effect-thickness` | `2px` | Border width |
| `--border-effect-radius` | `12px` | Border radius |
| `--border-effect-color` | `rgba(255,255,255,0.5)` | Static border color |
| `--border-effect-accent` | `#8b52fd` | Primary effect color |
| `--border-effect-accent-secondary` | `#00ffff` | Secondary effect color |
| `--border-effect-intensity` | `6px` | Glow blur radius |

### Text Variables

| Variable | Default | Purpose |
|---|---|---|
| `--text-effect-speed` | `2s` | Animation duration |
| `--text-effect-delay` | `0s` | Animation delay |
| `--text-effect-chars` | `20` | Character count for typewriter |
| `--text-effect-accent` | `#8b52fd` | Accent color |
| `--text-effect-glow-color` | `currentColor` | Glow color |
| `--text-effect-glow-intensity` | `10px` | Glow blur radius |

## Browser Support

The library uses CSS `@property` for smooth custom property animations. This is **Chromium-only** (Chrome, Edge, Opera). Firefox and Safari degrade gracefully — animations will jump instead of interpolate, but the effects still work.

## Framework Support

- **Core CSS**: Framework-agnostic, works anywhere you can add classes
- **React**: First-class hook for scroll-triggered text animations
- **Vue/Angular/Svelte**: Use the vanilla JS `initTextAnimations()` trigger or add `.is-animated` manually
- **Plain HTML**: Import CSS, add classes, call `initTextAnimations()`
