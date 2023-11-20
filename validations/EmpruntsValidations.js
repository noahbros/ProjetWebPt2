//Olivier Caron

import {body, check} from 'express-validator'

//https://stackoverflow.com/questions/22061723/regex-date-validation-for-yyyy-mm-dd : reference du regex.
const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // YYYY-MM-DD

const empruntsRegles = [
    body('statut').trim().notEmpty().withMessage('SVP entrer un statut.'),
    body('date_emprunt').trim().notEmpty().withMessage('SVP entrer une date d\'emprunt.').bail().matches(dateRegex).withMessage('Le format de date est invalide. SVP suivre le format: YYYY-MM-DD'),
    body('date_de_fin').trim().optional().notEmpty().withMessage('Ce champ est optionel, SVP seulement le remplir à la fin de l\'emprunt.').bail().matches(dateRegex).withMessage('Le format de date est invalide. SVP suivre le format: YYYY-MM-DD'),
    body('livreId').trim().notEmpty().withMessage('SVP donner l\'id du livre.').bail().isInt().withMessage('l\'ID donné doit être un nombre entier'),
    body('utilisateurId').trim().notEmpty().withMessage('SVP donner l\'id de l\'utilisateur.').bail().isInt().withMessage('l\'ID donné doit être un nombre entier')
]

export default empruntsRegles