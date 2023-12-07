//Noah Brosseau
//Connection au route login du back-end au front-end.

import frontAPI from "./axiosAPI"

const useAuth = () =>{
    const login = async (email, mot_de_passe) =>{
        const result = await frontAPI.post(`/login`, {email, mot_de_passe})
        return result.data
    }
    return {login}
}

export default useAuth