import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import Livres from '../components/livres/Livres.vue'
import Acceuil from '../views/Acceuil.vue'
import UtilisateurInfo from '../components/utilisateurs/UtilisateursInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Acceuil',
      component: Acceuil
    },
    {
      path: '/livres',
      name: 'livres',
      component: Livres
    },
    {
      path: '/utilisateurs',
      name: 'account',
      component: UtilisateurInfo
    }
  ]
})

export default router
