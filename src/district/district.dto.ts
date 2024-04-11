import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  postalCode?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  latitude?: number | null;

  @IsNumber()
  longitude?: number | null;

  @IsNumber()
  accuracy?: number | null;
}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}
