<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
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
        <input id="kennzeichen" v-model="fahrzeug.kennzeichen" type="text" class="p-2 border rounded w-full" :disabled="isEditing" required />
      </div>
      <div>
        <label class="block text-sm font-medium" for="kilometerstand">Kilometerstand</label>
        <input id="kilometerstand" v-model="fahrzeug.kilometerstand" type="number" class="p-2 border rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium" for="fin">Fahrzeug-Identifizierungsnummer (FIN)</label>
        <input id="fin" v-model="fahrzeug.fin" type="text" class="p-2 border rounded w-full" :disabled="isEditing" required />
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
  
      <!-- Button zum Ein- und Ausklappen des erweiterten Bereichs -->
      <button type="button" @click="toggleMoreInfo" class="mt-4 mb-8 text-blue-500 hover:underline">

        {{ showMoreInfo ? 'Weniger Infos' : 'Weitere Infos' }}
      </button>
  
      <!-- Ausklappbarer Bereich für Weitere Infos -->
      <div v-if="showMoreInfo" class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium" for="fahrgestell_nr">Fahrgestellnummer</label>
          <input id="fahrgestell_nr" v-model="fahrzeug.fahrgestell_nr" type="text" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="typschluessel_nr">Typschlüsselnummer</label>
          <input id="typschluessel_nr" v-model="fahrzeug.typschluessel_nr" type="text" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="karosserie_typ">Karosserietyp</label>
          <input id="karosserie_typ" v-model="fahrzeug.karosserie_typ" type="text" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="kraftstoff_typ">Kraftstofftyp</label>
          <input id="kraftstoff_typ" v-model="fahrzeug.kraftstoff_typ" type="text" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="leistung_ps">Leistung (PS)</label>
          <input id="leistung_ps" v-model="fahrzeug.leistung_ps" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="bruttolistenpreis">Bruttolistenpreis</label>
          <input id="bruttolistenpreis" v-model="fahrzeug.bruttolistenpreis" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="kaufdatum">Kaufdatum</label>
          <input id="kaufdatum" v-model="fahrzeug.kaufdatum" type="date" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="breite">Breite (cm)</label>
          <input id="breite" v-model="fahrzeug.breite" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="laenge">Länge (cm)</label>
          <input id="laenge" v-model="fahrzeug.laenge" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="hoehe">Höhe (cm)</label>
          <input id="hoehe" v-model="fahrzeug.hoehe" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="leermasse">Leermasse (kg)</label>
          <input id="leermasse" v-model="fahrzeug.leermasse" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="gesamtmasse">Gesamtmasse (kg)</label>
          <input id="gesamtmasse" v-model="fahrzeug.gesamtmasse" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="max_zuladung">Max. Zuladung (kg)</label>
          <input id="max_zuladung" v-model="fahrzeug.max_zuladung" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="anhaengerkupplung">Anhängerkupplung</label>
          <input id="anhaengerkupplung" v-model="fahrzeug.anhaengerkupplung" type="checkbox" class="p-2 rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="sitze">Sitze</label>
          <input id="sitze" v-model="fahrzeug.sitze" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium" for="schaden">Schaden</label>
          <input id="schaden" v-model="fahrzeug.schaden" type="checkbox" class="p-2 rounded w-full" />
        </div>
      </div>
  
      <!-- Speichern Button -->
      <button type="submit" class="mt-8 ml-5 bg-green-500 text-white p-2 rounded">

        {{ isEditing ? 'Änderungen speichern' : 'Speichern' }}
      </button>
    </form>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    initialData: Object,
    isEditing: Boolean
  });
  const emit = defineEmits(['submit']);

  // Initialisiere das Fahrzeug-Objekt mit der fin und den anderen Properties
  const fahrzeug = ref({
    fin: props.initialData.fin || '', // FIN als Primary Key
    ...props.initialData
  });
  const showMoreInfo = ref(false);

  function toggleMoreInfo() {
    showMoreInfo.value = !showMoreInfo.value;
  }

  function onSubmit() {
    emit('submit', fahrzeug.value);
  }

  // Watch für Änderungen in den initialData-Props, um die Werte zu aktualisieren
  watch(() => props.initialData, (newData) => {
    fahrzeug.value = { fin: newData.fin || '', ...newData };
  });
</script>
