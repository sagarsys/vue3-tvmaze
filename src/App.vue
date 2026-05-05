<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

const navLinkClass =
  'font-semibold no-underline hover:underline [&.router-link-active]:text-[var(--accent)]';
</script>

<template>
  <div class="mx-auto max-w-full px-5 py-6 pb-12">
    <header class="mb-6 border-b border-(--border) pb-4">
      <nav class="flex flex-wrap gap-x-5 gap-y-3">
        <RouterLink :class="navLinkClass" to="/">Dashboard</RouterLink>
        <RouterLink :class="navLinkClass" to="/show/1">Show details</RouterLink>
        <RouterLink :class="navLinkClass" to="/search">Search</RouterLink>
      </nav>
    </header>
    <main class="min-h-48">
      <RouterView />
    </main>
  </div>
</template>
