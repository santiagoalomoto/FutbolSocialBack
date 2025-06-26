// src/logger/logger.service.ts
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { WinstonLogger } from './winston.config';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: any, ...optionalParams: any[]) {
    WinstonLogger.info(this.formatMessage(message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    WinstonLogger.error(this.formatMessage(message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    WinstonLogger.warn(this.formatMessage(message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    WinstonLogger.debug(this.formatMessage(message, optionalParams));
  }

  private formatMessage(message: any, optionalParams: any[]): string {
    if (optionalParams.length) {
      return `${message} ${optionalParams.map(param => JSON.stringify(param)).join(' ')}`;
    }
    return message;
  }
}
