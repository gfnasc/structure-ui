import { onMounted, onUnmounted, type Ref } from 'vue';

export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void,
  isActive: Ref<boolean>
) {
  if (typeof window === 'undefined') return;

  const handleClick = (event: MouseEvent) => {
    if (!isActive.value) return;
    
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  // Use capture phase to handle events that might stop propagation
  onMounted(() => document.addEventListener('click', handleClick, true));
  onUnmounted(() => document.removeEventListener('click', handleClick, true));
}
