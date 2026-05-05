<script setup lang="ts">
interface Props {
  genres: string[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center md:justify-start">
    <span
      v-for="genre in genres"
      :key="genre"
      class="rounded-full border border-border bg-primary/15 px-2.5 py-1 text-xs font-medium text-foreground"
    >
      {{ genre }}
    </span>
  </div>
</template>
