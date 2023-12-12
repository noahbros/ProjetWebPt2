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
        <td class="role">
            {{ utilisateurAdmin.roleId }}
        </td>
        <td class="buttons">
            <button class="btn btn-danger" @click="manageDelete">Supprimer</button>
            <button class="btn btn-success" @click="goToUpdate">Update</button>
        </td>
    </tr>
</template>

<script setup>
import {ref, reactive, onBeforeMount} from 'vue';

import { useRouter } from 'vue-router';
import useRoles from '../../services/serviceRoles'

const router = useRouter()

const { searchRoles } = useRoles();


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

onBeforeMount(() =>{
    if(adminUtilisateursProps.utilisateurAdmin.roleId){
        searchRoles(adminUtilisateursProps.utilisateurAdmin.roleId).then((data =>{
            adminUtilisateursProps.utilisateurAdmin.roleId = data.nom
            console.log("nom de role : ", data.nom)
        })).catch(err => console.log("Probleme pendant la recherche de role", err))
    }
})


</script>

<style lang="scss" scoped>

.buttons{
display: flex;
align-items: center;
flex-direction: row;
    button{
    height: 5vh;
}
}


.admin-utilisateurs-donnees{
    height: .5vh;
}

@media(max-width: 812px){
    .buttons{
        button{
            height: 9vh;
        }
    }
}

@media(max-width: 768px){
    .buttons{
        button{
            height: 4vh;
        }
    }
}

</style>