<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { searchShowsByName } from '@/lib/api/tvmaze.ts';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';
import SearchForm from '@/components/search/SearchForm.vue';
import SearchStatusMessage from '@/components/search/SearchStatusMessage.vue';
import SearchResultsGrid from '@/components/search/SearchResultsGrid.vue';

const route = useRoute();
const router = useRouter();

// router query param
const routeQuery = computed(() => {
  const q = route.query.q;
  return typeof q === 'string' ? q.trim() : '';
});
// user input query
const draftQuery = ref(routeQuery.value);
watch(
  routeQuery,
  (nextValue) => {
    draftQuery.value = nextValue;
  },
  { immediate: true }
);

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

async function handleSearch(): Promise<void> {
  const trimmed = draftQuery.value.trim();

  if (trimmed.length === 0) {
    await router.push({ name: 'search' });
    return;
  }

  await router.push({
    name: 'search',
    query: { q: trimmed },
  });
}
</script>

<template>
  <section class="space-y-6">
    <h1>Search</h1>

    <SearchForm v-model="draftQuery" @submit="handleSearch" />

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
