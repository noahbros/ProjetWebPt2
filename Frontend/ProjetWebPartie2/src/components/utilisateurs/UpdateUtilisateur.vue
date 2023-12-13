<!-- Noah Brosseau : Page update utilisateur-->
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
                <div class="text-danger pb-2" v-if="errors.prenom"> {{ errors.prenom }}</div>
            </div>
            <div class="section">
                <label for="exampleInputName1" class="form-label">Nom</label>
                <input v-model="utilisateur.nom" type="name" class="form-control" id="exampleInputName1">
                <div class="text-danger pb-2" v-if="errors.nom"> {{ errors.nom }}</div>
            </div>
            <div class="section">
                <label for="exampleInputDateOfBirth1" class="form-label">Naissance</label>
                <input v-model="utilisateur.naissance" type="date-of-birth" class="form-control"
                    id="exampleInputDateOfBirth1">
                <div class="text-danger pb-2" v-if="errors.naissance"> {{ errors.naissance }}</div>
            </div>
            <div class="section">
                <label for="exampleInputPicture1" class="form-label">Photo</label>
                <input v-model="utilisateur.photo" type="link" class="form-control" id="exampleInputPicture1">
                <div class="text-danger pb-2" v-if="errors.photo"> {{ errors.photo }}</div>
            </div>
            <div class="section">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input v-model="utilisateur.email" type="email" class="form-control" id="exampleInputEmail1">
                <div class="text-danger pb-2" v-if="errors.email"> {{ errors.email }}</div>
            </div>
            <div class="section">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="utilisateur.mot_de_passe" type="password" class="form-control" id="exampleInputPassword1">
                <div class="text-danger pb-2" v-if="errors.mot_de_passe"> {{ errors.mot_de_passe }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Mettre-a-jour</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuthStore from '../../stores/authStore';

const route = useRoute()
const { id } = route.params

const router = useRouter()
const utilisateur = ref({})
const errors = ref({})

import useUtilisateur from '../../services/serviceUtilisateur';
const { searchUtilisateurs, modifierUtilisateur } = useUtilisateur()
const { loggedInUser } = useAuthStore()

onBeforeMount(() => {
    if (id) searchUtilisateurs(id).then(data => {
        utilisateur.value = data[0]
    }).catch(err => console.log('erreur de recherche', err))
})

const updateUtilisateur = () => {
    if (!valide(utilisateur.value)) {
        return;
    }
    modifierUtilisateur(id, utilisateur.value).then(() => {
        if (loggedInUser.roleId === 1 || loggedInUser.roleID === 2) {
            router.push('/aUtilisateurs')
        }
        else {
            router.push('/utilisateurs')
        }
    }).catch(err => console.log('Probleme lors de la mise a jour', err))
}

//VALIDATION
const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const naissanceRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const valide = utilisateur => {
    for (let champ in utilisateur) {
        champValide(champ, utilisateur)
    }

    if (!utilisateur.nom || !utilisateur.prenom || !passwordRegex.test(utilisateur.mot_de_passe) || !naissanceRegex.test(utilisateur.naissance) || !utilisateur.naissance || !emailRegex.test(utilisateur.email)) {
        return false;
    }
    return true;
}

const champValide = (champ, utilisateur) => {
    switch (champ) {
        case 'nom':
        case 'prenom':
            if (!utilisateur[champ]) {
                errors.value[champ] = `${champ} est invalide.`
            }
            break
        case 'mot_de_passe':
            if (!passwordRegex.test(utilisateur[champ])) {
                errors.value[champ] = `${champ} a un format invalide.`
            }
            break
        case 'naissance':
            if (!naissanceRegex.test(utilisateur[champ])) {
                errors.value[champ] = `${champ} a un format invalide.`
            }
            break
        case 'email':
            if (!emailRegex.test(utilisateur[champ])) {
                errors.value[champ] = `${champ} est invalide.`
            }
            break

    }
}

watchEffect(() => {
    errors.value.nom = ''
    if (!utilisateur.value.nom || utilisateur.value.nom.length < 2) {
        errors.value.nom = "*Le nom est incorrecte. Doit être un minimum de 2 caractères."

    }
    errors.value.prenom = ''
    if (!utilisateur.value.prenom || utilisateur.value.prenom.length < 2) {
        errors.value.prenom = "*Le prenom est inccorecte. Doit être un minimum de 2 caractères."


    }
    errors.value.mot_de_passe = ''
    if (!passwordRegex.test(utilisateur.value.mot_de_passe)) {
        errors.value.mot_de_passe = "*Le mot de passe est invalide, doit être 8 caractères comportant une lettre un chiffre et un caractère spéciaux."


    }
    errors.value.naissance = ''
    if (!naissanceRegex.test(utilisateur.value.naissance)) {
        errors.value.naissance = "*Le format de date est invalide : YYYY-MM-DD"

    }
    errors.value.email = ''
    if (!emailRegex.test(utilisateur.value.email)) {
        errors.value.email = "*Ce champ doit être rempli."

    }
})

</script>



<style lang='scss' scoped>
nav {
    position: sticky;
    top: 0;
    z-index: 50;
    padding-left: 4rem;
}

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
        nav {
            padding-left: 0rem;
        }

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

        .update-utilisateur-page {
            width: 100vw;
            height: auto;
        }
    }

}
</style>