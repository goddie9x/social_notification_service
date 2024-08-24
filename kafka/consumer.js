const { activeServiceConsumer } = require('../utils/kafka');
const notificationService = require('../services/notificationService');
const { KAFKA_TOPICS } = require('../utils/constants/kafka');
const { kafkaClient } = require('./init');

const activeNotificationServiceConsumer = () => {
    activeServiceConsumer({
        kafkaClient,
        serviceInstance: notificationService,
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST
    });
}

module.exports = activeNotificationServiceConsumer;