import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { mount, flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';

import HeaderSearchBar from '@/components/shared/HeaderSearchBar.vue';
import { searchShowsByName } from '@/lib/api/tvmaze';
import type { TvMazeSearchResult } from '@/types/tvmaze';

vi.mock('@/lib/api/tvmaze', () => ({
  searchShowsByName: vi.fn(),
}));

const mockedSearch = vi.mocked(searchShowsByName);

function resultStub(id: number, name: string): TvMazeSearchResult {
  return {
    score: 1,
    show: {
      id,
      name,
      genres: ['Drama'],
      rating: { average: 8 },
      image: null,
      summary: null,
      premiered: null,
      status: null,
    },
  };
}

function createTestRouter(routes: Array<{ path: string; name?: string }>) {
  return createRouter({
    history: createMemoryHistory(),
    routes: routes.map((route) => ({
      ...route,
      component: { template: '<div />' },
    })),
  });
}

describe('HeaderSearchBar', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.useFakeTimers();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    mockedSearch.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function mountSearchBar(routes: Array<{ path: string; name?: string }>) {
    const router = createTestRouter(routes);
    const wrapper = mount(HeaderSearchBar, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }], router],
      },
    });
    return { wrapper, router };
  }

  it('does not fetch suggestions until the query reaches three characters', async () => {
    mockedSearch.mockResolvedValue([resultStub(1, 'Alpha')]);
    mountSearchBar([{ path: '/' }]);

    mockedSearch.mockClear();

    await flushPromises();
    expect(mockedSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);
    await flushPromises();
    expect(mockedSearch).not.toHaveBeenCalled();
  });

  it('loads suggestions after debounce once three or more characters are entered', async () => {
    mockedSearch.mockResolvedValue([resultStub(42, 'Breakout Kings')]);
    const { wrapper } = mountSearchBar([{ path: '/' }, { path: '/show/:id', name: 'show' }]);

    const input = wrapper.find('input');
    await input.trigger('focus');

    mockedSearch.mockClear();
    await input.setValue('Br');
    vi.advanceTimersByTime(350);
    await flushPromises();
    expect(mockedSearch).not.toHaveBeenCalled();

    await input.setValue('Bre');
    vi.advanceTimersByTime(350);
    await flushPromises();

    expect(mockedSearch).toHaveBeenCalledWith('Bre');
    expect(wrapper.text()).toContain('Breakout Kings');
  });

  it('navigates to the search route on submit when the query is non-empty', async () => {
    mockedSearch.mockResolvedValue([]);
    const { wrapper, router } = mountSearchBar([
      { path: '/' },
      { path: '/search', name: 'search' },
    ]);
    const pushSpy = vi.spyOn(router, 'push').mockResolvedValue(undefined);

    await wrapper.find('input').setValue('  lost  ');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'search',
      query: { q: 'lost' },
    });
  });
});
