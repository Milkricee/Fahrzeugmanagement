<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="flex items-center space-x-4">
      <!-- Navigation Links -->
      <ul class="flex space-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/kfz/fahrzeuge">Fahrzeuge</NuxtLink></li>
        <li><NuxtLink to="/versicherung">Versicherung</NuxtLink></li>
      </ul>
      
      <!-- Suchleiste -->
      <div class="flex items-center space-x-2 ml-auto">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="executeSearch"
          placeholder="Suche..."
          class="p-2 rounded-md text-black"
        />
        <button @click="executeSearch" class="bg-white text-blue-500 px-4 py-2 rounded-md">
          Suchen
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

// Daten für die Suche (zum späteren Implementieren der Suchlogik)
const searchQuery = ref('');

// Methode, die später für die Suche genutzt wird
function executeSearch() {
  console.log("Sucheingabe:", searchQuery.value);
  // Hier wird die Suche zu einem späteren Zeitpunkt implementiert
}
</script>

<style scoped>
  header {
    background-color: #1E3A8A; /* Tailwind Indigo-700 */
    color: white;
    padding: 1rem;
  }
  ul {
    display: flex;
    gap: 1rem;
  }
  input {
    outline: none;
    border: 1px solid #ccc;
  }
</style>
