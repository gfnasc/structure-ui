<script setup lang="ts">
import { useStructureId } from '../../composables/useStructureId';

interface Props {
  id?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

const elementId = props.id || useStructureId('btn');

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :id="elementId"
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <slot v-if="loading" name="loading">
      <!-- Default loading text if no slot provided -->
      Loading...
    </slot>
    <slot v-else />
  </button>
</template>
