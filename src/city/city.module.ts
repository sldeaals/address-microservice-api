import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityModel, CitySchema } from './city.entity';
import { StateSchema } from '../state/state.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'City', schema: CitySchema },
    { name: 'State', schema: StateSchema },
  ])],
  controllers: [CityController],
  providers: [CityService, CityModel],
  exports: [CityService],
})
export class CityModule {}
