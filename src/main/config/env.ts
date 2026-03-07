export default {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/totp-accounts',
    rabbitUrl: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    queueName: process.env.QUEUE_NAME || 'otp-accounts',
};
