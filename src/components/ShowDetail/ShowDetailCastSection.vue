<script setup lang="ts">
import type { TvMazeCastMember } from '@/types/tvmaze.ts';

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
    <h2 class="text-xl font-semibold text-(--text-h)">Cast</h2>
    <p v-if="isPending" class="text-sm">Loading cast...</p>
    <p v-else-if="isError" class="text-sm text-red-500">{{ errorMessage }}</p>
    <ul v-else-if="cast.length > 0" class="list-disc space-y-1 pl-5">
      <li v-for="castMember in cast" :key="castMember.person.id">
        {{ castMember.person.name }} as {{ castMember.character.name }}
      </li>
    </ul>
    <p v-else class="text-sm">No cast data available.</p>
  </section>
</template>
