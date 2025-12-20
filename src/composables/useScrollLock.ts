import { onUnmounted, watch, type Ref } from 'vue';

export function useScrollLock(isLocked: Ref<boolean>) {
  if (typeof window === 'undefined') return;

  const lock = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlock = () => {
    document.body.style.overflow = '';
  };

  watch(isLocked, (val) => {
    if (val) lock();
    else unlock();
  }, { immediate: true });

  onUnmounted(() => {
    unlock();
  });
}
