import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, onMounted } from 'vue';
import LazyHydrate from './LazyHydrate.vue';

// A "Heavy" component simulation
const HeavyComponent = defineComponent({
  template: `
    <div class="p-4 bg-green-100 border border-green-300 rounded text-green-800">
      <h3 class="font-bold">Heavy Component Loaded!</h3>
      <p>I was rendered only when needed.</p>
    </div>
  `,
  setup() {
    onMounted(() => {
      console.log('HeavyComponent mounted!');
    });
  }
});

const meta: Meta<typeof LazyHydrate> = {
  component: LazyHydrate,
  title: 'Components/LazyHydrate',
  tags: ['autodocs'],
  argTypes: {
    whenVisible: { control: 'boolean' },
    whenIdle: { control: 'boolean' },
    ssr: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof LazyHydrate>;

export const OnVisibility: Story = {
  render: (args) => ({
    components: { LazyHydrate, HeavyComponent },
    setup() { return { args }; },
    template: `
      <div class="space-y-4">
        <p>Scroll down to load the component...</p>
        <div style="height: 120vh; background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);"></div>
        
        <LazyHydrate v-bind="args">
          <HeavyComponent />
          <template #placeholder>
            <div class="p-4 bg-gray-100 border border-gray-300 rounded text-gray-500 animate-pulse">
              Loading Heavy Component...
            </div>
          </template>
        </LazyHydrate>
        
        <div style="height: 50vh;"></div>
      </div>
    `,
  }),
  args: {
    whenVisible: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<LazyHydrate whenVisible>
  <HeavyComponent />
  
  <template #placeholder>
    <div>Loading...</div>
  </template>
</LazyHydrate>
        `,
      },
    },
  },
};

export const OnIdle: Story = {
  render: (args) => ({
    components: { LazyHydrate, HeavyComponent },
    setup() { return { args }; },
    template: `
      <div>
        <p class="mb-4">This component loads when the browser is idle (or after a short delay).</p>
        <LazyHydrate v-bind="args">
          <HeavyComponent />
          <template #placeholder>
            <div class="p-4 bg-gray-100 border border-gray-300 rounded text-gray-500">
              Waiting for idle...
            </div>
          </template>
        </LazyHydrate>
      </div>
    `,
  }),
  args: {
    whenIdle: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<LazyHydrate whenIdle>
  <HeavyComponent />
</LazyHydrate>
        `,
      },
    },
  },
};
