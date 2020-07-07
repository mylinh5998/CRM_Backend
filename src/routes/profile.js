import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { UserController } from '../controllers';
import { Response } from '../libs/handle_response';

let routerApp = new Router();
routerApp.get('/userInfo', isAuth, Response(UserController.getUserInfo));

export default routerApp;