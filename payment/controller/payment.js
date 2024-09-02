import Razorpay from "razorpay";
import { Utility } from "../Utility.js";
import { PaymentModel } from "../models/payment.model.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  const { userId, subscriptionId, amount, currency } = req?.body;
  if (
    Utility.isEmpty(amount) ||
    Utility.isEmpty(currency) ||
    Utility.isEmpty(userId) ||
    Utility.isEmpty(subscriptionId)
  ) {
    res.status(404).json({ message: "required parameters not found" });
  } else {
    const receiptId = Utility.getUniqueId();
    instance.orders
      .create({
        amount: amount,
        currency: currency,
        receipt: receiptId,
      })
      .then(async (order) => {
        const paymentModel = new PaymentModel({
          userId: userId,
          subscriptionId: subscriptionId,
          amount: amount,
          receiptId: order?.id,
          status: order?.status,
          currency: currency,
        });
        await paymentModel.save();
        res.status(200).json({ ...order });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
};
export const verifyOrder = (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  if (
    Utility.isEmpty(order_id) ||
    Utility.isEmpty(payment_id) ||
    Utility.isEmpty(signature)
  ) {
    res.status(400).json({ message: "required parameters not found" });
  }
  const generatedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");
  instance.orders
    .fetch(order_id)
    .then((order) => {
      if (Utility.isNotEmpty(order)) {
        if (generatedSignature === signature) {
          PaymentModel.findOneAndUpdate(
            { receipt: order_id },
            { status: order.status }
          )
            .then(() => {
              res.json({
                status: "success",
                message: "Payment verified successfully",
              });
            })
            .catch((err) => {
              res
                .status(400)
                .json({ message: "Unable to update payment status" });
            });
        } else {
          res
            .status(400)
            .json({ status: "failure", message: "Invalid signature" });
        }
      } else {
        res.status(400).json({ message: "Order not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "Invalid order id" });
    });
};
