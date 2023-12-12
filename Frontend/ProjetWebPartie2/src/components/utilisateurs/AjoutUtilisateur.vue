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
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>

    </body>
</template>


<script setup>
import { ref } from 'vue'
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

const ajouter = () => {
    console.log('Utilisateur Ajouter : ', utilisateur.value)
    AddUtilisateur(utilisateur.value).then(() => {
        router.push('/aUtilisateurs')
    }).catch(err => console.log("Probleme lors d'ajout", err))
}

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

        .utilisateur-ajout-page{
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