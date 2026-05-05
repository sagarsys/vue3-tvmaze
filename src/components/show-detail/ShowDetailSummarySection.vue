<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<template>
  <section class="space-y-2">
    <p class="max-w-none text-base leading-relaxed text-muted-foreground">{{ text }}</p>
  </section>
</template>
