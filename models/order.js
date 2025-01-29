const mongoose = require("mongoose");
const Joi = require("joi");

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    address: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
      required: true,
    },
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "delivery",
      required: true,
    },
  },
  { timestamps: true }
);

// Joi Validation Function
const validateOrder = (data) => {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    products: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required(),
    address: Joi.string().min(5).required(),
    status: Joi.string()
      .valid("pending", "processing", "shipped", "delivered", "cancelled")
      .default("pending"),
    payment: Joi.string().hex().length(24).required(),
    delivery: Joi.string().hex().length(24).required(),
  });

  return schema.validate(data);
};

// Export Model and Validation Function
const orderModel = mongoose.model("order", orderSchema);
module.exports = { orderModel, validateOrder };
