// src/infrastructure/middleware/responseHandler.ts
import { Request, Response, NextFunction } from "express";
import HttpResponse from "../http/HttpResponse";
import { SuccessParams } from "../../types/custom";

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = ({
    data = {},
    statusCode = 200,
    message = "Success",
  }: SuccessParams) => {
    const responseBody = new HttpResponse({
      statusCode: statusCode,
      message: message,
      data: data,
      isOk: true,
    });
    if (statusCode === 204) {
      statusCode = 200;
    }
    console.log(statusCode);
    
    res.status(statusCode).json(responseBody);
  };

  next();
};
