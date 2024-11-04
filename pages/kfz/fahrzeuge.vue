<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Fahrzeugliste</h1>
      <NuxtLink to="/kfz/neues-fahrzeug" class="text-white bg-blue-500 p-2 rounded-full text-xl">+</NuxtLink>
    </div>
    <div>
      <FahrzeugItem v-for="fahrzeug in filteredFahrzeuge" :key="fahrzeug.projekt_id" :fahrzeug="fahrzeug" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { searchQuery } from '~/composables/useSearchStore'; // Suche verwenden
import FahrzeugItem from '~/components/FahrzeugItem.vue';

const fahrzeuge = ref([]);
const { $supabase } = useNuxtApp();

// Fahrzeuge beim Laden der Seite abrufen
async function fetchFahrzeuge() {
  const { data, error } = await $supabase.from('fahrzeuge').select('*');
  if (!error) {
    fahrzeuge.value = data;
  }
}

onMounted(fetchFahrzeuge);

// Filterte Fahrzeuge nur anzeigen, wenn searchQuery einen Wert hat
const filteredFahrzeuge = computed(() => {
  if (!searchQuery.value) {
    return fahrzeuge.value; // Zeige alle Fahrzeuge an, wenn das Suchfeld leer ist
  }
  return fahrzeuge.value.filter(fahrzeug =>
    fahrzeug.kennzeichen.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
