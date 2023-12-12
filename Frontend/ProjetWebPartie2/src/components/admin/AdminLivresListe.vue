<template>
    <body class="admin-livres">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container">
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
                    <AdminLivres v-for="livre in books" :key="livre.id" :livreAdmin="livre"
                        @supprimerLivre="supprimerLivre" />
                </tbody>
            </table>
            <button class="btn btn-primary" @click="addLivres" id="ajout">Ajouter</button>
        </div>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
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

const supprimerLivre = (id) => {
    console.log('emits', id)
    deleteLivres(id).then((data) => {
        console.log('deleted : ', data)
        getAllLivres().then(data => {
            books.value = data

            console.log("Liste de livres après suppression : ", data)
        }).catch(err => { console.log(err.message) })
    })
}

const addLivres = () => {
    router.push('/livres-ajout')
}


</script>

<style lang="scss" scoped>
.admin-livres {
    width: 200rem;
    height: 10vh;
}

.container {
    padding-left: 0;
    margin-left: 0;
}

nav {
    position: sticky;
    top: 0;
    z-index: 50;
    padding-left: 4.5rem;
}



@media(max-width: 768px) {

    .app {
        width: 200rem;
        height: auto;
    }

    nav {
        padding-left: 0;
    }


    .admin-livres {
        width: 200rem;
        height: 10vh;
    }

    table {
        margin: 2rem;
        margin-left: 5rem;
        width: 10rem;
    }

    #ajout {
        margin-left: 5rem;
    }
}

@media(max-width: 812px) {
    nav {
        position: sticky;
        top: 0;
        z-index: 50;
        padding-left: 0rem;
    }

    .admin-livres {
        width: 200rem;
        height: auto;
    }

    .container {
        padding: 0;
        margin-left: 4.5rem;
    }

    table {
        margin-left: 5rem;
    }

    #ajout {
        margin-left: 5rem;
    }
}


@media(min-width: 813px) {

    .admin-livres {
        width: 100vw;
        height: auto;

        .donnees-livres {
            margin: 2rem;
            margin-left: 5rem;
            width: 50vw;
            display: flex;
            flex-direction: column;
            align-items: center;

            table{
                margin-left: 20vw;
            }
        }
    }
}
</style>