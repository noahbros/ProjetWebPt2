<!-- Noah Brosseau : Page browse-->
<template>
    <div class="livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff">Browse</a>
                <form @submit.prevent='search' class="d-flex" role="search">
                    <input v-model="livresChercher.nom" class="form-control me-2" type="search" placeholder="Search par nom" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>

        <div class="allLivres">
            <Livres v-for="book in livres" :key="book.id" :livres="book"></Livres>
            <div class="text-danger pb-2" id="not-found"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
const livres = ref([])
const livresChercher = ref({
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

const errors = ref({
    nom: '',
    date_de_pub: '',
    rating: 0,
    photo: '',
    maison_edition: '',
    location: '',
    montant: 0,
    biographie: '',
    categoryId: null,
    auteurId: ''
})

import useLivres from '../../services/serviceLivres.js'

const { getAllLivres, searchLivres } = useLivres()
onBeforeMount(() => {
    getAllLivres().then(data => {
        livres.value = data

        console.log('Liste livres', data)
    })
})
import Livres from './Livres.vue'

const search = () =>{
    document.getElementById('not-found').innerHTML = null
    console.log(livresChercher.value.nom)
    if(!livresChercher.value.nom){
        console.log('no search')
        getAllLivres().then(data =>{
            livres.value = data
            console.log('No search', data)
        }).catch(err => console.log("Probleme pendant affichage", err))
    }
    else{
        searchLivres(null,livresChercher.value.nom).then(data =>{
            livres.value = data
            console.log('Liste livres filtrer', data)
        }).catch(err => {
            console.log("Probleme pendant recherche", err)
            livres.value = null
            document.getElementById('not-found').innerHTML = "Auncun livre trouver."
        })
    }
}




</script>

<style>
div.livres-page {
    width: 100vw;
    height: 100vh;

    nav {
        position: sticky;
        top: 0;
        z-index: 50;
        padding-left: 4rem;
    }

}

div.allLivres {
    display: flex;
    flex-direction: row;
}

.navbar-brand {
    font-weight: bold;
}

.container{
        flex-direction: row;
    }

#not-found{
    padding : 1rem;
    font-weight: bold;
    font-size: 30px;
}

@media(max-width: 768px) {

    div.livres-page{
        nav{
            padding-left: 0rem;
        }
    }

    form{
        margin-left: 0rem;
    }

    .allLivres {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .container-fluid{
        display: flex;
        flex-direction: row;
    }

    #not-found{
    padding : 1rem;
    margin-left: 5rem;
    font-weight: bold;
    font-size: 30px;
}

}

@media(min-width: 812px){

    .allLivres{
        margin-left: 5rem;
    }

    .card-text{
        margin-left: 1rem;
    }

    .form-control.me-2{
        width: 10rem;
    }
}
</style>