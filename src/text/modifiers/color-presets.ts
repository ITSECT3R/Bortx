/**
 * Color Presets - TypeScript metadata
 *
 * Type-safe definitions for all color preset classes.
 * Used by the JS config helper and sandbox UI.
 */

export interface GradientPreset {
  class: string;
  label: string;
  start: string;
  end: string;
}

export interface GlitchPreset {
  class: string;
  label: string;
  color1: string;
  color2: string;
}

export interface GlowPreset {
  class: string;
  label: string;
  color: string;
}

export const gradientPresets: GradientPreset[] = [
  {
    class: 'text-colors-sunset',
    label: 'Sunset',
    start: '#ff9f40',
    end: '#ff0000',
  },
  {
    class: 'text-colors-ocean',
    label: 'Ocean',
    start: '#00d4ff',
    end: '#8b52fd',
  },
  {
    class: 'text-colors-cyberpunk',
    label: 'Cyberpunk',
    start: '#ff00ff',
    end: '#00ffff',
  },
  {
    class: 'text-colors-forest',
    label: 'Forest',
    start: '#00ff88',
    end: '#00aa55',
  },
  {
    class: 'text-colors-fire',
    label: 'Fire',
    start: '#ff6600',
    end: '#ffcc00',
  },
  {
    class: 'text-colors-twilight',
    label: 'Twilight',
    start: '#8b52fd',
    end: '#ff9f40',
  },
  {
    class: 'text-colors-neon',
    label: 'Neon',
    start: '#00ff88',
    end: '#00d4ff',
  },
  {
    class: 'text-colors-candy',
    label: 'Candy',
    start: '#ff69b4',
    end: '#ffd700',
  },
  {
    class: 'text-colors-midnight',
    label: 'Midnight',
    start: '#1a1a2e',
    end: '#16213e',
  },
  {
    class: 'text-colors-ember',
    label: 'Ember',
    start: '#e94560',
    end: '#533483',
  },
];

export const glitchPresets: GlitchPreset[] = [
  {
    class: 'text-glitch-colors-error',
    label: 'Error',
    color1: '#ff0000',
    color2: '#00ffff',
  },
  {
    class: 'text-glitch-colors-neon',
    label: 'Neon',
    color1: '#ff00ff',
    color2: '#00ff00',
  },
  {
    class: 'text-glitch-colors-matrix',
    label: 'Matrix',
    color1: '#00ff00',
    color2: '#003300',
  },
  {
    class: 'text-glitch-colors-vaporwave',
    label: 'Vaporwave',
    color1: '#ff71ce',
    color2: '#01cdfe',
  },
  {
    class: 'text-glitch-colors-cyber',
    label: 'Cyber',
    color1: '#ff9f40',
    color2: '#8b52fd',
  },
  {
    class: 'text-glitch-colors-toxic',
    label: 'Toxic',
    color1: '#39ff14',
    color2: '#ff6600',
  },
];

export const glowPresets: GlowPreset[] = [
  { class: 'text-glow-purple', label: 'Purple', color: '#8b52fd' },
  { class: 'text-glow-cyan', label: 'Cyan', color: '#00ffff' },
  { class: 'text-glow-orange', label: 'Orange', color: '#ff9f40' },
  { class: 'text-glow-pink', label: 'Pink', color: '#ff69b4' },
  { class: 'text-glow-green', label: 'Green', color: '#00ff88' },
  { class: 'text-glow-red', label: 'Red', color: '#ff0000' },
  { class: 'text-glow-gold', label: 'Gold', color: '#ffd700' },
  { class: 'text-glow-white', label: 'White', color: '#ffffff' },
];

export const gradientPresetClasses = gradientPresets.map(p => p.class);
export const glitchPresetClasses = glitchPresets.map(p => p.class);
export const glowPresetClasses = glowPresets.map(p => p.class);

export const allColorPresets = [
  ...gradientPresets,
  ...glitchPresets,
  ...glowPresets,
] as const;

export function getPresetByClass(className: string) {
  return allColorPresets.find(p => p.class === className) ?? null;
}
