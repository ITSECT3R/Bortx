import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initTextAnimations } from './auto-animate';

function makeDiv(): HTMLDivElement {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
}

function mockIntersectionObserver() {
  function IO(
    this: Record<string, unknown>,
    _cb: IntersectionObserverCallback,
    _opts?: IntersectionObserverInit
  ) {
    void _cb;
    void _opts;
    this.observe = vi.fn();
    this.unobserve = vi.fn();
    this.disconnect = vi.fn();
  }

  vi.stubGlobal('IntersectionObserver', IO);
  vi.stubGlobal(
    'MutationObserver',
    vi.fn(function (this: Record<string, unknown>) {
      this.observe = vi.fn();
      this.disconnect = vi.fn();
    })
  );
}

describe('initTextAnimations', () => {
  let cleanup: (() => void) | null = null;

  beforeEach(() => {
    mockIntersectionObserver();
  });

  afterEach(() => {
    cleanup?.();
    cleanup = null;
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('returns a cleanup function', () => {
    cleanup = initTextAnimations();
    expect(typeof cleanup).toBe('function');
  });

  it('sets data-text attribute on elements', () => {
    const el = makeDiv();
    el.className = 'text-effect';
    el.textContent = 'Hello';

    cleanup = initTextAnimations();

    expect(el.getAttribute('data-text')).toBe('Hello');
  });

  it('does not overwrite existing data-text', () => {
    const el = makeDiv();
    el.className = 'text-effect';
    el.setAttribute('data-text', 'Custom');
    el.textContent = 'Hello';

    cleanup = initTextAnimations();

    expect(el.getAttribute('data-text')).toBe('Custom');
  });

  it('does nothing with empty options', () => {
    const el = makeDiv();
    el.className = 'text-effect';
    el.textContent = 'Hello';

    cleanup = initTextAnimations({});

    expect(el.getAttribute('data-text')).toBe('Hello');
  });

  it('does not crash with non-HTML added nodes', () => {
    // Regression: ensure mutation observer doesn't crash on text nodes
    cleanup = initTextAnimations();

    const textNode = document.createTextNode('hello');
    document.body.appendChild(textNode);

    // Should not throw
  });
});
