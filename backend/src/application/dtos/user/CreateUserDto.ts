// src/application/dtos/CreateUserDto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsUsernameAlreadyExist } from "../validators/IsUsernameAlreadyExistConstraint";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: "Username must be at least 8 characters long" })
  @MaxLength(20, { message: "Username must be at most 20 characters long" })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: "Username must not contain special characters",
  })
  @Matches(/\d/, { message: "Username must contain at least one number" })
  @Matches(/[A-Z]/, {
    message: "Username must contain at least one uppercase letter",
  })
  @IsUsernameAlreadyExist({ message: "Username already exists" })
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^[^\s]+$/, { message: "Password must not contain spaces" })
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: "Identification must be 10 characters long" })
  @MaxLength(10, { message: "Identification must be 10 characters long" })
  @Matches(/^[0-9]+$/, { message: "Identification must contain only numbers" })
  @Matches(/^(?!.*(\d)\1{3})/, {
    message: "Identification must not contain the same number repeated 4 times",
  })
  identification: string;

  @IsOptional()
  role?: string;
}
