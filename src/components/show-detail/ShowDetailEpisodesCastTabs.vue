<script setup lang="ts">
import ShowDetailCastSection from '@/components/show-detail/ShowDetailCastSection.vue';
import { ref } from 'vue';
import type { TvMazeCastMember, TvMazeEpisode } from '@/types/tvmaze.ts';
import ShowDetailEpisodesList from '@/components/show-detail/ShowDetailEpisodesList.vue';

interface Props {
  episodes: TvMazeEpisode[];
  cast: TvMazeCastMember[];
  episodesPending: boolean;
  episodesError: boolean;
  episodesErrorMessage: string;
  castPending: boolean;
  castError: boolean;
  castErrorMessage: string;
}

defineProps<Props>();

type ActiveTabType = 'episodes' | 'cast';

const activeTab = ref<ActiveTabType>('episodes');

function handleSelection(tab: ActiveTabType) {
  activeTab.value = tab;
}
</script>

<template>
  <section class="mt-10 space-y-6">
    <div class="inline-flex rounded-lg border border-border bg-secondary/50 p-1">
      <button
        type="button"
        class="focus-ring-accent rounded-md px-3 py-1.5 text-sm transition-colors"
        :class="
          activeTab === 'episodes'
            ? 'bg-background text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        "
        :aria-pressed="activeTab === 'episodes'"
        @click="handleSelection('episodes')"
      >
        Episodes ({{ episodes.length }})
      </button>
      <button
        type="button"
        class="focus-ring-accent rounded-md px-3 py-1.5 text-sm transition-colors"
        :class="
          activeTab === 'cast'
            ? 'bg-background text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        "
        :aria-pressed="activeTab === 'cast'"
        @click="handleSelection('cast')"
      >
        Cast ({{ cast.length }})
      </button>
    </div>

    <ShowDetailEpisodesList
      v-if="activeTab === 'episodes'"
      :episodes="episodes"
      :is-pending="episodesPending"
      :is-error="episodesError"
      :error-message="episodesErrorMessage"
    />
    <ShowDetailCastSection
      v-else
      :cast="cast"
      :is-pending="castPending"
      :is-error="castError"
      :error-message="castErrorMessage"
    />
  </section>
</template>
