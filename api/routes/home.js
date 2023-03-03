const express = require("express");
const router = express.Router();
const { API_KEY } = require("../config/envs");
const axios = require("axios");

router.get("/", (req, res) => {
  axios
    .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
