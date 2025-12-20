<script setup lang="ts" generic="T">
import { ref, computed, onMounted, type Ref, type CSSProperties } from 'vue';

interface Props<T> {
  items: T[];
  itemHeight: number;
  buffer?: number;
  containerClass?: string;
}

const props = withDefaults(defineProps<Props<T>>(), {
  buffer: 5,
  containerClass: '',
});

const containerRef: Ref<HTMLElement | null> = ref(null);
const scrollTop = ref(0);
const containerHeight = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.buffer);
});

const endIndex = computed(() => {
  const visibleCount = Math.ceil(containerHeight.value / props.itemHeight);
  return Math.min(
    props.items.length,
    startIndex.value + visibleCount + 2 * props.buffer
  );
});

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value).map((item, index) => ({
    item,
    index: startIndex.value + index,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: `${props.itemHeight}px`,
      transform: `translateY(${(startIndex.value + index) * props.itemHeight}px)`,
    } as CSSProperties,
  }));
});

const handleScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop;
};

onMounted(() => {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight;
    // Resize observer could be added here for responsiveness
  }
});
</script>

<template>
  <div
    ref="containerRef"
    :class="containerClass"
    style="overflow-y: auto; position: relative;"
    @scroll="handleScroll"
  >
    <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
      <div
        v-for="wrapper in visibleItems"
        :key="wrapper.index"
        :style="wrapper.style"
      >
        <slot :item="wrapper.item" :index="wrapper.index" />
      </div>
    </div>
  </div>
</template>
