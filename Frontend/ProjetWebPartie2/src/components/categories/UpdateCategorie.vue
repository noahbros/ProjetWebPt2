<!-- Noah Brosseau : Page update categorie-->
<template>
    <body class="update-categorie-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Categories data</a>
            </div>
        </nav>

        <form @submit.prevent="updateCategorie" class="info-update">
            <div class="section">
                <label for="exampleInputName1" class="form-label">Nom de catégorie</label>
                <input v-model="categories.nom" type="name" class="form-control" id="exampleInputName1">
                <div class="text-danger pb-2" v-if="errors.nom"> {{errors.nom}} </div>
            </div>
            <button type="submit" class="btn btn-primary" id="update-button">Mettre-a-jour</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
let { id } = route.params

const router = useRouter();
const categories = ref({})
const errors = ref({})

import useCategories from '../../services/serviceCategories.js';
const { SearchCategories, UpdateCategory } = useCategories()

onBeforeMount(() => {
    if (id) SearchCategories(id).then(data => {
        categories.value = data[0]
        console.log("name : ", categories.value.nom)
    }).catch(err => console.log('erreure de recherche', err))
})

const updateCategorie = () => {
    if(!valide(categories.value)){
        return;
    }
    console.log(categories.value)
    UpdateCategory(id, categories.value).then(() => {
        router.push('/aCategories')
    }).catch(err => console.log('Probleme lors de mise-a-jour', err))
}

//VALIDATION
const valide = categories =>{
    for(let champ in categories){
        champValide(champ, categories)
    }

    if(!categories.nom){
        return false;
    }
    return true;
}

const champValide = (champ, categories) => {
    switch(champ){
        case 'nom':
            if(!categories[champ]){
                errors.value[champ] = `${champ} doit être remplis.`
            }
            break
    }
}

watchEffect(() =>{
    errors.value.nom = ''
    if(!categories.value.nom){
        errors.value.nom = "*Ce champ doit être remplis."
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

.update-categorie-page {
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

    @media(max-width: 812px) {
        nav {
            position: sticky;
            top: 0;
            z-index: 50;
            padding-left: 4rem;
        }

        #exampleInputName1 {
            width: 50vw;
        }

        #update-button {
            width: 11.788rem;
        }
    }

}
</style>