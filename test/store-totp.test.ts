import { TotpConsumer } from '../src/infra/queue/totp-account-consumer';
import { TotpAccountService } from '../src/domain/service/totp-account-service';
import { ConsumeMessage } from 'amqplib';

const mockTotpAccount = {
    label: 'Ryan - Adams',
    issuer: 'instagram',
    userID: 'ef4863b4-9673-424f-857d-3d328fe5327c',
    accountID: '427fc975-81f5-4d36-8efc-13b31a33c82d',
    secret: 'SECRET',
    createdAt: '2026-02-09T23:14:15.374Z',
};

const makeServiceStub = (): TotpAccountService => {
    return {
        execute: jest.fn().mockResolvedValue(true),
    };
};

describe('TotpConsumer', () => {
    it('should ACK message when processing succeeds', async () => {
        const serviceStub = makeServiceStub();
        const consumer = new TotpConsumer(serviceStub);
        const channelMock = {
            ack: jest.fn(),
            nack: jest.fn(),
        };
        (consumer as any).channel = channelMock;
        const message: ConsumeMessage = {
            content: Buffer.from(
                JSON.stringify({
                    totpAccount: mockTotpAccount,
                })
            ),
        } as ConsumeMessage;
        await (consumer as any).processMessage(message);
        expect(serviceStub.execute).toHaveBeenCalledWith(mockTotpAccount);
        expect(channelMock.ack).toHaveBeenCalledWith(message);
        expect(channelMock.nack).not.toHaveBeenCalled();
    });
    it('should NACK message when an error occurs', async () => {
        const serviceStub = makeServiceStub();
        const consumer = new TotpConsumer(serviceStub);
        const channelMock = {
            ack: jest.fn(),
            nack: jest.fn(),
        };
        (consumer as any).channel = channelMock;
        const message: ConsumeMessage = {
            content: Buffer.from('invalid-payload'),
        } as ConsumeMessage;
        await (consumer as any).processMessage(message);
        expect(channelMock.nack).toHaveBeenCalledWith(message, false, false);
        expect(channelMock.ack).not.toHaveBeenCalled();
    });
});
