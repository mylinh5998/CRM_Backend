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
        const levelLogin = Distributor.level

        let notification = await Notification.findAll({
            where: { levelLogin = notification.level}
        })
        
        return{
            notification : notification,
            levelAdmin : notification.level
        }
    }

}
 export default new MidNotification();