const mongoose = require("mongoose");
const Joi = require("joi");

// Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      enum: ["credit_card", "debit_card", "UPI", "net_banking", "cod"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    transactionId: { type: String, unique: true, required: true, trim: true },
  },
  { timestamps: true }
);

// Joi Validation Function
const validatePayment = (data) => {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    amount: Joi.number().min(0).required(),
    method: Joi.string().required(),
    status: Joi.string(),
    transactionId: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Export Model and Validation Function
const paymentModel = mongoose.model("payment", paymentSchema);
module.exports = { paymentModel, validatePayment };
