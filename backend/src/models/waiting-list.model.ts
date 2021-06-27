export interface WaitingList {
  id: string;
  name: string;
}

export type CallingStatus = "NotCalled" | "Calling" | "Arrived";

export interface WaitingCustomer {
  id: string;
  name: string;
  phoneNumber: string;
  status: CallingStatus;
}

export interface WaitingListDetails extends WaitingList {
  customers: WaitingCustomer[];
}
