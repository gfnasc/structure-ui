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
    :aria-hidden="!ariaLabel"
    :aria-labelledby="ariaLabel ? titleId : undefined"
  >
    <title v-if="ariaLabel" :id="titleId">{{ ariaLabel }}</title>
    <path :d="pathData" />
  </svg>
  <span v-else>[Invalid Icon: {{ name }}]</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { icons, type IconName } from './icons';
import { useStructureId } from '../../composables/useStructureId';

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

const titleId = useStructureId('icon-title');

const pathData = computed(() => {
  return icons[props.name] || null;
});
</script>

<style scoped>
/* No specific styles needed, as SVG attributes handle most */
</style>
