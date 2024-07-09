// src/application/services/UserService.ts
import { IUserService } from "../interfaces/IUserService";
import { UserEntity } from "../../domain/entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { SessionRepository } from "../../infrastructure/repositories/SessionRepository";
import { FindOneOptions, ILike } from "typeorm";

export class SessionsService {
  constructor(private sessionRepository: SessionRepository) {}

  async findAllSessions(): Promise<UserEntity[]> {
    return this.sessionRepository.findAll();
  }
}
