import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';

describe('useQueryErrorMessage', () => {
  const fallbackMessage = 'Something went wrong.';

  it('returns Error.message when error is an error instance', () => {
    const errorRef = ref<unknown>(new Error('Network error'));
    const message = useQueryErrorMessage(() => errorRef.value, fallbackMessage);

    expect(message.value).toBe('Network error');
  });

  it('returns fallback message when error is not an error instance', () => {
    const errorRef = ref<unknown>('Invalid type');
    const message = useQueryErrorMessage(() => errorRef.value, fallbackMessage);

    expect(message.value).toBe(fallbackMessage);
  });

  it('reactively updates when error value changes', () => {
    const errorRef = ref<unknown>('temporary issue');
    const message = useQueryErrorMessage(() => errorRef.value, fallbackMessage);

    expect(message.value).toBe(fallbackMessage);

    errorRef.value = new Error('Recovered with a real error');
    expect(message.value).toBe('Recovered with a real error');
  });
});
