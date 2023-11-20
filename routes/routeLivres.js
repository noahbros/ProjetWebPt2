//Noah Brosseau
import {Router} from 'express'
import { getAllLivres, searchLivres, addLivres, deleteLivres, updateLivres} from '../controllers/livres.js'
import {body, query} from 'express-validator'
import { isAdmin, verifierToken } from '../auth/autorisation.js'
import livresRegles from '../validations/LivresValidations.js'

const routeLivres = Router()

routeLivres.get('/', verifierToken, getAllLivres) //Validateur non-nécessaire, tout les paramètres de queries contient des valeurs par défaut.
routeLivres.get('/get', verifierToken, searchLivres)
routeLivres.post('/', verifierToken, isAdmin, livresRegles, addLivres)
routeLivres.delete('/', verifierToken, isAdmin, query('id').notEmpty(), deleteLivres)
routeLivres.put('/', verifierToken, isAdmin, query('id').notEmpty(), updateLivres)

export default routeLivres