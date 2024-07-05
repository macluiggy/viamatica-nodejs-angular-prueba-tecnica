import { Router } from "express";
import { LoginHistoryRepository } from "../repositories/LoginHistoryRepository";
import { LoginHistoryController } from "../controllers/LoginHistoryController";
import { LoginHistoryService } from "../../application/services/LoginHistoryService";
import checkRole from "../middleware/checkRole";
import { USER } from "../../config/constants";
import passport from "../middleware/passport";

const router = Router();

const loginHistoryRepository = new LoginHistoryRepository();
const loginHistoryService = new LoginHistoryService(loginHistoryRepository);
const loginHistoryController = new LoginHistoryController(loginHistoryService);

router.get(
  "/login-history/:userId",
  passport.authenticate("jwt", { session: false }),
  checkRole(USER.ROLE.ADMIN),
  (req, res, next) => loginHistoryController.getUserLoginHistory(req, res, next)
);

export default router;