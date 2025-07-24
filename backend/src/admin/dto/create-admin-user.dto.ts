import { IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['admin', 'super_admin'])
  role: 'admin' | 'super_admin';
}