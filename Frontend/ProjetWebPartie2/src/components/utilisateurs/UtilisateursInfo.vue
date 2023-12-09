<!-- Noah Brosseau : Page utilisateurs-->
<template>
    <body class="profile-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Profile</a>
            </div>
        </nav>

        <section style="background-color: #eee;">
            <div class="container py-5">
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
                <button @click="logout" class="btn btn-outline-success" type="submit" id="logout">Logout</button>
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

const { loggedInUser, setToken, setUtilisateur } = useAuthStore()
const { searchUtilisateurs, modifierUtilisateur } = useUtilisateur()
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
            if (!loggedInUser.roleId) {
                loggedInUser.roleId = 3;
                modifierUtilisateur(loggedInUser.id, loggedInUser).then(() => {
                    console.log("modified : ", utilisateur.value)
                }).catch(err => console.log("Probleme lors d'affectation du role.", err))
            }
            else {
                if (loggedInUser.roleId === 1) {
                    router.push('/admin')
                    return
                }
                if(loggedInUser.roleId === 2){
                    router.push('/bibliothecaire')
                    return
                }
            }
            searchRoles(loggedInUser.roleId).then((roles => {
                document.getElementById("roleName").innerHTML = roles.nom
            })).catch(err => console.log("Probleme lors de la recuperation du role.", err))

        }).catch(err => console.log("Probleme d'affichage utilisateur", err))
    }
})

const logout = () => {
    setUtilisateur("")
    setToken("")
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.profile-page {
    width: 100vw;
    height: 100vh;
}

section{
  height: 93vh;
}

h5 {
    font-weight: bold;
}

.logout-section {
    display: flex;
    align-items: center;
    flex-direction: column;

    #logout {
        margin: 1rem;
        width: 10rem;
    }
}
</style>