import { v4 as uuid } from "uuid";
import { Customer } from "../models";

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
  public search(param: CustomerSearchParams): Customer[] {
    return [
      {
        id: uuid(),
        name: "name",
        emails: [],
        phoneNumbers: [],
      },
    ];
  }

  public get(id: string): Customer {
    return {
      id,
      name: "name",
      emails: [],
      phoneNumbers: [],
    };
  }

  public create(param: CustomerCreationParams): { id: string } {
    return {
      id: uuid(),
    };
  }

  public update(id: string, param: CustomerModificationParams) {}
  public delete(id: string) {}
}
