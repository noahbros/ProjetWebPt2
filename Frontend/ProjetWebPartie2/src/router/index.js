//Noah Brosseau - Routes
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'

import Admin from '../components/admin/Admin.vue'
import AdminControlPanel from '../components/admin/AdminControlPanel.vue'
import AdminLivresList from '../components/admin/AdminLivresListe.vue'
import AdminCategoriesList from '../components/admin/AdminCategoriesListe.vue'
import AdminUtilisateursList from '../components/admin/AdminUtilisateursListe.vue'


import Bibliothecaire from '../components/admin/Bibliothecaire.vue'
import BibliothecaireControlPanel from '../components/admin/BibliothecaireControlPanel.vue'

import AjoutCategorie from '../components/categories/AjoutCategorie.vue'
import UpdateCategorie from '../components/categories/UpdateCategorie.vue'

import DetailLivre from '../components/livres/DetailLivre.vue'
import ListeLivres from '../components/livres/ListeLivres.vue'
import AjoutLivre from '../components/livres/AjoutLivre.vue'
import UpdateLivre from '../components/livres/UpdateLivre.vue'

import Acceuil from '../views/Acceuil.vue'

import UtilisateurInfo from '../components/utilisateurs/UtilisateursInfo.vue'
import AjoutUtilisateur from '../components/utilisateurs/AjoutUtilisateur.vue'
import UpdateUtilisateur from '../components/utilisateurs/UpdateUtilisateur.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { //Login page.
      path: '/login',
      name: 'login',
      component: Login
    },
    { //Signup page.
      path:'/signup',
      name: 'signup',
      component: Signup
    },
    { //Home page.
      path: '/',
      name: 'acceuil',
      component: Acceuil
    },
    { //Browsing/shop page.
      path: '/livres',
      name: 'livres',
      component: ListeLivres
    },
    { //Product info page.
      path: '/details/:id',
      name: 'livres-info',
      component: DetailLivre
    },
    { //Account page
      path: '/utilisateurs',
      name: 'account',
      component: UtilisateurInfo
    },
    { //Admin page
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    { //Bibliothecaire page
      path: '/bibliothecaire',
      name: 'bibliothecaire',
      component: Bibliothecaire
    },
    { //Admin control panel page
      path: '/admin-console',
      name: 'adminConsole',
      component: AdminControlPanel

    },
    { //Admin Livres control page.
      path: '/aLivres',
      name: 'livreConsole',
      component: AdminLivresList
    },
    { //Admin Livres (CREATE)
      path:'/livres-ajout',
      name: 'livreAjout',
      component: AjoutLivre
    },
    {
      path: '/livres-update/:id',
      name: 'livreUpdate',
      component: UpdateLivre
    },
    { //Admin Categories control page.
      path:'/aCategories',
      name: 'categoriesConsole',
      component: AdminCategoriesList

    },
    { //Admin Categories (CREATE)
      path:'/categories-ajout',
      name: 'categorieAjout',
      component: AjoutCategorie

    },
    { //Admin Categories (UPDATE)
      path:'/categorie-update/:id',
      name: 'categorieUpdate',
      component: UpdateCategorie
    },
    { //Admin Utilisateurs control page.
      path: '/aUtilisateurs',
      name: 'utilisateursConsole',
      component: AdminUtilisateursList
    },
    { //Admin Utilisateurs (CREATE)
      path: '/utilisateur-ajout',
      name: 'utilisateurAjout',
      component: AjoutUtilisateur
    },
    { //Admin Utilisateurs (UPDATE)
      path: '/utilisateur-update/:id',
      name: 'utilisateurUpdate',
      component: UpdateUtilisateur
    },
    { //Bibliothecaire control panel page
      path: '/bibliothecaire-console',
      name: 'bibliothecaireConsole',
      component: BibliothecaireControlPanel
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
