const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50,
  },
  date: { type: Date, default: Date.now },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenres(genre, customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenres;
