---
layout: home
hero:
  name: Bortx
  text: Professional Border & Text Animations.
  tagline: Pure CSS. Limitless combinations. One import, infinite compositions.
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
    details: Rainbow, pulse, shimmer, neon, ripple, dash-chase, and more. 4 pro modifiers + 2 shared modifiers — compose anything.
  - icon: ✍️
    title: 8 Text Effect Variants
    details: Typewriter, glitch (intense + subtle), and 4-direction reveal. 12 modifiers including glow, gradient, speed, delay, and depth.
  - icon: ⚛️
    title: React + Vanilla JS
    details: useAnimateOnScroll and useAnimateOnScrollMany for React. initTextAnimations() for vanilla JS. Scroll-triggered via IntersectionObserver.
  - icon: 🎨
    title: 24 Color Presets
    details: 10 gradient, 6 glitch, and 8 glow presets. Drop-in CSS classes — no inline styles needed. TypeScript metadata included.
  - icon: 🧩
    title: Multi-Class Composition
    details: No combinatorial explosion. Effects + modifiers = simple, predictable CSS. A new modifier is one file.
  - icon: 📦
    title: Zero Dependencies
    details: No runtime JS for the CSS core. The React hook is optional, tree-shakeable, and a peer dependency. Ships as raw CSS.
---

## Quick Start

```ts
// Import everything
import '@itsect3r/bortx';

// Or pick what you need
import '@itsect3r/bortx/borders';
import '@itsect3r/bortx/text';
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
