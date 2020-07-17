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
            name: customerData.name,
            email: customerData.email,
            mobile: customerData.mobile
        }, {
            where: {
                id: customerData.id
            }
        });
    }

    // async searchCustomer(customerSe){
    //     let customer = await Customer.findAll({
    //         where: { id : customerSe.id },
    //     });

    //     return {
    //         customer: customer
         
    //     }
    // }
    async searchCustomerCondition(search = {}) {
        let condition = {
        };
        let { page, limit } = search;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 25;

        if (search.name) {
            condition.name = search.name;
        }

        if (search.email) {
            condition.email = search.email;
        }

        if (search.mobile) {
            condition.mobile = search.mobile;
        }

        if (search.package_id) {
            condition.package_id = search.package_id;
        }
    
        const [listCustomer, total] = await Promise.all([
            Customer.findAll({
                where: condition,
                order: [["id", "DESC"]],
                limit,
                offset: (page - 1) * limit
            }), 
            Customer.count()

        ]);

        return {
            rows: listCustomer,
            total: total || 0
        }
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