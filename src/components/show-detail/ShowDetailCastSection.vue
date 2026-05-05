<script setup lang="ts">
import type { TvMazeCastMember } from '@/types/tvmaze.ts';
import defaultPoster from '@/assets/default-poster.png';

interface Props {
  cast: TvMazeCastMember[];
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
}

defineProps<Props>();
</script>

<template>
  <section class="space-y-2">
    <h2 class="text-xl font-semibold text-foreground">Cast</h2>
    <p v-if="isPending" class="text-sm">Loading cast...</p>
    <p v-else-if="isError" class="text-sm text-red-500">{{ errorMessage }}</p>
    <ul
      v-else-if="cast.length > 0"
      class="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      <li
        v-for="castMember in cast"
        :key="castMember.person.id"
        class="space-y-2 rounded-lg border border-border bg-secondary/40 p-2"
      >
        <img
          :src="castMember.person.image?.medium ?? defaultPoster"
          :alt="castMember.person.name"
          class="aspect-square w-full rounded-md object-cover"
          loading="lazy"
        />
        <p class="truncate text-sm font-medium text-foreground">{{ castMember.person.name }}</p>
        <p class="truncate text-xs text-muted-foreground">as {{ castMember.character.name }}</p>
      </li>
    </ul>
    <p v-else class="text-sm">No cast data available.</p>
  </section>
</template>
