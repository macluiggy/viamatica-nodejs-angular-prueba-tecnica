// src/infrastructure/routes/userRoutes.ts
import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../../application/services/UserService";
import { UserController } from "../controllers/UserController";
import passport from "../middleware/passport";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { CreateUserDto } from "../../application/dtos/user/CreateUserDto";
import { UpdateUserDto } from "../../application/dtos/user/UpdateUserDto";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get(
  "/users/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.getDashBoardData(req, res, next)
);

// route for bulk user creation
router.post(
  "/users/bulk",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.bulkCreateUsers(req, res, next)
);

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.getUsers(req, res, next)
);
router.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.getUserById(req, res, next)
);
router.post(
  "/users",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(CreateUserDto),
  (req, res, next) => userController.createUser(req, res, next)
);
router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(UpdateUserDto),
  (req, res, next) => userController.updateUser(req, res, next)
);
router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.deleteUser(req, res, next)
);

export default router;
