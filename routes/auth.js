const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //Check if user exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  //Check if valid password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }
  res.send(true);
});

function validateData(data) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
}

module.exports = router;
