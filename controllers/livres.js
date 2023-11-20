//Noah Brosseau
import Categorie from '../models/Categories.js'
import {Auteur, Livres} from '../models/index.js'
import {validationResult} from 'express-validator'

//READ
export const getAllLivres = async (req, res)=>{
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
    const {count} = await Livres.findAndCountAll()
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
        const result = await Livres.findAll()
        const pagination = result.slice(start, end)
        res.status(200).json({current_page, data : pagination, total_pages})
    } catch (error){
        res.status(404).json({message : error.message})
    }
}

//READ
export const searchLivres = async (req, res)=>{
    let idSearched 
    let nomSearched
    let publicationSearched
    let ratingSearched
    let maisonSearched
    let locationSearched
    let montantSearched
    let biographieSearched
    let categoryIdSearched
    let auteurIdSearched
    
    //Checks if the table has any data to begin with.
    const {count} = await Livres.findAndCountAll()
    if(count == 0){
        return res.status(400).json({message : "La table est vide."})
    }

    const search = req.query
    if(search.id != null){ //Checks if id is valid.
        if(isNaN(parseInt(search.id))){
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ id."})
        }
         idSearched = {id : search.id}
    } else{
        idSearched = null
    }

    if(search.nom != null){
        nomSearched = {nom : search.nom}
    } else{
        nomSearched = null
    }

    if(search.date_de_pub != null){
        publicationSearched = {date_de_pub  : search.date_de_pub}
    } else{
        publicationSearched = null
    }

    if(search.rating != null){
        if(isNaN(parseInt(search.rating))){ //Checks if rating is valid.
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ rating."})
        }
        ratingSearched = {rating : search.rating}
    } else{
        ratingSearched = null
    }

    if(search.maison_edition != null){
        maisonSearched = {maison_edition : search.maison_edition}
    } else {
        maisonSearched = null
    }

    if(search.location != null){
        locationSearched = {location : search.location}
    } else {
        locationSearched = null
    }

    if(search.montant != null){
        if(isNaN(parseInt(search.montant))){ //Checks if montant is valid.
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ montant."})
        }
        montantSearched = {montant : search.montant}
    } else {
        montantSearched = null
    }

    if(search.biographie != null){
        biographieSearched = {biographie : search.biographie}
    } else {
        biographieSearched = null
    }

    if(search.categoryId != null){ //Checks if categoryId is valid.
        if(isNaN(parseInt(search.categoryId))){
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ categoryId."})
        }
        categoryIdSearched = {categoryId : search.categoryId}
    } else {
        categoryIdSearched = null
    }

    if(search.auteurId != null){ //Checks if categoryId is valid.
        if(isNaN(parseInt(search.auteurId))){
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ auteurId."})
        }
        auteurIdSearched = {auteurId : search.auteurId}
    } else {
        auteurIdSearched = null
    }

    try{
        //Checks if all fields are empty.
        if(idSearched == null && nomSearched == null && publicationSearched == null && ratingSearched == null && maisonSearched == null && locationSearched == null && montantSearched == null && biographieSearched == null && categoryIdSearched == null && auteurIdSearched == null){
            return res.status(400).json({errors: "S.V.P remplire au moins une valeur."})
        }

        const result = await Livres.findAll(
            {where : 
                idSearched ||
                nomSearched ||
                publicationSearched ||
                ratingSearched ||
                maisonSearched ||
                locationSearched ||
                montantSearched ||
                biographieSearched ||
                categoryIdSearched ||
                auteurIdSearched
             }
        )
        //Checks if the value is in the table.
        if(result.length == 0){
            return res.status(400).json({message : "Aucune données retrouvé."})
        }

        res.status(200).json({data : result})
        return

    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//CREATE
export const addLivres = async (req,res)=>{

    //Checks if all non-null fields are filled.
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const livres = req.body
    const createdLivre = livres

    let categoryId = req.body.categoryId
    let auteurId = req.body.auteurId
    
    //Checks if the foreign key is null.
    if(req.body.categoryId == ""){
        categoryId = null
    }
    if(req.body.categoryId != ""){

        //Checks if the foreign key is an integer.
        if(isNaN(parseInt(categoryId))){
            return res.status(404).json({message : "Le champ categoryId, peut seulement contenir des nombres."})
        }
        //Checks if the foreign key actually exists.
        const resultCategorie = await Categorie.findOne({where : {id : categoryId}})
        if(!resultCategorie){
            return res.status(404).json({message : "Ce id n'appartient pas à une catégorie, veuillez réessayer ou laisser la valeur null."})
        }
    }

    if(req.body.auteurId != ""){
        //Checks if the foreign key actually exists.
        const resultAuteur = await Auteur.findOne({where : {id : auteurId}})
        if(!resultAuteur){
            return res.status(404).json({message : "Ce id n'appartient pas à un auteur, veuillez réessayer ou laisser la valeur null."})
        }
    }

    createdLivre.categoryId = categoryId
    createdLivre.auteurId = auteurId

    try{
        const result = await Livres.create(createdLivre)
        res.status(201).json({data:result, message:"Livre created"})
        return
    } catch (error) {
        res.status(404).json({message : error.message})
        return
    }
}

//DELETE
export const deleteLivres = async (req,res)=>{
    //Checks if id is not empty.
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //Checks if id is valid.
    if(isNaN(parseInt(req.query.id))){
        return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ id"})
    }

    const id = req.query.id

    try{
        const isPresent = await Livres.findAll({where : {id : id}})
        //Checks if id matches.
        if(isPresent.length == 0){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }
        const result = await Livres.destroy({where : {id : id}})
        res.status(202).json({data:result, message:"Livre deleted"})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

//UPDATE
export const updateLivres = async(req,res)=>{
    const errors = validationResult(req)
    //Checks if id is empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    //Checks if id is valid.
    if(isNaN(parseInt(req.query.id))){
        return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ id"})
    }

    const id = req.query.id
    const updatedLivres = req.body

    if(!updatedLivres){
        return res.status(400).json({errors : "Veuillez appliquer au moins une modification."})
    }

    const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    if(updatedLivres.date_de_pub != ""){
        if(!dateRegex.test(updatedLivres.date_de_pub)){
            return res.status(400).json({errors : "Format de date invalide : YYYY-MM-DD requis."})
        }
    }

    try{
        //Checks if the id matches.
        const isPresent = await Livres.findAll({where : {id : id}})
        if(isPresent.length == 0){
            return res.status(400).json({errors : "Aucune données retrouvé."})
        }

        const result = await Livres.update(updatedLivres, {where :{id : id}})
        res.status(200).json({data:result, message: "Livres updated."})
        return
    } catch (error) {
        res.status(404).json({message : error.message})
        return
    }
    
}