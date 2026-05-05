import { describe, expect, it } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import { mount } from '@vue/test-utils';
import ShowDetailBackNav from '@/components/show-detail/ShowDetailBackNav.vue';

describe('ShowDetailBackNav', () => {
  it('renders a link to the dashboard', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'dashboard', component: { template: '<div>Dashboard</div>' } }],
    });

    await router.push('/');
    await router.isReady();

    const wrapper = mount(ShowDetailBackNav, { global: { plugins: [router] } });

    const link = wrapper.findComponent({ name: 'RouterLink' });
    expect(link.props('to')).toEqual('/');
    expect(wrapper.text()).toContain('Back to dashboard');
  });
});
