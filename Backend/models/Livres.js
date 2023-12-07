//Noah Brosseau
import database from '../connexion.js'
import {DataTypes} from 'sequelize'
import Categorie from './Categories.js'
import Auteur from './Auteur.js'

const Livres = database.define('livres', {
    nom: {type: DataTypes.STRING, allowNull: false},
    date_de_pub:{type: DataTypes.DATE, allowNull: false},
    rating:{type: DataTypes.INTEGER},
    photo:{type: DataTypes.STRING},
    maison_edition:{type: DataTypes.STRING, allowNull : false},
    location:{type: DataTypes.STRING},
    montant:{type: DataTypes.INTEGER},
    biographie:{type: DataTypes.STRING},
    categoryId:{type: DataTypes.INTEGER, allowNull: true, references: {model : Categorie, key : 'id'}},
    auteurId:{type: DataTypes.INTEGER, allowNull: false, references: {model : Auteur, key : 'id'} }
})

export default Livres