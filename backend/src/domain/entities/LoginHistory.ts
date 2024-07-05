import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./User";

@Entity({
  name: "login_history",
})
export class LoginHistoryEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ name: "user_id", type: "int" })
  userId?: number;

  // action column to know if the user action was a login or logout
  @Column({
    name: "action",
    type: "varchar",
    length: 255,
    nullable: false,
    enum: ["login", "logout"],
  })
  action?: string;

  @CreateDateColumn({
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @ManyToOne("UserEntity", (user: UserEntity) => user.loginHistory, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user?: UserEntity;
}
