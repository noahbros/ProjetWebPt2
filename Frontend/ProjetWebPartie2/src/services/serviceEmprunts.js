//Noah Brosseau
//Connection des routes de la table emprunts du back-end au front-end.

import axios from 'axios'

const useEmprunts = () =>{
    const AddEmprunt = async (emprunts) =>{
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/emprunts`, emprunts)
        return result.data.data
    }
    const searchEmprunt = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/emprunts/search`, {params : {id}})
        return result.data.data
    }
    const getAllEmprunts = async () =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/emprunts`)
        return result.data.data
    }
    const empruntParId = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/emprunts/${id}`)
        return result.data.data
    }
    const modifierEmprunt = async (id, emprunts) =>{
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/emprunts/${id}`, emprunts)
        return result.data.data
    }
    const supprimerEmprunt = async (id) =>{
        const result = await axios.delete(`${impot.meta.env.VITE_BASE_URL}/emprunts/${id}`)
    }
    return {AddEmprunt, searchEmprunt, getAllEmprunts, empruntParId, modifierEmprunt, supprimerEmprunt}
}

export default useEmprunts