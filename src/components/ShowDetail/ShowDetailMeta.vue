<script setup lang="ts">
import type { TvMazeShowDetail } from '@/types/tvmaze.ts';

interface Props {
  show: TvMazeShowDetail;
}

defineProps<Props>();
</script>

<template>
  <header class="space-y-2">
    <h1>{{ show.name }}</h1>
    <p class="text-sm text-(--text)">
      <span class="font-medium text-(--text-h)">{{ show.status }}</span>
      · Rating:
      <span class="font-medium text-(--text-h)">{{ show.rating.average }}</span>
      · {{ show.genres.length > 0 ? show.genres.join(', ') : 'No genres' }}
    </p>
    <p v-if="show.premiered || show.language" class="text-sm text-(--text)">
      <span v-if="show.premiered">Premiered {{ show.premiered }}</span>
      <span v-if="show.language">
        {{ show.premiered ? ' · ' : '' }}Language: {{ show.language }}
      </span>
    </p>
  </header>
</template>
