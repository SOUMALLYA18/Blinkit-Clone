const mongoose = require("mongoose");
const Joi = require("joi");

// Address Schema
const AddressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 50,
    trim: true,
  },
  zip: {
    type: Number,
    required: true,
    min: 10000,
    max: 999999,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 50,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 255,
    trim: true,
  },
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
    },
    addresses: {
      type: [AddressSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Joi Validation Function
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid email format",
      }),
    password: Joi.string().min(6).required(),
    phone: Joi.string().length(10).pattern(/^\d+$/).required(),
    addresses: Joi.array().items(
      Joi.object({
        state: Joi.string().required(),
        zip: Joi.number().min(10000).max(99999).required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
      })
    ),
  });

  return schema.validate(data);
};

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel, validateUser };
