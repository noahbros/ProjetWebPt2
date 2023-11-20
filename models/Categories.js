//Noah Brosseau
import database from '../connexion.js'
import {DataTypes} from 'sequelize'

const Categorie = database.define('categories', {
    nom:{type: DataTypes.STRING, allowNull : false}
},{timestamps : false})

export default Categorie