import { describe, it, expect, beforeEach } from 'vitest';
import { applyTextConfig, applyColorPreset } from './apply-config';

function makeDiv(): HTMLDivElement {
  return document.createElement('div');
}

describe('applyTextConfig', () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    el = makeDiv();
  });

  it('sets --text-effect-chars from chars', () => {
    applyTextConfig(el, { chars: 12 });
    expect(el.style.getPropertyValue('--text-effect-chars')).toBe('12');
  });

  it('sets --text-effect-speed from speed', () => {
    applyTextConfig(el, { speed: '3s' });
    expect(el.style.getPropertyValue('--text-effect-speed')).toBe('3s');
  });

  it('sets --text-effect-delay from delay', () => {
    applyTextConfig(el, { delay: '500ms' });
    expect(el.style.getPropertyValue('--text-effect-delay')).toBe('500ms');
  });

  it('sets --text-effect-accent from accent', () => {
    applyTextConfig(el, { accent: '#ff0' });
    expect(el.style.getPropertyValue('--text-effect-accent')).toBe('#ff0');
  });

  it('sets --text-effect-color from color', () => {
    applyTextConfig(el, { color: '#fff' });
    expect(el.style.getPropertyValue('--text-effect-color')).toBe('#fff');
  });

  it('sets glow color from glowColor', () => {
    applyTextConfig(el, { glowColor: '#8b52fd' });
    expect(el.style.getPropertyValue('--text-effect-glow-color')).toBe(
      '#8b52fd'
    );
  });

  it('sets glow intensity from glowIntensity', () => {
    applyTextConfig(el, { glowIntensity: '10px' });
    expect(el.style.getPropertyValue('--text-effect-glow-intensity')).toBe(
      '10px'
    );
  });

  it('sets glitch intensity from glitchIntensity', () => {
    applyTextConfig(el, { glitchIntensity: '4px' });
    expect(el.style.getPropertyValue('--text-effect-glitch-intensity')).toBe(
      '4px'
    );
  });

  it('sets gradient angle from gradientAngle', () => {
    applyTextConfig(el, { gradientAngle: '90deg' });
    expect(el.style.getPropertyValue('--text-effect-gradient-angle')).toBe(
      '90deg'
    );
  });

  it('sets gradient start/end from gradient tuple', () => {
    applyTextConfig(el, { gradient: ['#ff0', '#0ff'] });
    expect(el.style.getPropertyValue('--text-effect-gradient-start')).toBe(
      '#ff0'
    );
    expect(el.style.getPropertyValue('--text-effect-gradient-end')).toBe(
      '#0ff'
    );
  });

  it('sets glitch color pair from glitchColors tuple', () => {
    applyTextConfig(el, { glitchColors: ['#f00', '#0f0'] });
    expect(el.style.getPropertyValue('--text-effect-glitch-color-1')).toBe(
      '#f00'
    );
    expect(el.style.getPropertyValue('--text-effect-glitch-color-2')).toBe(
      '#0f0'
    );
  });

  it('ignores undefined values', () => {
    applyTextConfig(el, { glowColor: undefined });
    expect(el.style.getPropertyValue('--text-effect-glow-color')).toBe('');
  });

  it('handles multiple properties at once', () => {
    applyTextConfig(el, {
      chars: 10,
      speed: '2s',
      accent: '#f0f',
      gradient: ['#000', '#fff'],
    });
    expect(el.style.getPropertyValue('--text-effect-chars')).toBe('10');
    expect(el.style.getPropertyValue('--text-effect-speed')).toBe('2s');
    expect(el.style.getPropertyValue('--text-effect-accent')).toBe('#f0f');
    expect(el.style.getPropertyValue('--text-effect-gradient-start')).toBe(
      '#000'
    );
    expect(el.style.getPropertyValue('--text-effect-gradient-end')).toBe(
      '#fff'
    );
  });

  it('handles empty config', () => {
    applyTextConfig(el, {});
    expect(el.style.length).toBe(0);
  });
});

describe('applyColorPreset', () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    el = makeDiv();
  });

  it('adds a gradient preset class', () => {
    applyColorPreset(el, 'text-colors-sunset');
    expect(el.classList.contains('text-colors-sunset')).toBe(true);
  });

  it('adds a glitch preset class', () => {
    applyColorPreset(el, 'text-glitch-colors-matrix');
    expect(el.classList.contains('text-glitch-colors-matrix')).toBe(true);
  });

  it('adds a glow preset class', () => {
    applyColorPreset(el, 'text-glow-purple');
    expect(el.classList.contains('text-glow-purple')).toBe(true);
  });

  it('removes conflicting gradient presets before adding', () => {
    el.classList.add('text-colors-sunset', 'text-colors-ocean');
    applyColorPreset(el, 'text-colors-cyberpunk');
    expect(el.classList.contains('text-colors-sunset')).toBe(false);
    expect(el.classList.contains('text-colors-ocean')).toBe(false);
    expect(el.classList.contains('text-colors-cyberpunk')).toBe(true);
  });

  it('removes conflicting glitch presets before adding', () => {
    el.classList.add('text-glitch-colors-error');
    applyColorPreset(el, 'text-glitch-colors-matrix');
    expect(el.classList.contains('text-glitch-colors-error')).toBe(false);
    expect(el.classList.contains('text-glitch-colors-matrix')).toBe(true);
  });

  it('removes conflicting glow presets before adding', () => {
    el.classList.add('text-glow-purple', 'text-glow-cyan');
    applyColorPreset(el, 'text-glow-orange');
    expect(el.classList.contains('text-glow-purple')).toBe(false);
    expect(el.classList.contains('text-glow-cyan')).toBe(false);
    expect(el.classList.contains('text-glow-orange')).toBe(true);
  });

  it('does not affect presets from other categories', () => {
    el.classList.add('text-colors-sunset', 'text-glow-purple');
    applyColorPreset(el, 'text-glitch-colors-matrix');
    expect(el.classList.contains('text-colors-sunset')).toBe(true);
    expect(el.classList.contains('text-glow-purple')).toBe(true);
    expect(el.classList.contains('text-glitch-colors-matrix')).toBe(true);
  });

  it('adds unknown class but skips category removal', () => {
    applyColorPreset(el, 'unknown-class');
    expect(el.classList.contains('unknown-class')).toBe(true);
    expect(el.classList.length).toBe(1);
  });
});
