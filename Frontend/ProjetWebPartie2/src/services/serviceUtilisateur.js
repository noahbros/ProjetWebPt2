//Noah Brosseau
//Connection des routes de la table utilisateur du back-end au front-end.
import frontAPI from "./axiosAPI"


const useUtilisateur = () =>{
    const getAllUtilisateur = async () => {
        const result = await frontAPI.get(`/utilisateur`)
        return result.data.data
    }
    const searchUtilisateurs = async (id) =>{
        const result = await frontAPI.get(`/utilisateur/search`, {params : {id}})
        return result.data.data
    }
    const AddUtilisateur = async (utilisateur) =>{
        const result = await frontAPI.post(`/utilisateur/`, utilisateur)
        return result.data.data
    }
    const utilisateurParId = async (id) =>{
        const result = await frontAPI.get(`/utilisateur/${id}`)
        return result.data.data
    }
    const modifierUtilisateur = async (id, utilisateur) =>{
        const result = await frontAPI.put(`/utilisateur/${id}`, utilisateur)
        return result.data.data
    }
    const supprimerUtilisateur = async (id) =>{
        const result =await frontAPI.delete(`/utilisateur/${id}`)
        return result.data.data
    }
    return {getAllUtilisateur, searchUtilisateurs, AddUtilisateur, utilisateurParId, modifierUtilisateur, supprimerUtilisateur}
}

export default useUtilisateur