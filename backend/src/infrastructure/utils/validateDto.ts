// src/infrastructure/middleware/validationMiddleware.ts
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import HttpResponse from "../http/HttpResponse";
import { StatusCodes } from "http-status-codes";

// export function validationMiddleware<T>(
//   type: ClassConstructor<T>
// ): RequestHandler {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const dto = plainToInstance<T, T>(type, req.body);
//     validate(dto, {
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     }).then((errors: ValidationError[]) => {
//       if (errors.length > 0) {
//         const message = errors
//           .map((error: ValidationError) => Object.values(error.constraints!))
//           .flat()
//           .join(", ");
//         const statusCode = StatusCodes.BAD_REQUEST;
//         const responseBody = new HttpResponse({
//           statusCode: statusCode,
//           message,
//           data: null,
//           isOk: false,
//         });
//         res.status(statusCode).json(responseBody);
//       } else {
//         req.body = dto;
//         next();
//       }
//     });
//   };
// }

const validateDto = async <T>({
  type,
  body,
}: {
  type: ClassConstructor<T>;
  body: any;
}) => {
  const dto = plainToInstance<T, object>(type, body);
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  if (errors.length > 0) {
    const message = errors
      .map((error: ValidationError) => Object.values(error.constraints!))
      .flat()
      .join(", ");
    return { dto: null, message };
  } else {
    return { dto, message: "" };
  }
};

const bulkValidateDto = async <T>({
  type,
  body,
}: {
  type: ClassConstructor<T>;
  body: any[];
}) => {
  const result = [];

  let row = 1;
  for (const item of body) {
    const dto = plainToInstance<T, object>(type, item);
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      let message = errors
        .map((error: ValidationError) => Object.values(error.constraints!))
        .flat()
        .join(", ");
      message = `Row ${row}: ${message}`;
      result.push({ dto: null, message });
    } else {
      result.push({ dto, message: "" });
    }
    row++;
  }

  const errors = result.filter((item) => item.message !== "");
  const validatedData = result
    .filter((item) => item.message === "")
    .map((item) => item.dto);

  return { errors, validatedData };
};

export { validateDto, bulkValidateDto };
