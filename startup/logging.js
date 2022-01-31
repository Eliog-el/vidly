const winston = require("winston");
const { createLogger, transports, format } = require("winston");
// require("winston-mongodb");
require("express-async-errors");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.timestamp(), format.json())
    }),

    new transports.File({ filename: "uncaughtExceptions.log" }),

    // process.on( "unhandledRejection" , (ex) => {
    //   throw ex;
    // }),

    new transports.File({ filename: "logfile.log" }),
    // new transports.MongoDB({
    //   db: "mongodb://localhost/vidly",
    //   level: "info",
    //   options: { useUnifiedTopology: true },
    // }),
  ],
});

module.exports = logger;
