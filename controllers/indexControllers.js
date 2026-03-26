const db = require("../db/queries/gamesQueries");
const CustomInternalServerError = require("../errors/CustomInternalServerError");

async function getAllGames(req, res) {
  const games = await db.getAllGames();

  if (!games || games.length === 0) {
    throw new CustomInternalServerError("Could not load games");
  }

  res.render("gamesList", { title: "Dashboard", games: games });
}

module.exports = { getAllGames };
