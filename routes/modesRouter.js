const { Router } = require("express");
const modesRouter = Router();
const modesControllers = require("../controllers/modesControllers");

modesRouter.get("/", modesControllers.getAllModes);
modesRouter.get("/:modeId", modesControllers.getGamesByModeId);

module.exports = modesRouter;
