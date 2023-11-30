//Noah Brosseau
//Connection des routes de la table livres du back-end au front-end.
import axios from 'axios'

const useLivres = () =>{
    const getAllLivres = async () =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/livres`)
        return result.data.data
    }
    const searchLivres = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/livres`, {params : {id}})
        return result.data.data
    }
    const addLivres = async (livres) =>{
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/livres`, livres)
        return result.data.data
    }
    const deleteLivres = async (id) =>{
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/livres`, {params : {id}})
        return result.data.data
    }
    const updateLivres = async (id, livres) =>{
        const result = await axios.put(`${impot.meta.env.VITE_BASE_URL}/livres`, livres)
        return result.data.data
    }
    return {getAllLivres, searchLivres, addLivres, deleteLivres, updateLivres}
}

export default useLivres