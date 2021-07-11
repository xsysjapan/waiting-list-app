import { Story, Meta } from "@storybook/react";
import {
  WaitingListCustomerList,
  WaitingListCustomerListProps,
} from "./WaitingListCustomerList";

export default {
  component: WaitingListCustomerList,
  title: "waiting-lists/details/WaitingListCustomerList",
} as Meta;

const Template: Story<WaitingListCustomerListProps> = (args) => (
  <WaitingListCustomerList {...args} />
);

const defaultCustomer = {
  id: "id",
  name: "Customer Name",
  phoneNumber: "09012345678",
  status: "NOT_CALLED" as "NOT_CALLED" | "CALLING" | "ARRIVED",
};

const customer1 = {
  ...defaultCustomer,
  id: "id1",
  name: "Customer Name 1",
};

const customer2 = {
  ...defaultCustomer,
  id: "id2",
  name: "Customer Name 2",
};

const customer3 = {
  ...defaultCustomer,
  id: "id3",
  name: "Customer Name 3",
};

const customer4 = {
  ...defaultCustomer,
  id: "id4",
  name: "Customer Name 4",
};

const customer5 = {
  ...defaultCustomer,
  id: "id5",
  name: "Customer Name 5",
};

const customer6 = {
  ...defaultCustomer,
  id: "id6",
  name: "Customer Name 6",
};

const customer7 = {
  ...defaultCustomer,
  id: "id7",
  name: "Customer Name 7",
};

export const SingleLine = Template.bind({});
SingleLine.args = {
  customers: [defaultCustomer],
  activeIds: [],
};

export const SingleLineWithActiveState = Template.bind({});
SingleLineWithActiveState.args = {
  ...SingleLine.args,
  activeIds: ["id"],
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  customers: [customer1, customer2, customer3],
  activeIds: [],
};

export const MultipleLinesWithActiveState1 = Template.bind({});
MultipleLinesWithActiveState1.args = {
  ...MultipleLines.args,
  activeIds: ["id1"],
};

export const MultipleLinesWithActiveState2 = Template.bind({});
MultipleLinesWithActiveState2.args = {
  ...MultipleLines.args,
  activeIds: ["id2"],
};

export const MultipleLinesWithActiveState3 = Template.bind({});
MultipleLinesWithActiveState3.args = {
  ...MultipleLines.args,
  activeIds: ["id3"],
};

export const MultipleLines5 = Template.bind({});
MultipleLines5.args = {
  customers: [customer1, customer2, customer3, customer4, customer5],
  activeIds: [],
};

export const MultipleLines6 = Template.bind({});
MultipleLines6.args = {
  customers: [customer1, customer2, customer3, customer4, customer5, customer6],
  activeIds: [],
};

export const MultipleLines7 = Template.bind({});
MultipleLines7.args = {
  customers: [
    customer1,
    customer2,
    customer3,
    customer4,
    customer5,
    customer6,
    customer7,
  ],
  activeIds: [],
};
