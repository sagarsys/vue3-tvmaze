<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue';
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';
import { ref } from 'vue';
import ShowCard from '@/components/dashboard/ShowCard.vue';

interface Props {
  genre: string;
  shows: TvMazeShowSummary[];
}

defineProps<Props>();

const scrollContainer = ref<HTMLElement | null>(null);
const SCROLL_AMOUNT = 420;

/** Scrolls the horizontal row in the requested direction. */
function handleScroll(direction: 'left' | 'right') {
  if (!scrollContainer.value) return;

  scrollContainer.value.scrollBy({
    left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
    behavior: 'smooth',
  });
}
</script>

<template>
  <section class="group/row space-y-3 mb-10" :aria-label="`${genre} shows`">
    <h3 class="text-2xl font-bold md:text-4xl md:my-6">{{ genre }}</h3>
    <div class="relative">
      <button
        type="button"
        class="focus-ring-accent absolute top-1/2 left-0 z-10 flex h-16 w-9 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-r-lg border border-primary/40 bg-primary/5 text-primary shadow-md backdrop-blur-sm transition-opacity md:left-0 md:h-24 md:w-10 md:border-border/60 md:text-foreground md:opacity-0 md:shadow-none md:group-hover/row:opacity-100 hover:bg-primary hover:text-background"
        aria-label="Scroll left"
        @click="handleScroll('left')"
      >
        <ChevronLeftIcon class="h-6 w-6" />
      </button>

      <ul
        ref="scrollContainer"
        class="flex list-none gap-3 overflow-x-auto pb-1 scrollbar-hide md:gap-8"
        :aria-label="`${genre} show carousel`"
      >
        <li v-for="show in shows" :key="show.id" class="shrink-0">
          <ShowCard :show="show" />
        </li>
      </ul>

      <button
        type="button"
        class="focus-ring-accent absolute top-1/2 right-0 z-10 flex h-16 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-l-lg border border-primary/40 bg-primary/5 text-primary shadow-md backdrop-blur-sm transition-opacity md:right-0 md:h-24 md:w-10 md:border-border/60 md:text-foreground md:opacity-0 md:shadow-none md:group-hover/row:opacity-100 hover:bg-primary hover:text-background"
        aria-label="Scroll right"
        @click="handleScroll('right')"
      >
        <ChevronRightIcon class="h-6 w-6" />
      </button>
    </div>
  </section>
</template>
