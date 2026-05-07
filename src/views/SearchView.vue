<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { searchShowsByName } from '@/lib/api/tvmaze.ts';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';
import SearchStatusMessage from '@/components/search/SearchStatusMessage.vue';
import SearchResultsGrid from '@/components/search/SearchResultsGrid.vue';

const route = useRoute();

// router query param
const routeQuery = computed(() => {
  const q = route.query.q;
  return typeof q === 'string' ? q.trim() : '';
});

const hasRouteQuery = computed(() => routeQuery.value.length > 0);

const searchQuery = useQuery({
  queryKey: ['search', routeQuery],
  queryFn: () => searchShowsByName(routeQuery.value),
  enabled: hasRouteQuery,
});

const searchResults = computed(() => searchQuery.data.value ?? []);
const showResultsGrid = computed(
  () =>
    hasRouteQuery.value &&
    !searchQuery.isPending.value &&
    !searchQuery.isError.value &&
    searchResults.value.length > 0
);

const errorMessage = useQueryErrorMessage(
  () => searchQuery.error.value,
  'Something went wrong while searching.'
);
</script>

<template>
  <section class="space-y-6 px-4 pb-8 sm:px-6 lg:px-12 xl:px-16">
    <h1 class="text-2xl font-bold text-foreground my-10 md:text-3xl">
      {{ hasRouteQuery ? `Search results for "${routeQuery}"` : 'Search' }}
    </h1>

    <SearchStatusMessage
      :has-query="hasRouteQuery"
      :is-pending="searchQuery.isPending.value"
      :is-error="searchQuery.isError.value"
      :query="routeQuery"
      :error-message="errorMessage"
      :has-results="searchResults.length > 0"
    />

    <SearchResultsGrid v-if="showResultsGrid" :query="routeQuery" :results="searchResults" />
  </section>
</template>
