import { Router } from "express";
import PostsController from "@controllers/posts.controller";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import authMiddleware from "@/middlewares/auth.middleware";
import { CreatePostDto, ListPostDto } from "@/dtos/posts.dto";

class PostsRoute implements Routes {
  public path = "/posts";
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/all`,
      authMiddleware,
      validationMiddleware(ListPostDto, "query"),
      this.postsController.getPosts
    );
    this.router.post(
      `${this.path}/create`,
      authMiddleware,
      validationMiddleware(CreatePostDto, "body"),
      this.postsController.createPost
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.postsController.getPostById
    );
  }
}

export default PostsRoute;
