import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import GenreRow from '@/components/dashboard/GenreRow.vue';
import type { TvMazeShowSummary } from '@/types/tvmaze';

const shows: TvMazeShowSummary[] = [
  {
    id: 1,
    name: 'Show One',
    genres: ['Drama'],
    rating: { average: 8.1 },
    image: null,
    summary: null,
    premiered: null,
    status: null,
  },
];

describe('GenreRow', () => {
  it('renders the genre title and show cards', () => {
    const wrapper = mount(GenreRow, {
      props: { genre: 'Drama', shows },
      global: {
        stubs: {
          ShowCard: {
            template: '<article>stub-card</article>',
            props: ['show'],
          },
        },
      },
    });

    expect(wrapper.text()).toContain('Drama');
    expect(wrapper.text()).toContain('stub-card');
  });

  it('scrolls right when arrow is clicked', async () => {
    const scrollBy = vi.fn();
    const wrapper = mount(GenreRow, {
      props: { genre: 'Drama', shows },
      global: {
        stubs: {
          ShowCard: {
            template: '<article>stub-card</article>',
            props: ['show'],
          },
        },
      },
      attachTo: document.body,
    });

    const list = wrapper.get('ul');
    Object.defineProperty(list.element, 'scrollBy', {
      value: scrollBy,
      configurable: true,
    });

    await wrapper.get('button[aria-label="Scroll right"]').trigger('click');
    expect(scrollBy).toHaveBeenCalledWith({ left: 420, behavior: 'smooth' });
  });
});
