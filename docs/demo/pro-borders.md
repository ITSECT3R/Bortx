<script setup lang="ts">
import 'knocking-borders/borders';
</script>

<style>
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.demo-card {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #ccc;
  text-align: center;
  position: relative;
}
.demo-card .label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.demo-card .hint {
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.25rem;
}
</style>

# Pro Border Effects

These effects use the **webkit-mask** rendering pattern via `.border-effect`.
All 11 effects animate by default. Head to the [Sandbox](/sandbox) to mix effects
with modifiers interactively.

<div class="demo-grid">

<div class="demo-card border-effect border-rainbow">
  <span class="label">Rainbow</span>
  <span class="hint">Rotating full-spectrum gradient</span>
</div>

<div class="demo-card border-effect border-light-trail">
  <span class="label">Light Trail</span>
  <span class="hint">Single chasing light</span>
</div>

<div class="demo-card border-effect border-pulse">
  <span class="label">Pulse</span>
  <span class="hint">Breathing glow</span>
</div>

<div class="demo-card border-effect border-gradient">
  <span class="label">Gradient</span>
  <span class="hint">Shifting diagonal gradient</span>
</div>

<div class="demo-card border-effect border-shimmer">
  <span class="label">Shimmer</span>
  <span class="hint">Silver streak passing through</span>
</div>

<div class="demo-card border-effect border-dots">
  <span class="label">Dots</span>
  <span class="hint">Marching ants</span>
</div>

<div class="demo-card border-effect border-dual-spin">
  <span class="label">Dual Spin</span>
  <span class="hint">Two-color chase</span>
</div>

<div class="demo-card border-effect border-neon">
  <span class="label">Neon</span>
  <span class="hint">Neon tube flicker</span>
</div>

<div class="demo-card border-effect border-ripple">
  <span class="label">Ripple</span>
  <span class="hint">Three rotating waves</span>
</div>

<div class="demo-card border-effect border-corner-highlight">
  <span class="label">Corner Highlight</span>
  <span class="hint">Cyberpunk corner glow</span>
</div>

<div class="demo-card border-effect border-dash-chase">
  <span class="label">Dash Chase</span>
  <span class="hint">Racing stripe dashes</span>
</div>

</div>

## Pro Modifiers

| Modifier   | Class                | Description                  |
| ---------- | -------------------- | ---------------------------- |
| Hover Only | `.border-hover-only` | Pause animation until hover  |
| Glow       | `.border-glow`       | Add box-shadow glow (shared) |
| Slow       | `.border-slow`       | Slower animation (5s)        |
| Fast       | `.border-fast`       | Faster animation (1.5s)      |
| Thick      | `.border-thick`      | Thicker border (4px, shared) |
| Reverse    | `.border-reverse`    | Reverse animation direction  |

See the [Sandbox](/sandbox) to try any combination of effects and modifiers.
