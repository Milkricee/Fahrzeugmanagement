<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Fahrzeug bearbeiten</h1>
      <form @submit.prevent="updateFahrzeug" class="space-y-4">
        <div>
          <label class="block text-sm font-medium" for="marke">Marke</label>
          <input id="marke" v-model="fahrzeug.marke" type="text" class="p-2 border rounded w-full" required />
        </div>
        <div>
          <label class="block text-sm font-medium" for="modell">Modell</label>
          <input id="modell" v-model="fahrzeug.modell" type="text" class="p-2 border rounded w-full" required />
        </div>
        <div>
          <label class="block text-sm font-medium" for="kennzeichen">Kennzeichen</label>
          <input id="kennzeichen" v-model="fahrzeug.kennzeichen" type="text" class="p-2 border rounded w-full" disabled />
        </div>
        <div>
          <label class="block text-sm font-medium" for="kilometerstand">Kilometerstand</label>
          <input id="kilometerstand" v-model="fahrzeug.kilometerstand" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="erstzulassung">Erstzulassung</label>
          <input id="erstzulassung" v-model="fahrzeug.erstzulassung" type="date" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="kaufpreis">Kaufpreis</label>
          <input id="kaufpreis" v-model="fahrzeug.kaufpreis" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="garantie">Garantie</label>
          <input id="garantie" v-model="fahrzeug.garantie" type="date" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="versicherungs_nr">Versicherungsnummer</label>
          <input id="versicherungs_nr" v-model="fahrzeug.versicherungs_nr" type="text" class="p-2 border rounded w-full" />
        </div>
        
        <button type="submit" class="mt-4 bg-green-500 text-white p-2 rounded">
          Änderungen speichern
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute, useNuxtApp } from '#app';
  
  const router = useRouter();
  const route = useRoute();
  const { $supabase } = useNuxtApp();
  const fahrzeug = ref({
    marke: '',
    modell: '',
    kennzeichen: '',
    kilometerstand: null,
    erstzulassung: null,
    kaufpreis: null,
    garantie: null,
    versicherungs_nr: null
  });
  
  onMounted(async () => {
    const kennzeichen = route.query.kennzeichen; // Kennzeichen aus der Query abrufen
    console.log("Lade Fahrzeug mit Kennzeichen:", kennzeichen);
    if (!kennzeichen) {
      console.error("Kein Kennzeichen in der URL-Query gefunden");
      router.push('/kfz/fahrzeuge');
      return;
    }
  
    const { data, error } = await $supabase
      .from('fahrzeuge')
      .select('*')
      .eq('kennzeichen', kennzeichen)
      .single();
    
    if (error) {
      console.error("Fehler beim Abrufen des Fahrzeugs:", error);
      router.push('/kfz/fahrzeuge');
    } else {
      fahrzeug.value = data;
      console.log("Fahrzeugdaten erfolgreich geladen:", fahrzeug.value);
    }
  });
  
  async function updateFahrzeug() {
    console.log("Aktualisiere Fahrzeug mit Daten:", fahrzeug.value);
    const { data, error } = await $supabase
      .from('fahrzeuge')
      .update(fahrzeug.value)
      .eq('kennzeichen', fahrzeug.value.kennzeichen);
  
    if (error) {
      console.error("Fehler beim Aktualisieren des Fahrzeugs:", error);
    } else {
      console.log("Fahrzeug erfolgreich aktualisiert:", data);
      router.push('/kfz/fahrzeuge');
    }
  }
  </script>
  
  <style scoped>
  /* Optional: zusätzliche Styles hinzufügen */
  </style>
  