import { ref, onMounted, type Ref } from 'vue';

/**
 * Returns a ref that becomes true only after the component is mounted on the client.
 * Useful for guarding client-only logic or rendering to avoid hydration mismatches.
 */
export function useClientOnly(): Ref<boolean> {
  const isClient = ref(false);

  onMounted(() => {
    isClient.value = true;
  });

  return isClient;
}
