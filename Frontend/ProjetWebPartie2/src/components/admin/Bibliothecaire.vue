<!-- Noah Brosseau : Page bibliothecaire compte-->
<template>
  <body class="bibliothecaire-account-page">
    <nav class="navbar border-bottom border-body" style="background: #1e293b ">
      <div class="container-fluid">
        <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Bibliothecaire Profile</a>
      </div>
    </nav>

    <section style="background-color: #eee;">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center">
                <img :src=utilisateur.photo class="rounded-circle img-fluid" style="width: 150px;">
                <h5 class="my-3"> {{ utilisateur.prenom }} {{ utilisateur.nom }}</h5>
                <p class="text-muted mb-1"></p>
                <p class="text-muted mb-4"></p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Nom Complet</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="surname text-muted mb-0"> {{ utilisateur.nom }}</p>
                    <p class="lastname text-muted mb-0"> {{ utilisateur.prenom }}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> {{ utilisateur.email }}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Date de naissance</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0"> {{ utilisateur.naissance }}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Role</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0" id="roleName"></p>
                  </div>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="logout-section">
        <div class="bibliothecaireButtons">
          <button @click="logout" class="btn btn-outline-success" type="submit" id="logout">Logout</button>
          <button @click="accessBibliothecaireCommands" class="btn btn-outline-success" type="submit" id="bibliothecaire">Bibliothecaire Controls</button>
          <button @click="update" class="btn btn-outline-success">Mettre-a-jour</button>
        </div>
      </div>
    </section>
  </body>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUtilisateur from '../../services/serviceUtilisateur'
import useRoles from '../../services/serviceRoles'
import useAuthStore from '../../stores/authStore.js'

const { loggedInUser, logout } = useAuthStore()
const { searchUtilisateurs } = useUtilisateur()
const { searchRoles } = useRoles();

const route = useRoute();
const router = useRouter();
console.log('route', route)

const utilisateur = ref({})

onBeforeMount(() => {
  if (loggedInUser) {
    searchUtilisateurs(loggedInUser.id).then((data) => {
      utilisateur.value = data[0]
      loggedInUser.roleId = utilisateur.value.roleId
      searchRoles(loggedInUser.roleId).then((roles => {
        document.getElementById("roleName").innerHTML = roles.nom
      })).catch(err => console.log("Probleme lors de la recuperation du role.", err))

    }).catch(err => console.log("Probleme d'affichage utilisateur", err))
  }
})

const accessBibliothecaireCommands = () => {
  router.push('/bibliothecaire-console')
}

const update = () =>{
    router.push(`/utilisateur-update/${loggedInUser.id}`)
}
</script>


<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  padding-left: 4rem;
}

.card-body{
  padding: 1rem;
}

.bibliothecaire-account-page {
  width: 100vw;
  height: auto;
}

h5 {
  font-weight: bold;
}

section {
  margin-top: 2rem;
  height: auto;
}

.logout-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;

  #logout {
    margin: 1rem;
    width: 10rem;
  }

}

button{
  margin: 1rem;
}

@media(max-width: 768px) { //Normal screen iPhone11
  .bibliothecaire-account-page {
    width: 100vw;
    height: auto;
  }

  .card{
    margin-top: 1rem;
  }

  section {
    height: 100vh;
    margin-left: 4rem;
  }

  #bibliothecaire {
    margin-bottom: 1rem;
  }
}

@media(max-width: 812px) { //Widescreen iPhone11
  .bibliothecaire-account-page {
    width: 100vw;
    height: 100vh;
  }

  .card{
    margin-top: 1rem;
  }

  section {
    height: 150vh;
    margin-left: 4rem;
  }

}
</style>