import { computed, type ComputedRef } from 'vue';

export function useQueryErrorMessage(
  getError: () => unknown,
  fallbackMessage: string = 'Something went wrong'
): ComputedRef<string> {
  return computed(() => {
    const error = getError();
    return error instanceof Error ? error.message : fallbackMessage;
  });
}
