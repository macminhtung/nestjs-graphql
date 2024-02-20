import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'body-parser';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { PROVIDER_TOKENS } from 'common/constants';
import { GraphqlExceptionsFilter } from 'filters/graphqlException.filter';
import { AuthGuard } from 'guards/auth.guard';
import { HttpValidationPipe } from 'pipes/httpValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Enable CORS
  app.use(compression()); // Node.js compression middleware.
  app.use(json({ limit: '50mb' })); // Limit json
  app.use(urlencoded({ limit: '50mb', extended: true })); // Limit url

  // #=======================#
  // # ==> GLOBAL GUARDS <== #
  // #=======================#
  const reflector = app.get(Reflector);
  const userService = app.get(PROVIDER_TOKENS.USER_SERVICE);
  app.useGlobalGuards(new AuthGuard(reflector, userService));

  // #======================#
  // # ==> GLOBAL PIPES <== #
  // #======================#
  app.useGlobalPipes(new HttpValidationPipe({ whitelist: true }));

  // #========================#
  // # ==> GLOBAL FILTERS <== #
  // #========================#
  const logger: Logger = app.get(PROVIDER_TOKENS.LOGGER);
  app.useGlobalFilters(new GraphqlExceptionsFilter(logger));

  // #===========================#
  // # ==> START APPLICATION <== #
  // #===========================#
  const { PORT = 3001, NODE_ENV } = process.env;
  await app.listen(parseInt(`${PORT}`));
  logger.debug(
    `==> APP IS RUNNING | PORT: ${PORT} <== ${
      NODE_ENV === 'dev' ? `[http://localhost:${PORT}/graphql]` : ''
    }`,
    'APPLICATION',
  );
}
bootstrap();
