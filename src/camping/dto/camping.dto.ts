import { IsArray, IsString } from 'class-validator';

export class CampinDto {
  @IsString()
  accessToken: string;

  @IsString()
  placeName: string;

  @IsString()
  country: string;

  @IsString()
  address: string;

  @IsString()
  number: string;

  @IsArray()
  period: string[];

  @IsString()
  homepage: string;

  @IsString()
  content: string;

  @IsArray()
  facility: string[];
}
