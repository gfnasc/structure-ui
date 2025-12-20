<template>
  <div
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
        loading="lazy"
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
