import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export type SwipeDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'NONE';

export interface SwipeOptions {
  threshold?: number; // Minimum distance to trigger swipe
  passive?: boolean;
  onSwipeStart?: (e: TouchEvent) => void;
  onSwipe?: (e: TouchEvent) => void;
  onSwipeEnd?: (e: TouchEvent, direction: SwipeDirection) => void;
}

export function useSwipe(
  target: Ref<HTMLElement | null>,
  options: SwipeOptions = {}
) {
  const isSwiping = ref(false);
  const direction = ref<SwipeDirection>('NONE');
  const lengthX = ref(0);
  const lengthY = ref(0);

  const startX = ref(0);
  const startY = ref(0);

  const threshold = options.threshold || 50;

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    startX.value = touch.clientX;
    startY.value = touch.clientY;
    isSwiping.value = true;
    direction.value = 'NONE';
    lengthX.value = 0;
    lengthY.value = 0;

    options.onSwipeStart?.(e);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping.value || e.touches.length !== 1) return;

    const touch = e.touches[0];
    lengthX.value = touch.clientX - startX.value;
    lengthY.value = touch.clientY - startY.value;

    if (Math.abs(lengthX.value) > Math.abs(lengthY.value)) {
      direction.value = lengthX.value > 0 ? 'RIGHT' : 'LEFT';
    } else {
      direction.value = lengthY.value > 0 ? 'DOWN' : 'UP';
    }

    options.onSwipe?.(e);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isSwiping.value) return;

    if (
      Math.abs(lengthX.value) >= threshold ||
      Math.abs(lengthY.value) >= threshold
    ) {
      options.onSwipeEnd?.(e, direction.value);
    } else {
      direction.value = 'NONE';
    }

    isSwiping.value = false;
  };

  onMounted(() => {
    const el = target.value;
    if (!el) return;

    el.addEventListener('touchstart', handleTouchStart, { passive: options.passive ?? true });
    el.addEventListener('touchmove', handleTouchMove, { passive: options.passive ?? true });
    el.addEventListener('touchend', handleTouchEnd);
  });

  onUnmounted(() => {
    const el = target.value;
    if (!el) return;

    el.removeEventListener('touchstart', handleTouchStart);
    el.removeEventListener('touchmove', handleTouchMove);
    el.removeEventListener('touchend', handleTouchEnd);
  });

  return {
    isSwiping,
    direction,
    lengthX,
    lengthY,
  };
}
