import { ref, onMounted, onUnmounted } from 'vue';

export function useStructureLazy(elementRef: any) {
  const isVisible = ref(false);

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer?.disconnect();
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    isVisible,
  };
}
