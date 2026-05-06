<script setup lang="ts">
import { Loader2Icon } from '@lucide/vue';

interface Props {
  label: string; // Describes what is loading (visible beside the spinner)
  size?: 'page' | 'inline'; // Page: centered hero-style; inline: row for denser layouts
}

withDefaults(defineProps<Props>(), { size: 'page' });
</script>

<template>
  <div
    class="flex items-center justify-center gap-3 text-muted-foreground"
    :class="size === 'page' ? 'min-h-48 flex-col py-8' : 'flex-row'"
    role="status"
    aria-live="polite"
  >
    <Loader2Icon
      class="shrink-0 animate-spin text-primary"
      :class="size === 'page' ? 'h-11 w-11' : 'h-6 w-6'"
      aria-hidden="true"
    />
    <span class="text-sm">{{ label }}</span>
  </div>
</template>
