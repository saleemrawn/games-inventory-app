const { Router } = require("express");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const errorRouter = Router();

errorRouter.get("/", (req, res) => {
  throw new CustomNotFoundError("Page not found");
});

module.exports = errorRouter;
