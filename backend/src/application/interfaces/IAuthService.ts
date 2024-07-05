import { CreateUserDto } from "../dtos/user/CreateUserDto";

// src/application/interfaces/IAuthService.ts
export interface IAuthService {
  signUp(dto: CreateUserDto): Promise<any>;
  login({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }): Promise<any>;
}
