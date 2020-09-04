const { Customer, validateData } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  //Validate the data using Joi
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  //If validated, save to database
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer) {
    res.status(404).send("404:Not found");
    return;
  }
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res.status(404).send("404: Not found");
  }
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send("404:Not found");
    return;
  }
  res.send(customer);
});

module.exports = router;
