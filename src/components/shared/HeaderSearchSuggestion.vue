<script setup lang="ts">
import { RouterLink } from 'vue-router';

import defaultPoster from '@/assets/default-poster.png';
import type { TvMazeSearchResult } from '@/types/tvmaze';
import { StarIcon } from '@lucide/vue';

interface Props {
  result: TvMazeSearchResult;
}

defineProps<Props>();
defineEmits<{ pick: [] }>();
</script>

<template>
  <RouterLink
    :to="{ name: 'show', params: { id: String(result.show.id) } }"
    class="focus-ring-accent flex items-center gap-3 px-4 py-2 no-underline transition-colors hover:bg-secondary"
    @click="$emit('pick')"
  >
    <img
      :src="result.show.image?.medium ?? defaultPoster"
      :alt="result.show.name"
      class="h-14 w-10 shrink-0 rounded bg-muted object-cover"
      loading="lazy"
    />
    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium text-foreground">{{ result.show.name }}</p>
      <p class="truncate text-xs text-muted-foreground">
        {{ result.show.genres.slice(0, 3).join(', ') || 'No genres' }}
      </p>
    </div>
    <span
      v-if="result.show.rating.average != null"
      class="shrink-0 text-xs font-medium flex items-center"
    >
      <StarIcon class="h-3 w-3 fill-primary text-primary mr-1" />
      {{ result.show.rating.average.toFixed(1) }}
    </span>
  </RouterLink>
</template>
