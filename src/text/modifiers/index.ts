/**
 * Text Modifiers - TypeScript Barrel
 * Imports all modifier CSS (glow, gradient, speed, delay, color presets)
 */
import './index.css';

export type { GradientPreset, GlitchPreset, GlowPreset } from './color-presets';
export {
  gradientPresets,
  gradientPresetClasses,
  glitchPresets,
  glitchPresetClasses,
  glowPresets,
  glowPresetClasses,
  allColorPresets,
  getPresetByClass,
} from './color-presets';
