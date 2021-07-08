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
