import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryModel, CountrySchema } from './country.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }])],
  controllers: [CountryController],
  providers: [CountryService, CountryModel],
  exports: [CountryService],
})
export class CountryModule {}
