export interface User {
  username: string;
  name: string;
}

export interface WaitingListDetails {
  id: string;
  name: string;
  customers: WaitingListCustomer[];
}

export interface WaitingListCustomer {
  id: string;
  name: string;
  phoneNumber: string;
  status: "NOT_CALLED" | "CALLING" | "ARRIVED";
}
