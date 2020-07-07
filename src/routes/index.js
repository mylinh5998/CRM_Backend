import { Router } from 'express';
import auth from './auth';
import profile from './profile';
import distributor from './distributor';
import order from './order';
import discount from './discount';
import productkey from './productkey';
import permission from './permission';
import productpackage from './productpackage';
import Customer from './customer';

let routerApp = new Router();
routerApp.use('/profile', profile);
routerApp.use('/auth', auth);
routerApp.use('/distributor', distributor);
routerApp.use('/order', order);
routerApp.use('/discount', discount);
routerApp.use('/productkey', productkey);
routerApp.use('/permission', permission);
routerApp.use('/productpackage', productpackage);
routerApp.use('/customer', Customer);

export default routerApp;