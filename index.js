//Noah Brosseau + Olivier Caron
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'

import database from './connexion.js'
import routeRoles from './routes/routeRoles.js'
import routeUtilisateur from './routes/routeUtilisateur.js'
import routeCategories from './routes/routeCategories.js'
import routeLivres from './routes/routeLivres.js'
import routeAuth from './routes/routeAuth.js'
import routeAuteur from "./routes/routeAuteur.js"
import routeEmprunt from './routes/routeEmprunts.js'


const app = express()
const { PORT } = dotenv.config().parsed

database.sync({force : true})

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use('/utilisateur', routeUtilisateur)
app.use('/roles', routeRoles)

app.use('/categories', routeCategories)
app.use('/livres', routeLivres)

app.use('/login', routeAuth)

app.use("/auteur", routeAuteur)
app.use("/emprunts", routeEmprunt)

app.listen(PORT, ()=> console.log(`The server is running on port ${PORT}.`))