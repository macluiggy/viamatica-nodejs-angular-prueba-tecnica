// src/infrastructure/middleware/validationMiddleware.ts
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import HttpResponse from "../http/HttpResponse";
import { StatusCodes } from "http-status-codes";

export function validationMiddleware<T>(
  type: ClassConstructor<T>
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dto = plainToInstance<T, T>(type, req.body);
    validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints!))
          .flat()
          .join(", ");
        const statusCode = StatusCodes.BAD_REQUEST;
        const responseBody = new HttpResponse({
          statusCode: statusCode,
          message,
          data: null,
          isOk: false,
        });
        res.status(statusCode).json(responseBody);
      } else {
        req.body = dto;
        next();
      }
    });
  };
}
