<script setup lang="ts">
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';

interface Props {
  show: TvMazeShowSummary;
}

const { show } = defineProps<Props>();
</script>

<template>
  <div
    class="h-full min-w-52 rounded-md border border-(--border) p-3 text-left transition-colors hover:bg-(--code-bg)"
  >
    <p class="font-semibold text-(--text-h)">{{ show.name }}</p>
    <p class="text-sm">
      Rating:
      <span class="font-medium text-(--text-h)">{{ show.rating.average }}</span>
    </p>
  </div>
</template>
