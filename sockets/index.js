const authMiddleware = require('../utils/middlewares/authSocketMiddleware');

const socketBuilder = (io) => {
    io.use(authMiddleware);
    io.on("connection", (socket) => {
        socket.join(socket.currentUser.userId);
        console.log(socket.currentUser.userId);
        console.log(`Socket joined rooms: ${Array.from(socket.rooms).join(', ')}`);
    });
}

module.exports = socketBuilder;