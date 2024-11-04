<template>
    <header class="bg-blue-500 text-white p-4">
      <nav>
        <ul class="flex space-x-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/kfz">Fahrzeuge</NuxtLink></li>
          <li><NuxtLink to="/versicherung">Versicherung</NuxtLink></li>
        </ul>
      </nav>
    </header>
  </template>
  
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
  