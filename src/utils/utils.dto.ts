import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  countryCode?: string;

  @ApiProperty({ required: false })
  cca2?: string;

  @ApiProperty({ required: false })
  cca3?: string;

  @ApiProperty({ required: false })
  postalCode?: string;
}
