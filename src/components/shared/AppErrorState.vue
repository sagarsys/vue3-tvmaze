<script setup lang="ts">
import { AlertCircleIcon } from '@lucide/vue';

interface Props {
  title: string;
  message: string;
  variant?: 'page' | 'inline'; // Prominent dashboard-style card vs compact row/tab panels.
}

withDefaults(defineProps<Props>(), { variant: 'page' });
</script>

<template>
  <div
    role="alert"
    class="border border-destructive/45 text-foreground"
    :class="
      variant === 'page'
        ? 'rounded-xl bg-destructive/10 p-5 sm:p-6'
        : 'rounded-lg bg-destructive/5 p-4 text-sm'
    "
  >
    <div class="flex gap-3">
      <AlertCircleIcon
        class="shrink-0 text-destructive"
        :class="variant === 'page' ? 'mt-0.5 h-6 w-6' : 'h-5 w-5'"
        aria-hidden="true"
      />
      <div class="min-w-0">
        <p class="font-semibold leading-snug">{{ title }}</p>
        <p class="mt-1 leading-relaxed text-muted-foreground">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
