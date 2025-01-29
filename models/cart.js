const mongoose = require("mongoose");
const Joi = require("joi");

// Cart Schema
const cartSchema = new mongoose.Schema({
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
});

// Joi Validation Function
const validateCart = (data) => {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    products: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

const cartModel = mongoose.model("cart", cartSchema);
module.exports = { cartModel, validateCart };
