import { Story, Meta } from "@storybook/react";
import {
  CreateWaitingCustomerForm,
  CreateWaitingCustomerFormProps,
} from "./CreateWaitingCustomerForm";

export default {
  component: CreateWaitingCustomerForm,
  title: "waiting-lists/CreateWaitingCustomerForm",
} as Meta;

const Template: Story<CreateWaitingCustomerFormProps> = (args) => (
  <CreateWaitingCustomerForm {...args} />
);

export const Default = Template.bind({});
