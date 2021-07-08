import { Story, Meta } from "@storybook/react";
import {
  CreateWaitingListPage,
  CreateWaitingListPageProps,
} from "./CreateWaitingListPage";

export default {
  component: CreateWaitingListPage,
  title: "waiting-lists/create/CreateWaitingListPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<CreateWaitingListPageProps> = (args) => (
  <CreateWaitingListPage {...args} />
);

export const Default = Template.bind({});
