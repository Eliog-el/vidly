const mongoose = require("mongoose");
const validator = require("validator");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 225,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
