import { Story, Meta } from "@storybook/react";
import {
  EditWaitingListCustomerPage,
  EditWaitingListCustomerPageProps,
} from "./EditWaitingListCustomerPage";

export default {
  component: EditWaitingListCustomerPage,
  title: "waiting-lists/EditWaitingListCustomerPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<EditWaitingListCustomerPageProps> = (args) => (
  <EditWaitingListCustomerPage {...args} />
);

export const Default = Template.bind({});
