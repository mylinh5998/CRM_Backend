import { Router } from 'express';
import { Notification } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
//import NotificationController from '../controllers';
import NotificationController from '../controllers/NotificationController';

let routerApp = new Router();

routerApp.get('/getnoti', Response(NotificationController.getNoti))
routerApp.post('/searchID',Response(NotificationController.searchID))

export default routerApp;