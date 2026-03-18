const { Router } = require("express");
const genresRouter = Router();
const genresControllers = require("../controllers/genresControllers");

genresRouter.get("/", genresControllers.getAllGenres);
genresRouter.get("/:genreId", genresControllers.getGamesByGenreId);

module.exports = genresRouter;
