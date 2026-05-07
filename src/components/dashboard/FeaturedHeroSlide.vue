<script setup lang="ts">
import { InfoIcon, PlayIcon, StarIcon } from '@lucide/vue';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import defaultPoster from '@/assets/default-poster.png';
import { stripHtmlToPlainText } from '@/lib/helpers/string.ts';
import type { TvMazeShowSummary } from '@/types/tvmaze';

interface Props {
  show: TvMazeShowSummary;
}

const { show } = defineProps<Props>();

const backdropSrc = computed(() => show.image?.original ?? show.image?.medium ?? defaultPoster);
const synopsis = computed(
  () => stripHtmlToPlainText(show.summary) || 'Discover this title in the catalogue.'
);

const ratingLabel = computed(() =>
  show.rating.average != null ? show.rating.average.toFixed(1) : null
);

const genreBadges = computed(() => show.genres.slice(0, 3));
</script>

<template>
  <div class="relative min-h-[min(85dvh,40rem)] w-full md:min-h-[min(88dvh,60rem)] px-12">
    <img
      :src="backdropSrc"
      :alt="''"
      class="absolute inset-0 h-full w-full object-cover object-center"
      decoding="async"
      fetchpriority="high"
    />
    <!-- streaming-style vignette -->
    <div
      class="absolute inset-0 bg-linear-to-t from-background via-background/70 via-40% to-transparent"
      aria-hidden="true"
    />
    <div
      class="absolute inset-y-0 left-0 z-1 w-full bg-linear-to-r from-background/95 via-background/60 to-transparent sm:w-[85%] md:w-[70%]"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex min-h-[inherit] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 md:justify-center md:pb-14 md:pt-28 lg:px-8"
    >
      <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary sm:text-xs">
        Top rated picks
      </p>
      <h2
        class="text-balance text-3xl font-extrabold tracking-tight text-foreground shadow-sm sm:text-4xl lg:text-5xl"
      >
        {{ show.name }}
      </h2>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <span
          v-if="ratingLabel"
          class="inline-flex items-center gap-1 rounded-md border border-primary/50 bg-primary/15 px-2 py-0.5 text-sm font-semibold tabular-nums text-primary"
        >
          <StarIcon class="size-3.5 fill-primary text-primary" aria-hidden="true" />
          {{ ratingLabel }}
        </span>
        <span
          v-for="genre in genreBadges"
          :key="genre"
          class="rounded-full border border-border bg-secondary/70 px-2.5 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          {{ genre }}
        </span>
      </div>

      <p
        class="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px] line-clamp-3"
      >
        {{ synopsis }}
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <RouterLink
          class="focus-ring-accent inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 md:text-base"
          :to="{ name: 'show', params: { id: String(show.id) } }"
        >
          <PlayIcon class="size-5 fill-current" aria-hidden="true" />
          Play
        </RouterLink>
        <RouterLink
          class="focus-ring-accent inline-flex items-center gap-2 rounded-md border border-muted-foreground/40 bg-muted/35 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-muted/50 md:text-base"
          :to="{ name: 'show', params: { id: String(show.id) } }"
        >
          <InfoIcon class="size-5" aria-hidden="true" />
          More Info
        </RouterLink>
      </div>
    </div>
  </div>
</template>
