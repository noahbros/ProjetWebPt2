//Olivier Caron + Noah Brosseau
import { Emprunts, Livres, Utilisateur } from "../models/index.js";
import {validationResult} from 'express-validator'

export const AddEmprunt = async (req, res)=>{
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const emprunt = req.body
    
    let utilisateurId = req.body.utilisateurId
    let livreId = req.body.livreId

    //Checks if the foreign key is null
    if(req.body.utilisateurId == ""){
        return res.status(404).json("Le champs utilisateurId ne peut pas être vide. Veuillez réessayer.")
    }
    if(req.body.utilisateurId != ""){

        //Checks if the foreign key is an integer.
        if(isNaN(parseInt(utilisateurId))){
            return res.status(404).json({message : "Le champ utilisateurId, peut seulement contenir des nombres."})
        }
        //Checks if the foreign key actually exists.
        const resultUtilisateur = await Utilisateur.findOne({where : {id : utilisateurId}})
        if(!resultUtilisateur){
            return res.status(404).json({message : "Ce id n'appartient pas à un utilisateur, veuillez réessayer ou laisser la valeur null."})
        }
    }
    //Checks if the foreign key is null
    if(req.body.livreId == ""){
        return res.status(404).json("Le champs livreId ne peut pas être vide. Veuillez réessayer.")
    }
    if(req.body.livreId != ""){

        //Checks if the foreign key is an integer.
        if(isNaN(parseInt(livreId))){
            return res.status(404).json({message : "Le champ livreId, peut seulement contenir des nombres."})
        }
        //Checks if the foreign key actually exists.
        const resultLivre = await Livres.findOne({where : {id : livreId}})
        if(!resultLivre){
            return res.status(404).json({message : "Ce id n'appartient pas à un livre, veuillez réessayer ou laisser la valeur null."})
        }
    }

    emprunt.utilisateurId = utilisateurId
    emprunt.livreId = livreId

    try{
        const result = await Emprunts.create(emprunt)
        res.status(201).json({data:result, message : "L'emprunt as été créer avec succès."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }

}

export const getAllEmprunts = async (req, res) =>{

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
    const {count} = await Emprunts.findAndCountAll()
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
        const result = await Emprunts.findAll()
        const pagination = result.slice(start, end)
        res.status(200).json({current_page, data : pagination, total_pages})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

export const empruntParId = async (req, res) => {
    const id = req.params.id

    try {
        const emprunt = await Emprunts.findByPk(id)
        res.status(200).json({ data:  emprunt})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}


export const modifierEmprunt = async (req, res) => {
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //on obtient le id pour la recherche d'auteur
    const { id } = req.params

    const nouvelEmprunt = req.body


    try {
        await Emprunts.update(nouvelEmprunt, { where: { id } })
        res.status(200).json({ message: "L'emprunt a ete mis a jour avec succes" })

    } catch (error) {
        res.status(400).json({ message: "Probleme lors de la mise à jour de l'emprunt" })
    }
}

export const supprimerEmprunt = async (req,res) => {
    //on obtient l'id
    const id = req.params.id


    //on vérifie que l'id est valide
    if(isNaN(parseInt(id)) || id <= 0) {
        return  res.status(200).json({ message: "SVP entrer un nombre entier positif." })
    }
    try {
        //On vérifie si l'id existe
        const existe = await Emprunts.findAll({where : {id : id}})
        if(existe.length == 0){
            return res.status(400).json({errors : "l'auteur n'existe pas."})
        }
        await Emprunts.destroy({ where: { id } })
        res.status(200).json({ message: "L'auteur fut supprimé avec succès." })
    } catch (error) {
        res.status(400).json({ message: "Probleme lors de la suppression de l'utilisateur." })
    }

}

//READ
export const searchEmprunt = async (req, res)=>{
    let idSearched 
    let statutSearched
    let dateFinSearched
    let dateDebutSearched
    let livreIdSearched
    let userIdSearched
    
    //Checks if the table has any data to begin with.
    const {count} = await Emprunts.findAndCountAll()
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

    if(search.statut != null){
        statutSearched = {statut : search.statut}
    } else{
        statutSearched = null
    }

    if(search.date_emprunt != null){
        dateDebutSearched = {date_emprunt : search.date_emprunt}
    } else{
        dateDebutSearched = null
    }

    if(search.date_de_fin != null){
        if(isNaN(parseInt(search.rating))){ //Checks if rating is valid.
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ rating."})
        }
        dateFinSearched = {date_de_fin : search.date_de_fin}
    } else{
        dateFinSearched = null
    }

    if(search.livreId != null){
        livreIdSearched = {livreId  : search.livreId}
    } else{
        livreIdSearched = null
    }

    if(search.utilisateurId != null){
        userIdSearched = {utilisateurId : search.utilisateurId}
    } else {
        userIdSearched = null
    }

    try{
        //Checks if all fields are empty.
        if(idSearched == null && statutSearched == null && dateDebutSearched == null && dateFinSearched == null && livreIdSearched == null  && userIdSearched == null){
            return res.status(400).json({errors: "S.V.P remplire au moins une valeur."})
        }

        const result = await Emprunts.findAll(
            {where : 
                idSearched ||
                statutSearched ||
                dateDebutSearched ||
                dateFinSearched ||
                livreIdSearched ||
                userIdSearched
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



