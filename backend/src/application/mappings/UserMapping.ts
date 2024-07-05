import { UserEntity } from "../../domain/entities/User";
import { CreateUserDto } from "../dtos/user/CreateUserDto";

export class UserMapping {
  static toEntity(dto: CreateUserDto): UserEntity {
    const user = new UserEntity();
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toDto(entity: UserEntity): CreateUserDto {
    const dto = new CreateUserDto();
    dto.email = entity.email;
    dto.password = entity.password;
    return dto;
  }
}