//Noah Brosseau
import { Router } from 'express';
import { getAllRoles, searchRoles, AddRole, DeleteRole, UpdateRole} from '../controllers/roles.js';
import {body, query} from 'express-validator'
import { isAdmin, verifierToken } from '../auth/autorisation.js';
import rolesRegles from '../validations/RolesValidations.js';

const routeRoles = Router()

routeRoles.get('/', verifierToken, isAdmin, getAllRoles) //Validateur non-nécessaire, tout les paramètres de queries contient des valeurs par défaut.
routeRoles.get('/get', verifierToken, isAdmin, searchRoles) //Les valeurs sont valider dans le callback, manuellement sans express-validator, pour des raisons de préférences.
routeRoles.post('/', rolesRegles, AddRole)
routeRoles.delete('/', verifierToken, isAdmin, query('id').notEmpty(), DeleteRole)
routeRoles.put('/', rolesRegles, verifierToken, isAdmin, query('id').notEmpty(), body('nom').notEmpty(), UpdateRole)

export default routeRoles