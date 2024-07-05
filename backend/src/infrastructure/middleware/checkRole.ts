import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

function checkRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.["role"] !== role) {
      throw new createHttpError.Forbidden(
       `You don't have permission to access this resource. You need to be a ${role} to access this resource.`
      );
    }
    next();
  };
}

export default checkRole;
