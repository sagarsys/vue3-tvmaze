import { QueryClient } from '@tanstack/vue-query';

/**
 * Creates app-level Tanstack Query Client
 * Used to specify global options for all queries
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
