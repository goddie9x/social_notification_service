const { activeServiceConsumer, createTopicIfNotExists } = require('../utils/kafka/consumer');
const notificationService = require('../services/notificationService');
const { KAFKA_TOPICS } = require('../utils/constants/kafka');

const activeNotificationServiceConsumer = async () => {
    await createTopicIfNotExists([{ topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST, waitForLeaders: false, numPartitions: 1, replicationFactor: 1 }]);
    activeServiceConsumer({
        serviceInstance: notificationService,
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST
    });
}

module.exports = activeNotificationServiceConsumer;