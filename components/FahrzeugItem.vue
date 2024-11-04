<template>
    <div class="mb-4 p-4 rounded-lg border border-gray-300 bg-gray-100">
      <!-- Fahrzeugüberschrift mit Kennzeichen -->
      <div @click="toggleDetails" class="cursor-pointer font-semibold text-blue-700 hover:text-blue-900">
        {{ fahrzeug.marke }} {{ fahrzeug.modell }} - Kennzeichen: {{ fahrzeug.kennzeichen }}
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
  
  <style scoped>
  .cursor-pointer:hover {
    color: #4A90E2; /* Blaues Hover für Text */
  }
  </style>
  