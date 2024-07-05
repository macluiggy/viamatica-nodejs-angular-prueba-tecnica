// src/infrastructure/repositories/UserRepository.ts
import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { SessionEntity } from "../../domain/entities/Sessions";

export class SessionRepository {
  private sessionRepository: Repository<SessionEntity>;

  constructor() {
    this.sessionRepository = AppDataSource.getRepository(SessionEntity);
  }

  async getOne(
    options: FindOneOptions<SessionEntity>
  ): Promise<SessionEntity | null> {
    return this.sessionRepository.findOne(options);
  }

  async save(session: SessionEntity): Promise<SessionEntity> {
    return this.sessionRepository.save(session);
  }

  async delete({ userId }: { userId: number }): Promise<void> {
    await this.sessionRepository.delete({ userId });
  }
}
