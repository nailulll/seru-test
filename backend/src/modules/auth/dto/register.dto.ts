import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  is_admin: boolean;
}
