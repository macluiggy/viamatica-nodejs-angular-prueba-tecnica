// src/infrastructure/database/data-source.ts
import { DataSource } from "typeorm";
import { UserEntity } from "../../domain/entities/User";
import envVariables from "../../config/envVariables";
import { UserSubscriber } from "../../domain/subscribers/UserSubscriber";
import { SessionEntity } from "../../domain/entities/Sessions";
import { LoginHistoryEntity } from "../../domain/entities/LoginHistory";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: envVariables.db.databaseUrl,
  synchronize: true,
  logging: false,
  entities: [UserEntity, SessionEntity, LoginHistoryEntity],
  subscribers: [UserSubscriber],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
});
