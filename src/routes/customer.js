import { Router } from 'express';
import { DistributorController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
import CustomerController from '../controllers/CustomerController';

let routerApp = new Router();
routerApp.get('/request', isAuth, Response(CustomerController.getRequest));
routerApp.delete('/delete',isAuth,Response(CustomerController.deleteCustomer));
routerApp.post('/addcustomer',isAuth,Response(CustomerController.addCustomer));
routerApp.put('/updatecustomer',isAuth,Response(CustomerController.updateCustomer));
routerApp.get('/getDetail',isAuth,Response(CustomerController.getCustomerById));
routerApp.get('/getAll',isAuth,Response(CustomerController.GetAll));
export default routerApp;