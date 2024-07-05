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

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  userRepository = new UserRepository();
  constructor() {}
  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    await this.generateUniqueEmail(event.entity);
    await this.hashPassword(event.entity);
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
