<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
});

const emit = defineEmits(['click']);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-1 text-sm';
    case 'lg':
      return 'px-6 py-3 text-lg';
    case 'md':
    default:
      return 'px-4 py-2 text-base';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-500 hover:bg-gray-600 text-white';
    case 'primary':
    default:
      return 'bg-blue-500 hover:bg-blue-600 text-white';
  }
});

const classes = computed(() => [
  'font-bold',
  'rounded',
  'transition-colors',
  'duration-300',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-opacity-50',
  { 'opacity-50 cursor-not-allowed': props.disabled },
  sizeClasses.value,
  variantClasses.value,
]);

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
