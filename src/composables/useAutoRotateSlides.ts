import { onMounted, onUnmounted, watch, type Ref } from 'vue';

interface AutoRotateOptions {
  intervalMs: number; // Polling interval in ms
  enabled: Ref<boolean>; // Auto-rotate is paused while this evaluates to false
  onTick: () => void; // Callback to fire on each interval
}

/**
 * Repeatedly fires `onTick` at `intervalMs` while `enabled` is true.
 * Skips rotation when the user prefers reduced motion.
 * Returns `restart` so callers can reset the timer after a manual interaction.
 */
export function useAutoRotateSlides({ intervalMs, enabled, onTick }: AutoRotateOptions) {
  let timer: ReturnType<typeof setInterval> | null = null;

  function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function restart() {
    stop();
    if (!enabled.value || prefersReducedMotion()) return;
    timer = setInterval(onTick, intervalMs);
  }

  watch(enabled, restart);
  onMounted(restart);
  onUnmounted(stop);

  return { restart };
}
