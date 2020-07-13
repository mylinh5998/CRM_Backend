import { Customer, CustomerRequest, Order, OrderProduct } from '../core';
import { ERROR_MESSAGE } from '../../config/error';
import { Op } from 'sequelize';
import { template } from 'lodash';

class MidCustomer {
    

    async getCustomerById(id) {

        let customer = await Customer.findOne({
            where: { id },
        });

        let order = await Order.findAll({
            where: {
                userid: id
            }
        })

        return {
            customer: customer,
            order: order
        }
    }

    addCustomer(data) {
        return Customer.create({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            del: 0
        });
    }

    async updateCustomer(data) {
        const customer = await this.getCustomerById(data);
        if (!customer) {
            throw new Error(ERROR_MESSAGE.UPDATE_CUSTOMER.ERR_CUSTOMER);
        }
        return Customer.update({
            name: data.name,
            email: data.email,
            mobile: data.mobile
        }, {
            where: {
                id: data.id
            }
        });
    }

    async deleteCustomer(data) {
        const customer = await this.getCustomerById(data);
        if (!customer) {
            throw new Error(ERROR_MESSAGE.UPDATE_CUSTOMER.ERR_CUSTOMER);
        }
        return customer.update({
            del: 1
        })
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
    where: {id: 1}
})

export default new MidCustomer();