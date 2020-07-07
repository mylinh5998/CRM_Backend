import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';

/**
 * Define Order Model
 * 
 * @export
 * @class Order
 * @extends {BaseModel}
 */
export default class Discount extends BaseModel {

    static association() {
    }

    static getDiscountById(id) {
        return this.findOne({
          where: {
            del: 0,
            id
          }     
        })
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
    name: {
        type: DataTypes.STRING, // Tên chiết khấu
        allowNull: true,
        defaultValue: null
    },
    level: {
        type: DataTypes.INTEGER(1), // Level discount
        allowNull: true,
        defaultValue: null
    },
    percentdiscount: {
        type: DataTypes.INTEGER(10),// Phan tram discount
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING, //  Mô tả
        allowNull: true
    },
    del: {
        type: DataTypes.TINYINT(1), // 1 - bi xoa
        allowNull: true,
        default: 0
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
    tableName: 'discount'
};

/**
 * Init Model
 */
Discount.init(attributes, { ...options, sequelize });