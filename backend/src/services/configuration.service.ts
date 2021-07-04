import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../errors";
import { ConfigurationModel } from "../models";
import { handlePrismaError } from "../utils/prisma";

const client = new PrismaClient();

export type ConfigurationSearchParams = {
  key?: string;
};

export type ConfigurationCreationParams = {
  key: string;
  value: string;
};

export type ConfigurationModificationParams = {
  value: string;
};

export class ConfigurationsService {
  public async search(
    param: ConfigurationSearchParams
  ): Promise<ConfigurationModel[]> {
    const entities = await client.configuration.findMany();
    return entities.map((e) => ({
      key: e.key,
      value: e.value,
    }));
  }

  public async get(key: string): Promise<ConfigurationModel> {
    const entity = await client.configuration.findFirst({
      where: {
        key: key
          ? {
              contains: key,
            }
          : undefined,
      },
    });
    if (!entity) {
      throw new NotFoundError();
    }
    return {
      key: entity.key,
      value: entity.value,
    };
  }

  public async create(
    param: ConfigurationCreationParams
  ): Promise<{ key: string }> {
    try {
      var entity = await client.configuration.create({
        data: param,
      });
      return {
        key: entity.key,
      };
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async update(key: string, param: ConfigurationModificationParams) {
    try {
      await client.configuration.upsert({
        where: {
          key,
        },
        create: {
          key: key,
          value: param.value,
        },
        update: {
          value: param.value,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }
  public async delete(key: string) {
    try {
      await client.configuration.delete({
        where: {
          key,
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }
}
