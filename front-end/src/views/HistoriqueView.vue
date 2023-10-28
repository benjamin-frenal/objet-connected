<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const states = ref([]);

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${formatTime(date)}`;
  return formattedDate;
};

const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

onMounted(async () => {
  try {
    const response = await axios.get('https://127.0.0.1:8000/api/states');
    states.value = response.data['hydra:member'];

    states.value.reverse();
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
});
</script>

<template>
  <main>
    <div class="header-profil">
      <img src="@/assets/user/benji.png" alt="">
      <div class="header-profil-name">Benjamin Frenal</div>
    </div>
    <h1>Historique</h1>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>État</th>
        </tr>
      </thead>
      <tbody>

      <tr v-for="state in states" :key="state.id">
        <td>{{ formatDateTime(state.datatime) }}</td>
        <td>{{ state.state ? 'Allumé' : 'Éteinte' }}</td>
      </tr>
      </tbody>
    </table>
  </main>
</template>
