import { IsEmail, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  currentPassword: string; // CIN la 1ère fois

  @IsString()
  @MinLength(8)
  newPassword: string;
}