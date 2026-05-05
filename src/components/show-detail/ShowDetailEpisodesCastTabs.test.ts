import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailEpisodesCastTabs from '@/components/show-detail/ShowDetailEpisodesCastTabs.vue';

describe('ShowDetailEpisodesCastTabs', () => {
  it('shows episodes panel by default then switches to cast', async () => {
    const wrapper = mount(ShowDetailEpisodesCastTabs, {
      props: {
        episodes: [
          {
            id: 1,
            name: 'Pilot',
            season: 1,
            number: 1,
            airdate: null,
            runtime: null,
            image: null,
            summary: null,
            rating: { average: null },
          },
        ],
        cast: [
          {
            person: { id: 2, name: 'Actor', image: null },
            character: { id: 3, name: 'Role', image: null },
          },
        ],
        episodesPending: false,
        episodesError: false,
        episodesErrorMessage: '',
        castPending: false,
        castError: false,
        castErrorMessage: '',
      },
    });

    expect(wrapper.text()).toContain('Episodes');
    expect(wrapper.text()).toContain('E1: Pilot');

    await wrapper.findAll('button[type="button"]')[1]?.trigger('click');

    expect(wrapper.text()).toContain('Cast');
    expect(wrapper.text()).toContain('Actor');
    expect(wrapper.text()).toContain('as Role');
  });
});
