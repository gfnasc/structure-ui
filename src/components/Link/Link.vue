/// <reference types="vite/client" />
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router'; // Assumindo que vue-router está instalado

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  disabled: false,
});

const isExternal = computed(() => {
  return props.href !== undefined || props.external;
});

const isRouterLink = computed(() => {
  return props.to !== undefined && !props.disabled && !isExternal.value;
});

const linkClasses = computed(() => [
  'font-semibold',
  'rounded-lg',
  'transition-all',
  'duration-200',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'cursor-pointer',
  // Estilos base para links
  'text-indigo-600',
  'hover:text-indigo-800',
  'focus:ring-indigo-500',
]);
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'a'"
    :to="isRouterLink ? to : undefined"
    :href="isExternal ? href || to : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    :class="linkClasses"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>
