<script setup lang="ts">
import { initTextAnimations } from 'bortx/text';
import { onMounted, onUnmounted } from 'vue';

let cleanup: (() => void) | null = null;

onMounted(() => {
  cleanup = initTextAnimations({ threshold: 0.1, rootMargin: '100px' });
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<style>
.demo-section {
  margin: 2.5rem 0;
}
.demo-section h2 {
  margin-bottom: 1rem;
}
.demo-section h3 {
  margin: 1rem 0 0.5rem;
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.demo-text {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  min-width: 220px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.demo-text .label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #ffcc0d;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.demo-text h2{
  border-top: none
}
.demo-text h2,
.demo-text h3,
.demo-text p {
  margin: 0;
  color: #eee;
}
.code-ref {
  font-size: 0.75rem;
  color: white;
  font-family: monospace;
  margin-top: 0.5rem;
}
</style>

# Text Effects Demo

Text animations are scroll-triggered — **scroll down** to see them animate.

---

<div class="demo-section">

## Typewriter

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Default</span>
    <h2
      class="text-effect text-typewriter"
      style="--text-effect-chars: 14; --text-effect-speed: 2.5s;"
    >
      Hello, World!
    </h2>
    <span class="code-ref">.text-typewriter</span>
  </div>

  <div class="demo-text">
    <span class="label">With Glow</span>
    <h2
      class="text-effect text-typewriter text-glow"
      style="--text-effect-chars: 20; --text-effect-speed: 3s; --text-effect-glow-color: #8b52fd;"
    >
      Glowing Typewriter
    </h2>
    <span class="code-ref">.text-typewriter .text-glow</span>
  </div>

  <div class="demo-text">
    <span class="label">No Cursor Loop</span>
    <h2
      class="text-effect text-typewriter text-typewriter-loop text-glow-pulse"
      style="--text-effect-chars: 6; --text-effect-speed: 2s; --text-effect-glow-color: #00ffff;"
    >
      Loop..
    </h2>
    <span class="code-ref">.text-typewriter-loop .text-glow-pulse</span>
  </div>
</div>

</div>

---

<div class="demo-section">

## Glitch

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Default</span>
    <h2
      class="text-effect text-glitch"
      style="--text-effect-speed: 3s;"
    >
      Full Stack Developer
    </h2>
    <span class="code-ref">.text-glitch</span>
  </div>

  <div class="demo-text">
    <span class="label">Custom Colors</span>
    <h2
      class="text-effect text-glitch text-glow"
      style="--text-effect-glitch-color-1: #ff00ff; --text-effect-glitch-color-2: #00ff00; --text-effect-glow-color: #ff00ff; --text-effect-glow-intensity: 6px;"
    >
      Cyber Punk
    </h2>
    <span class="code-ref">.text-glitch .text-glow</span>
  </div>

  <div class="demo-text">
    <span class="label">Intense (with data-text)</span>
    <h2
      class="text-effect text-glitch-intense text-glow"
      data-text="SYSTEM ERROR"
      style="--text-effect-glitch-color-1: #ff0000; --text-effect-glitch-color-2: #00ffff; --text-effect-glow-color: #ff0000;"
    >
      SYSTEM ERROR
    </h2>
    <span class="code-ref">.text-glitch-intense</span>
  </div>

  <div class="demo-text">
    <span class="label">Subtle</span>
    <h2
      class="text-effect text-glitch-subtle text-glow"
      style="--text-effect-glow-color: #8b52fd; --text-effect-glow-intensity: 4px;"
    >
      Subtle Glitch
    </h2>
    <span class="code-ref">.text-glitch-subtle .text-glow</span>
  </div>
</div>

</div>

---

<div class="demo-section">

## Reveal

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Up</span>
    <h2 class="text-effect text-reveal-up" style="--text-effect-speed: 0.8s;">
      Revealed Up
    </h2>
    <span class="code-ref">.text-reveal-up</span>
  </div>

  <div class="demo-text">
    <span class="label">Down</span>
    <h2 class="text-effect text-reveal-down" style="--text-effect-speed: 0.8s;">
      Revealed Down
    </h2>
    <span class="code-ref">.text-reveal-down</span>
  </div>

  <div class="demo-text">
    <span class="label">Left</span>
    <h2 class="text-effect text-reveal-left" style="--text-effect-speed: 0.8s;">
      Revealed Left
    </h2>
    <span class="code-ref">.text-reveal-left</span>
  </div>

  <div class="demo-text">
    <span class="label">Right</span>
    <h2 class="text-effect text-reveal-right" style="--text-effect-speed: 0.8s;">
      Revealed Right
    </h2>
    <span class="code-ref">.text-reveal-right</span>
  </div>
</div>

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Up + Gradient</span>
    <h2 class="text-effect text-reveal-up text-gradient" style="--text-effect-speed: 0.8s;">
      Gradient Reveal
    </h2>
    <span class="code-ref">.text-reveal-up .text-gradient</span>
  </div>

  <div class="demo-text">
    <span class="label">Down + Rainbow</span>
    <h2 class="text-effect text-reveal-down text-gradient-rainbow" style="--text-effect-speed: 0.8s;">
      Rainbow Down
    </h2>
    <span class="code-ref">.text-reveal-down .text-gradient-rainbow</span>
  </div>

  <div class="demo-text">
    <span class="label">Left + Glow</span>
    <h2 class="text-effect text-reveal-left text-glow" style="--text-effect-speed: 0.8s; --text-effect-glow-color: #8b52fd;">
      Glow Left
    </h2>
    <span class="code-ref">.text-reveal-left .text-glow</span>
  </div>

  <div class="demo-text">
    <span class="label">Right + Gradient Animated</span>
    <h2 class="text-effect text-reveal-right text-gradient-animated" style="--text-effect-speed: 0.8s;">
      Animated Gradient Right
    </h2>
    <span class="code-ref">.text-reveal-right .text-gradient-animated</span>
  </div>
</div>

</div>

---

<div class="demo-section">

## Modifier Combos

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Glow + Pulse</span>
    <h2 class="text-effect text-typewriter text-glow-pulse" style="--text-effect-chars: 15; --text-effect-speed: 3s; --text-effect-glow-color: #ff9f40;">
      Pulsing Glow
    </h2>
    <span class="code-ref">.text-glow-pulse</span>
  </div>

  <div class="demo-text">
    <span class="label">Intense Glow</span>
    <h2 class="text-effect text-typewriter text-glow-intense" style="--text-effect-chars: 13; --text-effect-speed: 3s; --text-effect-glow-color: #00ffff; --text-effect-glow-intensity: 15px;">
      Intense Glow
    </h2>
    <span class="code-ref">.text-glow-intense</span>
  </div>

  <div class="demo-text">
    <span class="label">Gradient Animated</span>
    <h2 class="text-effect text-typewriter text-gradient-animated" style="--text-effect-chars: 17; --text-effect-speed: 2.5s; --text-effect-gradient-start: #ff00ff; --text-effect-gradient-end: #ff9f40;">
      Animated Gradient
    </h2>
    <span class="code-ref">.text-gradient-animated</span>
  </div>
</div>

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Fast + Delay-2</span>
    <h2 class="text-effect text-reveal-up text-fast text-delay-2 text-gradient" style="--text-effect-gradient-start: #8b52fd; --text-effect-gradient-end: #00ffff;">
      Fast + Delayed
    </h2>
    <span class="code-ref">.text-fast .text-delay-2</span>
  </div>

  <div class="demo-text">
    <span class="label">Slow + Delay-4</span>
    <h2 class="text-effect text-reveal-up text-slow text-delay-4 text-glow" style="--text-effect-glow-color: #8b52fd;">
      Slow Reveal
    </h2>
    <span class="code-ref">.text-slow .text-delay-4</span>
  </div>

  <div class="demo-text">
    <span class="label">Shadow Depth</span>
    <h2 class="text-effect text-reveal-up text-shadow-depth" style="--text-effect-speed: 0.6s;">
      3D Shadow
    </h2>
    <span class="code-ref">.text-shadow-depth</span>
  </div>
</div>

</div>

---

<div class="demo-section">

## Color Presets

Use preset CSS classes instead of inline styles for quick color theming.

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Sunset Gradient</span>
    <h2 class="text-effect text-typewriter text-gradient-animated text-colors-sunset" style="--text-effect-chars: 7; --text-effect-speed: 2.5s;">
      Sunset
    </h2>
    <span class="code-ref">.text-colors-sunset</span>
  </div>

  <div class="demo-text">
    <span class="label">Ocean Gradient</span>
    <h2 class="text-effect text-typewriter text-gradient text-colors-ocean" style="--text-effect-chars: 5; --text-effect-speed: 2s;">
      Ocean
    </h2>
    <span class="code-ref">.text-colors-ocean</span>
  </div>

  <div class="demo-text">
    <span class="label">Cyberpunk Gradient</span>
    <h2 class="text-effect text-reveal-up text-gradient-animated text-colors-cyberpunk" style="--text-effect-speed: 0.8s;">
      Cyberpunk
    </h2>
    <span class="code-ref">.text-colors-cyberpunk</span>
  </div>

  <div class="demo-text">
    <span class="label">Fire Gradient</span>
    <h2 class="text-effect text-reveal-down text-gradient-animated text-colors-fire" style="--text-effect-speed: 0.8s;">
      Fire
    </h2>
    <span class="code-ref">.text-colors-fire</span>
  </div>
</div>

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Error Glitch</span>
    <h2 class="text-effect text-glitch text-glow text-glitch-colors-error" style="--text-effect-glow-intensity: 6px; --text-effect-glow-color: #ff0000;">
      ERROR
    </h2>
    <span class="code-ref">.text-glitch-colors-error</span>
  </div>

  <div class="demo-text">
    <span class="label">Vaporwave Glitch</span>
    <h2 class="text-effect text-glitch text-glow text-glitch-colors-vaporwave" style="--text-effect-glow-intensity: 4px; --text-effect-glow-color: #ff71ce;">
      VAPOR
    </h2>
    <span class="code-ref">.text-glitch-colors-vaporwave</span>
  </div>

  <div class="demo-text">
    <span class="label">Matrix Glitch</span>
    <h2 class="text-effect text-glitch text-glow text-glitch-colors-matrix" style="--text-effect-glow-intensity: 4px; --text-effect-glow-color: #00ff00;">
      MATRIX
    </h2>
    <span class="code-ref">.text-glitch-colors-matrix</span>
  </div>

  <div class="demo-text">
    <span class="label">Neon Glitch Intense</span>
    <h2 class="text-effect text-glitch-intense text-glow text-glitch-colors-neon" data-text="NEON" style="--text-effect-glow-color: #ff00ff; --text-effect-glow-intensity: 6px;">
      NEON
    </h2>
    <span class="code-ref">.text-glitch-intense .text-glitch-colors-neon</span>
  </div>
</div>

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Purple Glow</span>
    <h2 class="text-effect text-typewriter text-glow text-glow-purple" style="--text-effect-chars: 11; --text-effect-speed: 2.5s;">
      Purple Glow
    </h2>
    <span class="code-ref">.text-glow-purple</span>
  </div>

  <div class="demo-text">
    <span class="label">Cyan Glow Pulse</span>
    <h2 class="text-effect text-typewriter text-glow-pulse text-glow-cyan" style="--text-effect-chars: 14; --text-effect-speed: 3s;">
      Cyan Glow Pulse
    </h2>
    <span class="code-ref">.text-glow-pulse .text-glow-cyan</span>
  </div>

  <div class="demo-text">
    <span class="label">Orange Intense Glow</span>
    <h2 class="text-effect text-reveal-up text-glow-intense text-glow-orange" style="--text-effect-speed: 0.8s;">
      Orange Intense
    </h2>
    <span class="code-ref">.text-glow-intense .text-glow-orange</span>
  </div>

  <div class="demo-text">
    <span class="label">Gold Glow</span>
    <h2 class="text-effect text-reveal-down text-glow text-glow-gold" style="--text-effect-speed: 0.8s; --text-effect-glow-intensity: 8px;">
      Gold Glow
    </h2>
    <span class="code-ref">.text-glow-gold</span>
  </div>
</div>

</div>
