const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateData(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(data);
}

module.exports.Movie = Movie;
module.exports.validateData = validateData;
