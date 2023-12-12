//Noah Brosseau
//Connection des routes de la table livres du back-end au front-end.

import frontAPI from "./axiosAPI"


const useLivres = () =>{
    const getAllLivres = async () =>{
        const result = await frontAPI.get(`/livres`)
        return result.data.data
    }
    const searchLivres = async (id) =>{
        const result = await frontAPI.get(`/livres/get`, {params : {id}})
        return result.data.data
    }
    const addLivres = async (livres) =>{
        const result = await frontAPI.post(`/livres`, livres)
        return result.data.data
    }
    const deleteLivres = async (id) =>{
        const result = await frontAPI.delete(`/livres`, {params : {id}})
        return result.data.data
    }
    const updateLivres = async (id, livres) =>{
        const result = await frontAPI.put(`/livres?id=${id}`, livres)
        return result.data.data
    }
    return {getAllLivres, searchLivres, addLivres, deleteLivres, updateLivres}
}

export default useLivres