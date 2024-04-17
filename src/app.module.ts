import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, CountryModule, StateModule, CityModule, DistrictModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
