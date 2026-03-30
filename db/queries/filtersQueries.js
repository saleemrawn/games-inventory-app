const pool = require("../pool");

async function getAllFilters() {
  const { rows } = await pool.query(`
    WITH active_genres AS (
      SELECT ge.id, ge.name, COUNT(gg.game_id) AS number_of_games
      FROM genres AS ge
      LEFT JOIN games_genres AS gg ON ge.id = gg.genre_id
      GROUP BY ge.id
      HAVING COUNT(gg.game_id) > 0
    ),
    active_platforms AS (
          SELECT pl.id, pl.name, COUNT(gp.game_id) AS number_of_games
          FROM platforms AS pl
          LEFT JOIN games_platforms AS gp ON pl.id = gp.platform_id
          GROUP BY pl.id
          HAVING COUNT(gp.game_id) > 0
    ),
    active_modes AS (
          SELECT mo.id, mo.name, COUNT(gm.game_id) AS number_of_games
          FROM modes AS mo
          LEFT JOIN games_modes AS gm ON mo.id = gm.mode_id
          GROUP BY mo.id
          HAVING COUNT(gm.game_id) > 0
    )

    SELECT 'genre' AS category, id, name, number_of_games FROM active_genres
    UNION ALL
    SELECT 'platform', id, name, number_of_games FROM active_platforms
    UNION ALL
    SELECT 'mode', id, name, number_of_games FROM active_modes
    WHERE number_of_games > 0
    ORDER BY category, number_of_games DESC;
    `);
  return rows;
}

module.exports = { getAllFilters };
