<script setup lang="ts">
interface Props {
  modelValue: string;
}

interface Emits {
  (event: 'update:modelValue', value: string): void;
  (event: 'submit'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

function handleSubmit(): void {
  emit('submit');
}
</script>

<template>
  <form class="flex flex-wrap items-center gap-3" @submit.prevent="handleSubmit">
    <input
      :value="modelValue"
      type="search"
      placeholder="Search TV shows..."
      class="w-full max-w-md rounded-md border border-(--border) bg-transparent px-3 py-2 text-(--text-h)"
      aria-label="Search TV shows"
      @input="handleInput"
    />
    <button
      type="submit"
      class="focus-ring-accent rounded-md border border-(--border) px-4 py-2 text-sm text-(--text-h)"
    >
      Search
    </button>
  </form>
</template>
