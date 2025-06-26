// src/logger/winston.config.ts
import { createLogger, transports, format } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const WinstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`, // corregido template string
    ),
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'app.log'),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
      tailable: true,
    }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});
