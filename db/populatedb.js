const { argv } = require("node:process");
const { Client } = require("pg");

async function main() {
  const databaseUrl = argv[2];
  const client = new Client({ connectionString: databaseUrl });

  try {
    console.log("Populating database...");
    await client.connect();
    await client.query("BEGIN");

    await client.query(`CREATE TABLE IF NOT EXISTS games (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL UNIQUE,
	release_year INT NOT NULL,
	developer_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);

    await client.query(`CREATE TABLE IF NOT EXISTS genres (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);

    await client.query(`CREATE TABLE IF NOT EXISTS platforms (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);

    await client.query(`CREATE TABLE IF NOT EXISTS developers (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);

    await client.query(`CREATE TABLE IF NOT EXISTS modes (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);

    await client.query(`CREATE TABLE IF NOT EXISTS games_genres (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	game_id INT NOT NULL,
	genre_id INT NOT NULL,
	UNIQUE (game_id, genre_id),
	CONSTRAINT fk_game
		FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_genre
		FOREIGN KEY(genre_id)
		REFERENCES genres(id)
		ON DELETE CASCADE
	);`);

    await client.query(`CREATE TABLE IF NOT EXISTS games_platforms (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	game_id INT NOT NULL,
	platform_id INT NOT NULL,
	UNIQUE (game_id, platform_id),
	CONSTRAINT fk_game
		FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_platform
		FOREIGN KEY(platform_id)
		REFERENCES platforms(id)
		ON DELETE CASCADE
	);`);

    await client.query(`CREATE TABLE IF NOT EXISTS games_modes (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	game_id INT NOT NULL,
	mode_id INT NOT NULL,
	UNIQUE (game_id, mode_id),
	CONSTRAINT fk_game
		FOREIGN KEY(game_id)
		REFERENCES games(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_mode
		FOREIGN KEY(mode_id)
		REFERENCES modes(id)
		ON DELETE CASCADE
	);`);

    await client.query(`
		INSERT INTO developers (name)
		VALUES
		('Valve'),
		('FromSoftware'),
		('Facepunch Studios '),
		('CAPCOM'),
		('Ubisoft Montreal '),
		('Rockstar North '),
		('CD PROJEKT RED '),
		('PUBG Corporation '),
		('Feral Interactive'),
		('Re-Logic '),
		('Bethesda Game Studios '),
		('Aspyr'),
		('Game Science'),
		('SCS Software'),
		('Larian Studios'),
		('Rockstar Games'),
		('ConcernedApe'),
		('Wallpaper Engine Team'),
		('Arrowhead Game Studios')`);

    await client.query(`
		INSERT INTO genres (name)
		VALUES
		('Action'),
		('Casual'),
		('Adventure'),
		('Simulation'),
		('RPG'),
		('Strategy'),
		('Action-Adventure'),
		('Sports'),
		('Racing'),
		('Software'),
		('Fighting')`);

    await client.query(`
		INSERT INTO platforms (name)
		VALUES
		('Switch'),
		('Switch 2'),
		('PlayStation'),
		('PlayStation 2'),
		('PlayStation 3'),
		('PlayStation 4'),
		('PlayStation 5'),
		('Xbox'),
		('Xbox 360'),
		('Xbox One'),
		('Xbox Series X'),
		('Xbox Series S')`);

    await client.query(`
		INSERT INTO modes (name)
		VALUES ('Singleplayer'), ('Multiplayer')`);

    await client.query("COMMIT");
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
    console.log("Populating database complete.");
  }
}

main();
