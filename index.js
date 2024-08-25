require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const socketBuilder = require('./sockets/index');
const activeNotificationServiceConsumer = require('./kafka/consumer');
const router = require('./routes');
const notificationService = require('./services/notificationService');
const getAuthAndPutCurrentUserAuthToBody = require('./utils/middlewares/getAuthAndPutCurrentUserAuthToBody');

const PORT = process.env.PORT || 3002;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

activeNotificationServiceConsumer();

socketBuilder(io);

app.use(express.json());
app.use(getAuthAndPutCurrentUserAuthToBody);
notificationService.setSocket(io);
app.use('/api/v1/notifications', router);

httpServer.listen(PORT);