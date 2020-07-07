import { Router } from 'express';
import { DistributorController,DistributorLinkPaymentController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
routerApp.get('/search', isAuth, Response(DistributorController.searchDistributor));
routerApp.get('/all', isAuth, Response(DistributorController.listDistributor));
routerApp.post('/add', isAuth, Response(DistributorController.addDistributor));
routerApp.post('/active', isAuth, Response(DistributorController.activeDistributor));
routerApp.get('/getBank', isAuth, Response(DistributorController.getInfoBank));
routerApp.post('/updateBank', isAuth, Response(DistributorController.updateAccountBank));
routerApp.post('/addBank', isAuth, Response(DistributorController.addAccountBank));

routerApp.get('/getlinkpayment', isAuth, Response(DistributorLinkPaymentController.GetLinkPayment));
routerApp.post('/checkinsertpay', isAuth, Response(DistributorLinkPaymentController.CheckInsertPayment));

routerApp.get('/getdataorderchart', isAuth, Response(DistributorController.getDataOrder));
routerApp.get('/gettopdistributor', isAuth, Response(DistributorController.getTopNPP));

export default routerApp;