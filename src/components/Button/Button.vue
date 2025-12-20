<script setup lang="ts">
import { useStructureId } from '../../composables/useStructureId';

interface Props {
  id?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

const elementId = props.id || useStructureId('btn');

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :id="elementId"
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
