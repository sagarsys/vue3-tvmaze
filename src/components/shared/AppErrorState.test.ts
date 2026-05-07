import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppQueryErrorState from '@/components/shared/AppErrorState.vue';

describe('AppErrorState', () => {
  it('renders as an alert with title and message', () => {
    const wrapper = mount(AppQueryErrorState, {
      props: {
        title: 'Request failed',
        message: 'Try again later.',
        variant: 'page',
      },
    });

    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Request failed');
    expect(wrapper.text()).toContain('Try again later.');
  });
});
