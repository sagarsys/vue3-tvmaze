<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { fetchShowsPage } from '@/lib/api/tvmaze.ts';
import { computed } from 'vue';
import { capShows, groupShowsByGenre, sortShowsByRatingDesc } from '@/lib/domain/shows-grouping.ts';
import { DASHBOARD_GENRES } from '@/lib/domain/genres.ts';

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
    <div v-else class="space-y-6">
      <section v-for="row in displayedGenreRows" :key="row.genre" class="space-y-3">
        <h2 class="text-xl font-semibold">{{ row.genre }}</h2>
        <ul class="flex gap-3 overflow-x-auto pb-1">
          <li
            v-for="show in row.shows"
            :key="show.id"
            class="min-w-52 shrink-0 rounded-md border border-(--border) p-3"
          >
            <p class="font-semibold text-(--text-h]">{{ show.name }}</p>
            <p class="text-sm">
              Rating:
              <span class="font-medium text-(--text-h)">{{ show.rating.average }}</span>
            </p>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
