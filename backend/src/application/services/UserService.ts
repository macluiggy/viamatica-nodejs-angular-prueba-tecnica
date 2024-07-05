// src/application/services/UserService.ts
import { IUserService } from '../interfaces/IUserService';
import { UserEntity } from '../../domain/entities/User';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CreateUserDto } from '../dtos/user/CreateUserDto';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async createUser(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepository.save(user);
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
