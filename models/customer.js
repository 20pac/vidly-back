const mongoose = require("mongoose");
const Joi = require("joi");
//Define mongoose schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

//Compile schema into model which gives a class
const Customer = mongoose.model("Customer", customerSchema);

function validateData(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(5).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(data);
}

module.exports.Customer = Customer;
module.exports.validateData = validateData;
