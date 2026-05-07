<script setup lang="ts">
interface Props {
  count: number;
  activeIndex: number;
}

defineProps<Props>();
defineEmits<{ select: [index: number] }>();
</script>

<template>
  <div
    class="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2 px-4"
    role="radiogroup"
    aria-label="Choose featured slide"
  >
    <button
      v-for="index in count"
      :key="index"
      type="button"
      role="radio"
      class="focus-ring-accent h-1.5 rounded-full transition-all focus-visible:h-3"
      :class="
        activeIndex === index - 1
          ? 'w-10 bg-primary'
          : 'w-6 bg-muted-foreground/40 hover:bg-muted-foreground/70'
      "
      :aria-checked="activeIndex === index - 1"
      :aria-label="`Featured slide ${index} of ${count}`"
      @click="$emit('select', index - 1)"
    />
  </div>
</template>
