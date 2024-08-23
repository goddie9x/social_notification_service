const kafka = require('kafka-node');
const { createTopicIfNotExists } = require('../utils/kafka');
const { KAFKA_TOPICS } = require('../constants/kafka');

const kafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_CLIENT_HOST });
const KafkaConsumer = kafka.Consumer;

const initTopics = async () => {

    try {
        await createTopicIfNotExists({
            topic: KAFKA_TOPICS.NOTIFICATION_TOPIC.REQUEST,
            client: kafkaClient
        })
    } catch (error) {
        console.log(error);
    }
}
initTopics();

module.exports = { kafkaClient, KafkaConsumer };

