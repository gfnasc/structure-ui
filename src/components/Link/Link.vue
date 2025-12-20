/// <reference types="vite/client" />
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

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
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'a'"
    :to="isRouterLink ? to : undefined"
    :href="isExternal ? href || to : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    :aria-disabled="disabled ? 'true' : undefined"
    :role="disabled ? 'link' : undefined"
  >
    <slot />
  </component>
</template>
