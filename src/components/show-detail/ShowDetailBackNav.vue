<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink
      to="/"
      class="focus-ring-accent inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm text-foreground font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      ← Back to Dashboard
    </RouterLink>
  </nav>
</template>
