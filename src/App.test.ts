import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VueQueryPlugin } from '@tanstack/vue-query';

import { router } from '@/router';
import App from '@/App.vue';
import { queryClient } from '@/lib/query-client.ts';

describe('App smoke test', () => {
  it('renders router navigation links', async () => {
    await router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, [VueQueryPlugin, { queryClient }]],
      },
    });

    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Show details');
    expect(wrapper.text()).toContain('Search');
  });
});
