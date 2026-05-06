<script setup lang="ts">
import AppSpinner from '@/components/ui/AppSpinner.vue';
import AppErrorState from '@/components/ui/AppErrorState.vue';

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
  <AppSpinner v-else-if="isPending" size="inline" :label="`Searching for “${query}”…`" />
  <AppErrorState
    v-else-if="isError"
    variant="inline"
    title="Search failed"
    :message="errorMessage"
  />
  <p v-else-if="!hasResults" class="text-muted-foreground text-2xl">
    No shows found for “{{ query }}”.
  </p>
</template>
