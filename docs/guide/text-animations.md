# Text Animations Documentation

## Overview

The text animation system has four layers:

1. **CSS Effects & Modifiers** (`src/text/`) — Pure CSS classes with CSS custom property configuration
2. **Color Presets** (`src/text/modifiers/color-presets.css`) — Drop-in CSS classes for quick color theming
3. **JS Config Helper** (`src/text/apply-config.ts`) — Programmatic configuration without inline styles
4. **Trigger System** — React hooks (`useAnimateOnScroll`) or vanilla JS (`initTextAnimations`) to add the `.is-animated` trigger class on viewport entry

Text animations are **paused/hidden by default**. Add `.is-animated` to trigger them — either via the provided helpers or manually.

---

## 1. Effects

### Base Requirements

- **Required Class**: `.text-effect` (base styles and CSS variable defaults)
- **Trigger Class**: `.is-animated` (un-pauses all animations)

### Typewriter (`.text-typewriter`)

Simulates typing with a blinking cursor. Uses `ch` units for accurate character width.

| Variant                      | Behavior                              |
| ---------------------------- | ------------------------------------- |
| (default)                    | Types once, cursor blinks             |
| `.text-typewriter-no-cursor` | Types once, no cursor                 |
| `.text-typewriter-loop`      | Types → un-types → repeats infinitely |

**Required variable**: `--text-effect-chars` (number of characters)

### Reveal (`.text-reveal-up` / `-down` / `-left` / `-right`)

Text slides into view with opacity fade. Supports per-word or per-letter staggering via container classes.

| Class                | Movement               |
| -------------------- | ---------------------- |
| `.text-reveal-up`    | Slides up from below   |
| `.text-reveal-down`  | Slides down from above |
| `.text-reveal-left`  | Slides in from right   |
| `.text-reveal-right` | Slides in from left    |

### Glitch (`.text-glitch`)

Digital distortion with color separation and position jitter.

| Variant                | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| (default)              | Moderate text-shadow jitter                                            |
| `.text-glitch-intense` | Pseudo-element slices via `clip-path` (`data-text` attribute required) |
| `.text-glitch-subtle`  | Slow, subdued distortion                                               |

---

## 2. Modifiers

Modifiers compose with any effect. Apply them alongside the effect class.

### Glow Modifiers

| Class                | Behavior                         |
| -------------------- | -------------------------------- |
| `.text-glow`         | Static two-layer `drop-shadow`   |
| `.text-glow-pulse`   | Animated pulsing glow (2s cycle) |
| `.text-glow-intense` | Four-layer static glow           |

Variables: `--text-effect-glow-color`, `--text-effect-glow-intensity`

### Gradient Modifiers

| Class                     | Behavior                                   |
| ------------------------- | ------------------------------------------ |
| `.text-gradient`          | Static two-color linear gradient           |
| `.text-gradient-animated` | Shifting gradient (3s cycle, 200% bg size) |
| `.text-gradient-rainbow`  | 8-color rainbow with shift (5s cycle)      |

Variables: `--text-effect-gradient-start`, `--text-effect-gradient-end`, `--text-effect-gradient-angle`

### Timing Modifiers

| Class                                   | Effect             |
| --------------------------------------- | ------------------ |
| `.text-slow`                            | 4s duration        |
| `.text-fast`                            | 1s duration        |
| `.text-delay-1` through `.text-delay-5` | 0.1s to 0.5s delay |

### Other Modifiers

| Class                        | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `.text-shadow-depth`         | 3-layer drop-shadow for a 3D stacked look            |
| `.text-typewriter-loop`      | Typewriter loops infinitely (alternate direction)    |
| `.text-typewriter-no-cursor` | Hide typewriter cursor                               |
| `.text-glitch-intense`       | Intense glitch variant (needs `data-text` attribute) |
| `.text-glitch-subtle`        | Subtle, slow glitch (5s cycle, 1px intensity)        |

---

## 3. Color Presets

Pre-defined CSS classes that set color-related CSS custom properties. No inline styles needed. Inline styles still override presets when both are used.

### Gradient Color Presets

Combine with `.text-gradient`, `.text-gradient-animated`, or `.text-gradient-rainbow`.

| Class                    | Colors                |
| ------------------------ | --------------------- |
| `.text-colors-sunset`    | `#ff9f40` → `#ff0000` |
| `.text-colors-ocean`     | `#00d4ff` → `#8b52fd` |
| `.text-colors-cyberpunk` | `#ff00ff` → `#00ffff` |
| `.text-colors-forest`    | `#00ff88` → `#00aa55` |
| `.text-colors-fire`      | `#ff6600` → `#ffcc00` |
| `.text-colors-twilight`  | `#8b52fd` → `#ff9f40` |
| `.text-colors-neon`      | `#00ff88` → `#00d4ff` |
| `.text-colors-candy`     | `#ff69b4` → `#ffd700` |
| `.text-colors-midnight`  | `#1a1a2e` → `#16213e` |
| `.text-colors-ember`     | `#e94560` → `#533483` |

```html
<h1
  class="text-effect text-typewriter text-gradient-animated text-colors-sunset"
>
  Hello World
</h1>
```

### Glitch Color Presets

Combine with `.text-glitch`, `.text-glitch-intense`, or `.text-glitch-subtle`.

| Class                           | Colors                |
| ------------------------------- | --------------------- |
| `.text-glitch-colors-error`     | `#ff0000` / `#00ffff` |
| `.text-glitch-colors-neon`      | `#ff00ff` / `#00ff00` |
| `.text-glitch-colors-matrix`    | `#00ff00` / `#003300` |
| `.text-glitch-colors-vaporwave` | `#ff71ce` / `#01cdfe` |
| `.text-glitch-colors-cyber`     | `#ff9f40` / `#8b52fd` |
| `.text-glitch-colors-toxic`     | `#39ff14` / `#ff6600` |

### Glow Color Presets

Combine with `.text-glow`, `.text-glow-pulse`, or `.text-glow-intense`.

| Class               | Color     |
| ------------------- | --------- |
| `.text-glow-purple` | `#8b52fd` |
| `.text-glow-cyan`   | `#00ffff` |
| `.text-glow-orange` | `#ff9f40` |
| `.text-glow-pink`   | `#ff69b4` |
| `.text-glow-green`  | `#00ff88` |
| `.text-glow-red`    | `#ff0000` |
| `.text-glow-gold`   | `#ffd700` |
| `.text-glow-white`  | `#ffffff` |

---

## 4. JS Configuration Helpers

Three approaches to configure text effects, from simplest to most flexible:

### A: Color Presets (CSS-only, simplest)

```html
<h1
  class="text-effect text-typewriter text-gradient-animated text-colors-sunset"
>
  Hello World
</h1>
```

### B: CSS Custom Properties (inline styles, full control)

```html
<h1
  class="text-effect text-glitch text-glow"
  style="--text-effect-glitch-color-1: #ff00ff; --text-effect-glow-color: #00ffff;"
>
  Cyber Punk
</h1>
```

### C: JS Helper (programmatic, type-safe)

```ts
import { applyTextConfig, applyColorPreset } from '@itsect3r/bortx/text';

const el = document.querySelector('.my-text')!;

applyTextConfig(el, {
  chars: 15,
  speed: '3s',
  gradient: ['#ff9f40', '#ff0000'],
  glowColor: '#00ffff',
  glowIntensity: '12px',
});

applyColorPreset(el, 'text-colors-sunset');
```

Available JS exports:

| Export                                              | Type     | Description                                                |
| --------------------------------------------------- | -------- | ---------------------------------------------------------- |
| `applyTextConfig(el, config)`                       | Function | Set CSS custom properties programmatically                 |
| `applyColorPreset(el, className)`                   | Function | Add a color preset class (removes same-category conflicts) |
| `initTextAnimations(options?)`                      | Function | Vanilla IntersectionObserver auto-trigger                  |
| `TextEffectConfig`                                  | Type     | TypeScript interface for config object                     |
| `GradientPreset` / `GlitchPreset` / `GlowPreset`    | Type     | Preset type definitions                                    |
| `gradientPresets` / `glitchPresets` / `glowPresets` | Array    | Preset metadata (class, label, colors)                     |
| `getPresetByClass(className)`                       | Function | Lookup preset metadata by class name                       |

---

## 5. CSS Variables Reference

All configurable custom properties:

```css
/* Timing */
--text-effect-speed: 2s; /* Animation duration */
--text-effect-delay: 0s; /* Animation delay */
--text-effect-speed-slow: 4s; /* Used by .text-slow */
--text-effect-speed-fast: 1s; /* Used by .text-fast */

/* Colors */
--text-effect-color: inherit; /* Base text color */
--text-effect-accent: #8b52fd; /* Accent color */
--text-effect-glow-color: currentColor;
--text-effect-glow-intensity: 10px;

/* Gradient */
--text-effect-gradient-start: #8b52fd;
--text-effect-gradient-end: #00ffff;
--text-effect-gradient-angle: 90deg;

/* Typewriter */
--text-effect-chars: 20;
--text-effect-cursor-width: 3px;
--text-effect-cursor-color: currentColor;

/* Glitch */
--text-effect-glitch-color-1: #ff0000;
--text-effect-glitch-color-2: #00ffff;
--text-effect-glitch-intensity: 2px;
```

---

## 6. Trigger System

### Vanilla JS (`initTextAnimations`)

```ts
import { initTextAnimations } from '@itsect3r/bortx/text';

// Auto-adds .is-animated when elements enter viewport
const cleanup = initTextAnimations({
  threshold: 0.1,
  rootMargin: '100px',
  triggerOnce: true,
});

// Stop observing when done
cleanup();
```

### React (`useAnimateOnScroll`)

```tsx
import { useAnimateOnScroll } from '@itsect3r/bortx/react';

function MyComponent() {
  const { ref } = useAnimateOnScroll({ threshold: 0.5, delay: 200 });

  return (
    <h1
      ref={ref}
      className="text-effect text-typewriter text-glow text-colors-sunset"
    >
      Welcome
    </h1>
  );
}
```

### React — Multiple Elements (`useAnimateOnScrollMany`)

```tsx
import { useAnimateOnScrollMany } from '@itsect3r/bortx/react';

function StaggeredReveal() {
  const words = ['Full', 'Stack', 'Developer'];
  const { refs, areAnimated } = useAnimateOnScrollMany(words.length, {}, 100);

  return (
    <h1 className="text-reveal-up-container">
      {words.map((word, i) => (
        <span
          key={word}
          ref={refs[i]}
          className={`text-reveal-up-word ${areAnimated[i] ? 'is-animated' : ''}`}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
```

### Manual Trigger

```html
<h1 class="text-effect text-reveal-up is-animated">Always visible</h1>
```

---

## 7. Complete Examples

### Sunset Gradient Typewriter

```tsx
const { ref } = useAnimateOnScroll({ threshold: 0.5 });
return (
  <h1
    ref={ref}
    className="text-effect text-typewriter text-gradient-animated text-colors-sunset"
    style={{ '--text-effect-chars': 17 } as React.CSSProperties}
  >
    Full Stack Developer
  </h1>
);
```

### Cyberpunk Glitch with Glow (JS helper)

```ts
import { applyTextConfig, applyColorPreset } from '@itsect3r/bortx/text';

const el = document.querySelector('.hero-title')!;
applyTextConfig(el, {
  glitchColors: ['#ff00ff', '#00ff00'],
  glowColor: '#ff00ff',
  glowIntensity: '6px',
});
el.className = 'text-effect text-glitch text-glow is-animated';
```

### 3D Shadow Reveal

```html
<h2 class="text-effect text-reveal-up text-shadow-depth text-fast text-delay-2">
  Slow Reveal
</h2>
```

---

## 8. Animation States

- **Before animation**: Element has classes but no `.is-animated` → animations paused/hidden
- **During animation**: Trigger system adds `.is-animated` → CSS animations run
- **After animation**: Element stays in final animated state (unless `triggerOnce: false`)

---

## 9. Performance & Accessibility

- Uses `IntersectionObserver` (no polling)
- CSS-only animations (GPU accelerated via `transform` and `filter`)
- Lazy loading: animations only start when elements are visible
- `prefers-reduced-motion: reduce` disables all animations and shows static text
- `forced-colors: active` strips gradient fills for readability
- Graceful degradation: non-supporting browsers show static text
