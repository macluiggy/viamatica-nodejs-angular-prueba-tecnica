import {
  EntitySubscriberInterface,
  EventSubscriber,
  RecoverEvent,
} from "typeorm";
import { UserEntity } from "../entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { SessionEntity } from "../entities/Sessions";
import { SessionRepository } from "../../infrastructure/repositories/SessionRepository";
import { BeforeQueryEvent } from "typeorm/subscriber/event/QueryEvent";

@EventSubscriber()
export class SessionSubscriber
  implements EntitySubscriberInterface<SessionEntity>
{
  sessionRepository: SessionRepository = new SessionRepository();
  constructor() {}
  listenTo() {
    return UserEntity;
  }

}
