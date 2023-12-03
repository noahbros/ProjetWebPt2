import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
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
    }
  ]
})

export default router
