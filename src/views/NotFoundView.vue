<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { GhostIcon, TvIcon } from '@lucide/vue';
</script>

<template>
  <section
    class="not-found-dither relative overflow-hidden rounded-2xl border border-border bg-card/40 px-6 py-50 sm:py-80"
  >
    <div
      class="pointer-events-none absolute -right-8 top-6 h-48 w-48 rounded-full bg-primary/15 blur-3xl motion-reduce:hidden"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-chart-4/20 blur-3xl motion-reduce:hidden"
      aria-hidden="true"
    />

    <div class="relative mx-auto flex max-w-lg flex-col items-center text-center">
      <div class="relative mb-6 flex items-center justify-center">
        <span
          class="not-found-glitch select-none font-mono text-8xl font-black tabular-nums tracking-tighter text-primary/90 motion-reduce:animate-none sm:text-9xl"
          data-text="404"
          aria-hidden="true"
        >
          404
        </span>
        <TvIcon
          class="absolute -right-2 -top-4 h-10 w-10 text-muted-foreground/40 motion-safe:animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
      </div>

      <GhostIcon class="mb-4 h-12 w-12 text-muted-foreground" aria-hidden="true" />
      <h1
        class="not-found-title mt-0 mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Lost signal — wrong channel.
      </h1>
      <p class="mb-8 max-w-md text-pretty text-muted-foreground">
        This URL never made it past the bunny ears. Tune back to the guide and we&apos;ll pretend
        this never happened.
      </p>

      <RouterLink to="/" class="focus-ring-accent btn-primary">
        <TvIcon class="h-5 w-5" aria-hidden="true" />
        Take me back home
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found-dither {
  background-image:
    radial-gradient(circle at 20% 30%, oklch(0.65 0.2 145 / 0.08) 0%, transparent 45%),
    repeating-linear-gradient(
      -12deg,
      oklch(0.98 0 0 / 0.02) 0 1px,
      transparent 1px 3px,
      oklch(0.06 0 0 / 0.25) 3px 4px
    );
}

.not-found-glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 3px;
  top: 0;
  mix-blend-mode: screen;
  color: oklch(0.72 0.15 280 / 0.35);
}

@media (prefers-reduced-motion: no-preference) {
  .not-found-glitch {
    animation: not-found-shift 7s ease-in-out infinite alternate;
  }

  .not-found-title {
    animation: not-found-soft 16s ease-in-out infinite alternate;
  }
}

@keyframes not-found-shift {
  0% {
    transform: translate(0, 0);
    text-shadow:
      -1px 0 oklch(0.72 0.15 280 / 0.45),
      1px 0 oklch(0.72 0.12 155 / 0.35);
  }
  100% {
    transform: translate(1px, -1px);
    text-shadow:
      -2px 0 oklch(0.72 0.15 280 / 0.55),
      3px 0 oklch(0.72 0.12 155 / 0.4);
  }
}

@keyframes not-found-soft {
  0% {
    letter-spacing: -0.02em;
  }
  100% {
    letter-spacing: 0.01em;
  }
}
</style>
