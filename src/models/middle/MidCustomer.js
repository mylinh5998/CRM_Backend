import { Customer, CustomerRequest, Order, OrderProduct } from '../core';
import { ERROR_MESSAGE } from '../../config/error';
import { Op } from 'sequelize';
import { template } from 'lodash';

class MidCustomer {
    async getAll(id){
        return Customer.findAll()
    }
    

    async getCustomerById(idInfo) {

        let customer = await Customer.findOne({
            where: { id : idInfo.id },
        });

        return {
            customer: customer
         
        }
    }
    async deleteCustomer(datacustomer) {
        let customer = await Customer.destroy({
            where :{id :datacustomer.id},
        })

        return {
            delete :customer
        }
    }



    async updateCustomer(customerData) {
        const customer = await this.getCustomerById(customerData);
        
     return Customer.update({
            name: data.name,
            email: data.email,
            mobile: data.mobile
        }, {
            where: {
                id: customerData.id
            }
        });
    }

    
    

}
var newData = {
    name:'hoanglinh',
    email:'abc@123',
    mobile:'098765432',
    del: '1234',
    createdAt:'',
    updatedAt:'',

};
Customer.update({
    name: 'Huy',
}, {
    where: {id: 2}
})

export default new MidCustomer();