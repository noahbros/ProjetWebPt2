//Noah Brosseau
import { Utilisateur } from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async (req, res) =>{
    const {email, mot_de_passe} = req.body
    if(email == ""){
        return res.status(404).json({message : "Un email est requis."})
    }
    if(mot_de_passe == ""){
        return res.status(404).json({message : "Un mot de passe est requis."})
    }

    try{
        const result = await Utilisateur.findOne({where : {email}})
        if(!result) return res.status(404).json({message : "Cette email n'existe pas."})


        const passwordChecker = bcrypt.compareSync(mot_de_passe, result.mot_de_passe)
        if(!passwordChecker) return res.status(404).json({message : "Information incorrecte."})

        let payload = {id : result.id}
        let token = jwt.sign(payload, process.env.SECRET)
        return res.status(200).json({data : result, token})

    } catch (error){
        return res.status(401).json({message : error.message})
    }

}