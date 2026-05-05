<script setup lang="ts">
interface Props {
  imageUrl: string;
  showName: string;
}

defineProps<Props>();
</script>

<template>
  <div class="mx-auto w-60 shrink-0 md:mx-0 md:w-110">
    <img
      :src="imageUrl"
      :alt="`Poster for ${showName}`"
      class="aspect-2/3 w-full rounded-xl border border-border object-cover shadow-2xl"
      width="300"
      height="450"
      loading="lazy"
    />
  </div>
</template>
