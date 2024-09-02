import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema([{
    userId: { type: mongoose.Types.ObjectId },
    amount: {type: Number},
    status: {type: String},
    currency: { type: String },
    receiptId: {type: mongoose.Types.ObjectId},
    createdAt: {type: Date, default: Date.now},
    subscriptionPlan: {type: mongoose.Types.ObjectId}
}]);

export const PaymentModel = mongoose.model('payment', paymentSchema);

