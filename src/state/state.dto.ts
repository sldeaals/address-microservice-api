import { IsString, IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { City } from '../city/city.entity';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  stateCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsObject({ each: true })
  cities: City[];
}

export class UpdateStateDto extends PartialType(CreateStateDto) {}
