const mongoose = require("mongoose");
const { Rental, validateData } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const Fawn = require("fawn");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  //Validate using joi that both movieId and customerId exist
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req, body.customerId)) {
    res.status(400).send("Invalid customer");
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req, body.movieId)) {
    res.status(400).send("Invalid customer");
    return;
  }
  const movie = await Movie.findById(req.body.movieId);
  const customer = await Customer.findById(req.body.customerId);
  if (!movie || !customer) {
    res
      .status(404)
      .send("404 error: Either the movie or the customer does not exist");
    return;
  }
  if (movie.numberInStock === 0) {
    res.status(400).send("Movie not in stock!!!");
    return;
  }
  console.log(movie, customer);
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();
  movie.numberInStock--;
  await movie.save();

  res.send(rental);
});

module.exports = router;
