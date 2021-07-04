import { Story, Meta } from "@storybook/react";
import {
  AddWaitingListCustomerPage,
  AddWaitingListCustomerPageProps,
} from "./AddWaitingListCustomerPage";

export default {
  component: AddWaitingListCustomerPage,
  title: "waiting-lists/AddWaitingListCustomerPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<AddWaitingListCustomerPageProps> = (args) => (
  <AddWaitingListCustomerPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  match: {
    params: {
      id: "id",
    },
  } as any,
};
