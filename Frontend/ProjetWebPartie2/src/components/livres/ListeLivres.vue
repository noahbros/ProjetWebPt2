<!-- Noah Brosseau : Page browse-->
<template>
    <div class="livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff">Browse</a>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
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
import {ref, reactive, onBeforeMount} from 'vue';
const livres = ref([])
import useLivres from '../../services/serviceLivres.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const { getAllLivres } = useLivres()
onBeforeMount(() => {
    getAllLivres().then(data => {
        livres.value = data

        console.log('Liste livres', data)
    })
})

import Livres from './Livres.vue'


</script>

<style>

div.livres-page{
    width: 100vw;
}

div.allLivres{
    display: flex;
    flex-direction: row;
}

.navbar-brand{
    font-weight: bold;
}


</style>