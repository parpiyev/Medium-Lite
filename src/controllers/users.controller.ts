import { NextFunction, Request, Response } from "express";
import { IUser } from "@/interfaces/users.interface";
import UsersService from "@/services/users.service";
import catchAsync from "@/utils/catchAsync";

export default class UserController {
  private usersService = new UsersService();

  public getUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findAllUserData: IUser[] = await this.usersService.findAllUser(
        req.query
      );

      res.status(200).json({ data: findAllUserData, message: "findAll" });
    }
  );

  public getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findOneUserData: IUser = await this.usersService.findOneUser(
        "id",
        req.params.id
      );

      res.status(200).json({ data: findOneUserData, message: "findOne" });
    }
  );
}
