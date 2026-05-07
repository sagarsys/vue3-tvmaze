import { onUnmounted, ref, type Ref, watch } from 'vue';

/**
 * Returns a ref that mirrors `source` but only updates after `delay` ms
 * Pending updates are cancelled when the component unmounts.
 */
export function useDebouncedRef<T>(source: Ref<T>, delay: number): Ref<T> {
  const debounced = ref(source.value) as Ref<T>;
  let timer: ReturnType<typeof setTimeout> | null = null;

  watch(source, (value) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      debounced.value = value;
      timer = null;
    }, delay);
  });

  onUnmounted(() => {
    if (timer) clearTimeout(timer);
  });

  return debounced;
}
