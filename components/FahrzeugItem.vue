<template>
  <div class="mb-4 p-4 rounded-lg border border-gray-300 bg-gray-100">
    <!-- Fahrzeugüberschrift mit Kennzeichen und Bearbeitungssymbol -->
    <div class="flex justify-between items-center">
      <div @click="toggleDetails" class="cursor-pointer font-semibold text-blue-700 hover:text-blue-900">
        {{ fahrzeug.marke }} {{ fahrzeug.modell }} - Kennzeichen: {{ fahrzeug.kennzeichen }}
      </div>
      <!-- Bearbeitungssymbol mit Query-Parameter -->
      <NuxtLink :to="{ path: '/kfz/fahrzeug-bearbeiten', query: { kennzeichen: fahrzeug.kennzeichen } }" class="text-blue-500 hover:text-blue-700 ml-2">
        ✏️
      </NuxtLink>
    </div>

    <!-- Detaillierte Fahrzeuginformationen -->
    <div v-if="showDetails" class="pl-4 mt-2 text-gray-700">
      <p>Kilometerstand: {{ fahrzeug.kilometerstand }} km</p>
      <p>Erstzulassung: {{ fahrzeug.erstzulassung }}</p>
      <p>Kaufpreis: {{ fahrzeug.kaufpreis }} €</p>
      <p>Garantie: {{ fahrzeug.garantie }}</p>
      <p>Versicherungsnummer: {{ fahrzeug.versicherungs_nr }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  fahrzeug: Object
});

const showDetails = ref(false);

function toggleDetails() {
  showDetails.value = !showDetails.value;
}
</script>
