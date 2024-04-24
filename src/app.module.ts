import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';
import { UtilsModule } from './utils/utils.module';
import { ClusterModule } from './cluster/cluster.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthService } from './auth/auth.service';
import { SecurityMiddleware } from './utils/middlewares/security.middleware';
import { CSPMiddleware } from './utils/middlewares/csp.middleware';

@Module({
  imports: [DatabaseModule, CountryModule, StateModule, CityModule, DistrictModule, UtilsModule, ClusterModule, RedisModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware, CSPMiddleware, AuthMiddleware).forRoutes('*');
  }
}
