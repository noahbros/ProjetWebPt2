<!-- Noah Brosseau : Page ajouter utilisateur-->
<template>
    <body class="utilisateur-ajout-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Utilisateurs data</a>
            </div>
        </nav>

        <form @submit.prevent="ajouter" class="info-ajout">
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
            <div class="section">
                <label for="exampleInputRole1" class="form-label">RoleID</label>
                <input v-model="utilisateur.roleId" type="number" class="form-control" id="exampleInputRole1">
                <p>Pour les roles voici les ID respectif : 1 = Admin, 2 = Bibliothecaire, 3 = Utilisateur</p>
                <div class="text-danger pb-2" v-if="errors.roleId"> {{ errors.roleId }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>

    </body>
</template>


<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import useUtilisateur from '../../services/serviceUtilisateur';

const router = useRouter()
const { AddUtilisateur } = useUtilisateur()

const utilisateur = ref({
    nom: '',
    prenom: '',
    naissance: '',
    photo: '',
    email: '',
    mot_de_passe: '',
    roleId: ''
})

const errors = ref({
    nom: '',
    prenom: '',
    naissance: '',
    photo: '',
    email: '',
    mot_de_passe: '',
    roleId: ''
})

const ajouter = () => {
    if (!valide(utilisateur.value)) {
        return;
    }
    console.log('Utilisateur Ajouter : ', utilisateur.value)
    AddUtilisateur(utilisateur.value).then(() => {
        router.push('/aUtilisateurs')
    }).catch(err => console.log("Probleme lors d'ajout", err))
}

//VALIDATION
const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const naissanceRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const valide = utilisateur => {
    for (let champ in utilisateur) {
        champValide(champ, utilisateur)
    }

    if (!utilisateur.nom || !utilisateur.prenom || !passwordRegex.test(utilisateur.mot_de_passe) || !naissanceRegex.test(utilisateur.naissance)) {
        return false;
    }
    return true;
}

const champValide = (champ, utilisateur) => {
    switch (champ) {
        case 'nom':
        case 'prenom':
        case 'roleId':
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
                errors.value[champ] = `${champ} a un format invalide.`
            }

    }
}

watchEffect(() => {
    errors.value.nom = ''
    if (!utilisateur.value.nom || utilisateur.value.nom < 2) {
        errors.value.nom = "*Le nom est incorrecte. Doit être un minimum de 2 caractères."

    }
    errors.value.prenom = ''
    if (!utilisateur.value.prenom || utilisateur.value.prenom < 2) {
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
        errors.value.email = "*Le format de courriel est invalide."
    }

    errors.value.roleId = ''
    if (!utilisateur.value.roleId) {
        errors.value.roleId = "*Ce champ doit être rempli."
    }
    return
})


</script>

<style scoped>
.utilisateur-ajout-page {
    width: 100vw;
    height: auto;

    nav {
        position: sticky;
        top: 0;
        z-index: 50;
        padding-left: 4rem;
    }

    .info-ajout {
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

    @media(max-width: 812px) {

        .utilisateur-ajout-page {
            width: 100vw;
            height: auto;
        }

        nav {
            position: sticky;
            top: 0;
            z-index: 50;
            padding-left: 4rem;
        }

        .info-ajout {
            width: 50vw;
        }
    }

}
</style>