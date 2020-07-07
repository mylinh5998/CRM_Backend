import sequelize, {Op} from 'sequelize';
import { UserDistributor, Distributor, DistributorInfoPayment, DistributorGem,Order } from '../core';
import MidUser from './MidUser';
import MidPermission from './MidPermission';
import MidOrder from './MidOrder';
import { ERROR_MESSAGE } from '../../config/error';
import { hashPassword } from '../../libs/encrypt';
import { generateRandomCode } from '../../libs/random';
import { getDaysArray,appendLeadingZeroes,addDays } from '../../libs/datecommon';
import { parseInt, fromPairs } from 'lodash';
import { Console } from 'winston/lib/winston/transports';

class MidDistributor {
    
    async getAllUserOfDistributor(distributor_id) {
        return UserDistributor.findAll({
            where: {
                distributor_id,
                del: 0
            },
            includes: ['role']
        })
    }

    getUserManagementSystem() {
        return UserDistributor.findAll({
            where: {
                del: 0,
                type: 1
            }
        })
    }

    getDistributorById(id) {
        return Distributor.findOne({
            where: { id }
        })
    }

    async addNewUserManageDistributor(data) {
        if (!data.email || !data.level || !data.password || !data.name || !data.products) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_REQUIRE)
        }
        const existEmail = await MidUser.getUserByEmail(data.email);
        if (existEmail) {
            throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_EXIST);
        }

        if (data.parent_id) {
            const distributorParent = await this.getDistributorById(data.parent_id);
            if (!distributorParent) {
                throw new Error(ERROR_MESSAGE.ADD_USER_DISTRIBUTOR.ERR_DISTRIBUTOR_PARENT);
            }

            // data.level = distributorParent.level + 1;
        }

        data.del = 0;
        data.active = 1;
        data.code = generateRandomCode('DL-', 8);
        let newDistributor = await Distributor.create(data);
        const password = await hashPassword(data.password);
        const dataUser = Object.assign(data, { type: 2, status: 1, distributor_id: newDistributor.id, password });
        const roleDefault = await MidPermission.getRoleDefaultDistributor();
        const userIns = await UserDistributor.create(dataUser);
        if (roleDefault) {
            MidPermission.addUserRole({ userid: userIns.id, role_id: roleDefault })
        }

        await MidOrder.createOrderWholeSale(0, {
            distributor_buy_id: newDistributor.id,
            products: data.products
        });

        return userIns;
    }

    async activeDistributor(data) {
        const { distributor_id } = data;
        if (!distributor_id) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_REQUIRE);
        }

        let distributorData = await this.getDistributorById(distributor_id);
        if (!distributorData) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_REQUIRE);
        }

        return distributorData.update({ active: 1 });
    }

    async getDistributors(data) {
        let condition = {};
        if (data.parent_id) {
            condition.parent_id = data.parent_id;
        }

        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }

        if (data.email) {
            condition.email = {
                [Op.like]: `%${data.email}%`
            }
        }
        if (data.level) {
            condition.level = {
                [Op.eq]: data.level
            }
        }
        if (data.mobile) {
            condition.mobile = {
                [Op.like]: `%${data.mobile}%`
            }
        }

        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 25;

        const [alllDistributor, total] = await Promise.all([
            Distributor.findAll({
                where: condition,
                order: [["id", "DESC"]],
                limit,
                offset: (page - 1) * limit
            }),
            Distributor.count({
                where: condition
            })
        ])

        return {
            rows: alllDistributor,
            total: total || 0
        }
    }

   

    async updateInfoPayment(distributor_id, data) {
        if (!data.id) {
            throw new Error('Require params')
        }

        let existInfo = await this.getPaymentByCond({ distributor_id, id: data.id });
        if (!existInfo) {
            throw new Error('Yêu cầu không hợp lệ')
        }

        return existInfo.update(data); 
    }

    

    getInfoGem(distributor_id) {
        return DistributorGem.findOne({
            where: {
                distributor_id
            }
        })
    }

    createInfoGem(data) {
        return DistributorGem.create(data);
    }

    async updateInfoGem(distributor_id, data) {
        const existInfo = await this.getInfoGem(distributor_id);
        if (existInfo) {
            return existInfo.update(data); 
        } else {
            return this.createInfoGem({ ...data, distributor_id });
        }
    }
    
    
}

export default new MidDistributor()