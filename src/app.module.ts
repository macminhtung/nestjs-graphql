import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigService } from 'modules/share/services/config.service';
import { SharedModule } from 'modules/share/shared.module';
import { HttpLoggerMiddleware } from 'middlewares/httpLogger.middleware';

@Module({
  imports: [
    SharedModule,
    UserModule,
    RoleModule,

    // #================================#
    // # ==> TYPE_ORM CONFIGURATION <== #
    // #================================#
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        // console.log('\n ==> options =', options);
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        await dataSource.runMigrations();
        return dataSource;
      },
    }),

    // #==============================#
    // # ==> APOLLO CONFIGURATION <== #
    // #==============================#
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
