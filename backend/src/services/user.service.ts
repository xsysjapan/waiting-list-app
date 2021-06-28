import { v4 as uuid } from "uuid";
import { CreatedResponse, User } from "../models";
import store from "../cqrs";

export type UserSearchParams = {
  name?: string;
};

export type UserCreationParams = {
  username: string;
  name: string;
  password: string;
};

export type UserModificationParams = {
  name: string;
};

export class UsersService {
  public async search(param: UserSearchParams): Promise<User[]> {
    return (await store.users.getAll()).map((e: any) => e[1]);
  }

  public async get(id: string): Promise<User> {
    return await store.users.get(Number(id));
  }

  public async create(param: UserCreationParams): Promise<CreatedResponse> {
    const stream = await store.commandBus.send("createUser", undefined, {
      payload: {
        username: param.username,
        name: param.name,
        password: param.password,
      },
    });
    return {
      id: stream[0].aggregateId!.toString(),
    };
  }

  public update(id: string, param: UserModificationParams) {}

  public delete(id: string) {}
}
