import { IsString, IsArray, IsBoolean, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

class NameDto {
  @IsString()
  @IsNotEmpty()
  common: string;

  @IsString()
  @IsNotEmpty()
  official: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  nativeName: Record<string, { common: string; official: string }>;
}

export class CreateCountryDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsArray()
  @IsString({ each: true })
  tld: string[];

  @IsString()
  @IsNotEmpty()
  cca2: string;

  @IsString()
  @IsNotEmpty()
  ccn3: string;

  @IsString()
  @IsNotEmpty()
  cca3: string;

  @IsString()
  @IsNotEmpty()
  cioc: string;

  @IsBoolean()
  @IsNotEmpty()
  independent: boolean;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsBoolean()
  @IsNotEmpty()
  unMember: boolean;

  @IsObject()
  currencies: Record<string, { name: string; symbol: string }>;

  @IsObject()
  idd: { root: string; suffixes: string[] };

  @IsArray()
  @IsString({ each: true })
  capital: string[];
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
