<script setup lang="ts">
import type { TvMazeSearchResult } from '@/types/tvmaze.ts';
import ShowCard from '@/components/ShowCard.vue';

interface Props {
  query: string;
  results: TvMazeSearchResult[];
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm">Results for “{{ query }}”</p>
    <ul class="grid list-none grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-3 p-0">
      <li v-for="result in results" :key="result.show.id">
        <RouterLink
          :to="{ name: 'show', params: { id: String(result.show.id) } }"
          class="focus-ring-accent block rounded-md"
        >
          <ShowCard :show="result.show" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
