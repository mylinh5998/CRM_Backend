import { MidUser } from '../models/middle';

class AuthController {
    login(req, res) {
        return MidUser.loginUser(req.body);
    }
}

export default new AuthController();