// src/infrastructure/routes/authRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../../application/services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../../application/services/UserService";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { CreateUserDto } from "../../application/dtos/user/CreateUserDto";
import { SessionRepository } from "../repositories/SessionRepository";
import { LoginHistoryRepository } from "../repositories/LoginHistoryRepository";
import passport from "../middleware/passport";

const router = Router();

const userService = new UserService(new UserRepository());
const sessionRepository = new SessionRepository();
const loginHistoryRepository = new LoginHistoryRepository();
const authService = new AuthService(
  userService,
  sessionRepository,
  loginHistoryRepository
);
const authController = new AuthController(authService);
// add auth as the prefix to all routes
router.use("/auth", router);

router.post(
  "/signup",
  validationMiddleware(CreateUserDto),
  (req: Request, res: Response, next: NextFunction) =>
    authController.signUp(req, res, next)
);
router.post("/signin", (req: Request, res: Response, next: NextFunction) =>
  authController.login(req, res, next)
);
// for logout
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response, next: NextFunction) =>
    authController.logout(req, res, next) 
);

export default router;
