import { provideTotpAccountRepository } from '../repository/provideTotpAccountRepository';
import {StoreTotpAccountService} from "../../domain/service/totp-account-service";

export const totpAccount= (): StoreTotpAccountService => {
    const repository = provideTotpAccountRepository();
    return new StoreTotpAccountService(repository)
};
