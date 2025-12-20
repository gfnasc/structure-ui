import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Modal from './Modal.vue';
import Button from '../Button/Button.vue';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Controls the visibility of the modal.',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close the modal on outside click.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const StyledModal: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button @click="isOpen = true" class="px-4 py-2 bg-blue-600 text-white rounded">Open Modal</Button>
        
        <Modal v-model="isOpen" v-bind="args">
          <template #default="{ close, titleId, descId }">
            <div class="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full m-4">
              <h2 :id="titleId" class="text-2xl font-bold mb-2">Deactivate Account</h2>
              <p :id="descId" class="text-gray-600 mb-6">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
              
              <div class="flex justify-end gap-4">
                <Button @click="close" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</Button>
                <Button @click="close" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Deactivate</Button>
              </div>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
  args: {
    closeOnOutsideClick: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<script setup>
import { ref } from 'vue';
import { Modal, Button } from 'structure-ui';

const isOpen = ref(false);
</script>

<template>
  <Button @click="isOpen = true">Open Modal</Button>
  
  <Modal v-model="isOpen">
    <template #default="{ close, titleId, descId }">
      <!-- Modal Content (Styled by you) -->
      <div class="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full m-4">
        <h2 :id="titleId" class="text-2xl font-bold mb-2">Deactivate Account</h2>
        <p :id="descId" class="text-gray-600 mb-6">Are you sure?</p>
        
        <div class="flex justify-end gap-4">
          <Button @click="close" class="bg-gray-200">Cancel</Button>
          <Button @click="close" class="bg-red-600 text-white">Deactivate</Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
        `,
      },
    },
  },
};
