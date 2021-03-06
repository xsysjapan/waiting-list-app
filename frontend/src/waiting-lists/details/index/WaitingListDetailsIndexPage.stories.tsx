import { Story, Meta } from "@storybook/react";
import {
  WaitingListDetailsIndexPageView,
  WaitingListDetailsIndexPageViewProps,
} from "./WaitingListDetailsIndexPage";

export default {
  component: WaitingListDetailsIndexPageView,
  title: "waiting-lists/details/WaitingListDetailsIndexPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<WaitingListDetailsIndexPageViewProps> = (args) => (
  <WaitingListDetailsIndexPageView {...args} />
);

const customer = {
  id: "cust",
  name: "Customer Name",
  phoneNumber: "0123456789",
  status: "NOT_CALLED" as "NOT_CALLED" | "CALLING" | "ARRIVED",
  mode: "NORMAL" as "NORMAL" | "ACTIVE",
};

export const Default = Template.bind({});
Default.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    active: false,
    customers: [
      { ...customer, id: "cust1", name: "Customer Name 1", status: "ARRIVED" },
      { ...customer, id: "cust2", name: "Customer Name 2", status: "ARRIVED" },
      { ...customer, id: "cust3", name: "Customer Name 3", status: "CALLING" },
      { ...customer, id: "cust4", name: "Customer Name 4", status: "CALLING" },
      { ...customer, id: "cust5", name: "Customer Name 5" },
      { ...customer, id: "cust6", name: "Customer Name 6" },
    ],
  },
};

export const Active = Template.bind({});
Active.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    active: true,
    customers: [
      { ...customer, id: "cust1", name: "Customer Name 1", status: "ARRIVED" },
      { ...customer, id: "cust2", name: "Customer Name 2", status: "ARRIVED" },
      { ...customer, id: "cust3", name: "Customer Name 3", status: "CALLING" },
      { ...customer, id: "cust4", name: "Customer Name 4", status: "CALLING" },
      { ...customer, id: "cust5", name: "Customer Name 5" },
      { ...customer, id: "cust6", name: "Customer Name 6" },
    ],
  },
};

export const withEmpty = Template.bind({});
withEmpty.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    active: false,
    customers: [],
  },
};

export const withWaitingCustomerOnly = Template.bind({});
withWaitingCustomerOnly.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    active: false,
    customers: [{ ...customer }],
  },
};

export const withCallingCustomerOnly = Template.bind({});
withCallingCustomerOnly.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    active: false,
    customers: [{ ...customer, status: "CALLING" }],
  },
};

export const withArrivedCustomerOnly = Template.bind({});
withArrivedCustomerOnly.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    active: false,
    customers: [{ ...customer, status: "ARRIVED" }],
  },
};
