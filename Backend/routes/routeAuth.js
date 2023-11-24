//Noah Brosseau
import { Router } from 'express'
import {login} from '../auth/login-controller.js'

const routeAuth = Router();

routeAuth.post('/', login)
export default routeAuth