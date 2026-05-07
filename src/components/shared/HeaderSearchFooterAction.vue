<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';

interface Props {
  query: string;
}

defineProps<Props>();
defineEmits<{ click: [] }>();
</script>

<template>
  <div class="border-t border-border px-2 py-1.5">
    <button
      type="button"
      class="focus-ring-accent flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      @click="$emit('click')"
    >
      <SearchIcon class="h-4 w-4 shrink-0" aria-hidden="true" />
      <span class="truncate">Search for "{{ query }}"</span>
    </button>
  </div>
</template>
