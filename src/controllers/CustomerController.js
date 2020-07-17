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
        return MidCustomer.updateCustomer(data, customerData);
    }
    searchCustomer(req,res){
        let dataQuery = req.query;
        console.log(dataQuery)
        return MidCustomer.searchCustomerCondition(dataQuery);
    }}

// async searchCustomer(req, res) {
//     let dataQuery = req.body;
//     return MidCustomer.searchCustomer(dataQuery);
// }
// }
export default new CustomerController();