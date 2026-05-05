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
        episodes: [{ id: 1, name: 'Pilot', season: 1, number: 1, airdate: null }],
      },
    });

    expect(wrapper.text()).toContain('Episodes');
    expect(wrapper.text()).toContain('S1E1 — Pilot');
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
