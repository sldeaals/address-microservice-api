import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { DistrictModel, DistrictSchema } from './district.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'District', schema: DistrictSchema }])],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictModel],
  exports: [DistrictService],
})
export class DistrictModule {}
