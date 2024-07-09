// src/infrastructure/repositories/UserRepository.ts
import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { SessionEntity } from "../../domain/entities/Sessions";

export class SessionRepository {
  private sessionRepository: Repository<SessionEntity>;

  constructor() {
    this.sessionRepository = AppDataSource.getRepository(SessionEntity);
  }

  async findAll(
    options?: FindOneOptions<SessionEntity>
  ): Promise<SessionEntity[]> {
    return this.sessionRepository.find(options);
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
    const lastSession = await this.sessionRepository.findOne({
      where: { userId, deletedAt: null },
      order: { createdAt: "DESC" },
    });
    if (lastSession) {
      lastSession.deletedAt = new Date();
      await this.sessionRepository.save(lastSession);
    }
  }
}
