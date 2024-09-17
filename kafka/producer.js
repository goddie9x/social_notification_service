const { sendNewMessageToSocketGateway } = require('../utils/kafka/producer');
const { NOTIFICATION_CHANNEL } = require('../utils/constants/socketChannel');

const pushNewNotificationToSocketGateway = async ({ message, roomId }) => {
    await sendNewMessageToSocketGateway({
        namespace: NOTIFICATION_CHANNEL.NAMESPACE,
        event: NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION,
        message,
        roomId
    });
}

module.exports = { pushNewNotificationToSocketGateway }
