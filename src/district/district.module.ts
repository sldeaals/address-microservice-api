import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { DistrictModel, DistrictSchema } from './district.entity';
import { CitySchema } from '../city/city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'District', schema: DistrictSchema },
      { name: 'City', schema: CitySchema },
    ]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictModel],
  exports: [DistrictService],
})
export class DistrictModule {}
