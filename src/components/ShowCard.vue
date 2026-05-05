<script setup lang="ts">
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';
import defaultPoster from '@/assets/default-poster.png';

interface Props {
  show: TvMazeShowSummary;
}

const { show } = defineProps<Props>();
const { image, name, rating } = show;
</script>

<template>
  <div
    class="h-full min-w-52 space-y-2 rounded-md border border-(--border) p-2 text-left transition-colors hover:bg-(--code-bg)"
  >
    <div class="aspect-2/3 overflow-hidden rounded-md border border-(--border) bg-black/20 w-48">
      <img
        :src="image?.medium ?? defaultPoster"
        :alt="`Poster for ${name}`"
        class="w-full h-full object-cover"
        loading="lazy"
      />>
    </div>
    <p class="font-semibold text-(--text-h)">{{ name }}</p>
    <p class="text-sm">
      Rating:
      <span class="font-medium text-(--text-h)">{{ rating.average }}</span>
    </p>
  </div>
</template>
