const { Router } = require("express");
const platformsRouter = Router();
const platformsControllers = require("../controllers/platformsControllers");

platformsRouter.get("/", platformsControllers.getAllPlatforms);
platformsRouter.get("/create", platformsControllers.getCreatePlatform);
platformsRouter.get("/:platformId", platformsControllers.getGamesByPlatformId);
platformsRouter.get("/edit/:platformId", platformsControllers.getUpdatePlatform);

platformsRouter.post("/create", platformsControllers.platformsValidators, platformsControllers.createPlatform);
platformsRouter.post("/edit/:platformId", platformsControllers.platformsValidators, platformsControllers.updatePlatform);
platformsRouter.post("/delete/:platformId", platformsControllers.deletePlatform);

module.exports = platformsRouter;
