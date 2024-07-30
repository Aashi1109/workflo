import { createLogger, format, transports } from "winston";
import * as path from "node:path";
import config from "@config";
import errors = format.errors;

const env = process.env.NODE_ENV || "development";
const logDir = config.log.filepath;
const logFile = path.join(logDir, config.log.filename);

const customFormat = format.printf(
  ({ level, message, timestamp, service, ...temp }) => {
    const logMessage = {
      asctime: timestamp,
      level: level.toUpperCase(),
      service: service,
      message: message,
    };
    return JSON.stringify(logMessage);
  }
);

const logger = createLogger({
  level: config.log.level,
  defaultMeta: { service: "ChatAppYT Server" },
  format: format.combine(
    format.splat(),
    format.json(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat,
    errors({ stack: true })
  ),
  transports: [new transports.File({ filename: logFile })],
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize()),
    })
  );
}

export default logger;
