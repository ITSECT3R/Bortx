import { describe, it, expect } from 'vitest';
import {
  gradientPresets,
  glitchPresets,
  glowPresets,
  gradientPresetClasses,
  glitchPresetClasses,
  glowPresetClasses,
  allColorPresets,
  getPresetByClass,
} from './color-presets';

describe('color-presets', () => {
  describe('preset arrays', () => {
    it('has 10 gradient presets', () => {
      expect(gradientPresets).toHaveLength(10);
    });

    it('has 6 glitch presets', () => {
      expect(glitchPresets).toHaveLength(6);
    });

    it('has 8 glow presets', () => {
      expect(glowPresets).toHaveLength(8);
    });

    it('has 24 total presets', () => {
      expect(allColorPresets).toHaveLength(24);
    });
  });

  describe('gradient presets', () => {
    it('each has class, label, start, end', () => {
      for (const p of gradientPresets) {
        expect(p).toHaveProperty('class');
        expect(p).toHaveProperty('label');
        expect(p).toHaveProperty('start');
        expect(p).toHaveProperty('end');
        expect(p.class).toMatch(/^text-colors-/);
      }
    });

    it('has unique classes', () => {
      const classes = gradientPresets.map(p => p.class);
      expect(new Set(classes).size).toBe(classes.length);
    });
  });

  describe('glitch presets', () => {
    it('each has class, label, color1, color2', () => {
      for (const p of glitchPresets) {
        expect(p).toHaveProperty('class');
        expect(p).toHaveProperty('label');
        expect(p).toHaveProperty('color1');
        expect(p).toHaveProperty('color2');
        expect(p.class).toMatch(/^text-glitch-colors-/);
      }
    });

    it('has unique classes', () => {
      const classes = glitchPresets.map(p => p.class);
      expect(new Set(classes).size).toBe(classes.length);
    });
  });

  describe('glow presets', () => {
    it('each has class, label, color', () => {
      for (const p of glowPresets) {
        expect(p).toHaveProperty('class');
        expect(p).toHaveProperty('label');
        expect(p).toHaveProperty('color');
        expect(p.class).toMatch(/^text-glow-/);
      }
    });

    it('has unique classes', () => {
      const classes = glowPresets.map(p => p.class);
      expect(new Set(classes).size).toBe(classes.length);
    });
  });

  describe('preset class arrays', () => {
    it('gradientPresetClasses matches gradientPresets', () => {
      expect(gradientPresetClasses).toEqual(gradientPresets.map(p => p.class));
    });

    it('glitchPresetClasses matches glitchPresets', () => {
      expect(glitchPresetClasses).toEqual(glitchPresets.map(p => p.class));
    });

    it('glowPresetClasses matches glowPresets', () => {
      expect(glowPresetClasses).toEqual(glowPresets.map(p => p.class));
    });
  });

  describe('getPresetByClass', () => {
    it('finds a gradient preset by class', () => {
      const preset = getPresetByClass('text-colors-sunset');
      expect(preset).toBeDefined();
      expect(preset?.label).toBe('Sunset');
    });

    it('finds a glitch preset by class', () => {
      const preset = getPresetByClass('text-glitch-colors-matrix');
      expect(preset).toBeDefined();
      expect(preset?.label).toBe('Matrix');
    });

    it('finds a glow preset by class', () => {
      const preset = getPresetByClass('text-glow-purple');
      expect(preset).toBeDefined();
      expect(preset?.label).toBe('Purple');
    });

    it('returns null for unknown class', () => {
      expect(getPresetByClass('text-colors-nonexistent')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(getPresetByClass('')).toBeNull();
    });
  });
});
