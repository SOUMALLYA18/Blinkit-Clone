const mongoose = require("mongoose");
const Joi = require("joi");

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["superadmin", "admin", "moderator"],
      default: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

// Joi Validation Function
const validateAdmin = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({ "string.pattern.base": "Invalid email format" }),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid("superadmin", "admin", "moderator")
      .default("admin"),
  });

  return schema.validate(data);
};

// Export Model and Validation Function
const adminModel = mongoose.model("admin", adminSchema);
module.exports = { adminModel, validateAdmin };
