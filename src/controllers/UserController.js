import { MidUser } from '../models/middle';

class UserController {
    getUserInfo(req, res) {
        return req.userData;
    }

    async changePassword(req, res) {
        const userData = req.userData;
        const { oldPassword, password } = req.body;
        return MidUser.updatePassword(oldPassword, password, userData);
    }

    async updateProfile(req, res) {
        const userData = req.userData;
        const profile = req.body;
        return MidUser.updateProfile(profile, userData);
    }
}

export default new UserController();