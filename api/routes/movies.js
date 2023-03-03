const express = require("express");
const router = express.Router();
const { API_KEY } = require("../config/envs");
const axios = require("axios");

router.get("/", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((error) => console.error(error));
});

router.get("/main", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((error) => console.error(error));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => console.error(error));
});

router.get("/search/:query", (req, res) => {
  const { query } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
    )
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
