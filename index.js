const express = require("express");
const mongoose = require("mongoose");
// const Joi = require("joi");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

//Connect to the database
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb...."))
  .catch((err) => console.error("Could not connect to mongodb", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Hoooooha");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
