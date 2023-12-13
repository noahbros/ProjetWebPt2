<!-- Noah Brosseau : Page categorie data-->
<template>
    <body class="admin-categories">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Categories data</a>
            </div>
        </nav>

        <div class="donnees-categories">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom de catégorie</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminCategories v-for="category in categories" :key="category.id" :categorieAdmin="category" @supprimerCategory="supprimerCategory"/>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="addCategory" id="ajout">Ajouter</button>
        </div>
    </body>
</template>

<script setup>
import {ref, reactive, onBeforeMount} from 'vue';
const categories = ref([])
import useCategories from '../../services/serviceCategories.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const { getAllCategories, DeleteCategory } = useCategories();
onBeforeMount(() => {
    getAllCategories().then(data => {
        categories.value = data
        console.log(categories.value)
        console.log('Liste categories', data)
    })
})
import AdminCategories from './AdminCategories.vue'

const supprimerCategory = (id) =>{
    console.log('emits', id)
    DeleteCategory(id).then((data) =>{
        console.log('deleted : ', data)
        getAllCategories().then(data =>{
            categories.value = data

            console.log("Liste de categories après suppression : ", data)
        }).catch(err => {console.log(err.message)})
    })
}

const addCategory = () =>{
    router.push('/categories-ajout')
}


</script>

<style lang=scss scoped>
nav {
    position: sticky;
    top: 0;
    z-index: 50;
    padding-left: 4rem;
}

.admin-categories{
    width: 100vw;
    height: auto;

    .donnees-categories{
        margin: 2rem;
        width: 25vw;

    }

    table{
        width: 20vw;
    }
}

@media(max-width: 768px) {

    .admin-categories{
        height: 100vh;
    }

    table{
        margin-left: 2.5rem;
    }

    #ajout{
        margin-left: 10rem;
    }


}

@media(min-width: 812px) {

    table{
        margin-left: 4rem;
    }


    .donnees-categories{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

</style>