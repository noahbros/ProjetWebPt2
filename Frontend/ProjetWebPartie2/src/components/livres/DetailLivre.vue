<!-- Noah Brosseau : Page info-livres-->
<template>
    <div class="info-livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff">Browse / {{ livres.nom }}</a>
            </div>
        </nav>

        <div class="info-livres-unique">
            <div class="titre-livre">
                <h1>{{ livres.nom }} </h1>
            </div>


            <div class="image-livre">
                <img :src=livres.photo alt="Image" id="image">
            </div>

            <div class="bio-livre">
                <h2>Biographie</h2>
                <p> {{ livres.biographie }}</p>
            </div>

            <div class="pub-livre">
                <h2>Date de publication</h2>
                <p> {{ livres.date_de_pub }}</p>
            </div>

            <div class="edition-livre">
                <h2>Maison d'édition</h2>
                <p> {{ livres.maison_edition }}</p>
            </div>

            <div class="auteur-livre">
                <h2>Auteur</h2>
                <p> nom de l'auteur ici.</p>
            </div>

            <div class="category-livre">
                <h3>Catégorie</h3>
                <p> nom de la categorie ici.</p>
            </div>

            <div class="rating-livre">
                <h3>Score</h3>
                <p> {{ livres.rating }}</p>
            </div>

            <div class="location-livre">
                <h3>Location disponible</h3>
                <p> {{ livres.location }}</p>
            </div>

            <div class="montant-livre">
                <h4>Montant disponible</h4>
                <p> {{ livres.montant }}</p>
            </div>

        </div>

    </div>
</template>


<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
console.log('route', route)
const { id } = route.params

import useLivres from '../../services/serviceLivres'

const { searchLivres } = useLivres()

const livres = ref({})
console.log(livres)

onBeforeMount(() => {
    if (id)
        searchLivres(id).then((data) => {
            console.log('Livres', data)
            livres.value = data[0]
            console.log(livres.value)
        }).catch(err => console.log('Detail livre', err))
})

</script>


<style lang="scss" scoped>
nav {
    position: sticky;
    top: 0;
    z-index: 50;
    padding-left: 4rem;
}

.info-livres-page {
    width: 100vw;
    height: auto;
}

.info-livres-unique {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 100vh;
    font-size: 4vw;
    margin-left: 5rem;

    #image {
        margin-bottom: 1rem;
        border: solid .25rem black;
        border-radius: 1rem;
        top: 3rem;
        width: 10rem;
        left: 7rem;
        height: 10rem;
    }

    h1{
        font-weight: bolder;
    }

    h2 {
        font-weight: bold;
        font-size: 18px;
    }

    h3{
        font-weight: bold;
        font-size: 16px;
    }

    h4{
        font-weight: bold;
        font-size: 14px;
    }

    p{
        font-size: 12px;
    }
}

@media(min-width: 812px) {
    nav {
    position: sticky;
    top: 0;
    z-index: 50;
    padding-left: 4rem;
}

.info-livres-page {
    width: 100vw;
    height: auto;
}

.info-livres-unique {
    margin-left: 12vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 100vh;
    font-size: 12px;
    margin-left: 5rem;

    #image {
        margin-bottom: 1rem;
        border: solid .25rem black;
        border-radius: 1rem;
        top: 3rem;
        width: 10rem;
        left: 7rem;
        height: 10rem;
    }

    h1{
        font-weight: bolder;
    }

    h2 {
        font-weight: bold;
        font-size: 20px;
    }

    h3{
        font-weight: bold;
        font-size: 18px;
    }

    h4{
        font-weight: bold;
        font-size: 16px;
    }

    p{
        font-size: 14px;
    }
}
}

@media(min-width: 1280px){
    nav {
    position: sticky;
    top: 0;
    z-index: 50;
    padding-left: 4rem;
}
.info-livres-page{
    width: 100vw;
    height: 100vh;
}

.info-livres-unique{
    margin: 2rem;
    position: relative;
    height: 80vh;

    h1{
        font-size: 5vh;
    }

    h2{
        font-size: 4vh;
    }

    h3{
        font-size: 3vh;
    }

    h4{
        font-size: 2vh;
    }

    #image{
        border: solid .5rem black;
        border-radius: 1rem;
        position: absolute;
        top: 4rem;
        width: 25rem;
        height: 25rem;
    }

    .titre-livre{
        position: absolute;
        left: 7rem;
    }

    .bio-livre{
        position: absolute;
        left: 35rem;
        top: 6rem;
    }

    .pub-livre{
        position: absolute;
        left: 35rem;
        top : 12rem;
    }

    .edition-livre{
        position: absolute;
        left: 35rem;
        top: 17rem;
    }

    .auteur-livre{
        position: absolute;
        left: 35rem;
        top: 23rem;
    }

    .category-livre{
        position: absolute;
        left: 60rem;
        top: 6rem;
    }

    .rating-livre{
        position: absolute;
        left: 60rem;
        top: 12rem;
    }

    .location-livre{
        position: absolute;
        left: 60rem;
        top: 17rem;
    }

    .montant-livre{
        position: absolute;
        left: 60rem;
        top: 23rem;
    }
}
}
</style>