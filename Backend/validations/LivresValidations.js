//Noah Brosseau
import {body, check} from 'express-validator'
//https://stackoverflow.com/questions/22061723/regex-date-validation-for-yyyy-mm-dd : reference du regex.
const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // YYYY-MM-DD

const livresRegles = [
    body('nom').notEmpty().withMessage('Un nom est requis.'),
    body('date_de_pub').matches(dateRegex).withMessage("Le format de date est invalide, faite certain d'avoir le format comme suit : YYYY-MM-DD"),
    body('maison_edition').notEmpty().withMessage("Une maison d'édition est requis"),
    //body('auteurId').notEmpty().withMessage("Un id d'auteur est requis.").isNumeric().withMessage("Le champ auteurId, doit être un nombre.")
]   

export default livresRegles