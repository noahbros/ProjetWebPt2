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
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
    </body>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useCategories from '../../services/serviceCategories';

const router = useRouter()
const { AddCategory } = useCategories();


const categorie = ref({
    nom: ''
})

const ajouter = () => {
    console.log('categories ajouter', categorie.value)
    AddCategory(categorie.value).then(() => {
        router.push('/aCategories')
    }).catch(err => console.log("Probleme lors d'ajout", err))

}


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