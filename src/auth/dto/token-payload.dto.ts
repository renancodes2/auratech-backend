import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';

export class TokenPaylodDto {
  @IsString()
  sub: string;
  @IsEmail()
  email: string;
  @IsBoolean()
  status: boolean;
  @IsString()
  role: string;
  @IsInt()
  iat: number;
  @IsInt()
  exp: number;
  @IsString()
  aud: string;
  @IsString()
  iss: string;
}
