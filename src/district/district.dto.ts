import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  postalCode: string | null;

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

export class UpdateDistrictDto extends (CreateDistrictDto) {}

export class DistrictFilterDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  postalCode?: string;

  @ApiProperty({ required: false })
  countryCode?: string;
}
