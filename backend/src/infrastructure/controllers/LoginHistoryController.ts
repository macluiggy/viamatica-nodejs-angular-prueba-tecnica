import { NextFunction } from "express-serve-static-core";
import { ILoginHistory } from "../../application/interfaces/ILoginHistory";
import { Request, Response } from "express";

export class LoginHistoryController {
  constructor(private loginHistoryService: ILoginHistory) {}

  async getUserLoginHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const result = await this.loginHistoryService.getUserLoginHistory(userId);
      
      res.success({
        message: "User login history retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
