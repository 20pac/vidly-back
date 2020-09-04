const mongoose = require("mongoose");
const Joi = require("joi");

//Define mongoose scehma
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});
//Compile the above schema into a model, which gives a class
const Genre = mongoose.model("Genre", genreSchema);

function validateData(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(data);
}

module.exports.Genre = Genre;
module.exports.validateData = validateData;
module.exports.genreSchema = genreSchema;
