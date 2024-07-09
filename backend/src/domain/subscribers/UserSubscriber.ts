import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  // UpdateEvent,
} from "typeorm";
import { UserEntity } from "../entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import * as bcrypt from "bcrypt";
import { USER } from "../../config/constants";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  userRepository = new UserRepository();
  constructor() {}
  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    // console.log("beforeInsert", event.entity);

    await this.generateUniqueEmail(event.entity);
    await this.hashPassword(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>) {
    if (event.entity && event.entity.status === USER.STATUS.ACTIVE) {
      event.entity.failedAttempts = 0;
    }
  }

  private async generateUniqueEmail(user: UserEntity) {
    if (user.firstName && user.lastName) {
      const firstInitial = user.firstName.charAt(0).toLowerCase();
      const lastName1 = user.lastName.split(" ")[0].toLowerCase();
      const lastName2 = user.lastName.split(" ")[1]?.toLowerCase() || "";
      const lastName2Initial = lastName2.charAt(0) || "";

      let email = `${firstInitial}${lastName1}${lastName2Initial}@mail.com`;
      let count = 0;

      while (await this.userRepository.findByEmail(email)) {
        email = `${firstInitial}${lastName1}${count || ""}@mail.com`;
        count++;
      }

      user.email = email;
    }
  }

  private async hashPassword(user: UserEntity) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}
