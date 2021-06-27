import { v4 as uuid } from "uuid";
import { WaitingList, WaitingListDetails } from "../models";

export type WaitingListCreationParams = {
  name: string;
};

export class WaitingListsService {
  public get(id: string): WaitingListDetails {
    return {
      id,
      name: "name",
      customers: [],
    };
  }

  public create(param: WaitingListCreationParams): WaitingList {
    return {
      id: uuid(),
      ...param,
    };
  }
}