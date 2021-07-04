import { Story, Meta } from "@storybook/react";
import {
  AddWaitingListCustomerForm,
  AddWaitingListCustomerFormProps,
} from "./AddWaitingListCustomerForm";

export default {
  component: AddWaitingListCustomerForm,
  title: "waiting-lists/AddWaitingListCustomerForm",
} as Meta;

const Template: Story<AddWaitingListCustomerFormProps> = (args) => (
  <AddWaitingListCustomerForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "id",
};
