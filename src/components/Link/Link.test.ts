import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
// Removed explicit imports for describe, it, expect, relying on vitest/globals from tsconfig.json
import Link from './Link.vue';

// Mock RouterLink since vue-router is not available in the test environment
const RouterLinkStub = defineComponent({
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
});

describe('Link', () => {
  it('renders as a RouterLink when "to" prop is provided and not external/disabled', () => {
    const wrapper = mount(Link, {
      props: { to: '/internal-path' },
      slots: { default: 'Internal Link' },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const linkComponent = wrapper.findComponent(RouterLinkStub);
    expect(linkComponent.exists()).toBe(true);
    expect(linkComponent.props().to).toBe('/internal-path');
    expect(wrapper.text()).toBe('Internal Link');
    expect(wrapper.classes()).toContain('text-indigo-600');
  });

  it('renders as an anchor tag for external links with "href"', () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com' },
      slots: { default: 'External Link' },
    });

    const anchorTag = wrapper.find('a');
    expect(anchorTag.exists()).toBe(true);
    expect(anchorTag.attributes('href')).toBe('https://example.com');
    expect(anchorTag.attributes('target')).toBe('_blank');
    expect(anchorTag.attributes('rel')).toBe('noopener noreferrer');
    expect(wrapper.text()).toBe('External Link');
    expect(wrapper.classes()).toContain('text-indigo-600');
  });

  it('renders as an anchor tag for external links with "to" and "external" prop', () => {
    const wrapper = mount(Link, {
      props: { to: '/external-path', external: true },
      slots: { default: 'External Link via To' },
    });

    const anchorTag = wrapper.find('a');
    expect(anchorTag.exists()).toBe(true);
    expect(anchorTag.attributes('href')).toBe('/external-path');
    expect(anchorTag.attributes('target')).toBe('_blank');
    expect(anchorTag.attributes('rel')).toBe('noopener noreferrer');
    expect(wrapper.text()).toBe('External Link via To');
  });

  it('applies disabled styles and attribute when "disabled" prop is true', () => {
    const wrapper = mount(Link, {
      props: { to: '/disabled-path', disabled: true },
      slots: { default: 'Disabled Link' },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    // When disabled, it should render as an <a> tag, not RouterLink
    const anchorTag = wrapper.find('a');
    expect(anchorTag.exists()).toBe(true);
    expect(anchorTag.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('opacity-50');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('applies aria-label when "ariaLabel" prop is provided', () => {
    const wrapper = mount(Link, {
      props: { to: '/aria-path', ariaLabel: 'Navigate to Aria Path' },
      slots: { default: 'Aria Link' },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const linkElement = wrapper.findComponent(RouterLinkStub);
    expect(linkElement.attributes('aria-label')).toBe('Navigate to Aria Path');
  });

  it('renders slot content correctly', () => {
    const wrapper = mount(Link, {
      props: { to: '/slot-path' },
      slots: { default: '<span>Slot Content</span>' },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.html()).toContain('<span>Slot Content</span>');
  });

  it('applies correct base classes', () => {
    const wrapper = mount(Link, {
      props: { to: '/base-classes' },
      slots: { default: 'Base Classes Link' },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'font-semibold',
        'rounded-lg',
        'transition-all',
        'duration-200',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'text-indigo-600',
        'hover:text-indigo-800',
        'focus:ring-indigo-500',
      ])
    );
  });
});
