<script setup lang="ts">
interface Props {
  imageUrl: string;
  showName: string;
}

defineProps<Props>();
</script>

<template>
  <div class="max-w-xs">
    <img
      :src="imageUrl"
      :alt="`Poster for ${showName}`"
      class="w-full rounded-md border border-(--border)"
      width="210"
      height="295"
      loading="lazy"
    />
  </div>
</template>
