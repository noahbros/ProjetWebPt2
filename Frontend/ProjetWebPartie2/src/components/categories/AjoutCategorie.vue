<!-- Noah Brosseau : Page ajouter categorie-->
<template>
    <body class="ajout-categorie-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Categories data</a>
            </div>
        </nav>

        <form @submit.prevent="ajouter" class="info-ajout">
            <div class="section">
                <label for="exampleInputName1" class="form-label">Nom de catégorie</label>
                <input v-model="categorie.nom" type="name" class="form-control" id="exampleInputName1">
                <div class="text-danger pb-2" v-if="errors.nom"> {{errors.nom}} </div>
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import useCategories from '../../services/serviceCategories';

const router = useRouter()
const { AddCategory } = useCategories();


const categorie = ref({
    nom: ''
})

const errors = ref({
    nom: ''
})

const ajouter = () => {
    if(!valide(categorie.value)){
        return
    }
    console.log('categories ajouter', categorie.value)
    AddCategory(categorie.value).then(() => {
        router.push('/aCategories')
    }).catch(err => console.log("Probleme lors d'ajout", err))

}

//VALIDATION
const valide = categorie =>{
    for(let champ in categorie){
        champValide(champ, categorie)
    }

    if(!categorie.nom){
        return false;
    }
    return true;
}

const champValide = (champ, categorie) => {
    switch(champ){
        case 'nom':
            if(!categorie[champ]){
                errors.value[champ] = `${champ} doit être remplis.`
            }
            break
    }
}

watchEffect(() =>{
    errors.value.nom = ''
    if(!categorie.value.nom){
        errors.value.nom = "*Ce champ doit être remplis."
        return
    }
})


</script>

<style lang="scss" scoped>
.ajout-categorie-page {
    width: 100vw;
    height: 100vh;

    .info-ajout {
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