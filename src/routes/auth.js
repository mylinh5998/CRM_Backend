import { Router } from 'express';
import { AuthController } from '../controllers';
import { Response } from '../libs/handle_response';

let routerApp = new Router();
routerApp.post('/login', Response(AuthController.login));

export default routerApp;