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
  closeOnOutsideClick?: boolean;
  teleportTo?: string | HTMLElement;
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOutsideClick: true,
  teleportTo: 'body',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const isOpen = toRef(props, 'modelValue');
const modalId = props.id || useStructureId('modal');
const titleId = `${modalId}-title`;
const descId = `${modalId}-desc`;

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
      :id="modalId"
      role="presentation"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Backdrop (User styles via slot or classes on parent, but we provide a click handler wrapper) -->
      <!-- Actually, for headless, we usually provide the structure. 
           The user should style this wrapper for the backdrop. -->
      
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
