const express = require("express");
const router = express.Router();
const { Favorite, User } = require("../models");
// const { API_KEY } = require("../config/envs");
// const axios = require("axios");

router.get("/", (req, res) => {
  const userEmail = req.user.email;
  User.findOne({ where: { email: userEmail } })
    .then((foundUser) => {
      Favorite.findAll({ where: { userId: foundUser.id } }).then((favorites) =>
        res.send(favorites)
      );
    })
    .catch((error) => console.error(error));
});

router.post("/add", (req, res) => {
  const { mediaId, mediaType, userEmail } = req.body;

  User.findOne({ where: { email: userEmail } })
    .then((foundUser) => {
      Favorite.findOrCreate({
        where: { mediaId, mediaType, userId: foundUser.id },
      }).then(([favorite, created]) => {
        if (!created) return res.status(400).send("Already favorited");
        // favorite.setUser(foundUser);
        return res.status(201).send(favorite);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

router.delete("/:mediaId", (req, res) => {
  const userEmail = req.user.email;
  const { mediaId } = req.params;

  let deletedItem;
  User.findOne({ where: { email: userEmail } })
    .then((foundUser) => {
      Favorite.findOne({ where: { mediaId, userId: foundUser.id } }).then(
        (foundItem) => {
          deletedItem = foundItem;
          Favorite.destroy({
            where: { mediaId },
          }).then(() => res.send(deletedItem));
        }
      );
    })
    .catch((error) => console.error(error));
});

module.exports = router;
