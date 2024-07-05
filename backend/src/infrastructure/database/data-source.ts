// src/infrastructure/database/data-source.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../../domain/entities/User';
import envVariables from '../../config/envVariables';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: envVariables.db.databaseUrl,
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
});
