import { DistributorLinkPayment, ProductPackage, Distributor} from '../core';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../config/error';
import { MidCustomer, MidDistributor, MidProduct } from '.';
import { generateRandomCode, generateRandomCodePay } from '../../libs/random';
import { DistributorLinkPaymentController } from '../../controllers';

class MidDistributorLinkPayment {

    async CheckPayCreate(data){
        let Dispayment = await DistributorLinkPayment.findAll({
            where : {
                [Op.and]: [{ package_id: data.package_id }, { distributor_id: data.distributor_id }]
            }
        })
        console.log(Dispayment)
        
        if(Object.entries(Dispayment).length === 0){
            const dataInsert = {
                distributor_id : data.distributor_id,
                package_id: data.package_id,
                code: generateRandomCodePay()
            }
            await DistributorLinkPayment.create(dataInsert);
        }
    }
    async searchDisLinkPay(search = {}) {
        let condition = {
        }

        let { page, limit } = search;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 25;

        if (search.distributor_id) {
            condition.distributor_id = search.distributor_id;
        }

        if (search.package_id) {
            condition.package_id = search.package_id;
        }

        //if(DistributorLinkPayment.)
        const [ listLinkPayment, total ] = await Promise.all([
            DistributorLinkPayment.findAll({
                where: condition,
                order: [["id", "DESC"]],
                limit,
                offset: (page - 1) * limit, 
                include: [
                {
                    model: ProductPackage,
                    as: 'productpackage'
                },
                {
                    model: Distributor,
                    as: 'distributor'
                }
            ]
            }),
            DistributorLinkPayment.count({
                where: condition
            })
        ]);

        return {
            listLinkPayment,
            total: total || 0
        }
    }
    
}

export default new MidDistributorLinkPayment();