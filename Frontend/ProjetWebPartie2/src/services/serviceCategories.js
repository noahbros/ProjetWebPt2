//Noah Brosseau
//Connection des routes de la table categories du back-end au front-end.

import axios from 'axios'

const useCategories = () => {
    const getAllCategories = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`)
        return result.data.data
    }
    const SearchCategories = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/get`, {params: {id}})
        return result.data.data
    }
    const AddCategory = async (categories) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/categories`, categories)
        return result.data.data
    }
    const DeleteCategory = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/categories`, {params : {id}})
        return result.data.data
    }
    const UpdateCategory = async (id, categories) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/categories`, {params : {id}}, categories)
        return result.data.data
    }
    return { getAllCategories, SearchCategories, AddCategory, DeleteCategory, UpdateCategory }
}

export default useCategories