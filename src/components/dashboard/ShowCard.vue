<script setup lang="ts">
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';
import defaultPoster from '@/assets/default-poster.png';
import { computed } from 'vue';
import { stripHtmlToPlainText } from '@/lib/helpers/string.ts';
import { StarIcon } from '@lucide/vue';

interface Props {
  show: TvMazeShowSummary;
}

const { show } = defineProps<Props>();
const { id, name, image, rating, summary } = show;

const imageSrc = computed(() => image?.medium ?? defaultPoster);
const formattedRating = computed(() => (rating.average != null ? rating.average.toFixed(1) : null));
const summaryPreview = computed(() => {
  const plainSummary = stripHtmlToPlainText(summary);
  return plainSummary || 'No summary available';
});
</script>

<template>
  <RouterLink
    :to="{ name: 'show', params: { id: String(id) } }"
    class="focus-ring-accent group block w-40 shrink-0 md:w-80"
  >
    <div class="relative aspect-2/3 overflow-hidden rounded-lg bg-secondary">
      <img
        :src="imageSrc"
        :alt="name"
        class="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width="180"
        height="270"
        sizes="(max-width: 767px) 160px, 180px"
      />
      <div
        class="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
      />
      <div
        class="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform duration-300 motion-safe:group-hover:translate-y-0"
      >
        <p
          class="overflow-hidden text-sm text-shadow-black leading-5 text-foreground font-bold [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5]"
        >
          {{ summaryPreview }}
        </p>
      </div>
    </div>
    <div class="mt-2 space-y-1">
      <h3 class="truncate font-medium text-foreground transition-colors group-hover:text-primary">
        {{ name }}
      </h3>
      <div v-if="formattedRating" class="flex items-center gap-1">
        <StarIcon class="size-3 fill-primary text-primary" aria-hidden="true" />
        <span class="text-muted-foreground text-base">{{ formattedRating }}</span>
      </div>
    </div>
  </RouterLink>
</template>
