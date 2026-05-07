<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { TvIcon } from '@lucide/vue';
import HeaderSearchBar from '@/components/shared/HeaderSearchBar.vue';
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="mx-auto flex h-24 w-full items-center justify-between gap-4 px-4 md:px-12">
      <RouterLink
        to="/"
        class="focus-ring-accent flex shrink-0 items-center gap-2 rounded-md group no-underline"
      >
        <div class="rounded-lg bg-primary/10 p-2 pr-4 transition-colors group-hover:bg-primary/20">
          <TvIcon class="size-6 text-primary" />
        </div>
        <span class="hidden text-2xl font-extrabold text-foreground sm:block">
          TV<span class="text-primary">Maze</span>
        </span>
      </RouterLink>

      <HeaderSearchBar />
    </div>
  </header>
</template>
