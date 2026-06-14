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

# Alt Border Effects

These effects use `.border-alt` and do **not** depend on the webkit-mask pattern.
Each effect owns its own rendering technique, making them free from pseudo-element
and mask constraints — broader browser support and easier to extend.

Head to the [Sandbox](/sandbox) to try effects with modifiers interactively.

<div class="demo-grid">

<div class="demo-card border-alt alt-glow-ring">
  <span class="label">Glow Ring</span>
  <span class="hint">Outer + inner box-shadow ring</span>
</div>

<div class="demo-card border-alt alt-glow-ring alt-hover-only">
  <span class="label">Glow Ring + Hover</span>
  <span class="hint">Hover to reveal</span>
</div>

</div>

## Alt Modifiers

| Modifier   | Class             | Description               |
| ---------- | ----------------- | ------------------------- |
| Hover Only | `.alt-hover-only` | Pause until hover         |
| Slow       | `.alt-slow`       | Slower transitions (5s)   |
| Fast       | `.alt-fast`       | Faster transitions (1.5s) |
| Reverse    | `.alt-reverse`    | Reverse direction         |

**Shared modifiers** (work with both pro and alt): `.border-glow`, `.border-thick`

See the [Sandbox](/sandbox) to try any combination.
