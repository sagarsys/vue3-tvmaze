import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailEpisodesSection from '@/components/show-detail/ShowDetailEpisodesList.vue';

describe('ShowDetailEpisodesSection', () => {
  it('renders episodes list', () => {
    const wrapper = mount(ShowDetailEpisodesSection, {
      props: {
        isPending: false,
        isError: false,
        errorMessage: '',
        episodes: [
          {
            id: 1,
            name: 'Pilot',
            season: 1,
            number: 1,
            airdate: '2008-01-20',
            runtime: 60,
            image: null,
            summary: '<p>Episode summary text</p>',
            rating: { average: 8.2 },
          },
        ],
      },
    });

    expect(wrapper.text()).toContain('Episodes');
    expect(wrapper.text()).toContain('Season 1');
    expect(wrapper.text()).toContain('E1: Pilot');
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('renders error state', () => {
    const wrapper = mount(ShowDetailEpisodesSection, {
      props: {
        isPending: false,
        isError: true,
        errorMessage: 'Could not load episodes right now.',
        episodes: [],
      },
    });
    expect(wrapper.text()).toContain('Could not load episodes right now.');
  });
});
