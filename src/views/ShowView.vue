<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { fetchShowCast, fetchShowDetail, fetchShowEpisodes } from '@/lib/api/tvmaze.ts';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';
import { stripHtmlToPlainText } from '@/lib/helpers/string.ts';
import ShowDetailBackNav from '@/components/show-detail/ShowDetailBackNav.vue';
import ShowDetailInvalidNotice from '@/components/show-detail/ShowDetailInvalidNotice.vue';
import ShowDetailMeta from '@/components/show-detail/ShowDetailMeta.vue';
import ShowDetailPoster from '@/components/show-detail/ShowDetailPoster.vue';
import ShowDetailSummarySection from '@/components/show-detail/ShowDetailSummarySection.vue';
import ShowDetailCastSection from '@/components/show-detail/ShowDetailCastSection.vue';
import ShowDetailEpisodesList from '@/components/show-detail/ShowDetailEpisodesList.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const showId = computed(() => Number.parseInt(props.id));
// check that we have a valid id
const isValidShowId = computed(
  () => Number.isFinite(showId.value) && Number.isInteger(showId.value) && showId.value > 0
);

const showQuery = useQuery({
  queryKey: ['show', showId],
  queryFn: () => fetchShowDetail(showId.value),
  enabled: isValidShowId,
});

const castQuery = useQuery({
  queryKey: ['cast', showId],
  queryFn: () => fetchShowCast(showId.value),
  enabled: isValidShowId,
});

const episodesQuery = useQuery({
  queryKey: ['episodes', showId],
  queryFn: () => fetchShowEpisodes(showId.value),
  enabled: isValidShowId,
});

const show = computed(() => showQuery.data.value);
const cast = computed(() => castQuery.data.value ?? []);
const episodes = computed(() => episodesQuery.data.value ?? []);

const errorMessage = useQueryErrorMessage(
  () => showQuery.error.value,
  'Something went wrong while loading this show'
);

const castErrorMessage = useQueryErrorMessage(
  () => castQuery.error.value,
  'Something went wrong while loading the cast'
);

const episodesErrorMessage = useQueryErrorMessage(
  () => episodesQuery.error.value,
  'Something went wrong while loading the episodes'
);

const summaryText = computed(() => stripHtmlToPlainText(show.value?.summary ?? null));
</script>

<template>
  <article class="space-y-6">
    <ShowDetailBackNav />
    <ShowDetailInvalidNotice v-if="!isValidShowId" />
    <template v-else>
      <p v-if="showQuery.isPending.value">Loading show...</p>
      <p v-else-if="showQuery.isError.value" class="text-red-500">
        Failed to load show: {{ errorMessage }}
      </p>

      <template v-else-if="show">
        <ShowDetailMeta :show="show" />
        <ShowDetailPoster
          v-if="show.image?.medium"
          :image-url="show.image.medium"
          :show-name="show.name"
        />
        <ShowDetailSummarySection v-if="summaryText" :text="summaryText" />
        <ShowDetailCastSection
          :cast="cast"
          :is-pending="castQuery.isPending.value"
          :is-error="castQuery.isError.value"
          :error-message="castErrorMessage"
        />
        <ShowDetailEpisodesList
          :episodes="episodes"
          :is-pending="episodesQuery.isPending.value"
          :is-error="episodesQuery.isError.value"
          :error-message="episodesErrorMessage"
        />
      </template>
    </template>
  </article>
</template>

<style scoped></style>
