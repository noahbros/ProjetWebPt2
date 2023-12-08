import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
import DetailLivre from '../components/livres/DetailLivre.vue'
import ListeLivres from '../components/livres/ListeLivres.vue'
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
      path:'/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/',
      name: 'acceuil',
      component: Acceuil
    },
    {
      path: '/livres',
      name: 'livres',
      component: ListeLivres
    },
    {
      path: '/details/:id',
      name: 'livres-info',
      component: DetailLivre
    },
    {
      path: '/utilisateurs',
      name: 'account',
      component: UtilisateurInfo
    }
  ]
})


//Routes non protégés
import useAuthStore from '../stores/authStore.js'
const openRoute = ['login', 'signup']

  //Vérifie si un token est associés à l'utilisateur, sinon force le login.
router.beforeEach((to, from, next) =>{
  const {currentToken : token} =  useAuthStore()
  if(!openRoute.includes(to.name) && !token) next({name : 'login'})
  else next()
})

export default router
