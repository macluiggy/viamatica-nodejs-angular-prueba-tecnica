// src/application/services/AuthService.ts
import { IAuthService } from "../interfaces/IAuthService";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import envVariables from "../../config/envVariables";
import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { IUserService } from "../interfaces/IUserService";
import { SessionRepository } from "../../infrastructure/repositories/SessionRepository";
import { LOGIN_HISTORY, USER } from "../../config/constants";
import { LoginHistoryRepository } from "../../infrastructure/repositories/LoginHistoryRepository";

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private sessionRepository: SessionRepository,
    private loginHistoryRepository: LoginHistoryRepository
  ) {}

  async signUp(dto: CreateUserDto): Promise<any> {
    const user = await this.userService.createUser(dto);
    const accessToken = this.generateToken(user);
    return { user, accessToken };
  }

  async login({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }): Promise<any> {
    const user = await this.userService.getUserByEmailOrUsername(
      email,
      username
    );
    if (!user) {
      throw new createHttpError.NotFound("User not found");
    }

    if (await this.hasActiveSession(user.id)) {
      throw new createHttpError.BadRequest(
        "User already has an active session"
      );
    }

    await this.handleFailedLoginAttempts(user, password);

    await this.loginHistoryRepository.save({
      action: LOGIN_HISTORY.ACTION.LOGIN,
      userId: user.id,
    });

    const accessToken = this.generateToken(user);
    await this.sessionRepository.save({ userId: user.id, token: accessToken });

    delete user.password;
    return { user, accessToken };
  }

  async logout(userId: number): Promise<void> {
    await this.sessionRepository.delete({ userId });
    await this.loginHistoryRepository.save({
      action: LOGIN_HISTORY.ACTION.LOGOUT,
      userId,
    });
  }

  private async hasActiveSession(userId: number): Promise<boolean> {
    const activeSession = await this.sessionRepository.getOne({
      where: { userId },
    });

    return !!activeSession;
  }

  private async handleFailedLoginAttempts(
    user: any,
    password: string
  ): Promise<void> {
    const validPassword = await bcrypt.compare(password, user.password);

    if (
      user.status === USER.STATUS.BLOCKED &&
      user.failedAttempts >= USER.MAX_FAILED_LOGIN_ATTEMPTS
    ) {
      throw new createHttpError.BadRequest(
        "User has been blocked due to multiple failed login attempts"
      );
    }

    if (!validPassword) {
      user.failedAttempts += 1;

      if (user.failedAttempts >= USER.MAX_FAILED_LOGIN_ATTEMPTS) {
        user.status = USER.STATUS.BLOCKED;
        await this.userService.updateUser(user.id, user);
        throw new createHttpError.BadRequest(
          "User has been blocked due to multiple failed login attempts"
        );
      }

      await this.userService.updateUser(user.id, user);
      throw new createHttpError.BadRequest(
        `Invalid credentials. You have ${
          USER.MAX_FAILED_LOGIN_ATTEMPTS - user.failedAttempts
        } attempts left`
      );
    }

    await this.userService.updateUser(user.id, user);
  }

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email, username: user.username };
    return jwt.sign(payload, envVariables.jwtSecret, { expiresIn: "100D" });
  }
}
