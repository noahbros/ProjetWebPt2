//Noah Brosseau
import {Categories} from '../models/index.js'
import {validationResult} from 'express-validator'

//READ
export const getAllCategories = async (req, res)=>{
    let pages = req.query.pages
    let limit = req.query.limit

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
    const {count} = await Categories.findAndCountAll()
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
        const result = await Categories.findAll()
        const pagination = result.slice(start, end)
         res.status(200).json({current_page, data : pagination, total_pages})
         return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//READ
export const SearchCategories = async (req, res)=>{
    let idSearch
    let nomSearch
    let livreIdSearch

    
    const search = req.query
    const {count} = await Categories.findAndCountAll()
    
    
    if(!search.id && !search.nom && !search.livreId){
        return res.status(404).json({message : "Veuillez remplire au moins un champs."})
    }
    //Checks if the table has any data to begin with.
    if(count == 0){
        res.status(400).json({message: "La table est vide."})
        return
    }

    if(search.id != ""){
        if(isNaN(parseInt(search.id))){ //Checks if id is a valid integer.
            res.status(400).json({message : "S.V.P entré un nombre réel pour le champ id."})
            return
        }
        idSearch = {id : search.id}
    } else { idSearch = null}
    if(search.nom != null){
        nomSearch= {nom : search.nom}
    } else {nomSearch = null}
    if(search.livreId != null){
        if(isNaN(parseInt(search.livreId))){ //Checks if livreId is a valid integer.
            res.status(400).json({message : "S.V.P entré un nombre réel pour le champ livreId."})
            return
        }
        livreIdSearch = {livreId : search.livreId}

    } else {livreIdSearch = null}

    try
    {

        const result = await Categories.findAll({where : idSearch || nomSearch || livreIdSearch})
        //Checks if the value is in the table.
        if(result.length == 0){
            res.status(400).json({errors: "Aucune données retrouvé."})
            return
        }
        res.status(200).json({data:result})
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//CREATE
export const AddCategory = async (req, res)=>{

    //Checks if body is not empty.
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    const category = req.body
    const createdCategory = category
    try{
        const result = await Categories.create(createdCategory)
        res.status(201).json({data:result, message : "Category created."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//DELETE
export const DeleteCategory = async (req, res)=>{
    
    //Checks if id is not empty.
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //Checks if id is valid.
    if(isNaN(parseInt(req.query.id))){
        return res.status(400).json({errors: "S.V.P entré un nombre réel pour le champ id."})
    }
    
    const id = req.query.id

    try{
        const isPresent = await Categories.findAll({where : {id : id}})
        //Checks if id matches.
        if(isPresent.length == 0){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }

        const result = await Categories.destroy({where : {id : id}})
        res.status(202).json({data:result, message : "Category deleted."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//UPDATE
export const UpdateCategory = async (req,res)=>{
    const id = req.query.id
    const updatedCategory = req.body

    //Checks if body or id is empty.
    if(isNaN(parseInt(id))){
        return res.status(400).json({errors: "S.V.P entré un nombre réel pour le champ id."})
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try{
        //Check if id matches.
        const isPresent = await Categories.findAll({where : {id : id}})
        if(isPresent.length == 0){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }
        const result = await Categories.update(updatedCategory, {where :{id : id}})
        res.status(200).json({data:result, message: "Category updated."})
        return
    } catch (error) {
        res.status(404).json({message : error.message})
        return
    }
    
}