import { HttpException } from "@exceptions/HttpException";
import { ILike } from "@/interfaces/likes.interface";
import { isEmpty } from "@utils/util";
import { CreateLikeDto } from "@/dtos/likes.dto";
import { writeFile, readFile } from "fs/promises";
import { v4 } from "uuid";
import UsersService from "./users.service";
import PostsService from "./posts.service";
import { IUser } from "@/interfaces/users.interface";

export default class LikesService {
  private path = __dirname + "/../../databases/likes.json";
  private usersService = new UsersService();
  private postsService = new PostsService();

  public async findAllLike({ limit = 20, offset = 0 }): Promise<ILike[]> {
    const likes: ILike[] = Object.values(
      JSON.parse(await readFile(this.path, "utf8"))
    );

    likes.slice(offset, limit);

    return likes;
  }

  public async findOneLike(key = "id", value: string): Promise<ILike> {
    if (isEmpty(key) || isEmpty(value))
      throw new HttpException(400, "findOneLike Params is empty");

    const likes = JSON.parse(await readFile(this.path, "utf8"));

    let like: ILike;

    if (key == "id") {
      like = likes[value];
      await writeFile(this.path, JSON.stringify(likes));
    } else {
      const usersArr: ILike[] = Object.values(likes);
      for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i][key] == value) like = usersArr[i];
      }
    }

    if (!like) throw new HttpException(409, "Like doesn't exist");

    return like;
  }

  public async createLike(
    likeData: CreateLikeDto,
    user: IUser
  ): Promise<ILike> {
    if (isEmpty(likeData)) throw new HttpException(400, "LikeData is empty");

    await this.usersService.findOneUser("id", user.id);
    await this.postsService.updateById(likeData.post_id);

    const likes = JSON.parse(await readFile(this.path, "utf8"));

    const usersArr: ILike[] = Object.values(likes);
    for (let i = 0; i < usersArr.length; i++) {
      if (
        usersArr[i].post_id == likeData.post_id &&
        usersArr[i].user_id == user.id
      )
        throw new HttpException(409, "You have already clicked like");
    }

    const id = v4();

    likes[`${id}`] = {
      id,
      ...likeData,
      user_id: user.id,
    };

    await writeFile(this.path, JSON.stringify(likes));

    return likes[`${id}`];
  }
}
