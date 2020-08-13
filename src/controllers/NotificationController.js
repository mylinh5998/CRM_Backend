import { MidNotification } from '../models/middle';
import {response} from 'express';
import { ResponseError, ResponseSuccess } from '../libs/BaseReponse'
import { Notification } from '../models/core';

class NotificationController{
     getNoti(req,res) {
        let dataQuery =req.query;
        
        return MidNotification.getNoti(dataQuery);
        

    }
    searchID(req,res){
        let idInfo = req.query;
        const {UserData} = req;
        return MidNotification.searchID(UserData.distributor_id)
    }

}
export default new NotificationController();