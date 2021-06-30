import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";
import {
  WaitingCustomerList,
  WaitingCustomerListProps,
} from "./WaitingCustomerList";

export default {
  component: WaitingCustomerList,
  title: "components/WaitingCustomerList",
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<WaitingCustomerListProps> = (args) => (
  <WaitingCustomerList {...args} />
);

const defaultCustomer = {
  id: "id",
  name: "Customer Name",
  status: "NOT_CALLED" as "NOT_CALLED" | "CALLING" | "ARRIVED",
  mode: "NORMAL" as "NORMAL" | "ACTIVE",
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
};

export const withNormalAndCallingState = Template.bind({});
withNormalAndCallingState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "CALLING",
    },
  ],
};

export const withNormalAndArrivedState = Template.bind({});
withNormalAndArrivedState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "ARRIVED",
    },
  ],
};

export const withActiveAndNotCalledState = Template.bind({});
withActiveAndNotCalledState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "NOT_CALLED",
      mode: "ACTIVE",
    },
  ],
};

export const withActiveAndCallingState = Template.bind({});
withActiveAndCallingState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "CALLING",
      mode: "ACTIVE",
    },
  ],
};

export const withActiveAndArrivedState = Template.bind({});
withActiveAndArrivedState.args = {
  customers: [
    {
      ...defaultCustomer,
      status: "ARRIVED",
      mode: "ACTIVE",
    },
  ],
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  customers: [customer1, customer2, customer3],
};

export const MultipleLinesWithActiveState1 = Template.bind({});
MultipleLinesWithActiveState1.args = {
  customers: [
    {
      ...customer1,
      mode: "ACTIVE",
    },
    customer2,
    customer3,
  ],
};

export const MultipleLinesWithActiveState2 = Template.bind({});
MultipleLinesWithActiveState2.args = {
  customers: [
    customer1,
    {
      ...customer2,
      mode: "ACTIVE",
    },
    customer3,
  ],
};

export const MultipleLinesWithActiveState3 = Template.bind({});
MultipleLinesWithActiveState3.args = {
  customers: [
    customer1,
    customer2,
    {
      ...customer3,
      mode: "ACTIVE",
    },
  ],
};
