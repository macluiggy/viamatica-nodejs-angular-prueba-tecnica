// src/infrastructure/repositories/UserRepository.ts
import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../../domain/entities/User";
import { CreateUserDto } from "../../application/dtos/user/CreateUserDto";
import { USER } from "../../config/constants";
import { SessionEntity } from "../../domain/entities/Sessions";

export class SessionRepository {
  private userRepository: Repository<SessionEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async findAll(options?: FindOneOptions<SessionEntity>): Promise<SessionEntity[]> {
    return this.userRepository.find(options);
  }
}
