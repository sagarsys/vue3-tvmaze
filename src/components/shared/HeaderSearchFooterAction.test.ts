import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeaderSearchFooterAction from '@/components/shared/HeaderSearchFooterAction.vue';

describe('HeaderSearchFooterAction', () => {
  it('renders the search copy with the query', () => {
    const wrapper = mount(HeaderSearchFooterAction, {
      props: { query: 'test' },
    });

    expect(wrapper.text()).toContain('Search for "test"');
  });

  it('emits click when button is pressed', async () => {
    const wrapper = mount(HeaderSearchFooterAction, {
      props: { query: 'test' },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
