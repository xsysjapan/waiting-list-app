import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../errors";
import { UserModel } from "../models";
import { handlePrismaError } from "../utils/prisma";

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
      id: e.id,
      name: e.name,
      username: e.username,
    }));
  }

  public async get(id: string): Promise<UserModel> {
    const client = new PrismaClient();
    const dbUser = await client.user.findFirst({
      where: {
        id,
      },
    });
    if (!dbUser) {
      throw new NotFoundError();
    }
    return {
      id: String(dbUser.id),
      name: dbUser.name,
      username: dbUser.username,
    };
  }

  public async create(param: UserCreationParams): Promise<{ id: string }> {
    const client = new PrismaClient();
    try {
      var dbUser = await client.user.create({
        data: param,
      });
      return {
        id: String(dbUser.id),
      };
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async update(id: string, param: UserModificationParams) {
    const client = new PrismaClient();
    try {
      await client.user.update({
        where: {
          id,
        },
        data: param,
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async delete(id: string) {
    const client = new PrismaClient();
    try {
      await client.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }
}
