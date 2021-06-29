import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { InvalidOperationError, NotFoundError } from "../errors";
import { UserModel } from "../models";
import { handlePrismaError } from "../utils/prisma";

function md5Hash(data: string) {
  return crypto.createHash("md5").update(data).digest("hex");
}

export type UserSearchParams = {
  name?: string;
};

export type SessionCreationParams = {
  username: string;
  password: string;
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
  public async search(param: UserSearchParams): Promise<UserModel[]> {
    const client = new PrismaClient();
    const entities = await client.user.findMany();
    return entities.map((e) => ({
      id: e.id,
      name: e.name,
      username: e.username,
    }));
  }

  public async get(id: string): Promise<UserModel> {
    const client = new PrismaClient();
    const entity = await client.user.findFirst({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new NotFoundError();
    }
    return {
      id: entity.id,
      name: entity.name,
      username: entity.username,
    };
  }

  public async login(param: SessionCreationParams): Promise<UserModel> {
    const client = new PrismaClient();
    const entity = await client.user.findFirst({
      where: {
        username: param.username,
      },
    });
    if (!entity) {
      throw new InvalidOperationError("LoginFailed", "Login Failed");
    }
    if (entity.passwordHash !== md5Hash(param.password)) {
      throw new InvalidOperationError("LoginFailed", "Login Failed");
    }
    return {
      id: entity.id,
      name: entity.name,
      username: entity.username,
    };
  }

  public async create(param: UserCreationParams): Promise<{ id: string }> {
    const client = new PrismaClient();
    try {
      var entity = await client.user.create({
        data: {
          username: param.username,
          name: param.name,
          passwordHash: md5Hash(param.password),
        },
      });
      return {
        id: entity.id,
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
