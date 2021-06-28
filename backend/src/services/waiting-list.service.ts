import { v4 as uuid } from "uuid";
import { WaitingListModel, WaitingListDetailsModel } from "../models";

export type WaitingListSearchParams = {
  name: string;
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
  name: string;
  phoneNumber: string;
};

export type WaitingListCallCustomerParams = {};

export class WaitingListsService {
  public search(param: WaitingListSearchParams): WaitingListModel[] {
    return [
      {
        id: uuid(),
        name: "name",
      },
    ];
  }

  public get(id: string): WaitingListDetailsModel {
    return {
      id,
      name: "name",
      customers: [],
    };
  }

  public create(param: WaitingListCreationParams): { id: string } {
    return {
      id: uuid(),
    };
  }

  public update(id: string, param: WaitingListModificationParams) {}

  public addCustomer(id: string, param: WaitingListCustomerCreationParams) {}

  public updateCustomer(
    id: string,
    customerId: string,
    param: WaitingListCustomerModificationParams
  ) {}

  public callCustomer(
    id: string,
    customerId: string,
    param: WaitingListCallCustomerParams
  ) {}

  public deleteCustomer(id: string, customerId: string) {}
  public delete(id: string) {}
}
