<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { fetchShowsPage } from '@/lib/api/tvmaze.ts';
import { computed } from 'vue';
import { capShows, groupShowsByGenre, sortShowsByRatingDesc } from '@/lib/domain/shows-grouping.ts';
import { DASHBOARD_GENRES, FEATURED_TOP_RATED_SLIDE_LIMIT } from '@/lib/domain/genres.ts';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';
import GenreRow from '@/components/dashboard/GenreRow.vue';
import AppErrorState from '@/components/shared/AppErrorState.vue';
import AppSpinner from '@/components/shared/AppSpinner.vue';
import { pickTopRatedShows } from '@/lib/domain/pick-top-rated-shows.ts';
import FeaturedHeroSlider from '@/components/dashboard/FeaturedHeroSlider.vue';

const DASHBOARD_PAGE_INDEX = 0;

const showsQuery = useQuery({
  queryKey: ['shows', DASHBOARD_PAGE_INDEX],
  queryFn: () => fetchShowsPage(DASHBOARD_PAGE_INDEX),
});

const shows = computed(() => showsQuery.data.value ?? []);

const featuredShows = computed(() =>
  pickTopRatedShows(shows.value, { limit: FEATURED_TOP_RATED_SLIDE_LIMIT })
);

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
  <section class="mx-auto mb-20">
    <h1 class="sr-only">TV show dashboard</h1>

    <AppSpinner v-if="showsQuery.isPending.value" label="Loading shows..." />
    <AppErrorState
      v-else-if="showsQuery.isError.value"
      title="Something went wrong while loading shows"
      :message="errorMessage"
      variant="page"
    />

    <template v-else>
      <div v-if="featuredShows.length">
        <FeaturedHeroSlider :shows="featuredShows" />
      </div>

      <section aria-labelledby="browse-genres-heading" class="px-4 pb-8 sm:px-6 lg:px-12 xl:px-16">
        <h2
          id="browse-genres-heading"
          class="mt-6 text-2xl font-semibold tracking-tight md:mt-0 md:mb-10 md:text-3xl sr-only"
        >
          Browse by genre
        </h2>
        <div class="mt-6 flex flex-col space-y-6">
          <GenreRow
            v-for="genreRow in displayedGenreRows"
            :key="genreRow.genre"
            :genre="genreRow.genre"
            :shows="genreRow.shows"
          />
        </div>
      </section>
    </template>
  </section>
</template>
