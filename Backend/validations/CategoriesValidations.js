//Olivier Caron
import {body, check} from 'express-validator'

const categoriesRegles = [
    body("nom").trim().notEmpty().withMessage("SVP entrer un nom de catégorie.").bail().isAlpha().withMessage("Le champ ne peut contenir que des lettres.").isLength({min: 2}).withMessage('Le champ doit contenir au moins 2 charactères.')
]

export default categoriesRegles