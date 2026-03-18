const { Router } = require("express");
const developersRouter = Router();
const developersControllers = require("../controllers/developersControllers");

developersRouter.get("/", developersControllers.getAllDevelopers);
developersRouter.get("/:developerId", developersControllers.getGamesByDeveloperId);

module.exports = developersRouter;
