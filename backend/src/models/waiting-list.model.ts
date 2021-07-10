export interface WaitingListModel {
  id: string;
  name: string;
  active: boolean;
}

export type CallingStatusEnum = "NOT_CALLED" | "CALLING" | "ARRIVED";

export interface WaitingCustomerModel {
  id: string;
  name: string;
  phoneNumber: string;
  remarks?: string;
  status: CallingStatusEnum;
  lastCalled?: Date;
}

export interface DefaultWaitingListNameModel {
  value: string;
}

export interface WaitingListDetailsModel extends WaitingListModel {
  customers: WaitingCustomerModel[];
}
