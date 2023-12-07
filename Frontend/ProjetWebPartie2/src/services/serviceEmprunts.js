//Noah Brosseau
//Connection des routes de la table emprunts du back-end au front-end.
import frontAPI from "./axiosAPI"

const useEmprunts = () =>{
    const AddEmprunt = async (emprunts) =>{
        const result = await frontAPI.post(`/emprunts`, emprunts)
        return result.data.data
    }
    const searchEmprunt = async (id) =>{
        const result = await frontAPI.get(`/emprunts/search`, {params : {id}})
        return result.data.data
    }
    const getAllEmprunts = async () =>{
        const result = await frontAPI.get(`/emprunts`)
        return result.data.data
    }
    const empruntParId = async (id) =>{
        const result = await frontAPI.get(`/emprunts/${id}`)
        return result.data.data
    }
    const modifierEmprunt = async (id, emprunts) =>{
        const result = await frontAPI.put(`/emprunts/${id}`, emprunts)
        return result.data.data
    }
    const supprimerEmprunt = async (id) =>{
        const result = await frontAPI.delete(`/emprunts/${id}`)
    }
    return {AddEmprunt, searchEmprunt, getAllEmprunts, empruntParId, modifierEmprunt, supprimerEmprunt}
}

export default useEmprunts