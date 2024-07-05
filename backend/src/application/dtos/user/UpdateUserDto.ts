// src/application/dtos/CreateUserDto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  username: string;
}
