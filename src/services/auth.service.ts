import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { CreateUserDto } from "@/dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { IUser } from "@/interfaces/users.interface";
import { isEmpty } from "@utils/util";
import UsersService from "./users.service";
import { writeFile, readFile } from "fs/promises";
import { hash } from "bcrypt";
import { v4 } from "uuid";

class AuthService {
  private users = new UsersService();
  private path = __dirname + "/../../databases/users.json";

  public async singUp(
    userData: CreateUserDto
  ): Promise<{ cookie: string; findUser: IUser }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: IUser = await this.users.findOneUser(
      "email",
      userData.email,
      false
    );

    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    userData.password = await hash(userData.password, 10);

    const users = JSON.parse(await readFile(this.path, "utf8")),
      id = v4();
    console.log(id);

    users[`${id}`] = { id, ...userData };

    await writeFile(this.path, JSON.stringify(users));

    const tokenData = this.createToken(users[`${id}`]);
    const cookie = this.createCookie(tokenData);
    delete users[`${id}`]["password"];

    return { cookie, findUser: users[`${id}`] };
  }

  public async login(
    userData: CreateUserDto
  ): Promise<{ cookie: string; findUser: IUser }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: IUser = await this.users.findOneUser(
      "email",
      userData.email
    );
    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, "Password is not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);
    delete findUser["password"];

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: IUser = await this.users.findOneUser(
      "email",
      userData.email
    );

    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    return findUser;
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
