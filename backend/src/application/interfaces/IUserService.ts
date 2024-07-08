// src/application/interfaces/IUserService.ts
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../../domain/entities/User';

export interface IUserService {
  getUsers(criteria): Promise<UserEntity[]>;
  getUserById(id: number): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(id: number, user: UserEntity): Promise<UserEntity | null>;
  deleteUser(id: number): Promise<void>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  getUserByEmailOrUsername(email: string, username: string): Promise<UserEntity | null>;
  getDashboardData(): Promise<any>;
}
