import { Story, Meta } from "@storybook/react";
import {
  EditWaitingListCustomerPage,
  EditWaitingListCustomerPageProps,
} from "./EditWaitingListCustomerPage";
import { Default as WaitingListDetailsDefault } from "../index/WaitingListDetailsIndexPage.stories";

export default {
  component: EditWaitingListCustomerPage,
  title: "waiting-lists/edit-customer/EditWaitingListCustomerPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<EditWaitingListCustomerPageProps> = (args) => (
  <EditWaitingListCustomerPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...WaitingListDetailsDefault.args,
  id: "wl1",
  customerId: "cust1",
};
