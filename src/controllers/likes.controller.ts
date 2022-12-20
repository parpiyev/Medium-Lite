import { NextFunction, Request, Response } from "express";
import { CreateLikeDto } from "@/dtos/likes.dto";
import { ILike } from "@/interfaces/likes.interface";
import LikesService from "@/services/likes.service";
import catchAsync from "@/utils/catchAsync";

export default class LikesController {
  private LikesService = new LikesService();

  public getLikes = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findAllLikeData: ILike[] = await this.LikesService.findAllLike(
        req.query
      );

      res.status(200).json({ data: findAllLikeData, message: "findAll" });
    }
  );

  public getLikeById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findOneLikeData: ILike = await this.LikesService.findOneLike(
        "id",
        req.params.id
      );

      res.status(200).json({ data: findOneLikeData, message: "findOne" });
    }
  );

  public createLike = catchAsync(
    async (req: Request & any, res: Response, next: NextFunction) => {
      const createLikeData: ILike = await this.LikesService.createLike(
        req.body,
        req.user
      );

      res.status(201).json({ data: createLikeData, message: "created" });
    }
  );
}
