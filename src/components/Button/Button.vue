<script setup lang="ts">
interface Props {
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

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
