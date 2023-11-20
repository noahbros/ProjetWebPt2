//Noah Brosseau
import {body} from 'express-validator'

const rolesRegles = [
    body('nom').notEmpty().withMessage("Un nom est requis.").isAlpha().withMessage('Le champ "nom" peut seulement avoir des lettres')
]

export default rolesRegles