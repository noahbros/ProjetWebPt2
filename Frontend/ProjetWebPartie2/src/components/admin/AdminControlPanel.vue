<template>
    <body class="admin-control-panel">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Admin Control Panel</a>
            </div>
        </nav>

        <div class="tables-interface">

        </div>

    </body>
</template>


<script setup>
import {ref, reactive} from 'vue'
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '../../stores/authStore.js'

import useUtilisateur from '../../services/serviceUtilisateur.js'

const { searchUtilisateurs } = useUtilisateur();
const router = useRouter();
const {loggedInUser} = useAuthStore();
const utilisateurs = ref({})

onBeforeMount(() => {
    searchUtilisateurs(loggedInUser.id).then((data =>{
        utilisateurs.value = data[0]
        if(utilisateurs.value.roleId === 2){
           router.push('/bibliothecaire-console')
        } 
    }))
    
})


</script>

<style lang="scss" scoped>

.admin-control-panel{
    width: 100vw;
    height: 100vh;
}

</style>