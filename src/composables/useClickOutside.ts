import { onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Detects clicks outside a given element and triggers a callback
 */
export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  onOutsideClick: (event: Event) => void
) {
  function handleClickOutside(event: Event) {
    const el = elementRef.value;
    if (el && !el.contains(event.target as Node)) {
      onOutsideClick(event);
    }
  }

  onMounted(() => document.addEventListener('pointerdown', handleClickOutside, true));
  onUnmounted(() => document.removeEventListener('pointerdown', handleClickOutside, true));
}
