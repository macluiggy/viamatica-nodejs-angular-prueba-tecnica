// src/infrastructure/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import HttpResponse from "../http/HttpResponse";

const PostgreSQLErrorTranslator = (err: any) => {
  const details = err?.detail;
  return {
    "23505": {
      statusCode: 409,
      message: `Resource already exists: ${details}`
    },
  }[err?.code];
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  const translatedError = PostgreSQLErrorTranslator(err);
  const statusCode = err.statusCode || translatedError?.statusCode || 500;
  const message = translatedError?.message || err.message || "Internal server error";
  const responseBody = new HttpResponse({
    statusCode: statusCode,
    message: message,
    data: null,
    isOk: false,
  });
  res.status(statusCode).json(responseBody);
};
