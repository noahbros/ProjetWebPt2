//Noah Brosseau
//Connection au route login du back-end au front-end.

import axios from 'axios'

const useLogin = () =>{
    const login = async (email, password) =>{
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {params : {email, password}})
        return result.data.data
    }
    return {login}
}

export default useLogin