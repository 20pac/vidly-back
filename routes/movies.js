const mongoose = require("mongoose");
const { Movie, validateData } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/", async (req, res) => {
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("Invalid Genre");
    return;
  }
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("Invalid Genre");
    return;
  }
  let movie = await Movie.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) {
    res.status(404).send("404:Not found");
    return;
  }
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  let movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    res.status(404).send("404: Not found");
  }
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).send("404: Not found");
  }
  res.send(movie);
});

module.exports = router;
