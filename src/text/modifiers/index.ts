/**
 * Text Modifiers - TypeScript Barrel
 * Imports all modifier CSS (glow, gradient, speed, delay, color presets)
 */
import './index.css';

export type { GradientPreset, GlitchPreset, GlowPreset } from './color-presets';
export {
  gradientPresets,
  glitchPresets,
  glowPresets,
  allColorPresets,
  getPresetByClass,
} from './color-presets';
