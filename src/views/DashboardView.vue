<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { fetchShowsPage } from '@/lib/api/tvmaze.ts';
import { computed } from 'vue';

const DASHBOARD_PAGE_INDEX = 0;

const showsQuery = useQuery({
  queryKey: ['shows', DASHBOARD_PAGE_INDEX],
  queryFn: () => fetchShowsPage(DASHBOARD_PAGE_INDEX),
});

const shows = computed(() => showsQuery.data.value ?? []);

const errorMessage = computed(() => {
  const error = showsQuery.error.value;

  return error instanceof Error ? error.message : 'Something went wrong while loading shows';
});
</script>

<template>
  <section>
    <h1>Shows</h1>

    <p v-if="showsQuery.isPending.value">Loading shows...</p>
    <p v-else-if="showsQuery.isError.value" class="text-red-500">
      Failed to load shows: {{ errorMessage }}
    </p>
    <ul v-else class="list-disc space-y-1 pl-5">
      <li v-for="show in shows" :key="show.id">
        {{ show.name }}
      </li>
    </ul>
  </section>
</template>
