import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { UserEntity } from '../../../domain/entities/User';

@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(username: string) {
	return AppDataSource.getRepository(UserEntity).findOne({ where: { username } }).then(user => {
	  if (user) return false;
	  return true;
	});
  }
}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
	registerDecorator({
	  target: object.constructor,
	  propertyName: propertyName,
	  options: validationOptions,
	  constraints: [],
	  validator: IsUsernameAlreadyExistConstraint,
	});
  };
}