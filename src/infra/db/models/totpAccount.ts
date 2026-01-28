import mongoose from "mongoose";

export const TotpAccountSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    issuer: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    accountID: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    otpAuthUri: {
        type: String,
        required: false,
    },
    qrCodeBase64: {
        type: String,
        required: false,
    },
});

export const AccountModel = mongoose.model("Accounts", TotpAccountSchema);
