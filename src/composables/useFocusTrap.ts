import { onUnmounted, watch, nextTick, type Ref } from 'vue';

export function useFocusTrap(elementRef: Ref<HTMLElement | null>, isActive: Ref<boolean>) {
  if (typeof window === 'undefined') return;

  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isActive.value || e.key !== 'Tab') return;

    const el = elementRef.value;
    if (!el) return;

    const focusableElements = el.querySelectorAll(focusableSelector);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  watch(isActive, async (val) => {
    if (val) {
      await nextTick();
      const el = elementRef.value;
      if (el) {
        const first = el.querySelector(focusableSelector) as HTMLElement;
        first?.focus();
      }
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.removeEventListener('keydown', handleKeydown);
    }
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
}
