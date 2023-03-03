const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const favoritesRouter = require("./favorites");
const moviesRouter = require("./movies");
const showsRouter = require("./shows");
const homeRouter = require("./home");
const { validateUser } = require("../middlewares/auth");

router.use("/users", usersRouter);
router.use("/favorites", validateUser, favoritesRouter);
router.use("/movies", moviesRouter);
router.use("/shows", showsRouter);
router.use("/home", homeRouter);

module.exports = router;
