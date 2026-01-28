import { TotpAccount } from '../../domain/entities/account';
import { AccountModel } from './models/totpAccount';

export class TotpAccountMongoRepository   {
    async store(totpAccount: TotpAccount): Promise<boolean> {
        try {
            await AccountModel.create(totpAccount);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
