//Olivier Caron
import {body} from 'express-validator'

const categoriesRegles = [
    body('nom').notEmpty().withMessage("SVP entrer un nom de catégorie.").bail().isLength({min: 2}).withMessage('Le champ doit contenir au moins 2 caractères.')
]

export default categoriesRegles