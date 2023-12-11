<template>
    <tr class="admin-categories-donnees">
        <td>
            {{ categorieAdmin.id }}
        </td>
        <td>
            {{ categorieAdmin.nom }}
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

const adminCategorieProps = defineProps({
    categorieAdmin: {
        type: Object,
        default: () => ({
            id: '',
            nom: 'test',
        })
    }
})

const emit = defineEmits(['supprimerCategory', 'updateCategory'])

const manageDelete = () =>{
    console.log("Button : ")
    console.log("ID : ", adminCategorieProps.categorieAdmin.id)
    emit("supprimerCategory", adminCategorieProps.categorieAdmin.id)
}

const goToUpdate=()=>{
    router.push(`/categorie-update/${adminCategorieProps.categorieAdmin.id}`)
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


.admin-categories-donnees{
    height: 1vh;
}

</style>