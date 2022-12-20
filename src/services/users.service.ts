import { HttpException } from "@exceptions/HttpException";
import { IUser } from "@/interfaces/users.interface";
import { isEmpty } from "@utils/util";
import { readFile } from "fs/promises";
export default class UsersService {
  private path = __dirname + "/../../databases/users.json";

  public async findAllUser({ limit = 20, offset = 0 }): Promise<IUser[]> {
    const users: IUser[] = Object.values(
      JSON.parse(await readFile(this.path, "utf8"))
    );

    users.slice(offset, limit);

    return users;
  }

  public async findOneUser(
    key = "id",
    value: string,
    isChecked = true
  ): Promise<IUser> {
    if (isEmpty(key) || isEmpty(value))
      throw new HttpException(400, "findOneUser Params is empty");

    const users = JSON.parse(await readFile(this.path, "utf8"));

    let user: IUser;

    if (key == "id") {
      user = users[value];
    } else {
      const usersArr: IUser[] = Object.values(users);
      for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i][key] == value) user = usersArr[i];
      }
    }

    if (!user && isChecked) throw new HttpException(409, "User doesn't exist");

    return user;
  }
}
