const notificationController = require('../controllers/notificationController');

const mapNormalUserRoute = router =>{
    router.put('/read',notificationController.read);
    router.get('/',notificationController.index);
}

module.exports = mapNormalUserRoute;