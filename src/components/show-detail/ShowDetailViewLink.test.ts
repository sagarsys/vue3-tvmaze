import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailViewLink from '@/components/show-detail/ShowDetailViewLink.vue';

describe('ShowDetailViewLink', () => {
  it('renders a TVMaze link with new-tab security attributes and aria-label', () => {
    const wrapper = mount(ShowDetailViewLink, {
      props: {
        url: 'https://www.tvmaze.com/shows/123',
        name: 'Breaking Bad',
      },
      global: {
        stubs: { CirclePlay: true },
      },
    });

    const link = wrapper.get('a');

    expect(link.attributes('href')).toBe('https://www.tvmaze.com/shows/123');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
    expect(link.attributes('aria-label')).toBe('View Breaking Bad on TVMaze (opens in new tab)');
    expect(wrapper.text()).toContain('View on TVMaze');
  });
});
