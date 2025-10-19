import { IsEmail, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}