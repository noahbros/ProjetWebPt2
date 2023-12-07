//Noah Brosseau
//Connection des routes de la table Auteur du back-end au front-end.

import frontAPI from "./axiosAPI"

const useAuteur = () =>{
    const AddAuteur = async (auteur) =>{
        const result = await frontAPI.post(`/auteur`, auteur)
        return result.data.data
    }
    const getAllAuteur = async () =>{
        const result = await frontAPI.get(`/auteur`)
        return result.data.data
    }
    const searchAuteur = async (id) =>{
        const result = await frontAPI.get(`/auteur/search`, {params : {id}})
        return result.data.data
    }
    const auteurParId = async (id) =>{
        const result = await frontAPI.get(`/auteur/${id}`)
        return result.data.data
    }
    const modifierAuteur = async (id, auteur) =>{
        const result = await frontAPI.put(`/auteur/${id}`, auteur)
        return result.data.data
    }
    const supprimerAuteur = async (id) =>{
        const result = await frontAPI.delete(`/auteur/${id}`)
        return result.data.data
    }
    return {AddAuteur, getAllAuteur, searchAuteur, auteurParId, modifierAuteur, supprimerAuteur}
}

export default useAuteur