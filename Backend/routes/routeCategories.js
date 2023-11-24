//Noah Brosseau + Olivier Caron
import { Router } from 'express'
import {getAllCategories, SearchCategories, AddCategory, DeleteCategory, UpdateCategory} from '../controllers/categories.js'
import {body, query} from 'express-validator'
import { isAdmin, verifierToken } from '../auth/autorisation.js'
import categoriesRegles from '../validations/CategoriesValidations.js'

const routeCategories = Router()

routeCategories.get('/', verifierToken, getAllCategories) //Validateur non-nécessaire, tout les paramètres de queries contient des valeurs par défaut.
routeCategories.get('/get', verifierToken, SearchCategories) //Les valeurs sont valider dans le callback, manuellement sans express-validator, pour des raisons de préférences.
routeCategories.post('/', verifierToken, isAdmin, categoriesRegles, AddCategory)
routeCategories.delete('/',verifierToken, isAdmin, query('id').notEmpty(), DeleteCategory)
routeCategories.put('/', verifierToken, isAdmin, query('id').notEmpty(), categoriesRegles, UpdateCategory)

export default routeCategories