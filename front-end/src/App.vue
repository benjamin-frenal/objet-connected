<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';

const currentPage = ref('');

const setActivePage = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
      <span>Shelly Smart Control</span>
    </div>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <div :class="{ active: currentPage === 'accueil' || $route.path === '/' }">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/>
              </svg>
              <span>Accueil</span>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/historique">
            <div :class="{ active: currentPage === 'historique' || $route.path === '/historique' }">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/>
              </svg>
              <span>Historique</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <RouterLink to="/">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
        </svg>
        <span>Déconnexion</span>
      </div>
    </RouterLink>
  </header>
  <RouterView />
</template>


<style scoped>

</style>
