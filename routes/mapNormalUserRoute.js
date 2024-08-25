const notificationController = require('../controllers/notificationController');

const mapNormalUserRoute = router =>{
    router.get('/',notificationController.index);
}

module.exports = mapNormalUserRoute;