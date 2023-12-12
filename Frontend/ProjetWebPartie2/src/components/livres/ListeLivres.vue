<!-- Noah Brosseau : Page browse-->
<template>
    <div class="livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff">Browse</a>
                <form @submit.prevent='search' class="d-flex" role="search">
                    <input v-model="livresChercher.nom" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>

        <div class="allLivres">
            <Livres v-for="book in livres" :key="book.id" :livres="book"></Livres>
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
    console.log(livresChercher.value.nom)
    if(!livresChercher.value.nom){
        console.log('no search')
        getAllLivres().then(data =>{
            livres.value = data
            console.log('No search', data)
        })
    }
    else{
        searchLivres(null,livresChercher.value.nom).then(data =>{
            livres.value = data
            console.log('Liste livres filtrer', data)
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

@media(max-width: 768px) {

    div.livres-page{
        nav{
            padding-left: 0rem;
        }
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
        flex-direction: column;
    }

}

@media(min-width: 812px){

    .allLivres{
        margin-left: 5rem;
    }

    .card-text{
        margin-left: 1rem;
    }
}
</style>