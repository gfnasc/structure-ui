<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';

interface Props {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 0,
  once: false,
  as: 'div',
});

const root: Ref<HTMLElement | null> = ref(null);

const { isIntersecting } = useIntersectionObserver(root, {
  rootMargin: props.rootMargin,
  threshold: props.threshold,
  once: props.once,
});
</script>

<template>
  <component :is="as" ref="root">
    <slot :isIntersecting="isIntersecting" />
  </component>
</template>
