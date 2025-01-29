const mongoose = require("mongoose");
const Joi = require("joi");

// Delivery Schema
const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    deliveryBoy: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: [
        "pending",
        "dispatched",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      required: true,
    },
    trackingURL: { type: String, required: true, trim: true },
    estimatedDeliveryTime: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Joi Validation Function
const validateDelivery = (data) => {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),
    deliveryBoy: Joi.string().min(3).max(50).required(),
    status: Joi.string()
      .valid(
        "pending",
        "dispatched",
        "out_for_delivery",
        "delivered",
        "cancelled"
      )
      .default("pending"),
    trackingURL: Joi.string().uri(),
    estimatedDeliveryTime: Joi.number().min(1).required(),
  });

  return schema.validate(data);
};

// Export Model and Validation Function
const deliveryModel = mongoose.model("delivery", deliverySchema);
module.exports = { deliveryModel, validateDelivery };
