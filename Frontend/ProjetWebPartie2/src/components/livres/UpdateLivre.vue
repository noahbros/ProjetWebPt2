<template>
    <body class="update-livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Utilisateurs data</a>
            </div>
        </nav>

        <form  @submit.prevent="updateLivre" class="info-update">
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
            <button type="submit" class="btn btn-primary">Mettre a jour</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { id } = route.params

const router = useRouter()
const livres = ref({})


import useLivres from '../../services/serviceLivres';
const { searchLivres, updateLivres} = useLivres()

onBeforeMount(() =>{
    if(id) searchLivres(id).then(data=>{
        livres.value = data[0]
        console.log(livres.value)
        console.log(livres.date_de_pub)
    }).catch(err => console.log('probleme lors de la recherche', err))
})

const updateLivre = () =>{
    updateLivres(id, livres.value).then(() =>{
        router.push('/aLivres')
    }).catch(err => console.log('probleme lors de la mise a jour', err))
}

</script>



<style lang='scss' scoped>
.update-livres-page {
    width: 100vw;
    height: 100vh;

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

    @media(max-width: 320px) {
        .info-ajout {
            width: 50vw;
        }
    }

}
</style>