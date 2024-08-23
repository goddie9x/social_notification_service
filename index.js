require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const socketBuilder = require('./sockets/index');
const activeNotificationServiceConsumer = require('./kafka/consumer');
const notificationService = require('./services/notificationService');

const PORT = process.env.PORT || 3002;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

activeNotificationServiceConsumer();

socketBuilder(io);
notificationService.setSocket(io);
httpServer.listen(PORT);