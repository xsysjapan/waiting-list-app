import { Story, Meta } from "@storybook/react";
import {
  EditWaitingListPage,
  EditWaitingListPageProps,
} from "./EditWaitingListPage";
import { Default as WaitingListDetailsDefault } from "../index/WaitingListDetailsIndexPage.stories";

export default {
  component: EditWaitingListPage,
  title: "waiting-lists/edit/EditWaitingListPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<EditWaitingListPageProps> = (args) => (
  <EditWaitingListPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...WaitingListDetailsDefault.args,
  id: "wl1",
};
