<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Fahrzeugliste</h1>
      <NuxtLink to="/kfz/neues-fahrzeug" class="text-white bg-blue-500 p-2 rounded-full text-xl">+</NuxtLink>
    </div>

    <!-- Suchleiste Komponente -->
    <SearchInput @search="filterFahrzeuge" />

    <!-- Liste der Fahrzeuge -->
    <div>
      <FahrzeugItem v-for="fahrzeug in filteredFahrzeuge" :key="fahrzeug.projekt_id" :fahrzeug="fahrzeug" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import FahrzeugItem from '~/components/FahrzeugItem.vue';
import SearchInput from '~/components/SearchInput.vue';

const fahrzeuge = ref([]);
const filteredFahrzeuge = ref([]);
const { $supabase } = useNuxtApp();

onMounted(async () => {
  await fetchFahrzeuge();
});

// Funktion zum Abrufen aller Fahrzeuge
async function fetchFahrzeuge() {
  const { data, error } = await $supabase.from('fahrzeuge').select('*');
  if (error) {
    console.error("Fehler beim Abrufen der Fahrzeugdaten:", error);
  } else {
    fahrzeuge.value = data;
    filteredFahrzeuge.value = data; // Zu Beginn sind alle Fahrzeuge sichtbar
  }
}

// Funktion zum Filtern der Fahrzeuge basierend auf der Suche
function filterFahrzeuge(searchQuery) {
  if (searchQuery) {
    filteredFahrzeuge.value = fahrzeuge.value.filter(fahrzeug =>
      fahrzeug.kennzeichen.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else {
    filteredFahrzeuge.value = fahrzeuge.value; // Alle anzeigen, wenn die Suche geleert ist
  }
}
</script>
