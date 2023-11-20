//Olivier Caron
import {body, check} from 'express-validator'

//https://stackoverflow.com/questions/22061723/regex-date-validation-for-yyyy-mm-dd : reference du regex.
const naissanceRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // YYYY-MM-DD

const auteurRegles = [
    body('nom').trim().notEmpty().withMessage('SVP entrer un nom.')
        .isAscii().withMessage('Le champ nom peut seulement contenir des lettres.'),
    body('prenom').trim().notEmpty().withMessage('SVP entrer un nom.')
        .isAscii().withMessage('Le champ nom peut seulement contenir des lettres.'),
    body('auteur_naissance').optional().notEmpty().withMessage('Ce champ est optionel. SVP l\'enlever si vous ne voulez pas donner de valeur').bail().trim().matches(naissanceRegex).withMessage('Le format de date est invalide. SVP suivre le format: YYYY-MM-DD'),
    body('auteur_biographie').optional().notEmpty().withMessage('Ce champ est optionel. SVP l\'enlever si vous ne voulez pas donner de valeur').bail().isLength({min: 10}).withMessage('La biographie de l\'auteur doit être au moins 10 charatères.'),
    body('auteur_rating').optional().trim().isDecimal({decimal_digits: 2}).withMessage('SVP vérifier que le rating est un double.')
]

export default auteurRegles