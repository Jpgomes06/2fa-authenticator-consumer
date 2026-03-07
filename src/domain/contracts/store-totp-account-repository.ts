import { TotpAccount } from "../entities/account";

export interface StoreTotpAccountRepository {
    store(account: TotpAccount): Promise<boolean>;
};
