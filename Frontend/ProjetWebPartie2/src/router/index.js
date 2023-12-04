import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import Livres from '../components/livres/Livres.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/livres',
      name: 'livres',
      component: Livres
    }
  ]
})

export default router
