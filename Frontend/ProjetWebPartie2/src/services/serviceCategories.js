//Noah Brosseau
//Connection des routes de la table categories du back-end au front-end.

import frontAPI from "./axiosAPI"

const useCategories = () => {
    const getAllCategories = async () => {
        const result = await frontAPI.get(`/categories`)
        return result.data.data
    }
    const SearchCategories = async (id) => {
        const result = await frontAPI.get(`/categories/get`, {params: {id}})
        return result.data.data
    }
    const AddCategory = async (categories) => {
        const result = await frontAPI.post(`/categories`, categories)
        return result.data.data
    }
    const DeleteCategory = async (id) => {
        const result = await frontAPI.delete(`/categories`, {params : {id}})
        return result.data.data
    }
    const UpdateCategory = async (id,categories) => {
        const result = await frontAPI.put(`/categories/?id=${id}`, categories)
        return result.data.data
    }
    return { getAllCategories, SearchCategories, AddCategory, DeleteCategory, UpdateCategory }
}

export default useCategories