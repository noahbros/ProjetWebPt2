//Noah Brosseau
//Connection des routes de la table roles du back-end au front-end.
import axios from 'axios'

const useRoles = () =>{
    const getAllRoles = async () =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/roles`)
        return result.data.data
    }
    const searchRoles = async (id) =>{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/roles/get`, {params : {id}})
        return result.data.data
    }
    const AddRole = async (roles) =>{
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/roles`, roles)
        return result.data.data
    }
    const DeleteRole = async (id) =>{
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/roles`, {params : {id}})
        return result.data.data
    }
    const UpdateRole = async (id, roles) =>{
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/roles`, {params : {id}}, roles)
        return result.data.data
    }
    return {getAllRoles, searchRoles, AddRole, DeleteRole, UpdateRole}
}

export default useRoles