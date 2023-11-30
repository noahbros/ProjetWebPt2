//Noah Brosseau
//Connection des routes de la table Auteur du back-end au front-end.

import axios from 'axios'

const useAuteur = () =>{
    const AddAuteur = async (auteur) =>{
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/auteur`, auteur)
        return result.data.data
    }
    const getAllAuteur = async () =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/auteur`)
        return result.data.data
    }
    const searchAuteur = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/auteur/search`, {params : {id}})
        return result.data.data
    }
    const auteurParId = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/auteur/${id}`)
        return result.data.data
    }
    const modifierAuteur = async (id, auteur) =>{
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/auteur/${id}`, auteur)
        return result.data.data
    }
    const supprimerAuteur = async (id) =>{
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/auteur/${id}`)
        return result.data.data
    }
    return {AddAuteur, getAllAuteur, searchAuteur, auteurParId, modifierAuteur, supprimerAuteur}
}

export default useAuteur