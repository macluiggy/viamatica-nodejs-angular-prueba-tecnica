import { LoginHistoryEntity } from "../../domain/entities/LoginHistory";

export interface ILoginHistory {
  getUserLoginHistory(userId: number): Promise<LoginHistoryEntity[]>;
}