import { Notification,Distributor } from '../core';
// import { level } from 'winston';

class MidNotification{
    async getNoti() {
        let data = await Notification.findAll({
        })
        return{
            data: data
        }
     }
    async searchID(idInfo){
        //checklevel
        //const levelLogin = Distributor.level
        let levelLogi = await Distributor.findOne({
            where : {id : idInfo.id},
        })
        let notification = await Notification.findAll({
            where: { level : levelLogi.level },
        });

        return {
            levelDistributor: levelLogi.level,
            Notificationn: notification
         
        }
       
        

    }
}
 export default new MidNotification(); 