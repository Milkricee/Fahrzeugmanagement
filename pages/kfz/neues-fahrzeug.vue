<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Neues Fahrzeug hinzufügen</h1>
    <form @submit.prevent="addFahrzeug" class="space-y-4">
      <div>
        <label class="block text-sm font-medium" for="marke">Marke</label>
        <input id="marke" v-model="newFahrzeug.marke" type="text" class="p-2 border rounded w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium" for="modell">Modell</label>
        <input id="modell" v-model="newFahrzeug.modell" type="text" class="p-2 border rounded w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium" for="kennzeichen">Kennzeichen</label>
        <input id="kennzeichen" v-model="newFahrzeug.kennzeichen" type="text" class="p-2 border rounded w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium" for="kilometerstand">Kilometerstand</label>
        <input id="kilometerstand" v-model="newFahrzeug.kilometerstand" type="number" class="p-2 border rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium" for="erstzulassung">Erstzulassung</label>
        <input id="erstzulassung" v-model="newFahrzeug.erstzulassung" type="date" class="p-2 border rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium" for="kaufpreis">Kaufpreis</label>
        <input id="kaufpreis" v-model="newFahrzeug.kaufpreis" type="number" class="p-2 border rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium" for="garantie">Garantie</label>
        <input id="garantie" v-model="newFahrzeug.garantie" type="date" class="p-2 border rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium" for="versicherungs_nr">Versicherungsnummer</label>
        <input id="versicherungs_nr" v-model="newFahrzeug.versicherungs_nr" type="text" class="p-2 border rounded w-full" />
      </div>

      <!-- Speichern Button -->
      <button type="submit" class="mt-4 bg-green-500 text-white p-2 rounded">
        Speichern
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp, useRouter } from '#app';

const newFahrzeug = ref({
  marke: '',
  modell: '',
  kennzeichen: '',
  kilometerstand: null,
  erstzulassung: null,
  kaufpreis: null,
  garantie: null,
  versicherungs_nr: null
});

const { $supabase } = useNuxtApp();
const router = useRouter();

async function addFahrzeug() {
  console.log("addFahrzeug() wurde aufgerufen"); // Log 1: Überprüfe, ob die Funktion aufgerufen wird

  const processedFahrzeug = {
    marke: newFahrzeug.value.marke || null,
    modell: newFahrzeug.value.modell,
    kennzeichen: newFahrzeug.value.kennzeichen,
    kilometerstand: newFahrzeug.value.kilometerstand || null,
    erstzulassung: newFahrzeug.value.erstzulassung || null,
    kaufpreis: newFahrzeug.value.kaufpreis || null,
    garantie: newFahrzeug.value.garantie || null,
    versicherungs_nr: newFahrzeug.value.versicherungs_nr || null
  };

  console.log("Daten, die an Supabase gesendet werden:", processedFahrzeug); // Log 2: Zeigt die gesammelten Daten vor dem Senden

  const { data, error } = await $supabase.from('fahrzeuge').insert([processedFahrzeug]);

  if (error) {
    console.error("Fehler beim Hinzufügen des Fahrzeugs:", error.message, error.details); // Log 3: Zeigt den Fehler, falls vorhanden
    console.log("Fehlerdetails:", error); // Zusätzlicher Log für Details
  } else {
    console.log("Fahrzeug erfolgreich hinzugefügt:", data); // Log 4: Bestätigung, dass das Fahrzeug erfolgreich hinzugefügt wurde
    router.push('/kfz/fahrzeuge'); // Zurück zur Fahrzeugliste
  }
}
</script>
