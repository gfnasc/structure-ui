import { ref, watch, onMounted, type Ref } from 'vue';

export interface SyncStateOptions {
  persistence?: 'localStorage' | 'sessionStorage';
}

/**
 * A universal state composable that works in both Nuxt (SSR) and pure Vue (SPA).
 * Synchronizes state across components (via Nuxt useState) and optionally persists to storage.
 */
export function useSyncState<T>(
  key: string,
  initialValue: () => T,
  options: SyncStateOptions = {}
): Ref<T> {
  let state: Ref<T>;

  // Try to use Nuxt's useState if available
  try {
    // @ts-ignore
    if (typeof useState === 'function') {
      // @ts-ignore
      state = useState<T>(key, initialValue);
    } else {
      throw new Error('useState not found');
    }
  } catch {
    // Fallback to standard ref for SPA/Storybook
    // Note: In SPA, this ref is not shared across component instances unless lifted up.
    // For true global state in SPA without Pinia, we'd need a global reactive object map.
    // But for this utility, we assume local or Nuxt context.
    state = ref(initialValue()) as Ref<T>;
  }

  // Persistence Logic (Client Only)
  if (options.persistence && typeof window !== 'undefined') {
    const storage = options.persistence === 'localStorage' ? localStorage : sessionStorage;
    const storageKey = `st-sync-${key}`;

    // Hydrate from storage
    const stored = storage.getItem(storageKey);
    if (stored) {
      try {
        state.value = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored state', e);
      }
    }

    // Watch and save
    watch(state, (val) => {
      storage.setItem(storageKey, JSON.stringify(val));
    }, { deep: true });
  }

  return state;
}
