//NOAH BROSSEAU - AUTHENTIFICATION
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
    const utilisateur = ref({})
    const token = ref()

    //Fonctions qui permet de mettre a jour les valeurs des variables precendentes.
    //SETTERS
    const setUtilisateur = (loggedInUtilisateur) => { //Remplace la valeur de l'utilisateur vide avec la variable passer.
        utilisateur.value = loggedInUtilisateur
    }

    const setToken = (currentToken) => { //Remplace la valeur de token video avec la variable passer.
        token.value = currentToken
    }

    //Fonctions qui retourne la valeur courrante
    //GETTERS
    //Computed permet de relire seulement s'il y a une modification.
    const loggedInUser = computed(() => utilisateur.value)

    const currentToken = computed(() => token.value)

    return {utilisateur, token, setUtilisateur, setToken, loggedInUser, currentToken }


},
{
    persist: true
})

export default useAuthStore