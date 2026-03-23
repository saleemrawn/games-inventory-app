const { Router } = require("express");
const genresRouter = Router();
const genresControllers = require("../controllers/genresControllers");

genresRouter.get("/", genresControllers.getAllGenres);
genresRouter.get("/create", genresControllers.getCreateGenre);
genresRouter.get("/:genreId", genresControllers.getGamesByGenreId);
genresRouter.get("/edit/:genreId", genresControllers.getUpdateGenreById);

genresRouter.post("/create", genresControllers.genreValidators, genresControllers.createGenre);
genresRouter.post("/edit/:genreId", genresControllers.genreValidators, genresControllers.updateGenre);
genresRouter.post("/delete/:genreId", genresControllers.deleteGenre);

module.exports = genresRouter;
