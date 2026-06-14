/**
 * applyTextConfig — JS helper for applying text effect configuration
 *
 * Sets CSS custom properties on an element programmatically.
 * Use in React/Vue components or vanilla JS when inline styles
 * are inconvenient.
 */

export interface TextEffectConfig {
  /** Character count for typewriter effect */
  chars?: number;
  /** Animation duration (e.g. '3s', '800ms') */
  speed?: string;
  /** Animation delay */
  delay?: string;
  /** Gradient colors [start, end] */
  gradient?: [string, string];
  /** Gradient angle */
  gradientAngle?: string;
  /** Glitch color pair [color1, color2] */
  glitchColors?: [string, string];
  /** Glitch intensity */
  glitchIntensity?: string;
  /** Glow color */
  glowColor?: string;
  /** Glow blur radius */
  glowIntensity?: string;
  /** Accent color */
  accent?: string;
}

const PROPERTY_MAP: Record<string, string> = {
  chars: '--text-effect-chars',
  speed: '--text-effect-speed',
  delay: '--text-effect-delay',
  accent: '--text-effect-accent',
  glowColor: '--text-effect-glow-color',
  glowIntensity: '--text-effect-glow-intensity',
  gradientAngle: '--text-effect-gradient-angle',
  glitchIntensity: '--text-effect-glitch-intensity',
};

export function applyTextConfig(
  el: HTMLElement,
  config: TextEffectConfig
): void {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) continue;

    if (key === 'gradient' && Array.isArray(value)) {
      el.style.setProperty('--text-effect-gradient-start', value[0]);
      el.style.setProperty('--text-effect-gradient-end', value[1]);
      continue;
    }

    if (key === 'glitchColors' && Array.isArray(value)) {
      el.style.setProperty('--text-effect-glitch-color-1', value[0]);
      el.style.setProperty('--text-effect-glitch-color-2', value[1]);
      continue;
    }

    const prop = PROPERTY_MAP[key];
    if (prop) {
      el.style.setProperty(prop, String(value));
    }
  }
}

/**
 * Apply a color preset class to an element.
 * Removes conflicting presets in the same category.
 */
export function applyColorPreset(el: HTMLElement, presetClass: string): void {
  const gradientClasses = [
    'text-colors-sunset',
    'text-colors-ocean',
    'text-colors-cyberpunk',
    'text-colors-forest',
    'text-colors-fire',
    'text-colors-twilight',
    'text-colors-neon',
    'text-colors-candy',
    'text-colors-midnight',
    'text-colors-ember',
  ];
  const glitchClasses = [
    'text-glitch-colors-error',
    'text-glitch-colors-neon',
    'text-glitch-colors-matrix',
    'text-glitch-colors-vaporwave',
    'text-glitch-colors-cyber',
    'text-glitch-colors-toxic',
  ];
  const glowClasses = [
    'text-glow-purple',
    'text-glow-cyan',
    'text-glow-orange',
    'text-glow-pink',
    'text-glow-green',
    'text-glow-red',
    'text-glow-gold',
    'text-glow-white',
  ];

  const category = gradientClasses.includes(presetClass)
    ? gradientClasses
    : glitchClasses.includes(presetClass)
      ? glitchClasses
      : glowClasses.includes(presetClass)
        ? glowClasses
        : null;

  if (category) {
    for (const cls of category) {
      el.classList.remove(cls);
    }
  }

  el.classList.add(presetClass);
}
