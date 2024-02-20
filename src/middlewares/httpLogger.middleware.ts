import { Logger, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PROVIDER_TOKENS } from 'common/constants';

export class HttpLoggerMiddleware implements NestMiddleware {
  @Inject(PROVIDER_TOKENS.LOGGER)
  private logger: Logger;

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { ip, method, originalUrl, headers } = request;
      const userAgent = headers['user-agent'] || '';
      const { statusCode } = response;
      const message = `==> STATUS: ${statusCode} | ${ip} ${method} ${originalUrl} ${userAgent}\n`;

      if (statusCode >= 500) return this.logger.error(message);
      if (statusCode >= 400) return this.logger.warn(message);
      return this.logger.log(message);
    });

    next();
  }
}
