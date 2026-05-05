<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<template>
  <section class="space-y-2">
    <h2 class="text-xl font-semibold text-(--text-h)">Summary</h2>
    <p class="max-w-prose text-(--text)">{{ text }}</p>
  </section>
</template>
