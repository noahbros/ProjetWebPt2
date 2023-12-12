<template>
    <tr class="admin-livres-donnees">
        <td>
            {{ livreAdmin.id }}
        </td>
        <td>
            {{ livreAdmin.nom }}
        </td>
        <td>
            {{ livreAdmin.date_de_pub }}
        </td>
        <td>
            {{ livreAdmin.rating }}
        </td>
        <td>
            {{ livreAdmin.photo }}
        </td>
        <td>
            {{ livreAdmin.maison_edition }}
        </td>
        <td>
            {{ livreAdmin.location }}
        </td>
        <td>
            {{ livreAdmin.montant }}
        </td>
        <td>
            {{ livreAdmin.biographie }}
        </td>
        <td>
            {{ livreAdmin.categoryId }} <!-- Not actually it, have to change it.-->
        </td>
        <td>
            {{ livreAdmin.auteurId }} <!-- Not actually it, have to change it.-->
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

const adminLivreProps = defineProps({
    livreAdmin: {
        type: Object,
        default: () => ({
            id: '',
            nom: 'test',
            date_de_pub: '',
            rating: 0,
            photo: '',
            maison_edition: 'test',
            location: 'test',
            montant: 0,
            biographie: 'test',
            cateogryId: '',
            auteurId: ''
        })
    }
})

const emit = defineEmits(['supprimerLivre', 'updateLivre'])

const manageDelete = () =>{
    console.log("Button : ")
    console.log("ID : ", adminLivreProps.livreAdmin.id)
    emit("supprimerLivre", adminLivreProps.livreAdmin.id)
}

const goToUpdate=()=>{
    router.push(`/livres-update/${adminLivreProps.livreAdmin.id}`)
}


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

.admin-livres-donnees{
    height: 1vh;
}

@media(max-width: 812px){
    .buttons{
        button{
            height: 10vh;
        }
    }
}

</style>