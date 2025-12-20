<script setup lang="ts">
import { ref, toRef, onMounted, type Ref } from 'vue';
import { useStructureId } from '../../composables/useStructureId';
import { useScrollLock } from '../../composables/useScrollLock';
import { useFocusTrap } from '../../composables/useFocusTrap';
import { useClickOutside } from '../../composables/useClickOutside';
import { useClientOnly } from '../../composables/useClientOnly';

interface Props {
  modelValue: boolean;
  id?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom'; // Headless hint for user styling
  closeOnOutsideClick?: boolean;
  teleportTo?: string | HTMLElement;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'right',
  closeOnOutsideClick: true,
  teleportTo: 'body',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const isOpen = toRef(props, 'modelValue');
const drawerId = props.id || useStructureId('drawer');
const titleId = `${drawerId}-title`;
const descId = `${drawerId}-desc`;

const contentRef: Ref<HTMLElement | null> = ref(null);
const isClient = useClientOnly();

// Behaviors
useScrollLock(isOpen);
useFocusTrap(contentRef, isOpen);

useClickOutside(contentRef, () => {
  if (props.closeOnOutsideClick) {
    close();
  }
}, isOpen);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport v-if="isClient" :to="teleportTo">
    <div
      v-if="isOpen"
      :id="drawerId"
      role="presentation"
      class="fixed inset-0 z-50 flex"
      :class="{
        'justify-start': placement === 'left',
        'justify-end': placement === 'right',
        'items-start': placement === 'top',
        'items-end': placement === 'bottom',
      }"
    >
      <!-- Backdrop logic is handled by the parent container catching clicks via useClickOutside on content -->
      
      <div
        ref="contentRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
        v-bind="$attrs"
      >
        <slot :close="close" :titleId="titleId" :descId="descId" />
      </div>
    </div>
  </Teleport>
</template>
