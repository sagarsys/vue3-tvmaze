<script setup lang="ts">
import type { TvMazeShowDetail } from '@/types/tvmaze.ts';

interface Props {
  show: TvMazeShowDetail;
}

const { show } = defineProps<Props>();
const { name, status, rating, genres, premiered, language } = show;
</script>

<template>
  <header class="space-y-2">
    <h1>{{ name }}</h1>
    <p class="text-sm text-(--text)">
      <span class="font-medium text-(--text-h)">{{ status }}</span>
      · Rating:
      <span class="font-medium text-(--text-h)">{{ rating.average }}</span>
      · {{ genres.length > 0 ? genres.join(', ') : 'No genres' }}
    </p>
    <p v-if="premiered || language" class="text-sm text-(--text)">
      <span v-if="premiered">Premiered {{ premiered }}</span>
      <span v-if="language"> {{ premiered ? ' · ' : '' }}Language: {{ language }} </span>
    </p>
  </header>
</template>
