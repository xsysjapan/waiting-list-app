import { v4 as uuid } from "uuid";
import { User } from "../models";

export type UserSearchParams = {
  name: string;
};

export type UserCreationParams = {
  username: string;
  name: string;
};

export type UserModificationParams = {
  name: string;
};

export class UsersService {
  public search(param: UserSearchParams): User[] {
    return [
      {
        id: uuid(),
        username: "username",
        name: "name",
      },
    ];
  }

  public get(id: string): User {
    return {
      id,
      username: "username",
      name: "name",
    };
  }

  public create(param: UserCreationParams): { id: string } {
    return {
      id: uuid(),
    };
  }

  public update(id: string, param: UserModificationParams) {}

  public delete(id: string) {}
}
