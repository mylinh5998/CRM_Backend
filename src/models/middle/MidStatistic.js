import { Order, Product, ProductPackage } from '../core';
import MidOrder from './MidOrder';
import { Op } from 'sequelize';
import { nowDate, addDay, subtractDay, getTimestamp, unixToTime, convertTimeDate } from '../../libs/timezone';

class MidStatistic{
    async getStatisticOrder(start, end, distributor_id) {
        let currDate = nowDate();
		let dataEndCheck = end || currDate;
		let dateEnd = addDay(dataEndCheck, 1);
		let dateStart = start || subtractDay(currDate, 9);
        
        const allOrders = await MidOrder.getOrderWithCondition({
            distributor_id,
            createdAt: {
                [Op.between]: [ convertTimeDate(dateStart), convertTimeDate(dateEnd) ]
            }
        })

        return allOrders;
    }
}

export default new MidStatistic();