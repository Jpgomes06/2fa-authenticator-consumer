export type TotpAccount = {
    label:string,
    issuer:string,
    userID:string,
    accountID:string,
    secret:string,
    createdAt:string
    otpAuthUri?:string,
    qrCodeBase64?:string,
};
