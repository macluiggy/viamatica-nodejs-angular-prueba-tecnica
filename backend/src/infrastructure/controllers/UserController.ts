// src/infrastructure/controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { convertXlsxToJson } from "../utils/xlsxToJson";

export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const criteria = req.query.criteria as string;
      const users = await this.userService.getUsers(criteria);
      res.success({
        data: users,
        message: "Users found",
        statusCode: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);
      if (user) {
        res.success({
          data: user,
          message: "User found",
          statusCode: StatusCodes.OK,
        });
      } else {
        throw new createError.NotFound("User not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      const newUser = await this.userService.createUser(user);
      res.success({
        data: newUser,
        message: "User created",
        statusCode: StatusCodes.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = req.body;
      const updatedUser = await this.userService.updateUser(id, user);
      if (updatedUser) {
        res.success({
          data: updatedUser,
          message: "User updated",
          statusCode: StatusCodes.OK,
        });
      } else {
        throw new createError.NotFound("User not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await this.userService.deleteUser(id);
      res.success({
        message: "User deleted",
        statusCode: StatusCodes.NO_CONTENT,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDashBoardData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.userService.getDashboardData();
      res.success({
        data: data,
        message: "User found",
        statusCode: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
    }
  }

  async bulkCreateUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userFile = req.file;

      const users = convertXlsxToJson(userFile);

      const newUsers = await this.userService.bulkCreateUsers(users);
      res.success({
        data: newUsers,
        message: "Users created",
        statusCode: StatusCodes.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }
}
