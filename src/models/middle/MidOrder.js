import { Order, Product, ProductPackage, OrderProduct, Customer, ProductKey } from '../core';
import { Op, where } from 'sequelize';
import { ERROR_MESSAGE } from '../../config/error';
import { MidCustomer, MidDistributor, MidProduct, } from '.';
import { generateRandomCode } from '../../libs/random';
import { getDaysArray,appendLeadingZeroes,addDays } from '../../libs/datecommon';
import moment from 'moment';

class MidOrder {
    createNewOrder(data) {
        data.del = 0;
        return Order.create(data);
    }

    getOrderById(order_id) {
        return Order.findOne({
            where: { id: order_id }
        })
    }

    getOrderWithCondition(cond) {
        return Order.findAll({
            where: cond
        })
    }

    countOrderWithCondition(cond) {
        return Order.count({
            where: cond
        })
    }

    totalPriceWithCondition(cond) {
        return Order.sum('total_price', {
            where: cond
        })
    }

    
}

export default new MidOrder();