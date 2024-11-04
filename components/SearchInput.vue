<template>
    <div class="relative flex items-center space-x-2">
      <input
        type="text"
        v-model="searchQuery"
        @input="onInput"
        @keyup.enter="executeSearch"
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
  </template>
  
  <script setup>
  import { ref, watch, emit } from 'vue';
  import { useNuxtApp } from '#app';
  import debounce from 'lodash/debounce';
  
  const searchQuery = ref('');
  const suggestions = ref([]);
  const { $supabase } = useNuxtApp();
  
  // Funktion, um Vorschläge basierend auf der aktuellen Eingabe zu holen
  const fetchSuggestions = debounce(async () => {
    if (searchQuery.value.length > 0) {
      const { data, error } = await $supabase
        .from('fahrzeuge')
        .select('kennzeichen')
        .ilike('kennzeichen', `${searchQuery.value}%`)
        .limit(5);
  
      if (error) {
        console.error("Fehler beim Abrufen der Vorschläge:", error);
        suggestions.value = []; // Bei Fehler leeren
      } else {
        suggestions.value = data.map(item => item.kennzeichen);
      }
    } else {
      suggestions.value = [];
    }
  }, 300); // 300ms Debounce
  
  // Funktion für die Eingabe, um fetchSuggestions aufzurufen und das Event zu senden
  function onInput() {
    fetchSuggestions();
    emit('search', searchQuery.value); // Übermittlung des aktuellen Suchbegriffs
  }
  
  // Funktion für die Suche, wenn Enter gedrückt oder der Suchen-Button geklickt wird
  function executeSearch() {
    emit('search', searchQuery.value); // Suchbegriff an die Elternkomponente übermitteln
    suggestions.value = []; // Vorschläge leeren
  }
  
  // Funktion, wenn ein Vorschlag aus der Liste ausgewählt wird
  function selectSuggestion(kennzeichen) {
    searchQuery.value = kennzeichen;
    suggestions.value = [];
    emit('search', kennzeichen); // Ausgewählten Vorschlag an die Elternkomponente übermitteln
  }
  </script>
  
  <style scoped>
  .suggestions-list {
    max-height: 200px;
    overflow-y: auto;
  }
  </style>
  