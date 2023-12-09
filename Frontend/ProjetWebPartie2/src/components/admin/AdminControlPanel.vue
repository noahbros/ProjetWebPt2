<template>
    <body class="admin-control-panel">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Admin Control Panel</a>
            </div>
        </nav>

        <div class="admin-tables-interface">
            <div class="auteur-section">
                <h2>Auteurs</h2>
            </div>
            <div class="categories-section">
                <h2>Categories</h2>
            </div>
            <div class="emprunts-section">
                <h2>Emprunts</h2>
            </div>
            <div class="livres-section">
                <h2>Livres</h2>
            </div>
            <div class="utilisateurs-section">
                <h2>Utilisateurs</h2>
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
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    

    h2 {
        font-weight: bold;
    }
}
</style>