// src/infrastructure/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import HttpResponse from "../http/HttpResponse";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  const statusCode = err.statusCode || 500;
  const responseBody = new HttpResponse({
    statusCode: statusCode,
    message: err.message,
    data: null,
    isOk: false,
  });
  res.status(statusCode).json(responseBody);
};
