---
layout: home
hero:
  name: Knocking Borders
  text: CSS Border & Text Animations
  tagline: Framework-agnostic, pure CSS animations. One import, compose with classes.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Demos
      link: /demo/pro-borders
features:
  - icon: 🎨
    title: 11 Border Effects
    details: Rainbow, pulse, shimmer, neon, dots, ripple, corner highlights, and more. Compose with 6 modifiers for endless combinations.
  - icon: ✍️
    title: 3 Text Effects
    details: Typewriter, glitch, and reveal-up. Combine with glow, gradient, and speed modifiers. Scroll-triggered with IntersectionObserver.
  - icon: ⚛️
    title: React Hook Included
    details: useAnimateOnScroll and useAnimateOnScrollMany for effortless scroll-triggered text animations.
  - icon: 🧩
    title: Multi-Class Composition
    details: No combinatorial explosion. Effects + modifiers = simple, predictable CSS. A new modifier is one file.
  - icon: 🎛️
    title: CSS Custom Properties
    details: Configure speed, colors, thickness, glow intensity — all via CSS variables. No JS config objects.
  - icon: 📦
    title: Zero Dependencies
    details: No runtime JS for the CSS core. The React hook is optional and tree-shakeable. Ships as raw CSS.
---

## Quick Start

```bash
npm install knocking-borders
# or
bun add knocking-borders
```

```ts
// Import everything
import 'knocking-borders';

// Or pick what you need
import 'knocking-borders/borders';
import 'knocking-borders/text';
```

```html
<!-- Borders: base class + effect + modifiers -->
<div class="border-effect border-rainbow border-hover-only border-glow">
  Hover me
</div>

<!-- Text: base class + effect + trigger -->
<h1 class="text-effect text-typewriter" style="--text-effect-chars: 13">
  Hello, World!
</h1>
```
