const mongoose = require("mongoose");
const Joi = require("joi");

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    stock: { type: Boolean, required: true },
    description: { type: String, required: true, minlength: 10 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Joi Validation Function
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(3).max(50).required(),
    stock: Joi.boolean().required(),
    description: Joi.string().min(10).required(),
    image: Joi.string().uri().required(),
  });

  return schema.validate(data);
};

// Export Model and Validation Function
const productModel = mongoose.model("product", productSchema);
module.exports = { productModel, validateProduct };
