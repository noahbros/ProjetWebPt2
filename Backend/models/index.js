//Olivier Caron + Noah Brosseau
import Utilisateur from "./Utilisateur.js";
import Roles from "./Roles.js";
import Categories from "./Categories.js"
import Livres from "./Livres.js"
import Auteur from "./Auteur.js";
import Emprunts from "./Emprunts.js";

Roles.hasMany(Utilisateur)
Utilisateur.belongsTo(Roles)
Categories.hasMany(Livres)
Livres.belongsTo(Categories)
Livres.belongsTo(Auteur)
Auteur.hasMany(Livres)
Emprunts.belongsTo(Livres)
Livres.hasMany(Emprunts)
Emprunts.belongsTo(Utilisateur)
Utilisateur.hasMany(Emprunts)

export {Utilisateur, Roles, Categories, Livres, Auteur, Emprunts}