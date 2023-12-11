//Noah Brosseau
import jwt from 'jsonwebtoken'
import {Utilisateur, Roles} from '../models/index.js'

export const verifierToken = async (req, res, next)=>{
    //Recuperation de token
    const bearerToken = req.headers.authorization
    
    //Verification de presence de token.
    if(!bearerToken) return res.status(401).json({message : "Non autorisé."})

    //Splits the token in two (0 and 1, we want 1 hence : [1])
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, process.env.SECRET, (error, payload)=>{
        if(error) return res.status(401).json({message : error.message})

        req.utilisateurId = payload.id //Creates a new field to verify the users id in future.
        next()
    })
}

export const isAdmin = async (req, res, next)=>{
    const utilisateurId = req.utilisateurId //Field added by "verifierToken", checks the users data.

    if(!utilisateurId){
        return res.status(404).json({message : "Utilisateur non retrouvé."})
    }
    try{
        const result = await Utilisateur.findByPk(utilisateurId)
        if(!result){
            return res.status(403).json({message : "Non autorisé."})
        }
        try{
            const resultRoles = await Roles.findOne({where : {id : result.roleId}})
            if(!resultRoles){
                return res.status(403).json({message : "Non autorisé."})
            }
            if(resultRoles.nom.toLowerCase() === "admin"){
                next()
                return
            }
            res.status(401).json({message : "Permission non autorisé, admin requis."})
            return
        } catch (error){
            return res.status(404).json({message : error.message})
        }
    } catch (error){
        return res.status(404).json({message : error.message})
    }
}

export const isAdminOrBibliothecaire = async (req, res, next)=>{
    const utilisateurId = req.utilisateurId //Field added by "verifierToken", checks the users data.

    if(!utilisateurId){
        return res.status(404).json({message : "Utilisateur non retrouvé."})
    }
    try{
        const result = await Utilisateur.findByPk(utilisateurId)
        if(!result){
            return res.status(403).json({message : "Non autorisé."})
        }
        try{
            const resultRoles = await Roles.findOne({where : {id : result.roleId}})
            if(!resultRoles){
                return res.status(403).json({message : "Non autorisé."})
            }
            if(resultRoles.nom.toLowerCase() === "admin" || resultRoles.nom.toLowerCase() === "bibliothecaire"){
                next()
                return
            }
            res.status(401).json({message : "Permission non autorisé, admin requis."})
            return
        } catch (error){
            return res.status(404).json({message : error.message})
        }
    } catch (error){
        return res.status(404).json({message : error.message})
    }
}
