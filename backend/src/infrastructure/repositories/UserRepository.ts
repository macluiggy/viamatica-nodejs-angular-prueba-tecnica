// src/infrastructure/repositories/UserRepository.ts
import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../../domain/entities/User";
import { CreateUserDto } from "../../application/dtos/user/CreateUserDto";
import { USER } from "../../config/constants";
import { validateDto } from "../utils/validateDto";

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async findAll(options: FindOneOptions<UserEntity>): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ["session", "loginHistory"],
      ...options,
    });
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

  async findByEmailOrUsername(
    email: string,
    username: string
  ): Promise<UserEntity | null> {
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

  async findUsersWithActiveSessionsCount(): Promise<number> {
    const queryBulder = this.userRepository.createQueryBuilder("user");
    const usersWithActiveSessionCount = await queryBulder
      .innerJoin("user.session", "session")
      .getCount();

    return usersWithActiveSessionCount;
  }

  async findUsersWithInactiveSessionsCount(): Promise<number> {
    const queryBulder = this.userRepository.createQueryBuilder("user");
    const usersWithActiveSessionCount = await queryBulder
      .leftJoin("user.session", "session")
      .where("session.id IS NULL")
      .getCount();

    return usersWithActiveSessionCount;
  }

  async findBlockedUsersCount(): Promise<number> {
    const queryBulder = this.userRepository.createQueryBuilder("user");
    const blockedUsersCount = await queryBulder
      .where("user.status = :status", { status: USER.STATUS.BLOCKED })
      .getCount();

    return blockedUsersCount;
  }

  async findAllUsersFailedLoginAttemptsCount(): Promise<number> {
    const queryBulder = this.userRepository.createQueryBuilder("user");
    // make a sum of all failed attempts
    const failedAttemptsCount = await queryBulder
      .select("SUM(user.failedAttempts)", "failedAttempts")
      .getRawOne();

    return +failedAttemptsCount.failedAttempts;
  }

  async bulkCreate(users: CreateUserDto[]): Promise<any> {
    const successfulUsers: CreateUserDto[] = [];
    const errors: any[] = [];

    let row = 1;
    for (const user of users) {
      let { message } = await validateDto({
        type: CreateUserDto,
        body: user,
      });

      if (message) {
        message = `Row ${row}: ${message}`;
        errors.push({ message });
        row++;
        continue;
      }
      try {
        const savedUser = await this.userRepository.save(user);
        successfulUsers.push(savedUser);
      } catch (error: any) {
        let message = error.detail || error.message || error;
        message = `Row ${row}: ${message}`;
        errors.push({ message });
      }
      row++;
    }

    return { success: successfulUsers, errors };
  }
}
