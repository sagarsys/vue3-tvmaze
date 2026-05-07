<script setup lang="ts">
import type { TvMazeEpisode } from '@/types/tvmaze';
import { groupEpisodesBySeason } from '@/lib/domain/seasons-grouping.ts';
import { computed } from 'vue';
import { StarIcon } from '@lucide/vue';
import defaultPoster from '@/assets/default-poster.png';
import AppSpinner from '@/components/shared/AppSpinner.vue';
import AppErrorState from '@/components/shared/AppErrorState.vue';

interface Props {
  episodes: TvMazeEpisode[];
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
}

const { episodes } = defineProps<Props>();

const episodesBySeason = computed(() => groupEpisodesBySeason(episodes));

function formatEpisodeMeta(episode: TvMazeEpisode) {
  const dateLabel = episode.airdate
    ? new Date(episode.airdate).toLocaleDateString('en-GB')
    : 'Unknown date';
  const runtimeLabel = episode.runtime ? `${episode.runtime} min` : null;
  return runtimeLabel ? `${dateLabel} • ${runtimeLabel}` : dateLabel;
}
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold text-foreground md:text-3xl">Episodes</h2>
    <AppSpinner v-if="isPending" size="inline" label="Loading episodes..." />
    <AppErrorState
      v-else-if="isError"
      variant="inline"
      title="Something went wrong while loading episodes"
      :message="errorMessage"
    />
    <div v-else-if="episodes.length > 0" class="grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
      <section
        v-for="seasonGroup in episodesBySeason"
        :key="seasonGroup.season"
        class="space-y-3 rounded-xl border border-border bg-card/70 p-4"
      >
        <h3 class="text-base font-semibold text-foreground">Season {{ seasonGroup.season }}</h3>
        <ul class="list-none space-y-2 p-0">
          <li
            v-for="episode in seasonGroup.episodes"
            :key="episode.id"
            class="flex items-start gap-3 rounded-md bg-secondary/60 px-3 py-2"
          >
            <img
              :src="episode.image?.medium ?? defaultPoster"
              :alt="episode.name"
              class="h-14 w-24 shrink-0 rounded-md object-cover"
              loading="lazy"
            />

            <div class="min-w-0 flex-1 space-y-1">
              <p class="truncate text-base font-medium text-foreground">
                E{{ episode.number }}: {{ episode.name }}
              </p>
              <p class="text-sm text-muted-foreground">{{ formatEpisodeMeta(episode) }}</p>
            </div>

            <div v-if="episode.rating.average != null" class="mt-1 flex items-center gap-1">
              <StarIcon class="h-3.5 w-3.5 fill-primary text-primary" />
              <span class="text-xs font-medium text-foreground">
                {{ episode.rating.average.toFixed(1) }}
              </span>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <p v-else class="text-sm">No episode data available.</p>
  </section>
</template>
