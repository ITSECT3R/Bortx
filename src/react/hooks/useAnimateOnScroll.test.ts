import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  useAnimateOnScroll,
  useAnimateOnScrollMany,
} from './useAnimateOnScroll';

describe('useAnimateOnScroll', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }))
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns ref, isAnimated, and reset', () => {
    const { result } = renderHook(() => useAnimateOnScroll());
    expect(result.current).toHaveProperty('ref');
    expect(result.current).toHaveProperty('isAnimated');
    expect(result.current).toHaveProperty('reset');
    expect(result.current.isAnimated).toBe(false);
  });

  it('initializes with default options', () => {
    const { result } = renderHook(() => useAnimateOnScroll());
    expect(result.current.isAnimated).toBe(false);
    expect(typeof result.current.reset).toBe('function');
  });

  it('accepts custom threshold', () => {
    const { result } = renderHook(() => useAnimateOnScroll({ threshold: 0.5 }));
    expect(result.current.isAnimated).toBe(false);
  });

  it('accepts custom delay', () => {
    const { result } = renderHook(() => useAnimateOnScroll({ delay: 200 }));
    expect(result.current.isAnimated).toBe(false);
  });

  it('accepts triggerOnce false', () => {
    const { result } = renderHook(() =>
      useAnimateOnScroll({ triggerOnce: false })
    );
    expect(result.current.isAnimated).toBe(false);
  });

  it('reset function does not throw', () => {
    const { result } = renderHook(() => useAnimateOnScroll());
    expect(() => result.current.reset()).not.toThrow();
  });

  it('resets isAnimated state', () => {
    const { result } = renderHook(() => useAnimateOnScroll());
    result.current.reset();
    expect(result.current.isAnimated).toBe(false);
  });
});

describe('useAnimateOnScrollMany', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }))
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns refs array with correct length', () => {
    const { result } = renderHook(() => useAnimateOnScrollMany(3));
    expect(result.current.refs).toHaveLength(3);
  });

  it('returns areAnimated array with all false', () => {
    const { result } = renderHook(() => useAnimateOnScrollMany(3));
    expect(result.current.areAnimated).toEqual([false, false, false]);
  });

  it('accepts custom stagger delay', () => {
    const { result } = renderHook(() => useAnimateOnScrollMany(3, {}, 200));
    expect(result.current.areAnimated).toHaveLength(3);
  });

  it('reset function does not throw', () => {
    const { result } = renderHook(() => useAnimateOnScrollMany(2));
    expect(() => result.current.reset()).not.toThrow();
  });

  it('handles count 0', () => {
    const { result } = renderHook(() => useAnimateOnScrollMany(0));
    expect(result.current.refs).toHaveLength(0);
    expect(result.current.areAnimated).toEqual([]);
  });
});
