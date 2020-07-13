import { MidCustomer, MidUser } from '../models/middle';

class CustomerController {
    getAll(req, _res) {
        let dataQuery = req.query;

        return MidCustomer.getAll(dataQuery);
    }
    deleteCustomer(req,_res){
        let datacustomer = req.query;
        return MidCustomer.deleteCustomer(datacustomer);
    }
    getCustomerById(req, res){

        let idInfo = req.query;

        return MidCustomer.getCustomerById(idInfo);

    }
    updateCustomer(req,res){
        const customerData = req.customerData;
        const data = req.body;
        return MidUser.updateCustomer(data, customerData);
    }
    searchCustomer(req,res){
        
    }

    

}
    
export default new CustomerController();