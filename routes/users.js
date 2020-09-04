const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateData } = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //Check if user exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
