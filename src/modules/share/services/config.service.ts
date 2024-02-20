import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MAIN_ENV } from 'env';

const { DATABASE } = MAIN_ENV;

export class ConfigService {
  // # =============== #
  // # ==> TYPEORM <== #
  // # =============== #
  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = [__dirname + '/../../../migrations/*{.ts,.js}'];
    const entities = [__dirname + '/../../../modules/**/*.entity{.ts,.js}'];

    const options: TypeOrmModuleOptions = {
      entities,
      migrations: migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      username: DATABASE.USERNAME,
      password: DATABASE.PASSWORD,
      database: DATABASE.DATABASE,
      migrationsRun: false,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
    };

    return options;
  }
}
