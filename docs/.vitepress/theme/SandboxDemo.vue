<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gradientPresets, glitchPresets, glowPresets } from 'bortx/text';

// ========================================
// Border State
// ========================================
const borderEffect = ref('border-rainbow');
const activeBorderModifiers = ref<string[]>([]);
const borderModOpen = ref(false);
const borderEffectOpen = ref(false);

const proEffects = [
  { value: 'border-rainbow', label: 'Rainbow' },
  { value: 'border-light-trail', label: 'Light Trail' },
  { value: 'border-pulse', label: 'Pulse' },
  { value: 'border-gradient', label: 'Gradient' },
  { value: 'border-shimmer', label: 'Shimmer' },
  { value: 'border-dots', label: 'Dots' },
  { value: 'border-dual-spin', label: 'Dual Spin' },
  { value: 'border-neon', label: 'Neon' },
  { value: 'border-ripple', label: 'Ripple' },
  { value: 'border-corner-highlight', label: 'Corner Highlight' },
  { value: 'border-dash-chase', label: 'Dash Chase' },
];

const proModifiers = [
  { value: 'border-hover-only', label: 'Hover Only' },
  { value: 'border-glow', label: 'Glow' },
  { value: 'border-slow', label: 'Slow' },
  { value: 'border-fast', label: 'Fast' },
  { value: 'border-thick', label: 'Thick' },
  { value: 'border-reverse', label: 'Reverse' },
];

const borderEffects = computed(() => proEffects);
const borderModifiers = computed(() => proModifiers);

const borderBaseClass = computed(() => 'border-effect');

const borderClasses = computed(() =>
  [
    borderBaseClass.value,
    borderEffect.value,
    ...activeBorderModifiers.value,
  ].join(' ')
);

const activeBorderChips = computed(() => {
  return activeBorderModifiers.value.map(
    v => proModifiers.find(m => m.value === v)?.label ?? v
  );
});

const availableBorderMods = computed(() =>
  borderModifiers.value.filter(
    m => !activeBorderModifiers.value.includes(m.value)
  )
);

const borderEffectLabel = computed(
  () =>
    borderEffects.value.find(e => e.value === borderEffect.value)?.label ?? ''
);

function selectBorderEffect(value: string) {
  borderEffect.value = value;
  borderEffectOpen.value = false;
}

function toggleBorderModifier(value: string) {
  const idx = activeBorderModifiers.value.indexOf(value);
  if (idx >= 0) {
    activeBorderModifiers.value.splice(idx, 1);
  } else {
    activeBorderModifiers.value.push(value);
  }
}

function removeBorderModifier(value: string) {
  const idx = activeBorderModifiers.value.indexOf(value);
  if (idx >= 0) activeBorderModifiers.value.splice(idx, 1);
}

// ========================================
// Text State
// ========================================
const textEffect = ref('');
const activeTextModifiers = ref<string[]>([]);
const textModOpen = ref(false);
const textEffectOpen = ref(false);
const textContent = ref('Bortx ');
const textKey = ref(0);

const textEffects = [
  { value: '', label: 'None' },
  { value: 'text-typewriter', label: 'Typewriter' },
  { value: 'text-glitch', label: 'Glitch' },
  { value: 'text-reveal-up', label: 'Reveal Up' },
  { value: 'text-reveal-down', label: 'Reveal Down' },
  { value: 'text-reveal-left', label: 'Reveal Left' },
  { value: 'text-reveal-right', label: 'Reveal Right' },
];

const textModifiers = [
  { value: 'text-glow', label: 'Glow' },
  { value: 'text-glow-pulse', label: 'Glow Pulse' },
  { value: 'text-glow-intense', label: 'Intense Glow' },
  { value: 'text-gradient', label: 'Gradient' },
  { value: 'text-gradient-animated', label: 'Gradient Animated' },
  { value: 'text-gradient-rainbow', label: 'Gradient Rainbow' },
  { value: 'text-slow', label: 'Slow' },
  { value: 'text-fast', label: 'Fast' },
  { value: 'text-shadow-depth', label: 'Shadow Depth' },
  { value: 'text-typewriter-loop', label: 'Loop' },
  { value: 'text-typewriter-no-cursor', label: 'No Cursor' },
  { value: 'text-glitch-intense', label: 'Intense Glitch' },
  { value: 'text-glitch-subtle', label: 'Subtle Glitch' },
];

const textClasses = computed(() => {
  if (!textEffect.value) return '';
  return [
    'text-effect',
    textEffect.value,
    'is-animated',
    ...activeTextModifiers.value,
    ...activeColorPresets.value,
  ].join(' ');
});

const textEffectLabel = computed(
  () => textEffects.find(e => e.value === textEffect.value)?.label ?? 'None'
);

const activeTextChips = computed(() => {
  return activeTextModifiers.value.map(
    v => textModifiers.find(m => m.value === v)?.label ?? v
  );
});

const availableTextMods = computed(() =>
  textModifiers.filter(m => !activeTextModifiers.value.includes(m.value))
);

const computedChars = computed(() => textContent.value.length);

// ========================================
// Color Presets
// ========================================
const activeColorPresets = ref<string[]>([]);

const showGradientColors = computed(() =>
  activeTextModifiers.value.some(m =>
    [
      'text-gradient',
      'text-gradient-animated',
      'text-gradient-rainbow',
    ].includes(m)
  )
);

const showGlitchColors = computed(() => textEffect.value === 'text-glitch');

const showGlowColors = computed(() =>
  activeTextModifiers.value.some(m =>
    ['text-glow', 'text-glow-pulse', 'text-glow-intense'].includes(m)
  )
);

function toggleColorPreset(className: string) {
  const categories = [
    gradientPresets.map(p => p.class),
    glitchPresets.map(p => p.class),
    glowPresets.map(p => p.class),
  ];

  if (activeColorPresets.value.includes(className)) {
    activeColorPresets.value = activeColorPresets.value.filter(
      c => c !== className
    );
    return;
  }

  // Remove any other preset in the same category
  for (const cat of categories) {
    if (cat.includes(className)) {
      activeColorPresets.value = activeColorPresets.value.filter(
        c => !cat.includes(c)
      );
      break;
    }
  }

  activeColorPresets.value = [...activeColorPresets.value, className];
}

function selectTextEffect(value: string) {
  textEffect.value = value;
  textKey.value++;
  activeTextModifiers.value = [];
  activeColorPresets.value = [];
  textEffectOpen.value = false;
}

function toggleTextModifier(value: string) {
  const idx = activeTextModifiers.value.indexOf(value);
  if (idx >= 0) {
    activeTextModifiers.value.splice(idx, 1);
  } else {
    activeTextModifiers.value.push(value);
  }
}

function removeTextModifier(value: string) {
  const idx = activeTextModifiers.value.indexOf(value);
  if (idx >= 0) activeTextModifiers.value.splice(idx, 1);
}

function replayText() {
  textKey.value++;
}

// ========================================
// Dropdown management
// ========================================
function closeAllDropdowns() {
  borderModOpen.value = false;
  borderEffectOpen.value = false;
  textModOpen.value = false;
  textEffectOpen.value = false;
}

function onBackdropClick() {
  closeAllDropdowns();
}

function toggleBorderEffect() {
  closeAllDropdowns();
  borderEffectOpen.value = !borderEffectOpen.value;
}

function toggleBorderMod() {
  closeAllDropdowns();
  borderModOpen.value = !borderModOpen.value;
}

function toggleTextEffect() {
  closeAllDropdowns();
  textEffectOpen.value = !textEffectOpen.value;
}

function toggleTextMod() {
  closeAllDropdowns();
  textModOpen.value = !textModOpen.value;
}

// Keyboard: Escape closes dropdowns
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeAllDropdowns();
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div class="sandbox" @click.self="onBackdropClick">
    <!-- Backdrop overlay for dropdown dismissal -->
    <div
      v-if="borderEffectOpen || borderModOpen || textEffectOpen || textModOpen"
      class="dropdown-backdrop"
      @click="onBackdropClick"
    />

    <!-- ============================================ -->
    <!-- Controls Row -->
    <!-- ============================================ -->
    <div class="controls-row">
      <!-- Border Controls -->
      <div class="controls-group border-controls">
        <span class="group-label">Border</span>

        <!-- Effect dropdown -->
        <div class="dropdown" :class="{ open: borderEffectOpen }">
          <button
            class="dropdown-trigger"
            aria-haspopup="listbox"
            :aria-expanded="borderEffectOpen"
            @click.stop="toggleBorderEffect"
          >
            {{ borderEffectLabel }}
            <span class="chevron">&#9662;</span>
          </button>
          <div v-if="borderEffectOpen" class="dropdown-menu" role="listbox">
            <div
              v-for="e in borderEffects"
              :key="e.value"
              class="dropdown-item"
              role="option"
              :aria-selected="e.value === borderEffect"
              :class="{ selected: e.value === borderEffect }"
              tabindex="0"
              @click.stop="selectBorderEffect(e.value)"
              @keydown.enter.prevent="selectBorderEffect(e.value)"
              @keydown.space.prevent="selectBorderEffect(e.value)"
            >
              {{ e.label }}
            </div>
          </div>
        </div>

        <!-- Modifiers -->
        <div class="mod-controls">
          <div v-if="activeBorderModifiers.length" class="active-chips">
            <span
              v-for="mod in activeBorderModifiers"
              :key="mod"
              class="chip"
              @click.stop="removeBorderModifier(mod)"
            >
              {{ activeBorderChips[activeBorderModifiers.indexOf(mod)] }}
              <span class="chip-remove">&times;</span>
            </span>
          </div>

          <div class="dropdown" :class="{ open: borderModOpen }">
            <button
              class="dropdown-trigger add-trigger"
              aria-haspopup="listbox"
              :aria-expanded="borderModOpen"
              @click.stop="toggleBorderMod"
              :disabled="!availableBorderMods.length"
            >
              + Modifier
              <span class="chevron">&#9662;</span>
            </button>
            <div v-if="borderModOpen" class="dropdown-menu" role="listbox">
              <div
                v-for="m in availableBorderMods"
                :key="m.value"
                class="dropdown-item"
                role="option"
                tabindex="0"
                @click.stop="toggleBorderModifier(m.value)"
                @keydown.enter.prevent="toggleBorderModifier(m.value)"
                @keydown.space.prevent="toggleBorderModifier(m.value)"
              >
                {{ m.label }}
              </div>
              <div
                v-if="!availableBorderMods.length"
                class="dropdown-item empty"
              >
                All modifiers active
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Text Controls -->
      <div class="controls-group text-controls">
        <span class="group-label">Text</span>

        <!-- Replay button -->
        <button
          v-if="textEffect"
          class="replay-btn"
          title="Replay animation"
          @click="replayText"
        >
          &#x21bb; Replay
        </button>

        <!-- Effect dropdown -->
        <div class="dropdown" :class="{ open: textEffectOpen }">
          <button
            class="dropdown-trigger"
            aria-haspopup="listbox"
            :aria-expanded="textEffectOpen"
            @click.stop="toggleTextEffect"
          >
            {{ textEffectLabel }}
            <span class="chevron">&#9662;</span>
          </button>
          <div v-if="textEffectOpen" class="dropdown-menu" role="listbox">
            <div
              v-for="e in textEffects"
              :key="e.value"
              class="dropdown-item"
              role="option"
              :aria-selected="e.value === textEffect"
              :class="{ selected: e.value === textEffect }"
              tabindex="0"
              @click.stop="selectTextEffect(e.value)"
              @keydown.enter.prevent="selectTextEffect(e.value)"
              @keydown.space.prevent="selectTextEffect(e.value)"
            >
              {{ e.label }}
            </div>
          </div>
        </div>

        <!-- Text content input -->
        <label class="sr-only" for="sandbox-text-input">Text content</label>
        <input
          id="sandbox-text-input"
          v-model="textContent"
          class="text-input"
          placeholder="Text content..."
          maxlength="40"
        />

        <!-- Color Presets -->
        <div
          v-if="showGradientColors || showGlitchColors || showGlowColors"
          class="color-presets-section"
        >
          <!-- Gradient colors -->
          <div v-if="showGradientColors" class="color-preset-group">
            <span class="color-preset-label">Gradient</span>
            <button
              v-for="p in gradientPresets"
              :key="p.class"
              :class="{ active: activeColorPresets.includes(p.class) }"
              class="color-swatch"
              :style="{
                background: `linear-gradient(135deg, ${p.start}, ${p.end})`,
              }"
              :title="p.label"
              :aria-label="p.label"
              @click.stop="toggleColorPreset(p.class)"
            />
          </div>

          <!-- Glitch colors -->
          <div v-if="showGlitchColors" class="color-preset-group">
            <span class="color-preset-label">Glitch</span>
            <button
              v-for="p in glitchPresets"
              :key="p.class"
              :class="{ active: activeColorPresets.includes(p.class) }"
              class="color-swatch split-swatch"
              :title="p.label"
              :aria-label="p.label"
              @click.stop="toggleColorPreset(p.class)"
            >
              <span :style="{ background: p.color1 }" />
              <span :style="{ background: p.color2 }" />
            </button>
          </div>

          <!-- Glow colors -->
          <div v-if="showGlowColors" class="color-preset-group">
            <span class="color-preset-label">Glow</span>
            <button
              v-for="p in glowPresets"
              :key="p.class"
              :class="{ active: activeColorPresets.includes(p.class) }"
              class="color-swatch"
              :style="{ background: p.color }"
              :title="p.label"
              :aria-label="p.label"
              @click.stop="toggleColorPreset(p.class)"
            />
          </div>
        </div>

        <!-- Modifiers -->
        <div class="mod-controls">
          <div v-if="activeTextModifiers.length" class="active-chips">
            <span
              v-for="mod in activeTextModifiers"
              :key="mod"
              class="chip"
              @click.stop="removeTextModifier(mod)"
            >
              {{ activeTextChips[activeTextModifiers.indexOf(mod)] }}
              <span class="chip-remove">&times;</span>
            </span>
          </div>

          <div class="dropdown" :class="{ open: textModOpen }">
            <button
              class="dropdown-trigger add-trigger"
              aria-haspopup="listbox"
              :aria-expanded="textModOpen"
              @click.stop="toggleTextMod"
              :disabled="!textEffect || !availableTextMods.length"
            >
              + Modifier
              <span class="chevron">&#9662;</span>
            </button>
            <div v-if="textModOpen" class="dropdown-menu" role="listbox">
              <div
                v-for="m in availableTextMods"
                :key="m.value"
                class="dropdown-item"
                role="option"
                tabindex="0"
                @click.stop="toggleTextModifier(m.value)"
                @keydown.enter.prevent="toggleTextModifier(m.value)"
                @keydown.space.prevent="toggleTextModifier(m.value)"
              >
                {{ m.label }}
              </div>
              <div v-if="!availableTextMods.length" class="dropdown-item empty">
                All modifiers active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- Live Preview -->
    <!-- ============================================ -->
    <div class="preview-box">
      <div :class="borderClasses" class="preview-inner">
        <span
          v-if="textEffect"
          :key="textKey"
          :class="textClasses"
          :style="{
            '--text-effect-chars': computedChars,
          }"
          :data-text="textContent"
        >
          {{ textContent }}
        </span>
        <span v-else class="preview-placeholder">
          Select a text effect above
        </span>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- Active Classes -->
    <!-- ============================================ -->
    <div class="classes-section">
      <h3>Active Classes</h3>
      <div class="classes-grid">
        <div class="classes-box">
          <span class="classes-label">Border</span>
          <code>{{ borderClasses || '—' }}</code>
        </div>
        <div class="classes-box">
          <span class="classes-label">Text</span>
          <code>{{ textClasses || '—' }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================ */
/* Accessibility */
/* ============================================ */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ============================================ */
/* Sandbox Layout */
/* ============================================ */
.sandbox {
  position: relative;
  margin: 1.5rem 0;
}

.dropdown-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9;
}

/* ============================================ */
/* Controls Row */
/* ============================================ */
.controls-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.controls-group {
  flex: 1;
  min-width: 280px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.group-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
  min-width: 100%;
  margin-bottom: 0.2rem;
}

/* Mode tabs */
.mode-tabs {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.mode-tabs button {
  border: none;
  padding: 0.3rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: background 0.15s;
}

.mode-tabs button.active {
  background: var(--vp-c-brand);
  color: #fff;
}

.mode-hint {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

/* ============================================ */
/* Dropdown */
/* ============================================ */
.dropdown {
  position: relative;
  z-index: 10;
}

.dropdown.open {
  z-index: 11;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-trigger:hover {
  border-color: var(--vp-c-brand);
}

.add-trigger {
  border-style: dashed;
  color: var(--vp-c-brand);
}

.add-trigger:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

/* Replay button */
.replay-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.55rem;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.replay-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.chevron {
  font-size: 0.6rem;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 180px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  padding: 0.3rem 0;
  max-height: 240px;
  overflow-y: auto;
  z-index: 12;
}

.dropdown-item {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: background 0.1s;
}

.dropdown-item:hover {
  background: var(--vp-c-bg-soft);
}

.dropdown-item.selected {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.dropdown-item.empty {
  color: var(--vp-c-text-3);
  cursor: default;
}

/* ============================================ */
/* Active modifier chips */
/* ============================================ */
.mod-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.active-chips {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.72rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

.chip:hover {
  background: var(--vp-c-brand);
  color: #fff;
}

.chip-remove {
  font-weight: 700;
  font-size: 0.85rem;
  line-height: 1;
}

/* ============================================ */
/* Color Preset Buttons */
/* ============================================ */
.color-presets-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.3rem;
}

.color-preset-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.color-preset-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  margin-right: 0.2rem;
  white-space: nowrap;
}

.color-swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition:
    border-color 0.15s,
    transform 0.15s;
  flex-shrink: 0;
}

.color-swatch:hover {
  transform: scale(1.2);
  border-color: var(--vp-c-text-2);
}

.color-swatch.active {
  border-color: #fff;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
}

.split-swatch {
  display: flex;
  overflow: hidden;
  padding: 0;
}

.split-swatch span {
  flex: 1;
  height: 100%;
}

/* ============================================ */
/* Text input */
/* ============================================ */
.text-input {
  padding: 0.35rem 0.55rem;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  width: 150px;
}

.text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

/* ============================================ */
/* Preview Box */
/* ============================================ */
.preview-box {
  margin: 1rem 0 2rem;
}

.preview-inner {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.5rem;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  isolation: isolate;
}

.preview-placeholder {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

/* ============================================ */
/* Active Classes Section */
/* ============================================ */
.classes-section {
  margin-top: 1rem;
}

.classes-section h3 {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.classes-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.classes-box {
  flex: 1;
  min-width: 200px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
}

.classes-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.classes-box code {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  word-break: break-all;
}
</style>
