<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-background">
    <AppHeader />
    <div class="mx-auto w-full flex-1 px-4 pb-8 sm:px-6 lg:px-16">
      <main class="min-h-88 py-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
