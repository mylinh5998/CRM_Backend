import { Router } from 'express';
import { OrderController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
//routerApp.get('/getWholesale', Response(OrderController.GetWholesaleOrders));
routerApp.get('/getall', Response(OrderController.GetAll));
routerApp.get('/test', Response(OrderController.test));
routerApp.get('/search', isAuth, Response(OrderController.searchOrder));
routerApp.get('/search', Response(OrderController.searchOrder));
routerApp.get('/searchOrderBuy', isAuth, Response(OrderController.getOrderDistributorBuy));
routerApp.post('/createRetail', isAuth, Response(OrderController.createOrderRetail));
routerApp.post('/createWholeSale', isAuth, Response(OrderController.createOrderWholeSale));

routerApp.get('/GetDataOrderChart', isAuth, Response(OrderController.getDataOrderChart));

routerApp.get('/GetDetailKeyRetail', isAuth, Response(OrderController.getdetailKeyByOrderretail));
routerApp.get('/GetDetailKeyWholesale', isAuth, Response(OrderController.getdetailKeyByOrderWholesale));

export default routerApp;