const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: new mongoose.Schema(
    {
      name: {
        type: String,
        min: 1,
        max: 50,
        required: true,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
      phone: {
        type: String,
        min: 5,
        required: true,
      },
    },
    {
      required: true,
    }
  ),
  movie: new mongoose.Schema({
    title: {
      type: String,
      required: true,
      min: 1,
      max: 250,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      required: true,
    },
  }),
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateData(data) {
  const schema = Joi.object({
    movieId: Joi.string().required(),
    customerId: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports.Rental = Rental;
module.exports.validateData = validateData;
