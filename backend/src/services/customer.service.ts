import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "../errors";
import { CustomerModel } from "../models";
import { handlePrismaError } from "../utils/prisma";

export type CustomerSearchParams = {
  name: string;
};

export type CustomerCreationParams = {
  name: string;
};

export type CustomerModificationParams = {
  name: string;
};

export class CustomersService {
  public async search(param: CustomerSearchParams): Promise<CustomerModel[]> {
    const client = new PrismaClient();
    const entities = await client.customer.findMany({
      include: { phoneNumbers: true },
    });
    return entities.map((e) => ({
      id: e.id,
      name: e.name,
      emails: [],
      phoneNumbers: e.phoneNumbers.map((e) => e.phoneNumber),
    }));
  }

  public async get(id: string): Promise<CustomerModel> {
    const client = new PrismaClient();
    const entity = await client.customer.findFirst({
      include: { phoneNumbers: true },
    });
    if (!entity) {
      throw new NotFoundError();
    }
    return {
      id: entity.id,
      name: entity.name,
      emails: [],
      phoneNumbers: entity.phoneNumbers.map((e) => e.phoneNumber),
    };
  }

  public async create(param: CustomerCreationParams): Promise<{ id: string }> {
    const client = new PrismaClient();
    try {
      var entity = await client.customer.create({
        data: param,
      });
      return {
        id: entity.id,
      };
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async update(id: string, param: CustomerModificationParams) {
    const client = new PrismaClient();
    try {
      await client.customer.update({
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
      await client.customer.delete({
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
