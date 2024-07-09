import { Request, Response, NextFunction } from "express";
import { SessionsService } from "../../application/services/SessionsService";

export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  async getSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await this.sessionsService.findAllSessions();
      res.success({
        message: "Sessions retrieved successfully",
        data: sessions,
      });
    } catch (error) {
      next(error);
    }
  }
}
