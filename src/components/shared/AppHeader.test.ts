import { mount } from '@vue/test-utils';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { describe, expect, it } from 'vitest';

import AppHeader from '@/components/shared/AppHeader.vue';
import { queryClient } from '@/lib/query-client';
import { router } from '@/router';

describe('AppHeader', () => {
  it('renders branding, search shell and nav links', async () => {
    await router.push('/');
    await router.isReady();

    const wrapper = mount(AppHeader, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }], router],
      },
    });

    expect(wrapper.text()).toContain('TVMaze');
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
  });
});
