const { Genre, validateData } = require("../models/genre");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  console.log(genres);
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  //Check if a genre with the given id exists
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("404:Not found");
    return;
  }
  res.send(genre);
});

router.post("/", async (req, res) => {
  //Validate with joi
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let newGenre = new Genre({ name: req.body.name });
  newGenre = await newGenre.save();
  res.send(newGenre);
});

router.put("/:id", async (req, res) => {
  //Validate data
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre) {
    res.status(404).send("404:Not found");
    return;
  }
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    res.status(404).send("404:Not found");
    return;
  }

  res.send(genre);
});

module.exports = router;
