//Olivier Caron
import { Router } from 'express'
import {body} from 'express-validator'
import { isAdmin, isBibliothecaire, verifierToken } from '../auth/autorisation.js'
import { AddAuteur, auteurParId, getAllAuteur, modifierAuteur, searchAuteur, supprimerAuteur } from '../controllers/auteur.js'
import auteurRegles from '../validations/AuteurValidations.js'

const routeAuteur = Router()

routeAuteur.post("/", verifierToken, isAdmin, isBibliothecaire, auteurRegles, AddAuteur)
routeAuteur.get("/", verifierToken, getAllAuteur)
routeAuteur.get("/search", verifierToken, searchAuteur)
routeAuteur.get("/:id",verifierToken, auteurParId)
routeAuteur.put("/:id", verifierToken, isAdmin, isBibliothecaire, auteurRegles, modifierAuteur)
routeAuteur.delete("/:id", verifierToken, isAdmin, isBibliothecaire, supprimerAuteur)


export default routeAuteur