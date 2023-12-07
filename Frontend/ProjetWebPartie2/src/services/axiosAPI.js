import axios from 'axios'
//Pour avoir accès au token on doit importer notre store.
import useAuthStore from '../stores/authStore.js'

//Mets l'URL par défaut dans axios.
const frontAPI = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL
})

//Liées le token au requête
frontAPI.interceptors.request.use(config => {
    //Recuperation du token du store.
    const { currentToken : token} = useAuthStore()
    config.headers = {
        'Authorization' : token ? `Bearer ${token}` : '',
    }

    return config
})

export default frontAPI
