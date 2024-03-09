import { IsNumber, IsString } from 'class-validator';

export class TokenResultDto {
  @IsNumber()
  email: string;

  @IsString()
  name: string;
}
