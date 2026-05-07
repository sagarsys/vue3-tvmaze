<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/shared/AppHeader.vue';
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-background">
    <a
      href="#main-content"
      class="focus-ring-accent sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
    >
      Skip to main content
    </a>
    <AppHeader />
    <main id="main-content" class="min-h-88" tabindex="-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="route-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>
