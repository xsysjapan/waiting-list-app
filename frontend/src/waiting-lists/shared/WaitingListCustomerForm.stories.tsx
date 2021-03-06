import { Story, Meta } from "@storybook/react";
import {
  WaitingListCustomerForm,
  WaitingListCustomerFormProps,
} from "./WaitingListCustomerForm";

export default {
  component: WaitingListCustomerForm,
  title: "waiting-lists/shared/WaitingListCustomerForm",
} as Meta;

const Template: Story<WaitingListCustomerFormProps> = (args) => (
  <WaitingListCustomerForm {...args} />
);

export const Default = Template.bind({});

export const withError = Template.bind({});
withError.args = {
  error: "Error message.",
};

export const withLoading = Template.bind({});
withLoading.args = {
  status: "LOADING",
};
