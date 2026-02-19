import { TotpAccount } from "../entities/account";
import { StoreTotpAccountRepository } from "../contracts/store-totp-account-repository";

export interface TotpAccountService {
    execute(account: TotpAccount): Promise<boolean>;
};

export class StoreTotpAccountService implements TotpAccountService {
    constructor(
        private readonly repository: StoreTotpAccountRepository
    ) {}

    async execute(account: TotpAccount): Promise<boolean> {
        return this.repository.store(account);
    };
}
