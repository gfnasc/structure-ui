<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue';

interface Props {
  whenVisible?: boolean;
  whenIdle?: boolean;
  /**
   * If true, renders the component immediately on the server,
   * but effectively it might just be static HTML until hydrated.
   * Note: True "Partial Hydration" is hard in Vue 3 without Nuxt Islands.
   * This component focuses on "Lazy Rendering" to save TBT.
   */
  ssr?: boolean; 
}

const props = withDefaults(defineProps<Props>(), {
  whenVisible: false,
  whenIdle: false,
  ssr: false,
});

const shouldRender = ref(props.ssr);
const root: Ref<HTMLElement | null> = ref(null);
let observer: IntersectionObserver | null = null;
let idleId: any = null;

onMounted(() => {
  if (shouldRender.value) return;

  // Strategy: Immediate (if no triggers specified)
  if (!props.whenVisible && !props.whenIdle) {
    shouldRender.value = true;
    return;
  }

  // Strategy: When Idle
  if (props.whenIdle) {
    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(() => {
        shouldRender.value = true;
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        shouldRender.value = true;
      }, 200);
    }
  }

  // Strategy: When Visible
  if (props.whenVisible && root.value) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        shouldRender.value = true;
        observer?.disconnect();
        observer = null;
      }
    });
    observer.observe(root.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (idleId && 'cancelIdleCallback' in window) {
    (window as any).cancelIdleCallback(idleId);
  }
});
</script>

<template>
  <div ref="root" class="contents">
    <slot v-if="shouldRender" />
    <slot v-else name="placeholder" />
  </div>
</template>
