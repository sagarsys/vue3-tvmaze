<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import HeaderSearchSuggestion from '@/components/shared/HeaderSearchSuggestion.vue';
import { useClickOutside } from '@/composables/useClickOutside';
import { HEADER_SEARCH_MIN_CHARS, useShowSuggestions } from '@/composables/useShowSuggestions';
import HeaderSearchFooterAction from '@/components/shared/HeaderSearchFooterAction.vue';

const router = useRouter();
const rawQuery = ref('');
const isOpen = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const { suggestions } = useShowSuggestions(rawQuery);
const trimmedQuery = computed(() => rawQuery.value.trim());

const isPanelVisible = computed(() => isOpen.value && suggestions.value.length > 0);

useClickOutside(rootRef, () => {
  isOpen.value = false;
});

// Opens the dropdown when the user focuses on the input.
function handleFocus() {
  isOpen.value = true;
}

// Closes the dropdown without clearing the input.
function handleEscape() {
  isOpen.value = false;
}

// Submits the form: navigates to /search?q= for the trimmed query.
function handleSubmit() {
  const q = trimmedQuery.value;
  if (!q) return;
  router.push({ name: 'search', query: { q } });
  isOpen.value = false;
}

// Opens the full search results page from the suggestions footer action.
function handleOpenFullSearch() {
  const q = trimmedQuery.value;
  if (!q) return;
  router.push({ name: 'search', query: { q } });
  isOpen.value = false;
}

// Closes the dropdown and clears the input after picking a suggestion.
function handlePick() {
  isOpen.value = false;
  rawQuery.value = '';
}
</script>

<template>
  <div ref="rootRef" class="relative w-full max-w-xl min-w-0">
    <span id="header-search-hint" class="sr-only">
      Type at least {{ HEADER_SEARCH_MIN_CHARS }} characters to see suggestions. Press Enter to open
      the full search page.
    </span>
    <form class="relative" @submit.prevent="handleSubmit">
      <SearchIcon
        class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        v-model="rawQuery"
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-label="Search TV shows"
        aria-describedby="header-search-hint"
        :aria-expanded="isPanelVisible"
        :aria-controls="isPanelVisible ? 'header-search-listbox' : undefined"
        autocomplete="off"
        class="focus-ring-accent h-11 min-h-11 w-full rounded-md border border-input bg-secondary py-2 pl-10 pr-3 text-base shadow-xs transition-colors placeholder:text-muted-foreground md:h-12 md:text-lg"
        placeholder="Search TV shows..."
        @focus="handleFocus"
        @keydown.esc="handleEscape"
      />
    </form>

    <div
      v-if="isPanelVisible"
      class="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-card shadow-xl"
    >
      <ul
        id="header-search-listbox"
        class="max-h-[min(70vh,22rem)] list-none overflow-y-auto py-2 md:max-h-none md:overflow-visible"
        role="listbox"
        aria-label="Show suggestions"
      >
        <li v-for="result in suggestions" :key="result.show.id" role="option">
          <HeaderSearchSuggestion :result="result" @pick="handlePick" />
        </li>
      </ul>
      <HeaderSearchFooterAction :query="trimmedQuery" @click="handleOpenFullSearch" />
    </div>
  </div>
</template>
