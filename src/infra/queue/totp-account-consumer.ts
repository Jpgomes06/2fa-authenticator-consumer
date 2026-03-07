import {ChannelModel, Channel, connect, ConsumeMessage} from 'amqplib';
import { TotpAccount } from '../../domain/entities/account';
import { TotpAccountService } from '../../domain/service/totp-account-service';
import pino from 'pino';
const logger = pino();

export class TotpConsumer {
    private connection?: ChannelModel;
    private channel?: Channel;
    private readonly queueName = process.env.QUEUE_NAME || 'otp-accounts';

    constructor(private readonly totpAccountService: TotpAccountService) {}

    async start(): Promise<void> {
        try {
            this.connection = await connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: true });
            await this.channel.consume(this.queueName, async (message) => {
                if (message) {
                    await this.processMessage(message);
                }
            });
        } catch (error) {
            logger.error({ err: error }, '[Consumer] error');
        }
    }

    private async processMessage(message: ConsumeMessage): Promise<void> {
        try {
            const payload = JSON.parse(message.content.toString());
            const account: TotpAccount = payload.totpAccount;
            const success = await this.totpAccountService.execute(account);

            if (success) {
                this.channel?.ack(message);
                return
            }
            this.channel?.nack(message, false, true);
        } catch (error) {
            this.channel?.nack(message, false, false);
        }
    }
}
