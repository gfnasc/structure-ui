<template>
  <div
    ref="imageRoot"
    :style="aspectRatioStyle"
    class="relative w-full"
  >
    <template v-if="isVisible">
      <img
        v-if="!hasError"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        loading="lazy"
        @error="handleImageError"
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div v-else class="absolute top-0 left-0 w-full h-full bg-red-200 flex items-center justify-center text-red-700">
        <!-- Default error fallback -->
        <slot name="error">
          <p>Image failed to load</p>
        </slot>
      </div>
    </template>
    <div v-else class="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useStructureLazy } from '../../composables/useStructureLazy';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const props = defineProps<ImageProps>();

const imageRoot: Ref<HTMLElement | null> = ref(null);
const { isVisible }: { isVisible: Ref<boolean> } = useStructureLazy(imageRoot);

const hasError = ref(false);

const handleImageError = () => {
  hasError.value = true;
};

// CLS Zero: Calculate padding-top for aspect ratio
const aspectRatioStyle = computed(() => {
  if (props.width && props.height) {
    const aspectRatio = (props.height / props.width) * 100;
    return { paddingTop: `${aspectRatio}%` };
  }
  return {};
});
</script>

<style scoped>
/* Add any specific styles here if needed, though TailwindCSS handles most */
</style>
