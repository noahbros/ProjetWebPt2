//Olivier Caron + Noah Brosseau
import { Router } from 'express'
import { AddUtilisateur, getAllUtilisateur, modifierUtilisateur, searchUtilisateurs, supprimerUtilisateur, utilisateurParId } from '../controllers/utilisateur.js'
import {body} from 'express-validator'
import { isAdmin, verifierToken } from '../auth/autorisation.js'
import utilisateursRegles from '../validations/UtilisateurValidations.js'

const routeUtilisateur = Router()

routeUtilisateur.get('/', verifierToken, getAllUtilisateur)
routeUtilisateur.get('/search', verifierToken, searchUtilisateurs)
routeUtilisateur.post('/', utilisateursRegles, AddUtilisateur)
routeUtilisateur.get('/:id', verifierToken, utilisateurParId)
routeUtilisateur.put('/:id', verifierToken, isAdmin, body('nom').notEmpty(), body('mot_de_passe').notEmpty(), modifierUtilisateur)
routeUtilisateur.delete('/:id', verifierToken, isAdmin, supprimerUtilisateur)

export default routeUtilisateur