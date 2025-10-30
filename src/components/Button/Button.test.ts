import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Button } from './index';

describe('Button', () => {
  // Teste de Semântica
  it('renders a native button tag', () => {
    const wrapper = mount(Button);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  // Teste de Props - variant
  it('applies primary variant classes by default', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('bg-blue-500');
  });

  it('applies secondary variant classes when variant is secondary', () => {
    const wrapper = mount(Button, { props: { variant: 'secondary' } });
    expect(wrapper.classes()).toContain('bg-gray-500');
  });

  // Teste de Props - size
  it('applies medium size classes by default', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('px-4');
    expect(wrapper.classes()).toContain('py-2');
  });

  it('applies small size classes when size is sm', () => {
    const wrapper = mount(Button, { props: { size: 'sm' } });
    expect(wrapper.classes()).toContain('px-2');
    expect(wrapper.classes()).toContain('py-1');
  });

  it('applies large size classes when size is lg', () => {
    const wrapper = mount(Button, { props: { size: 'lg' } });
    expect(wrapper.classes()).toContain('px-6');
    expect(wrapper.classes()).toContain('py-3');
  });

  // Teste de Estado - disabled
  it('applies disabled attribute and classes when disabled is true', () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.attributes('disabled')).toBe('');
    expect(wrapper.classes()).toContain('opacity-50');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeUndefined();
  });

  // Teste de Evento - click
  it('emits click event when clicked', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me',
      },
    });
    expect(wrapper.text()).toContain('Click Me');
  });
});
