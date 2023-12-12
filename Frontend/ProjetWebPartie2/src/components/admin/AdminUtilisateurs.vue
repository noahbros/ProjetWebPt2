<template>
    <tr class="admin-utilisateurs-donnees">
        <td>
            {{ utilisateurAdmin.id }}
        </td>
        <td>
            {{ utilisateurAdmin.nom }}
        </td>
        <td>
            {{ utilisateurAdmin.prenom }}
        </td>
        <td>
            {{ utilisateurAdmin.naissance }}
        </td>
        <td>
            {{ utilisateurAdmin.photo }}
        </td>
        <td>
            {{ utilisateurAdmin.email }}
        </td>
        <td>
            {{ utilisateurAdmin.roleId }}
        </td>
        <td class="buttons">
            <button class="btn btn-danger" @click="manageDelete">Supprimer</button>
            <button class="btn btn-success" @click="goToUpdate">Update</button>
        </td>
    </tr>
</template>

<script setup>
import {ref, reactive} from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter()

const adminUtilisateursProps = defineProps({
    utilisateurAdmin: {
        type: Object,
        default: () => ({
            id: '',
            nom: 'test',
            prenom: 'test',
            naissance: '',
            photo: '',
            email: 'test@example.com',
            mot_de_passe: '',
            roleId: ''
        })
    }
})

const emit = defineEmits(['deleteUtilisateur', 'updateUtilisateur'])

const manageDelete = () =>{
    console.log("Button : ")
    console.log("ID : ", adminUtilisateursProps.utilisateurAdmin.id)
    emit("deleteUtilisateur", adminUtilisateursProps.utilisateurAdmin.id)
}

const goToUpdate=()=>{
    router.push(`/utilisateur-update/${adminUtilisateursProps.utilisateurAdmin.id}`)
}


</script>

<style lang="scss" scoped>

.buttons{
width: 2vw;
    button{
    height: 5vh;
}
}


.admin-utilisateurs-donnees{
    height: .5vh;
}

@media(max-width: 1280px){
    .buttons{
        button{
            height: 9vh;
        }
    }
}

</style>