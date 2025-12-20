import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface IntersectionObserverOptions {
  root?: Ref<HTMLElement | null> | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options: IntersectionObserverOptions = {}
) {
  const isIntersecting = ref(false);
  let observer: IntersectionObserver | null = null;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  onMounted(() => {
    if (typeof window === 'undefined' || !target.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.value = entry.isIntersecting;

        if (entry.isIntersecting && options.once) {
          cleanup();
        }
      },
      {
        root: options.root?.value || null,
        rootMargin: options.rootMargin,
        threshold: options.threshold || 0,
      }
    );

    observer.observe(target.value);
  });

  onUnmounted(cleanup);

  return {
    isIntersecting,
    cleanup,
  };
}
