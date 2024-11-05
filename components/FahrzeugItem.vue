<template>
  <div class="mb-4 p-4 rounded-lg border border-gray-300 bg-gray-100">
    <!-- Fahrzeugüberschrift mit Kennzeichen und Bearbeitung/Löschsymbolen -->
    <div class="flex justify-between items-center">
      <div @click="toggleDetails" class="cursor-pointer font-semibold text-blue-700 hover:text-blue-900">
        {{ fahrzeug.marke }} {{ fahrzeug.modell }} - Kennzeichen: {{ fahrzeug.kennzeichen }}
      </div>
      <!-- Symbole für Löschen und Bearbeiten -->
      <div class="flex space-x-2">
        <button @click="confirmDelete" class="text-red-500 hover:text-red-700">
          🗑️
        </button>
        <NuxtLink :to="{ path: '/kfz/fahrzeug-bearbeiten', query: { kennzeichen: fahrzeug.kennzeichen } }" class="text-blue-500 hover:text-blue-700">
          ✏️
        </NuxtLink>
      </div>
    </div>

    <!-- Detaillierte Fahrzeuginformationen -->
    <div v-if="showDetails" class="pl-4 mt-2 text-gray-700">
      <p v-if="fahrzeug.fahrgestell_nr">Fahrgestellnummer: {{ fahrzeug.fahrgestell_nr }}</p>
      <p v-if="fahrzeug.typschluessel_nr">Typschlüsselnummer: {{ fahrzeug.typschluessel_nr }}</p>
      <p v-if="fahrzeug.karosserie_typ">Karosserietyp: {{ fahrzeug.karosserie_typ }}</p>
      <p v-if="fahrzeug.kraftstoff_typ">Kraftstofftyp: {{ fahrzeug.kraftstoff_typ }}</p>
      <p v-if="fahrzeug.leistung_ps">Leistung (PS): {{ fahrzeug.leistung_ps }}</p>
      <p v-if="fahrzeug.kaufpreis">Kaufpreis: {{ fahrzeug.kaufpreis }} €</p>
      <p v-if="fahrzeug.bruttolistenpreis">Bruttolistenpreis: {{ fahrzeug.bruttolistenpreis }} €</p>
      <p v-if="fahrzeug.kaufdatum">Kaufdatum: {{ fahrzeug.kaufdatum }}</p>
      <p v-if="fahrzeug.erstzulassung">Erstzulassung: {{ fahrzeug.erstzulassung }}</p>
      <p v-if="fahrzeug.breite">Breite: {{ fahrzeug.breite }} cm</p>
      <p v-if="fahrzeug.laenge">Länge: {{ fahrzeug.laenge }} cm</p>
      <p v-if="fahrzeug.hoehe">Höhe: {{ fahrzeug.hoehe }} cm</p>
      <p v-if="fahrzeug.leermasse">Leermasse: {{ fahrzeug.leermasse }} kg</p>
      <p v-if="fahrzeug.gesamtmasse">Gesamtmasse: {{ fahrzeug.gesamtmasse }} kg</p>
      <p v-if="fahrzeug.max_zuladung">Max. Zuladung: {{ fahrzeug.max_zuladung }} kg</p>
      <p v-if="fahrzeug.anhaengerkupplung !== null">Anhängerkupplung: {{ fahrzeug.anhaengerkupplung ? 'Ja' : 'Nein' }}</p>
      <p v-if="fahrzeug.sitze">Sitze: {{ fahrzeug.sitze }}</p>
      <p v-if="fahrzeug.kilometerstand">Kilometerstand: {{ fahrzeug.kilometerstand }} km</p>
      <p v-if="fahrzeug.garantie">Garantie: {{ fahrzeug.garantie }}</p>
      <p v-if="fahrzeug.versicherungs_nr">Versicherungsnummer: {{ fahrzeug.versicherungs_nr }}</p>
      <p v-if="fahrzeug.schaden !== null">Schaden: {{ fahrzeug.schaden ? 'Ja' : 'Nein' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp, useRouter } from '#app';

const props = defineProps({
  fahrzeug: Object
});

const { $supabase } = useNuxtApp();
const router = useRouter();
const showDetails = ref(false);

function toggleDetails() {
  showDetails.value = !showDetails.value;
}

function confirmDelete() {
  // Bestätigungsdialog anzeigen
  if (confirm(`Möchten Sie das Fahrzeug ${props.fahrzeug.marke} mit dem Kennzeichen ${props.fahrzeug.kennzeichen} wirklich löschen?`)) {
    deleteFahrzeug();
  }
}

async function deleteFahrzeug() {
  const { error } = await $supabase
    .from('fahrzeuge')
    .delete()
    .eq('kennzeichen', props.fahrzeug.kennzeichen);
  
  if (error) {
    console.error("Fehler beim Löschen des Fahrzeugs:", error);
  } else {
    console.log("Fahrzeug erfolgreich gelöscht");
    router.go(0); // Seite neu laden
  }
}
</script>