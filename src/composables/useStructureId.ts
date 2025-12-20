/**
 * Generates a deterministic ID that is stable across Server (SSR) and Client (Hydration).
 * Uses Nuxt's `useState` if available to synchronize the ID counter.
 * Fallbacks to a simple global counter for non-Nuxt environments.
 */
export function useStructureId(prefix = 'st'): string {
  // Check for Vue 3.5+ native useId
  // @ts-ignore
  if (typeof useId === 'function') {
    // @ts-ignore
    return useId();
  }

  // Check for Nuxt environment and useState
  try {
    // @ts-ignore
    if (typeof useState === 'function') {
      // @ts-ignore
      const counter = useState<number>('st-id-counter', () => 0);
      counter.value++;
      return `${prefix}-${counter.value}`;
    }
  } catch (e) {
    // Ignore error if useState is not defined
  }

  // Fallback: Simple global counter (Client-side SPA or Storybook)
  // Note: This may cause hydration mismatches in SSR if not using Nuxt/Vue 3.5
  return `${prefix}-${++globalCounter}`;
}

let globalCounter = 0;
