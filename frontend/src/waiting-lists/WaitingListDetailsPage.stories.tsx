import { Story, Meta } from "@storybook/react";
import {
  WaitingListDetailsPageView,
  WaitingListDetailsPageViewProps,
} from "./WaitingListDetailsPage";

export default {
  component: WaitingListDetailsPageView,
  title: "waiting-lists/WaitingListDetailsPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<WaitingListDetailsPageViewProps> = (args) => (
  <WaitingListDetailsPageView {...args} />
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
    customers: [
      { ...customer, id: "cust1", name: "Customer Name 1", status: "ARRIVED" },
      { ...customer, id: "cust2", name: "Customer Name 2", status: "CALLING" },
      { ...customer, id: "cust3", name: "Customer Name 3", status: "CALLING" },
      { ...customer, id: "cust4", name: "Customer Name 4" },
      { ...customer, id: "cust5", name: "Customer Name 5" },
    ],
  },
};

export const withEmpty = Template.bind({});
withEmpty.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    customers: [],
  },
};

export const withWaitingCustomerOnly = Template.bind({});
withWaitingCustomerOnly.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    customers: [{ ...customer }],
  },
};

export const withCallingCustomerOnly = Template.bind({});
withCallingCustomerOnly.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    customers: [{ ...customer, status: "CALLING" }],
  },
};

export const withArrivedCustomerOnly = Template.bind({});
withArrivedCustomerOnly.args = {
  waitingList: {
    id: "wl1",
    name: "Waiting List Name",
    customers: [{ ...customer, status: "ARRIVED" }],
  },
};
