<template>
  <div
    :id="elementId"
    ref="imageRoot"
    :style="containerStyle"
  >
    <template v-if="isVisible">
      <img
        v-if="!hasError"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
        @load="handleLoad"
        @error="handleImageError"
        :style="imageStyle"
      />
      <slot v-else name="error">
        <!-- Fallback minimalista sem estilo visual -->
        <span role="img" :aria-label="alt">Image failed to load</span>
      </slot>
    </template>
    
    <slot v-else name="placeholder">
      <!-- Espaço vazio reservado, sem cor -->
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, type CSSProperties } from 'vue';
import { useStructureLazy } from '../../composables/useStructureLazy';
import { useStructureId } from '../../composables/useStructureId';
import { useHydrationCheck } from '../../composables/useHydrationCheck';

// Global cache to track loaded images across the SPA session
// This prevents unnecessary lazy-loading delays for images already seen
const loadedImages = new Set<string>();

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const props = withDefaults(defineProps<ImageProps>(), {
  loading: 'lazy',
});

const elementId = useStructureId('img');
const imageRoot: Ref<HTMLElement | null> = ref(null);

// DEV ONLY: Check for hydration mismatches
useHydrationCheck(imageRoot, elementId, 'Image');

const { isVisible: lazyVisible }: { isVisible: Ref<boolean> } = useStructureLazy(imageRoot);

const isVisible = computed(() => {
  if (props.loading === 'eager') return true;
  // Optimization: If image was already loaded in this session, show immediately
  if (loadedImages.has(props.src)) return true;
  return lazyVisible.value;
});

const hasError = ref(false);

const handleImageError = () => {
  hasError.value = true;
};

const handleLoad = () => {
  loadedImages.add(props.src);
};

// CLS Zero: Container style
const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  if (props.width && props.height) {
    const aspectRatio = (props.height / props.width) * 100;
    style.paddingTop = `${aspectRatio}%`;
  }

  return style;
});

// Image style to fill the container
const imageStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};
</script>
