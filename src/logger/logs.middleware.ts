import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, url, body, params } = request;
      const { statusCode, statusMessage } = response;

      const bodyContent =
        Object.keys(body).length > 0 ? `Body: ${JSON.stringify(body)}` : '';

      const paramsContent =
        Object.keys(params).length > 0 ? JSON.stringify(params) : '';

      const message = `${method} /${
        url.split('/')[1]
      } | ${paramsContent} ${bodyContent} | ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;
