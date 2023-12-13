<!-- Noah Brosseau : Page signup-->
<template>
    <body class="signup-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Sign Up</a>
            </div>
        </nav>

        <section class="bg-image" id="signup"
            style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style="border-radius: 15px;">
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-5">Crée un compte</h2>

                                    <form>

                                        <div class="form-outline mb-4">
                                            <input v-model="utilisateur.prenom" type="text" id="form3Example1cg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example1cg">Prénom</label>
                                            <div class="text-danger pb-2" v-if="errors.prenom"> {{ errors.prenom }}</div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="utilisateur.nom" type="text" id="form3Example1cg" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example1cg">Nom</label>
                                            <div class="text-danger pb-2" v-if="errors.nom"> {{ errors.nom }}</div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="utilisateur.naissance" type="text" id="form3Example1cg" class="form-control form-control-lg" placeholder="yyyy-mm-dd" />
                                            <label class="form-label" for="form3Example1cg">Date de naissance</label>
                                            <div class="text-danger pb-2" v-if="errors.naissance"> {{ errors.naissance }}</div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="utilisateur.email" type="email" id="form3Example3cg" class="form-control form-control-lg" placeholder="example@gmail.com" />
                                            <label class="form-label" for="form3Example3cg">Email</label>
                                            <div class="text-danger pb-2" v-if="errors.email"> {{ errors.email }}</div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input v-model="utilisateur.mot_de_passe" type="password" id="form3Example4cg"
                                                class="form-control form-control-lg"/>
                                            <label class="form-label" for="form3Example4cg">Mot de passe</label>
                                            <div class="text-danger pb-2" v-if="errors.mot_de_passe"> {{ errors.mot_de_passe }}</div>
                                            <p class="password-rules">*Doit être minimum 8 caractères, et composé d'au moins une lettre, un chiffre et un caractère spéciaux.</p>
                                        </div>

                                        <div class="d-flex justify-content-center">
                                            <button type="button"
                                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" @click="signup">Soummettre</button>
                                        </div>

                                        <p class="text-center text-muted mt-5 mb-0">Déjà un compte? <a href="#!"
                                                class="fw-bold text-body"><RouterLink to="/login">Login ici</RouterLink></a></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </body>
</template>


<script setup>
import {ref, reactive, watchEffect} from 'vue';
import { RouterLink } from 'vue-router';
import useUtilisateur from '../../services/serviceUtilisateur';
import useAuthStore from '../../stores/authStore.js'
import router from '../../router';
import useAuth from '../../services/serviceAuth.js';

const {setUtilisateur, setToken} = useAuthStore();
const { AddUtilisateur } = useUtilisateur();
const { login } = useAuth();

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

const signup = () =>{
    console.log('utilisateur', utilisateur.value)
    if(!valide(utilisateur.value)){
        return
    }
    AddUtilisateur(utilisateur.value).then(() =>{
        login(utilisateur.value.email, utilisateur.value.mot_de_passe).then((data) =>{
            console.log('utilisateur-login', data)
            setToken(data.token)
            setUtilisateur(data.data)
            router.push('/')
        })
    }).catch(err=> console.log("Probleme lors de la creation.", err))
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
    return
})

</script>


<style lang="scss" scoped>

nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

body{
    width: 100vw;
    height: auto;
}

#signup{
    height: auto;
}
.password-rules{
    color: darkred;
    font-size: 12px;
    font-style:italic;
}

@media(max-width: 768px){
    #signup{
        margin-left: 4rem;
    }
}
</style>