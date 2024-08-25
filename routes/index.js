const router = require('express').Router();
const mapNormalUserRoute = require('./mapNormalUserRoute');

mapNormalUserRoute(router);

module.exports = router;
