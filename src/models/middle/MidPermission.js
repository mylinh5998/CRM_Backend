import { Permissions, Role, RolePermission, UserDistributor, Distributor, DistributorPermission, UserRole } from '../core';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../config/error';

class MidPermission {
    async getPermissionOfDistributor(type = 2) {
        const listPermission = await DistributorPermission.findOne({
            where: { type }
        });

        const listPermissionIds = listPermission ? listPermission.permission_id : [];
        return listPermissionIds.length ? Permissions.findAll({
            where: {
                id: {
                    [Op.in]: listPermissionIds
                }
            }
        }) : [];
    }

    async getPermissionDataOfRole(role_id) {
        const roleData = await this.getPermissionOfRole(role_id);
        const listPermissionIds = roleData.map(it => it.permission_id);
        return listPermissionIds.length ? Permissions.findAll({
            where: {
                id: {
                    [Op.in]: listPermissionIds
                }
            }
        }) : [];
    }

    async addRoleUserManagement(data) {
        return Role.create(data);
    }

    async getPermissionOfRole(role_id) {
        return RolePermission.findAll({
            where: {
                role_id
            }
        })
    }

    async removeRole(role_id, distributor_id) {
        const roleData = await this.getRoleById(role_id);
        if (!roleData) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_ROLE_INVALID);
        }

        if (roleData.df_distributor) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_ROLE_INVALID);
        }

        if (distributor_id && roleData.distributor_id !== distributor_id) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_ROLE_INVALID);
        }

        const existRoleUser = await UserRole.findOne({
            where: {
                role_id
            }
        })

        if (!existRoleUser) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_EXIST_USER);
        }

        return existRoleUser.destroy();
    }

    addRolePermission(data) {
        return RolePermission.create(data);
    }

    getPermissionByKey(key) {
        return Permissions.findOne({
            where: {
                key
            }
        })
    }

    getRoles(distributor_id) {
        if (distributor_id) {
            return Role.findAll({
                where: {
                    [Op.or]: [
                        { df_distributor: 1 },
                        { distributor_id }
                    ]
                }
            })
        } else {
            return Role.findAll({
                where: {
                    df_distributor: 0,
                    distributor_id: 0
                }
            })
        }
    }

    async getRoleDefaultDistributor() {
        const roleData = await Role.findOne({
            where: {  
                df_distributor: 1
            }
        });

        return roleData ? roleData.id : '';
    }

    getRoleById(role_id) {
        return Role.findOne({
            where: { id: role_id }
        });
    }

    getUserRole(userid) {
        return UserRole.findOne({
            where: {
                userid
            }
        })
    }

    addUserRole(data) {
        return UserRole.create(data);
    }

    async updateRoleUser(userid, role_id){
        const currentRole = await this.getUserRole(userid);
        if (currentRole) {
            return currentRole.update({ role_id });
        } else {
            return this.addUserRole({ userid, role_id })
        }
    }

    async checkPermission(userid, permission_key) {
        const [dataRole, permissionData] = await Promise.all([
            this.getUserRole(userid),
            this.getPermissionByKey(permission_key)
        ]);
        if (!dataRole || !permissionData) return false;
        const dataRolePers = await RolePermission.findOne({
            where: {
                role_id: dataRole.id,
                permission_id: permissionData.id
            }
        })

        return dataRolePers ? true : false;
    }

    async updateRolePermission(role_id, listPermission) {
        const oldPermisison = await this.getPermissionOfRole(role_id);
        const oldPermisisonIds = oldPermisison.map(it => it.permission_id);
        oldPermisison.forEach(it => {
            if (!listPermission.includes(it.permission_id)) {
                it.destroy();
            }
        })

        let insertNewPermission = [];
        listPermission.forEach(it => {
            if (!oldPermisisonIds.includes(it)) {
                insertNewPermission.push(
                    this.addRolePermission({ role_id, permission_id: it })
                )
            }
        })

        return listPermission;
    }

    async getAllPermission() {
        return Permissions.findAll();
    }

}

export default new MidPermission();