<template>
    <body class="update-utilisateur-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Utilisateurs data</a>
            </div>
        </nav>

        <form @submit.prevent="updateUtilisateur" class="info-update">
            <div class="section">
                <label for="exampleInputFirstName1" class="form-label">Prenom</label>
                <input v-model="utilisateur.prenom" type="name" class="form-control" id="exampleInputFirstName1">
            </div>
            <div class="section">
                <label for="exampleInputName1" class="form-label">Nom</label>
                <input v-model="utilisateur.nom" type="name" class="form-control" id="exampleInputName1">
            </div>
            <div class="section">
                <label for="exampleInputDateOfBirth1" class="form-label">Naissance</label>
                <input v-model="utilisateur.naissance" type="date-of-birth" class="form-control"
                    id="exampleInputDateOfBirth1">
            </div>
            <div class="section">
                <label for="exampleInputPicture1" class="form-label">Photo</label>
                <input v-model="utilisateur.photo" type="link" class="form-control" id="exampleInputPicture1">
            </div>
            <div class="section">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input v-model="utilisateur.email" type="email" class="form-control" id="exampleInputEmail1">
            </div>
            <div class="section">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="utilisateur.mot_de_passe" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="section">
                <label for="exampleInputRole1" class="form-label">RoleID</label>
                <input v-model="utilisateur.roleId" type="number" class="form-control" id="exampleInputRole1">
                <p>Pour les roles voici les ID respectif : 1 = Admin, 2 = Bibliothecaire, 3 = Utilisateur</p>
            </div>
            <button type="submit" class="btn btn-primary">Mettre-a-jour</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { id } = route.params

const router = useRouter()
const utilisateur = ref({})

import useUtilisateur from '../../services/serviceUtilisateur';
const { searchUtilisateurs, modifierUtilisateur } = useUtilisateur()

onBeforeMount(() => {
    if (id) searchUtilisateurs(id).then(data => {
        utilisateur.value = data[0]
    }).catch(err => console.log('erreur de recherche', err))
})

const updateUtilisateur = () => {
    modifierUtilisateur(id, utilisateur.value).then(() => {
        router.push('/aUtilisateurs')
    }).catch(err => console.log('Probleme lors de la mise a jour', err))
}
</script>



<style lang='scss' scoped>
.update-utilisateur-page {
    width: 100vw;
    height: auto;

    .info-update {
        width: 20vw;
        margin-left: 8rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;

        .section {
            padding-bottom: .5rem;

            p {
                font-size: 10px;
            }
        }
    }

    @media(max-width: 768px) {
        .info-update {
            width: 50vw;
        }
    }

    @media(max-width: 1280px) {
        nav {
            position: sticky;
            top: 0;
            z-index: 50;
            padding-left: 4rem;
        }

        .update-utilisateur-page{
            width: 100vw;
            height: auto;
        }
    }

}
</style>