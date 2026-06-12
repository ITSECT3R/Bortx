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
.combo-section {
  margin: 3rem 0 2rem;
}
.combo-section h2 {
  margin-bottom: 1rem;
}
.combo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.combo-item {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  min-width: 200px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  text-align: center;
  position: relative;
}
</style>

# Border Effects Demo

All effects animate by default. Hover over any card to see the `.border-hover-only` variant.

## All 11 Effects

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

## Hover-Only Variants

Add `.border-hover-only` to pause animations until hover.

<div class="demo-grid">

<div class="demo-card border-effect border-rainbow border-hover-only">
  <span class="label">Rainbow</span>
  <span class="hint">Hover me</span>
</div>

<div class="demo-card border-effect border-pulse border-hover-only border-glow">
  <span class="label">Pulse + Glow</span>
  <span class="hint">Hover me</span>
</div>

<div class="demo-card border-effect border-neon border-hover-only border-glow">
  <span class="label">Neon + Glow</span>
  <span class="hint">Hover me</span>
</div>

<div class="demo-card border-effect border-light-trail border-hover-only">
  <span class="label">Light Trail</span>
  <span class="hint">Hover me</span>
</div>

<div class="demo-card border-effect border-shimmer border-hover-only border-reverse">
  <span class="label">Shimmer + Reverse</span>
  <span class="hint">Hover me</span>
</div>

<div class="demo-card border-effect border-dots border-hover-only border-thick">
  <span class="label">Dots + Thick</span>
  <span class="hint">Hover me</span>
</div>

</div>

## Modifier Combos

<div class="combo-section">

### Speed Variants

<div class="combo-row">
  <div class="combo-item border-effect border-rainbow border-slow">
    <span class="label">Slow (5s)</span>
  </div>
  <div class="combo-item border-effect border-rainbow">
    <span class="label">Default (3s)</span>
  </div>
  <div class="combo-item border-effect border-rainbow border-fast">
    <span class="label">Fast (1.5s)</span>
  </div>
</div>

</div>

<div class="combo-section">

### Glow + Thick

<div class="combo-row">
  <div class="combo-item border-effect border-rainbow border-glow border-thick">
    <span class="label">Rainbow + Glow + Thick</span>
  </div>
  <div class="combo-item border-effect border-dual-spin border-glow border-thick">
    <span class="label">Dual Spin + Glow + Thick</span>
  </div>
  <div class="combo-item border-effect border-neon border-glow border-thick">
    <span class="label">Neon + Glow + Thick</span>
  </div>
</div>

</div>
