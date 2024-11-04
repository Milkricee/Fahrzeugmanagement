<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="flex items-center space-x-4">
      <ul class="flex space-x-4">
        <li>
          <NuxtLink to="/" @click="clearSearch">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/kfz/fahrzeuge" @click="clearSearch">Fahrzeuge</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/versicherung" @click="clearSearch">Versicherung</NuxtLink>
        </li>
      </ul>

      <!-- Suchleiste -->
      <div class="flex items-center space-x-2 ml-auto relative">
        <input
          type="text"
          v-model="searchQuery"
          @input="fetchSuggestions"
          placeholder="Suche nach Kennzeichen..."
          class="p-2 rounded-md text-black"
        />
        <button @click="executeSearch" class="bg-white text-blue-500 px-4 py-2 rounded-md">
          Suchen
        </button>

        <!-- Vorschlagsliste -->
        <ul v-if="suggestions.length > 0" class="absolute bg-white text-black p-2 rounded-md shadow-md top-full mt-1 w-full max-h-48 overflow-y-auto">
          <li
            v-for="kennzeichen in suggestions"
            :key="kennzeichen"
            @click="selectSuggestion(kennzeichen)"
            class="cursor-pointer hover:bg-blue-100 p-2"
          >
            {{ kennzeichen }}
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { searchQuery } from '~/composables/useSearchStore'; // Globale Such-Variable
import { useRouter, useNuxtApp } from '#app';

const suggestions = ref([]);
const { $supabase } = useNuxtApp();
const router = useRouter();

async function fetchSuggestions() {
  if (searchQuery.value.length > 0) {
    const { data, error } = await $supabase
      .from('fahrzeuge')
      .select('kennzeichen')
      .ilike('kennzeichen', `${searchQuery.value}%`)
      .limit(5);
    if (!error) {
      suggestions.value = data.map(item => item.kennzeichen);
    }
  } else {
    suggestions.value = [];
  }
}

function executeSearch() {
  if (searchQuery.value) {
    router.push('/kfz/fahrzeuge');
  }
}

function selectSuggestion(kennzeichen) {
  searchQuery.value = kennzeichen;
  suggestions.value = [];
  executeSearch();
}

// Neue Funktion zum Zurücksetzen der Suche
function clearSearch() {
  searchQuery.value = '';
}
</script>
