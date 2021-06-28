import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { UserModel } from "../models";

export type UserSearchParams = {
  name?: string;
};

export type UserCreationParams = {
  username: string;
  name: string;
};

export type UserModificationParams = {
  name: string;
};

export class UsersService {
  public async search(param: UserSearchParams): Promise<UserModel[]> {
    const client = new PrismaClient();
    const dbUsers = await client.user.findMany();
    return dbUsers.map((e) => ({
      id: String(e.id),
      name: e.name,
      username: e.username,
    }));
  }

  public async get(id: string): Promise<UserModel | undefined> {
    const client = new PrismaClient();
    const dbUser = await client.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!dbUser) {
      return undefined;
    }
    return {
      id: String(dbUser.id),
      name: dbUser.name,
      username: dbUser.username,
    };
  }

  public async create(param: UserCreationParams): Promise<{ id: string }> {
    const client = new PrismaClient();
    var dbUser = await client.user.create({
      data: param,
    });
    return {
      id: String(dbUser.id),
    };
  }

  public update(id: string, param: UserModificationParams) {}

  public delete(id: string) {}
}
