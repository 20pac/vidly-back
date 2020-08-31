const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

let genres = [
  {
    id: 1,
    name: "Thriller",
  },
  {
    id: 2,
    name: "Fantasy",
  },
  {
    id: 3,
    name: "Action",
  },
  {
    id: 4,
    name: "Thriller",
  },
];

app.get("/", (req, res) => {
  res.send("Hoooooha");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  //Check if a genre with the given id exists
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("404:Not found");
    return;
  }
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  //Validate with joi
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  genres.push({
    id: genres.length + 1,
    name: req.body.name,
  });
  res.send(genres);
});

app.put("/api/genres/:id", (req, res) => {
  //Check if a genre with the given id exists
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("404:Not found");
    return;
  }
  //Validate data
  const result = validateData(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  //If everything fine, update data
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  //Check if a genre with the given id exists
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("404:Not found");
    return;
  }
  //Remove the given element
  genres.splice(genres.indexOf(genre), 1);
  res.send(genres);
});

function validateData(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(data);
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
