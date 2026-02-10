import { TotpAccount } from '../../domain/entities/account';
import { AccountModel } from './models/totpAccount';
import pino from 'pino';
const logger = pino();

export class TotpAccountMongoRepository   {
    async store(totpAccount: TotpAccount): Promise<boolean> {
        try {
            await AccountModel.create(totpAccount);
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
}
