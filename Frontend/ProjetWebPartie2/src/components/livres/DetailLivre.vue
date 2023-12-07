<template>
    <div class="info-livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff">Browse / {{ livres.nom }}</a>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>

        <div class="info-livres-unique">
            <div class="titre-livre">
                <h1>Livre : {{ livres.nom }} </h1>
            </div>

            <div class="bio-livre">
                <h2>Biographie</h2>
                <p> {{ livres.biographie }}</p>
            </div>

            <div class="pub-livre">
                <h2>Date de pub</h2>
                <p> {{ livres.date_de_pub }}</p>
            </div>

            <div class="edition-livre">
                <h2>Maison d'edition</h2>
                <p> {{ livres.maison_edition }}</p>
            </div>

            <div class="image-livre">
                <img :src =  livres.photo alt="Image" id="image">
            </div>

            <div class="auteur-livre">
                <h2>Auteur</h2>
                <p> nom de l'auteur ici.</p>
            </div>

            <div class="category-livre">
                <h3>Category</h3>
                <p> nom de la categorie ici.</p>
            </div>

            <div class="rating-livre">
                <h3>Rating</h3>
                <p> {{ livres.rating }}</p>
            </div>

            <div class="location-livre">
                <h3>Location</h3>
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
import {ref, reactive, onBeforeMount} from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
console.log('route', route)
const { id } = route.params

import useLivres from '../../services/serviceLivres'

const { searchLivres } = useLivres()

const livres = ref({})
console.log(livres)

onBeforeMount(() => {
    if(id)
    searchLivres(id).then((data) =>{
        console.log('Livres', data)
        livres.value = data[0]
        console.log(livres.value)
    }).catch(err => console.log('Detail livre', err))
})

</script>


<style lang="scss" scoped>

.info-livres-page{
    width: 100vw;
    height: 100vh;
}

.info-livres-unique{
    margin: 2rem;
    position: relative;
    display: flex;
    align-items:flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    height: 80vh;

    #image{
        border: solid .5rem black;
        border-radius: 1rem;
        position: absolute;
        top: 1rem;
        width: 25rem;
        height: 25rem;
    }

    .titre-livre{
        position: absolute;
        left: 30rem;
    }

    .bio-livre{
        position: absolute;
        left: 30rem;
        top: 6rem;
    }

    .pub-livre{
        position: absolute;
        left: 30rem;
        top : 12rem;
    }

    .edition-livre{
        position: absolute;
        left: 30rem;
        top: 17rem;
    }

    .auteur-livre{
        position: absolute;
        left: 30rem;
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

</style>