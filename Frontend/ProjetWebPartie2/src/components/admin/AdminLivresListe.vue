<template>
    <body class="admin-livres">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Livres data</a>
            </div>
        </nav>

        <div class="donnees-livres">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Date de publication</th>
                        <th>Score</th>
                        <th>Page de couverture</th>
                        <th>Maison d'edition</th>
                        <th>Location disponible</th>
                        <th>Montant disponible</th>
                        <th>Biographie</th>
                        <th>Categorie</th>
                        <th>Auteur</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminLivres v-for="livre in books" :key="livre.id" :livreAdmin="livre" @supprimerLivre="supprimerLivre"/>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="addLivres">Ajouter</button>
        </div>
    </body>
</template>

<script setup>
import {ref, reactive, onBeforeMount} from 'vue';
const books = ref([])
import useLivres from '../../services/serviceLivres.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const { getAllLivres, deleteLivres } = useLivres();
onBeforeMount(() => {
    getAllLivres().then(data => {
        books.value = data
        console.log(books.value)
        console.log('Liste livres', data)
    })
})
import AdminLivres from './AdminLivres.vue'

const supprimerLivre = (id) =>{
    console.log('emits', id)
    deleteLivres(id).then((data) =>{
        console.log('deleted : ', data)
        getAllLivres().then(data =>{
            books.value = data

            console.log("Liste de livres après suppression : ", data)
        }).catch(err => {console.log(err.message)})
    })
}

const addLivres = () =>{
    router.push('/livres-ajout')
}


</script>

<style lang=scss scoped>

.admin-livres{
    width: 100vw;
    height: 100vh;

    .donnees-livres{
        margin: 2rem;
        width: 50vw;

    }
}

</style>