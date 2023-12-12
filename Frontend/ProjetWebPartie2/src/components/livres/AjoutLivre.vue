<template>
    <body class="ajout-livre-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Livres data</a>
            </div>
        </nav>

        <form @submit.prevent="ajouter" class="info-ajout">
            <div class="section">
                <label for="exampleInputTitle1" class="form-label">Titre</label>
                <input v-model="livres.nom" type="name" class="form-control" id="exampleInputEmail1">
            </div>
            <div class="section">
                <label for="exampleInputDate1" class="form-label">Date de publication</label>
                <input v-model="livres.date_de_pub" type="name" class="form-control" id="exampleInputDate1">
            </div>
            <div class="section">
                <label for="exampleInputRating1" class="form-label">Score</label>
                <input v-model="livres.rating" type="number" class="form-control" id="exampleInputRating1">
            </div>
            <div class="section">
                <label for="exampleInputPicture1" class="form-label">Photo</label>
                <input v-model="livres.photo" type="link" class="form-control" id="exampleInputPicture1">
            </div>
            <div class="section">
                <label for="exampleInputPublication1" class="form-label">Maison d'édition</label>
                <input v-model="livres.maison_edition" type="name" class="form-control" id="exampleInputPublication1">
            </div>
            <div class="section">
                <label for="exampleInputLocation1" class="form-label">Location disponible</label>
                <input v-model="livres.location" type="name" class="form-control" id="exampleInputLocation1">
            </div>
            <div class="section">
                <label for="exampleInputAmount1" class="form-label">Montant disponible</label>
                <input v-model="livres.montant" type="number" class="form-control" id="exampleInputAmount1">
            </div>
            <div class="section">
                <label for="exampleInputBiography1" class="form-label">Biographie</label>
                <input v-model="livres.biographie" type="biography" class="form-control" id="exampleInputBiography1">
            </div>
            <div class="section">
                <label for="exampleInputCategorie1" class="form-label">CategorieID</label>
                <input v-model="livres.categoryId" type="number" class="form-control" id="exampleInputCategorie1">
            </div>
            <div class="section">
                <label for="exampleInputAuteur1" class="form-label">AuteurID</label>
                <input v-model="livres.auteurId" type="number" class="form-control" id="exampleInputAuteur1">
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
    </body>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLivres from '../../services/serviceLivres';

const router = useRouter()
const { addLivres } = useLivres()

const livres = ref({
    nom: '',
    date_de_pub: '',
    rating: 0,
    photo: '',
    maison_edition: '',
    location: '',
    montant: 0,
    biographie: '',
    categoryId: null,
    auteurId: null
})

const ajouter = () => {
    console.log('livres ajouter', livres.value)
    addLivres(livres.value).then(() => {
        router.push('/aLivres')
    }).catch(err => console.log("Probleme lors d'ajout", err))
}


</script>

<style lang="scss" scoped>
.ajout-livre-page {
    width: 100vw;

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
        }
    }

    @media(max-width: 768px) {

        .ajout-livre-page {
            width: 100vw;
            height: auto;
        }

        .info-ajout {
            width: 50vw;
            flex-wrap: wrap;
        }
    }

    @media(max-width: 1280px) {
        nav {
            position: sticky;
            top: 0;
            z-index: 50;
            padding-left: 4rem;
        }

        .ajout-livre-page {
            width: 100vw;
        }

        .info-ajout {
            width: 50vw;
            flex-wrap: wrap;
        }
    }
}
</style>