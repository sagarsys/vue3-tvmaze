<script setup lang="ts">
interface Props {
  status: string | null;
}

defineProps<Props>();
</script>

<template>
  <span
    class="inline-flex rounded-full border px-2.5 py-1 text-sm font-bold"
    :class="
      status === 'Running'
        ? 'border-primary/50 bg-primary/15 text-primary'
        : 'border-border bg-secondary text-foreground'
    "
  >
    {{ status }}
  </span>
</template>
