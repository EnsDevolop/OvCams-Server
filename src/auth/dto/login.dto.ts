import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly provider: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly picture: string;

  @IsString()
  readonly accessToken: string;
}
