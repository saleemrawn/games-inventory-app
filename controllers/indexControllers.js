const db = require("../db/queries/gamesQueries");

async function getAllGames(req, res) {
  const games = await db.getAllGames();
  res.render("gamesList", { title: "Games Inventory App", games: games });
}

module.exports = { getAllGames };
