const logger = require("./startup/logging");
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prods")(app);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

module.exports = server;
