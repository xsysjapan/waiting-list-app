import { PrismaClient } from "@prisma/client";
import { InvalidOperationError, NotFoundError } from "../errors";
import { WaitingListModel, WaitingListDetailsModel } from "../models";
import { handlePrismaError } from "../utils/prisma";

const client = new PrismaClient();

export type WaitingListSearchParams = {
  name?: string;
};

export type WaitingListCreationParams = {
  name: string;
};

export type WaitingListModificationParams = {
  name: string;
};

export type WaitingListCustomerCreationParams = {
  name: string;
  phoneNumber: string;
};

export type WaitingListCustomerModificationParams = {
  phoneNumber: string;
  remarks?: string;
};

export type WaitingListCallCustomerParams = {
  message?: string;
};

export type WaitingListUpdateCallingStatusParams = {
  status: "NOT_CALLED" | "ARRIVED";
};

export type WaitingListMoveCustomerParams = {
  before?: string;
  after?: string;
};

export class WaitingListsService {
  public async search(
    param: WaitingListSearchParams
  ): Promise<WaitingListModel[]> {
    const entities = await client.waitingList.findMany();
    return entities.map((e) => ({
      id: e.id,
      name: e.name,
    }));
  }

  public async get(id: string): Promise<WaitingListDetailsModel> {
    const entity = await client.waitingList.findFirst({
      where: { id },
      include: { customers: true },
    });
    if (!entity) {
      throw new NotFoundError();
    }
    return {
      id: entity.id,
      name: entity.name,
      customers: entity.customers
        .sort((l, r) => l.order - r.order)
        .map((e) => ({
          id: e.id,
          name: e.name,
          phoneNumber: e.phoneNumber,
          remarks: e.remarks || undefined,
          status: e.status,
        })),
    };
  }

  public async create(
    param: WaitingListCreationParams
  ): Promise<{ id: string }> {
    try {
      const entity = await client.waitingList.create({
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

  public async update(id: string, param: WaitingListModificationParams) {
    try {
      const entity = await client.waitingList.update({
        where: { id },
        data: {
          ...param,
          updatedAt: new Date(),
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

  public async addCustomer(
    id: string,
    param: WaitingListCustomerCreationParams
  ) {
    const entities = await client.waitingListCustomer.findMany({
      where: { waitingListId: id },
    });
    try {
      await client.waitingListCustomer.create({
        data: {
          ...param,
          order: entities.length,
          waitingListId: id,
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async updateCustomer(
    id: string,
    customerId: string,
    param: WaitingListCustomerModificationParams
  ) {
    try {
      await client.waitingListCustomer.update({
        where: { id: customerId },
        data: {
          ...param,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async callCustomer(
    id: string,
    customerId: string,
    param: WaitingListCallCustomerParams
  ) {
    try {
      await client.waitingListCustomer.update({
        where: { id: customerId },
        data: {
          status: "CALLING",
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }
  public async updateCustomerCallingStatus(
    id: string,
    customerId: string,
    param: WaitingListUpdateCallingStatusParams
  ) {
    try {
      await client.waitingListCustomer.update({
        where: { id: customerId },
        data: {
          status: param.status,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async moveCustomer(
    id: string,
    customerId: string,
    param: WaitingListMoveCustomerParams
  ) {
    const entities = await client.waitingListCustomer.findMany({
      where: { waitingListId: id },
      orderBy: { order: "asc" },
    });
    const target = entities.filter((e) => e.id == customerId)[0];
    if (!target) {
      throw new NotFoundError();
    }
    try {
      if (param.before) {
        const destination = entities.filter((e) => e.id === param.before)[0];
        if (!destination) {
          throw new InvalidOperationError(
            "InvalidOperation",
            "Destination Not Found"
          );
        }

        let found: boolean = false;
        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i];
          if (!found && entity === destination) {
            await client.waitingListCustomer.update({
              where: { id: target.id },
              data: {
                order: i + 1,
              },
            });
            await client.waitingListCustomer.update({
              where: { id: entity.id },
              data: {
                order: i + 2,
              },
            });
          }
          if (found) {
            if (entity === target) {
              break;
            }
            await client.waitingListCustomer.update({
              where: { id: entity.id },
              data: {
                order: i + 2,
              },
            });
          }
        }
      }
      if (param.after) {
        const destination = entities.filter((e) => e.id === param.after)[0];
        if (!destination) {
          throw new InvalidOperationError(
            "InvalidOperation",
            "Destination Not Found"
          );
        }

        let found: boolean = false;
        for (let i = entities.length - 1; i >= 0; i--) {
          const entity = entities[i];
          if (!found && entity === destination) {
            await client.waitingListCustomer.update({
              where: { id: target.id },
              data: {
                order: i + 1,
              },
            });
            await client.waitingListCustomer.update({
              where: { id: entity.id },
              data: {
                order: i,
              },
            });
          }
          if (found) {
            if (entity === target) {
              break;
            }
            await client.waitingListCustomer.update({
              where: { id: entity.id },
              data: {
                order: i,
              },
            });
          }
        }
      }
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }

  public async deleteCustomer(id: string, customerId: string) {
    try {
      await client.waitingListCustomer.delete({
        where: { id: customerId },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }
  public async delete(id: string) {
    try {
      await client.waitingList.delete({
        where: { id: id },
      });
    } catch (e) {
      handlePrismaError(e);
      throw e;
    }
  }
}
