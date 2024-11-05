<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Fahrzeug bearbeiten</h1>
    <FahrzeugForm :initialData="fahrzeug" :isEditing="true" @submit="updateFahrzeug" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FahrzeugForm from '~/components/FahrzeugForm.vue';
import { useNuxtApp, useRouter, useRoute } from '#app';

const fahrzeug = ref({
  marke: '',
  modell: '',
  kennzeichen: '',
  kilometerstand: null,
  erstzulassung: null,
  kaufpreis: null,
  garantie: null,
  versicherungs_nr: null,
  fahrgestell_nr: '',
  typschluessel_nr: '',
  karosserie_typ: '',
  kraftstoff_typ: '',
  leistung_ps: null,
  bruttolistenpreis: null,
  kaufdatum: null,
  breite: null,
  laenge: null,
  hoehe: null,
  leermasse: null,
  gesamtmasse: null,
  max_zuladung: null,
  anhaengerkupplung: false,
  sitze: null,
  schaden: false
});

const { $supabase } = useNuxtApp();
const route = useRoute();
const router = useRouter();  // Hinzufügen von router, damit Navigation funktioniert
const fin = route.query.fin; // Die FIN aus der Query abrufen

onMounted(async () => {
  const { data, error } = await $supabase.from('fahrzeuge').select('*').eq('fin', fin).single(); // Ändern auf 'fin'
  if (error) {
    console.error("Fehler beim Abrufen des Fahrzeugs:", error);
    router.push('/kfz/fahrzeuge');  // Navigation bei Fehler
  } else {
    fahrzeug.value = data;
  }
});

async function updateFahrzeug(fahrzeugData) {
  const { data, error } = await $supabase.from('fahrzeuge').update(fahrzeugData).eq('fin', fahrzeugData.fin); // Ändern auf 'fin'
  if (error) {
    console.error("Fehler beim Aktualisieren des Fahrzeugs:", error);
  } else {
    console.log("Fahrzeug erfolgreich aktualisiert:", data);
    router.push('/kfz/fahrzeuge');  // Navigation nach erfolgreichem Update
  }
}
</script>
