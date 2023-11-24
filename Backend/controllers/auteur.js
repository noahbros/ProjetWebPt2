//Olivier Caron
import { Auteur } from "../models/index.js";
import {validationResult} from 'express-validator'

export const AddAuteur = async (req, res)=>{
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const auteur = req.body
    

    try{
        const result = await Auteur.create(auteur)
        res.status(201).json({data:result, message : "L'auteur as été créer avec succès."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }

}

export const getAllAuteur = async (req, res) =>{
    let pages = req.query.pages
    let limit = req.query.limit

    //valeurs par défaut
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
    const {count} = await Auteur.findAndCountAll()
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
        const result = await Auteur.findAll()
        const pagination = result.slice(start, end)
        res.status(200).json({current_page, data : pagination, total_pages})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

export const auteurParId = async (req, res) => {
    const id = req.params.id

    try {
        const auteur = await Auteur.findByPk(id)
        res.status(200).json({ data: auteur })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const modifierAuteur = async (req, res) => {
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //on obtient le id pour la recherche d'auteur
    const { id } = req.params

    const nouvelAuteur = req.body


    try {
        await Auteur.update(nouvelAuteur, { where: { id } })
        res.status(200).json({ message: "L'auteur a ete mis a jour avec succes" })

    } catch (error) {
        res.status(400).json({ message: "Probleme lors de la mise à jour de l'auteur" })
    }
}


export const supprimerAuteur = async (req,res) => {
    //on obtient l'id
    const id = req.params.id


    //on vérifie que l'id est valide
    if(isNaN(parseInt(id)) || id <= 0) {
        return  res.status(200).json({ message: "SVP entrer un nombre entier positif." })
    }
    try {
        //On vérifie si l'id existe
        const existe = await Auteur.findAll({where : {id : id}})
        if(existe.length == 0){
            return res.status(400).json({errors : "l'auteur n'existe pas."})
        }
        await Auteur.destroy({ where: { id } })
        res.status(200).json({ message: "L'auteur fut supprimé avec succès." })
    } catch (error) {
        res.status(400).json({ message: "Probleme lors de la suppression de l'utilisateur." })
    }

}



//READ
export const searchAuteur = async (req, res) => {
    console.log("search auteur")
    let idSearched 
    let nomSearched
    let prenomSearched
    let ratingSearched
    let naissanceSearched
    let biographieSearched

    console.log("search auteur")
    const search = req.query


    //Checks if the table has any data to begin with.
    const {count} = await Auteur.findAndCountAll()


    if(count == 0){
        console.log("search auteur count: ", count)
        return res.status(400).json({message : "La table est vide."})
    }

    
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

    if(search.prenom != null){
        prenomSearched = {prenom : search.prenom}
    } else{
        prenomSearched = null
    }

    if(search.auteur_rating != null){
        if(isNaN(parseInt(search.rating))){ //Checks if rating is valid.
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ rating."})
        }
        ratingSearched = {auteur_rating : search.auteur_rating}
    } else{
        ratingSearched = null
    }

    if(search.auteur_naissance != null){
        naissanceSearched = {auteur_naissance  : search.auteur_naissance}
    } else{
        naissanceSearched = null
    }

    if(search.auteur_biographie != null){
        biographieSearched = {auteur_biographie : search.auteur_biographie}
    } else {
        biographieSearched = null
    }

    try{
        //Checks if all fields are empty.
        if(idSearched == null && nomSearched == null && prenomSearched == null && ratingSearched == null && naissanceSearched == null  && biographieSearched == null){
            return res.status(400).json({errors: "S.V.P remplire au moins une valeur."})
        }

        const result = await Auteur.findAll(
            {where : 
                idSearched ||
                nomSearched ||
                prenomSearched ||
                ratingSearched ||
                naissanceSearched ||
                biographieSearched
             }
        )
        //Checks if the value is in the table.
        if(result.length == 0){
            return res.status(400).json({message : "Aucune données retrouvé."})
        }

        res.status(200).json({data : result})
        return

    } catch (error) {
        res.status(404).json({message : error.message})
        console.log('search auteur')
        return
    }
}


