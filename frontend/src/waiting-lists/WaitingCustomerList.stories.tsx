import { Story, Meta } from "@storybook/react";
import {
  WaitingCustomerList,
  WaitingCustomerListProps,
} from "./WaitingCustomerList";

export default {
  component: WaitingCustomerList,
  title: "waiting-lists/WaitingCustomerList",
} as Meta;

const Template: Story<WaitingCustomerListProps> = (args) => (
  <WaitingCustomerList {...args} />
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

export const withNormalAndNotCalledState = Template.bind({});
withNormalAndNotCalledState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "NOT_CALLED",
    },
  ],
  activeIds: [],
};

export const withNormalAndCallingState = Template.bind({});
withNormalAndCallingState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "CALLING",
    },
  ],
  activeIds: [],
};

export const withNormalAndArrivedState = Template.bind({});
withNormalAndArrivedState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "ARRIVED",
    },
  ],
  activeIds: [],
};

export const withActiveAndNotCalledState = Template.bind({});
withActiveAndNotCalledState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "NOT_CALLED",
    },
  ],
  activeIds: ["id"],
};

export const withActiveAndCallingState = Template.bind({});
withActiveAndCallingState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "CALLING",
    },
  ],
  activeIds: ["id"],
};

export const withActiveAndArrivedState = Template.bind({});
withActiveAndArrivedState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "ARRIVED",
    },
  ],
  activeIds: ["id"],
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  customers: [customer1, customer2, customer3],
  activeIds: [],
};

export const MultipleLinesWithActiveState1 = Template.bind({});
MultipleLinesWithActiveState1.args = {
  customers: [
    {
      ...customer1,
    },
    customer2,
    customer3,
  ],
  activeIds: ["id1"],
};

export const MultipleLinesWithActiveState2 = Template.bind({});
MultipleLinesWithActiveState2.args = {
  customers: [
    customer1,
    {
      ...customer2,
    },
    customer3,
  ],
  activeIds: ["id2"],
};

export const MultipleLinesWithActiveState3 = Template.bind({});
MultipleLinesWithActiveState3.args = {
  customers: [
    customer1,
    customer2,
    {
      ...customer3,
    },
  ],
  activeIds: ["id3"],
};
