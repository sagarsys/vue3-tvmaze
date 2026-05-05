<script setup lang="ts">
import type { TvMazeEpisode } from '@/types/tvmaze';

interface Props {
  episodes: TvMazeEpisode[];
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
}

defineProps<Props>();
</script>

<template>
  <section class="space-y-2">
    <h2 class="text-xl font-semibold text-(--text-h)">Episodes</h2>
    <p v-if="isPending" class="text-sm">Loading episodes...</p>
    <p v-else-if="isError" class="text-sm text-red-500">{{ errorMessage }}</p>
    <ul v-else-if="episodes.length > 0" class="list-disc space-y-1 pl-5">
      <li v-for="episode in episodes" :key="episode.id">
        S{{ episode.season }}E{{ episode.number }} — {{ episode.name }}
      </li>
    </ul>
    <p v-else class="text-sm">No episode data available.</p>
  </section>
</template>
