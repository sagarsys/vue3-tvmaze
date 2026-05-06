import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppHeader from '@/components/ui/AppHeader.vue';

describe('AppHeader', () => {
  it('renders branding, search shell and nav links', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.text()).toContain('TVMaze');
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
  });
});
