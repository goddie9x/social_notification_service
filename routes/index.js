const router = require('express').Router();
const mapNormalUserRoute = require('./mapNormalUserRoute');
const mapHealthStatusRoute = require('../utils/eureka/healthStatusRoute');

mapHealthStatusRoute(router);
mapNormalUserRoute(router);

module.exports = router;
