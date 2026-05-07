<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue';
import { computed, ref } from 'vue';

import FeaturedHeroDots from '@/components/dashboard/FeaturedHeroDots.vue';
import FeaturedHeroSlide from '@/components/dashboard/FeaturedHeroSlide.vue';
import { useAutoRotateSlides } from '@/composables/useAutoRotateSlides.ts';
import type { TvMazeShowSummary } from '@/types/tvmaze';

interface Props {
  shows: TvMazeShowSummary[];
}

const props = defineProps<Props>();

const activeIndex = ref(0);
const slides = computed(() => props.shows);
const activeShow = computed(() => slides.value[activeIndex.value] ?? null);
const hasMultiple = computed(() => slides.value.length > 1);

const { restart } = useAutoRotateSlides({
  intervalMs: 5000,
  enabled: hasMultiple,
  onTick: () => goTo((activeIndex.value + 1) % slides.value.length),
});

// Navigates to a specific slide and resets the auto-rotate timer.
function goTo(index: number) {
  activeIndex.value = index;
  restart();
}

// Wraps to the previous slide.
function handlePrev() {
  goTo(activeIndex.value === 0 ? slides.value.length - 1 : activeIndex.value - 1);
}

// Wraps to the next slide.
function handleNext() {
  goTo((activeIndex.value + 1) % slides.value.length);
}
</script>

<template>
  <section
    v-if="activeShow"
    class="relative w-full bg-black shadow-2xl"
    aria-roledescription="carousel"
    aria-label="Featured top rated titles"
  >
    <Transition mode="out-in" name="hero-fade">
      <FeaturedHeroSlide :key="activeShow.id" :show="activeShow" />
    </Transition>

    <template v-if="hasMultiple">
      <button
        type="button"
        class="focus-ring-accent absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-accent-foreground/50 text-white backdrop-blur-md transition-colors hover:bg-primary/80 hover:border-primary sm:left-4 sm:h-12 sm:w-12"
        aria-label="Previous featured show"
        @click="handlePrev"
      >
        <ChevronLeftIcon class="size-7 sm:size-8" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="focus-ring-accent absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-accent-foreground/50 text-white backdrop-blur-md transition-colors hover:bg-primary/80 hover:border-primary sm:right-4 sm:h-12 sm:w-12"
        aria-label="Next featured show"
        @click="handleNext"
      >
        <ChevronRightIcon class="size-7 sm:size-8" aria-hidden="true" />
      </button>

      <FeaturedHeroDots :count="slides.length" :active-index="activeIndex" @select="goTo" />
    </template>
  </section>
</template>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 300ms ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
