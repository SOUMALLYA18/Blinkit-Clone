const mongoose = require("mongoose");
const Joi = require("joi");

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

// Joi Validation Function
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(data);
};

// Export Model and Validation Function
const categoryModel = mongoose.model("category", categorySchema);
module.exports = { categoryModel, validateCategory };
