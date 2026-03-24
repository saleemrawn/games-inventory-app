const { validationResult, matchedData, body } = require("express-validator");
const db = require("../db/queries/platformsQueries");

const platformsValidators = [
  body("platformName")
    .trim()
    .notEmpty()
    .withMessage("Platform name is required")
    .isAlphanumeric(undefined, { ignore: "/\s+/i" })
    .withMessage("Platform name can only contain letters and numbers"),
];

async function getAllPlatforms(req, res) {
  const platforms = await db.getAllPlatforms();
  res.render("platformsList", { title: "Platforms", platforms: platforms });
}

async function getGamesByPlatformId(req, res) {
  const games = await db.getGamesByPlatformId(req.params.platformId);
  const platformName = games[0].platforms[0].name;

  res.render("gamesList", { title: platformName, games: games });
}

function getCreatePlatform(req, res) {
  res.render("createPlatform", { title: "Add Platform" });
}

async function getUpdatePlatform(req, res) {
  const [platform] = await db.getPlatformById(req.params.platformId);
  res.render("updatePlatform", { title: "Update Platform", platform: platform });
}

async function createPlatform(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).render("createPlatform", { title: "Create Platform", errors: errors.array() });
  }

  const { platformName } = matchedData(req);
  await db.createPlatform(platformName);
  res.redirect("/platforms");
}

async function updatePlatform(req, res) {
  const [platform] = await db.getPlatformById(req.params.platformId);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).render("updatePlatform", { title: "Update Platform", platform: platform, errors: errors.array() });
  }

  const { platformName } = matchedData(req);
  await db.updatePlatform({ platformId: req.body.platformId, platformName: platformName });
  res.redirect("/platforms");
}

async function deletePlatform(req, res) {
  await db.deletePlatform(req.params.platformId);
  res.redirect("/platforms");
}

module.exports = {
  getAllPlatforms,
  getGamesByPlatformId,
  getCreatePlatform,
  getUpdatePlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
  platformsValidators,
};
