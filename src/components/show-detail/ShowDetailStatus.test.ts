import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowDetailStatus from '@/components/show-detail/ShowDetailStatus.vue';

describe('ShowDetailStatus', () => {
  it('renders status Running status', () => {
    const wrapper = mount(ShowDetailStatus, {
      props: { status: 'Running' },
    });

    expect(wrapper.text()).toContain('Running');
  });

  it('renders nothing if status is null', () => {
    const wrapper = mount(ShowDetailStatus, {
      props: { status: null },
    });

    expect(wrapper.text()).toBeFalsy();
  });
});
