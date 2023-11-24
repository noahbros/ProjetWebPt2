//Olivier Caron
import database from "../connexion.js"
import {DataTypes} from 'sequelize'

const Auteur = database.define('auteurs', {
    nom:{type: DataTypes.STRING, allowNull:false},
    prenom:{type:DataTypes.STRING, allowNull:false},
    auteur_naissance: {type: DataTypes.DATEONLY},
    auteur_rating: {type: DataTypes.DOUBLE},
    auteur_biographie: {type: DataTypes.STRING}
})

export default Auteur