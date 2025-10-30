import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export function useStructureLazy(elementRef: Ref<HTMLElement | null>) {
  const shouldRender = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (elementRef.value) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              shouldRender.value = true;
              if (observer) {
                observer.disconnect();
              }
            }
          });
        },
        { rootMargin: '0px' }
      );
      observer.observe(elementRef.value);
    } else {
      // If elementRef is null, render immediately (e.g., for server-side rendering or non-DOM elements)
      shouldRender.value = true;
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { shouldRender };
}
