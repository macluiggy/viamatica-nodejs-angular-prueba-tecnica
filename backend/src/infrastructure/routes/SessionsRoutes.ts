// src/infrastructure/routes/userRoutes.ts
import { Router } from "express";
import passport from "../middleware/passport";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { CreateUserDto } from "../../application/dtos/user/CreateUserDto";
import { UpdateUserDto } from "../../application/dtos/user/UpdateUserDto";
import multer from "multer";
import { SessionRepository } from "../repositories/SessionRepository";
import { SessionsService } from "../../application/services/SessionsService";
import { SessionsController } from "../controllers/SessionsController";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

const sessionRepository = new SessionRepository();
const sessionsService = new SessionsService(sessionRepository);
const sessionsController = new SessionsController(sessionsService);

router.get(
  "/sessions",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) =>  sessionsController.getSessions(req, res, next)
);

export default router;
