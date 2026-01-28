import { totpAccount } from "../service/totpAccount-service";
import {TotpConsumer} from "../../infra/queue/totp-account-consumer";

export const totpAccountConsumer = (): TotpConsumer => {
    const service = totpAccount();
    return new TotpConsumer(service);
};
