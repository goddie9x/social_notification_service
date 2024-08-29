const notificationService = require('../services/notificationService');
const BasicController = require('../utils/controllers/basicController');

class NotificationController extends BasicController {
    async index(req, res) {
        const payloads = {
            userId: req.body.currentUser.userId, ...req.query
        }
        try {
            const result = await notificationService.getNotificationByUserIdWithPagination(payloads);
            return res.json(result);
        }
        catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async read(req,res){
        const payloads = {
            userId: req.body.currentUser.userId,
            id: req.params.id
        };
        
        try{
            await notificationService.read(payloads);
        }
        catch(error){
            return this.handleResponseError(error);
        }
    }
}

module.exports = new NotificationController();