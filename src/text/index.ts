/**
 * Text Animation Library - Master Barrel
 * Imports base, effects, and modifiers
 */
import './base.css';
import './effects';
import './modifiers';

export { initTextAnimations } from './auto-animate';
export { applyTextConfig, applyColorPreset } from './apply-config';
export type { TextEffectConfig } from './apply-config';
export type {
  GradientPreset,
  GlitchPreset,
  GlowPreset,
} from './modifiers/color-presets';
export {
  gradientPresets,
  glitchPresets,
  glowPresets,
  allColorPresets,
  getPresetByClass,
} from './modifiers/color-presets';
