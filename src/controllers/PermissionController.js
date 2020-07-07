import { MidDistributor, MidPermission } from '../models/middle';

class PermissionController {
    async allPermission(req, res) {
        const { userData } = req;
        if (userData.type !== 1) {
            const roleData = await MidPermission.getRoleDefaultDistributor();
            return !roleData ? [] : MidPermission.getPermissionDataOfRole(roleData.id);
        } else {
            return MidPermission.getAllPermission();
        }
    }

    getAllRole(req, res) {
        const { userData } = req;
        return MidPermission.getRoles(userData.distributor_id)
    }

    addNewRole(req, res) {
        const { userData } = req;
        const dataRole = req.body;
        if (userData.type !== 1) {
            dataRole.distributor_id = userData.distributor_id;
        }

        return MidPermission.addRoleUserManagement(dataRole);
    }

    removeRole(req, res) {
        const { userData } = req;
        const { role_id } = req.body;
        return MidPermission.removeRole(role_id, userData.distributor_id);
    }

    updateUserRole(req, res) {
        const { userid, role_id } = req.body;
        return MidPermission.updateRoleUser(userid, role_id);
    }

    setRolePermission(req, res) {
        const { role_id, permissions } = req.body;
        return MidPermission.updateRolePermission(role_id, permissions);
    }

    getAllUserManagement(req, res) {
        const { userData } = req;
        if (userData.type !== 1) {
            return MidDistributor.getAllUserOfDistributor(userData.distributor_id);
        }
        return MidDistributor.getUserManagementSystem();
    }
}

export default new PermissionController();