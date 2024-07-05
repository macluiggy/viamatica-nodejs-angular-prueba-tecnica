// src/infrastructure/routes/authRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from '../../application/services/AuthService';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../../application/services/UserService';

const router = Router();

const userService = new UserService(new UserRepository());
const authService = new AuthService(userService);
const authController = new AuthController(authService);
// add auth as the prefix to all routes
router.use('/auth', router);

router.post('/signup', (req: Request, res: Response, next: NextFunction) => authController.signUp(req, res, next));
router.post('/signin', (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next));
// for logout
router.post('/logout', (req: Request, res: Response, next: NextFunction) => authController.logout(req, res, next));

export default router;
 