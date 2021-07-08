import { Story, Meta } from "@storybook/react";
import {
  WaitingListCustomerListItem,
  WaitingListCustomerListItemProps,
} from "./WaitingListCustomerListItem";

export default {
  component: WaitingListCustomerListItem,
  title: "waiting-lists/details/WaitingListCustomerListItem",
} as Meta;

const Template: Story<WaitingListCustomerListItemProps> = (args) => (
  <WaitingListCustomerListItem {...args} />
);

const defaultCustomer = {
  id: "id",
  name: "Customer Name",
  phoneNumber: "09012345678",
  status: "NOT_CALLED" as "NOT_CALLED" | "CALLING" | "ARRIVED",
};

export const withNormalAndNotCalledState = Template.bind({});
withNormalAndNotCalledState.args = {
  customer: {
    ...defaultCustomer,
    status: "NOT_CALLED",
  },
};

export const withNormalAndCallingState = Template.bind({});
withNormalAndCallingState.args = {
  customer: {
    ...defaultCustomer,
    status: "CALLING",
  },
};

export const withNormalAndArrivedState = Template.bind({});
withNormalAndArrivedState.args = {
  customer: {
    ...defaultCustomer,
    status: "ARRIVED",
  },
};

export const withActiveAndNotCalledState = Template.bind({});
withActiveAndNotCalledState.args = {
  customer: {
    ...defaultCustomer,
    status: "NOT_CALLED",
  },
  active: true,
};

export const withActiveAndCallingState = Template.bind({});
withActiveAndCallingState.args = {
  customer: {
    ...defaultCustomer,
    status: "CALLING",
  },
  active: true,
};

export const withActiveAndArrivedState = Template.bind({});
withActiveAndArrivedState.args = {
  customer: {
    ...defaultCustomer,
    status: "ARRIVED",
  },
  active: true,
};

export const withActiveAndIsFirst = Template.bind({});
withActiveAndIsFirst.args = {
  customer: {
    ...defaultCustomer,
  },
  active: true,
  isFirst: true,
};

export const withActiveAndIsLast = Template.bind({});
withActiveAndIsLast.args = {
  customer: {
    ...defaultCustomer,
  },
  active: true,
  isLast: true,
};

export const withActiveAndIsFirstAndLast = Template.bind({});
withActiveAndIsFirstAndLast.args = {
  customer: {
    ...defaultCustomer,
  },
  active: true,
  isFirst: true,
  isLast: true,
};
