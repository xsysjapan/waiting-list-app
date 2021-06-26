export interface WaitingList {
  id: string;
  name: string;
}

export interface WaitingCustomer {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface WaitingListDetails extends WaitingList {
  customers: WaitingCustomer[];
}
