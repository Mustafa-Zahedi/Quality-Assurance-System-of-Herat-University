/**
 * @Author: Paiman Rasoli
 * @description: used for logging errors and another important issues to console.
 */

const { createLogger, transports } = require("winston");

const defaultLevel = process.env.LOG_LEVEL || "info";

const options = {
  exitOnError: false,
  level: defaultLevel,
};

const logger = new createLogger(options);
logger.add(
  new transports.Console({
    colorize: true,
    showLevel: true,
    timestamp: true,
    level: "info",
  })
);

export { logger };
