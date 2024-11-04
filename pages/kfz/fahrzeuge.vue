<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Fahrzeugliste</h1>
      <NuxtLink to="/kfz/neues-fahrzeug" class="text-white bg-blue-500 p-2 rounded-full text-xl">+</NuxtLink>
    </div>

    <!-- Liste der Fahrzeuge -->
    <div>
      <FahrzeugItem v-for="fahrzeug in fahrzeuge" :key="fahrzeug.projekt_id" :fahrzeug="fahrzeug" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import FahrzeugItem from '~/components/FahrzeugItem.vue';

const fahrzeuge = ref([]);
const { $supabase } = useNuxtApp();

onMounted(async () => {
  await fetchFahrzeuge();
});

async function fetchFahrzeuge() {
  const { data, error } = await $supabase.from('fahrzeuge').select('*');
  if (error) {
    console.error("Fehler beim Abrufen der Fahrzeugdaten:", error);
  } else {
    fahrzeuge.value = data;
  }
}
</script>
