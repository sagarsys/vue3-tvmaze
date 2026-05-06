<script setup lang="ts">
import { CirclePlay } from '@lucide/vue';

interface Props {
  url: string;
  name: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex justify-center md:justify-start my-4">
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`View ${name} on TVMaze (opens in new tab)`"
      class="focus-ring-accent btn-primary"
    >
      <CirclePlay class="mr-2 h-5 w-5" />
      View on TVMaze
    </a>
  </div>
</template>
