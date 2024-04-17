import { IsArray, IsOptional, IsString } from 'class-validator';

export class CampingDto {
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

  @IsOptional()
  @IsString()
  homepage: string | null;

  @IsString()
  content: string;

  @IsArray()
  facility: string[];
}
