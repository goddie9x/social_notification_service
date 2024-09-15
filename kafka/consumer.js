const { activeServiceConsumer, createTopicIfNotExists } = require('../utils/kafka/consumer');
const notificationService = require('../services/notificationService');
const { KAFKA_TOPICS } = require('../utils/constants/kafka');
const { kafkaClient } = require('../utils/kafka/producer');

const initKafkaTopics = async () => {
    try {
        await createTopicIfNotExists({
            topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST,
            client: kafkaClient
        })
    } catch (error) {
        console.log(error);
    }
}


const activeNotificationServiceConsumer = async () => {
    await initKafkaTopics();
    activeServiceConsumer({
        kafkaClient,
        serviceInstance: notificationService,
        topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST
    });
}

module.exports = activeNotificationServiceConsumer;