import { Router } from "express";
import LikesController from "@controllers/likes.controller";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreateLikeDto } from "@/dtos/likes.dto";
import authMiddleware from "@/middlewares/auth.middleware";
import { ListPostDto } from "@/dtos/posts.dto";

export default class LikesRoute implements Routes {
  public path = "/likes";
  public router = Router();
  public likesController = new LikesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/all`,
      authMiddleware,
      validationMiddleware(ListPostDto, "query"),
      this.likesController.getLikes
    );
    this.router.post(
      `${this.path}/create`,
      authMiddleware,
      validationMiddleware(CreateLikeDto, "body"),
      this.likesController.createLike
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.likesController.getLikeById
    );
  }
}
