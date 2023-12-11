//Olivier Caron
import { Router } from 'express'
import {body} from 'express-validator'
import { isAdmin, isAdminOrBibliothecaire, verifierToken } from '../auth/autorisation.js'
import { AddAuteur, auteurParId, getAllAuteur, modifierAuteur, searchAuteur, supprimerAuteur } from '../controllers/auteur.js'
import auteurRegles from '../validations/AuteurValidations.js'

const routeAuteur = Router()

routeAuteur.post("/", verifierToken, isAdminOrBibliothecaire, auteurRegles, AddAuteur)
routeAuteur.get("/", verifierToken, getAllAuteur)
routeAuteur.get("/search", verifierToken, searchAuteur)
routeAuteur.get("/:id",verifierToken, auteurParId)
routeAuteur.put("/:id", verifierToken, isAdminOrBibliothecaire, auteurRegles, modifierAuteur)
routeAuteur.delete("/:id", verifierToken, isAdminOrBibliothecaire, supprimerAuteur)


export default routeAuteur