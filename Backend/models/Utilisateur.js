//Noah Brosseau
import database from "../connexion.js"
import {DataTypes} from 'sequelize'
import Roles from "./Roles.js"

const Utilisateur = database.define('utilisateurs', {
    nom:{type: DataTypes.STRING, allowNull: false},
    prenom:{type: DataTypes.STRING, allowNull: false},
    naissance:{type: DataTypes.DATEONLY},
    photo:{type: DataTypes.BLOB},
    email:{type: DataTypes.STRING, allowNull : false},
    mot_de_passe:{type: DataTypes.STRING, allowNull: false},
    roleId:{type: DataTypes.INTEGER, allowNull : true, references : {model : Roles, key : 'id'}}
})

export default Utilisateur