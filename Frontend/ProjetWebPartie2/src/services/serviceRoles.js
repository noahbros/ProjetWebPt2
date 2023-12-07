//Noah Brosseau
//Connection des routes de la table roles du back-end au front-end.
import frontAPI from "./axiosAPI"

const useRoles = () =>{
    const getAllRoles = async () =>{
        const result = await frontAPI.get(`/roles`)
        return result.data.data
    }
    const searchRoles = async (id) =>{
        const result = await frontAPI.get(`/roles/get`, {params : {id}})
        return result.data.data
    }
    const AddRole = async (roles) =>{
        const result = await frontAPI.post(`/roles`, roles)
        return result.data.data
    }
    const DeleteRole = async (id) =>{
        const result = await frontAPI.delete(`/roles`, {params : {id}})
        return result.data.data
    }
    const UpdateRole = async (id, roles) =>{
        const result = await frontAPI.put(`/roles`, {params : {id}}, roles)
        return result.data.data
    }
    return {getAllRoles, searchRoles, AddRole, DeleteRole, UpdateRole}
}

export default useRoles