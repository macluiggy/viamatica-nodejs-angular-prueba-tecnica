import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./User";

@Entity({
  name: "sessions",
})
export class SessionEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ name: "user_id", type: "int" })
  userId?: number;

  @Column({ name: "token", type: "varchar",})
  token?: string;

  @CreateDateColumn({
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    nullable: true,
    default: null,
  })
  deletedAt?: Date;

  @ManyToOne("UserEntity", (user: UserEntity) => user.session, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user?: UserEntity;
}
