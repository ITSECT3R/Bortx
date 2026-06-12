<script setup lang="ts">
import { initTextAnimations } from 'knocking-borders/text';
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
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.demo-text h2,
.demo-text h3,
.demo-text p {
  margin: 0;
  color: #eee;
}
.code-ref {
  font-size: 0.75rem;
  color: #666;
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

## Reveal Up

<div class="demo-row">
  <div class="demo-text">
    <span class="label">Default</span>
    <h2 class="text-effect text-reveal-up" style="--text-effect-speed: 0.8s;">
      Revealed Text
    </h2>
    <span class="code-ref">.text-reveal-up</span>
  </div>

  <div class="demo-text">
    <span class="label">With Gradient</span>
    <h2 class="text-effect text-reveal-up text-gradient" style="--text-effect-speed: 0.8s;">
      Gradient Reveal
    </h2>
    <span class="code-ref">.text-reveal-up .text-gradient</span>
  </div>

  <div class="demo-text">
    <span class="label">With Rainbow Gradient</span>
    <h2 class="text-effect text-reveal-up text-gradient-rainbow" style="--text-effect-speed: 0.8s;">
      Rainbow Up
    </h2>
    <span class="code-ref">.text-reveal-up .text-gradient-rainbow</span>
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
