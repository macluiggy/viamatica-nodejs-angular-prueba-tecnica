import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { SessionEntity } from "./Sessions";
import { LoginHistoryEntity } from "./LoginHistory";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ name: "username", type: "varchar", length: 50, unique: true })
  username?: string;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName?: string;

  @Column({ name: "last_name", type: "varchar", length: 100, nullable: true })
  lastName?: string;

  @Column({ name: "email", type: "varchar", length: 100, unique: true })
  email?: string;

  @Column({ name: "password", type: "varchar", length: 100 })
  password?: string;

  @Column({
    name: "identification",
    type: "varchar",
    length: 100,
    unique: true,
  })
  identification?: string;

  // column for failed attempts to login
  @Column({ name: "failed_attempts", type: "int", default: 0 })
  failedAttempts?: number;

  // column for status of the user to check if is blocked for trying to login more than 3 times, either active or blocked
  @Column({
    name: "status",
    type: "varchar",
    length: 10,
    default: "active",
    enum: ["active", "blocked"],
  })
  status?: string;

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

  // column for user's role either admin or user
  @Column({
    name: "role",
    type: "varchar",
    length: 10,
    default: "user",
    enum: ["user", "admin"],
  })
  role?: string;

  // relationships
  @OneToMany("SessionEntity", (session: SessionEntity) => session.user)
  @JoinColumn({ name: "id" })
  session?: SessionEntity;

  @OneToMany("LoginHistoryEntity", (loginHistory: LoginHistoryEntity) => loginHistory.user)
  @JoinColumn({ name: "id" })
  loginHistory?: LoginHistoryEntity;
}
