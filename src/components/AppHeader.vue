<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { SearchIcon, TvIcon } from '@lucide/vue';
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="flex h-24 items-center justify-between gap-4 px-4 md:px-12">
      <RouterLink
        to="/"
        class="focus-ring-accent flex shrink-0 items-center gap-2 rounded-md group no-underline"
      >
        <div class="rounded-lg bg-primary/10 p-2 pr-4 transition-colors group-hover:bg-primary/20">
          <TvIcon class="size-6 text-primary ml-1" />
        </div>
        <span class="hidden text-2xl font-extrabold text-foreground sm:block">
          TV<span class="text-primary">Maze</span>
        </span>
      </RouterLink>

      <form class="relative w-full max-w-xl min-w-0" @submit.prevent>
        <SearchIcon
          class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <input
          type="search"
          placeholder="Search TV shows..."
          aria-label="Search TV shows"
          class="focus-ring-accent h-12 w-full text-lg rounded-md border border-input bg-secondary pl-10 pr-3 py-1 shadow-xs transition-colors placeholder:text-muted-foreground"
        />
      </form>
    </div>
  </header>
</template>
