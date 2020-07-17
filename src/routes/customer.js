import { Router } from 'express';
import { DistributorController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
import CustomerController from '../controllers/CustomerController';

let routerApp = new Router();
routerApp.get('/request', Response(CustomerController.getRequest));
routerApp.delete('/delete',Response(CustomerController.deleteCustomer));
routerApp.post('/addcustomer',Response(CustomerController.addCustomer));
routerApp.put('/updatecustomer',Response(CustomerController.updateCustomer));
routerApp.get('/getDetail',Response(CustomerController.getCustomerById));
routerApp.get('/getAll',Response(CustomerController.getAll));
routerApp.get('/search',Response(CustomerController.searchCustomer));
export default routerApp;