import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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
