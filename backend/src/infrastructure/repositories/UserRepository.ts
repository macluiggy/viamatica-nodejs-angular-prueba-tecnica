// src/infrastructure/repositories/UserRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../../domain/entities/User";
import { CreateUserDto } from "../../application/dtos/user/CreateUserDto";

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  async save(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: UserEntity): Promise<UserEntity | null> {
    await this.userRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findByEmailOrUsername(email: string, username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: [
        {
          email,
        },
        {
          username,
        },
      ],
    });
  }
}
