import { Router } from 'express';
import { DiscountController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
//routerApp.get('/getWholesale', Response(OrderController.GetWholesaleOrders));
routerApp.get('/getalldiscount',isAuth, Response(DiscountController.GetAll));
routerApp.post('/deletediscount',isAuth, Response(DiscountController.DeleteDiscount));
routerApp.post('/adddiscount',isAuth, Response(DiscountController.addDiscount));
routerApp.post('/updatediscount',isAuth, Response(DiscountController.update));


export default routerApp;