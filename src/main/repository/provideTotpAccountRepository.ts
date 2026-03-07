import {TotpAccountMongoRepository} from "../../infra/db/mongo-repository";

export const provideTotpAccountRepository = (): TotpAccountMongoRepository => {
    return new TotpAccountMongoRepository();
};
