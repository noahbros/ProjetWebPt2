//Noah Brosseau
import {body, check} from 'express-validator'
//https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a : reference du regex.
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ //Necessite au moins une lettre, un nombre et un caractere speciaux.
//https://stackoverflow.com/questions/22061723/regex-date-validation-for-yyyy-mm-dd : reference du regex.
const naissanceRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // YYYY-MM-DD
const utilisateursRegles = [
    body('nom').notEmpty().withMessage('Un nom est requis.')
        .isAlpha().withMessage('Le champ nom peut seulement avoir des lettres')
        .isLength({min: 2}).withMessage('Le champ nom doit avoir au minimum 2 caractères.'),
    body('prenom').notEmpty().withMessage('Un prenom est requis.').isLength({min : 2}).withMessage('Le champ prenom doit contenir au moins 2 caractères.'),
    body('email').isEmail().notEmpty().withMessage('Un email est requis.'),
    body('mot_de_passe').matches(passwordRegex).withMessage('Le mot de passe est invalide. Il necessite au moins une lettre, un nombre et au minimum 8 caractères.'),
    body('naissance').matches(naissanceRegex).withMessage("Le format de date est invalide, faite certain d'avoir le format comme suit : YYYY-MM-DD"),
] 

export default utilisateursRegles