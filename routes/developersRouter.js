const { Router } = require("express");
const developersRouter = Router();
const developersControllers = require("../controllers/developersControllers");

developersRouter.get("/", developersControllers.getAllDevelopers);
developersRouter.get("/create", developersControllers.getCreateDeveloper);
developersRouter.get("/:developerId", developersControllers.getGamesByDeveloperId);
developersRouter.get("/edit/:developerId", developersControllers.getUpdateDeveloperById);

developersRouter.post("/create", developersControllers.developersValidators, developersControllers.createDeveloper);
developersRouter.post("/edit/:developerId", developersControllers.developersValidators, developersControllers.updateDeveloper);
developersRouter.post("/delete/:developerId", developersControllers.deleteDeveloper);

module.exports = developersRouter;
