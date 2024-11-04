<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Neues Fahrzeug hinzufügen</h1>
    <FahrzeugForm :initialData="newFahrzeug" @submit="addFahrzeug" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FahrzeugForm from '~/components/FahrzeugForm.vue';
import { useNuxtApp, useRouter } from '#app';

const newFahrzeug = ref({
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
const router = useRouter();

async function addFahrzeug(fahrzeugData) {
  const { data, error } = await $supabase.from('fahrzeuge').insert([fahrzeugData]);
  if (error) {
    console.error("Fehler beim Hinzufügen des Fahrzeugs:", error.message, error.details);
  } else {
    console.log("Fahrzeug erfolgreich hinzugefügt:", data);
    router.push('/kfz/fahrzeuge');
  }
}
</script>
