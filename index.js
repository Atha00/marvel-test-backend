require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const apiKey = process.env.apiKey;

// console.log(apiKey);

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue LOL !" });
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" + apiKey
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${req.query.limit}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/characters/:characterID", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterID}?apiKey=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get("/comics/:characterID", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterID}?apiKey=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log("Serveur started");
});
