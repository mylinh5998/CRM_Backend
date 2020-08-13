import { UserDistributor } from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';

class MidUser {
   

    async loginUser(credentials) {
        const { email, password } = credentials;
        if (!email) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }

        if (!password) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }

        const userData = await this.getUserByEmail(email);
        if (!userData) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }

        // check account status is Active
        if (userData.status !== 1) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_STATUS);
        }

        const token = await generateToken({ userid: userData.id, email: email });
        return {
            token
            //userData
        }
    }

    
}

export default new MidUser()