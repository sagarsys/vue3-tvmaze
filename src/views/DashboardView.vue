<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { fetchShowsPage } from '@/lib/api/tvmaze.ts';
import { computed } from 'vue';
import { capShows, groupShowsByGenre, sortShowsByRatingDesc } from '@/lib/domain/shows-grouping.ts';
import { DASHBOARD_GENRES } from '@/lib/domain/genres.ts';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';
import GenreRow from '@/components/dashboard/GenreRow.vue';

const DASHBOARD_PAGE_INDEX = 0;

const showsQuery = useQuery({
  queryKey: ['shows', DASHBOARD_PAGE_INDEX],
  queryFn: () => fetchShowsPage(DASHBOARD_PAGE_INDEX),
});

const shows = computed(() => showsQuery.data.value ?? []);

const genreRows = computed(() => {
  // group shows
  const grouped = groupShowsByGenre(shows.value);
  // sort by ratings
  return DASHBOARD_GENRES.map((genre) => {
    const rankedShows = sortShowsByRatingDesc(grouped[genre]);
    return {
      genre,
      shows: capShows(rankedShows),
    };
  });
});

// filter out empty rows
const displayedGenreRows = computed(() => genreRows.value.filter((row) => row.shows.length > 0));

const errorMessage = useQueryErrorMessage(
  () => showsQuery.error.value,
  'Something went wrong while loading shows'
);
</script>

<template>
  <section class="mt-6 mb-20">
    <p v-if="showsQuery.isPending.value">Loading shows...</p>
    <p v-else-if="showsQuery.isError.value" class="text-red-500">
      Failed to load shows: {{ errorMessage }}
    </p>
    <div v-else class="space-y-12">
      <GenreRow
        v-for="genreRow in displayedGenreRows"
        :key="genreRow.genre"
        :genre="genreRow.genre"
        :shows="genreRow.shows"
      />
    </div>
  </section>
</template>
