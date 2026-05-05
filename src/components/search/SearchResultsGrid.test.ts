import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, expect, it } from 'vitest';

import SearchResultsGrid from '@/components/search/SearchResultsGrid.vue';
import type { TvMazeSearchResult } from '@/types/tvmaze';

const results: TvMazeSearchResult[] = [
  {
    score: 0.9,
    show: {
      id: 7,
      name: 'Sherlock',
      genres: ['Drama'],
      rating: { average: 8.8 },
      image: null,
      summary: null,
    },
  },
];

describe('SearchResultsGrid', () => {
  it('renders result cards and show links', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/show/:id', name: 'show', component: { template: '<div />' } }],
    });
    await router.push('/show/7');
    await router.isReady();

    const wrapper = mount(SearchResultsGrid, {
      props: { query: 'sherlock', results },
      global: { plugins: [router] },
    });

    expect(wrapper.text()).toContain('Results for');
    expect(wrapper.text()).toContain('Sherlock');
    const link = wrapper.findComponent({ name: 'RouterLink' });
    expect(link.exists()).toBe(true);
  });
});
