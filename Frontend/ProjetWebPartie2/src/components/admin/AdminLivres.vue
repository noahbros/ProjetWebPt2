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
        <td @load="setInfo" class="categories">
            {{ livreAdmin.categoryId }}
        </td>
        <td @load="setInfo" class="auteur">
            {{ livreAdmin.auteurId }}
        </td>
        <td class="buttons">
            <button class="btn btn-danger" @click="manageDelete">Supprimer</button>
            <button class="btn btn-success" @click="goToUpdate">Update</button>
        </td>
    </tr>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import useCategories from '../../services/serviceCategories';
import useAuteur from '../../services/serviceAuteur'
import { useRouter } from 'vue-router';
const router = useRouter()

const { SearchCategories } = useCategories();
const { auteurParId } = useAuteur();

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
            categoryId: '',
            auteurId: ''
        })
    }
})

const emit = defineEmits(['supprimerLivre', 'updateLivre'])

const manageDelete = () => {
    console.log("Button : ")
    console.log("ID : ", adminLivreProps.livreAdmin.id)
    emit("supprimerLivre", adminLivreProps.livreAdmin.id)
}

const goToUpdate = () => {
    router.push(`/livres-update/${adminLivreProps.livreAdmin.id}`)
}

onBeforeMount(() => {
    if (adminLivreProps.livreAdmin.auteurId) {
        auteurParId(adminLivreProps.livreAdmin.auteurId).then((data => {
            adminLivreProps.livreAdmin.auteurId = data.nom
            console.log("Nom d'auteur : ", data.nom)
        })).catch(err => console.log("Probleme pendant la recherche d'auteur", err))
    } else {
        document.getElementsByClassName('auteur').innerHTML = "Aucun auteur attribuer."
    }

    if (adminLivreProps.livreAdmin.categoryId) {
        SearchCategories(adminLivreProps.livreAdmin.categoryId).then((data => {
            adminLivreProps.livreAdmin.categoryId = data[0].nom
            console.log("Nom de categorie :", data[0].nom)
        })).catch(err => console.log("Probleme pendant la recherche de categories", err))
    } else {
        document.getElementsByClassName('categories').innerHTML = "Aucune categorie attribuer"
    }
})



</script>

<style lang="scss" scoped>
.buttons {
    display: flex;
    align-items: center;
    flex-direction: row;

    button {
        height: 5vh;
    }
}

.admin-livres-donnees {
    height: 1vh;
}

@media(max-width: 812px) {
    .buttons {
        button {
            height: 10vh;
        }
    }
}
</style>