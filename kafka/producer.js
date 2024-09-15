const { sendNewSocketMessageToSocketGateway } = require('../utils/kafka/producer');
const { NOTIFICATION_CHANNEL } = require('../utils/constants/socketChannel');

const pushNewNotificationToSocketGateway = ({ message, roomId }) => {
    sendNewSocketMessageToSocketGateway({
        namespace: NOTIFICATION_CHANNEL.NAMESPACE,
        event: NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION,
        message,
        roomId
    });
}

module.exports = { pushNewNotificationToSocketGateway }
