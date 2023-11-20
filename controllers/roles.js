//Noah Brosseau
import {Roles} from "../models/index.js"
import {validationResult} from 'express-validator'

//READ
export const getAllRoles = async (req, res)=>{
    let pages = req.query.pages
    let limit = req.query.limit

    //Default values
    if(!limit){
        limit = 10
    }
    if(!pages){
        pages = 1
    }

    if(limit == 0 || pages == 0){
        return res.status(404).json({message : "Limit ou la page ne peut pas être de valeur 0. Réaffecter."})
    }

    const start = (pages - 1) * limit
    const end = pages * limit
    if(await Roles.findAndCountAll() == 0){
        return res.status(404).json({message : "La table est vide."})
    }

    const {count} = await Roles.findAndCountAll()
    const total_pages = Math.ceil(count / limit)
    const current_page = pages

    //Checks if table is empty.
    if(total_pages == 0 || count == 0){
        res.status(400).json({message : "La table est vide."})
        return
    }
    //Checks if values are valid.
    if(req.query.pages != null && req.query.limit != null){
        if(isNaN(parseInt(req.query.pages)) || isNaN(parseInt(req.query.limit))){
            return res.status(400).json({errors : "S.V.P entrées des valeurs réels pour les champs présent."})
        }
    }
    //Checks if current page supersedes total pages.
    if(total_pages < parseInt(pages)){
        res.status(404).json({message : "Page courrante est supperieure au nombre de pages totale."})
        return
    }
    
    try{
        const result = await Roles.findAll()
        const pagination = result.slice(start, end)
        res.status(200).json({current_page, data : pagination, total_pages})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//READ
export const searchRoles = async (req, res)=>{
    let idSearched
    let nomSearched

    const id = req.query.id
    const nom = req.query.nom
    const {count} = await Roles.findAndCountAll()

     //Checks if theres any data in the table to begin with.
    if(count == 0){
        return res.status(400).json({message : "La table est vide."})
    }

    if(!id && !nom){
        return res.status(404).json({message : "Veuillez insérer au moins une valeur."})
    }

    if(id != ""){
        if(isNaN(parseInt(id))){ //Checks if id is valid.
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ id."})
        }
        idSearched = {id : id}
    } else {idSearched = null}
    if(nom != ""){
        nomSearched = {nom : nom}
    } else {nomSearched = null}

    try{
        //Checks if all fields are empty.
        if(!idSearched && !nomSearched){
            return res.status(400).json({errors: "S.V.P remplire au moins une valeur."})
        }
        const result = await Roles.findOne({ where : idSearched || nomSearched})
        //Checks if the value is in the table.
        if(!result){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }
        res.status(200).json({data:result})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//CREATE
export const AddRole = async (req, res)=>{
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    const {nom} = req.body
    const createdRole = {nom}

    try{
        const result = await Roles.create(createdRole)
        res.status(201).json({data:result, message : "Role created."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//DELETE
export const DeleteRole = async (req, res)=>{
    const errors = validationResult(req)

    //Checks if id is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    //Checks if id is valid.
    if(isNaN(parseInt(req.query.id))){
        return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ id."})
    }

    const id = req.query.id

    try{
        //Checks if id matches.
        const isPresent = await Roles.findAll({where : {id : id}})
        if(isPresent.length == 0){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }

        const result = await Roles.destroy({where : {id : id}})
        res.status(202).json({data:result, message : "Role deleted."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//UPDATE
export const UpdateRole = async (req,res)=>{
    const errors = validationResult(req)

    //Checks if body or id is empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //Checks if id is valid.
    if(isNaN(parseInt(req.query.id))){
        return res.status(400).json({errors: "S.V.P entré un nombre réel pour le champ id."})
    }

    const id = req.query.id
    const updatedRole = req.body

    if(!id){
        return res.status(400).json({message : "Veuillez remplire le champ id pour faire une modification."})
    }

    try{
        const isPresent = await Roles.findAll({where : {id : id}})
        //Checks if id matches
        if(isPresent.length == 0){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }

        const result = await Roles.update(updatedRole, {where :{id : id}})
        res.status(200).json({data:result, message: "Role updated."})
        return
    } catch (error) {
        res.status(404).json({message : error.message})
        return
    }
    
}