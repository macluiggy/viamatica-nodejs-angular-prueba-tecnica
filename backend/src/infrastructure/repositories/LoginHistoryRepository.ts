import { Repository } from "typeorm";
import { LoginHistoryEntity } from "../../domain/entities/LoginHistory";
import { AppDataSource } from "../database/data-source";

export class LoginHistoryRepository {
  private loginHistoryRepository: Repository<LoginHistoryEntity>;
  constructor() {
    this.loginHistoryRepository = AppDataSource.getRepository(LoginHistoryEntity);
  }

  async getUserLoginHistory(userId: number): Promise<LoginHistoryEntity[]> {
    return this.loginHistoryRepository.find({
      where: {
        userId,
      },
      relations: ["user"],
    });
  }

  async save(loginHistory: LoginHistoryEntity): Promise<LoginHistoryEntity> {
    return this.loginHistoryRepository.save(loginHistory);
  }
}
