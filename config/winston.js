import winston from "winston";

const { format } = winston;
const { combine, timestamp, label, prettyPrint } = format;

const timezoned = () =>
  new Date().toLocaleString("en-US", {
    timeZone: process.env.TZ,
  });

const transportDefinitions = {
  file: {
    level: "info",
    filename: "app.log",
    dirname: "./logs/",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 1,
  },

  console: {
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      ...transportDefinitions.file,
      format: combine(timestamp({ format: timezoned }), prettyPrint()),
    }),
    new winston.transports.File({
      ...transportDefinitions.file,
      filename: "error.log",
      level: "error",
      format: combine(timestamp({ format: timezoned }), prettyPrint()),
    }),
    new winston.transports.Console({
      ...transportDefinitions.console,
      format: winston.format.combine(
        winston.format.simple(),
        timestamp({ format: timezoned }),
        winston.format.printf((logObject) => {
          return `[${logObject.timestamp}] ${
            logObject.level
          }: ${logObject.message.trim()}`;
        })
      ),
    }),
  ],
  format: combine(
    label({ label: "right meow!" }),
    timestamp({ format: timezoned }),
    prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      ...transportDefinitions.console,
      format: winston.format.combine(
        winston.format.simple(),
        timestamp({ format: timezoned }),
        winston.format.printf((logObject) => {
          return `[${logObject.timestamp}] ${
            logObject.level
          }: ${logObject.message.trim()}`;
        })
      ),
    })
  );
}
