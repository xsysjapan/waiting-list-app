export type OperationStatus = "UNSUBMITTED" | "LOADING" | "SUCCEEDED" | "FAILED";

export interface User {
  username: string;
  name: string;
}

export interface WaitingListSummary {
  id: string;
  name: string;
  active: boolean;
}

export interface WaitingListDetails {
  id: string;
  name: string;
  active: boolean;
  customers: WaitingListCustomer[];
}

export interface WaitingListCustomer {
  id: string;
  name: string;
  phoneNumber: string;
  remarks?: string;
  status: "NOT_CALLED" | "CALLING" | "ARRIVED";
  lastCalled?: Date;
}
