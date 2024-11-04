<!-- Datei: Header.vue -->
<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="flex items-center space-x-4">
      <!-- Navigation Links -->
      <ul class="flex space-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/kfz/fahrzeuge">Fahrzeuge</NuxtLink></li>
        <li><NuxtLink to="/versicherung">Versicherung</NuxtLink></li>
      </ul>

      <!-- Suchleiste (ausgelagert in eine separate Komponente) -->
      <div class="ml-auto">
        <SearchInput />
      </div>
    </nav>
  </header>
</template>

<script setup>
import SearchInput from '~/components/SearchInput.vue';
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
</style>
