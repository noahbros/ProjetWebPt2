//Noah Brosseau
//Connection des routes de la table utilisateur du back-end au front-end.
import axios from 'axios'

const useUtilisateur = () =>{
    const getAllUtilisateur = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/utilisateur`)
        return result.data.data
    }
    const searchUtilisateurs = async () =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/utilisateur/search`)
        return result.data.data
    }
    const AddUtilisateur = async (utilisateur) =>{
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/utilisateur`, utilisateur)
        return result.data.data
    }
    const utilisateurParId = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/utilisateur/${id}`)
        return result.data.data
    }
    const modifierUtilisateur = async (id, utilisateur) =>{
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/utilisateur/${id}`, utilisateur)
        return result.data.data
    }
    const supprimerUtilisateur = async (id) =>{
        const result =await axios.delete(`${import.meta.env.VITE_BASE_URL}/utilisateur/${id}`)
        return result.data.data
    }
    return {getAllUtilisateur, searchUtilisateurs, AddUtilisateur, utilisateurParId, modifierUtilisateur, supprimerUtilisateur}
}

export default useUtilisateur