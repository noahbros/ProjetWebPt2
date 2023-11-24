//Olivier Caron + Noah Brosseau
import {Roles, Utilisateur} from "../models/index.js"
import {validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'

export const getAllUtilisateur = async (req, res) =>{

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
    const {count} = await Utilisateur.findAndCountAll()
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
        const result = await Utilisateur.findAll()
        const pagination = result.slice(start, end)
        res.status(200).json({current_page, data : pagination, total_pages})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

export const AddUtilisateur = async (req, res)=>{
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    const {nom, prenom, naissance, photo, email, mot_de_passe} = req.body
    let roleId = req.body.roleId
    const mdpCrypt = bcrypt.hashSync(mot_de_passe, 10);

    //Checks if the foreign key is empty, thus attribute it the default value : null.
    if(req.body.roleId == ""){
        roleId = null
    }
    if(req.body.roleId != ""){

        //Checks if the foreign key is an integer.
        if(isNaN(parseInt(roleId))){
            return res.status(404).json({message : "Le champ RoleId, peut seulement contenir des nombres."})
        }
        //Checks if the foreign key actually exists.
        const resultRoles = await Roles.findOne({where : {id : roleId}})
        if(!resultRoles){
            return res.status(404).json({message : "Ce id n'appartient pas à un rôle, veuillez réessayer ou laisser la valeur null."})
        }
    }


    const createdUser = {nom, prenom, naissance, photo, email, mot_de_passe:mdpCrypt, roleId}
    
    console.log(createdUser)
    try{
        const result = await Utilisateur.create(createdUser)
        res.status(201).json({data:result, message : "Utilisateur created."})
        return
    } catch (error){
        res.status(404).json({message : error.message})
        return
    }
}

export const utilisateurParId = async (req, res) => {
    const id = req.params.id

    try {
        const utilisateur = await Utilisateur.findByPk(id)
        res.status(200).json({ data: utilisateur })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const modifierUtilisateur = async (req, res) => {
    //on valide les entrées
    const errors = validationResult(req)

    //Checks if body is not empty.
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //on obtient le id pour la recherche d'utilisateur
    const { id } = req.params

    const {nom, prenom, naissance, photo, email, mot_de_passe, roleId} = req.body
    const mdpCrypt = bcrypt.hashSync(mot_de_passe, 10);

    const nouvelUtilisateur = {nom, prenom, naissance, photo, email, mot_de_passe:mdpCrypt, roleId}


    try {
        await Utilisateur.update(nouvelUtilisateur, { where: { id } })
        res.status(200).json({ message: "L'utilisateur a ete mis a jour avec succes" })

    } catch (error) {
        res.status(400).json({ message: "Probleme lors de la creation de l'utilisateur" })
    }
}


export const supprimerUtilisateur = async (req,res) => {
    //on obtient l'id
    const id = req.params.id


    //|| isNaN(parseInt(id)) || id <= 0
    if(isNaN(parseInt(id)) || id <= 0) {
        return  res.status(200).json({ message: "SVP entrer un nombre entier positif." })
    }
    try {
        //Checks if id matches.
        const existe = await Utilisateur.findAll({where : {id : id}})
        if(existe.length == 0){
            return res.status(400).json({errors : "l'utilisateur n'existe pas."})
        }
        await Utilisateur.destroy({ where: { id } })
        res.status(200).json({ message: "L'utilisateur supprimer avec succès." })
    } catch (error) {
        res.status(400).json({ message: "Probleme lors de la suppression de l'utilisateur." })
    }

}

//READ
export const searchUtilisateurs = async (req, res)=>{
    //id	nom	prenom	naissance	photo	email	mot_de_passe	roleId
    let idSearched
    let nomSearched
    let prenomSearched
    let naissanceSearched
    let emailSearched
    let roleSearched
    
    //Checks if the table has any data to begin with.
    const {count} = await Utilisateur.findAndCountAll()
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

    if(search.prenom != null){
        prenomSearched = {prenom : search.prenom}
    } else{
        prenomSearched = null
    }

    if(search.naissance != null){
        naissanceSearched = {naissance  : search.naissance}
    } else{
        naissanceSearched = null
    }

    if(search.email != null){
        emailSearched = {email  : search.email}
    } else{
        emailSearched = null
    }

    if(search.roleId != null){
        if(isNaN(parseInt(search.roleId))){ //Checks if rating is valid.
            return res.status(400).json({errors : "S.V.P entré un nombre réel pour le champ rating."})
        }
        roleSearched = {roleId : search.roleId}
    } else{
        roleSearched = null
    }

    try{
        //Checks if all fields are empty.
        if(idSearched == null && nomSearched == null && prenomSearched == null && naissanceSearched == null && emailSearched == null  && roleSearched == null){
            return res.status(400).json({errors: "S.V.P remplire au moins une valeur."})
        }

        const result = await Utilisateur.findAll(
            {where : 
                idSearched ||
                nomSearched ||
                prenomSearched ||
                naissanceSearched ||
                emailSearched ||
                roleSearched
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