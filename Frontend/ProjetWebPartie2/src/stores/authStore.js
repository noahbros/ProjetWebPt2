//Noah Brosseau - Authentification
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
    const utilisateur = ref({})
    const token = ref()
    const router = useRouter();

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

    const logout = () =>{
        utilisateur.value = null
        token.value = null
        router.push('/login')
        
    }

    return {utilisateur, token, setUtilisateur, setToken, loggedInUser, currentToken, logout}

},
{
    persist: true
})

export default useAuthStore