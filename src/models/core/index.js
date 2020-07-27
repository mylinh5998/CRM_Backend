export {default as UserDistributor} from './UserDistributor';
export {default as Product} from './Product';
export {default as ProductPackage} from './ProductPackage';
export {default as Distributor} from './Distributor';
export {default as Order} from './Order';
export {default as Customer} from './Customer';
export {default as Permissions} from './Permissions';
export {default as Role} from './Role';
export {default as RolePermission} from './RolePermission';
export {default as UserRole} from './UserRole';
export {default as Discount} from './Discount';
export {default as ProductKey} from './ProductKey';
export {default as DistributorPermission} from './DistributorPermission';
export {default as DistributorCreditHistory} from './DistributorCreditHistory';
export {default as DistributorDiscount} from './DistributorDiscount';
export {default as CustomerRequest} from './CustomerRequest';
export {default as DistributorInfoPayment} from './DistributorInfoPayment';
export {default as DistributorGem} from './DistributorGem';
export {default as DistributorLinkPayment} from './DistributorLinkPayment';
export {default as DistributorKeyFree} from './DistributorKeyFree';
export {default as OrderProduct} from './OrderProduct';
export {default as Notification} from './Notification';

import { sequelize } from '../../connections';

for (let m in sequelize.models) {
    sequelize.models[m].sync();
}

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}