<script setup lang="ts">
interface Props {
  hasQuery: boolean;
  isPending: boolean;
  isError: boolean;
  query: string;
  errorMessage: string;
  hasResults: boolean;
}

defineProps<Props>();
</script>

<template>
  <p v-if="!hasQuery" class="text-sm text-muted-foreground">
    Use the header search bar to find TV shows.
  </p>
  <p v-else-if="isPending">Searching for “{{ query }}”...</p>
  <p v-else-if="isError" class="text-red-500">Search failed: {{ errorMessage }}</p>
  <p v-else-if="!hasResults" class="text-muted-foreground">No shows found for “{{ query }}”.</p>
</template>
