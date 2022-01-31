const mongoose = require("mongoose");
const validator = require("validator");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const passwordComplexity = require("joi-password-complexity");

const complexityOption = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    maxlength: 1024,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity(complexityOption).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
