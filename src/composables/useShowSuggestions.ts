import { computed, type Ref } from 'vue';
import { useDebouncedRef } from '@/composables/useDebouncedRef.ts';
import { useQuery } from '@tanstack/vue-query';
import { searchShowsByName } from '@/lib/api/tvmaze.ts';
import type { TvMazeSearchResult } from '@/types/tvmaze.ts';

export const HEADER_SEARCH_MIN_CHARS = 3;
const DEBOUNCE_MS = 300;
const DROPDOWN_MAX = 8;

export function useShowSuggestions(rawQuery: Ref<string>) {
  const debouncedQuery = useDebouncedRef(rawQuery, DEBOUNCE_MS);
  const trimmedQuery = computed(() => debouncedQuery.value.trim());
  const isQueryReady = computed(() => trimmedQuery.value.length >= HEADER_SEARCH_MIN_CHARS);

  const suggestionsQuery = useQuery({
    queryKey: ['search', trimmedQuery],
    queryFn: () => searchShowsByName(trimmedQuery.value),
    enabled: isQueryReady,
    staleTime: 60_000,
  });

  const suggestions = computed<TvMazeSearchResult[]>(() =>
    isQueryReady.value ? (suggestionsQuery.data.value ?? []).slice(0, DROPDOWN_MAX) : []
  );

  return {
    debouncedQuery: trimmedQuery,
    suggestions,
    isFetching: suggestionsQuery.isFetching,
  };
}
