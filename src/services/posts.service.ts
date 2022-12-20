import { HttpException } from "@exceptions/HttpException";
import { IPost } from "@/interfaces/posts.interface";
import { isEmpty } from "@utils/util";
import { CreatePostDto } from "@/dtos/posts.dto";
import { writeFile, readFile } from "fs/promises";
import { v4 } from "uuid";
import UsersService from "./users.service";
import { IUser } from "@/interfaces/users.interface";

export default class PostsService {
  private path = __dirname + "/../../databases/posts.json";
  private usersService = new UsersService();

  public async findAllPost({
    user_id,
    limit = 20,
    offset = 0,
  }): Promise<IPost[]> {
    const postsArr: IPost[] = Object.values(
      JSON.parse(await readFile(this.path, "utf8"))
    );

    let posts: IPost[];

    if (user_id) posts = postsArr.filter((post) => post.author == user_id);

    posts.slice(offset, limit);

    return posts;
  }

  public async findOnePost(key = "id", value: string): Promise<IPost> {
    if (isEmpty(key) || isEmpty(value))
      throw new HttpException(400, "findOnePost Params is empty");

    const posts = JSON.parse(await readFile(this.path, "utf8"));

    let post: IPost;

    if (key == "id") {
      post = posts[value];

      posts[value] && posts[value]?.viewsAmount
        ? posts[value].viewsAmount++
        : (posts[value].viewsAmount = 1);

      await writeFile(this.path, JSON.stringify(posts));
    } else {
      const usersArr: IPost[] = Object.values(posts);
      for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i][key] == value) post = usersArr[i];
      }
    }

    if (!post) throw new HttpException(409, "Post doesn't exist");

    post.author = await this.usersService.findOneUser(
      "id",
      post.author as string
    );

    delete post.author.password;

    return post;
  }

  public async createPost(
    postData: CreatePostDto,
    user: IUser
  ): Promise<IPost> {
    if (isEmpty(postData)) throw new HttpException(400, "PostData is empty");

    const posts = JSON.parse(await readFile(this.path, "utf8")),
      id = v4(),
      readTime = postData.content.split(" ").length / 125;

    posts[`${id}`] = {
      id,
      readTime,
      ...postData,
      author: user.id,
      createdAt: new Date(),
    };

    await writeFile(this.path, JSON.stringify(posts));

    return posts[`${id}`];
  }

  public async updateById(id: string): Promise<IPost> {
    if (isEmpty(id)) throw new HttpException(400, "PostData is empty");

    const posts = JSON.parse(await readFile(this.path, "utf8"));

    if (!posts[`${id}`]) throw new HttpException(409, "Post doesn't exist");

    posts[`${id}`].likesAmount
      ? (posts[`${id}`].likesAmount += 1)
      : (posts[`${id}`].likesAmount = 1);

    await writeFile(this.path, JSON.stringify(posts));

    return posts[`${id}`];
  }
}
