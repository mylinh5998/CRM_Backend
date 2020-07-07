import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';
import ProductPackage from './ProductPackage';
import Distributor from './Distributor';

/**
 * Define DistributorLinkPayment Model
 * luu danh sach link thanh toan cua dai ly
 * 
 * @export
 * @class DistributorLinkPayment
 * @extends {BaseModel}
 */
export default class DistributorLinkPayment extends BaseModel {

    static association() {
        DistributorLinkPayment.belongsTo(ProductPackage, { as: 'productpackage', foreignKey: 'package_id' })
        DistributorLinkPayment.belongsTo(Distributor, { as: 'distributor', foreignKey: 'distributor_id' })
    }
}

/**
 * Attributes model
 */
const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    distributor_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
    },
    package_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

/**
 * Options model
 */
const options = {
    tableName: 'distributor_link_payment'
};

/**
 * Init Model
 */
DistributorLinkPayment.init(attributes, { ...options, sequelize });