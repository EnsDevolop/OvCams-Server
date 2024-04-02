import { IsArray, IsString } from 'class-validator';

export class CampingDto {
  @IsString()
  accessToken: string;

  @IsString()
  placeName: string;

  @IsString()
  country: string;

  @IsString()
  mainImage: string;

  @IsArray()
  images: string[];

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
