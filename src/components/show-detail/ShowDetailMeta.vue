<script setup lang="ts">
import type { TvMazeShowDetail } from '@/types/tvmaze.ts';
import { CalendarIcon, GlobeIcon, StarIcon, Clock1Icon, TvMinimalIcon } from '@lucide/vue';
import { computed } from 'vue';
import ShowDetailStatus from '@/components/show-detail/ShowDetailStatus.vue';
import ShowDetailSummarySection from '@/components/show-detail/ShowDetailSummarySection.vue';
import { stripHtmlToPlainText } from '@/lib/helpers/string.ts';
import ShowDetailViewLink from '@/components/show-detail/ShowDetailViewLink.vue';
import ShowDetailGenresList from '@/components/show-detail/ShowDetailGenresList.vue';

interface Props {
  show: TvMazeShowDetail;
}

const { show } = defineProps<Props>();
const {
  name,
  status,
  rating,
  genres,
  premiered,
  ended,
  runtime,
  language,
  summary,
  network,
  webChannel,
  url,
} = show;

const yearSpan = computed(() => {
  if (premiered == null && ended == null) return 'N/A';
  const premieredYear = premiered != null ? new Date(premiered).getFullYear() : '';
  const endedYear = ended != null ? new Date(ended).getFullYear() : '';
  return `${premieredYear} -  ${endedYear}`;
});
const summaryText = computed(() => stripHtmlToPlainText(summary ?? null));
</script>

<template>
  <header class="flex-1 space-y-6 text-center md:text-left">
    <h1 class="mb-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{{ name }}</h1>

    <ShowDetailGenresList v-if="genres.length > 0" :genres="genres" />

    <div
      class="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start"
    >
      <div v-if="rating.average != null" class="flex items-center gap-1">
        <StarIcon class="h-4 w-4 fill-primary text-primary" />
        <span class="text-base font-semibold text-foreground">{{ rating.average.toFixed(1) }}</span>
      </div>
      <div v-if="yearSpan" class="flex items-center gap-1">
        <CalendarIcon class="h-4 w-4 text-primary" />
        <span>{{ yearSpan }}</span>
      </div>
      <div v-if="runtime" class="flex items-center gap-1">
        <Clock1Icon class="h-4 w-4 text-primary" />
        <span>{{ runtime }} min</span>
      </div>
      <div v-if="network || webChannel" class="flex items-center gap-1">
        <TvMinimalIcon class="h-4 w-4 text-primary" />
        <span>{{ network?.name || webChannel?.name }}</span>
      </div>
      <div v-if="language" class="flex items-center gap-1">
        <GlobeIcon class="h-4 w-4 text-primary" />
        <span>{{ language }}</span>
      </div>
    </div>

    <ShowDetailStatus v-if="status" :status="status" />

    <ShowDetailSummarySection v-if="summaryText" :text="summaryText" />

    <ShowDetailViewLink v-if="url" :url="url" :name="name" />
  </header>
</template>
