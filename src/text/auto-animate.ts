/**
 * Auto-animate text effects using IntersectionObserver.
 * Vanilla JS trigger — no React required.
 *
 * Call `initTextAnimations()` once after DOM is ready.
 * All `.text-effect` elements will get `.is-animated` when they
 * enter the viewport.
 *
 * @example
 * ```ts
 * import { initTextAnimations } from '@itsect3r/bortx/text';
 * initTextAnimations({ threshold: 0.2 });
 * ```
 */

export interface AutoAnimateOptions {
  /** IntersectionObserver threshold (0-1). Default: 0.1 */
  threshold?: number;
  /** Root margin for the observer. Default: '50px' */
  rootMargin?: string;
  /** Whether to trigger only once. Default: true */
  triggerOnce?: boolean;
}

/**
 * Start observing all `.text-effect` elements and add `.is-animated`
 * when they enter the viewport. Also watches for dynamically added
 * elements via MutationObserver.
 *
 * @returns A cleanup function that disconnects all observers.
 */
export function initTextAnimations(
  options: AutoAnimateOptions = {}
): () => void {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;

  const animated = new WeakSet<Element>();

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-animated');
          animated.add(el);

          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          entry.target.classList.remove('is-animated');
        }
      }
    },
    { threshold, rootMargin }
  );

  const observe = (el: Element) => {
    if (!el.hasAttribute('data-text')) {
      el.setAttribute('data-text', el.textContent ?? '');
    }
    if (!animated.has(el)) {
      observer.observe(el);
    }
  };

  // Observe existing elements
  document.querySelectorAll<HTMLElement>('.text-effect').forEach(observe);

  // Watch for dynamically added elements
  const mutationObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        if (node.matches?.('.text-effect')) {
          observe(node);
        }

        // Check children of the added node
        if (node.querySelectorAll) {
          node.querySelectorAll<HTMLElement>('.text-effect').forEach(observe);
        }
      }
    }
  });

  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}
