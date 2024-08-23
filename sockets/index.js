const authMiddleware = require('../middlewares/authMiddleware');

const socketBuilder = (io) => {
    io.use(authMiddleware);
    io.on("connection", (socket) => {
        console.log('new connect', socket);
        socket.join(socket.currentUser.userId);
    });
}

module.exports = socketBuilder;