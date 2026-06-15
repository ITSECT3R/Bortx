// Border effects — import to load all border CSS and effects
import './borders';

// Text effects — import to load all text CSS and effects
import './text';

// React hooks
export { useAnimateOnScroll, useAnimateOnScrollMany } from './react/hooks';

// Vanilla JS trigger
export { initTextAnimations } from './text/auto-animate';

// JS config helpers
export { applyTextConfig, applyColorPreset } from './text/apply-config';
export type { TextEffectConfig } from './text/apply-config';

// Color presets
export type {
  GradientPreset,
  GlitchPreset,
  GlowPreset,
} from './text/modifiers/color-presets';
export {
  gradientPresets,
  gradientPresetClasses,
  glitchPresets,
  glitchPresetClasses,
  glowPresets,
  glowPresetClasses,
  allColorPresets,
  getPresetByClass,
} from './text/modifiers/color-presets';
