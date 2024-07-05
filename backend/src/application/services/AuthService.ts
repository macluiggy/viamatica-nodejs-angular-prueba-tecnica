// src/application/services/AuthService.ts
import { IAuthService } from "../interfaces/IAuthService";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import envVariables from "../../config/envVariables";
import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { IUserService } from "../interfaces/IUserService";

export class AuthService implements IAuthService {
  constructor(private userService: IUserService) {}

  async signUp(dto: CreateUserDto): Promise<any> {
    if (!dto.username) {
      dto.username = dto.email;
    }
    if (!dto.firstName) {
      dto.firstName = dto.email.split("@")[0];
    }
    const { password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    dto = { ...dto, password: hashedPassword };
    const user = await this.userService.createUser(dto);
    const accessToken = this.generateToken(user);
    return { user, accessToken };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new createHttpError.NotFound("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new createHttpError.Unauthorized("Invalid password");
    }

    const accessToken = this.generateToken(user);
    const result = { user, accessToken };

    return result;
  }

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, envVariables.jwtSecret, { expiresIn: "100D" });
  }
}
