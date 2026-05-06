import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SearchStatusMessage from '@/components/search/SearchStatusMessage.vue';

const baseProps = {
  hasQuery: true,
  isPending: false,
  isError: false,
  query: 'dark',
  errorMessage: '',
  hasResults: false,
};

describe('SearchStatusMessage', () => {
  it('renders empty-query guidance', () => {
    const wrapper = mount(SearchStatusMessage, {
      props: { ...baseProps, hasQuery: false, query: '' },
    });

    expect(wrapper.text()).toContain('Use the header search bar');
  });

  it('renders error message', () => {
    const wrapper = mount(SearchStatusMessage, {
      props: {
        ...baseProps,
        isError: true,
        errorMessage: 'Something went wrong while searching.',
      },
    });

    expect(wrapper.text()).toContain('Search failed');
  });

  it('renders no-results message with query text', () => {
    const wrapper = mount(SearchStatusMessage, {
      props: { ...baseProps, query: 'unknown show' },
    });

    expect(wrapper.text()).toContain('No shows found for “unknown show”.');
  });

  it('renders full guidance copy when query is empty', () => {
    const wrapper = mount(SearchStatusMessage, {
      props: { ...baseProps, hasQuery: false, query: '' },
    });

    expect(wrapper.text()).toContain('Use the header search bar to find TV shows.');
  });

  it('renders nothing when results are available', () => {
    const wrapper = mount(SearchStatusMessage, {
      props: { ...baseProps, hasResults: true },
    });

    expect(wrapper.text().trim()).toBe('');
  });
});
