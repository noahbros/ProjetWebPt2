//Olivier Caron
import database from "../connexion.js"
import {DataTypes} from 'sequelize'
import Utilisateur from "./Utilisateur.js"
import Roles from "./Roles.js"

const Emprunts = database.define('emprunts', {
    statut: {type: DataTypes.STRING, allowNull: false},
    date_emprunt: {type: DataTypes.DATEONLY, allowNull: false},
    date_de_fin: {type: DataTypes.DATEONLY},
    livreId: {type: DataTypes.INTEGER, allowNull: false, references: {model : Roles, key : 'id'}},
    utilisateurId: {type: DataTypes.INTEGER, allowNull : false, references: {model : Utilisateur, key : 'id'}}
})

export default Emprunts