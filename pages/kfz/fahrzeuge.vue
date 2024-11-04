<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Fahrzeugliste</h1>
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
  const { data, error } = await $supabase.from('fahrzeuge').select('*');
  if (error) {
    console.error("Fehler beim Abrufen der Fahrzeugdaten:", error);
  } else {
    fahrzeuge.value = data;
  }
});
</script>

<style scoped>
/* Optional: Styling für die Liste */
</style>
