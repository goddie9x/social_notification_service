const jwt = require('jsonwebtoken');
const JWT_SECRET = Buffer.from(process.env.JWT_SECRET, 'base64');

const authMiddleware = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            const currentUser = jwt.verify(socket.handshake.query.token, JWT_SECRET, { algorithms: ['HS256'] });
            socket.currentUser = currentUser;
            next();
        } catch (error) {
            next(error);
        }
    }
    else {
        next(new Error('Authentication error'));
    }
}

module.exports = authMiddleware;