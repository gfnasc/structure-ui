<template>
  <svg
    v-if="pathData"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="ariaLabel ? undefined : true"
    :aria-label="ariaLabel"
  >
    <path :d="pathData" />
  </svg>
  <span v-else class="text-red-500">[Invalid Icon]</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { icons, type IconName } from './icons';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: 'currentColor',
});

const pathData = computed(() => {
  return icons[props.name] || null;
});
</script>

<style scoped>
/* No specific styles needed, as SVG attributes handle most */
</style>
