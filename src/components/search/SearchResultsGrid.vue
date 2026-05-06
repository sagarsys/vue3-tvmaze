<script setup lang="ts">
import { Star } from '@lucide/vue';

import type { TvMazeSearchResult } from '@/types/tvmaze.ts';
import defaultPoster from '@/assets/default-poster.png';
import { stripHtmlToPlainText } from '@/lib/helpers/string.ts';
import ShowDetailStatus from '@/components/show-detail/ShowDetailStatus.vue';

interface Props {
  query: string;
  results: TvMazeSearchResult[];
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <ul class="grid list-none gap-4 p-0">
      <li v-for="result in results" :key="result.show.id">
        <RouterLink
          :to="{ name: 'show', params: { id: String(result.show.id) } }"
          class="focus-ring-accent group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80"
        >
          <img
            :src="result.show.image?.medium ?? defaultPoster"
            :alt="result.show.name"
            class="h-28 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-28"
            loading="lazy"
          />
          <div class="min-w-0 flex-1 py-1">
            <h2
              class="truncate text-lg font-semibold text-foreground transition-colors group-hover:text-primary md:text-xl"
            >
              {{ result.show.name }}
            </h2>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <div v-if="result.show.rating.average != null" class="flex items-center gap-1">
                <Star class="h-4 w-4 fill-primary text-primary" />
                <span class="text-sm font-medium text-foreground">
                  {{ result.show.rating.average.toFixed(1) }}
                </span>
              </div>
              <span v-if="result.show.premiered" class="text-sm text-muted-foreground">
                {{ new Date(result.show.premiered).getFullYear() }}
              </span>
              <ShowDetailStatus v-if="result.show.status" :status="result.show.status" />
            </div>
            <div class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="genre in result.show.genres.slice(0, 3)"
                :key="genre"
                class="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {{ genre }}
              </span>
            </div>
            <p
              v-if="result.show.summary"
              class="mt-2 hidden overflow-hidden text-sm text-muted-foreground md:block [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
            >
              {{ stripHtmlToPlainText(result.show.summary) }}
            </p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
