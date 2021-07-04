import { Story, Meta } from "@storybook/react";
import {
  EditWaitingListPage,
  EditWaitingListPageProps,
} from "./EditWaitingListPage";

export default {
  component: EditWaitingListPage,
  title: "waiting-lists/EditWaitingListPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<EditWaitingListPageProps> = (args) => (
  <EditWaitingListPage {...args} />
);

export const Default = Template.bind({});
