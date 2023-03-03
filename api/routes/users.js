const express = require("express");
const { User } = require("../models");
const router = express.Router();
const { generateToken } = require("../config/tokens");
const { validateUser } = require("../middlewares/auth");

router.get("/allusers", (req, res) => {
  User.findAll().then((users) => res.status(201).send(users));
});

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      const payload = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      };
      const newToken = generateToken(payload);
      res.cookie("token", newToken);
      res.send(payload);
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

module.exports = router;
