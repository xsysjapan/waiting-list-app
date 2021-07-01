import { Story, Meta } from "@storybook/react";
import {
  WaitingListIndexPageView,
  WaitingListIndexPageViewProps,
} from "./WaitingListIndexPage";

export default {
  component: WaitingListIndexPageView,
  title: "waiting-lists/WaitingListIndexPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<WaitingListIndexPageViewProps> = (args) => (
  <WaitingListIndexPageView {...args} />
);

const waitingList = {
  id: "wl",
  name: "Waiting List",
  customers: [],
};

export const Default = Template.bind({});
Default.args = {
  waitingLists: [waitingList],
};
