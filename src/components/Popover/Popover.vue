<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type Ref, type CSSProperties, watch } from 'vue';
import { useClickOutside } from '../../composables/useClickOutside';
import { useClientOnly } from '../../composables/useClientOnly';

interface Props {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  offset: 8,
});

const isOpen = ref(false);
const triggerRef: Ref<HTMLElement | null> = ref(null);
const contentRef: Ref<HTMLElement | null> = ref(null);
const positionStyle = ref<CSSProperties>({});
const isClient = useClientOnly();

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

useClickOutside(contentRef, () => {
  // Only close if the click wasn't on the trigger (trigger handles its own click)
  // But wait, useClickOutside is attached to contentRef.
  // We need to check if click was on triggerRef too.
  close();
}, isOpen);

// Custom click outside logic to include trigger exclusion
const handleDocumentClick = (e: MouseEvent) => {
  if (!isOpen.value) return;
  const target = e.target as Node;
  if (
    contentRef.value && !contentRef.value.contains(target) &&
    triggerRef.value && !triggerRef.value.contains(target)
  ) {
    close();
  }
};

const updatePosition = async () => {
  if (!isOpen.value || !triggerRef.value || !contentRef.value) return;
  
  const triggerRect = triggerRef.value.getBoundingClientRect();
  const contentRect = contentRef.value.getBoundingClientRect();
  
  let top = 0;
  let left = 0;

  switch (props.placement) {
    case 'bottom':
      top = triggerRect.bottom + props.offset;
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      break;
    case 'top':
      top = triggerRect.top - contentRect.height - props.offset;
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      left = triggerRect.left - contentRect.width - props.offset;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      left = triggerRect.right + props.offset;
      break;
  }

  positionStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 9999,
  };
};

watch(isOpen, async (val) => {
  if (val) {
    await nextTick();
    updatePosition();
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
  } else {
    document.removeEventListener('click', handleDocumentClick);
    window.removeEventListener('resize', updatePosition);
    window.removeEventListener('scroll', updatePosition, true);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
});
</script>

<template>
  <div class="contents">
    <div ref="triggerRef" @click="toggle" class="inline-block">
      <slot name="trigger" :isOpen="isOpen" />
    </div>

    <Teleport v-if="isClient" to="body">
      <div
        v-if="isOpen"
        ref="contentRef"
        :style="positionStyle"
        role="dialog"
        aria-modal="false"
      >
        <slot name="content" :close="close" />
      </div>
    </Teleport>
  </div>
</template>
