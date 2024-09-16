const { activeServiceConsumer } = require('../utils/kafka/consumer');
const notificationService = require('../services/notificationService');
const { KAFKA_TOPICS } = require('../utils/constants/kafka');

const activeNotificationServiceConsumer = async () => {
    activeServiceConsumer({
        serviceInstance: notificationService,
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST
    });
}

module.exports = activeNotificationServiceConsumer;