//Noah Brosseau
import database from "../connexion.js"
import {DataTypes} from 'sequelize'

const Roles = database.define('roles', {
    nom:{type: DataTypes.STRING, allowNull: false}
},{timestamps: false})

export default Roles