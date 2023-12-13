<!-- Noah Brosseau : Page update livres-->
<template>
    <body class="update-livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Livres data</a>
            </div>
        </nav>

        <form @submit.prevent="updateLivre" class="info-update">
            <div class="section">
                <label for="exampleInputTitle1" class="form-label">Titre</label>
                <input v-model="livres.nom" type="name" class="form-control" id="exampleInputEmail1">
                <div class="text-danger pb-2" v-if="errors.nom">{{ errors.nom }}</div>
            </div>
            <div class="section">
                <label for="exampleInputDate1" class="form-label">Date de publication</label>
                <input v-model="livres.date_de_pub" type="name" class="form-control" id="exampleInputDate1">
                <div class="text-danger pb-2" v-if="errors.date_de_pub">{{ errors.date_de_pub }}</div>
            </div>
            <div class="section">
                <label for="exampleInputRating1" class="form-label">Score</label>
                <input v-model="livres.rating" type="number" class="form-control" id="exampleInputRating1">
                <div class="text-danger pb-2" v-if="errors.rating">{{ errors.rating }}</div>
            </div>
            <div class="section">
                <label for="exampleInputPicture1" class="form-label">Photo</label>
                <input v-model="livres.photo" type="link" class="form-control" id="exampleInputPicture1">
                <div class="text-danger pb-2" v-if="errors.photo">{{ errors.photo }}</div>
            </div>
            <div class="section">
                <label for="exampleInputPublication1" class="form-label">Maison d'édition</label>
                <input v-model="livres.maison_edition" type="name" class="form-control" id="exampleInputPublication1">
                <div class="text-danger pb-2" v-if="errors.maison_edition">{{ errors.maison_edition }}</div>
            </div>
            <div class="section">
                <label for="exampleInputLocation1" class="form-label">Location disponible</label>
                <input v-model="livres.location" type="name" class="form-control" id="exampleInputLocation1">
                <div class="text-danger pb-2" v-if="errors.location">{{ errors.location }}</div>
            </div>
            <div class="section">
                <label for="exampleInputAmount1" class="form-label">Montant disponible</label>
                <input v-model="livres.montant" type="number" class="form-control" id="exampleInputAmount1">
                <div class="text-danger pb-2" v-if="errors.montant">{{ errors.montant }}</div>
            </div>
            <div class="section">
                <label for="exampleInputBiography1" class="form-label">Biographie</label>
                <input v-model="livres.biographie" type="biography" class="form-control" id="exampleInputBiography1">
                <div class="text-danger pb-2" v-if="errors.biographie">{{ errors.biographie }}</div>
            </div>
            <div class="section">
                <label for="exampleInputCategorie1" class="form-label">CategorieID</label>
                <input v-model="livres.categoryId" type="number" class="form-control" id="exampleInputCategorie1">
                <div class="text-danger pb-2" v-if="errors.categoryId">{{ errors.categoryId }}</div>
            </div>
            <div class="section">
                <label for="exampleInputAuteur1" class="form-label">AuteurID</label>
                <input v-model="livres.auteurId" type="number" class="form-control" id="exampleInputAuteur1">
                <div class="text-danger pb-2" v-if="errors.auteurId">{{ errors.auteurId }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Mettre a jour</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { id } = route.params

const router = useRouter()
const livres = ref({})

const errors = ref({})


import useLivres from '../../services/serviceLivres';
const { searchLivres, updateLivres } = useLivres()

onBeforeMount(() => {
    if (id) searchLivres(id).then(data => {
        livres.value = data[0]
        console.log(livres.value)
        console.log(livres.date_de_pub)
    }).catch(err => console.log('probleme lors de la recherche', err))
})

const updateLivre = () => {
    if (!valide(livres.value)) {
        return;
    }
    updateLivres(id, livres.value).then(() => {
        router.push('/aLivres')
    }).catch(err =>  console.log('probleme lors de la mise a jour', err))
}

//VALIDATION
const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // YYYY-MM-DD

const valide = livres => {
    for (let champ in livres) {
        champValide(champ, livres)
    }

    if (!livres.auteurId || !livres.categoryId || !dateRegex.test(livres.date_de_pub) || !livres.maison_edition || !livres.nom) {
        return false;
    }
    return true;
}

const champValide = (champ, livres) => {
    switch (champ) {
        case 'auteurId':
        case 'categoryId':
        case 'nom':
        case 'maison_edition':
            if (!livres[champ]) {
                errors.value[champ] = `${champ} est invalide.`
            }
            break
        case 'date_de_pub':
            if (!dateRegex.test(livres[champ])) {
                errors.value[champ] = `Le format de date est invalide.`
            }
            break
    }
}

watchEffect(() => {
    errors.value.auteurId = ''
    if (!livres.value.auteurId) {
        errors.value.auteurId = "*Ce champ doit être rempli."
        return
    }
    errors.value.categoryId = ''
    if (!livres.value.categoryId) {
        errors.value.categoryId = "*Ce champ doit être rempli."
        return
    }
    errors.value.nom = ''
    if (!livres.value.nom) {
        errors.value.nom = "*Ce champ doit être rempli."
        return
    }
    errors.value.maison_edition = ''
    if (!livres.value.maison_edition) {
        errors.value.maison_edition = "*Ce champ doit être rempli."
        return
    }
    errors.value.date_de_pub = ''
    if (!dateRegex.test(livres.value.date_de_pub)) {
        errors.value.date_de_pub = "*Le format de date est invalide."
        return
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

.update-livres-page {
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

    @media(max-width: 812px) {
        .info-update {
            width: 50vw;
        }
    }

}
</style>