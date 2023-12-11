<template>
    <body class="admin-control-panel">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Admin Control Panel</a>
            </div>
        </nav>

        <div class="admin-tables-interface">
            <div class="admin-briefing">
                <span>Voici les tables disponible à manipuler.</span>
                <p>Étant Admin, vous avez accès à tout les fonctionnalités CRUD (create, read, update, delete) de chacune des tables si-dessous. Veuillez simplement cliqué un des bouttons verts pour accéder aux données associés.</p>
            </div>
            <div class="auteur-section">
                <h2>Auteurs</h2>
                <router-link to="/aAuteur" class="auteur-access">Accéder aux données d'auteurs</router-link>
            </div>
            <div class="categories-section">
                <h2>Categories</h2>
                <router-link to="/aCategories" class="categories-access">Accéder aux données des catégories</router-link>
            </div>
            <div class="emprunts-section">
                <h2>Emprunts</h2>
                <router-link to="/aEmprunts" class="emprunts-access">Accéder aux données des emprunts</router-link>
            </div>
            <div class="livres-section">
                <h2>Livres</h2>
                <router-link to="/aLivres" class="livres-access">Accéder aux données des livres</router-link>
            </div>
            <div class="utilisateurs-section">
                <h2>Utilisateurs</h2>
                <router-link to="/aUtilisateurs" class="utilisateurs-access">Accéder aux données des utilisateurs</router-link>
            </div>
        </div>

    </body>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../../stores/authStore.js'

import useUtilisateur from '../../services/serviceUtilisateur.js'

const { searchUtilisateurs } = useUtilisateur();
const router = useRouter();
const { loggedInUser } = useAuthStore();
const utilisateurs = ref({})

onBeforeMount(() => {
    searchUtilisateurs(loggedInUser.id).then((data => {
        utilisateurs.value = data[0]
        if (utilisateurs.value.roleId === 2) {
            router.push('/bibliothecaire-console')
        }
    }))

})


</script>

<style lang="scss" scoped>
.admin-control-panel {
    width: 100vw;
    height: 100vh;
}


.admin-tables-interface {
    margin: 3rem;
    margin-left: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    .auteur-section{
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px  5px grey;

        .auteur-access{
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .auteur-access:hover{
            box-shadow: inset 2px 2px 20px grey;
        }
    }

    .categories-section{
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px  5px grey;

        .categories-access{
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .categories-access:hover{
            box-shadow: inset 2px 2px 20px grey;
        }

    }

    .emprunts-section{
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px  5px grey;

        .emprunts-access{
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .emprunts-access:hover{
            box-shadow: inset 2px 2px 20px grey;
        }

    }

    .livres-section{
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px  5px grey;

        .livres-access{
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .livres-access:hover{
            box-shadow: inset 2px 2px 20px grey;
        }

    }
    .utilisateurs-section{
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px  5px grey;

        .utilisateurs-access{
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .utilisateurs-access:hover{
            box-shadow: inset 2px 2px 20px grey;
        }

    }

    h2 {
        font-weight: bold;
    }
}
</style>