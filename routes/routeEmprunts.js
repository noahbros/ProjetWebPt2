//Olivier Caron
import { Router } from 'express'
import {body} from 'express-validator'
import { isAdmin, verifierToken } from '../auth/autorisation.js'
import { AddEmprunt, empruntParId, getAllEmprunts, modifierEmprunt, searchEmprunt, supprimerEmprunt } from '../controllers/emprunts.js'
import empruntsRegles from '../validations/EmpruntsValidations.js'

const routeEmprunt = Router()
routeEmprunt.post("/", verifierToken, isAdmin, empruntsRegles, AddEmprunt)
routeEmprunt.get("/search", verifierToken, searchEmprunt)
routeEmprunt.get("/", verifierToken, getAllEmprunts)
routeEmprunt.get("/:id", verifierToken, empruntParId)
routeEmprunt.put("/:id", verifierToken, isAdmin, empruntsRegles, modifierEmprunt)
routeEmprunt.delete("/:id", verifierToken, isAdmin, supprimerEmprunt)

export default routeEmprunt
