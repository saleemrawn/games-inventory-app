const db = require("../db/queries/gamesQueries");
const dbFilters = require("../db/queries/filtersQueries");

async function getAllGames(req, res) {
  const games = await db.getAllGames();
  const filters = await dbFilters.getAllFilters();
  res.render("gamesList", { title: "Dashboard", games: games, filters: filters });
}

module.exports = { getAllGames };
