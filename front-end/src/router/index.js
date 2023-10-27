import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoriqueView from '../views/HistoriqueView.vue'
import DeconnexionView from '../views/DeconnexionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/historique',
      name: 'historique',
      component: HistoriqueView
    },
    {
      path: '/deconnexion',
      name: 'deconnexion',
      component: DeconnexionView
    }
  ]
})

export default router
