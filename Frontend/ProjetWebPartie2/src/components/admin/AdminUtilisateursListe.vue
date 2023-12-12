<template>
    <body class="admin-utilisateurs">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Utilisateurs data</a>
            </div>
        </nav>

        <div class="donnees-utilisateurs">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Date de naissance</th>
                        <th>Photo</th>
                        <th>Courriel</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminUtilisateurs v-for="utilisateur in utilisateurs" :key="utilisateur.id"
                        :utilisateurAdmin="utilisateur" @deleteUtilisateur="deleteUtilisateur" />
                </tbody>
            </table>
            <button class="btn btn-primary" @click="addUtilisateur" id="ajout">Ajouter</button>
        </div>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
const utilisateurs = ref([])
import useUtilisateur from '../../services/serviceUtilisateur.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const { getAllUtilisateur, supprimerUtilisateur } = useUtilisateur();
onBeforeMount(() => {
    getAllUtilisateur().then(data => {
        utilisateurs.value = data
        console.log(utilisateurs.value)
        console.log('Liste utilisateur', data)
    })
})
import AdminUtilisateurs from './AdminUtilisateurs.vue'

const deleteUtilisateur = (id) => {
    console.log('emits', id)
    supprimerUtilisateur(id).then((data) => {
        console.log('deleted : ', data)
        getAllUtilisateur().then(data => {
            utilisateurs.value = data

            console.log("Liste de utilisateurs après suppression : ", data)
        }).catch(err => { console.log(err.message) })
    })
}

const addUtilisateur = () => {
    router.push('/utilisateur-ajout')
}


</script>

<style lang='scss' scoped>
@media(max-width: 812px) {
    nav {
        position: sticky;
        top: 0;
        z-index: 50;
        padding-left: 4rem;
    }


    .admin-utilisateurs {
        width: 200vw;
        height: 100vh;

        table {
            margin: 2rem;
            margin-left: 5rem;

        }

        #ajout {
            margin-left: 5rem;
        }
    }
}

@media(min-width: 813px) {
    nav {
        position: sticky;
        top: 0;
        z-index: 50;
        padding-left: 4rem;
    }

    #ajout {
        margin-left: 3rem;
    }

    .admin-utilisateurs {
        width: 100vw;
        height: 100vh;

        .donnees-utilisateurs {
            margin: 2rem;
            width: 50vw;
            display: flex;
            flex-direction: column;
            align-items: center;

        }

        table {
            width: 25vw;
            margin-left: 2vw;
        }
    }
}
</style>