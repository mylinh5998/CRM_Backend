import { Router } from 'express';
import { PermissionController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
routerApp.get('/listPermission', isAuth, Response(PermissionController.allPermission));
routerApp.get('/listRole', isAuth, Response(PermissionController.getAllRole));

export default routerApp;