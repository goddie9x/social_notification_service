require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const socketBuilder = require('./sockets/index');
const activeNotificationServiceConsumer = require('./kafka/consumer');
const router = require('./routes');
const notificationService = require('./services/notificationService');
const getAuthAndPutCurrentUserAuthToBody = require('./utils/middlewares/getAuthAndPutCurrentUserAuthToBody');
const connectToDiscoveryServer = require('./utils/configs/discovery')
const mapHealthStatusRoute = require('./utils/eureka/healthStatusRoute');

const PORT = process.env.PORT || 3002;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

activeNotificationServiceConsumer();
socketBuilder(io);
app.use(express.json());
app.use(getAuthAndPutCurrentUserAuthToBody);
notificationService.setSocket(io);
mapHealthStatusRoute(router);
app.use(process.env.APP_PATH || '/api/v1/notifications', router);
connectToDiscoveryServer();

httpServer.listen(PORT);