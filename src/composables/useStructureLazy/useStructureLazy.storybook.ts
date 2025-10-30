import { ref } from 'vue';

export function useStructureLazy() {
  return { isVisible: ref(true) };
}
