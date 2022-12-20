import { NextFunction, Request, Response } from "express";
import { CreatePostDto } from "@/dtos/posts.dto";
import { IPost } from "@/interfaces/posts.interface";
import PostsService from "@/services/posts.service";
import catchAsync from "@/utils/catchAsync";
import { IUser } from "@/interfaces/users.interface";

export default class PostsController {
  private postsService = new PostsService();

  public getPosts = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findAllPostData: IPost[] = await this.postsService.findAllPost(
        req.query as any
      );

      res.status(200).json({ data: findAllPostData, message: "findAll" });
    }
  );

  public getPostById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const findOnePostData: IPost = await this.postsService.findOnePost(
        "id",
        req.params.id
      );

      res.status(200).json({ data: findOnePostData, message: "findOne" });
    }
  );

  public createPost = catchAsync(
    async (req: Request & any, res: Response, next: NextFunction) => {
      const createPostData: IPost = await this.postsService.createPost(
        req.body,
        req.user
      );

      res.status(201).json({ data: createPostData, message: "created" });
    }
  );
}
