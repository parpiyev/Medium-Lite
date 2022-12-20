import { IUser } from "./users.interface";

export interface IPost {
  id: string;
  title: string;
  content: string;
  author: string | IUser;
  readTime: number;
  viewsAmount?: number;
  likesAmount?: number;
  createdAt: Date;
}
