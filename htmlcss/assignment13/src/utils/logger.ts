import winston, { format } from "winston";
const logger = winston.createLogger({
  format: format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),

  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize()),
      level: "info",
    }),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

export default logger;
