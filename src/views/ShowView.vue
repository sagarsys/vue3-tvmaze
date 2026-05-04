<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const showIdDisplay = computed(() => props.id);
</script>

<template>
  <section>
    <h1>Show detail</h1>
    <p>
      Placeholder — show id: <code>{{ showIdDisplay }}</code>
    </p>
  </section>
</template>

<style scoped></style>
