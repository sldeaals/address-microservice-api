import { IsString, IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { District } from '../district/district.entity';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  stateId: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsArray()
  @IsString({ each: true })
  postalCodes: string[];

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsObject({ each: true })
  districts: District[];
}

export class UpdateCityDto extends CreateCityDto {}
