// src/types/custom.d.ts
import "express";

export type SuccessParams = {
  data?: any;
  statusCode?: number;
  message?: string;
};
declare module "express" {
  export interface Response {
    success?: ({ data, statusCode, message }: SuccessParams) => void;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: any; // Aquí puedes definir un tipo más específico si lo deseas
    }
  }
}