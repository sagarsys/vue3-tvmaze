<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { fetchShowCast, fetchShowDetail, fetchShowEpisodes } from '@/lib/api/tvmaze.ts';
import { useQueryErrorMessage } from '@/composables/useQueryErrorMessage.ts';
import ShowDetailBackNav from '@/components/show-detail/ShowDetailBackNav.vue';
import ShowDetailInvalidNotice from '@/components/show-detail/ShowDetailInvalidNotice.vue';
import ShowDetailMeta from '@/components/show-detail/ShowDetailMeta.vue';
import ShowDetailPoster from '@/components/show-detail/ShowDetailPoster.vue';
import ShowDetailEpisodesCastTabs from '@/components/show-detail/ShowDetailEpisodesCastTabs.vue';
import AppSpinner from '@/components/shared/AppSpinner.vue';
import AppErrorState from '@/components/shared/AppErrorState.vue';

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
</script>

<template>
  <article class="space-y-6 px-4 pb-8 sm:px-6 lg:px-12 xl:px-16">
    <ShowDetailInvalidNotice v-if="!isValidShowId" />
    <template v-else>
      <AppSpinner v-if="showQuery.isPending.value" label="Loading show..." />
      <AppErrorState
        v-else-if="showQuery.isError.value"
        title="Something went wrong while loading this show"
        :message="errorMessage"
        variant="page"
      />

      <template v-else-if="show">
        <section class="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="absolute inset-0 h-105 overflow-hidden md:h-130" aria-hidden="true">
            <img
              v-if="show.image?.medium"
              :src="show.image.medium"
              alt=""
              class="h-full w-full object-cover object-top opacity-30 blur-xl"
            />
            <div
              class="absolute inset-0 bg-linear-to-b from-background/50 via-background/85 to-background"
            />
          </div>
          <div class="relative px-4 pt-4 sm:px-6 lg:px-8">
            <ShowDetailBackNav />

            <div class="mt-5 flex flex-col gap-8 md:flex-row">
              <ShowDetailPoster
                v-if="show.image?.medium"
                :image-url="show.image.medium"
                :show-name="show.name"
              />
              <ShowDetailMeta :show="show" />
            </div>
          </div>
        </section>

        <ShowDetailEpisodesCastTabs
          :episodes="episodes"
          :cast="cast"
          :episodes-pending="episodesQuery.isPending.value"
          :episodes-error="episodesQuery.isError.value"
          :episodes-error-message="episodesErrorMessage"
          :cast-pending="castQuery.isPending.value"
          :cast-error="castQuery.isError.value"
          :cast-error-message="castErrorMessage"
        />
      </template>
    </template>
  </article>
</template>
