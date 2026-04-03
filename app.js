require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");
const platformsRouter = require("./routes/platformsRouter");
const genresRouter = require("./routes/genresRouter");
const modesRouter = require("./routes/modesRouter");
const developersRouter = require("./routes/developersRouter");
const errorRouter = require("./routes/errorRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.urlPath = req.path;
  res.locals.appName = "Games Inventory App";
  next();
});
app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/platforms", platformsRouter);
app.use("/genres", genresRouter);
app.use("/modes", modesRouter);
app.use("/developers", developersRouter);
app.use("/{*splat}", errorRouter);
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "23505") {
    return res.status(409).render("customError", {
      title: `409 | ${err.detail}`,
      error: { statusCode: 409, message: err.detail },
    });
  }

  res.status(err.statusCode || 500).render("customError", {
    title: `${err.statusCode || 500} | ${err.message}`,
    error: { statusCode: err.statusCode || 500, message: err.message },
  });
});

const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Express app listening on port ${PORT}`);
});
