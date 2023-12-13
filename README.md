# ProjetWebPt2
Seconde partie du projet web du college LaCite.
Auteurs: Noah Brosseau et Olivier Caron

## Démarer le site web

### Backend
* Pour lancer le serveur, ouvrer le fichier "Backend" avec vs-code suivi de "npm i" pour installer tout les modules, suivis de "npm start" pour lancer le serveur. Faite certain que votre xampp Apache et mySQL sont activer!

### Frontend
Afin de démarer le front end il faut suivre les étapes suivantes:
1. Naviger vers le sous dossier _Frontend/ProjetWebPartie2_ avec la commande `cd Frontend/ProjetWebPartie2`
2. Éxécuter la commande `npm run dev` dans le terminal

**N'oubliez pas d'installer les diffénts package Node avec la commande `npm i`**

## Informations importantes
* Noter que notre serveur tourne sur le port 8080 et non 5000. 
* Pour que la ceritification HTTPS fonctionne avec les requêtes postman, on doit désactiver le proxy dans postman en premier avant d'exécuter une requete. De plus, vous devez insérer le fichier "domaine.pem" dans vos Trusted Certificates de votre navigateur et votre ordinateur.
* SVP créer **en ordre** les roles suivant dans votre base de donnée:
1. `Admin`
2. `Bibliothecaire`
3. `Utilisateur`

**Sans ceux-ci, notre logiciel ne peut bien fonctionner.**


