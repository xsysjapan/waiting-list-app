import { Story, Meta } from "@storybook/react";
import {
  EditWaitingListCustomerForm,
  EditWaitingListCustomerFormProps,
} from "./EditWaitingListCustomerForm";

export default {
  component: EditWaitingListCustomerForm,
  title: "waiting-lists/edit-customer/EditWaitingListCustomerForm",
} as Meta;

const Template: Story<EditWaitingListCustomerFormProps> = (args) => (
  <EditWaitingListCustomerForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "id",
  customerId: "customerId",
};
