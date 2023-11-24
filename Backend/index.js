//Noah Brosseau + Olivier Caron
    //Les modules
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
    //Les routes/connections
import database from './connexion.js'
import routeRoles from './routes/routeRoles.js'
import routeUtilisateur from './routes/routeUtilisateur.js'
import routeCategories from './routes/routeCategories.js'
import routeLivres from './routes/routeLivres.js'
import routeAuth from './routes/routeAuth.js'
import routeAuteur from "./routes/routeAuteur.js"
import routeEmprunt from './routes/routeEmprunts.js'
    //La fonction de redirection HTTPS
import redirectToHTTPS from './redirect-https.js'
    //Les modules nécessaire pour la certification HTTPS
import { readFile } from 'fs/promises'
import https from 'https'

const { PORT } = dotenv.config().parsed
 
const certInfos = {
    key: await readFile('./certificates/localhost.key'),
    cert: await readFile('./certificates/localhost.crt')
}
const app = express()

const server = https.createServer(certInfos, app).listen(PORT) //Lancement du serveur.

//Reset la BDD lorsqu'elle est initié.
database.sync({force : true})

//Liaison de la fonction de redirection HTTPS au serveur.
app.use(redirectToHTTPS) 

//Liaison des modules au serveur.
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

//Liaison des routes au serveur.
app.use('/utilisateur', routeUtilisateur)
app.use('/roles', routeRoles)

app.use('/categories', routeCategories)
app.use('/livres', routeLivres)

app.use('/login', routeAuth)

app.use("/auteur", routeAuteur)
app.use("/emprunts", routeEmprunt)


