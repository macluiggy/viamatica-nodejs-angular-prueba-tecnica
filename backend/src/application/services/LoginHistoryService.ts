import { LoginHistoryEntity } from "../../domain/entities/LoginHistory";
import { LoginHistoryRepository } from "../../infrastructure/repositories/LoginHistoryRepository";
import { ILoginHistory } from "../interfaces/ILoginHistory";

export class LoginHistoryService implements ILoginHistory {
  constructor(private loginHistoryRepository: LoginHistoryRepository) {}

  async getUserLoginHistory(userId: number): Promise<LoginHistoryEntity[]> {
    return await this.loginHistoryRepository.getUserLoginHistory(userId);
  }
}